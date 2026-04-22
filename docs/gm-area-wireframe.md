# GM Area Wireframe

## Goal

Create a local-only GM area for campaign knowledge that the DM can use during prep and play, while keeping player-facing pages safe to commit and push.

The rule is simple:

- Player-safe content stays in normal folders and normal file names.
- GM-only content lives in folders named `gm` or in files with `.gm` in the file name.
- Git ignores GM-only content, so it remains local.

## Git Guardrails

The repository should ignore:

```gitignore
*.gm*
gm/
**/gm/
```

This covers examples like:

```text
content/gm/index.md
content/lore/gm/true-history.md
content/lore/religion.gm.md
data/items/secret-artifacts.gm.json
data/monsters/gm/hidden-villains.json
```

Do not place player-safe files inside `gm` folders, because those folders are fully local-only.

## Information Architecture

```text
Website
|-- Player Area
|   |-- Start
|   |-- Hausregeln
|   |-- Sicherheit
|   |-- Charakteroptionen
|   |-- Spielerwissen
|   |-- Handouts
|   |-- Sitzungsrueckblicke
|   `-- Collections: Bestiarium, Zauber, Gegenstaende, Karten, Spieler, Symbole
|
`-- GM Area (local only)
    |-- Dashboard
    |-- Geheimnisse
    |-- NSC & Fraktionen
    |-- Orte & Wahrheiten
    |-- Sitzungsplanung
    |-- Begegnungen
    |-- Belohnungen & Geheimgegenstaende
    |-- Zufallstabellen
    `-- Enthuellungsstatus
```

## Local File Layout

Preferred layout:

```text
content/
|-- gm/
|   |-- index.md
|   |-- secrets.md
|   |-- session-prep.md
|   |-- reveal-tracker.md
|   `-- factions.md
|
|-- lore/
|   |-- index.md
|   |-- gazetteer.md
|   `-- gm/
|       |-- true-history.md
|       `-- hidden-sites.md
|
`-- recaps/
    |-- index.md
    `-- next-session.gm.md

data/
|-- gm/
|   |-- secrets.json
|   |-- session-notes.json
|   `-- reveal-tracker.json
|
|-- monsters/
|   `-- gm/
|       `-- villains.json
|
`-- tables/
    |-- gm/
    |   `-- omens.json
    `-- treasure.gm.json

pages/
`-- gm/
    |-- index.html
    |-- secrets.html
    `-- session.html
```

Alternative for smaller additions:

```text
content/lore/religion.gm.md
data/items/artifacts.gm.json
pages/gm.html
```

The folder layout is easier to scan. The `.gm` suffix is useful when a secret file naturally belongs next to its public counterpart.

## Navigation Wireframe

The GM area should only be linked on local/dev builds.

```text
+------------------------------------------------------------+
| Kampagnen-Werkzeugkasten                       [Search...] |
+---------------+--------------------------------------------+
| Spiel         | GM Dashboard                               |
| - Hausregeln  |                                            |
| - Sicherheit  | +-------------+ +-------------+ +--------+ |
| - Rueckblicke | | Next Session| | Secrets     | | Alerts | |
|               | | prep notes  | | unrevealed  | | hooks  | |
| Werkzeuge     | +-------------+ +-------------+ +--------+ |
| - Tabellen    |                                            |
| - Wuerfel     | Tabs: Prep | Secrets | NPCs | Places | Log |
|               |                                            |
| Sammlungen    | +----------------------------------------+ |
| - Bestiarium  | | selected GM document / table / tracker | |
| - Zauber      | +----------------------------------------+ |
| - Items       |                                            |
|               |                                            |
| GM            |                                            |
| - Dashboard   |                                            |
| - Geheimnisse |                                            |
| - Sitzungen   |                                            |
+---------------+--------------------------------------------+
```

On a published/player build, the `GM` navigation group should not render at all.

## Page Wireframes

### Dashboard

Purpose: Fast prep overview.

```text
GM Dashboard

[Next Session] [Open Secrets] [Unresolved Hooks]

Prep Focus
- Current location
- Expected scenes
- Likely NPCs
- Possible combat

Recent / Pending
- Last private note
- Things players almost discovered
- Rewards not handed out
```

### Secrets

Purpose: Track what is true, what is known, and what is still hidden.

```text
Geheimnisse

Filter: [All] [Unrevealed] [Foreshadowed] [Revealed]
Search: __________________

+ Secret title ----------------------------------------------+
| Status: Unrevealed                                         |
| Truth: what is actually happening                          |
| Player-facing clue: what can be shown safely               |
| Related: [[npc:...]] [[monster:...]] [[item:...]]          |
+------------------------------------------------------------+
```

### Session Prep

Purpose: Table-facing DM screen.

```text
Sitzungsplanung

Session date / number
Opening recap
Scenes in likely order
NPC voices / goals
Combat notes
Treasure / clues
End conditions
```

### Reveal Tracker

Purpose: Prevent accidentally exposing or forgetting secrets.

```text
Enthuellungsstatus

Columns:
Secret | Related public page | Status | Last clue | Next clue

Status values:
- hidden
- hinted
- discovered
- resolved
```

## Data Shapes

### Secret

```json
{
  "id": "duke-is-cultist",
  "title": "The duke serves the cult",
  "status": "hidden",
  "truth": "The duke funds the cult through false temple donations.",
  "safe_clues": [
    "Temple ledgers show unusual donations.",
    "The duke avoids direct questions about the old shrine."
  ],
  "related": {
    "npcs": ["duke-varen"],
    "places": ["old-shrine"],
    "items": ["temple-ledger"]
  },
  "notes": "Reveal only after the players inspect the shrine records."
}
```

### Session Prep

```json
{
  "id": "session-18",
  "title": "The shrine records",
  "date": "2026-04-22",
  "opening": "Start at the burned archive.",
  "scenes": [
    {
      "title": "Archive search",
      "goal": "Find the ledger clue",
      "risks": ["guards arrive", "ledger is incomplete"]
    }
  ],
  "loot": ["temple-ledger"],
  "secrets_to_hint": ["duke-is-cultist"]
}
```

## Runtime Behavior

Local/dev mode:

- Show a `GM` navigation group.
- Allow loading `content/gm/**`, `content/**/*.gm.md`, `data/gm/**`, `data/**/*.gm.json`, and `pages/gm/**`.
- Add a visible DM-only marker on GM pages.

Published/player mode:

- Do not show the `GM` navigation group.
- Do not reference GM-only paths from committed indexes.
- Do not fetch GM-only paths from public pages.

## Implementation Notes

The safest first implementation is explicit and local:

1. Keep committed app code generic.
2. Keep committed indexes player-safe.
3. Add local-only GM pages/data under ignored paths.
4. In local mode, optionally load a local-only manifest such as `content/gm/index.gm.json`.

That means the public site never depends on secret files, and a missing GM file on the published site is normal rather than broken.

## Acceptance Criteria

- `git status` never shows GM-only content.
- Public navigation has no GM links after deployment.
- Local navigation can expose the GM area when local files exist.
- GM data can cross-link to public entities with existing refs like `[[npc:id]]`, `[[monster:id]]`, `[[item:id]]`, and `[[spell:id]]`.
- Secrets have a clear status so the DM can tell what players know.
