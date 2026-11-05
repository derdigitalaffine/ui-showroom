# UI Showroom

Ein geplanter React-Showroom zum nachvollziehbaren Vergleichen unterschiedlicher UI-Frameworks und Komponentenbibliotheken.

> **Status:** Repository-Basis und Arbeitsorganisation. Ein lauffähiger Showroom ist noch nicht implementiert.

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
