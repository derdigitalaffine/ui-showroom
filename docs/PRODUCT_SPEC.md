# Product Spec — UI Showroom (Vorschlag)

## Vision

Ein **neutrales React-UI-Showroom** hilft Entwicklerinnen, Entwicklern und Designteams, Komponenten verschiedener React-UI-Bibliotheken mit **denselben** Beispieldaten, Zuständen und Interaktionen zu vergleichen. Das Ziel ist Orientierung, nicht eine automatisch erzeugte Bestenliste.

## Status und Grenzen

Diese Produktdefinition ist die initiale Arbeitsannahme. Das Repository enthält vor M1 **noch keine Anwendung**. Bibliotheken, exakte Versionen und Toolchain werden in M0 durch den Orchestrator in `docs/DECISIONS.md` bestätigt.

## Zielgruppen und Jobs to be done

- Frontend-Entwickler: Bibliotheks-APIs und Interaktionsunterschiede nachvollziehen.
- Designsystem-Teams: visuelle und funktionale Unterschiede in identischen Fällen prüfen.
- Reviewer: Tastatur-, Mobil- und Zustandsverhalten reproduzierbar vergleichen.

## MVP (P0)

1. Eine lokal und per Build startbare React-Webanwendung.
2. Ein gemeinsamer Katalog mit mindestens vier Beispieltypen: **Button**, **Textfeld inkl. Validierung**, **Select**, **Dialog**.
3. Mindestens **zwei** React-UI-Bibliotheken, ausgewählt und versionsfixiert in M0.
4. Pro Beispiel dieselben Texte, Daten, Zustände und erwarteten Aktionen: Default, Disabled, Error (wo sinnvoll), Loading (wo sinnvoll), Keyboard.
5. Bibliotheksauswahl und zwei Varianten nebeneinander vergleichen; mobile Einspaltendarstellung.
6. Deep Link zu einer Komponente und ausgewählter Bibliothek; verständliche Fallbacks.
7. A11y-Basis, Tests und CI; keine unbelegten Performance- oder Accessibility-Wertungen.

## P1 nach dem MVP

- Drittes Framework mit derselben Contract-Prüfung.
- Mehr Komponenten (Checkbox, Tabs, Toast, Table, Date Picker).
- Theme-/Dark-Mode-Vergleich und Token-Ansicht.
- Gezielte visuelle Regression und nachvollziehbare Paket-/Bundle-Metriken.

## Nicht im MVP (P2 / Out of Scope)

- Backend oder Benutzerkonten, persistente Nutzerprofile.
- Automatisches Importieren fremder Komponenten via Remote-Code.
- Öffentliche Framework-Ranglisten oder undokumentierte Scores.
- Vollständiger Theme-Editor und Codegenerator.
- Automatischer Multi-Agent-Runner (Governance ist zunächst dokumentiert, nicht ausführbar).

## Fachliche Akzeptanz

- Katalog enthält vier kanonische Beispiele.
- Beide Adapter erfüllen dieselben verpflichtenden Fälle; echte Abweichungen sind sichtbar.
- Komponentenwechsel und Bibliothekswechsel verlieren nicht unerwartet den Kontext.
- Kein erzwungener horizontaler Scroll bei 320/360 px.
- Tastatursteuerung und Fokus sind nachvollziehbar; keine kritischen bekannten A11y-Blocker.
- Build, Tests und dokumentierter Start funktionieren auf einem frischen Checkout.

## Offene Entscheidungen in M0

- Welche zwei UI-Bibliotheken sind die MVP-Vergleichspartner?
- Vite + React + TypeScript als vorgeschlagene Standardbasis bestätigen oder Alternativen begründen?
- Paketmanager und unterstützte Node-LTS-Version festlegen.
- Welche UI-Bibliotheksversionen/Lizenzen sind kompatibel?
- Welche Story-Zustände sind library-neutral, wo werden Adapter-spezifische Grenzen bewusst gezeigt?
