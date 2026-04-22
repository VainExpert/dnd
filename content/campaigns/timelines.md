# Kampagnen-Zeitachsen

Wireframe fuer mehrere Kampagnen in derselben Welt, aber in verschiedenen Jahren. Die Idee: Weltwissen bleibt gemeinsam, kampagnenspezifische Informationen werden als Zeit-Ebene daruebergelegt.

<div class="campaign-wireframe">
  <div class="campaign-switchbar" aria-label="Kampagnen und Zeitpunkte">
    <button class="campaign-tab active" type="button">
      <span>Kampagne A</span>
      <strong>Jahr 0</strong>
    </button>
    <button class="campaign-tab" type="button">
      <span>Kampagne B</span>
      <strong>Jahr +5</strong>
    </button>
    <button class="campaign-tab muted-tab" type="button">
      <span>Gemeinsame Welt</span>
      <strong>Basis</strong>
    </button>
  </div>

  <div class="time-rail" aria-label="Zeitstrahl">
    <div class="rail-node current">
      <span>Jahr 0</span>
      <strong>Kampagne A</strong>
    </div>
    <div class="rail-gap">
      <span>5 Jahre Entwicklung</span>
    </div>
    <div class="rail-node future">
      <span>Jahr +5</span>
      <strong>Kampagne B</strong>
    </div>
  </div>

  <div class="campaign-board">
    <section class="campaign-column shared">
      <div class="wire-label">Gemeinsam</div>
      <h2>Welt-Datensatz</h2>
      <div class="wire-row">
        <span>Orte</span>
        <b>Stadt, Tempel, Grenzen</b>
      </div>
      <div class="wire-row">
        <span>NPCs</span>
        <b>Identitaet, Ziele, Beziehungen</b>
      </div>
      <div class="wire-row">
        <span>Fraktionen</span>
        <b>Ressourcen, Ruf, Konflikte</b>
      </div>
      <div class="wire-row">
        <span>Kanonsperren</span>
        <b>Was darf keine Runde ueberschreiben?</b>
      </div>
    </section>

    <section class="campaign-column">
      <div class="wire-label">Zeit-Ebene A</div>
      <h2>Kampagne A: Gegenwart</h2>
      <div class="wire-card">
        <h3>Status pro Objekt</h3>
        <p>Was ist in Jahr 0 sichtbar, geheim, zerstoert, aktiv oder noch unbekannt?</p>
      </div>
      <div class="wire-card">
        <h3>Sitzungsnotizen</h3>
        <p>Rueckblicke und offene Faeden, die nur diese Gruppe kennt.</p>
      </div>
      <div class="wire-card">
        <h3>Aenderungen vormerken</h3>
        <p>Ereignisse, die spaeter in die gemeinsame Welt uebernommen werden koennen.</p>
      </div>
    </section>

    <section class="campaign-column">
      <div class="wire-label">Zeit-Ebene B</div>
      <h2>Kampagne B: +5 Jahre</h2>
      <div class="wire-card">
        <h3>Folgen aus A</h3>
        <p>Welche Orte, NPCs und Fraktionen haben sich in den fuenf Jahren veraendert?</p>
      </div>
      <div class="wire-card">
        <h3>Neue Geheimnisse</h3>
        <p>Informationen, die fuer B gelten, aber A nicht rueckwirkend beeinflussen.</p>
      </div>
      <div class="wire-card">
        <h3>Konfliktpruefung</h3>
        <p>Warnung, wenn B etwas nutzt, das in A noch offen oder widerspruechlich ist.</p>
      </div>
    </section>
  </div>

  <div class="campaign-flow">
    <div>
      <span>1</span>
      <strong>Basis anlegen</strong>
      <p>Ein Ort, NPC oder Ereignis existiert zuerst einmal zeitlos in der Welt.</p>
    </div>
    <div>
      <span>2</span>
      <strong>Zeitstatus pflegen</strong>
      <p>Jede Kampagne bekommt einen eigenen Status zum selben Weltobjekt.</p>
    </div>
    <div>
      <span>3</span>
      <strong>Kanonsprung pruefen</strong>
      <p>Groessere Folgen koennen nach der Sitzung in die gemeinsame Welt wandern.</p>
    </div>
  </div>
</div>

## Daten-Idee

- `world`: gemeinsame Fakten, Namen, Karten, Beziehungen.
- `campaign`: Name, Spielgruppe, aktuelles Jahr, Sichtbarkeit.
- `eraState`: Status eines Weltobjekts in einer bestimmten Kampagne oder Zeit.
- `canonEvent`: Ereignisse, die beide Zeitlinien betreffen koennen.

## Naechster Ausbau

- Filter: Kampagne A, Kampagne B, gemeinsame Welt.
- Objektansicht: gleicher NPC mit Status in Jahr 0 und Jahr +5 nebeneinander.
- Konfliktmarker: offene A-Handlung beruehrt schon B-Kanon.
- Sichtbarkeit: Spielerwissen getrennt von SL-Wissen.
