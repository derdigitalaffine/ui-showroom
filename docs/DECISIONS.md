# Architecture Decision Record / Entscheidungslog

## ADR-000 — Arbeitsorganisation

- **Status:** angenommen, 2026-11-05
- **Entscheidung:** Die Dokumenten- und Agentenführung aus `derdigitalaffine/kostuemwettbewerb` wird für `ui-showroom` übernommen: `AGENTS.md`, Roadmap, Akzeptanzkriterien, kleine PRs, Rollen, Abhängigkeiten und Gates.
- **Nicht übernommen:** Django-Stack, Veranstaltung, personenbezogene Daten, Jury-/Foto-Workflows.
- **Konsequenz:** Dokumentierte Orchestrierung, **keine** laufende Agenten-Engine. Erweiterung nur durch separaten Entscheid.

## ADR-001 — Technologiestack (angenommen, 2026-11-05, Gate G0)

- **Entscheidung / Owner:** Orchestrator bestätigt React 19.3.1, TypeScript 6.0.3, Vite 8.3.6, npm mit committed `package-lock.json` und Node.js 24 LTS für Entwicklung und Build. Ein statisches Build wird im Container mit nginx-unprivileged ausgeliefert; optional übernimmt vorgeschaltetes Caddy TLS und Reverse Proxy. Ohne Proxy ist die App über einen konfigurierbaren HTTP-Port erreichbar. URL-Query-Parameter bilden den Deep Link ohne zusätzliche Router-Abhängigkeit. Vitest 5.1.0 prüft Contracts; Browser- und Interaktionsprüfungen werden separat geführt.
- **Alternativen:** Next.js und Backend-Rendering wären für statische Beispiele unnötige Betriebsfläche. pnpm und ein zusätzlicher Router erhöhen die Einstiegshürde ohne MVP-Nutzen. Ein dynamischer Node-Server ist für den ausgelieferten Build nicht nötig.
- **Begründung:** Die App bleibt als statisches Artefakt reproduzierbar und kann direkt oder hinter einem Reverse Proxy laufen. Vite 8.3.6 erlaubt Node >=22.12; Node 24 ist LTS. Paketversionen werden im Lockfile exakt fixiert.
- **Folgen / Dateien:** `package.json`, Lockfile, `src/app`, CI, Container- und Deploy-Dateien. Änderungen an Toolchain, URL-Schema oder Runtime brauchen ein neues ADR-Review.
- **Quellen (2026-11-05):** [React-Versionen](https://react.dev/versions), [Node-Releases](https://nodejs.org/en/about/previous-releases), [Vite-Anforderungen](https://vite.dev/guide/). Konkrete Paketversionen und Peer-Abhängigkeiten wurden zusätzlich über npm-Metadaten geprüft.

## ADR-002 — MVP-Bibliotheken (angenommen, 2026-11-05, Gate G0)

- **Entscheidung / Owner:** Orchestrator wählt Material UI (`@mui/material` 9.5.0) und Mantine (`@mantine/core` und `@mantine/hooks` 9.7.5) als echte MVP-Adapter. React 19.3.1 erfüllt die Peer-Anforderungen beider. Beide Bibliotheken stehen unter MIT. Emotion ist für MUI erforderlich. Die vier verpflichtenden Referenzfälle sind Button, Textfeld mit Validierung, Select und Dialog.
- **Alternativen:** Chakra UI, Ant Design und weitere React-Bibliotheken sind Kandidaten für P1. Sie werden im Frontend als recherchierbare Bibliotheksübersicht geführt, aber nicht als implementierte, gleichwertige Adapter ausgegeben.
- **Begründung:** Zwei vollständige Integrationen geben einen überprüfbaren Vergleich; eine umfangreiche, klar gekennzeichnete Übersicht erfüllt den Wunsch nach breiter Darstellung ohne ungetestete Interaktionen vorzutäuschen.
- **CSS-Isolation:** Adapter kapseln Provider und UI-Elemente in ihrem Verzeichnis. Der Showroom besitzt eigene Shell-Styles. Bibliotheks-CSS darf gemeinsame Demo-Daten und Zustandslogik nicht überschreiben.
- **Folgen / Dateien:** `src/adapters/mui`, `src/adapters/mantine`, Katalog-Registry, Paritäts- und A11y-Tests. Die Übersicht unterscheidet sichtbar `live` und `geplant`.
- **Quellen (2026-11-05):** [MUI-Installation und React-Peers](https://mui.com/material-ui/getting-started/installation/), [MUI-MIT-Lizenz](https://mui.com/pricing/), [Mantine React-19.2-Anforderung](https://mantine.dev/guides/8x-to-9x/), [Mantine-MIT-Lizenz](https://mantine.dev/getting-started/). Exakte Versionen wurden über npm-Metadaten geprüft.

## ADR-003 — Komponenten-Contract (angenommen, 2026-11-05, Gate G2)

- **Entscheidung / Owner:** Der Katalog definiert genau vier stabile IDs: `button`, `input`, `select`, `dialog`. `button` und `dialog` haben `default`, `disabled`, `loading`; `input` und `select` haben `default`, `disabled`, `error`. Gemeinsame Beschriftungen, Optionen, Meldungen und Validierungen stehen ausschließlich in `src/catalog/index.ts`.
- **Adapter-Interface:** `AdapterDefinition` enthält `id`, `name`, eine `render`-Komponente und eine Capability-Matrix je Komponente und Variante. `AdapterProps` enthält `component`, `variant` und `onAction(message)`. Der Capability-Status ist `supported`, `partial` oder `unsupported`; fehlende Einträge werden als `unsupported` samt Begründung angezeigt. Beide Live-Adapter müssen jeden Katalogzustand explizit ausweisen.
- **URL-Schema:** Query-Parameter `component`, `variant`, `left`, `right` kodieren die Vergleichsansicht. Standard ist `button/default` mit `mui` links und `mantine` rechts. Ungültige Werte fallen auf gültige Standards zurück und erzeugen eine sichtbare Meldung; Back/Forward liest den URL-Zustand erneut ein. Die Bibliotheksübersicht ist eine lokale Ansicht und derzeit kein Deep-Link-Parameter.
- **Interaktionsziel:** Button löst genau eine Aktion aus; deaktivierte und ladende Zustände lösen keine aus. Textfeld und Select verwenden zentrale Validierung und sichtbare Fehlermeldung. Dialog öffnet per Trigger, schließt per Abbruch oder Escape und meldet nur bei Bestätigung Erfolg. Beide Adapter müssen Tastatur- und Fokusverhalten anhand derselben Kriterien prüfen.
- **Alternativen:** Library-spezifische Demo-Daten oder freie Variantenkombinationen wurden verworfen, weil sie den Vergleich verfälschen. Ein separates Routing-Paket ist für das Query-Schema nicht erforderlich.
- **Folgen / Dateien:** `src/contracts`, `src/catalog`, `src/adapters`, `src/showcase`. Breaking Changes an IDs, Varianten, Props oder URL-Parametern erfordern Review und Regression für alle Adapter.

## Entscheider und Workflow

Orchestrator / Tech Lead zeichnet die ADRs nach Review durch betroffene Rollen ab. Jeder bestätigte Entscheid dokumentiert **Datum, Status, Alternativen, Folgen und betroffene Dateien**. Änderungen erfolgen per PR, nicht im stillen Alleingang.

## ADR-004 — Temporäre Docker-Platzhalterseite (abgelöst, 2026-11-05)

- **Entscheidung:** Bis der React-Showroom fertig ist, liefert ein einzelner `nginx:stable-alpine`-Container statisches HTML/CSS über Docker Compose aus.
- **Ziel:** Sofort erreichbare, ansprechende Projekt-Landingpage mit separatem Healthcheck, ohne Build-Toolchain, Backend, Speicherung oder Laufzeit-Secrets.
- **Standard:** `0.0.0.0:8080`; `APP_PORT` und `BIND_ADDRESS` konfigurierbar. Öffentliche TLS-Terminierung übernimmt bei Bedarf ein externer Reverse Proxy.
- **Alternativen:** Vite-Dev-Server (für einen Placeholder unnötig), eigene React-App (zu frühe M1-Festlegung).
- **Folgen:** Dieser zeitlich begrenzte Pfad wurde durch ADR-001 und die implementierte React-App ersetzt. Der Platzhalter, seine Compose-Konfiguration und der zugehörige CI-Smoke wurden entfernt; `docker compose up` startet nun den echten Showroom. Die historischen Gründe bleiben hier dokumentiert.
