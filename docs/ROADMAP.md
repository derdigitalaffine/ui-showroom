# Roadmap — UI Showroom

## Vorgehen und Quelle

Die Phasenlogik (P0/P1/P2, eine verantwortliche Agentenrolle pro Paket, explizite Definition of Done, sequenzielle Kernabhängigkeiten und QA-Gates) ist adaptiert aus [`kostuemwettbewerb/docs/ROADMAP.md`](https://github.com/derdigitalaffine/kostuemwettbewerb/blob/main/docs/ROADMAP.md). **Inhalt und Tech-Stack gehören ausschließlich zu UI Showroom.**

**Status am 2026-11-05:** Anwendung, zwei Adapter, Vergleich, CI und Docker-Deployment sind auf dem Feature-Branch implementiert. Automatische Tests, Build und lokale HTTP-/Caddy-Smokes wurden ausgeführt. Die Release-Freigabe G6 bleibt bis Browser-/Axe-CI, Screenreader-Smoke und PR-Review offen; die folgenden Meilensteine dokumentieren den geplanten Abnahmeweg.

## Prioritäten

- **P0 — MVP-blockierend:** reproduzierbare App, Vergleichbarkeit, zwei Adapter, funktionierende UX, A11y-Basics, CI/Tests.
- **P1 — sinnvolle Erweiterung:** dritter Adapter, zusätzliche Komponenten, Themes, visuelle Regression.
- **P2 — Komfort:** Codeexport, externe Galerien, Automatisierung und zusätzliche Analytik.

## Meilensteine, Agenten und Abnahmen

| Meilenstein | Prio | Owner | Voraussetzung | Ergebnis / Abnahmekriterium |
| --- | --- | --- | --- | --- |
| **M0 Governance & Entscheidungen** | P0 | Orchestrator | — | Agentenregeln, Produkt-Scope, Architektur, Roadmap, QA-Matrix und ADR-Vorlagen liegen vor; zwei MVP-Bibliotheken, Toolchain und Lizenzen sind entschieden (**Gate G0**) |
| **M1 Foundation** | P0 | Foundation-Agent | G0 | React-App startet auf frischem Checkout, definierte Node-/Package-Manager-Version, lint/typecheck/unit/build in CI grün (**G1**) |
| **M2 Katalog & Contracts** | P0 | Catalog/Contract-Agent | G1 | Vier kanonische Beispiele (Button, Textfeld, Select, Dialog); Zustände, Aktionen und Adapter-Interface dokumentiert; Contract-Tests grün (**G2**) |
| **M3 Erster Adapter** | P0 | Framework-Adapter-Agent | G2 | Alle vier Pflichtbeispiele in Bibliothek A funktionsfähig; Error/Disabled/Keyboard geprüft; 320/360 px brauchbar (**G3**) |
| **M4 Zweiter Adapter / Parität** | P0 | Framework-Adapter-Agent | G3 | Bibliothek B liefert die gleichen Fälle, ein gemeinsamer Paritätstest läuft, echte Abweichungen sind dokumentiert (**G4**) |
| **M5 Showcase UX** | P0 | Showcase/UX-Agent | G4 | Bibliothekswechsel, Katalognavigation, Suche/Filter, Side-by-Side-Ansicht und Deep Links funktionieren; mobile Ansicht gestapelt (**G5**) |
| **M6 QA & Release** | P0 | QA-Agent + Release/Docs | G1–G5 | vollständiger CI-Lauf, Keyboard-/Screenreader-/Responsive-Dry-Run, Lizenzcheck, Quickstart und Limitations dokumentiert; Release-Gate G6 |
| **M7 Erweiterungen** | P1 | Adapter + UX + QA | G6 | Dritte Bibliothek und weitere Beispiele nur mit Contract-/A11y-/Regressionstests |
| **M8 Automatisierung** | P2 | Orchestrator + Foundation | G6 | Bei Bedarf visuelle Baselines, Komponenten-Importpipeline oder ausführbare Agenten-Runtime mit separatem ADR |

### M0 — Governance und belastbare Entscheidungen

1. Repo-Basis und `AGENTS.md` übernehmen, Agentenrollen auf UI Showroom anpassen.
2. Produkt, Architektur, Abnahme und Roadmap in `docs/` aufnehmen.
3. Arbeitsprozess, QA-Gates und PR-Template einführen.
4. React/TypeScript/Build-Tool, Node-LTS, Package-Manager und zwei Frameworks auswählen, Lizenzen prüfen, ADR-001/002 abschließen.

**M0 ist erst Done**, wenn Punkt 4 entschieden ist. Der Dokumenten-PR allein schließt M0 nicht ab.

### M1 — Foundation (ein Agent owns shared core)

1. App-Skeleton, Versionen/Lockfile, Dev-/Build-Skripte.
2. Grundlayout, Routing, Fehlergrenzen, 404.
3. TypeScript strict, Lint/Format, Unit-Test-Runner.
4. CI-Jobs für Build und Unit-Test; README Quickstart.

**Tests:** sauberer Checkout → Install → Dev → Build → Typecheck/Lint/Unit. Vor G1 keine Adapter parallel.

### M2 — Kanonische Beispiele und Contracts

1. Einheitliches Beispielmodell, feste Demo-Daten und Zustandsmatrix.
2. Referenztypen für Button, Input inkl. Fehler, Select, Dialog.
3. Gemeinsame Interaktions-/A11y-Kriterien.
4. Contract-Test-Harness, stabiler Adapter-Registry-Ansatz.

**Tests:** jede Pflichtvariante ist definiert; fehlende Adapter-Fälle geben keine falschen Erfolge aus.

### M3/M4 — Adapter-Implementierung

1. Referenzadapter A liefert alle Pflichtbeispiele und die erste dokumentierte Integrationsanleitung.
2. Adapter B implementiert identische Contracts ohne Shared-Core-Änderungen.
3. Vergleichsmatrix erzeugen: `supported` / `partial` / `unsupported` mit Begründung.
4. Cross-Library-Regressionscheck nach jeder Contract-Änderung.

**Parallelisierung:** Nach G2 können Adapter in getrennten Ordnern parallel vorbereitet werden; G3 des Referenzadapters muss vor finalem G4-Paritätsreview grün sein.

### M5 — Nutzerorientierte Vergleichsansicht

1. Filterbare Katalognavigation und Suche.
2. Bibliothek/Variante auswählen und zwei Implementierungen gleichzeitig sehen.
3. Parameter in URL, Links direkt öffnbar, Browser-Back/Forward.
4. Mobile Einspaltenansicht, Empty/Error States, verständliche Library-Limits.

**Tests:** E2E-Wechsel, Keyboard, 320/360/768/1280 px, kein unbeabsichtigtes horizontales Scrollen.

### M6 — Releasegate

1. CI-Tests, Dependencies und Lizenzen prüfen.
2. Keyboard- und Screenreader-Smokes gegen alle Pflichtfälle.
3. Browsercheck und manuelle Akzeptanzmatrix abzeichnen.
4. Quickstart, bekannte Abweichungen, Lizenzhinweise und ggf. Hostinganleitung dokumentieren.
5. Versioniert veröffentlichen; bei blockierendem P0 kein Release als „fertig“.

## Vorgeschlagene Arbeitspakete nach Abhängigkeit

| Paket | Ziel | Kann parallel laufen mit |
| --- | --- | --- |
| UI-001 | M0 ADR-001/002 und Scope abschließen | initialer Docs-/Governance-Review |
| UI-002 | M1 App + Dev-/Build-Tooling | UI-003 CI-Grundgerüst, sofern getrennte Dateien |
| UI-003 | M1 Typecheck/Lint/Test-CI | UI-002 nach Toolchain-Vereinbarung |
| UI-004 | M2 Catalog-Contract + Test-Harness | QA-Testplan (ohne Contract-Modifikation) |
| UI-005 | M3 Referenzadapter A | QA-Review |
| UI-006 | M4 Adapter B | Nach G2: isoliert vorbereitbar; G4 erst nach G3 |
| UI-007 | M5 Navigation/Side-by-Side/URL-State | UX-Tests nach stabilem Contract |
| UI-008 | M6 A11y, Regression, Release-Dokumentation | laufende QA seit M1 |

## Kritischer Pfad

```text
M0 (G0) → M1 (G1) → M2 (G2) → M3 (G3) → M4 (G4) → M5 (G5) → M6 (G6)
```

QA und Dokumentation begleiten alle Phasen. Zusätzliche Adapter dürfen den kritischen Pfad nicht blockieren. Ein Issue wechselt erst bei bestandenem Gate in „Done“. Kein Termin- oder Fertigstellungsversprechen wird aus dieser Planung abgeleitet.

## Definition of Done und Nachweise

Jeder PR liefert Akzeptanzkriterien, Testkommando + Ergebnis, ggf. Screenshots, A11y-/Responsive-Prüfung und den Handover an die Folgerolle. Die detaillierten Prüfungen stehen in [`docs/ACCEPTANCE_TESTS.md`](ACCEPTANCE_TESTS.md).

## Risiken / Gegenmaßnahmen

| Risiko | Gegenmaßnahme |
| --- | --- |
| Unterschiedliche APIs/Interaktionen | zentraler Contract, Capability-Matrix, G2 vor Adapter |
| Theme-/CSS-Kollisionen | scoped Styles, Architekturreview, ggf. Isolation per ADR |
| Fehlende a11y-Parität | frühzeitige Keyboard- und Screenreader-Checks, QA-Merge-Gate |
| Wechselnde Bibliotheksversionen | Versionsfixierung/Lockfile, kontrollierte Dependency-Upgrades |
| Zu frühe Parallelität | Shared-Core-Owner, PRs pro Adapter, Contract-Change-Review |
| Roadmap als „bereits implementiert“ missverstanden | dokumentierter Status und PR-/CI-Nachweise pro Gate |
