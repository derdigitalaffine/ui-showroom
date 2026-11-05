# Akzeptanztests — UI Showroom

Die Szenarien definieren den überprüfbaren Nachweis für die Gates der [Roadmap](ROADMAP.md). **Status:** geplant. Ohne implementierten Anwendungscode sind die Anwendungstests noch **nicht durchgeführt**.

## A. Governance (Gate G0)

### A1 Repository-Organisation
- `README.md`, `AGENTS.md`, Produkt-, Architektur-, Orchestrierungs-, Roadmap-, Entscheidungs- und Akzeptanzdokumente vorhanden.
- Referenzen und lokalen Markdown-Links funktionieren.
- PR-Template benennt Rolle, Kriterien, Checks, Handover und Risiken.
- CI prüft zunächst ausschließlich die Dokumentationsbasis.

### A2 Produkt-/Stack-Entscheide
- Zwei konkrete React-UI-Bibliotheken, kompatible Versionen und Lizenzen festgelegt.
- Frontend-Toolchain, Node-LTS, Package-Manager, Routing und Tests im ADR bestätigt.
- Vier Pflichtbeispiele und Mindestzustände schriftlich festgelegt.
- Keine unentschiedenen MVP-Blocker als erledigt markiert.

## B. Foundation (Gate G1)

### B1 Reproduzierbarkeit
- Frischer Checkout, dokumentierte Runtime installieren, Dependencies lockfiletreu installieren.
- Dev-Server startet; Landingpage erscheint.
- Production Build, Typecheck, Lint und Unit-Tests bestehen.
- CI startet bei Push und PR; keine produktiven Secrets nötig.
- Bei fehlenden Lockfiles/Build-Skripten bleibt G1 offen.

### B2 Fehlerfälle
- Unbekannte Route zeigt ein verständliches 404/Empty State.
- Ein Renderingfehler im Beispiel bringt nicht das gesamte Showroom zum Absturz.
- Unbekannte Library-ID oder Komponenten-ID liefert eine verständliche, sichere Fallback-Anzeige.

## C. Canonical Catalog & Contract (Gate G2)

### C1 Katalog
- Button, Textfeld mit Fehlerzustand, Select und Dialog existieren als zentrale Beispieldefinitionen.
- Varianten sind transparent dokumentiert: Default, Disabled, Error und Loading, soweit fachlich sinnvoll.
- Inhalte, Beschriftungen, Optionen und Aktionen werden **zentral** gespeichert.
- Jeder Fall hat eine stabile ID und reproduzierbare Testdaten.

### C2 Schnittstellen
- Adapter erfüllen ein typisiertes, getestetes Interface.
- Fehlende Capability wird explizit als `partial` oder `unsupported` gezeigt.
- Breaking Contract-Änderungen erfordern Anpassung der bestehenden Adapter-Tests.

## D. Adapter A / B (Gates G3, G4)

### D1 Funktionsparität
Für **beide** Bibliotheken:
- Button clickt genau einmal; Disabled verhindert die Aktion.
- Textfeld besitzt Label, Validierung und sichtbare Fehlermeldung.
- Select zeigt dieselben Optionen und liefert den gewählten Wert.
- Dialog kann geöffnet und geschlossen werden; Escape und Fokusverhalten sind geprüft.
- Gleiche kanonische Beispieltexte und gleiche fachliche Zustandswechsel.

### D2 Integration / CSS
- Theme/CSS von A verändert Darstellung und Funktion von B nicht unbeabsichtigt.
- Shell-Styling bleibt stabil beim Adapterwechsel.
- Ununterstützte Varianten sind nachvollziehbar bezeichnet, nicht als „bestanden“ dargestellt.

### D3 Tests
- Contract-/Komponententests pro Adapter.
- Interaktionstests für Klick, Tastatur, Fehler, Disabled.
- QA dokumentiert Library-spezifische Abweichungen und ihre Auswirkung.

## E. Navigation und Vergleich (Gate G5)

### E1 Showroom-Ablauf
1. Katalog öffnen, Komponente auswählen.
2. Variante auswählen.
3. Library A und B nebeneinander anzeigen.
4. Library wechseln; Beispieltyp und relevante Variante bleiben erhalten.
5. Deep Link kopieren und in neuem Tab öffnen; dieselbe Ansicht entsteht.
6. Browser Back/Forward stellt den vorherigen Zustand wieder her.

### E2 Suche/Filter/Fehler
- Suche findet bekannte Komponenten.
- Kein Treffer zeigt Empty State und bietet Reset.
- Ungültiger Deep Link führt nicht zu einer leeren/kaputten Seite.

## F. Accessibility (Gate G6, laufend ab G3)

- Alle wichtigen Controls per Tab/Shift-Tab erreichbar, sichtbarer Fokus.
- Button/Select/Textfeld/Dialog können ohne Maus bedient werden.
- Dialog: initialer Fokus, Fokus im Dialog, Escape-Schließen und Rückgabe des Fokus nach Schließen geprüft (soweit dem Contract entsprechend).
- Labels und Fehlermeldungen semantisch verbunden.
- Ausreichende Kontraste und verständliche Statusmeldungen; Ziel WCAG 2.2 AA.
- Respektiert reduzierte Bewegung.
- Automatischer A11y-Check plus manueller Keyboard-Smoke und ein Screenreader-Smoke; keine Behauptung einer vollständigen WCAG-Zertifizierung.

## G. Responsive UI (Gates G3/G5/G6)

Bei **320, 360, 768 und 1280 px**:
- Kein unbeabsichtigtes horizontales Scrollen.
- Navigations- und Vergleichssteuerung bedienbar.
- Side-by-Side wird auf kleinen Screens sinnvoll gestapelt.
- Dialoge und Formulare bleiben vollständig erreichbar.
- Touch-Ziele sind gut bedienbar; Fokus und Fehlermeldungen bleiben sichtbar.

## H. Sicherheit, Abhängigkeiten und Lizenzen (G6)

- Keine Secrets oder personenbezogenen Echtdaten im Repository.
- Keine unvalidierte HTML-Injektion oder untrusted Code-Ausführung.
- Abhängigkeiten haben überprüfte Lizenzen; Lizenz-/Attributionspflichten dokumentiert.
- Dependency-Scan: keine unbewerteten kritischen Sicherheitsfunde.
- CI benutzt minimale Berechtigungen und keine unbenötigten Schreib-Tokens.

## I. Release- und Dokumentationsabnahme (G6)

- README enthält echten Quickstart und Buildanleitung, keine nicht existierenden Kommandos.
- Frischer Checkout durch zweite Person/Agent nach Anleitung erfolgreich.
- Versions-/Abweichungsübersicht der Bibliotheken sichtbar.
- CI-Ergebnisse und manueller Prüfbericht an Release-PR angehängt.
- Bekannte Einschränkungen und Rollback-Prozess dokumentiert.
- P0-Blocker führen zu „nicht freigegeben“.

## J. Agenten-Handover

Für einen repräsentativen PR prüfen:
- Issue mit verantwortlicher Rolle, abgehakten Vorbedingungen und betroffenen Dateien.
- Code und Tests folgen dem festgelegten Contract.
- QA-Review enthält eigene Feststellungen, nicht nur die Behauptung des implementierenden Agenten.
- Orchestrator bestätigt Gate und merged erst dann.
- Nachfolge-Agent kann anhand Handover, ADR und Tests ohne verborgenes Kontextwissen starten.

## Teststand

| Prüfung | Aktueller Stand |
| --- | --- |
| Dokumentationsstruktur und lokale Links | durch initialen Docs-Workflow bei PR überprüfbar |
| React Build / Typecheck / Unit | offen bis M1 |
| Contract-/Adapter-Parität | offen bis M2–M4 |
| Browser / Responsivität / A11y | offen bis M3–M6 |
| Release-Dry-Run | offen bis M6 |

Es dürfen **keine** nicht ausgeführten Tests in einem PR als „grün“ beschrieben werden.
