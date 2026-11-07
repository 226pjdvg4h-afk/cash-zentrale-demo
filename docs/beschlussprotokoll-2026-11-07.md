# ca$h zentrale — Beschlussprotokoll vom 07.11.2026

**Beschlussorgan:** Auftraggeber (persönliche Projektentscheidung)
**Grundlage:** außerordentliche simulierte Strategiekonferenz vom 07.11.2026
**Status:** B01–B06 ausdrücklich freigegeben.
**Projekt:** Bestehende ca$h zentrale mit iPhone-Home-Screen-PWA, Design 2.1
**Geltungsbereich:** Planung, technische Prüfung und ausschließlich freigegebene Entwicklungsarbeiten. Keine implizite Erweiterung der Befugnisse.

## Genehmigte Beschlüsse

| Beschluss | Entscheidung | Umfang der Freigabe |
|---|---|---|
| B01 | **Freigegeben** | Die bestehende Home-Screen-App und das visuelle Design 2.1 werden unverändert beibehalten. Keine eigenmächtige optische Neugestaltung. |
| B02 | **Freigegeben** | Firefly III als Kandidat für Konten- und Transaktionsverwaltung weiterentwickeln, testen und mit Alternativen vergleichen. Keine ungeprüfte Gesamtübernahme. |
| B03 | **Freigegeben** | Depotverwaltung separat prüfen; Portfolio Performance als unabhängige rechnerische Kontrollinstanz für Bestände, Käufe/Verkäufe, Gebühren, Dividenden und Renditen untersuchen. |
| B04 | **Freigegeben** | PC-unabhängige Cloud-/Hybridarchitektur technisch vergleichen. **Keine** Freigabe für die Auswahl eines Cloudanbieters, Anlage kostenpflichtiger Dienste, laufende Kosten, Migration oder Übertragung privater Finanzdaten. |
| B05 | **Freigegeben** | Schrittweise Bankdatenintegration: zuerst überprüfbare Dateiimporte und korrekte Berechnungen; automatische C24-/Trade-Republic-Anbindung erst nach Prüfung von Unterstützung, Rechtmäßigkeit, Authentifizierung und Kosten. Keine Speicherung von Bank-PIN/TAN. |
| B06 | **Freigegeben** | Kein Produktivbetrieb mit echten privaten Finanzdaten vor Sicherheitsabnahme: Permission Gateway, Zugriffsschutz, Verschlüsselung, Protokollierung, Alarme, Sperr-/Not-Aus-Tests und erfolgreich getestete Backup-Wiederherstellung. |

## Unveränderte Projektleitplanken

- Organisationsstruktur: die bestehenden sieben Projektbereiche und 27 **simulierten** Expertinnenrollen; keine zusätzliche Abteilung.
- Größere technische oder wirtschaftliche Entscheidungen sind vorab dem Auftraggeber vorzulegen.
- App ist ausschließlich zur privaten Einzelnutzung bestimmt.
- Keine nicht bestätigten Kontostände, Renditen oder anderen Finanzkennzahlen als echt darstellen; Datenherkunft, Aktualität und fehlende Daten nachvollziehbar behandeln.
- Die vorliegenden Firefly-Adapterdateien sind eine Implementierungsgrundlage, **keine** betriebsfähige Firefly-Serveranbindung.
- Bestehendes PWA-Design, GitHub-Pages-Frontend und Home-Screen-Icon bleiben bis zu einer neuen ausdrücklichen Entscheidung unverändert.
- Keine privaten Finanzdaten, Zugangstokens oder API-Schlüssel ins öffentliche GitHub-Repository einchecken.

## Freigegebene Prüfaufträge und Kriterien

### Wealth & Finance
- C24-CSV-Datenformat und Kontentypen prüfen; Überträge und Gegenbuchungen korrekt zuordnen.
- Kontrollsummen, Dublettenprüfung, Anfangs- und Schlussbestände, Abweichungsberichte definieren.
- Firefly-III-API-Datenmodell auf passende Cashflow-Auswertungen abgleichen.

### Investment Research
- Trade-Republic-Transaktionen mit unabhängigen Depotberechnungen abgleichen.
- Dividenden, Teilverkäufe, Gebühren, Steuern und Währungen als Prüfgegenstände erfassen.
- Keine Depotbewertung ohne verlässliche Stückzahlen und datierte Kurse.

### Engineering & KI
- Vorhandenen Firefly-Read-only-Adapter und Tests prüfen, reproduzierbare Testläufe mit synthetischen Daten vorbereiten.
- Variantenvergleich Firefly-Selbsthosting vs. schlanke private API vs. Offline-First plus Cloud-Synchronisierung erstellen.
- Für jede Option Hosting-Anforderungen, Kostenrisiken, Offline-Verhalten, Synchronisationskonflikte und Wartungsaufwand dokumentieren.
- Keine unverifizierte Backend-URL oder Geheimnisse in den PWA-Code aufnehmen.

### Global Intelligence
- C24-/Trade-Republic-Abdeckung bei rechtmäßig nutzbaren Open-Banking-Anbietern verifizieren.
- Kosten, Aktualisierungsintervalle, Datenfelder und Ausfallverhalten mit Quellen und Prüfdatum dokumentieren.

### Design & UX
- Nur funktionale Datenzustände und Interaktionsanforderungen spezifizieren; optisches Design 2.1 nicht ändern.

### Security & Operations
- Security Watchdog (Rebecca Braun): Zugriffsrechte, Permission Gateway, Alarme, Logs, Not-Aus, verschlüsselte Backups und Wiederherstellung testen.
- Produktivfreigabe erst nach dokumentiertem Erfolg sämtlicher Pflichtprüfungen.

### Gesamtprojektleitung
- Alle Architektur- und Anbieterentscheidungen anhand der Tests dem Auftraggeber zur Freigabe vorlegen.
- Keine zusätzlichen Freigaben aus diesem Beschlussprotokoll ableiten.

## Noch ausdrücklich offen

1. Endgültiger Backend-Stack und Ort der dauerhaften Datenhaltung.
2. Cloudanbieter, Hosting-Vertrag, Zugangsdaten, ggf. laufende Kosten.
3. Form und zulässige Verfügbarkeit automatischer Bank-/Broker-Abfragen.
4. Verifizierte End-to-End-Sicherheit und produktiver Einsatz echter Kontodaten.
5. Integration in die auf dem iPhone installierte PWA nach bestandenen Tests.

**Protokollvermerk:** Dieses Dokument protokolliert die vom Auftraggeber tatsächlich übermittelten Entscheidungen. Es behauptet weder eine ausgeführte Teamsitzung noch erfolgreiche Softwaretests, Deployments oder Sicherheitsabnahmen.
