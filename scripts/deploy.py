#!/usr/bin/env python3
"""Deploy the static showroom with Docker Compose; curses UI when interactive."""

from __future__ import annotations

import argparse
import curses
import os
from pathlib import Path
import re
import subprocess
import sys


ROOT = Path(__file__).resolve().parent.parent
SITE_PATTERN = re.compile(r"^(?:https?://)?(?:localhost|[A-Za-z0-9][A-Za-z0-9.-]*)(?::[0-9]{1,5})?$")
CHOICES = (
    ("HTTP starten / aktualisieren", "http"),
    ("Mit Caddy starten / aktualisieren", "proxy"),
    ("Status anzeigen", "status"),
    ("Logs anzeigen", "logs"),
    ("Stack stoppen", "down"),
    ("Beenden", "quit"),
)


def port(value: str) -> str:
    number = int(value)
    if not 1 <= number <= 65535:
        raise argparse.ArgumentTypeError("Port muss zwischen 1 und 65535 liegen")
    return str(number)


def site(value: str) -> str:
    if not SITE_PATTERN.fullmatch(value) or ".." in value:
        raise argparse.ArgumentTypeError("Caddy-Site muss eine Domain, localhost oder http(s)://Host sein")
    if ":" in value.rsplit("/", 1)[-1]:
        try:
            port(value.rsplit(":", 1)[-1])
        except (ValueError, argparse.ArgumentTypeError) as error:
            raise argparse.ArgumentTypeError("Caddy-Site enthält einen ungültigen Port") from error
    return value


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="UI Showroom mit Docker Compose betreiben")
    parser.add_argument("action", nargs="?", choices=("http", "proxy", "status", "logs", "down"))
    parser.add_argument("--http-port", type=port, help="Port des direkten HTTP-Zugangs")
    parser.add_argument("--bind", help="Bind-Adresse für direkten HTTP-Zugang, z. B. 127.0.0.1 oder 0.0.0.0")
    parser.add_argument("--site", type=site, help="Caddy-Site, z. B. example.com oder http://localhost")
    parser.add_argument("--dry-run", action="store_true", help="Compose-Befehle nur anzeigen")
    args = parser.parse_args()
    if args.bind and args.bind not in ("127.0.0.1", "0.0.0.0", "::1", "::"):
        parser.error("--bind erlaubt 127.0.0.1, 0.0.0.0, ::1 oder ::")
    if not args.action and not sys.stdin.isatty():
        parser.error("Ohne Terminal bitte eine Aktion angeben")
    return args


def choose(screen: curses.window) -> str:
    curses.curs_set(0)
    selected = 0
    while True:
        screen.erase()
        height, width = screen.getmaxyx()
        if height < len(CHOICES) + 5 or width < 30:
            screen.addnstr(0, 0, "Terminal zu klein", max(1, width - 1))
            screen.refresh()
            key = screen.getch()
            if key in (ord("q"), 27):
                return "quit"
            continue
        screen.addstr(1, 2, "UI Showroom Deployment", curses.A_BOLD)
        screen.addstr(2, 2, "Pfeile: Auswahl  Enter: Ausführen  q: Beenden")
        for index, (label, _) in enumerate(CHOICES):
            style = curses.A_REVERSE if index == selected else curses.A_NORMAL
            screen.addnstr(index + 4, 2, label, width - 4, style)
        screen.refresh()
        key = screen.getch()
        if key in (curses.KEY_UP, ord("k")):
            selected = (selected - 1) % len(CHOICES)
        elif key in (curses.KEY_DOWN, ord("j")):
            selected = (selected + 1) % len(CHOICES)
        elif key in (10, 13, curses.KEY_ENTER):
            return CHOICES[selected][1]
        elif key in (ord("q"), 27):
            return "quit"


def run(command: list[str], env: dict[str, str], dry_run: bool) -> None:
    print("$", " ".join(command), flush=True)
    if not dry_run:
        subprocess.run(command, cwd=ROOT, env=env, check=True)


def main() -> int:
    args = parse_args()
    try:
        action = args.action or curses.wrapper(choose)
    except curses.error:
        print("ncurses konnte nicht gestartet werden; Aktion als Argument angeben.", file=sys.stderr)
        return 2
    if action == "quit":
        return 0

    env = os.environ.copy()
    if args.http_port:
        env["HTTP_PORT"] = args.http_port
    if args.bind:
        env["HTTP_BIND"] = args.bind
    if args.site:
        env["CADDY_SITE"] = args.site

    compose = ["docker", "compose"]
    try:
        if action == "http":
            # A previous proxy run should not leave a public Caddy process behind.
            run(compose + ["--profile", "proxy", "stop", "caddy"], env, args.dry_run)
            run(compose + ["up", "-d", "--build", "web"], env, args.dry_run)
        elif action == "proxy":
            run(compose + ["--profile", "proxy", "up", "-d", "--build"], env, args.dry_run)
        elif action == "status":
            run(compose + ["--profile", "proxy", "ps"], env, args.dry_run)
        elif action == "logs":
            run(compose + ["--profile", "proxy", "logs", "--tail", "100"], env, args.dry_run)
        elif action == "down":
            run(compose + ["--profile", "proxy", "down"], env, args.dry_run)
    except (OSError, subprocess.CalledProcessError) as error:
        print(f"Deployment fehlgeschlagen: {error}", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
