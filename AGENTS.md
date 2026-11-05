# AGENTS.md — UI Showroom

## Mission

Baue einen verständlichen, wartbaren React-UI-Showroom, in dem sich **dieselben** Komponenten, Zustände und Interaktionen über mehrere UI-Bibliotheken fair vergleichen lassen. Vergleichbarkeit, Zugänglichkeit und reproduzierbares Verhalten gehen vor Feature-Breite.

Die **Arbeitsorganisation** ist aus `derdigitalaffine/kostuemwettbewerb` übernommen und fachlich angepasst. Django-, Event- und Datenschutz-Sonderregeln werden **nicht** kopiert.

## Read first

Vor einer Codeänderung in dieser Reihenfolge lesen:

1. `README.md`
2. `docs/PRODUCT_SPEC.md`
3. `docs/ARCHITECTURE.md`
4. `docs/AGENT_ORCHESTRATION.md`
5. `docs/ROADMAP.md`
6. `docs/ACCEPTANCE_TESTS.md`
7. `docs/DECISIONS.md`

Bei Widerspruch zwischen Issue und Spezifikation nicht stillschweigend Produktverhalten ändern: Konflikt im PR dokumentieren, Entscheidung im Entscheidungslog nachtragen und erst anschließend implementieren.

## Verbindliche Produkt- und Technikregeln

- React ist gesetzt; konkrete Toolchain, Package-Manager und Bibliotheken werden in M0 als ADR entschieden. Bis dahin keine produktiven Abhängigkeiten als vermeintlich beschlossen einbauen.
- Bibliotheken werden über klar abgegrenzte Adapter integriert. Kein Framework darf heimlich gemeinsame Komponenten, globale CSS-Regeln oder Vergleichsdaten verändern.
- Vergleichbare Beispiele benutzen **dieselben Inhalte, Zustände, Validierungen und Interaktionsziele**. Unterschiede werden sichtbar benannt, nicht verdeckt.
- Referenzfälle und Beispielzustände sind zentral definiert, statt pro Bibliothek abweichend dupliziert.
- Keine Backend-, Auth-, Tracking- oder Analytics-Pflicht für den MVP. Erweiterungen benötigen ein Issue und einen Architekturentscheid.
- Keine echten Secrets, Tokens, Kundendaten oder lizenzrechtlich ungeklärten Assets committen.
- Neue Dependencies nur mit nachvollziehbarer Begründung (Lizenz, Wartungsstand, Bundle-Folgen, Alternativen).
- Keine ungeprüften HTML-Injektionen; externe Links und fremde Inhalte sicher behandeln.

## UX-/Accessibility-Invarianten

1. Navigation, Formulare, Tabs/Dialoge sind mit Tastatur nutzbar.
2. Fokus sichtbar, Labels programmatisch zugeordnet, Fehlermeldungen verständlich.
3. Ziel: WCAG 2.2 AA, insbesondere Kontrast, Fokusführung und Touch-Ziele.
4. Referenzbreiten: 320, 360, 768 und 1280 px, ohne unbeabsichtigtes horizontales Scrollen.
5. Bewegung respektiert `prefers-reduced-motion`.
6. Eine fehlende Library-Funktion wird als *nicht unterstützt* gekennzeichnet, nicht als erfolgreich implementiert ausgegeben.
7. Ein Framework-Vergleich bewertet keine Bibliothek durch künstlich ungleiche Beispiele.

## Agentenrollen und Reihenfolge

Die zuständigen Rollen, Handovers, Ownership-Grenzen und Gates stehen verbindlich in [docs/AGENT_ORCHESTRATION.md](docs/AGENT_ORCHESTRATION.md).

Grundreihenfolge:
1. Foundation-Agent (Toolchain, CI, Grundgerüst)
2. Catalog/Contract-Agent (kanonische Beispiele und Schnittstellen)
3. Framework-Adapter-Agent (eine Referenzintegration, danach weitere)
4. Showcase/UX-Agent (Navigation, Suche, Vergleichsansicht)
5. Security/Accessibility/QA-Agent (prüft jede Phase, finale Abnahme)
6. Release/Docs-Agent (Betrieb, Nachvollziehbarkeit, Veröffentlichung)

Ein koordinierender Orchestrator/Tech Lead verantwortet Issue-Zuschnitt, Abhängigkeiten und Merge-Gates, ist aber **keine automatisch laufende Agenten-Engine**.

## Bearbeitungsregeln

- Pro Agent und Branch ein kleines, prüfbares Issue oder eng zusammenhängendes Paket.
- Shared Core (`src/app`, `src/catalog`, Routing, zentrale Styles, Build) niemals gleichzeitig von mehreren Agenten ohne ausdrücklichen Integrationsplan bearbeiten.
- Adapter können **erst nach stabiler Contract-Version** in getrennten Ordnern parallel entstehen.
- Änderungen an gemeinsamen Contracts brauchen einen expliziten Review und Tests für **alle** bestehenden Adapter.
- Keine Behauptung eines bestandenen Tests, wenn der Test nicht ausgeführt wurde. Risiken und ausgelassene Checks separat nennen.
- Neue Features: zuerst Akzeptanzkriterien, dann Implementierung, dann passende Tests und Dokumentation.
- Keine direkte Arbeit auf `main` nach dem Repo-Bootstrap; Feature-Branch und PR bevorzugen.

## Tests und Merge-Gates

In M0 gilt das Dokumentations-Gate; ab M1 werden Build, Typecheck, Lint und Unit-Tests verpflichtend; ab M3 Integrations-/A11y-Tests; ab M5 zusätzlich Browser-Smokes und Vergleichsansicht. Details und manuelle Abnahmen: `docs/ACCEPTANCE_TESTS.md`.

Ein Issue ist **Done**, wenn:
- die dokumentierten Akzeptanzkriterien nachgewiesen sind,
- die passenden automatisierten Checks laufen und bestehen,
- Keyboard-/Responsive-Prüfung erfolgt ist, soweit UI betroffen,
- Contract-/Parity-Unterschiede dokumentiert sind,
- README, Spezifikation oder ADR bei Änderungen aktualisiert wurden,
- Review, Sicherheitsprüfung und PR-Gate abgeschlossen sind.

## PR-/Commit-Dokumentation

Jeder PR nennt: Issue, verantwortliche Rolle, Zweck, geänderte Oberfläche/Contracts, Dependencies, durchgeführte Prüfungen mit Ergebnissen, manuelle Checks, bekannte Grenzen, Screenshots für relevante UI-Änderungen und Rückfall-/Rollback-Hinweise.

## Prioritätsregel

- **P0:** Vergleichbarkeit, stabiles Fundament, Accessibility-Basics und reproduzierbare Tests.
- **P1:** Zusatzframeworks, erweiterte Beispiele, visuelle Regressionen/Performance-Auswertung.
- **P2:** Komfortfunktionen, externe Integrationen und Automatisierung über den MVP hinaus.

Kein P1/P2 darf ein offenes P0-Gate verdrängen.
