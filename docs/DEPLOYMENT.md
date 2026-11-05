# Deployment

Der Showroom wird als statische React-Anwendung gebaut. Docker Compose startet einen Webserver auf Port 8080. Caddy ist ein optionales Profil für Reverse Proxy und automatisches HTTPS bei einer öffentlichen Domain.

## Voraussetzungen

- Docker Engine mit Compose-Plugin (`docker compose version`)
- Für das interaktive Menü: Python 3 mit `curses` und ein Terminal
- Für öffentliches HTTPS: Domain mit DNS-Einträgen auf den Server sowie erreichbare Ports 80 und 443

## Direkter HTTP-Betrieb

```sh
cp .env.example .env
python3 scripts/deploy.py http
```

Standardmäßig ist die App unter `http://127.0.0.1:8080` erreichbar. Für Zugriff aus dem Netzwerk in `.env` `HTTP_BIND=0.0.0.0` setzen. Ein anderer Port ist über `HTTP_PORT` möglich. Der direkte HTTP-Zugang hat keine Transportverschlüsselung.

## Optionaler Caddy-Proxy

In `.env` `CADDY_SITE=showroom.example.com` auf die eigene Domain setzen. Dann:

```sh
python3 scripts/deploy.py proxy
```

Caddy veröffentlicht Port 80 und 443 und verwaltet für eine öffentliche Domain TLS-Zertifikate. Für einen lokalen Proxy ohne öffentliches Zertifikat `CADDY_SITE=http://localhost` setzen. Die App bleibt zusätzlich direkt auf dem konfigurierten HTTP-Port erreichbar; für einen ausschließlich internen direkten Zugang `HTTP_BIND=127.0.0.1` beibehalten.

## Interaktives Menü und nichtinteraktiver Betrieb

`python3 scripts/deploy.py` öffnet ein ncurses-Menü. Mit Pfeiltasten auswählen und Enter bestätigen. In Automatisierung dieselben Aktionen direkt aufrufen: `http`, `proxy`, `status`, `logs`, `down`. Beispiel:

```sh
python3 scripts/deploy.py proxy --site showroom.example.com --http-port 8080
python3 scripts/deploy.py status
python3 scripts/deploy.py logs
python3 scripts/deploy.py down
```

`--dry-run` zeigt die Compose-Befehle, ohne sie auszuführen. `--bind` überschreibt die Bind-Adresse. Weitere Werte wie `CADDY_HTTP_PORT` und `CADDY_HTTPS_PORT` werden aus `.env` gelesen.

## Betrieb und Rückfall

Vor einem Update den aktuellen Git-Commit notieren (`git rev-parse HEAD`) und das laufende Image sichern (`docker image tag ui-showroom:local ui-showroom:rollback`). `http` oder `proxy` baut das Image neu und startet die Dienste neu. `status` zeigt den Containerzustand, `logs` die letzten 100 Zeilen. Bei einem fehlerhaften Update das gesicherte Image mit `docker image tag ui-showroom:rollback ui-showroom:local` zurücksetzen und mit `docker compose --profile proxy up -d --force-recreate --no-build` (beziehungsweise ohne `--profile proxy` für direkten HTTP-Betrieb) erneut starten. Anschließend den vorherigen Git-Stand wiederherstellen, damit ein späterer Build nicht erneut den defekten Stand ausliefert. `down` stoppt die Container; die Caddy-Volumes bleiben erhalten.

Der Build setzt `package.json`, `package-lock.json` und ein funktionierendes `npm run build` mit Ausgabe in `dist/` voraus. Diese Schnittstelle wird durch die Foundation-Implementierung bereitgestellt.
