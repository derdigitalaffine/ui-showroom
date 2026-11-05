# Architektur — UI Showroom (Zielbild)

## Status

**Zielarchitektur, noch kein implementierter Code.** Technische Festlegungen werden durch M0-ADR bestätigt.

## Vorschlag

Eine statisch auslieferbare **React + TypeScript**-Anwendung mit einem modernen Frontend-Build (Vite als Ausgangsvorschlag), ohne notwendiges Backend. Bibliotheksübergreifende Contracts und Demo-Daten sind zentral; UI-Frameworks werden in isolierten Adaptern angebunden.

## Verantwortungsgrenzen

```text
src/
  app/            # Bootstrap, Routing/URL-State, Fehlergrenzen
  catalog/        # kanonische Beispiele, Szenarien und Metadaten
  contracts/      # Typen/Interface und Shared State Machine
  adapters/
    <library-a>/  # UI-Mapping auf Library A
    <library-b>/  # UI-Mapping auf Library B
  showcase/       # Navigation, Auswahl, Zwei-Spalten-Vergleich
  styles/         # showroom-eigene Tokens und Shell-Styles
tests/            # Contract-, Komponenten-, Browser- und A11y-Tests
docs/             # Produkt, Architektur, Roadmap, QA und Entscheidungen
```

## Contract-First

Ein Beispiel definiert unabhängig von der Bibliothek:
- `id`, `title`, Kategorie und Beschreibung;
- kanonische Varianten (Default, Disabled, Error, Loading soweit sinnvoll);
- identische Texte, Props und Testdaten;
- erwartete Nutzeraktionen, Fokus-/Keyboard-Verhalten;
- bekannte, transparente Bibliotheksabweichungen.

Adapter rendern die zentral beschriebenen Beispiele, ohne sie semantisch zu verändern. Der Katalog/Contract-Agent besitzt das Interface. Jede Änderung muss gegen alle existierenden Adapter geprüft werden.

## CSS-/Design-Isolation

- Showroom-Shell und Adapter-Styles getrennt halten.
- Globale CSS-Resets und CSS-Variablen explizit kontrollieren; keine unbemerkte Stilüberschreibung zwischen Bibliotheken.
- Styling-Konflikte zuerst durch Scoping oder explizite Container lösen; schwergewichtige iframe-Isolation nur nach Messung/ADR.
- Bibliotheksspezifische Themes dürfen sich sichtbar unterscheiden, Referenzinhalt und Interaktionsziel nicht.

## Navigation und Zustand

- Katalogeintrag, gewählte Bibliotheken und Variante bilden reproduzierbaren UI-State.
- Deep Links verwenden normale URL-Pfade bzw. Query-Parameter.
- Ungültige IDs und nicht unterstützte Zustände zeigen eine verständliche Fallback-Anzeige.

## Fehler- und Sicherheitsmodell

- Statische, versionierte Demo-Daten; keine personenbezogenen Daten nötig.
- Keine ungeprüfte Ausführung fremder Snippets.
- Dependency- und Lizenzprüfung bei jeder neuen Bibliothek.
- Fehlergrenzen pro Beispiel verhindern, dass ein kaputter Adapter den ganzen Showroom lahmlegt.

## Teststrategie (an die Roadmap gekoppelt)

- M1: Format/Lint/Typecheck/Unit/Build.
- M2: Contract-Schema und Zustandsmatrix.
- M3–M4: Adapter-Parität, keyboard/aria Interaktionen, Integration.
- M5: Browser-Smoke, URL-/Responsive-Verhalten.
- M6: A11y-Audit, License/Dependency Check, Release-Dry-Run.

Die CI prüft **anfangs nur die Dokumentenbasis**. Die produktiven Build-/Browser-Jobs werden nach dem jeweiligen Meilenstein ergänzt; bis dahin ist nichts als bestanden anzusehen.

## Architekturentscheidungen

Alle verbindlichen Entscheidungen mit Datum, Alternativen, Folgen und Owner in `docs/DECISIONS.md` festhalten. Bibliothek und Toolchain dürfen nicht allein durch diese Vorschlagsarchitektur als freigegeben gelten.
