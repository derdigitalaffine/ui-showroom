# Architecture Decision Record / Entscheidungslog

## ADR-000 — Arbeitsorganisation

- **Status:** angenommen, 2026-11-05
- **Entscheidung:** Die Dokumenten- und Agentenführung aus `derdigitalaffine/kostuemwettbewerb` wird für `ui-showroom` übernommen: `AGENTS.md`, Roadmap, Akzeptanzkriterien, kleine PRs, Rollen, Abhängigkeiten und Gates.
- **Nicht übernommen:** Django-Stack, Veranstaltung, personenbezogene Daten, Jury-/Foto-Workflows.
- **Konsequenz:** Dokumentierte Orchestrierung, **keine** laufende Agenten-Engine. Erweiterung nur durch separaten Entscheid.

## ADR-001 — Technologiestack (offen, Gate G0)

- **Vorschlag:** React, TypeScript und Vite; statisch auslieferbar.
- **Noch zu entscheiden:** Node-LTS, Package-Manager, Router, Testframework, Hosting.
- **Kriterium:** minimaler reproduzierbarer Build, unkomplizierte Adapterintegration und überschaubare Dependencies.

## ADR-002 — MVP-Bibliotheken (offen, Gate G0)

- **Vorschlag:** zwei geeignete React-UI-Bibliotheken als Start, eine dritte in P1.
- **Noch zu entscheiden:** konkrete Namen, Versionen, CSS-Isolation, Lizenzstatus, Kompatibilität.
- **Kriterium:** dieselben vier Pflichtkomponenten und deren Zustände müssen grundsätzlich abbildbar sein.

## ADR-003 — Komponenten-Contract (offen, Gate G2)

- **Vorschlag:** kanonische Beispieldefinitionen und Adapter-Interface, Versionierung bei Breaking Changes.
- **Noch zu entscheiden:** exakte Props, Zustandsmatrix, Variante-/URL-Schema, erwartetes Keyboard-Verhalten.
- **Kriterium:** Contract-Tests funktionieren für den Referenzadapter und alle Folgeadapter.

## Entscheider und Workflow

Orchestrator / Tech Lead zeichnet die ADRs nach Review durch betroffene Rollen ab. Jeder bestätigte Entscheid dokumentiert **Datum, Status, Alternativen, Folgen und betroffene Dateien**. Änderungen erfolgen per PR, nicht im stillen Alleingang.
