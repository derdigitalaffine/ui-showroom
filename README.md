# UI Showroom

Ein React-Showroom, der identische Referenzfälle in Material UI und Mantine nebeneinander zeigt. Button, Textfeld, Select und Dialog teilen dieselben Inhalte und Interaktionsziele. Eine gesonderte Übersicht führt weitere React-UI-Bibliotheken auf; sie sind klar als **geplant** gekennzeichnet und werden nicht als implementierte Adapter ausgegeben.

## Lokal starten

Node.js 24 und npm werden benötigt.

```sh
npm ci
npm run dev
```

Vite zeigt die lokale Adresse an. Der Showroom speichert Komponente, Variante und die beiden Bibliotheken in der URL. Ein Beispiel ist `?component=input&variant=error&left=mui&right=mantine`.

## Qualität prüfen

```sh
npm run lint
npm run typecheck
npm test
npm run build
```

Die App ist statisch und benötigt weder Backend noch Zugangsdaten. Der Produktions-Build liegt in `dist/`. CI führt die vier Prüfungen mit Node 24 aus.

## Docker Compose

Direkter HTTP-Zugang:

```sh
cp .env.example .env
python3 scripts/deploy.py http
```

Standardadresse: `http://127.0.0.1:8080`. Für Netzwerkzugriff `HTTP_BIND=0.0.0.0` in `.env` setzen. `python3 scripts/deploy.py` öffnet in einem Terminal ein ncurses-Menü. Für den optionalen Caddy-Proxy `CADDY_SITE` in `.env` setzen und `python3 scripts/deploy.py proxy` ausführen. Weitere Optionen und Rückfallverfahren stehen in [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

## Struktur und Entscheidungen

- [Produktziel](docs/PRODUCT_SPEC.md) und [Architektur](docs/ARCHITECTURE.md)
- [Technik- und Contract-Entscheidungen](docs/DECISIONS.md)
- [Agentenrollen](docs/AGENT_ORCHESTRATION.md), [Roadmap](docs/ROADMAP.md) und [Akzeptanzmatrix](docs/ACCEPTANCE_TESTS.md)

Der Katalog und die fachlichen Validatoren liegen in `src/catalog/`, der Adapter-Vertrag in `src/contracts/`. Bibliotheksspezifische Implementierungen liegen in `src/adapters/`; Navigation und Vergleich in `src/showcase/`.

## Bekannte Grenzen

- Öffentliches HTTPS benötigt eine eigene Domain sowie erreichbare Ports 80 und 443; ein Domain-Zertifikat wurde lokal nicht getestet.
- Die Übersicht weiterer Bibliotheken enthält keine interaktiven Adapter für diese Bibliotheken.
- Eine vollständige WCAG-Zertifizierung wird nicht behauptet. Automatische Tests ergänzen die in der [Akzeptanzmatrix](docs/ACCEPTANCE_TESTS.md) beschriebenen manuellen Tastatur-, Screenreader- und Responsive-Prüfungen.
- Der Build meldet derzeit ein großes JavaScript-Bundle. Code-Splitting ist ein Folgepunkt.
