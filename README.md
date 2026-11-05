# UI Showroom

Ein geplanter React-Showroom zum nachvollziehbaren Vergleichen unterschiedlicher UI-Frameworks und Komponentenbibliotheken.

> **Status:** Die temporäre Docker-Platzhalterseite läuft eigenständig. Der eigentliche React-Showroom ist noch in Planung.

## Platzhalterseite sofort starten (Docker Compose)

Voraussetzung: Docker Engine und Docker Compose v2.

```bash
docker compose up -d
```

Danach erreichbar unter **http://localhost:8080**. Der Healthcheck antwortet unter **http://localhost:8080/health** mit `ok`.

```bash
docker compose ps             # Status/Health
docker compose logs -f        # Logs
docker compose down           # Beenden
```

Optional Port und Bind-Adresse festlegen, z. B. für einen vorhandenen HTTPS-Reverse-Proxy:

```bash
BIND_ADDRESS=127.0.0.1 APP_PORT=8081 docker compose up -d
```

Standardmäßig bindet Compose an `0.0.0.0:8080` (auf dem Host öffentlich erreichbar, sofern die Firewall es erlaubt). **Für öffentliche Domains TLS über einen Reverse Proxy konfigurieren.** Die nginx-Dateien liegen in `ops/nginx.conf`, die reine HTML/CSS-Seite in `placeholder/`. Es werden kein Node/npm, keine Datenbank und keine Secrets benötigt. Den späteren React-Build kann man statt des Platzhalterverzeichnisses ausliefern; die eigentliche App wird durch den Platzhalter nicht vorweggenommen.



## Ziel

Identische UI-Beispiele über mehrere React-UI-Bibliotheken hinweg präsentieren: konsistent in Inhalt und Verhalten, vergleichbar in Bedienbarkeit, Responsivität und Accessibility.

## Projektführung

Die Agentenorganisation wurde **methodisch** aus [kostuemwettbewerb](https://github.com/derdigitalaffine/kostuemwettbewerb) übernommen, nicht dessen Django-/Eventtechnik.

- [AGENTS.md](AGENTS.md) – verbindliche Regeln und Definition of Done
- [Agenten-Orchestrierung](docs/AGENT_ORCHESTRATION.md) – Rollen, Reihenfolge, Übergaben und Quality Gates
- [Produktziel und MVP](docs/PRODUCT_SPEC.md)
- [Architektur](docs/ARCHITECTURE.md)
- [Roadmap](docs/ROADMAP.md)
- [Akzeptanztests](docs/ACCEPTANCE_TESTS.md)
- [Entscheidungslog](docs/DECISIONS.md)

## Entwicklungsstart

1. [Roadmap: M0](docs/ROADMAP.md) und offene Entscheidungen prüfen.
2. Mit einem kleinen PR das technische Fundament aufbauen.
3. Eine Referenzkomponente implementieren, bevor weitere Frameworks parallel integriert werden.
4. Für jeden PR nach [AGENTS.md](AGENTS.md) testen und dokumentieren.

## Hinweis

Die Dokumente definieren die Zusammenarbeit von menschlichen und KI-Entwicklungsagenten. Sie **starten oder steuern keine Agenten automatisch**. Eine ausführbare Orchestrierung kann nach einem gesonderten Architekturentscheid ergänzt werden.
