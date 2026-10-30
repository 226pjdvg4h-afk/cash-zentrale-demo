# ca$h zentrale — öffentliche PWA-Demo 0.6

Nur synthetische Testdaten. Kein Live-Bankzugriff, keine Cloud-Synchronisierung, keine biometrische Anmeldung und keine Produktionsfreigabe. Installierbare PWA über GitHub Pages nach manueller Pages-Aktivierung. **Keine echten Finanzdaten hochladen oder importieren.**

## Investment Cockpit 3.0 — Team A Controlled Alpha (approved paper-trading parameters; 2026-10-31)

**Status: specification only. No running agent, order execution, live market monitoring, or real-money brokerage. All trading is to remain simulated.** This public repository contains only user-chosen generic test rules and **no private portfolio, banking, credentials, or account information**.

| Rule | Binding configuration |
| --- | --- |
| Virtual starting capital | 100,000 EUR |
| Philosophy | Quality & Value |
| Universe | Global; small caps allowed |
| Holding period | Flexible |
| Minimum fundamental research score | 75 / 100 |
| Minimum margin of safety | 20% below documented estimate of fair value |
| Maximum single issuer exposure | 7% of current portfolio equity, including existing holdings |
| Maximum sector allocation | 25% of current portfolio equity |
| Minimum cash reserve | 10% of current portfolio equity |
| Risk appetite | Balanced |
| Stop-loss | Thesis-based; no fixed percentage stop |
| Sell criterion | Original investment thesis demonstrably invalidated |
| Review triggers | New trustworthy financial data or relevant corporate/market events |
| Loss-making businesses | Allowed if the thesis explains profitability path and financing risks |
| Dividends mandatory | No |
| ETFs | Allowed |
| Fractional shares | Allowed where simulator can model fills and fees |
| Extra mandate | Monitor markets; research additional strategies and present them for user approval; actively monitor portfolio risk |
| Real-money orders | Prohibited |

### Mandatory interpretation / safeguards

1. The team may independently research investment candidates and, once a simulator exists, **place virtual orders only** under these fixed rules. Research proposals do **not** alter Team A's live rules without explicit user approval. Team B remains separate.
2. **Conflicts / underspecified criteria:** Score >=75 and fair-value discount >=20% are simultaneous buy requirements; neither overrides the other. The scoring methodology, fair-value scenarios and data-quality gate must be versioned and pre-registered before performance testing.
3. For ETFs, ordinary company financial scores and single-business DCF valuations do not apply. ETFs must be assessed against a separate documented holdings/NAV, costs, tracking, liquidity and diversification methodology. Until explicitly specified/approved, **ETF buying is blocked**, though ETF research is allowed.
4. Small-cap and loss-making stocks require liquidity/spread thresholds, dilution and cash-runway checks, and stricter data validation. Until thresholds are approved, do not simulate a purchase for which these tests cannot be passed.
5. Event-triggered review requires a defined data provider and scheduled event ingestion. Without those, do **not** claim continuous market surveillance.
6. Thesis-based exits require written falsifiable conditions and periodic reevaluation. A thesis-invalidating event triggers a virtual exit assessment; hard risk controls can also block buying or force risk reduction; these controls need separate sign-off.
7. Single issuer and sector caps apply after the proposed trade, counting any overlapping ETF exposures when data permits. If sector data is missing, the order is blocked. Maintain >=10% uncommitted simulated cash after fills and modeled fees.
8. Cash, leverage, benchmark, FX, corporate actions, trading calendars, transaction costs, slippage, volume and gap risk must be modeled consistently before credible results can be reported.
9. All simulated orders require auditable timestamps, evidence sources, snapshot of the thesis, financial data as-of dates, signal, sizing, simulated execution price and post-trade portfolio checks.
10. Public-demo security guard remains in force. No live credentials or personally identifying/private financial information may be added here. Prior to any future production operation, the permission gateway, security watchdog, logs, alerts and emergency-stop tests need explicit approval and successful verification.

**Next implementation gate:** build two isolated paper accounts, a common verified market-data pipeline, evaluation and risk engine, and reproducible trading journal. No autonomous trading is running merely because the parameters are documented.
