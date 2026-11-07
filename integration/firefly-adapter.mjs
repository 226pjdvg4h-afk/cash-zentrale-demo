/**
 * ca$h zentrale / Firefly III read-only adapter.
 * Original integration code; NO Firefly III source copied.
 * This module runs on the PRIVATE Windows backend, never in GitHub Pages.
 * Node.js >=20; no dependencies.
 */
const API_TIMEOUT_MS=15000;
export function moneyCents(raw) {
  if (!/^-?\d+(?:\.\d{1,2})?$/.test(String(raw))) throw Error("Invalid monetary decimal");
  const s=String(raw), negative=s.startsWith("-");
  const [whole, fraction=""]=s.replace("-","").split(".");
  const cents=Number(whole)*100+Number((fraction+"00").slice(0,2));
  if (!Number.isSafeInteger(cents)) throw Error("Money out of range");
  return negative?-cents:cents;
}
export function normalizeTransactionGroup(group) {
  if (!group?.id || !Array.isArray(group?.attributes?.transactions)) throw Error("Invalid transaction group");
  return group.attributes.transactions.map((t,i)=>{
    const type=String(t.type||"").toLowerCase();
    if (!["withdrawal","deposit","transfer"].includes(type)) throw Error("Unrecognized transaction type");
    const cents=moneyCents(t.amount);
    if (cents<0) throw Error("Unexpected signed Firefly amount");
    const date=String(t.date||"").slice(0,10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw Error("Invalid transaction date");
    return {id:String(group.id)+":"+String(t.transaction_journal_id??i),date,
      amountCents:type==="withdrawal"?-cents:type==="deposit"?cents:0,
      transferCents:type==="transfer"?cents:0,
      type,category:String(t.category_name||"Unkategorisiert"),
      name:String(t.description||""),account:String(t.source_name||t.destination_name||""),
      currency:String(t.currency_code||"EUR")};
  });
}
export function normalizeAssetAccount(item) {
  const a=item?.attributes;
  if(!item?.id||!a || a.type!=="asset") throw Error("Invalid asset account");
  if(a.currency_code && a.currency_code!=="EUR") throw Error("Non-EUR account requires conversion");
  if(a.current_balance==null) throw Error("No verified account balance");
  return {id:String(item.id),name:String(a.name||"Konto"),currency:"EUR",balanceCents:moneyCents(a.current_balance)};
}
function baseUrl(input) {
  const url=new URL(input);
  if(url.username||url.password||url.search||url.hash)throw Error("Firefly URL must contain no credentials");
  if(url.protocol!=="https:" && !(url.protocol==="http:"&&["localhost","127.0.0.1","[::1]"].includes(url.hostname)))throw Error("Firefly must use HTTPS outside localhost");
  return url.origin+url.pathname.replace(/\/$/,"");
}
export function createFireflyClient({url, token, fetchImpl=fetch}) {
  const root=baseUrl(url);
  if(!token||!String(token).trim())throw Error("Missing Firefly access token");
  async function get(path,params={}) {
    const u=new URL(root+"/api/v1/"+path);
    for(const [key,val] of Object.entries(params))u.searchParams.set(key,String(val));
    const controller=new AbortController();
    const timer=setTimeout(()=>controller.abort(),API_TIMEOUT_MS);
    try {
      const response=await fetchImpl(u,{method:"GET",headers:{Authorization:"Bearer "+token,Accept:"application/json"},signal:controller.signal,redirect:"error",cache:"no-store"});
      if(!response.ok)throw Error("Firefly API request failed (HTTP "+response.status+")");
      return await response.json();
    }finally{clearTimeout(timer)}
  }
  async function paginated(path,params={}) {
    const all=[];
    for(let page=1;page<=100;page++){
      const payload=await get(path,{...params,page,limit:100});
      if(!Array.isArray(payload.data))throw Error("Invalid Firefly response");
      all.push(...payload.data);
      const total=Number(payload.meta?.pagination?.total_pages ?? payload.meta?.pagination?.totalPages ?? 0);
      if(total? page>=total : !payload.links?.next) return all;
    }
    throw Error("Pagination limit reached; refusing partial financial results");
  }
  return {
    async accounts(){return (await paginated("accounts",{type:"asset"})).filter(x=>x.attributes?.type==="asset").map(normalizeAssetAccount)},
    async transactions(start,end){
      if(!/^\d{4}-\d{2}-\d{2}$/.test(start)||!/^\d{4}-\d{2}-\d{2}$/.test(end)||start>end)throw Error("Invalid date range");
      const groups=await paginated("transactions",{start,end});
      const rows=groups.flatMap(normalizeTransactionGroup);
      if(rows.some(r=>r.currency!=="EUR"))throw Error("Foreign currency present; conversion required before totals");
      return rows;
    }
  };
}
export function summarize(rows){
  return rows.reduce((sum,r)=>{if(!Number.isSafeInteger(r.amountCents))throw Error("Invalid amount cents");
    if(r.type==="withdrawal")sum.expensesCents-=r.amountCents;
    if(r.type==="deposit")sum.incomeCents+=r.amountCents;
    if(r.type==="transfer")sum.transfers++;
    return sum;
  },{incomeCents:0,expensesCents:0,transfers:0});
}
