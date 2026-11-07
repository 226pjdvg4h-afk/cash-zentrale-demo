import test from "node:test";
import assert from "node:assert/strict";
import {moneyCents,normalizeTransactionGroup,normalizeAssetAccount,createFireflyClient,summarize} from "./firefly-adapter.mjs";
test("exact monetary values",()=>{assert.equal(moneyCents("15.09"),1509);assert.equal(moneyCents("-2.30"),-230);assert.throws(()=>moneyCents("1.234"));});
test("transfers do not count as revenue",()=>{
 const group={id:"4",attributes:{transactions:[
 {type:"withdrawal",amount:"8.90",date:"2026-11-01",currency_code:"EUR"},
 {type:"deposit",amount:"100.00",date:"2026-11-01",currency_code:"EUR"},
 {type:"transfer",amount:"200.00",date:"2026-11-01",currency_code:"EUR"}]}};
 assert.deepEqual(summarize(normalizeTransactionGroup(group)),{incomeCents:10000,expensesCents:890,transfers:1});
});
test("reject missing and foreign account balances",()=>{
 assert.throws(()=>normalizeAssetAccount({id:"1",attributes:{type:"asset",name:"C24"}}));
 assert.throws(()=>normalizeAssetAccount({id:"1",attributes:{type:"asset",name:"C24",current_balance:"1.00",currency_code:"USD"}}));
});
test("read-only paging and token header",async()=>{
 const calls=[];
 const fetchImpl=async(url,init)=>{calls.push({url:String(url),method:init.method,token:init.headers.Authorization});
 return {ok:true,json:async()=>({data:[{id:"1",attributes:{type:"asset",name:"C24",current_balance:"42.00",currency_code:"EUR"}}],meta:{pagination:{total_pages:1}}})}};
 const client=createFireflyClient({url:"http://127.0.0.1:8080",token:"test-only",fetchImpl});
 assert.equal((await client.accounts())[0].balanceCents,4200);
 assert.equal(calls[0].method,"GET");
 assert.equal(calls[0].token,"Bearer test-only");
});
test("refuse insecure remote API",()=>assert.throws(()=>createFireflyClient({url:"http://example.com",token:"x"})));
