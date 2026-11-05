# Akzeptanztests — UI Showroom

Die Szenarien definieren den überprüfbaren Nachweis für die Gates der [Roadmap](ROADMAP.md). **Status:** Anwendung und erste automatisierte Prüfungen sind implementiert; Browser-, Screenreader- und Release-Abnahmen stehen noch aus.

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
| Dokumentationsstruktur und lokale Links | Docs-Workflow vorhanden; lokal mit `python scripts/check_docs.py` geprüft |
| React Build / Typecheck / Unit | App-Workflow vorhanden; Ergebnis pro PR/Commit prüfen |
| Contract-/Adapter-Parität | Katalog- und Capability-Tests vorhanden; Browser-Interaktionstests offen |
| Browser / Responsivität / A11y | offen; kein automatisierter Browser-/Axe-Job und kein dokumentierter manueller Smoke |
| Release-Dry-Run | offen; Docker-Start in beiden Modi und manueller Freigabelauf nachweisen |

Es dürfen **keine** nicht ausgeführten Tests in einem PR als „grün“ beschrieben werden.

## K. Konkrete Freigabematrix für die Implementierung

Diese Matrix wird pro Release mit Datum, Commit-SHA, ausführender Person, Ergebnis und Link zum CI-Lauf oder einem kurzen manuellen Prüfprotokoll ausgefüllt. Ein leerer Nachweis bedeutet **offen**. Automatische Checks ersetzen die manuellen Tastatur- und Screenreader-Smokes nicht.

| Gate | Prüffall | Mindestnachweis | Blockiert bei |
| --- | --- | --- | --- |
| G1 | Clean Install, Typecheck, Lint, Unit, Build | CI-Lauf auf dem PR-Commit, Lockfile-Installation ohne Änderungen | Fehler oder nicht reproduzierbarer Build |
| G2 | Kanonische Daten und Varianten | Contract-Tests für alle vier Pflichtbeispiele und ihre sinnvollen Zustände | Abweichende Inhalte oder fehlende Zustandsdefinition |
| G3–G4 | Adapter-Parität | Parametrisierte Interaktionstests über beide Adapter; Capability-Matrix mit begründeten Abweichungen | Fehlende Pflichtfunktion oder irreführendes „supported“ |
| G5 | URL, Suche, Auswahl, Back/Forward | Browser-Test mit direktem Aufruf und Navigation | verlorener Zustand oder kaputte Fallback-Ansicht |
| G5–G6 | Responsive | Browserprüfung bei 320, 360, 768, 1280 px; Screenshot und Prüfung auf horizontales Überlaufen | unbedienbares Control oder verdeckte Inhalte |
| G6 | Accessibility | Automatischer Axe-Check plus dokumentierter Tastatur- und Screenreader-Smoke | kritischer Verstoß bei Fokus, Label, Dialog oder Kontrast |
| G6 | Sicherheit/Abhängigkeiten | Dependency-/Lizenzprüfung und Sichtprüfung auf Secrets, HTML-Injektion, unsichere externe Links | unbewerteter kritischer Fund |
| G6 | Docker-Auslieferung | Neu gebauter Stack per HTTP; optionaler Caddy-Stack; Healthcheck und Rückfallweg | Startfehler, fehlerhafte Proxy-Weiterleitung oder fehlende SPA-Fallbacks |

### Manuelle Prüfschritte

1. Je Adapter Button, Textfeld mit leerer/ungültiger Eingabe, Select und Dialog aus der Tastatur bedienen. Dialog per Escape schließen; Fokuskehr zum Auslöser prüfen.
2. Sichtbaren Fokus, verständliche Fehlermeldung und semantische Beziehung zwischen Label, Control und Fehler mit Browser-Accessibility-Tree oder Screenreader prüfen.
3. Variante und beide Bibliotheken wechseln; identischen Text, dieselben Optionen und dieselbe fachliche Aktion abgleichen. Bekannte Bibliotheksgrenzen in der Oberfläche mit der Capability-Matrix abgleichen.
4. Je Referenzbreite Suche, Navigation und Vergleich bedienen. Kein unbeabsichtigtes horizontales Scrollen; bei 320/360 px sind beide Vergleichskarten nacheinander erreichbar.
5. Einen Deep Link in einem neuen Tab öffnen, danach Browser Back/Forward benutzen; ungültige Komponenten-, Bibliotheks- und Varianten-IDs prüfen.
6. Mit reduzierter Bewegung testen. Mindestens ein Screenreader-Smoke umfasst Navigation, Eingabefehler und Dialogöffnung/-schließung.
7. Frischen Docker-Build und Start ohne Proxy sowie mit optionalem Caddy ausführen; Startseite und Deep Link direkt per HTTP abrufen. Container-Neustart und Stop/Start über das Deploy-Skript prüfen.

### Teststatus und Dokumentationspflicht

Dokumentations- und App-Workflow sind vorhanden. Browser-/Axe-Jobs und die manuellen Abnahmen fehlen weiterhin. Die Release-Freigabe nennt die tatsächlichen Ergebnisse je Commit und offene Prüfpunkte. Ein automatischer Axe-Lauf ist eine Teilprüfung und keine WCAG-Zertifizierung.

### Nachweis auf dem Feature-Branch (2026-11-05)

- `npm ci`, `npm run lint`, `npm run typecheck`, `npm test` (10 Tests) und `npm run build`: bestanden. Der Build meldet ein großes JavaScript-Bundle (624,51 kB minifiziert); Folge-Issue #16.
- `python3 scripts/check_docs.py`, `git diff --check`, `npm audit --omit=dev --audit-level=high`: bestanden; produktive Dependencies ohne Audit-Funde. Zehn moderate Funde im vollständigen Audit betreffen ausschließlich Entwicklungswerkzeuge.
- Browser-Smoke im lokalen Vite-Server: Showroom sichtbar; MUI- und Mantine-Dialog geöffnet, mit Escape geschlossen und Fokus zum Auslöser zurückgegeben; ungültiger Deep Link zeigt verständlichen Status. Bei 320, 360, 768 und 1280 px wurde kein horizontales Überlaufen beobachtet; bei 320/360 px sind Vergleichskarten gestapelt.
- Docker Compose: direkter HTTP-Zugang und optionaler lokaler Caddy-Proxy lieferten Startseite und Deep Link mit HTTP 200; Healthcheck gesund. Öffentliches HTTPS wurde ohne eigene Domain nicht geprüft.
- **Offen für G6:** Browser-/Axe-CI, dokumentierter Screenreader-Smoke und PR-Review. Diese Punkte stehen in Issue #15; eine Release-Freigabe wird hier noch nicht behauptet.
