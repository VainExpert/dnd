export const TABLE_FILES = [
  "abenteuergilde-auftraege-bronze.json",
  "abenteuergilde-auftraege-gold.json",
  "abenteuergilde-auftraege-nach-tier.json",
  "abenteuergilde-auftraege-platin.json",
  "abenteuergilde-auftraege-silber.json",
  "ereignisse-nacht.json",
  "ereignisse-tempelbrand.json",
  "ortsnamen-baukasten.json",
  "ortsnamen.json",
  "taverne-bauskasten.json",
  "traeume-athene+poseidon.json",
  "traeume-druidin.json",
  "traeume-hera.json",
  "traeume-hestia.json",
  "wanted-bronze.json",
  "wanted-gold.json",
  "wanted-platin.json",
  "wanted-silber.json"
];

export const TABLE_DATA_BY_FILE = {
  "abenteuergilde-auftraege-bronze.json": {
    "1": {
      "id": "AG-001",
      "titel": "Milch, die beißt",
      "tier": "Bronze",
      "hook": "Eine Molkerei meldet, dass Kühe, Ziegen und ein Hofhund plötzlich aggressiv werden und Melker verletzen.",
      "briefing": "Die Gilde soll die Tiere sichern, ohne die Herde zu schlachten. Der Bauer schwört, es gab keinen Wolf, kein Gift, keinen Streit – nur 'plötzlichen Wahnsinn'.",
      "objectives": [
        "Tiere beruhigen/isolieren (nicht-tödlich bevorzugt).",
        "Proben von Futter, Wasser, Stallstreu, Milch nehmen.",
        "Spuren zum Ursprung der Aggression (Windrichtung, Wasserlauf, Lieferkette) sammeln."
      ],
      "complications": [
        "Ein verletzter Knecht ist überzeugt, es sei ein Fluch und ruft nach einem Priester – was die Lage eskaliert.",
        "Die Tiere reagieren besonders auf Klang/Metall (unbewusster Trigger der Substanz)."
      ],
      "clues": [
        "Futter riecht normal, aber in der Tränke schimmert bei Kerzenlicht kurz ein 'Ölfilm'.",
        "Am Bach oberhalb des Hofs sind Fische tot, doch niemand hat es bemerkt."
      ],
      "outcomes": {
        "success": "Herde überlebt, erste Spur führt zum Bachlauf.",
        "partial": "Ein Tier stirbt, Bauer wendet sich gegen die Gilde.",
        "failure": "Herde bricht aus, Stadtwache wird eingeschaltet."
      }
    },
    "2": {
      "id": "AG-002",
      "titel": "Bellen in der Nacht",
      "tier": "Bronze",
      "hook": "In einem Wohnviertel greifen Hunde ihre Besitzer an; die Stadtwache will 'alle Köter räumen'.",
      "briefing": "Die Gilde soll die Lage deeskalieren, bevor es ein Massaker gibt.",
      "objectives": [
        "Hundemeute einkreisen und ohne Töten ausschalten.",
        "Zeugen befragen: erster Ausbruch, Wetter, Gerüche, Lieferungen.",
        "Einen betroffenen Hund sicher zur Untersuchung bringen."
      ],
      "complications": [
        "Ein Streuner-Netzwerk wird verdächtigt, obwohl es nur zufällig betroffen ist.",
        "Barde verbreitet ein Lied über 'Hundedämonen', das Panik auslöst."
      ],
      "clues": [
        "Die Aggression tritt in Wellen auf, als ob etwas durch die Straße 'zieht'.",
        "In der Nähe steht ein Fass mit harmlos wirkendem Lampenöl – aber es stammt aus unbekannter Quelle."
      ],
      "outcomes": {
        "success": "Die Wache hält sich zurück; der Quartiermeister schuldet der Gilde einen Gefallen.",
        "partial": "Ein Kind wird verletzt; Ruf der Gilde leidet.",
        "failure": "Die Wache schlachtet die Tiere, Spuren gehen verloren."
      }
    },
    "3": {
      "id": "AG-003",
      "titel": "Die stille Spur",
      "tier": "Bronze",
      "hook": "Jäger berichten von Rehen, die ohne Warnung angreifen – und dann fliehen, als wären sie 'wach geworden'.",
      "briefing": "Der Förster will keine Panik im Dorf, aber es gibt schon Tote.",
      "objectives": [
        "Waldgebiet kartieren: Hotspots, Wind, Wasser, Nester.",
        "Lebendes Tier zur Beobachtung fangen.",
        "Ursprung der Substanz lokalisieren (Quelle, Pilzfeld, Ruine)."
      ],
      "complications": [
        "Ein Monster nutzt das Chaos (z.B. Ettercap, Werwolfkult, Goblins) – ist aber nicht die Ursache.",
        "Spuren werden durch Regen verwischt; die Substanz bleibt dennoch wirksam."
      ],
      "clues": [
        "Moos leuchtet für Sekunden, wenn Metall darübergezogen wird.",
        "Ein verlassener Wagenweg führt zu einer eingestürzten Mine."
      ],
      "outcomes": {
        "success": "Hinweis auf Mine/Untergrund als Quelle.",
        "partial": "Monster entkommt; Dorfbewohner geben ihm die Schuld.",
        "failure": "Weitere Angriffe; Jagdverbot, Konflikt mit Förstern."
      }
    },
    "4": {
      "id": "AG-010",
      "titel": "Kleine Pfoten, große Wirkung",
      "tier": "Bronze",
      "hook": "Ein Kinderheim bittet um Hilfe: Katzen werden aggressiv, Kinder trauen sich nicht mehr in Schlafräume.",
      "briefing": "Emotionaler Auftrag. Ideal, um den Tier-Wahnsinn in die Zivilbevölkerung zu tragen.",
      "objectives": [
        "Kinder schützen, Katzen einfangen, beruhigen.",
        "Herausfinden, ob eine Quelle im Gebäude ist (Keller, Küche, Spielzeugspenden).",
        "Verdächtige Spende/Lieferung zurückverfolgen."
      ],
      "complications": [
        "Spenden kamen von einer 'Wohltätigkeitsstiftung' (Frontorganisation).",
        "Ein Lehrer wird fälschlich beschuldigt; soziale Eskalation."
      ],
      "clues": [
        "In neuen Spielzeugen ist ein harmlos wirkender Füllstoff, der den Film trägt.",
        "Auf den Kisten: ein neutrales Händlerzeichen, kein Streuner-Logo."
      ],
      "outcomes": {
        "success": "Spur zu Stiftung/Lieferroute.",
        "partial": "Öffentlicher Skandal; Barde nutzt ihn.",
        "failure": "Kinder verletzt; Stadt fordert harte Maßnahmen."
      }
    },
    "5": {
      "id": "AG-011",
      "titel": "Verschollener Karren",
      "tier": "Bronze",
      "hook": "Ein Händlerkarren mit Werkzeugstahl und Lohnkasse ist auf der Landstraße verschwunden.",
      "briefing": "Die Gilde soll den Karren finden, bevor die Ware auf dem Schwarzmarkt landet.",
      "objectives": [
        "Spurensuche entlang der Route (Radspuren, Lagerplätze, Zeugen).",
        "Überfallende stellen oder Ware bergen.",
        "Lieferung diskret zurückbringen (Ruf des Händlers schützen)."
      ],
      "complications": [
        "Die 'Räuber' sind entlassene Gesellen mit echter Notlage.",
        "Ein wachhabender Trupp Stadtwache verlangt Bestechung."
      ],
      "rewards": [
        "Gold + Rabatt bei Schmieden",
        "Kontakte in der Handelsgilde"
      ]
    },
    "6": {
      "id": "AG-012",
      "titel": "Das Spukhaus am Brunnen",
      "tier": "Bronze",
      "hook": "Bewohner melden Stimmen und klirrende Ketten aus einem leerstehenden Haus.",
      "briefing": "Niemand wurde verletzt, aber Angst lähmt das Viertel.",
      "objectives": [
        "Haus untersuchen, Quelle finden (Geist, Betrug, Kreatur).",
        "Gefahr bannen oder Betrüger entlarven.",
        "Bewohner beruhigen."
      ],
      "complications": [
        "Es ist ein ausgeklügelter Schmugglertunnel unter dem Haus.",
        "Ein echtes, gebundenes Ruheloses Wesen wurde als Abschreckung missbraucht."
      ],
      "rewards": [
        "Dank der Nachbarschaft (Safehouse)",
        "Zugang zu Schmugglertunnel-Infos"
      ]
    },
    "7": {
      "id": "AG-014",
      "titel": "Der verschwundene Novize",
      "tier": "Bronze",
      "hook": "Ein Tempel bittet: Ein Novize ist seit der Nachtwache weg.",
      "briefing": "Der rotierende Religionsrat will keinen Skandal.",
      "objectives": [
        "Letzte Wege rekonstruieren.",
        "Novizen lebend finden.",
        "Wahrheit diskret halten oder gezielt offenlegen."
      ],
      "complications": [
        "Der Novize ist nicht entführt, sondern wollte Beweise für Korruption sammeln.",
        "Ein rivalisierender Kult bietet 'Hilfe' gegen Gefallen."
      ],
      "rewards": [
        "Tempelheilung/Unterkunft",
        "Ein Audienzbrief für den Religionsrat"
      ]
    },
    "8": {
      "id": "AG-015",
      "titel": "Turnier der drei Banner",
      "tier": "Bronze",
      "hook": "Drei Gilden stiften ein Stadtturnier; die Gilde soll als neutrale Schiedsrichter auftreten.",
      "briefing": "Offiziell Fest und Sport. Inoffiziell drohen Prügeleien und politische Provokationen.",
      "objectives": [
        "Wettkämpfe absichern (nicht tödlich).",
        "Sabotage verhindern (Vergiftung, gestohlene Ausrüstung).",
        "Einen Streit schlichten, bevor er eskaliert."
      ],
      "complications": [
        "Ein Teilnehmer ist ein verkleideter Adliger.",
        "Ein Skandal soll absichtlich provoziert werden, um eine Gilde zu diskreditieren."
      ],
      "rewards": [
        "Renommee bei Stadtbevölkerung",
        "Ein persönlicher Gefallen eines Gildenmeisters"
      ]
    },
    "9": {
      "id": "AG-019",
      "titel": "Federn ueber der Gerberei",
      "tier": "Bronze",
      "aushang": "Gesucht: verlaessliche Abenteurer fuer eine stoerende, aber loesbare Plage ueber der Suedgerberei. Kraehen, Moewen und zwei grosse Raben greifen Arbeiter an und stehlen Lederzeichen. Bezahlung nach Sicherung des Hofs und Rueckgabe der Marken.",
      "auftraggeber": "Gerbermeister Halven Trask",
      "briefing": "Ein Auftrag fuer das schwarze Brett: Die Tiere muessen vertrieben oder eingefangen, die Ursache gefunden und weitere Ausfaelle in der Gerberei verhindert werden. Der Auftraggeber wuenscht moeglichst wenig Aufsehen und keine Beschaedigung der Ware.",
      "objectives": [
        "Dach und Hof sichern, ohne unnoetig Tiere zu toeten.",
        "Gestohlene Lederzeichen oder Nester ausfindig machen.",
        "Dachpech, Regenfaesser und Abfallwege auf Rueckstaende pruefen."
      ],
      "complications": [
        "Die Gerbergesellen beschuldigen bereits eine rivalisierende Werkstatt.",
        "Strassenkinder sammeln herabfallende Marken ein und verkaufen sie weiter."
      ],
      "clues": [
        "Auf dem Dachpech liegt ein violett schimmernder Film.",
        "Mehrere Marken tauchten in einem Taubenschlag nahe der Faerbergasse auf."
      ],
      "rewards": [
        "35 GM",
        "Dauerhafter Rabatt bei der Suedgerberei",
        "1 Satz robustes Lederzeug oder Lederscheide nach Wahl"
      ],
      "outcomes": {
        "success": "Die Gerberei nimmt den Betrieb wieder auf und eine neue Spur fuehrt in die Faerbergasse.",
        "partial": "Der Hof ist gesichert, aber mehrere Chargen sind unbrauchbar geworden.",
        "failure": "Die Gerbergilde macht oeffentlich Stimmung gegen unfähige Abenteurer."
      }
    },
    "10": {
      "id": "AG-020",
      "titel": "Nachtschicht in der Muehle",
      "tier": "Bronze",
      "aushang": "Gesucht: Nachtwache fuer die Ostmuehle. Ratten, ein Kater und allerlei Kleingetier zerreissen Mehlsaecke und greifen Arbeiter an. Wer die Ursache findet und die Muehle offen haelt, wird entlohnt.",
      "auftraggeber": "Muellerin Sera Halm",
      "briefing": "Der Auftrag ist klein genug fuers schwarze Brett, aber dringend: Eine Schicht lang Wache halten, Schaeden verhindern und pruefen, ob Korn, Achsenschmiere oder Wasser manipuliert wurden.",
      "objectives": [
        "Eine volle Nachtschicht in der Muehle absichern.",
        "Mindestens eine Ratte oder Probe lebend bzw. unbeschaedigt sichern.",
        "Mahlwerk, Kornlager und Schmiermittel untersuchen."
      ],
      "complications": [
        "Der Mueller hat einen billigen, fragwuerdigen Lieferanten verschwiegen.",
        "Das Muehlrad auf Volllast scheint die Tiere zusaetzlich zu reizen."
      ],
      "clues": [
        "In der Achsenschmiere befindet sich feiner violetter Staub.",
        "Ein Sack Korn traegt ein gefaelschtes Handelszeichen."
      ],
      "rewards": [
        "30 GM",
        "Kostenlose Verpflegung fuer eine Woche in der Ostmuehle",
        "Ein Sack gutes Mehl oder Proviant fuer Reisen"
      ],
      "outcomes": {
        "success": "Die Muehle bleibt offen und eine Spur fuehrt zu einem Zwischenlager.",
        "partial": "Der Betrieb wird gerettet, aber ein ganzer Mahlgang ist verloren.",
        "failure": "Die Muehle schliesst fuer Tage und die Nachbarschaft verliert Vertrauen."
      }
    },
    "11": {
      "id": "AG-021",
      "titel": "Die Messe der kleinen Wunder",
      "tier": "Bronze",
      "aushang": "Dringend: Hilfe fuer den Tempelmarkt am Morgensternplatz gesucht. Brieftauben, Kaninchen und ein Segnungslamm verhalten sich wild. Kinder und Staende muessen geschuetzt werden. Freundlicher Umgang erwuenscht.",
      "auftraggeber": "Tempeldienerin Emina",
      "briefing": "Dieser Aushang richtet sich an ruhige, verlaessliche Leute. Die Feier soll nicht in Panik enden; gesuchte Helfer sollen Tiere beruhigen, Spenden und Weihrauch pruefen und moeglichst diskret handeln.",
      "objectives": [
        "Kinder und Besucher in Sicherheit bringen.",
        "Betroffene Tiere beruhigen oder einfangen.",
        "Segnungspulver, Weihrauch und Futterspenden pruefen."
      ],
      "complications": [
        "Ein Schausteller vergroessert mit Illusionen unbeabsichtigt die Panik.",
        "Ein Priester spricht vorschnell von boesen Vorzeichen."
      ],
      "clues": [
        "Nur die neuen Weihrauchkegel loesen starke Reaktionen aus.",
        "Mehrere Spendenkisten tragen dasselbe neutrale Haendlerzeichen."
      ],
      "rewards": [
        "25 GM",
        "Tempelsegen oder kostenlose Heilung kleiner Verletzungen",
        "Ein Empfehlungsschreiben an den Religionsrat"
      ],
      "outcomes": {
        "success": "Die Feier wird gerettet und die Spendenlieferung wird als Spur gesichert.",
        "partial": "Die Tiere werden beruhigt, aber der Markt wird abgebrochen.",
        "failure": "Der Vorfall wird zum oeffentlichen Skandal."
      }
    },
    "12": {
      "id": "AG-022",
      "titel": "Der Lehrling im Schilf",
      "tier": "Bronze",
      "aushang": "Belohnung fuer die Suche nach einem vermissten Fischerlehrling am Nordteich. Gänse und Froesche greifen am Schilfufer an. Wer den Jungen lebend findet und die Ufer wieder sicher macht, wird bezahlt.",
      "auftraggeber": "Fischerbund Nordteich",
      "briefing": "Ein typischer Bretterauftrag: Jemand wird gesucht, das Gebiet ist gefaehrlich, aber nicht toedlich genug fuer einen Grossalarm. Auftragnehmer sollen das Ufer absuchen und zugleich pruefen, ob Koeder oder Wasser manipuliert wurden.",
      "objectives": [
        "Den Lehrling lebend finden.",
        "Das Schilfgebiet kartieren und sichern.",
        "Koeder, Wasser und verborgene Durchlaesse ueberpruefen."
      ],
      "complications": [
        "Schmuggler nutzen dieselben Schilfpfade und lenken von sich ab.",
        "Der Lehrling hat selbst gegen Regeln verstossen und verschweigt etwas."
      ],
      "clues": [
        "Die Koederwuermer riechen nach alchemistischer Salzlake.",
        "Nahe eines verborgenen Durchlasses schimmert ein violetter Film."
      ],
      "rewards": [
        "40 GM",
        "Freier Fisch und Raeucherware fuer mehrere Reisen",
        "Zugang zu Booten des Fischerbunds bei spaeteren Einsaetzen"
      ],
      "outcomes": {
        "success": "Der Lehrling ueberlebt und der Durchlass wird als neue Spur markiert.",
        "partial": "Der Lehrling wird gerettet, aber die Schmuggler verschwinden.",
        "failure": "Das Ufer wird zum Sperrgebiet und die Spur versandet."
      }
    },
    "13": {
      "id": "AG-034",
      "titel": "Die verschwundene Glocke",
      "tier": "Bronze",
      "aushang": "Belohnung fuer die schnelle Wiederbeschaffung der kleinen Bronzeglocke der Marktkapelle. Ohne sie kann das Morgenritual zum Festtag nicht stattfinden. Diskretion erwuenscht.",
      "auftraggeber": "Schwester Alke von der Marktkapelle",
      "briefing": "Ein einfacher Schwarzes-Brett-Auftrag: Die Glocke wurde in der Nacht gestohlen oder versteckt. Gesucht werden Abenteurer, die Spuren sichern, das Stueck zurueckbringen und moeglichst keinen oeffentlichen Skandal verursachen.",
      "objectives": [
        "Den Diebstahlort untersuchen.",
        "Die Glocke vor Sonnenaufgang oder wenigstens vor dem Festzug wiederbeschaffen.",
        "Klaeren, ob es schlichter Diebstahl, Erpressung oder Sabotage war."
      ],
      "complications": [
        "Ein bettelarmer Ex-Novize steht zu Unrecht im Verdacht.",
        "Mehrere Kinder wissen mehr, als sie zugeben wollen, haben die Glocke aber nur weiterverkauft."
      ],
      "clues": [
        "Am Glockenseil klebt rotes Wachs von einer Lastkarrenmarke.",
        "Ein Schrotthaendler bekam in der Nacht ein auffaellig schweres Paket angeboten."
      ],
      "rewards": [
        "22 GM",
        "Ein Tempelsegen fuer die Gruppe",
        "Unterkunft und einfache Heilung in der Marktkapelle"
      ],
      "outcomes": {
        "success": "Die Glocke wird rechtzeitig zurueckgebracht und der Schuldige oder Auftraggeber identifiziert.",
        "partial": "Die Glocke wird gefunden, aber erst nach dem Festtag.",
        "failure": "Das Ritual faellt aus und die Marktgemeinde macht die Gilde mitverantwortlich."
      }
    },
    "14": {
      "id": "AG-035",
      "titel": "Gaense am Stadttor",
      "tier": "Bronze",
      "aushang": "Gesucht: ruhige Helfer am Osttor. Eine Schar Gaense blockiert seit dem Morgengrauen den Durchgang, beisst nach Haendlern und bringt Lasttiere durcheinander. Die Tiere sollen vertrieben oder eingefangen werden, ohne den Marktverkehr weiter lahmzulegen.",
      "auftraggeber": "Torhauptmann Rul Tann",
      "briefing": "Ein kleiner Schwarzes-Brett-Auftrag mit Zeitdruck: Die Gruppe soll das Tor freimachen, herausfinden, warum die Gaense ausgerechnet dort bleiben, und verhindern, dass Wache oder Haendler die Sache brutal loesen.",
      "objectives": [
        "Die Gaenseschar vom Tor weglocken oder sicher einfangen.",
        "Verletzte Haendler, Zugtiere und Passanten beruhigen.",
        "Futterreste, Wasserpfuetzen und Karren am Tor auf Ausloeser pruefen."
      ],
      "complications": [
        "Ein ungeduldiger Fuhrmann will mit seinem Wagen einfach durchbrechen.",
        "Ein Junge behauptet, die Gaense gehoerten ihm, verschweigt aber, woher das neue Futter kam."
      ],
      "clues": [
        "In einem Futterbeutel klebt violett schimmernder Staub zwischen Hafer und Brotkrumen.",
        "Die Tiere beruhigen sich, sobald sie vom metallbeschlagenen Fallgitter entfernt sind."
      ],
      "rewards": [
        "28 GM",
        "Freier Stadttordurchlass fuer kleinere Botengaenge",
        "Ein dankbarer Kontakt unter den Torwaechtern"
      ],
      "outcomes": {
        "success": "Das Tor wird wieder geoeffnet und die Spur fuehrt zu einem Futterhaendler nahe der Ostgasse.",
        "partial": "Die Gaense werden vertrieben, aber ein Karrenunfall beschaedigt Ware und Ruf.",
        "failure": "Die Wache erschlaegt mehrere Tiere, der Verkehr bricht zusammen und Hinweise gehen verloren."
      }
    },
    "15": {
      "id": "AG-036",
      "titel": "Falsche Kupfermuenzen",
      "tier": "Bronze",
      "aushang": "Mehrere Haendler suchen Hilfe: In Umlauf geraten auffaellig schlechte Kupfermuenzen sorgen fuer Streit, falsche Wechsel und Drohungen. Gesucht wird, wer sie praegt und verteilt.",
      "auftraggeber": "Haendlerring der Suedgasse",
      "briefing": "Ein kleiner Ermittlungsauftrag fuer das schwarze Brett. Die Gruppe soll ein paar verdaechtige Muenzen verfolgen, die Umlaufwege pruefen und moeglichst die Falschpraeger oder Verteiler ausfindig machen.",
      "objectives": [
        "Mindestens drei verdaechtige Muenzen oder Zahler sichern.",
        "Den Umlaufweg vom Markt zu einer Quelle zurueckverfolgen.",
        "Eine Falschpraegerstaette oder einen Verteiler aufdecken."
      ],
      "complications": [
        "Ein ehrlicher Ladenbesitzer hat die Muenzen unwissentlich weitergegeben und fuerchtet um seinen Ruf.",
        "Die Falschmuenzer arbeiten mit Kindern als Laufboten."
      ],
      "clues": [
        "Die Muenzen klingen stumpfer und tragen winzige Randfehler.",
        "Mehrere Stuecke fuehren ueber dieselbe Schenke und einen Hinterhof zur Gerbergasse."
      ],
      "rewards": [
        "20 GM",
        "Ein Geschenkgutschein oder Warenrabatt der Haendlergasse",
        "Ein kleiner Informantenkontakt im Marktviertel"
      ],
      "outcomes": {
        "success": "Die Quelle der Falschmuenzen wird entdeckt und die Haendler beruhigen sich.",
        "partial": "Die Verteilung stoppt vorerst, doch die Praeger entkommen.",
        "failure": "Der Streit auf dem Markt eskaliert und die Wache sperrt mehrere Staende."
      }
    },
    "16": {
      "id": "AG-037",
      "titel": "Lichter im alten Badehaus",
      "tier": "Bronze",
      "aushang": "Das stillgelegte Badehaus am Ostkanal zeigt nachts wieder Licht, Dampf und Stimmen. Die Nachbarschaft fuerchtet Spuk oder Schmuggler. Wer die Sache klaert, wird entlohnt.",
      "auftraggeber": "Hausbesitzerverband Ostkanal",
      "briefing": "Ein typischer schwarzes-Brett-Auftrag fuer mutige Neugierige. Das Badehaus soll untersucht, moegliche Gefahren sollen gebannt und die Bewohner der Umgebung beruhigt werden.",
      "objectives": [
        "Das Badehaus betreten und den Ursprung von Licht und Stimmen finden.",
        "Gefahren oder Eindringlinge beseitigen oder vertreiben.",
        "Klaeren, ob dort Schmuggel, Magie oder einfache Taeuschung betrieben wird."
      ],
      "complications": [
        "Ein Teil des Gebaeudes ist einsturzgefaehrdet.",
        "Die angeblichen Geister sind teilweise raffinierte Spiegel- und Lampentricks."
      ],
      "clues": [
        "Unter dem Kesselhaus fuehrt eine verborgene Tuer in alte Versorgungsgaenge.",
        "Frischer Kohlenstaub zeigt, dass erst kuerzlich wieder geheizt wurde."
      ],
      "rewards": [
        "24 GM",
        "Zugang zu einem geheimen Keller- oder Kanalzugang",
        "Wohlwollen der Anwohner am Ostkanal"
      ],
      "outcomes": {
        "success": "Die Ursache wird geklaert und das Badehaus verliert seinen Schrecken.",
        "partial": "Die Gefahr ist weg, aber die Hintermaenner bleiben unklar.",
        "failure": "Das Badehaus wird zum Sperrgebiet und die Geruechte nehmen weiter zu."
      }
    },
    "17": {
      "id": "AG-038",
      "titel": "Schluessel zur Schleuse",
      "tier": "Bronze",
      "aushang": "Gesucht: zuverlaessige Helfer fuer das Nordwehr. Der Hauptschluessel zur Nebenschleuse ist verschwunden, und starker Regen wird erwartet. Wer Schluessel oder Dieb findet, erhaelt Lohn.",
      "auftraggeber": "Wehrmeisterin Della Korn",
      "briefing": "Ein kleiner, klarer Auftrag fuer das schwarze Brett. Die Gruppe soll den verlorenen oder gestohlenen Schluessel finden, die Schleuse notfalls sichern und klaeren, ob Sabotage vorliegt.",
      "objectives": [
        "Den Weg des Schluessels rekonstruieren.",
        "Schleuse bis zur Klaerung sichern.",
        "Klaeren, ob es sich um Verlust, Diebstahl oder gezielte Sabotage handelt."
      ],
      "complications": [
        "Mehrere Arbeiter haben aus Angst vor Strafe gelogen.",
        "Ein Taschendieb hat den Schluessel erst gestohlen und dann an jemanden weitergegeben."
      ],
      "clues": [
        "Ein abgebrochener Bronzegrat an der Schlossplatte passt nur zu diesem Schluessel.",
        "Ein Pfandleiher bekam in der Nacht eine verdaechtige Ledertasche angeboten."
      ],
      "rewards": [
        "26 GM",
        "Freier Wehr- oder Schleusendurchlass fuer kuenftige Reisen",
        "Kontakt zu den Wasserhuetern"
      ],
      "outcomes": {
        "success": "Der Schluessel wird geborgen und die Schleuse bleibt kontrollierbar.",
        "partial": "Die Schleuse wird gesichert, aber der Schluessel bleibt verschwunden.",
        "failure": "Das Wehr muss aufgebrochen werden, und ein Teil der Ausruestung wird beschaedigt."
      }
    },
    "18": {
      "id": "AG-040",
      "titel": "Die sieben Unterschriften",
      "tier": "Bronze",
      "aushang": "Kurzer, aber dringender Botendienst fuer verlaessliche Abenteurer. Ein Bauvertrag braucht heute noch sieben gueltige Unterschriften in verschiedenen Vierteln, sonst verfallen Fristen und Zahlungen.",
      "auftraggeber": "Schreiberin Mevia Toll",
      "briefing": "Ein scheinbar einfacher Auftrag vom schwarzen Brett, der gutes Zeitmanagement, etwas Ueberredung und Ortskenntnis braucht. Die Gruppe soll die Unterzeichner rechtzeitig finden und das Dokument gueltig zurueckbringen.",
      "objectives": [
        "Alle sieben Unterzeichner vor Abend erreichen.",
        "Das Dokument unbeschaedigt und gueltig zurueckbringen.",
        "Moegliche absichtliche Verzoegerungen erkennen und umgehen."
      ],
      "complications": [
        "Ein Meister will erst unterschreiben, wenn ein kleiner Gefallen erledigt wird.",
        "Ein Konkurrent versucht, das Dokument kurzfristig stehlen oder austauschen zu lassen."
      ],
      "clues": [
        "Zwei der Unterzeichner wurden bewusst an falsche Orte bestellt.",
        "Im Dokument fehlt fast unmerklich ein Anhang mit wichtiger Klausel."
      ],
      "rewards": [
        "18 GM",
        "Notarieller Kontakt",
        "Ein offiziell gesiegelter Botenausweis fuer die Stadt"
      ],
      "outcomes": {
        "success": "Das Dokument kommt rechtzeitig zurueck und verhindert einen teuren Streit.",
        "partial": "Die Frist wird knapp gehalten, aber ein Anhang bleibt fraglich.",
        "failure": "Der Vertrag verfällt und mehrere Fraktionen sind veraergert."
      }
    },
    "19": {
      "id": "AG-041",
      "titel": "Der singende Brunnen",
      "tier": "Bronze",
      "aushang": "Am alten Lindenbrunnen werden nachts Stimmen, Gesang und gefluesterte Namen gehoert. Die Nachbarschaft schlaeft nicht mehr, und niemand traut sich nach Sonnenuntergang hinaus. Wer den Spuk klaert, wird bezahlt.",
      "auftraggeber": "Nachbarschaftsrat Lindenplatz",
      "briefing": "Ein ueberschaubarer Auftrag fuers schwarze Brett: Die Gruppe soll eine Nachtwache am Brunnen halten, die Quelle des Gesangs finden und moegliche Gefahren beseitigen.",
      "objectives": [
        "Eine Nacht am Lindenbrunnen beobachten.",
        "Die Quelle von Gesang oder Stimmen aufdecken.",
        "Klaeren, ob Magie, Mechanik oder Betrug dahintersteckt."
      ],
      "complications": [
        "Mehrere Bewohner haben aus Aberglauben kleine Opfergaben eingeworfen und Spuren verwischt.",
        "Ein Gaukler nutzt den Brunnenklang als Deckung fuer heimliche Treffen."
      ],
      "clues": [
        "Unter dem Brunnenrand sind feine Resonanzrohre verborgen.",
        "Der Gesang beginnt nur bei bestimmter Windrichtung."
      ],
      "rewards": [
        "21 GM",
        "Dank und Hilfe der Nachbarschaft am Lindenplatz",
        "Ein kleiner Geheimweg durch angrenzende Hauser"
      ],
      "outcomes": {
        "success": "Der Brunnen wird entzaubert oder enttarnt und der Platz wird wieder ruhig.",
        "partial": "Der Gesang endet, aber der eigentliche Nutzer entkommt.",
        "failure": "Der Platz gilt als verflucht und die Bewohner machen die Lage schlimmer."
      }
    },
    "20": {
      "id": "AG-017",
      "titel": "Der verlorene Vertrag",
      "tier": "Bronze",
      "hook": "Ein notariell versiegelter Vertrag für ein großes Bauprojekt wurde gestohlen.",
      "briefing": "Ohne Vertrag droht ein Rechtsstreit zwischen Gilden und Adel.",
      "objectives": [
        "Diebstahlort untersuchen (wer hatte Zugang?).",
        "Den Vertrag wiederbeschaffen oder eine Kopie legal bestätigen lassen.",
        "Den Dieb identifizieren (ohne öffentliche Blamage, falls gewünscht)."
      ],
      "complications": [
        "Der Vertrag enthält eine geheime Klausel zur Thronfolgefinanzierung.",
        "Der Dieb will nicht Geld, sondern Erpressung."
      ],
      "rewards": [
        "Gold + juristische Kontakte",
        "Ein Siegel, das Türen öffnet"
      ]
    },
    "id": "abenteuergilde-auftraege-bronze",
    "titel": "Abenteuergilde-Auftraege Bronze",
    "description": "Bronze-Auftraege der Abenteurergilde als eigenstaendige Zufallstabelle mit vollstaendigen Auftragseintraegen.",
    "tier": "Bronze",
    "dice": 20,
    "parts": false
  },
  "abenteuergilde-auftraege-gold.json": {
    "1": {
      "id": "AG-007",
      "titel": "Der Duft, den keiner riecht",
      "tier": "Gold",
      "hook": "Mehrere Viertel melden aggressive Tiere gleichzeitig, als ob eine Welle durch die Stadt zieht.",
      "briefing": "Die Gilde erhält Sondervollmacht, die Ursache schnell zu finden, bevor der General die Stadt abriegeln lässt.",
      "objectives": [
        "Hotspots triangulieren (Zeitpunkte, Wind, Geräusche, Wasserleitungen).",
        "Einen 'Trigger' identifizieren, der die Substanz aktiviert (Glocken, Schmiedehämmer, Feuerwerk).",
        "Quelle lokalisieren und stoppen, ohne Massenpanik."
      ],
      "complications": [
        "Streuner verbreiten gezielt falsche Hotspots, um SC zu binden.",
        "Der Puppenspieler bietet 'Hilfe' an – gegen Gefallen."
      ],
      "clues": [
        "Die Wellen korrelieren mit einem Lieferwagen, der morgens Routen fährt.",
        "Ein unscheinbares Pulver wird beim Pflastern der Straßen verteilt."
      ],
      "outcomes": {
        "success": "Quelle/Verteiler identifiziert; Zugriff auf Hauptplot möglich.",
        "partial": "Quelle bekannt, aber Täter entkommt.",
        "failure": "Ausgangssperre; Gilde unter Verdacht."
      }
    },
    "2": {
      "id": "AG-008",
      "titel": "Die unsichtbare Pranke",
      "tier": "Gold",
      "hook": "Ein Monster (z.B. Manticore, Basilisk, Owlbear) wird in der Nähe der Stadt ungewöhnlich aggressiv und zieht andere Tiere mit.",
      "briefing": "Die Wache will es jagen. Die Gilde soll herausfinden, ob es 'gejagt' wird oder etwas es treibt.",
      "objectives": [
        "Monster nicht töten, sondern vertreiben/fangen, um Ursache zu untersuchen.",
        "Spuren von Substanz an Krallen/Fell sammeln.",
        "Verbindung zwischen Monsterroute und Stadt-Hotspots finden."
      ],
      "complications": [
        "Monster reagiert auf Magie besonders stark; Zauber können es eskalieren.",
        "Leibgardist des Königs drängt auf schnelle Exekution."
      ],
      "clues": [
        "Am Fell klebt derselbe unsichtbare Film wie an den Teichen.",
        "Das Monster meidet bestimmte Steine/Metalle (Hinweis auf Gegenmittel)."
      ],
      "outcomes": {
        "success": "Antidot-/Abschirmmaterial entdeckt.",
        "partial": "Monster entkommt verletzt; wird noch gefährlicher.",
        "failure": "Monster getötet; wichtigste Probe verloren."
      }
    },
    "3": {
      "id": "AG-028",
      "titel": "Das Lied der stillen Stadt",
      "tier": "Gold",
      "aushang": "Sonderauftrag. Mehrere Viertel melden in derselben Nacht aggressive Tiere im Takt bestimmter Glocken und Spieluhren. Die Gilde sucht erfahrene Teams zur stillen Aufklaerung eines moeglichen stadtweiten Ausloesersystems. Hohe Bezahlung.",
      "auftraggeber": "Die Abenteurergilde selbst, mit Sondervollmacht",
      "briefing": "Dies ist ein echter Schwarzes-Brett-Goldauftrag: Mehrere Hinweise muessen parallel geprueft, Klangquellen verglichen und ein moegliches Ausloesesystem lokalisiert werden, bevor die Stadt in den Ausnahmezustand kippt.",
      "objectives": [
        "Zeitpunkte, Klangquellen und Hotspots abgleichen.",
        "Die ausloesende Melodie oder Frequenz identifizieren.",
        "Das Sendesystem stilllegen, ohne Massenpanik zu erzeugen."
      ],
      "complications": [
        "Falsche Melodien werden absichtlich in Umlauf gebracht.",
        "Einflussreiche Buerger verweigern Zugang zu ihren Tuermen oder Hallen."
      ],
      "clues": [
        "Dieselbe Vier-Noten-Folge taucht in mehreren Vierteln auf.",
        "Mehrere Klangkoerper stammen aus derselben Giesserei."
      ],
      "rewards": [
        "220 GM",
        "Sondervorrang bei kuenftigen Gildenauftraegen",
        "Ein Gefallen des Quartiermeisters der Gilde"
      ],
      "outcomes": {
        "success": "Das akustische Ausloesersystem wird lokalisiert und stillgelegt.",
        "partial": "Die Melodie ist bekannt, aber der mobile Sender entkommt.",
        "failure": "Eine Ausgangssperre tritt in Kraft und andere ziehen Nutzen daraus."
      }
    },
    "4": {
      "id": "AG-029",
      "titel": "Jagd auf den Verteiler",
      "tier": "Gold",
      "aushang": "Sonderfahndung. Gesucht wird ein Kurier mit Lieferlisten zu Oelen, Staub, Futterchargen und Strassenmaterial. Zielperson lebend gefangen bevorzugt. Hohe Belohnung und Verschwiegenheit garantiert.",
      "auftraggeber": "Abenteurergilde im Einvernehmen mit vertraulichen Stellen",
      "briefing": "Ein Goldauftrag fuers Brett: Der Kurier muss identifiziert, verfolgt und moeglichst lebend gefasst werden, bevor andere Fraktionen ihn zum Schweigen bringen.",
      "objectives": [
        "Den Kurier identifizieren und verfolgen.",
        "Unterlagen, Decknamen und Geldfluesse sichern.",
        "Naechste Kontaktstelle oder Auftraggeber bestimmen."
      ],
      "complications": [
        "Mehrere Gruppen wollen den Kurier toeten statt befragen.",
        "Es gibt Locktaschen und absichtlich falsche Listen."
      ],
      "clues": [
        "Ein wasserfestes Notizbuch arbeitet mit Farbcodes statt Namen.",
        "Mehrere harmlose Stadtdienste tauchen auf denselben Listen auf."
      ],
      "rewards": [
        "240 GM",
        "Zugriff auf beschlagnahmte Ausruestung im kleinen Umfang",
        "Vorrangige Behandlung durch die Gildenleitung bei politischen Fragen"
      ],
      "outcomes": {
        "success": "Ein belastbares Verteilernetz wird aufgedeckt.",
        "partial": "Der Kurier stirbt, aber seine Unterlagen bleiben erhalten.",
        "failure": "Der Kurier verschwindet, und alle Hotspots wechseln schlagartig."
      }
    },
    "5": {
      "id": "AG-030",
      "titel": "Der falsche Erlass",
      "tier": "Gold",
      "aushang": "Dringende Pruefung eines angeblich koeniglichen Erlasses: Tierkeulungen, Quarantaene und Sondergewalt der Wache wurden angeordnet. Gesucht werden verlaessliche Ermittler zur Echtheitspruefung und Unterbindung unrechtmaessiger Vollstreckung.",
      "auftraggeber": "Abenteurergilde, vermerkt durch das Siegel des Hauptschreibers",
      "briefing": "Das ist ein Brettauftrag mit politischer Sprengkraft. Papier, Siegel und Botenkette muessen geprueft, die Vollstreckung notfalls verzoegert und der Faelscher oder Nutzniesser gefunden werden.",
      "objectives": [
        "Siegel, Wachs, Papier und Botenkette pruefen.",
        "Die Vollstreckung stoppen oder verzoegern.",
        "Faelscher oder politischen Nutzniesser identifizieren."
      ],
      "complications": [
        "Einige Funktionstraeger wollen den Erlass ungeprueft nutzen.",
        "Zu offenes Vorgehen laesst die Gilde als Staatsfeind erscheinen."
      ],
      "clues": [
        "Das Wachs stimmt nicht mit Archivstuecken ueberein.",
        "Die Botenroute fuehrt ueber eine verlassene Kanzlei."
      ],
      "rewards": [
        "230 GM",
        "Archivzugang oder notarielle Hilfe durch koenigliche Kanzleikontakte",
        "Ein offizielles Entlastungsschreiben fuer spaetere Konfliktlagen"
      ],
      "outcomes": {
        "success": "Die Faelschung wird bewiesen und eine Saeuberungsaktion verhindert.",
        "partial": "Die Vollstreckung stoppt, aber die Hintermaenner entziehen sich.",
        "failure": "Die falsche Verfuegung tritt in Kraft und schafft vollendete Tatsachen."
      }
    },
    "6": {
      "id": "AG-031",
      "titel": "Unter dem Pflaster",
      "tier": "Gold",
      "aushang": "Sonderkommando fuer unterirdische Mischkammer gesucht. Hinweise deuten auf geheime Leitungen unter den Strassen hin, die Rueckstaende in Brunnen, Kanaele und Lagerkeller tragen. Nur erfahrene Teams melden sich.",
      "auftraggeber": "Abenteurergilde mit Sonderrecht zum Zugriff",
      "briefing": "Ein schwarzes Brett fuer grosse Auftraege: Zugang finden, Anlage sichern, Geraete und Faesser pruefen und moeglichst belastbare Beweise auf Auftraggeber und Verteilwege bergen.",
      "objectives": [
        "Zugang zur Hauptkammer finden.",
        "Faesser, Leitungen und Mischgeraete sichern.",
        "Beweise auf Auftraggeber, Logistik und Trigger sammeln."
      ],
      "complications": [
        "Die Anlage kann sich selbst fluten oder verraeuchern.",
        "Einige Arbeiter handeln unter Zwang und sollten moeglichst lebend gesichert werden."
      ],
      "clues": [
        "Bronzerohre verbinden bekannte Hotspots.",
        "Faesser sind nach Tierart und Ausloeser gruppiert."
      ],
      "rewards": [
        "260 GM",
        "Anteil an beschlagnahmter Ware oder Material im Wert von 40 GM",
        "Groesseres Ansehen innerhalb der Gilde"
      ],
      "outcomes": {
        "success": "Die Hauptquelle wird abgeschaltet und das Netz offengelegt.",
        "partial": "Die Quelle ist vernichtet, aber die Koepfe dahinter bleiben im Dunkeln.",
        "failure": "Die Kammer wird geflutet und fast alle Beweise gehen verloren."
      }
    },
    "7": {
      "id": "AG-032",
      "titel": "Die schwarze Audienz",
      "tier": "Gold",
      "aushang": "Verdeckter Einsatz. Es gibt Hinweise auf ein geheimes Treffen, bei dem Vertreter aus Gilden, Tempeln, Wache und Unterwelt zugleich manipuliert werden. Gesucht werden diskrete, belastbare Teams fuer Infiltration und Beweissicherung.",
      "auftraggeber": "Verdeckter Ausschuss der Abenteurergilde",
      "briefing": "Ein Goldauftrag fuer das schwarze Brett, aber nur fuer bewaehrte Leute: Eindringen, Namen sichern und unterscheiden, wer Taeter und wer nur erpresst ist.",
      "objectives": [
        "Das Treffen infiltrieren oder belauschen.",
        "Schuldige von bloß Erpressten unterscheiden.",
        "Mit Namen, Dokumenten oder Beweisen entkommen."
      ],
      "complications": [
        "Nicht alle Teilnehmer sind freiwillig dort.",
        "Ein Broker im Hintergrund arbeitet mit wohltätigen Fronten."
      ],
      "clues": [
        "Jede Fraktion erhielt eine andere Katastrophengeschichte als Einladung.",
        "Mehrere Liefer- und Spendenwege laufen auf dieselben Strohmaenner hinaus."
      ],
      "rewards": [
        "250 GM",
        "Politische Schutzdeckung durch die Gilde",
        "Einmaliger Zugriff auf ein geheimes Informantennetz"
      ],
      "outcomes": {
        "success": "Die politische Struktur hinter dem Komplott wird sichtbar.",
        "partial": "Einige Namen werden gesichert, die Schluesselfigur bleibt aber verdeckt.",
        "failure": "Die Gilde wird selbst kompromittiert."
      }
    },
    "8": {
      "id": "AG-033",
      "titel": "Der Kaefig des Koenigs",
      "tier": "Gold",
      "aushang": "Sonderauftrag. Ein koenigliches Schaustueck mit seltenen Bestien soll heimlich in eine sichere Anlage verlegt werden, nachdem ein Tierpfleger verschwand und mehrere Kaefige manipuliert wurden. Nur erfahrene Teams melden sich.",
      "auftraggeber": "Abenteurergilde im Auftrag eines koeniglichen Stallmeisters",
      "briefing": "Ein Goldauftrag mit politischem Gewicht: Die Gruppe soll die Bestienanlage sichern, den verschwundenen Pfleger finden, die Kaefigmechanik untersuchen und klaeren, ob jemand die Tiere als Ausloeser fuer einen Hofskandal missbrauchen will.",
      "objectives": [
        "Kaefige, Schleusen und Beruhigungsprotokolle sichern.",
        "Den verschwundenen Pfleger oder seine Aufzeichnungen finden.",
        "Manipulierte Pflegeoele, Futter oder Klangzeichen identifizieren.",
        "Eine Eskalation am Hof oder eine oeffentliche Tierjagd verhindern."
      ],
      "complications": [
        "Ein koeniglicher Leibgardist will die gefaehrlichsten Tiere sofort toeten lassen.",
        "Ein Hofbeamter versucht, die Anlage vor der Gilde zu versiegeln.",
        "Mindestens ein Tier ist nicht boese, sondern gezielt auf bestimmte Signale konditioniert worden."
      ],
      "clues": [
        "Mehrere Kaefigriegel tragen dasselbe reaktive Oel wie fruehere Hotspots.",
        "Im Notizbuch des Pflegers stehen Lieferzeichen, die auch in Futter- und Strassenmateriallisten auftauchen.",
        "Eine Glockenfolge aus dem Hofgarten loest Unruhe aus, obwohl sie offiziell nur Zeremonien dient."
      ],
      "rewards": [
        "270 GM",
        "Koeniglicher Stall- oder Hofzugang fuer spaetere Ermittlungen",
        "Ein diskreter Gefallen eines einflussreichen Hofkontakts"
      ],
      "outcomes": {
        "success": "Die Anlage bleibt unter Kontrolle, der Pfleger oder seine Beweise werden gesichert und eine Hofspur fuehrt tiefer ins Komplott.",
        "partial": "Die Tiere werden gerettet, aber ein Verantwortlicher entkommt mit wichtigen Unterlagen.",
        "failure": "Ein Ausbruch erzwingt eine oeffentliche Jagd und der Hof nutzt die Katastrophe gegen die Gilde."
      }
    },
    "9": {
      "id": "AG-046",
      "titel": "Das rote Register",
      "tier": "Gold",
      "aushang": "Sonderauftrag nur fuer erfahrene Teams: Eine versteckte Buchfuehrung zu Futter, Oelen und Schutzgeldern soll in einem gesicherten Lagerhaus geborgen werden. Diskretion, Geschwindigkeit und belastbare Beweise sind zwingend.",
      "auftraggeber": "Abenteurergilde, auf Anweisung der Leitung",
      "briefing": "Ein Schwarzes-Brett-Goldauftrag mit klarer Zielsetzung: Eindringen, Register sichern, lebende Zeugen wenn moeglich festsetzen und den Inhalt schuetzen, bevor Unterwelt oder Wache die Sache bereinigen.",
      "objectives": [
        "In das Lagerhaus eindringen.",
        "Register, Zahlungslisten und Proben sichern.",
        "Mindestens einen Verantwortlichen identifizieren oder festsetzen."
      ],
      "complications": [
        "Das Lagerhaus ist doppelt abgesichert: gegen Diebe und gegen Verrat von innen.",
        "Ein Feuerplan soll Beweise bei Gefahr vernichten."
      ],
      "clues": [
        "Mehrere Listen verknuepfen scheinbar harmlose Haendler zu einem Ring.",
        "Eine rot markierte Spalte verweist auf besondere Ausloeser und Zieltiere."
      ],
      "rewards": [
        "245 GM",
        "Beschlagnahmte Ware im Wert von 30 GM",
        "Ein direkter Gefallen der Gildenleitung"
      ],
      "outcomes": {
        "success": "Das Register liefert harte Beweise und Namen.",
        "partial": "Die Listen werden gesichert, aber die Verantwortlichen entkommen.",
        "failure": "Das Lagerhaus brennt aus und die Beweise sind fast voellig verloren."
      }
    },
    "10": {
      "id": "AG-047",
      "titel": "Die Maske des Kaemmerers",
      "tier": "Gold",
      "aushang": "Grosser Sonderauftrag: Bei einem Hofmaskenfest sollen Abrechnungen, Siegel und Erpressungsmaterial den Besitzer wechseln. Gesucht wird eine erfahrene Gruppe zur stillen Beobachtung, Sicherung und Aufdeckung des Drahtziehers.",
      "auftraggeber": "Abenteurergilde ueber einen verdeckten Hofkontakt",
      "briefing": "Ein Goldauftrag fuer diskrete Spezialisten. Die Gruppe soll ein Maskenfest infiltrieren, die Uebergabe verhindern oder kontrollieren und moeglichst belastbare Hinweise auf Auftraggeber und Empfaenger gewinnen.",
      "objectives": [
        "Zugang zum Fest oder zu seinen Dienerwegen erhalten.",
        "Die zu uebergebenden Unterlagen, Siegel oder Listen identifizieren.",
        "Den Drahtzieher oder den Empfaenger entlarven und Beweise sichern."
      ],
      "complications": [
        "Mehrere Gaeste tragen identische Masken und Doppelrollen.",
        "Ein harmloser Skandal kann das eigentliche Geschaeft ueberdecken.",
        "Zu fruehes Eingreifen laesst die entscheidende Verbindung verschwinden."
      ],
      "clues": [
        "Der Kaemmerer nutzt einen zweiten, inoffiziellen Siegelring fuer geheime Abrechnungen.",
        "Eine Servierroute durch den Wintergarten wird nur fuer ganz bestimmte Gaeste geoeffnet."
      ],
      "rewards": [
        "255 GM",
        "Ein Hofpass fuer spaetere Ermittlungen",
        "Wohlwollen oder Schuldbrief eines wichtigen Hofkontakts"
      ],
      "outcomes": {
        "success": "Die Uebergabe wird kontrolliert oder verhindert, und eine wichtige Hofspur wird gesichert.",
        "partial": "Beweise werden geborgen, aber der Hauptdrahtzieher entkommt.",
        "failure": "Das Fest endet im politischen Skandal und die Gruppe geraet unter Verdacht."
      }
    },
    "id": "abenteuergilde-auftraege-gold",
    "titel": "Abenteuergilde-Auftraege Gold",
    "description": "Gold-Auftraege der Abenteurergilde als eigenstaendige Zufallstabelle mit vollstaendigen Auftragseintraegen.",
    "tier": "Gold",
    "dice": 10,
    "parts": false
  },
  "abenteuergilde-auftraege-nach-tier.json": {
    "id": "abenteuergilde-auftraege-nach-tier",
    "titel": "Abenteuergilde-Auftraege nach Tier",
    "description": "Sammlung der tierbasierten Auftragstabellen der Abenteurergilde. Jede Tabellenzeile enthaelt vollstaendige Auftragseintraege statt reiner IDs.",
    "tiers": {
      "Bronze": {
        "1": {
          "id": "AG-001",
          "titel": "Milch, die beißt",
          "tier": "Bronze",
          "hook": "Eine Molkerei meldet, dass Kühe, Ziegen und ein Hofhund plötzlich aggressiv werden und Melker verletzen.",
          "briefing": "Die Gilde soll die Tiere sichern, ohne die Herde zu schlachten. Der Bauer schwört, es gab keinen Wolf, kein Gift, keinen Streit - nur 'plötzlichen Wahnsinn'.",
          "objectives": [
            "Tiere beruhigen/isolieren (nicht-tödlich bevorzugt).",
            "Proben von Futter, Wasser, Stallstreu, Milch nehmen.",
            "Spuren zum Ursprung der Aggression (Windrichtung, Wasserlauf, Lieferkette) sammeln."
          ],
          "complications": [
            "Ein verletzter Knecht ist überzeugt, es sei ein Fluch und ruft nach einem Priester - was die Lage eskaliert.",
            "Die Tiere reagieren besonders auf Klang/Metall (unbewusster Trigger der Substanz)."
          ],
          "clues": [
            "Futter riecht normal, aber in der Tränke schimmert bei Kerzenlicht kurz ein 'Ölfilm'.",
            "Am Bach oberhalb des Hofs sind Fische tot, doch niemand hat es bemerkt."
          ],
          "outcomes": {
            "success": "Herde überlebt, erste Spur führt zum Bachlauf.",
            "partial": "Ein Tier stirbt, Bauer wendet sich gegen die Gilde.",
            "failure": "Herde bricht aus, Stadtwache wird eingeschaltet."
          }
        },
        "2": {
          "id": "AG-002",
          "titel": "Bellen in der Nacht",
          "tier": "Bronze",
          "hook": "In einem Wohnviertel greifen Hunde ihre Besitzer an; die Stadtwache will 'alle Köter räumen'.",
          "briefing": "Die Gilde soll die Lage deeskalieren, bevor es ein Massaker gibt.",
          "objectives": [
            "Hundemeute einkreisen und ohne Töten ausschalten.",
            "Zeugen befragen: erster Ausbruch, Wetter, Gerüche, Lieferungen.",
            "Einen betroffenen Hund sicher zur Untersuchung bringen."
          ],
          "complications": [
            "Ein Streuner-Netzwerk wird verdächtigt, obwohl es nur zufällig betroffen ist.",
            "Barde verbreitet ein Lied über 'Hundedämonen', das Panik auslöst."
          ],
          "clues": [
            "Die Aggression tritt in Wellen auf, als ob etwas durch die Straße 'zieht'.",
            "In der Nähe steht ein Fass mit harmlos wirkendem Lampenöl - aber es stammt aus unbekannter Quelle."
          ],
          "outcomes": {
            "success": "Die Wache hält sich zurück; der Quartiermeister schuldet der Gilde einen Gefallen.",
            "partial": "Ein Kind wird verletzt; Ruf der Gilde leidet.",
            "failure": "Die Wache schlachtet die Tiere, Spuren gehen verloren."
          }
        },
        "3": {
          "id": "AG-003",
          "titel": "Die stille Spur",
          "tier": "Bronze",
          "hook": "Jäger berichten von Rehen, die ohne Warnung angreifen - und dann fliehen, als wären sie 'wach geworden'.",
          "briefing": "Der Förster will keine Panik im Dorf, aber es gibt schon Tote.",
          "objectives": [
            "Waldgebiet kartieren: Hotspots, Wind, Wasser, Nester.",
            "Lebendes Tier zur Beobachtung fangen.",
            "Ursprung der Substanz lokalisieren (Quelle, Pilzfeld, Ruine)."
          ],
          "complications": [
            "Ein Monster nutzt das Chaos (z.B. Ettercap, Werwolfkult, Goblins) - ist aber nicht die Ursache.",
            "Spuren werden durch Regen verwischt; die Substanz bleibt dennoch wirksam."
          ],
          "clues": [
            "Moos leuchtet für Sekunden, wenn Metall darübergezogen wird.",
            "Ein verlassener Wagenweg führt zu einer eingestürzten Mine."
          ],
          "outcomes": {
            "success": "Hinweis auf Mine/Untergrund als Quelle.",
            "partial": "Monster entkommt; Dorfbewohner geben ihm die Schuld.",
            "failure": "Weitere Angriffe; Jagdverbot, Konflikt mit Förstern."
          }
        },
        "4": {
          "id": "AG-010",
          "titel": "Kleine Pfoten, große Wirkung",
          "tier": "Bronze",
          "hook": "Ein Kinderheim bittet um Hilfe: Katzen werden aggressiv, Kinder trauen sich nicht mehr in Schlafräume.",
          "briefing": "Emotionaler Auftrag. Ideal, um den Tier-Wahnsinn in die Zivilbevölkerung zu tragen.",
          "objectives": [
            "Kinder schützen, Katzen einfangen, beruhigen.",
            "Herausfinden, ob eine Quelle im Gebäude ist (Keller, Küche, Spielzeugspenden).",
            "Verdächtige Spende/Lieferung zurückverfolgen."
          ],
          "complications": [
            "Spenden kamen von einer 'Wohltätigkeitsstiftung' (Frontorganisation).",
            "Ein Lehrer wird fälschlich beschuldigt; soziale Eskalation."
          ],
          "clues": [
            "In neuen Spielzeugen ist ein harmlos wirkender Füllstoff, der den Film trägt.",
            "Auf den Kisten: ein neutrales Händlerzeichen, kein Streuner-Logo."
          ],
          "outcomes": {
            "success": "Spur zu Stiftung/Lieferroute.",
            "partial": "Öffentlicher Skandal; Barde nutzt ihn.",
            "failure": "Kinder verletzt; Stadt fordert harte Maßnahmen."
          }
        },
        "5": {
          "id": "AG-011",
          "titel": "Verschollener Karren",
          "tier": "Bronze",
          "hook": "Ein Händlerkarren mit Werkzeugstahl und Lohnkasse ist auf der Landstraße verschwunden.",
          "briefing": "Die Gilde soll den Karren finden, bevor die Ware auf dem Schwarzmarkt landet.",
          "objectives": [
            "Spurensuche entlang der Route (Radspuren, Lagerplätze, Zeugen).",
            "Überfallende stellen oder Ware bergen.",
            "Lieferung diskret zurückbringen (Ruf des Händlers schützen)."
          ],
          "complications": [
            "Die 'Räuber' sind entlassene Gesellen mit echter Notlage.",
            "Ein wachhabender Trupp Stadtwache verlangt Bestechung."
          ],
          "rewards": [
            "Gold + Rabatt bei Schmieden",
            "Kontakte in der Handelsgilde"
          ]
        },
        "6": {
          "id": "AG-012",
          "titel": "Das Spukhaus am Brunnen",
          "tier": "Bronze",
          "hook": "Bewohner melden Stimmen und klirrende Ketten aus einem leerstehenden Haus.",
          "briefing": "Niemand wurde verletzt, aber Angst lähmt das Viertel.",
          "objectives": [
            "Haus untersuchen, Quelle finden (Geist, Betrug, Kreatur).",
            "Gefahr bannen oder Betrüger entlarven.",
            "Bewohner beruhigen."
          ],
          "complications": [
            "Es ist ein ausgeklügelter Schmugglertunnel unter dem Haus.",
            "Ein echtes, gebundenes Ruheloses Wesen wurde als Abschreckung missbraucht."
          ],
          "rewards": [
            "Dank der Nachbarschaft (Safehouse)",
            "Zugang zu Schmugglertunnel-Infos"
          ]
        },
        "7": {
          "id": "AG-014",
          "titel": "Der verschwundene Novize",
          "tier": "Bronze",
          "hook": "Ein Tempel bittet: Ein Novize ist seit der Nachtwache weg.",
          "briefing": "Der rotierende Religionsrat will keinen Skandal.",
          "objectives": [
            "Letzte Wege rekonstruieren.",
            "Novizen lebend finden.",
            "Wahrheit diskret halten oder gezielt offenlegen."
          ],
          "complications": [
            "Der Novize ist nicht entführt, sondern wollte Beweise für Korruption sammeln.",
            "Ein rivalisierender Kult bietet 'Hilfe' gegen Gefallen."
          ],
          "rewards": [
            "Tempelheilung/Unterkunft",
            "Ein Audienzbrief für den Religionsrat"
          ]
        },
        "8": {
          "id": "AG-015",
          "titel": "Turnier der drei Banner",
          "tier": "Bronze",
          "hook": "Drei Gilden stiften ein Stadtturnier; die Gilde soll als neutrale Schiedsrichter auftreten.",
          "briefing": "Offiziell Fest und Sport. Inoffiziell drohen Prügeleien und politische Provokationen.",
          "objectives": [
            "Wettkämpfe absichern (nicht tödlich).",
            "Sabotage verhindern (Vergiftung, gestohlene Ausrüstung).",
            "Einen Streit schlichten, bevor er eskaliert."
          ],
          "complications": [
            "Ein Teilnehmer ist ein verkleideter Adliger.",
            "Ein Skandal soll absichtlich provoziert werden, um eine Gilde zu diskreditieren."
          ],
          "rewards": [
            "Renommee bei Stadtbevölkerung",
            "Ein persönlicher Gefallen eines Gildenmeisters"
          ]
        },
        "9": {
          "id": "AG-019",
          "titel": "Federn ueber der Gerberei",
          "tier": "Bronze",
          "aushang": "Gesucht: verlaessliche Abenteurer fuer eine stoerende, aber loesbare Plage ueber der Suedgerberei. Kraehen, Moewen und zwei grosse Raben greifen Arbeiter an und stehlen Lederzeichen. Bezahlung nach Sicherung des Hofs und Rueckgabe der Marken.",
          "auftraggeber": "Gerbermeister Halven Trask",
          "briefing": "Ein Auftrag fuer das schwarze Brett: Die Tiere muessen vertrieben oder eingefangen, die Ursache gefunden und weitere Ausfaelle in der Gerberei verhindert werden. Der Auftraggeber wuenscht moeglichst wenig Aufsehen und keine Beschaedigung der Ware.",
          "objectives": [
            "Dach und Hof sichern, ohne unnoetig Tiere zu toeten.",
            "Gestohlene Lederzeichen oder Nester ausfindig machen.",
            "Dachpech, Regenfaesser und Abfallwege auf Rueckstaende pruefen."
          ],
          "complications": [
            "Die Gerbergesellen beschuldigen bereits eine rivalisierende Werkstatt.",
            "Strassenkinder sammeln herabfallende Marken ein und verkaufen sie weiter."
          ],
          "clues": [
            "Auf dem Dachpech liegt ein violett schimmernder Film.",
            "Mehrere Marken tauchten in einem Taubenschlag nahe der Faerbergasse auf."
          ],
          "rewards": [
            "35 GM",
            "Dauerhafter Rabatt bei der Suedgerberei",
            "1 Satz robustes Lederzeug oder Lederscheide nach Wahl"
          ],
          "outcomes": {
            "success": "Die Gerberei nimmt den Betrieb wieder auf und eine neue Spur fuehrt in die Faerbergasse.",
            "partial": "Der Hof ist gesichert, aber mehrere Chargen sind unbrauchbar geworden.",
            "failure": "Die Gerbergilde macht oeffentlich Stimmung gegen unfähige Abenteurer."
          }
        },
        "10": {
          "id": "AG-020",
          "titel": "Nachtschicht in der Muehle",
          "tier": "Bronze",
          "aushang": "Gesucht: Nachtwache fuer die Ostmuehle. Ratten, ein Kater und allerlei Kleingetier zerreissen Mehlsaecke und greifen Arbeiter an. Wer die Ursache findet und die Muehle offen haelt, wird entlohnt.",
          "auftraggeber": "Muellerin Sera Halm",
          "briefing": "Der Auftrag ist klein genug fuers schwarze Brett, aber dringend: Eine Schicht lang Wache halten, Schaeden verhindern und pruefen, ob Korn, Achsenschmiere oder Wasser manipuliert wurden.",
          "objectives": [
            "Eine volle Nachtschicht in der Muehle absichern.",
            "Mindestens eine Ratte oder Probe lebend bzw. unbeschaedigt sichern.",
            "Mahlwerk, Kornlager und Schmiermittel untersuchen."
          ],
          "complications": [
            "Der Mueller hat einen billigen, fragwuerdigen Lieferanten verschwiegen.",
            "Das Muehlrad auf Volllast scheint die Tiere zusaetzlich zu reizen."
          ],
          "clues": [
            "In der Achsenschmiere befindet sich feiner violetter Staub.",
            "Ein Sack Korn traegt ein gefaelschtes Handelszeichen."
          ],
          "rewards": [
            "30 GM",
            "Kostenlose Verpflegung fuer eine Woche in der Ostmuehle",
            "Ein Sack gutes Mehl oder Proviant fuer Reisen"
          ],
          "outcomes": {
            "success": "Die Muehle bleibt offen und eine Spur fuehrt zu einem Zwischenlager.",
            "partial": "Der Betrieb wird gerettet, aber ein ganzer Mahlgang ist verloren.",
            "failure": "Die Muehle schliesst fuer Tage und die Nachbarschaft verliert Vertrauen."
          }
        },
        "11": {
          "id": "AG-021",
          "titel": "Die Messe der kleinen Wunder",
          "tier": "Bronze",
          "aushang": "Dringend: Hilfe fuer den Tempelmarkt am Morgensternplatz gesucht. Brieftauben, Kaninchen und ein Segnungslamm verhalten sich wild. Kinder und Staende muessen geschuetzt werden. Freundlicher Umgang erwuenscht.",
          "auftraggeber": "Tempeldienerin Emina",
          "briefing": "Dieser Aushang richtet sich an ruhige, verlaessliche Leute. Die Feier soll nicht in Panik enden; gesuchte Helfer sollen Tiere beruhigen, Spenden und Weihrauch pruefen und moeglichst diskret handeln.",
          "objectives": [
            "Kinder und Besucher in Sicherheit bringen.",
            "Betroffene Tiere beruhigen oder einfangen.",
            "Segnungspulver, Weihrauch und Futterspenden pruefen."
          ],
          "complications": [
            "Ein Schausteller vergroessert mit Illusionen unbeabsichtigt die Panik.",
            "Ein Priester spricht vorschnell von boesen Vorzeichen."
          ],
          "clues": [
            "Nur die neuen Weihrauchkegel loesen starke Reaktionen aus.",
            "Mehrere Spendenkisten tragen dasselbe neutrale Haendlerzeichen."
          ],
          "rewards": [
            "25 GM",
            "Tempelsegen oder kostenlose Heilung kleiner Verletzungen",
            "Ein Empfehlungsschreiben an den Religionsrat"
          ],
          "outcomes": {
            "success": "Die Feier wird gerettet und die Spendenlieferung wird als Spur gesichert.",
            "partial": "Die Tiere werden beruhigt, aber der Markt wird abgebrochen.",
            "failure": "Der Vorfall wird zum oeffentlichen Skandal."
          }
        },
        "12": {
          "id": "AG-022",
          "titel": "Der Lehrling im Schilf",
          "tier": "Bronze",
          "aushang": "Belohnung fuer die Suche nach einem vermissten Fischerlehrling am Nordteich. Gänse und Froesche greifen am Schilfufer an. Wer den Jungen lebend findet und die Ufer wieder sicher macht, wird bezahlt.",
          "auftraggeber": "Fischerbund Nordteich",
          "briefing": "Ein typischer Bretterauftrag: Jemand wird gesucht, das Gebiet ist gefaehrlich, aber nicht toedlich genug fuer einen Grossalarm. Auftragnehmer sollen das Ufer absuchen und zugleich pruefen, ob Koeder oder Wasser manipuliert wurden.",
          "objectives": [
            "Den Lehrling lebend finden.",
            "Das Schilfgebiet kartieren und sichern.",
            "Koeder, Wasser und verborgene Durchlaesse ueberpruefen."
          ],
          "complications": [
            "Schmuggler nutzen dieselben Schilfpfade und lenken von sich ab.",
            "Der Lehrling hat selbst gegen Regeln verstossen und verschweigt etwas."
          ],
          "clues": [
            "Die Koederwuermer riechen nach alchemistischer Salzlake.",
            "Nahe eines verborgenen Durchlasses schimmert ein violetter Film."
          ],
          "rewards": [
            "40 GM",
            "Freier Fisch und Raeucherware fuer mehrere Reisen",
            "Zugang zu Booten des Fischerbunds bei spaeteren Einsaetzen"
          ],
          "outcomes": {
            "success": "Der Lehrling ueberlebt und der Durchlass wird als neue Spur markiert.",
            "partial": "Der Lehrling wird gerettet, aber die Schmuggler verschwinden.",
            "failure": "Das Ufer wird zum Sperrgebiet und die Spur versandet."
          }
        },
        "13": {
          "id": "AG-034",
          "titel": "Die verschwundene Glocke",
          "tier": "Bronze",
          "aushang": "Belohnung fuer die schnelle Wiederbeschaffung der kleinen Bronzeglocke der Marktkapelle. Ohne sie kann das Morgenritual zum Festtag nicht stattfinden. Diskretion erwuenscht.",
          "auftraggeber": "Schwester Alke von der Marktkapelle",
          "briefing": "Ein einfacher Schwarzes-Brett-Auftrag: Die Glocke wurde in der Nacht gestohlen oder versteckt. Gesucht werden Abenteurer, die Spuren sichern, das Stueck zurueckbringen und moeglichst keinen oeffentlichen Skandal verursachen.",
          "objectives": [
            "Den Diebstahlort untersuchen.",
            "Die Glocke vor Sonnenaufgang oder wenigstens vor dem Festzug wiederbeschaffen.",
            "Klaeren, ob es schlichter Diebstahl, Erpressung oder Sabotage war."
          ],
          "complications": [
            "Ein bettelarmer Ex-Novize steht zu Unrecht im Verdacht.",
            "Mehrere Kinder wissen mehr, als sie zugeben wollen, haben die Glocke aber nur weiterverkauft."
          ],
          "clues": [
            "Am Glockenseil klebt rotes Wachs von einer Lastkarrenmarke.",
            "Ein Schrotthaendler bekam in der Nacht ein auffaellig schweres Paket angeboten."
          ],
          "rewards": [
            "22 GM",
            "Ein Tempelsegen fuer die Gruppe",
            "Unterkunft und einfache Heilung in der Marktkapelle"
          ],
          "outcomes": {
            "success": "Die Glocke wird rechtzeitig zurueckgebracht und der Schuldige oder Auftraggeber identifiziert.",
            "partial": "Die Glocke wird gefunden, aber erst nach dem Festtag.",
            "failure": "Das Ritual faellt aus und die Marktgemeinde macht die Gilde mitverantwortlich."
          }
        },
        "14": {
          "id": "AG-035",
          "titel": "Gaense am Stadttor",
          "tier": "Bronze",
          "aushang": "Gesucht: ruhige Helfer am Osttor. Eine Schar Gaense blockiert seit dem Morgengrauen den Durchgang, beisst nach Haendlern und bringt Lasttiere durcheinander. Die Tiere sollen vertrieben oder eingefangen werden, ohne den Marktverkehr weiter lahmzulegen.",
          "auftraggeber": "Torhauptmann Rul Tann",
          "briefing": "Ein kleiner Schwarzes-Brett-Auftrag mit Zeitdruck: Die Gruppe soll das Tor freimachen, herausfinden, warum die Gaense ausgerechnet dort bleiben, und verhindern, dass Wache oder Haendler die Sache brutal loesen.",
          "objectives": [
            "Die Gaenseschar vom Tor weglocken oder sicher einfangen.",
            "Verletzte Haendler, Zugtiere und Passanten beruhigen.",
            "Futterreste, Wasserpfuetzen und Karren am Tor auf Ausloeser pruefen."
          ],
          "complications": [
            "Ein ungeduldiger Fuhrmann will mit seinem Wagen einfach durchbrechen.",
            "Ein Junge behauptet, die Gaense gehoerten ihm, verschweigt aber, woher das neue Futter kam."
          ],
          "clues": [
            "In einem Futterbeutel klebt violett schimmernder Staub zwischen Hafer und Brotkrumen.",
            "Die Tiere beruhigen sich, sobald sie vom metallbeschlagenen Fallgitter entfernt sind."
          ],
          "rewards": [
            "28 GM",
            "Freier Stadttordurchlass fuer kleinere Botengaenge",
            "Ein dankbarer Kontakt unter den Torwaechtern"
          ],
          "outcomes": {
            "success": "Das Tor wird wieder geoeffnet und die Spur fuehrt zu einem Futterhaendler nahe der Ostgasse.",
            "partial": "Die Gaense werden vertrieben, aber ein Karrenunfall beschaedigt Ware und Ruf.",
            "failure": "Die Wache erschlaegt mehrere Tiere, der Verkehr bricht zusammen und Hinweise gehen verloren."
          }
        },
        "15": {
          "id": "AG-036",
          "titel": "Falsche Kupfermuenzen",
          "tier": "Bronze",
          "aushang": "Mehrere Haendler suchen Hilfe: In Umlauf geraten auffaellig schlechte Kupfermuenzen sorgen fuer Streit, falsche Wechsel und Drohungen. Gesucht wird, wer sie praegt und verteilt.",
          "auftraggeber": "Haendlerring der Suedgasse",
          "briefing": "Ein kleiner Ermittlungsauftrag fuer das schwarze Brett. Die Gruppe soll ein paar verdaechtige Muenzen verfolgen, die Umlaufwege pruefen und moeglichst die Falschpraeger oder Verteiler ausfindig machen.",
          "objectives": [
            "Mindestens drei verdaechtige Muenzen oder Zahler sichern.",
            "Den Umlaufweg vom Markt zu einer Quelle zurueckverfolgen.",
            "Eine Falschpraegerstaette oder einen Verteiler aufdecken."
          ],
          "complications": [
            "Ein ehrlicher Ladenbesitzer hat die Muenzen unwissentlich weitergegeben und fuerchtet um seinen Ruf.",
            "Die Falschmuenzer arbeiten mit Kindern als Laufboten."
          ],
          "clues": [
            "Die Muenzen klingen stumpfer und tragen winzige Randfehler.",
            "Mehrere Stuecke fuehren ueber dieselbe Schenke und einen Hinterhof zur Gerbergasse."
          ],
          "rewards": [
            "20 GM",
            "Ein Geschenkgutschein oder Warenrabatt der Haendlergasse",
            "Ein kleiner Informantenkontakt im Marktviertel"
          ],
          "outcomes": {
            "success": "Die Quelle der Falschmuenzen wird entdeckt und die Haendler beruhigen sich.",
            "partial": "Die Verteilung stoppt vorerst, doch die Praeger entkommen.",
            "failure": "Der Streit auf dem Markt eskaliert und die Wache sperrt mehrere Staende."
          }
        },
        "16": {
          "id": "AG-037",
          "titel": "Lichter im alten Badehaus",
          "tier": "Bronze",
          "aushang": "Das stillgelegte Badehaus am Ostkanal zeigt nachts wieder Licht, Dampf und Stimmen. Die Nachbarschaft fuerchtet Spuk oder Schmuggler. Wer die Sache klaert, wird entlohnt.",
          "auftraggeber": "Hausbesitzerverband Ostkanal",
          "briefing": "Ein typischer schwarzes-Brett-Auftrag fuer mutige Neugierige. Das Badehaus soll untersucht, moegliche Gefahren sollen gebannt und die Bewohner der Umgebung beruhigt werden.",
          "objectives": [
            "Das Badehaus betreten und den Ursprung von Licht und Stimmen finden.",
            "Gefahren oder Eindringlinge beseitigen oder vertreiben.",
            "Klaeren, ob dort Schmuggel, Magie oder einfache Taeuschung betrieben wird."
          ],
          "complications": [
            "Ein Teil des Gebaeudes ist einsturzgefaehrdet.",
            "Die angeblichen Geister sind teilweise raffinierte Spiegel- und Lampentricks."
          ],
          "clues": [
            "Unter dem Kesselhaus fuehrt eine verborgene Tuer in alte Versorgungsgaenge.",
            "Frischer Kohlenstaub zeigt, dass erst kuerzlich wieder geheizt wurde."
          ],
          "rewards": [
            "24 GM",
            "Zugang zu einem geheimen Keller- oder Kanalzugang",
            "Wohlwollen der Anwohner am Ostkanal"
          ],
          "outcomes": {
            "success": "Die Ursache wird geklaert und das Badehaus verliert seinen Schrecken.",
            "partial": "Die Gefahr ist weg, aber die Hintermaenner bleiben unklar.",
            "failure": "Das Badehaus wird zum Sperrgebiet und die Geruechte nehmen weiter zu."
          }
        },
        "17": {
          "id": "AG-038",
          "titel": "Schluessel zur Schleuse",
          "tier": "Bronze",
          "aushang": "Gesucht: zuverlaessige Helfer fuer das Nordwehr. Der Hauptschluessel zur Nebenschleuse ist verschwunden, und starker Regen wird erwartet. Wer Schluessel oder Dieb findet, erhaelt Lohn.",
          "auftraggeber": "Wehrmeisterin Della Korn",
          "briefing": "Ein kleiner, klarer Auftrag fuer das schwarze Brett. Die Gruppe soll den verlorenen oder gestohlenen Schluessel finden, die Schleuse notfalls sichern und klaeren, ob Sabotage vorliegt.",
          "objectives": [
            "Den Weg des Schluessels rekonstruieren.",
            "Schleuse bis zur Klaerung sichern.",
            "Klaeren, ob es sich um Verlust, Diebstahl oder gezielte Sabotage handelt."
          ],
          "complications": [
            "Mehrere Arbeiter haben aus Angst vor Strafe gelogen.",
            "Ein Taschendieb hat den Schluessel erst gestohlen und dann an jemanden weitergegeben."
          ],
          "clues": [
            "Ein abgebrochener Bronzegrat an der Schlossplatte passt nur zu diesem Schluessel.",
            "Ein Pfandleiher bekam in der Nacht eine verdaechtige Ledertasche angeboten."
          ],
          "rewards": [
            "26 GM",
            "Freier Wehr- oder Schleusendurchlass fuer kuenftige Reisen",
            "Kontakt zu den Wasserhuetern"
          ],
          "outcomes": {
            "success": "Der Schluessel wird geborgen und die Schleuse bleibt kontrollierbar.",
            "partial": "Die Schleuse wird gesichert, aber der Schluessel bleibt verschwunden.",
            "failure": "Das Wehr muss aufgebrochen werden, und ein Teil der Ausruestung wird beschaedigt."
          }
        },
        "18": {
          "id": "AG-040",
          "titel": "Die sieben Unterschriften",
          "tier": "Bronze",
          "aushang": "Kurzer, aber dringender Botendienst fuer verlaessliche Abenteurer. Ein Bauvertrag braucht heute noch sieben gueltige Unterschriften in verschiedenen Vierteln, sonst verfallen Fristen und Zahlungen.",
          "auftraggeber": "Schreiberin Mevia Toll",
          "briefing": "Ein scheinbar einfacher Auftrag vom schwarzen Brett, der gutes Zeitmanagement, etwas Ueberredung und Ortskenntnis braucht. Die Gruppe soll die Unterzeichner rechtzeitig finden und das Dokument gueltig zurueckbringen.",
          "objectives": [
            "Alle sieben Unterzeichner vor Abend erreichen.",
            "Das Dokument unbeschaedigt und gueltig zurueckbringen.",
            "Moegliche absichtliche Verzoegerungen erkennen und umgehen."
          ],
          "complications": [
            "Ein Meister will erst unterschreiben, wenn ein kleiner Gefallen erledigt wird.",
            "Ein Konkurrent versucht, das Dokument kurzfristig stehlen oder austauschen zu lassen."
          ],
          "clues": [
            "Zwei der Unterzeichner wurden bewusst an falsche Orte bestellt.",
            "Im Dokument fehlt fast unmerklich ein Anhang mit wichtiger Klausel."
          ],
          "rewards": [
            "18 GM",
            "Notarieller Kontakt",
            "Ein offiziell gesiegelter Botenausweis fuer die Stadt"
          ],
          "outcomes": {
            "success": "Das Dokument kommt rechtzeitig zurueck und verhindert einen teuren Streit.",
            "partial": "Die Frist wird knapp gehalten, aber ein Anhang bleibt fraglich.",
            "failure": "Der Vertrag verfällt und mehrere Fraktionen sind veraergert."
          }
        },
        "19": {
          "id": "AG-041",
          "titel": "Der singende Brunnen",
          "tier": "Bronze",
          "aushang": "Am alten Lindenbrunnen werden nachts Stimmen, Gesang und gefluesterte Namen gehoert. Die Nachbarschaft schlaeft nicht mehr, und niemand traut sich nach Sonnenuntergang hinaus. Wer den Spuk klaert, wird bezahlt.",
          "auftraggeber": "Nachbarschaftsrat Lindenplatz",
          "briefing": "Ein ueberschaubarer Auftrag fuers schwarze Brett: Die Gruppe soll eine Nachtwache am Brunnen halten, die Quelle des Gesangs finden und moegliche Gefahren beseitigen.",
          "objectives": [
            "Eine Nacht am Lindenbrunnen beobachten.",
            "Die Quelle von Gesang oder Stimmen aufdecken.",
            "Klaeren, ob Magie, Mechanik oder Betrug dahintersteckt."
          ],
          "complications": [
            "Mehrere Bewohner haben aus Aberglauben kleine Opfergaben eingeworfen und Spuren verwischt.",
            "Ein Gaukler nutzt den Brunnenklang als Deckung fuer heimliche Treffen."
          ],
          "clues": [
            "Unter dem Brunnenrand sind feine Resonanzrohre verborgen.",
            "Der Gesang beginnt nur bei bestimmter Windrichtung."
          ],
          "rewards": [
            "21 GM",
            "Dank und Hilfe der Nachbarschaft am Lindenplatz",
            "Ein kleiner Geheimweg durch angrenzende Hauser"
          ],
          "outcomes": {
            "success": "Der Brunnen wird entzaubert oder enttarnt und der Platz wird wieder ruhig.",
            "partial": "Der Gesang endet, aber der eigentliche Nutzer entkommt.",
            "failure": "Der Platz gilt als verflucht und die Bewohner machen die Lage schlimmer."
          }
        },
        "20": {
          "id": "AG-017",
          "titel": "Der verlorene Vertrag",
          "tier": "Bronze",
          "hook": "Ein notariell versiegelter Vertrag für ein großes Bauprojekt wurde gestohlen.",
          "briefing": "Ohne Vertrag droht ein Rechtsstreit zwischen Gilden und Adel.",
          "objectives": [
            "Diebstahlort untersuchen (wer hatte Zugang?).",
            "Den Vertrag wiederbeschaffen oder eine Kopie legal bestätigen lassen.",
            "Den Dieb identifizieren (ohne öffentliche Blamage, falls gewünscht)."
          ],
          "complications": [
            "Der Vertrag enthält eine geheime Klausel zur Thronfolgefinanzierung.",
            "Der Dieb will nicht Geld, sondern Erpressung."
          ],
          "rewards": [
            "Gold + juristische Kontakte",
            "Ein Siegel, das Türen öffnet"
          ]
        },
        "id": "zufallstabelle-bronze-auftraege-am-schwarzen-brett",
        "titel": "Zufallstabelle Bronze-Auftraege am schwarzen Brett",
        "description": "Tabelle fuer Bronze-Auftraege am schwarzen Brett der Abenteurergilde. Jede Tabellenzeile enthaelt den vollstaendigen Auftrag.",
        "dice": 20,
        "parts": false
      },
      "Silber": {
        "1": {
          "id": "AG-004",
          "titel": "Die Scheune der Schreie",
          "tier": "Silber",
          "hook": "Ein ganzer Hof ist verriegelt; aus der Scheune hört man Krachen, aber niemand traut sich hinein.",
          "briefing": "Die Tiere im Inneren sind am Durchdrehen. Der Besitzer ist verschwunden.",
          "objectives": [
            "Scheune sichern, Tiere retten, Brand vermeiden.",
            "Den verschwundenen Besitzer finden.",
            "Verbindung zu Lieferketten (Futterhändler, Stallmeister) herstellen."
          ],
          "complications": [
            "Ein alchemistisches Gerät im Heuboden stößt unregelmäßig Dampf aus.",
            "Der Besitzer war verschuldet; Unterweltinteressen mischen mit."
          ],
          "clues": [
            "Ein unscheinbarer grauer Staub in Ritzen - unter UV/Feenlicht kurz sichtbar.",
            "Ein Lieferschein mit falschem Siegel."
          ],
          "outcomes": {
            "success": "Gerät/Staub gesichert; Spur zu Futterhändler.",
            "partial": "Scheune beschädigt; Entschädigungsforderung.",
            "failure": "Brand; Stadtwache übernimmt und versiegelt alles."
          }
        },
        "2": {
          "id": "AG-005",
          "titel": "Schlachtfeld der Hufe",
          "tier": "Silber",
          "hook": "Beim Markt-Renntag drehen Pferde durch, rennen in die Menge, zertrampeln Stände.",
          "briefing": "Die Gilde muss die Menge schützen und herausfinden, warum ausgerechnet Turnierpferde betroffen sind.",
          "objectives": [
            "Pferde stoppen (Netze, Beruhigung, Barrieren).",
            "Stallungen untersuchen: Sattelzeug, Wasser, Heu, Huföl.",
            "Verdächtige in der Menge identifizieren (Saboteure, Händler, Wache)."
          ],
          "complications": [
            "Der General nutzt die Gelegenheit für mehr Wachenpräsenz und Ausgangssperren.",
            "Ein Konkurrent beschuldigt öffentlich den Handwerker-Kandidaten."
          ],
          "clues": [
            "Huföl stammt aus einer neuen Charge; Geruch neutral, aber temperaturabhängig.",
            "Ein Stallbursche wurde bestochen, 'nur ein bisschen Öl' zu verwenden."
          ],
          "outcomes": {
            "success": "Beweis für manipulierte Lieferkette.",
            "partial": "Adliger verletzt; politischer Druck steigt.",
            "failure": "Markt kollabiert; Misstrauen gegen Gilde."
          }
        },
        "3": {
          "id": "AG-006",
          "titel": "Fieber im Fischteich",
          "tier": "Silber",
          "hook": "In den Fischteichen am Stadtrand sterben Fische, und Wasservögel greifen Menschen an.",
          "briefing": "Die Wasserhüter fürchten Seuche; der Tempel ruft nach Reinigung.",
          "objectives": [
            "Wasserquelle upstream finden.",
            "Proben nehmen und an die magische Universität liefern.",
            "Wildvögel vertreiben, ohne sie zu töten."
          ],
          "complications": [
            "Ein Mühlenbesitzer blockiert Zugang (hat Angst vor Schuld).",
            "Die Substanz ist für Humanoide unsichtbar, aber verursacht Halluzinationen bei Monstern."
          ],
          "clues": [
            "An der Uferlinie klebt ein unsichtbarer Film, der auf Salz reagiert.",
            "Ein unterirdischer Abfluss führt Richtung alte Werkstattkanäle."
          ],
          "outcomes": {
            "success": "Spur in die Kanalisation/alte Werkstätten.",
            "partial": "Universität fordert Quarantäne; Handel leidet.",
            "failure": "Tempel erklärt es zum göttlichen Zorn; Unruhen."
          }
        },
        "4": {
          "id": "AG-009",
          "titel": "Prüfung der Meister",
          "tier": "Silber",
          "hook": "Die Handwerkergilde bittet die Gilde um neutrale Beobachter für die Auswahlmetriken - nach Sabotagevorfällen.",
          "briefing": "Offiziell geht es um Fairness. Inoffiziell fürchten einige Meister, dass die Streuner den Prozess kapern.",
          "objectives": [
            "Prüfstationen sichern (Material, Werkzeuge, Aufträge).",
            "Unregelmäßigkeiten dokumentieren, ohne Partei zu ergreifen.",
            "Einen Saboteur auf frischer Tat ertappen."
          ],
          "complications": [
            "Der Handwerker-Kandidat wirkt hilfsbereit und kompetent; Rivalen wirken paranoid.",
            "Der General nutzt jeden Skandal, um Stadtwache in die Gilde zu setzen."
          ],
          "clues": [
            "Sabotage-Methode passt zu den Tier-Ausfällen (gleiche Substanz in Schmieröl/Staub).",
            "Ein Prüfungsraum hat winzige Kratzspuren in Pfotenform, aber nur als Markierung für Dead Drop."
          ],
          "outcomes": {
            "success": "Beweis für Manipulation; politischer Hebel gegen Streuner.",
            "partial": "Beweise reichen nicht, aber Verdacht wächst.",
            "failure": "Gilde spaltet sich; Zeremonie wird riskanter."
          }
        },
        "5": {
          "id": "AG-013",
          "titel": "Schriftrolle aus der Universität",
          "tier": "Silber",
          "hook": "Die magische Universität braucht Eskorte für ein Artefakt-Transportkonvoi.",
          "briefing": "Ein Professor will nichts über die Ladung sagen, aber die Route ist heikel.",
          "objectives": [
            "Konvoi unauffällig begleiten.",
            "Hinterhalt verhindern oder abwehren.",
            "Herausfinden, wer die Route verraten hat."
          ],
          "complications": [
            "Ein Student ist heimlich mitgereist (und löst Probleme aus).",
            "Ein magischer Störimpuls setzt Schutzzauber zeitweise außer Kraft."
          ],
          "rewards": [
            "Zugang zu Bibliotheksressourcen",
            "Ein einmaliger magischer Dienst (Identify/Remove Curse etc.)"
          ]
        },
        "6": {
          "id": "AG-016",
          "titel": "Grenzfeuer",
          "tier": "Silber",
          "hook": "An der Nordgrenze brennen Signalfeuer falsch; ein Fort meldet Infiltration.",
          "briefing": "Der General will schnelle Aufklärung, bevor Panik entsteht.",
          "objectives": [
            "Zum Fort reisen und Lage prüfen.",
            "Saboteure finden (Spuren, Codes, Insider).",
            "Signalnetz reparieren/absichern."
          ],
          "complications": [
            "Der Kommandant vor Ort ist loyal zum General, nicht zum König.",
            "Die 'Saboteure' sind Flüchtlinge, die Schutz suchen."
          ],
          "rewards": [
            "Militärische Ausrüstung",
            "Ein Empfehlungsschreiben (oder Feindschaft) des Generals"
          ]
        },
        "7": {
          "id": "AG-018",
          "titel": "Schatten über dem Theater",
          "tier": "Silber",
          "hook": "Ein Theaterdirektor bittet: Jemand sabotiert Aufführungen mit Illusionsmagie.",
          "briefing": "Das Theater ist politisch wichtig - dort werden Meinungen gemacht.",
          "objectives": [
            "Saboteur entlarven (Backstage, Proben, Publikumsraum).",
            "Aufführung retten, ohne Panik.",
            "Motiv aufdecken: Geld, Politik, Rache."
          ],
          "complications": [
            "Der Saboteur ist ein gefeierter Künstler mit Immunität durch Patron.",
            "Eine echte, gefährliche Illusion entgleist (Panikstempel).\"],"
          ],
          "rewards": [
            "Einfluss in der Kulturszene",
            "Hinweise auf Gerüchtekampagnen (Barden-Netzwerk)"
          ]
        },
        "8": {
          "id": "AG-023",
          "titel": "Rauch ueber den Gaerten",
          "tier": "Silber",
          "aushang": "Gesucht: diskrete, faehige Abenteurer fuer den Botanischen Garten. Bienen, Pfauen und Ziertiere sind ausser Rand und Band, und aus einem Gewaechshaus steigt nachts violetter Dunst auf. Keine oeffentliche Panik, gute Bezahlung.",
          "auftraggeber": "Verwalterin des Botanischen Gartens, im Namen des Foerderkreises",
          "briefing": "Ein Silberauftrag fuer Personen mit ruhiger Hand: Besucher muessen geschuetzt, das Gewaechshaus untersucht und die Ursache des Dunsts festgestellt werden, ohne die maechtigen Spender gegen die Gilde aufzubringen.",
          "objectives": [
            "Besucher und Personal sichern oder evakuieren.",
            "Gewaechshaus, Bewaesserung und Duenger pruefen.",
            "Eine Dunstprobe fuer Untersuchung sichern."
          ],
          "complications": [
            "Die Gartenleitung verschweigt illegale Beschleunigungsversuche mit Pflanzen.",
            "Ein Bienenzuechter nutzt die Lage fuer Anschuldigungen gegen Rivalen."
          ],
          "clues": [
            "Die Reaktion verstaerkt sich bei Waerme und hoher Feuchtigkeit.",
            "Ein verborgenes Rohrsystem fuehrt zu einer alten Kraeuterkueche."
          ],
          "rewards": [
            "80 GM",
            "Seltene Kraeuter oder Saaten im Wert von 25 GM",
            "Ein Gefallen des botanischen Foerderkreises"
          ],
          "outcomes": {
            "success": "Die Kraeuterkueche wird als Verteilerstelle entlarvt.",
            "partial": "Der Garten wird geschlossen, aber die Verantwortlichen entgehen vorerst.",
            "failure": "Die Beweise werden vernichtet und der Garten wird politisch versiegelt."
          }
        },
        "9": {
          "id": "AG-024",
          "titel": "Die Glocke im Schacht",
          "tier": "Silber",
          "aushang": "Bergwerksauftrag: Fledermaeuse, Grubenponys und Lastziegen drehen beim Schlagen der Alarmglocke durch. Gesucht werden belastbare Leute zur Sicherung der Foerderstollen und Aufklaerung im Schacht. Gefahrenzulage inklusive.",
          "auftraggeber": "Steinbruch- und Erzgemeinschaft am Nordgrat",
          "briefing": "Die Auftraggeber wollen den Betrieb nicht stilllegen, bevor Klarheit herrscht. Abenteurer sollen Tiere und Arbeiter schuetzen, Klangquellen pruefen und moegliche Sabotage dokumentieren.",
          "objectives": [
            "Stallungen und Foerderwege sichern.",
            "Glocke, Seilzuege und Erzstaubablagerungen untersuchen.",
            "Tiere beruhigen oder aus dem kritischen Stollenabschnitt bringen."
          ],
          "complications": [
            "Ein Vorarbeiter faelscht Sicherheitsberichte.",
            "Ein Nebenschacht ist teilweise eingestuerzt."
          ],
          "clues": [
            "Auf dem Glockenjoch sitzt ein reaktiver Rueckstand.",
            "Die heftigsten Reaktionen treten nur in einem bestimmten Seitenstollen auf."
          ],
          "rewards": [
            "90 GM",
            "Bergwerkszulage in Erz oder Rohmetall im Wert von 20 GM",
            "Vorzugsrecht auf Transport oder Unterkunft am Nordgrat"
          ],
          "outcomes": {
            "success": "Die Resonanzquelle wird entdeckt und eine tiefere Sabotagespur gesichert.",
            "partial": "Der Betrieb laeuft weiter, doch das Problem ist nur eingedaemmt.",
            "failure": "Ein neuer Einsturz zerstoert Spuren und kostet Vertrauen."
          }
        },
        "10": {
          "id": "AG-025",
          "titel": "Das Wehr am schwarzen Bach",
          "tier": "Silber",
          "aushang": "Soforthilfe am Stadtwehr gesucht. Aale, Otter und Wasservoegel verhalten sich aggressiv, die Schleusen klemmen, und Ueberschwemmung droht. Wer Ursache und Mechanik sichert, erhaelt guten Lohn.",
          "auftraggeber": "Wasserhueter des Westwehrs",
          "briefing": "Dies ist ein Auftrag fuer das Brett, weil Schnelligkeit zaehlt: Das Wehr muss gesichert werden, aber zugleich sollen Wasserproben und moegliche Zuleitungen dokumentiert werden.",
          "objectives": [
            "Schleusen bedienen oder notduerftig stabilisieren.",
            "Wasserlaeufe ober- und unterhalb des Wehrs pruefen.",
            "Werkkanaele und Metallkontakte vergleichen."
          ],
          "complications": [
            "Mueller und Faerber blockieren einander die Zugaenge.",
            "Ein Stadtrat fordert vorschnell das Oeffnen aller Schleusen."
          ],
          "clues": [
            "Der violette Film sitzt besonders dort, wo stilles Wasser Metall beruehrt.",
            "Ein Seitenkanal fuehrt in alte Werkstattgewoelbe."
          ],
          "rewards": [
            "85 GM",
            "Freie Faehr- und Wehrpassage fuer spaetere Reisen",
            "Dankesschreiben der Wasserhueter"
          ],
          "outcomes": {
            "success": "Die Werkstattgewoelbe werden als wichtige Spur entdeckt.",
            "partial": "Das Wehr haelt, doch Muehlen und Handel leiden.",
            "failure": "Ein Viertel wird ueberschwemmt und die Beweislage versinkt im Chaos."
          }
        },
        "11": {
          "id": "AG-026",
          "titel": "Falsches Futter, falscher Eid",
          "tier": "Silber",
          "aushang": "Diskrete Hilfe im Militaerdepot gesucht. Meldehunde, Stallfalken und Botentauben verhalten sich unzuverlaessig. Gesucht werden neutrale Abenteurer, die Beschaffung und Futterpruefung uebernehmen. Schweigepflicht erwartet.",
          "auftraggeber": "Quartiermeisteramt, inoffiziell ueber einen Lagerverwalter",
          "briefing": "Ein klassischer Silberauftrag fuers schwarze Brett mit politischer Note: Das Depot soll funktionstuechtig bleiben, aber jemand muss die Lieferungen pruefen und moegliche Bestechung nachweisen.",
          "objectives": [
            "Futterlager, Wasser und Pflegeoele pruefen.",
            "Mindestens eine betroffene Charge sichern.",
            "Lieferweg und Beschaffungskette nachverfolgen."
          ],
          "complications": [
            "Ein Offizier versucht belastende Beweise verschwinden zu lassen.",
            "Jede Verzoegerung wird als Angriff auf die Einsatzbereitschaft gewertet."
          ],
          "clues": [
            "Nur eine neue Notfallcharge ist betroffen.",
            "Mehrere Formulare tragen dieselbe Faelscherhand."
          ],
          "rewards": [
            "95 GM",
            "Militaerrationen und Pfeile oder Bolzen fuer eine Gruppe",
            "Ein militaerischer Passierschein fuer eingeschraenkte Zonen"
          ],
          "outcomes": {
            "success": "Korruption in der Beschaffung wird belegbar.",
            "partial": "Die Tiere werden gerettet, doch das Amt schiebt Schuld ab.",
            "failure": "Botenrouten brechen zusammen und das Depot schottet sich ab."
          }
        },
        "12": {
          "id": "AG-027",
          "titel": "Die Menagerie des Sammlers",
          "tier": "Silber",
          "aushang": "Diskreter Einsatz im Anwesen eines Sammlers gesucht. Exotische Tiere wurden waehrend einer Vorfuehrung aggressiv. Gesucht werden besonnene Leute mit Erfahrung im Umgang mit Bestien. Schweigen wird zusaetzlich belohnt.",
          "auftraggeber": "Verwalter des Hauses Veler, im Namen des Sammlers",
          "briefing": "Der Auftrag ist fuer ein schwarzes Brett ungewoehnlich fein, aber eindeutig: Das Anwesen sichern, Tiere einhegen und herausfinden, ob Kaefigpflege, Futter oder ein Gast verantwortlich ist.",
          "objectives": [
            "Ausgebrochene Tiere eindämmen oder umlenken.",
            "Futterkammer, Kaefigschloesser und Pflegesalben untersuchen.",
            "Personal und Gaeste unauffaellig befragen."
          ],
          "complications": [
            "Der Sammler will jeden Skandal vertuschen.",
            "Ein Gast moechte im Chaos ein seltenes Tier stehlen."
          ],
          "clues": [
            "Mehrere Kaefigschloesser tragen reaktives Oel.",
            "Ein neues Parfum scheint die Tiere zusaetzlich zu reizen."
          ],
          "rewards": [
            "100 GM",
            "Eine wertvolle, aber unkritische Kuriositaet aus der Sammlung",
            "Einladung oder Nameingang in besseren Kreisen"
          ],
          "outcomes": {
            "success": "Pflegeoel und Parfum liefern eine belastbare Verbindungsroute.",
            "partial": "Das Anwesen bleibt ruhig, doch der Auftraggeber drueckt auf Schweigen.",
            "failure": "Ein Tier entkommt in die Stadt und verschiebt alle Aufmerksamkeit."
          }
        },
        "13": {
          "id": "AG-042",
          "titel": "Das kalte Archiv",
          "tier": "Silber",
          "aushang": "Gesucht: verlaessliche Abenteurer fuer das Stadtarchiv. Mehrere wichtige Akten sind ueber Nacht vereist, umsortiert oder verschwunden. Das Archiv braucht diskrete Hilfe, bevor Rat und Gilden davon erfahren.",
          "auftraggeber": "Archivarin Tessa Mare",
          "briefing": "Ein Silberauftrag mit Ermittlungscharakter. Die Gruppe soll das Archiv sichern, fehlende Akten finden und pruefen, ob es sich um Magie, Diebstahl oder Sabotage durch einen Insider handelt.",
          "objectives": [
            "Die betroffenen Archivraeume sichern.",
            "Fehlende oder manipulierte Akten identifizieren.",
            "Den Einbruchs- oder Magiepfad finden."
          ],
          "complications": [
            "Ein Archivar hat selbst Fehler vertuscht und liefert falsche Angaben.",
            "Ein Frostzauber hat Schutzsiegel teilweise unlesbar gemacht."
          ],
          "clues": [
            "Nur bestimmte Schrankreihen sind betroffen, und alle enthalten Bau- oder Liefervertraege.",
            "An einem Kellerfenster kleben Reste alchemischen Reifs."
          ],
          "rewards": [
            "82 GM",
            "Archivzugang fuer spaetere Recherchen",
            "Eine beglaubigte Kopie eines seltenen Plans oder Registers"
          ],
          "outcomes": {
            "success": "Die Akten werden gesichert und ein Diebstahlmuster wird sichtbar.",
            "partial": "Der Schaden wird begrenzt, aber eine wichtige Akte bleibt weg.",
            "failure": "Das Archiv wird versiegelt und die politische Lage verhaertet sich."
          }
        },
        "14": {
          "id": "AG-043",
          "titel": "Die Karawane der stillen Hufe",
          "tier": "Silber",
          "aushang": "Gesucht: erfahrene Begleitung fuer eine Karawane, deren Zugtiere seit zwei Naechten kaum noch Laute von sich geben, dann aber ploetzlich panisch ausschlagen. Ware und Tiere sind wertvoll; diskrete Untersuchung erwuenscht.",
          "auftraggeber": "Karawanenmeisterin Jara Venn",
          "briefing": "Ein Silberauftrag zwischen Eskorte und Ermittlung. Die Gruppe soll die Karawane sicher bis zum naechsten Umschlagplatz bringen, die Ursache des merkwuerdigen Tierverhaltens finden und klaeren, ob ein Konkurrent oder eine Liefercharge dahintersteckt.",
          "objectives": [
            "Karawane, Treiber und Zugtiere auf der gefaehrdeten Strecke sichern.",
            "Futter, Hufpflege, Geschirr und Wasserfaesser untersuchen.",
            "Den letzten Umschlagplatz oder einen Saboteur identifizieren."
          ],
          "complications": [
            "Ein Teil der Karawanenwache arbeitet heimlich fuer einen rivalisierenden Haendler.",
            "Die Tiere reagieren auf bestimmte Pfeifsignale und Metallklirren mit verzogerter Panik."
          ],
          "clues": [
            "An mehreren Hufriemen sitzt ein geruchloses, reaktives Oel.",
            "Die stillsten Tiere wurden alle am selben Brunnen getraenkt."
          ],
          "rewards": [
            "98 GM",
            "Transportplatz fuer eine spaetere Reise",
            "Handelskontakt zu Karawanen und Umschlagplaetzen"
          ],
          "outcomes": {
            "success": "Die Karawane erreicht ihr Ziel und ein Umschlagplatz wird als Verteilerpunkt belastbar verdaechtig.",
            "partial": "Die Ware kommt an, aber ein Tier geht verloren und der Saboteur entkommt.",
            "failure": "Die Karawane zerstreut sich auf der Strasse, und mehrere Spuren verschwinden mit der Ladung."
          }
        },
        "15": {
          "id": "AG-044",
          "titel": "Die roten Ziegel",
          "tier": "Silber",
          "aushang": "Sonderauftrag fuer die Bauhuette: Eine neue Lieferung roter Ziegel zerplatzt bei Hitze, verraeuchert Lagerhaeuser und macht Arbeiter krank. Ursache unbekannt. Gesucht werden belastbare Leute zur Untersuchung.",
          "auftraggeber": "Bauhuette der Stadt",
          "briefing": "Ein Silberauftrag mit Material- und Sabotagefokus. Die Gruppe soll Lager, Brennofen und Lieferwege untersuchen, weitere Schaeden verhindern und feststellen, ob die Ziegel absichtlich manipuliert wurden.",
          "objectives": [
            "Lager und Ofenbereich absichern.",
            "Gelieferte Ziegel mit alten Chargen vergleichen.",
            "Lieferweg, Brandzeichen und Brennprotokolle pruefen."
          ],
          "complications": [
            "Ein Bauprojekt fuer einen einflussreichen Auftraggeber wartet auf genau diese Steine.",
            "Der Ofenmeister versucht, eigene Nachlaessigkeit als Sabotage zu tarnen."
          ],
          "clues": [
            "Nur die juengsten Chargen zeigen einen violett dunklen Kern.",
            "Mehrere Karren wurden an derselben Zwischenstation umgeladen."
          ],
          "rewards": [
            "86 GM",
            "Baukontakte und Lagerraumhilfe",
            "Baumaterial oder Handwerkerunterstuetzung im Wert von 20 GM"
          ],
          "outcomes": {
            "success": "Die faulen Chargen werden erkannt und die Zwischenstation wird verdaechtig.",
            "partial": "Weitere Schaeden werden verhindert, aber die Lieferkette bleibt lueckenhaft.",
            "failure": "Ein Lagerhausbrand oder Einsturz verschlimmert die Lage."
          }
        },
        "16": {
          "id": "AG-045",
          "titel": "Im Schatten der Arena",
          "tier": "Silber",
          "aushang": "Vor den naechsten Arenaspielen verschwinden Ausruestung, Siegespreise und Startlisten. Gesucht wird eine neutrale Gruppe zur Sicherung der Vorbereitung und Untersuchung moeglicher Sabotage vor Spielbeginn.",
          "auftraggeber": "Arena-Verwalterin Selka Dorn",
          "briefing": "Ein Silberauftrag mit oeffentlichem Risiko: Die Arena darf nicht im Chaos versinken. Die Auftragnehmer sollen Hinterraeume sichern, Saboteure finden und die Spiele retten oder gezielt absagen.",
          "objectives": [
            "Hinterraeume, Ruestkammern und Preislager absichern.",
            "Fehlende Gegenstaende und manipulierte Listen aufspueren.",
            "Moegliche Saboteure unter Personal, Wettmachern oder Kaempfern identifizieren."
          ],
          "complications": [
            "Wettmacher setzen auf einen Skandal und stoeren die Ermittlungen.",
            "Ein beruehmter Gladiator schuetzt einen verdaechtigen Waffenmeister."
          ],
          "clues": [
            "Mehrere Startlisten wurden mit fast identischer Handschrift geaendert.",
            "Eine Siegerklinge taucht im Pfandregister eines nahegelegenen Hauses auf."
          ],
          "rewards": [
            "92 GM",
            "Freier Eintritt und Kontakte in die Arena",
            "Wettgutscheine oder Stadionmarken im Wert von 15 GM"
          ],
          "outcomes": {
            "success": "Die Spiele bleiben kontrollierbar und ein Sabotagepfad wird offengelegt.",
            "partial": "Die Arena bleibt offen, aber ein oeffentlicher Zwischenfall beschaedigt den Ruf der Gilde.",
            "failure": "Die Spiele enden im Skandal und die Spur wird von Wettmachern aufgekauft."
          }
        },
        "id": "zufallstabelle-silber-auftraege-am-schwarzen-brett",
        "titel": "Zufallstabelle Silber-Auftraege am schwarzen Brett",
        "description": "Tabelle fuer Silber-Auftraege am schwarzen Brett der Abenteurergilde. Jede Tabellenzeile enthaelt den vollstaendigen Auftrag.",
        "dice": 16,
        "parts": false
      },
      "Gold": {
        "1": {
          "id": "AG-007",
          "titel": "Der Duft, den keiner riecht",
          "tier": "Gold",
          "hook": "Mehrere Viertel melden aggressive Tiere gleichzeitig, als ob eine Welle durch die Stadt zieht.",
          "briefing": "Die Gilde erhält Sondervollmacht, die Ursache schnell zu finden, bevor der General die Stadt abriegeln lässt.",
          "objectives": [
            "Hotspots triangulieren (Zeitpunkte, Wind, Geräusche, Wasserleitungen).",
            "Einen 'Trigger' identifizieren, der die Substanz aktiviert (Glocken, Schmiedehämmer, Feuerwerk).",
            "Quelle lokalisieren und stoppen, ohne Massenpanik."
          ],
          "complications": [
            "Streuner verbreiten gezielt falsche Hotspots, um SC zu binden.",
            "Der Puppenspieler bietet 'Hilfe' an - gegen Gefallen."
          ],
          "clues": [
            "Die Wellen korrelieren mit einem Lieferwagen, der morgens Routen fährt.",
            "Ein unscheinbares Pulver wird beim Pflastern der Straßen verteilt."
          ],
          "outcomes": {
            "success": "Quelle/Verteiler identifiziert; Zugriff auf Hauptplot möglich.",
            "partial": "Quelle bekannt, aber Täter entkommt.",
            "failure": "Ausgangssperre; Gilde unter Verdacht."
          }
        },
        "2": {
          "id": "AG-008",
          "titel": "Die unsichtbare Pranke",
          "tier": "Gold",
          "hook": "Ein Monster (z.B. Manticore, Basilisk, Owlbear) wird in der Nähe der Stadt ungewöhnlich aggressiv und zieht andere Tiere mit.",
          "briefing": "Die Wache will es jagen. Die Gilde soll herausfinden, ob es 'gejagt' wird oder etwas es treibt.",
          "objectives": [
            "Monster nicht töten, sondern vertreiben/fangen, um Ursache zu untersuchen.",
            "Spuren von Substanz an Krallen/Fell sammeln.",
            "Verbindung zwischen Monsterroute und Stadt-Hotspots finden."
          ],
          "complications": [
            "Monster reagiert auf Magie besonders stark; Zauber können es eskalieren.",
            "Leibgardist des Königs drängt auf schnelle Exekution."
          ],
          "clues": [
            "Am Fell klebt derselbe unsichtbare Film wie an den Teichen.",
            "Das Monster meidet bestimmte Steine/Metalle (Hinweis auf Gegenmittel)."
          ],
          "outcomes": {
            "success": "Antidot-/Abschirmmaterial entdeckt.",
            "partial": "Monster entkommt verletzt; wird noch gefährlicher.",
            "failure": "Monster getötet; wichtigste Probe verloren."
          }
        },
        "3": {
          "id": "AG-028",
          "titel": "Das Lied der stillen Stadt",
          "tier": "Gold",
          "aushang": "Sonderauftrag. Mehrere Viertel melden in derselben Nacht aggressive Tiere im Takt bestimmter Glocken und Spieluhren. Die Gilde sucht erfahrene Teams zur stillen Aufklaerung eines moeglichen stadtweiten Ausloesersystems. Hohe Bezahlung.",
          "auftraggeber": "Die Abenteurergilde selbst, mit Sondervollmacht",
          "briefing": "Dies ist ein echter Schwarzes-Brett-Goldauftrag: Mehrere Hinweise muessen parallel geprueft, Klangquellen verglichen und ein moegliches Ausloesesystem lokalisiert werden, bevor die Stadt in den Ausnahmezustand kippt.",
          "objectives": [
            "Zeitpunkte, Klangquellen und Hotspots abgleichen.",
            "Die ausloesende Melodie oder Frequenz identifizieren.",
            "Das Sendesystem stilllegen, ohne Massenpanik zu erzeugen."
          ],
          "complications": [
            "Falsche Melodien werden absichtlich in Umlauf gebracht.",
            "Einflussreiche Buerger verweigern Zugang zu ihren Tuermen oder Hallen."
          ],
          "clues": [
            "Dieselbe Vier-Noten-Folge taucht in mehreren Vierteln auf.",
            "Mehrere Klangkoerper stammen aus derselben Giesserei."
          ],
          "rewards": [
            "220 GM",
            "Sondervorrang bei kuenftigen Gildenauftraegen",
            "Ein Gefallen des Quartiermeisters der Gilde"
          ],
          "outcomes": {
            "success": "Das akustische Ausloesersystem wird lokalisiert und stillgelegt.",
            "partial": "Die Melodie ist bekannt, aber der mobile Sender entkommt.",
            "failure": "Eine Ausgangssperre tritt in Kraft und andere ziehen Nutzen daraus."
          }
        },
        "4": {
          "id": "AG-029",
          "titel": "Jagd auf den Verteiler",
          "tier": "Gold",
          "aushang": "Sonderfahndung. Gesucht wird ein Kurier mit Lieferlisten zu Oelen, Staub, Futterchargen und Strassenmaterial. Zielperson lebend gefangen bevorzugt. Hohe Belohnung und Verschwiegenheit garantiert.",
          "auftraggeber": "Abenteurergilde im Einvernehmen mit vertraulichen Stellen",
          "briefing": "Ein Goldauftrag fuers Brett: Der Kurier muss identifiziert, verfolgt und moeglichst lebend gefasst werden, bevor andere Fraktionen ihn zum Schweigen bringen.",
          "objectives": [
            "Den Kurier identifizieren und verfolgen.",
            "Unterlagen, Decknamen und Geldfluesse sichern.",
            "Naechste Kontaktstelle oder Auftraggeber bestimmen."
          ],
          "complications": [
            "Mehrere Gruppen wollen den Kurier toeten statt befragen.",
            "Es gibt Locktaschen und absichtlich falsche Listen."
          ],
          "clues": [
            "Ein wasserfestes Notizbuch arbeitet mit Farbcodes statt Namen.",
            "Mehrere harmlose Stadtdienste tauchen auf denselben Listen auf."
          ],
          "rewards": [
            "240 GM",
            "Zugriff auf beschlagnahmte Ausruestung im kleinen Umfang",
            "Vorrangige Behandlung durch die Gildenleitung bei politischen Fragen"
          ],
          "outcomes": {
            "success": "Ein belastbares Verteilernetz wird aufgedeckt.",
            "partial": "Der Kurier stirbt, aber seine Unterlagen bleiben erhalten.",
            "failure": "Der Kurier verschwindet, und alle Hotspots wechseln schlagartig."
          }
        },
        "5": {
          "id": "AG-030",
          "titel": "Der falsche Erlass",
          "tier": "Gold",
          "aushang": "Dringende Pruefung eines angeblich koeniglichen Erlasses: Tierkeulungen, Quarantaene und Sondergewalt der Wache wurden angeordnet. Gesucht werden verlaessliche Ermittler zur Echtheitspruefung und Unterbindung unrechtmaessiger Vollstreckung.",
          "auftraggeber": "Abenteurergilde, vermerkt durch das Siegel des Hauptschreibers",
          "briefing": "Das ist ein Brettauftrag mit politischer Sprengkraft. Papier, Siegel und Botenkette muessen geprueft, die Vollstreckung notfalls verzoegert und der Faelscher oder Nutzniesser gefunden werden.",
          "objectives": [
            "Siegel, Wachs, Papier und Botenkette pruefen.",
            "Die Vollstreckung stoppen oder verzoegern.",
            "Faelscher oder politischen Nutzniesser identifizieren."
          ],
          "complications": [
            "Einige Funktionstraeger wollen den Erlass ungeprueft nutzen.",
            "Zu offenes Vorgehen laesst die Gilde als Staatsfeind erscheinen."
          ],
          "clues": [
            "Das Wachs stimmt nicht mit Archivstuecken ueberein.",
            "Die Botenroute fuehrt ueber eine verlassene Kanzlei."
          ],
          "rewards": [
            "230 GM",
            "Archivzugang oder notarielle Hilfe durch koenigliche Kanzleikontakte",
            "Ein offizielles Entlastungsschreiben fuer spaetere Konfliktlagen"
          ],
          "outcomes": {
            "success": "Die Faelschung wird bewiesen und eine Saeuberungsaktion verhindert.",
            "partial": "Die Vollstreckung stoppt, aber die Hintermaenner entziehen sich.",
            "failure": "Die falsche Verfuegung tritt in Kraft und schafft vollendete Tatsachen."
          }
        },
        "6": {
          "id": "AG-031",
          "titel": "Unter dem Pflaster",
          "tier": "Gold",
          "aushang": "Sonderkommando fuer unterirdische Mischkammer gesucht. Hinweise deuten auf geheime Leitungen unter den Strassen hin, die Rueckstaende in Brunnen, Kanaele und Lagerkeller tragen. Nur erfahrene Teams melden sich.",
          "auftraggeber": "Abenteurergilde mit Sonderrecht zum Zugriff",
          "briefing": "Ein schwarzes Brett fuer grosse Auftraege: Zugang finden, Anlage sichern, Geraete und Faesser pruefen und moeglichst belastbare Beweise auf Auftraggeber und Verteilwege bergen.",
          "objectives": [
            "Zugang zur Hauptkammer finden.",
            "Faesser, Leitungen und Mischgeraete sichern.",
            "Beweise auf Auftraggeber, Logistik und Trigger sammeln."
          ],
          "complications": [
            "Die Anlage kann sich selbst fluten oder verraeuchern.",
            "Einige Arbeiter handeln unter Zwang und sollten moeglichst lebend gesichert werden."
          ],
          "clues": [
            "Bronzerohre verbinden bekannte Hotspots.",
            "Faesser sind nach Tierart und Ausloeser gruppiert."
          ],
          "rewards": [
            "260 GM",
            "Anteil an beschlagnahmter Ware oder Material im Wert von 40 GM",
            "Groesseres Ansehen innerhalb der Gilde"
          ],
          "outcomes": {
            "success": "Die Hauptquelle wird abgeschaltet und das Netz offengelegt.",
            "partial": "Die Quelle ist vernichtet, aber die Koepfe dahinter bleiben im Dunkeln.",
            "failure": "Die Kammer wird geflutet und fast alle Beweise gehen verloren."
          }
        },
        "7": {
          "id": "AG-032",
          "titel": "Die schwarze Audienz",
          "tier": "Gold",
          "aushang": "Verdeckter Einsatz. Es gibt Hinweise auf ein geheimes Treffen, bei dem Vertreter aus Gilden, Tempeln, Wache und Unterwelt zugleich manipuliert werden. Gesucht werden diskrete, belastbare Teams fuer Infiltration und Beweissicherung.",
          "auftraggeber": "Verdeckter Ausschuss der Abenteurergilde",
          "briefing": "Ein Goldauftrag fuer das schwarze Brett, aber nur fuer bewaehrte Leute: Eindringen, Namen sichern und unterscheiden, wer Taeter und wer nur erpresst ist.",
          "objectives": [
            "Das Treffen infiltrieren oder belauschen.",
            "Schuldige von bloß Erpressten unterscheiden.",
            "Mit Namen, Dokumenten oder Beweisen entkommen."
          ],
          "complications": [
            "Nicht alle Teilnehmer sind freiwillig dort.",
            "Ein Broker im Hintergrund arbeitet mit wohltätigen Fronten."
          ],
          "clues": [
            "Jede Fraktion erhielt eine andere Katastrophengeschichte als Einladung.",
            "Mehrere Liefer- und Spendenwege laufen auf dieselben Strohmaenner hinaus."
          ],
          "rewards": [
            "250 GM",
            "Politische Schutzdeckung durch die Gilde",
            "Einmaliger Zugriff auf ein geheimes Informantennetz"
          ],
          "outcomes": {
            "success": "Die politische Struktur hinter dem Komplott wird sichtbar.",
            "partial": "Einige Namen werden gesichert, die Schluesselfigur bleibt aber verdeckt.",
            "failure": "Die Gilde wird selbst kompromittiert."
          }
        },
        "8": {
          "id": "AG-033",
          "titel": "Der Kaefig des Koenigs",
          "tier": "Gold",
          "aushang": "Sonderauftrag. Ein koenigliches Schaustueck mit seltenen Bestien soll heimlich in eine sichere Anlage verlegt werden, nachdem ein Tierpfleger verschwand und mehrere Kaefige manipuliert wurden. Nur erfahrene Teams melden sich.",
          "auftraggeber": "Abenteurergilde im Auftrag eines koeniglichen Stallmeisters",
          "briefing": "Ein Goldauftrag mit politischem Gewicht: Die Gruppe soll die Bestienanlage sichern, den verschwundenen Pfleger finden, die Kaefigmechanik untersuchen und klaeren, ob jemand die Tiere als Ausloeser fuer einen Hofskandal missbrauchen will.",
          "objectives": [
            "Kaefige, Schleusen und Beruhigungsprotokolle sichern.",
            "Den verschwundenen Pfleger oder seine Aufzeichnungen finden.",
            "Manipulierte Pflegeoele, Futter oder Klangzeichen identifizieren.",
            "Eine Eskalation am Hof oder eine oeffentliche Tierjagd verhindern."
          ],
          "complications": [
            "Ein koeniglicher Leibgardist will die gefaehrlichsten Tiere sofort toeten lassen.",
            "Ein Hofbeamter versucht, die Anlage vor der Gilde zu versiegeln.",
            "Mindestens ein Tier ist nicht boese, sondern gezielt auf bestimmte Signale konditioniert worden."
          ],
          "clues": [
            "Mehrere Kaefigriegel tragen dasselbe reaktive Oel wie fruehere Hotspots.",
            "Im Notizbuch des Pflegers stehen Lieferzeichen, die auch in Futter- und Strassenmateriallisten auftauchen.",
            "Eine Glockenfolge aus dem Hofgarten loest Unruhe aus, obwohl sie offiziell nur Zeremonien dient."
          ],
          "rewards": [
            "270 GM",
            "Koeniglicher Stall- oder Hofzugang fuer spaetere Ermittlungen",
            "Ein diskreter Gefallen eines einflussreichen Hofkontakts"
          ],
          "outcomes": {
            "success": "Die Anlage bleibt unter Kontrolle, der Pfleger oder seine Beweise werden gesichert und eine Hofspur fuehrt tiefer ins Komplott.",
            "partial": "Die Tiere werden gerettet, aber ein Verantwortlicher entkommt mit wichtigen Unterlagen.",
            "failure": "Ein Ausbruch erzwingt eine oeffentliche Jagd und der Hof nutzt die Katastrophe gegen die Gilde."
          }
        },
        "9": {
          "id": "AG-046",
          "titel": "Das rote Register",
          "tier": "Gold",
          "aushang": "Sonderauftrag nur fuer erfahrene Teams: Eine versteckte Buchfuehrung zu Futter, Oelen und Schutzgeldern soll in einem gesicherten Lagerhaus geborgen werden. Diskretion, Geschwindigkeit und belastbare Beweise sind zwingend.",
          "auftraggeber": "Abenteurergilde, auf Anweisung der Leitung",
          "briefing": "Ein Schwarzes-Brett-Goldauftrag mit klarer Zielsetzung: Eindringen, Register sichern, lebende Zeugen wenn moeglich festsetzen und den Inhalt schuetzen, bevor Unterwelt oder Wache die Sache bereinigen.",
          "objectives": [
            "In das Lagerhaus eindringen.",
            "Register, Zahlungslisten und Proben sichern.",
            "Mindestens einen Verantwortlichen identifizieren oder festsetzen."
          ],
          "complications": [
            "Das Lagerhaus ist doppelt abgesichert: gegen Diebe und gegen Verrat von innen.",
            "Ein Feuerplan soll Beweise bei Gefahr vernichten."
          ],
          "clues": [
            "Mehrere Listen verknuepfen scheinbar harmlose Haendler zu einem Ring.",
            "Eine rot markierte Spalte verweist auf besondere Ausloeser und Zieltiere."
          ],
          "rewards": [
            "245 GM",
            "Beschlagnahmte Ware im Wert von 30 GM",
            "Ein direkter Gefallen der Gildenleitung"
          ],
          "outcomes": {
            "success": "Das Register liefert harte Beweise und Namen.",
            "partial": "Die Listen werden gesichert, aber die Verantwortlichen entkommen.",
            "failure": "Das Lagerhaus brennt aus und die Beweise sind fast voellig verloren."
          }
        },
        "10": {
          "id": "AG-047",
          "titel": "Die Maske des Kaemmerers",
          "tier": "Gold",
          "aushang": "Grosser Sonderauftrag: Bei einem Hofmaskenfest sollen Abrechnungen, Siegel und Erpressungsmaterial den Besitzer wechseln. Gesucht wird eine erfahrene Gruppe zur stillen Beobachtung, Sicherung und Aufdeckung des Drahtziehers.",
          "auftraggeber": "Abenteurergilde ueber einen verdeckten Hofkontakt",
          "briefing": "Ein Goldauftrag fuer diskrete Spezialisten. Die Gruppe soll ein Maskenfest infiltrieren, die Uebergabe verhindern oder kontrollieren und moeglichst belastbare Hinweise auf Auftraggeber und Empfaenger gewinnen.",
          "objectives": [
            "Zugang zum Fest oder zu seinen Dienerwegen erhalten.",
            "Die zu uebergebenden Unterlagen, Siegel oder Listen identifizieren.",
            "Den Drahtzieher oder den Empfaenger entlarven und Beweise sichern."
          ],
          "complications": [
            "Mehrere Gaeste tragen identische Masken und Doppelrollen.",
            "Ein harmloser Skandal kann das eigentliche Geschaeft ueberdecken.",
            "Zu fruehes Eingreifen laesst die entscheidende Verbindung verschwinden."
          ],
          "clues": [
            "Der Kaemmerer nutzt einen zweiten, inoffiziellen Siegelring fuer geheime Abrechnungen.",
            "Eine Servierroute durch den Wintergarten wird nur fuer ganz bestimmte Gaeste geoeffnet."
          ],
          "rewards": [
            "255 GM",
            "Ein Hofpass fuer spaetere Ermittlungen",
            "Wohlwollen oder Schuldbrief eines wichtigen Hofkontakts"
          ],
          "outcomes": {
            "success": "Die Uebergabe wird kontrolliert oder verhindert, und eine wichtige Hofspur wird gesichert.",
            "partial": "Beweise werden geborgen, aber der Hauptdrahtzieher entkommt.",
            "failure": "Das Fest endet im politischen Skandal und die Gruppe geraet unter Verdacht."
          }
        },
        "id": "zufallstabelle-gold-auftraege-am-schwarzen-brett",
        "titel": "Zufallstabelle Gold-Auftraege am schwarzen Brett",
        "description": "Tabelle fuer Gold-Auftraege am schwarzen Brett der Abenteurergilde. Jede Tabellenzeile enthaelt den vollstaendigen Auftrag.",
        "dice": 10,
        "parts": false
      },
      "Platin": {
        "1": {
          "id": "AG-048",
          "titel": "Die violette Flut",
          "tier": "Platin",
          "aushang": "Platinauftrag. Mehrere Stadtviertel, Teiche und Stallungen zeigen gleichzeitig Ausbrueche aggressiven Tierverhaltens. Hinweise deuten auf eine koordinierte Freisetzung ueber Wasser, Oel und Staub hin. Nur erfahrenste Teams melden sich.",
          "auftraggeber": "Abenteurergilde mit Sondervollmacht des Kronrates",
          "briefing": "Dies ist ein langer und gefaehrlicher Auftrag vom Schwarzen Brett, der mehrere Einsaetze umfasst: Versorgungspunkte sichern, eine Freisetzungsroute rekonstruieren, Schluesseldepots stilllegen und die stadtweite Welle brechen, bevor die Ordnung kollabiert.",
          "objectives": [
            "Mindestens drei Hotspots innerhalb kurzer Zeit absichern.",
            "Wasser-, Oel- und Staubquellen kartieren und vergleichen.",
            "Ein Hauptdepot oder eine Mischkammer lokalisieren und abschalten.",
            "Die Stadt vor Ausgangssperre oder Massenkeulung bewahren."
          ],
          "complications": [
            "Wache, Tempel und Unterwelt verfolgen teils gegensaetzliche Ziele.",
            "Mehrere Scheindepots und falsche Hotspots werden absichtlich gestreut.",
            "Oeffentliche Panik droht jede Ermittlung zu ersticken."
          ],
          "clues": [
            "Bronzerohre und Lieferkarren verbinden Viertel, die oberflaechlich nichts gemeinsam haben.",
            "Bestimmte Trigger wie Glocken, Schmiedehaemmer oder Trompetensignale verstaerken die Ausbrueche."
          ],
          "rewards": [
            "420 GM",
            "Grosses Ansehen innerhalb der Gilde",
            "Sonderzugriff auf Gildenressourcen, Heilung und Informanten",
            "Ein politischer Gefallen mittlerer Tragweite"
          ],
          "outcomes": {
            "success": "Die Welle wird gebrochen und das Netzwerk hinter der Freisetzung wird sichtbar.",
            "partial": "Die Stadt bleibt stabil, aber die Drahtzieher entkommen in eine zweite Phase.",
            "failure": "Ein Notstand wird ausgerufen und die Gilde geraet selbst unter Verdacht."
          }
        },
        "2": {
          "id": "AG-049",
          "titel": "Die Faelschung des Schweigethrons",
          "tier": "Platin",
          "aushang": "Platinauftrag. Belastbare Hinweise deuten darauf hin, dass mehrere gefaelschte koenigliche Erlasse, Transportrechte und Quarantaenebefehle gleichzeitig im Umlauf sind. Erfahrene Ermittler gesucht, die Archiv, Kanzlei und Botennetz pruefen koennen.",
          "auftraggeber": "Abenteurergilde und verdeckte Kontakte aus der Kanzlei",
          "briefing": "Ein lang angelegter Auftrag: Die Gruppe muss Faelschungen identifizieren, den Botenapparat infiltrieren, echte Dokumente schuetzen und den politischen Nutzniesser entlarven, bevor die Stadt nach falschen Befehlen handelt.",
          "objectives": [
            "Mindestens zwei gefaelschte Erlasswege rekonstruieren.",
            "Das Faelscheratelier oder die Ausgabestelle finden.",
            "Belastbare Beweise sichern, die vor Rat oder Krone standhalten.",
            "Die Vollstreckung der gefaehrlichsten Faelschungen verhindern."
          ],
          "complications": [
            "Hochgestellte Namen tauchen in der Kette auf.",
            "Ein Teil der Wache vollstreckt Befehle bereits guten Glaubens.",
            "Die Faelscher nutzen echte Archiveintraege als Tarnung."
          ],
          "clues": [
            "Wachs, Papier und Randmarkierungen unterscheiden sich minimal von echten Stuecken.",
            "Mehrere Botenrouten ueberschneiden sich an einer verlassenen Kanzlei mit verdecktem Zugang."
          ],
          "rewards": [
            "430 GM",
            "Archiv- und Siegelzugang auf Zeit",
            "Ein starkes Empfehlungsschreiben an Hof oder Rat",
            "Ein belastbarer politischer Gefallen"
          ],
          "outcomes": {
            "success": "Das Faelschernetz wird offengelegt und mehrere Fehlbefehle werden annulliert.",
            "partial": "Die Faelschungen stoppen, doch die Auftraggeber bleiben nur teilweise verdeckt sichtbar.",
            "failure": "Die Gruppe verhindert Einzelnes, aber das Machtspiel kippt weiter zu Gunsten der Feinde."
          }
        },
        "3": {
          "id": "AG-050",
          "titel": "Die drei Kreise der Audienz",
          "tier": "Platin",
          "aushang": "Platinauftrag. Es gibt Hinweise auf drei gekoppelte Geheimtreffen von Gilden, Tempeln und Unterwelt. Ziel: Infiltration, Beweissicherung und Zuordnung von Taetern, Nutzniessern und Erpressten. Nur bewaehrte Teams.",
          "auftraggeber": "Verdeckter Ausschuss der Abenteurergilde",
          "briefing": "Der Auftrag ist lang und riskant: Drei Veranstaltungen an unterschiedlichen Orten muessen beobachtet oder infiltriert werden. Die Gruppe muss Informationen verknuepfen, ohne zu frueh aufzufliegen, und anschliessend harte Beweise an den richtigen Ort bringen.",
          "objectives": [
            "Mindestens zwei der drei Treffen unentdeckt beobachten oder infiltrieren.",
            "Verbindungen zwischen Teilnehmern und Liefernetz belegen.",
            "Schuldige von bloss Erpressten unterscheiden.",
            "Mit den gesicherten Beweisen entkommen und sie an eine verlaessliche Stelle bringen."
          ],
          "complications": [
            "Die Treffen nutzen verschiedene Tarnungen: Spendenabend, kleine Tempelzeremonie, Handelsmahl.",
            "Einige Teilnehmer sind potentielle Verbuendete, wenn man sie richtig behandelt.",
            "Die Feinde testen absichtlich auf Verrat in den eigenen Reihen."
          ],
          "clues": [
            "Dieselben Namen tauchen nie direkt auf, aber dieselben Geldstroeme und Transportzeichen schon.",
            "Wohltaetige Frontorganisationen verbinden mehrere Machtzentren miteinander."
          ],
          "rewards": [
            "440 GM",
            "Dauerhafter Kontakt zu einem verdeckten Informantennetz",
            "Zugang zu einem sicheren Haus der Gilde",
            "Ein einmaliger diplomatischer oder krimineller Gefallen"
          ],
          "outcomes": {
            "success": "Die Machtstruktur hinter dem Komplott wird aufgedeckt und mehrere Gegner werden zugleich verwundbar.",
            "partial": "Ein Kreis wird gesprengt, aber die anderen gehen tiefer in den Untergrund.",
            "failure": "Die Gruppe fliegt auf und wird selbst Teil der Erzaehlung des Feindes."
          }
        },
        "4": {
          "id": "AG-051",
          "titel": "Unterstadt Null",
          "tier": "Platin",
          "aushang": "Platinauftrag. Unter der Unterstadt existiert offenbar eine zweite, verborgene Verteilebene mit Mischkammern, Kanaelen und Notdepots. Ziel ist die Erkundung, Sicherung und Abschaltung dieser Ebene. Lebensgefahr wahrscheinlich.",
          "auftraggeber": "Abenteurergilde mit Unterstuetzung der Wasserhueter",
          "briefing": "Ein laengerer Dungeon- und Ermittlungsauftrag: Einstieg finden, die unterirdische Infrastruktur kartieren, Arbeiter und Wachen voneinander trennen, Proben sichern und die Anlage abschalten, ohne die halbe Unterstadt zu ueberfluten.",
          "objectives": [
            "Einstieg und Hauptachse der Unteranlage finden.",
            "Mischgeraete, Leitungen und Reservoire dokumentieren.",
            "Zwangsarbeiter oder Unbeteiligte wenn moeglich lebend sichern.",
            "Die Anlage kontrolliert abschalten oder unbrauchbar machen."
          ],
          "complications": [
            "Selbstflutung, giftige Daempfe und Notverschluesse machen den Rueckweg unsicher.",
            "Bewaffnete Aufseher und bezahlte Saboteure kennen die Gaenge besser als jede Wache.",
            "Ein falscher Hebel kann die Beweise vernichten."
          ],
          "clues": [
            "Mehrere Leitungsstraenge entsprechen exakt bekannten Hotspots an der Oberflaeche.",
            "Substanzvarianten sind nach Tierart, Ausloeser und Zielviertel sortiert."
          ],
          "rewards": [
            "450 GM",
            "Anteil an beschlagnahmter Ware im Wert von 60 GM",
            "Grosser Respekt bei Gilde und Wasserhuetern",
            "Bevorzugter Zugriff auf spaetere Sonderauftraege"
          ],
          "outcomes": {
            "success": "Die Unteranlage faellt, und das logistische Herz des Netzwerks ist gebrochen.",
            "partial": "Die Anlage wird schwer beschaedigt, doch ein Zweig entkommt mit Kernunterlagen.",
            "failure": "Die Anlage flutet und begraebt Beweise und moegliche Zeugen."
          }
        },
        "5": {
          "id": "AG-052",
          "titel": "Der Hof hinter dem Spiegel",
          "tier": "Platin",
          "aushang": "Platinauftrag. Eine Reihe von Spuren deutet auf einen verdeckten Hofzirkel hin, der Tierchaos, Faelschungen und politische Massnahmen zugleich steuert. Erfahrene Teams werden gesucht, um den Zirkel zu enttarnen, ohne einen Staatskollaps auszuloesen.",
          "auftraggeber": "Abenteurergilde in streng vertraulicher Absprache mit der Krone",
          "briefing": "Dieser Auftrag verlangt mehrere Phasen: hoefische Infiltration, Beweisfuehrung, Schutz einzelner Zeugen und gegebenenfalls Zugriff auf einen inneren Kreis. Offene Gewalt kann katastrophale Folgen haben, falsches Zoegern ebenso.",
          "objectives": [
            "Den inneren Zirkel identifizieren.",
            "Belastbare Beweise gegen mindestens zwei hochrangige Beteiligte sichern.",
            "Schluesselzeugen oder Dokumente vor Bereinigung schuetzen.",
            "Einen Zugriff ermoeglichen, ohne Buergerkrieg oder Putsch auszuloesen."
          ],
          "complications": [
            "Nicht jeder Adlige im Zirkel ist Taeter; manche sind erpresst oder manipuliert.",
            "Mehrere Seiten wollen die Gruppe gegeneinander ausspielen.",
            "Ein entlarvter Gegner koennte sofort den Notstand ausrufen lassen."
          ],
          "clues": [
            "Liefer- und Spendenwege enden in denselben hoefischen Haushalten.",
            "Mehrere scheinbar unabhaengige Entscheidungen ergeben zusammen ein Muster geplanter Krise."
          ],
          "rewards": [
            "460 GM",
            "Hofzugang und ein Schutzbrief der Krone",
            "Ein maechtiger politischer Gefallen",
            "Ein dauerhaft erhoehter Rang oder Ruf in der Gilde"
          ],
          "outcomes": {
            "success": "Der Hofzirkel wird enttarnt und die Krise politisch kontrollierbar.",
            "partial": "Ein Teil des Zirkels faellt, doch die groesste Figur entzieht sich der direkten Schuld.",
            "failure": "Der Zirkel ueberlebt und lenkt den Verdacht auf andere oder auf die Gilde."
          }
        },
        "6": {
          "id": "AG-053",
          "titel": "Die letzte Parade",
          "tier": "Platin",
          "aushang": "Platinauftrag. Mehrere Hinweise deuten darauf hin, dass eine bevorstehende koenigliche Parade als finaler Ausloeser fuer flaechendeckendes Tierchaos, Massenpanik und politische Saeuberung missbraucht werden soll. Sofortige Einsatzbereitschaft erforderlich.",
          "auftraggeber": "Abenteurergilde mit koeniglicher Notsiegelung",
          "briefing": "Der Auftrag vereint Schutzmission, Ermittlungsabschluss und moeglichen Endzugriff: Die Parade muss gesichert, Trigger stillgelegt, Tiere und Publikum geschuetzt und die Drahtzieher vor Ort oder im Hintergrund gestellt werden.",
          "objectives": [
            "Paradeweg, Tierbereiche und Klangquellen im Voraus pruefen.",
            "Mindestens zwei Trigger oder Sabotagepunkte stilllegen.",
            "Panik im Publikum und Massenkeulungen verhindern.",
            "Drahtzieher oder deren Einsatzleitung stellen oder entlarven."
          ],
          "complications": [
            "Die Parade selbst erzeugt viele Geraeusche, Bewegungen und politische Angriffsflaechen.",
            "Jede Partei des Reichs deutet das Ereignis anders und nutzt Fehler sofort aus.",
            "Ein offener Fehlschlag koennte die Krone oder die Gilde dauerhaft schwaechen."
          ],
          "clues": [
            "Fanfaren, Glocken, Tierpflege und Lieferketten greifen exakt ineinander.",
            "Ein Teil der scheinbaren Sicherheitsmassnahmen ist selbst Teil des Plans."
          ],
          "rewards": [
            "500 GM",
            "Koenigliche Anerkennung oder grosser Schutzbrief",
            "Zugang zu hochrangigen Ressourcen der Gilde",
            "Ein dauerhafter, weltlich oder politisch bedeutsamer Gefallen"
          ],
          "outcomes": {
            "success": "Die Parade wird gerettet und das Netzwerk hinter der Verschwoerung bricht sichtbar zusammen.",
            "partial": "Die Katastrophe wird verkleinert, aber nicht voellig verhindert; einige Koepfe entkommen.",
            "failure": "Die Parade endet im Desaster und eine neue Ordnung erhebt Anspruch auf die Stadt."
          }
        },
        "id": "zufallstabelle-platin-auftraege-am-schwarzen-brett",
        "titel": "Zufallstabelle Platin-Auftraege am schwarzen Brett",
        "description": "Tabelle fuer Platin-Auftraege am schwarzen Brett der Abenteurergilde. Jede Tabellenzeile enthaelt den vollstaendigen Auftrag.",
        "dice": 6,
        "parts": false
      }
    }
  },
  "abenteuergilde-auftraege-platin.json": {
    "1": {
      "id": "AG-048",
      "titel": "Die violette Flut",
      "tier": "Platin",
      "aushang": "Platinauftrag. Mehrere Stadtviertel, Teiche und Stallungen zeigen gleichzeitig Ausbrueche aggressiven Tierverhaltens. Hinweise deuten auf eine koordinierte Freisetzung ueber Wasser, Oel und Staub hin. Nur erfahrenste Teams melden sich.",
      "auftraggeber": "Abenteurergilde mit Sondervollmacht des Kronrates",
      "briefing": "Dies ist ein langer und gefaehrlicher Auftrag vom Schwarzen Brett, der mehrere Einsaetze umfasst: Versorgungspunkte sichern, eine Freisetzungsroute rekonstruieren, Schluesseldepots stilllegen und die stadtweite Welle brechen, bevor die Ordnung kollabiert.",
      "objectives": [
        "Mindestens drei Hotspots innerhalb kurzer Zeit absichern.",
        "Wasser-, Oel- und Staubquellen kartieren und vergleichen.",
        "Ein Hauptdepot oder eine Mischkammer lokalisieren und abschalten.",
        "Die Stadt vor Ausgangssperre oder Massenkeulung bewahren."
      ],
      "complications": [
        "Wache, Tempel und Unterwelt verfolgen teils gegensaetzliche Ziele.",
        "Mehrere Scheindepots und falsche Hotspots werden absichtlich gestreut.",
        "Oeffentliche Panik droht jede Ermittlung zu ersticken."
      ],
      "clues": [
        "Bronzerohre und Lieferkarren verbinden Viertel, die oberflaechlich nichts gemeinsam haben.",
        "Bestimmte Trigger wie Glocken, Schmiedehaemmer oder Trompetensignale verstaerken die Ausbrueche."
      ],
      "rewards": [
        "420 GM",
        "Grosses Ansehen innerhalb der Gilde",
        "Sonderzugriff auf Gildenressourcen, Heilung und Informanten",
        "Ein politischer Gefallen mittlerer Tragweite"
      ],
      "outcomes": {
        "success": "Die Welle wird gebrochen und das Netzwerk hinter der Freisetzung wird sichtbar.",
        "partial": "Die Stadt bleibt stabil, aber die Drahtzieher entkommen in eine zweite Phase.",
        "failure": "Ein Notstand wird ausgerufen und die Gilde geraet selbst unter Verdacht."
      }
    },
    "2": {
      "id": "AG-049",
      "titel": "Die Faelschung des Schweigethrons",
      "tier": "Platin",
      "aushang": "Platinauftrag. Belastbare Hinweise deuten darauf hin, dass mehrere gefaelschte koenigliche Erlasse, Transportrechte und Quarantaenebefehle gleichzeitig im Umlauf sind. Erfahrene Ermittler gesucht, die Archiv, Kanzlei und Botennetz pruefen koennen.",
      "auftraggeber": "Abenteurergilde und verdeckte Kontakte aus der Kanzlei",
      "briefing": "Ein lang angelegter Auftrag: Die Gruppe muss Faelschungen identifizieren, den Botenapparat infiltrieren, echte Dokumente schuetzen und den politischen Nutzniesser entlarven, bevor die Stadt nach falschen Befehlen handelt.",
      "objectives": [
        "Mindestens zwei gefaelschte Erlasswege rekonstruieren.",
        "Das Faelscheratelier oder die Ausgabestelle finden.",
        "Belastbare Beweise sichern, die vor Rat oder Krone standhalten.",
        "Die Vollstreckung der gefaehrlichsten Faelschungen verhindern."
      ],
      "complications": [
        "Hochgestellte Namen tauchen in der Kette auf.",
        "Ein Teil der Wache vollstreckt Befehle bereits guten Glaubens.",
        "Die Faelscher nutzen echte Archiveintraege als Tarnung."
      ],
      "clues": [
        "Wachs, Papier und Randmarkierungen unterscheiden sich minimal von echten Stuecken.",
        "Mehrere Botenrouten ueberschneiden sich an einer verlassenen Kanzlei mit verdecktem Zugang."
      ],
      "rewards": [
        "430 GM",
        "Archiv- und Siegelzugang auf Zeit",
        "Ein starkes Empfehlungsschreiben an Hof oder Rat",
        "Ein belastbarer politischer Gefallen"
      ],
      "outcomes": {
        "success": "Das Faelschernetz wird offengelegt und mehrere Fehlbefehle werden annulliert.",
        "partial": "Die Faelschungen stoppen, doch die Auftraggeber bleiben nur teilweise verdeckt sichtbar.",
        "failure": "Die Gruppe verhindert Einzelnes, aber das Machtspiel kippt weiter zu Gunsten der Feinde."
      }
    },
    "3": {
      "id": "AG-050",
      "titel": "Die drei Kreise der Audienz",
      "tier": "Platin",
      "aushang": "Platinauftrag. Es gibt Hinweise auf drei gekoppelte Geheimtreffen von Gilden, Tempeln und Unterwelt. Ziel: Infiltration, Beweissicherung und Zuordnung von Taetern, Nutzniessern und Erpressten. Nur bewaehrte Teams.",
      "auftraggeber": "Verdeckter Ausschuss der Abenteurergilde",
      "briefing": "Der Auftrag ist lang und riskant: Drei Veranstaltungen an unterschiedlichen Orten muessen beobachtet oder infiltriert werden. Die Gruppe muss Informationen verknuepfen, ohne zu frueh aufzufliegen, und anschliessend harte Beweise an den richtigen Ort bringen.",
      "objectives": [
        "Mindestens zwei der drei Treffen unentdeckt beobachten oder infiltrieren.",
        "Verbindungen zwischen Teilnehmern und Liefernetz belegen.",
        "Schuldige von bloss Erpressten unterscheiden.",
        "Mit den gesicherten Beweisen entkommen und sie an eine verlaessliche Stelle bringen."
      ],
      "complications": [
        "Die Treffen nutzen verschiedene Tarnungen: Spendenabend, kleine Tempelzeremonie, Handelsmahl.",
        "Einige Teilnehmer sind potentielle Verbuendete, wenn man sie richtig behandelt.",
        "Die Feinde testen absichtlich auf Verrat in den eigenen Reihen."
      ],
      "clues": [
        "Dieselben Namen tauchen nie direkt auf, aber dieselben Geldstroeme und Transportzeichen schon.",
        "Wohltaetige Frontorganisationen verbinden mehrere Machtzentren miteinander."
      ],
      "rewards": [
        "440 GM",
        "Dauerhafter Kontakt zu einem verdeckten Informantennetz",
        "Zugang zu einem sicheren Haus der Gilde",
        "Ein einmaliger diplomatischer oder krimineller Gefallen"
      ],
      "outcomes": {
        "success": "Die Machtstruktur hinter dem Komplott wird aufgedeckt und mehrere Gegner werden zugleich verwundbar.",
        "partial": "Ein Kreis wird gesprengt, aber die anderen gehen tiefer in den Untergrund.",
        "failure": "Die Gruppe fliegt auf und wird selbst Teil der Erzaehlung des Feindes."
      }
    },
    "4": {
      "id": "AG-051",
      "titel": "Unterstadt Null",
      "tier": "Platin",
      "aushang": "Platinauftrag. Unter der Unterstadt existiert offenbar eine zweite, verborgene Verteilebene mit Mischkammern, Kanaelen und Notdepots. Ziel ist die Erkundung, Sicherung und Abschaltung dieser Ebene. Lebensgefahr wahrscheinlich.",
      "auftraggeber": "Abenteurergilde mit Unterstuetzung der Wasserhueter",
      "briefing": "Ein laengerer Dungeon- und Ermittlungsauftrag: Einstieg finden, die unterirdische Infrastruktur kartieren, Arbeiter und Wachen voneinander trennen, Proben sichern und die Anlage abschalten, ohne die halbe Unterstadt zu ueberfluten.",
      "objectives": [
        "Einstieg und Hauptachse der Unteranlage finden.",
        "Mischgeraete, Leitungen und Reservoire dokumentieren.",
        "Zwangsarbeiter oder Unbeteiligte wenn moeglich lebend sichern.",
        "Die Anlage kontrolliert abschalten oder unbrauchbar machen."
      ],
      "complications": [
        "Selbstflutung, giftige Daempfe und Notverschluesse machen den Rueckweg unsicher.",
        "Bewaffnete Aufseher und bezahlte Saboteure kennen die Gaenge besser als jede Wache.",
        "Ein falscher Hebel kann die Beweise vernichten."
      ],
      "clues": [
        "Mehrere Leitungsstraenge entsprechen exakt bekannten Hotspots an der Oberflaeche.",
        "Substanzvarianten sind nach Tierart, Ausloeser und Zielviertel sortiert."
      ],
      "rewards": [
        "450 GM",
        "Anteil an beschlagnahmter Ware im Wert von 60 GM",
        "Grosser Respekt bei Gilde und Wasserhuetern",
        "Bevorzugter Zugriff auf spaetere Sonderauftraege"
      ],
      "outcomes": {
        "success": "Die Unteranlage faellt, und das logistische Herz des Netzwerks ist gebrochen.",
        "partial": "Die Anlage wird schwer beschaedigt, doch ein Zweig entkommt mit Kernunterlagen.",
        "failure": "Die Anlage flutet und begraebt Beweise und moegliche Zeugen."
      }
    },
    "5": {
      "id": "AG-052",
      "titel": "Der Hof hinter dem Spiegel",
      "tier": "Platin",
      "aushang": "Platinauftrag. Eine Reihe von Spuren deutet auf einen verdeckten Hofzirkel hin, der Tierchaos, Faelschungen und politische Massnahmen zugleich steuert. Erfahrene Teams werden gesucht, um den Zirkel zu enttarnen, ohne einen Staatskollaps auszuloesen.",
      "auftraggeber": "Abenteurergilde in streng vertraulicher Absprache mit der Krone",
      "briefing": "Dieser Auftrag verlangt mehrere Phasen: hoefische Infiltration, Beweisfuehrung, Schutz einzelner Zeugen und gegebenenfalls Zugriff auf einen inneren Kreis. Offene Gewalt kann katastrophale Folgen haben, falsches Zoegern ebenso.",
      "objectives": [
        "Den inneren Zirkel identifizieren.",
        "Belastbare Beweise gegen mindestens zwei hochrangige Beteiligte sichern.",
        "Schluesselzeugen oder Dokumente vor Bereinigung schuetzen.",
        "Einen Zugriff ermoeglichen, ohne Buergerkrieg oder Putsch auszuloesen."
      ],
      "complications": [
        "Nicht jeder Adlige im Zirkel ist Taeter; manche sind erpresst oder manipuliert.",
        "Mehrere Seiten wollen die Gruppe gegeneinander ausspielen.",
        "Ein entlarvter Gegner koennte sofort den Notstand ausrufen lassen."
      ],
      "clues": [
        "Liefer- und Spendenwege enden in denselben hoefischen Haushalten.",
        "Mehrere scheinbar unabhaengige Entscheidungen ergeben zusammen ein Muster geplanter Krise."
      ],
      "rewards": [
        "460 GM",
        "Hofzugang und ein Schutzbrief der Krone",
        "Ein maechtiger politischer Gefallen",
        "Ein dauerhaft erhoehter Rang oder Ruf in der Gilde"
      ],
      "outcomes": {
        "success": "Der Hofzirkel wird enttarnt und die Krise politisch kontrollierbar.",
        "partial": "Ein Teil des Zirkels faellt, doch die groesste Figur entzieht sich der direkten Schuld.",
        "failure": "Der Zirkel ueberlebt und lenkt den Verdacht auf andere oder auf die Gilde."
      }
    },
    "6": {
      "id": "AG-053",
      "titel": "Die letzte Parade",
      "tier": "Platin",
      "aushang": "Platinauftrag. Mehrere Hinweise deuten darauf hin, dass eine bevorstehende koenigliche Parade als finaler Ausloeser fuer flaechendeckendes Tierchaos, Massenpanik und politische Saeuberung missbraucht werden soll. Sofortige Einsatzbereitschaft erforderlich.",
      "auftraggeber": "Abenteurergilde mit koeniglicher Notsiegelung",
      "briefing": "Der Auftrag vereint Schutzmission, Ermittlungsabschluss und moeglichen Endzugriff: Die Parade muss gesichert, Trigger stillgelegt, Tiere und Publikum geschuetzt und die Drahtzieher vor Ort oder im Hintergrund gestellt werden.",
      "objectives": [
        "Paradeweg, Tierbereiche und Klangquellen im Voraus pruefen.",
        "Mindestens zwei Trigger oder Sabotagepunkte stilllegen.",
        "Panik im Publikum und Massenkeulungen verhindern.",
        "Drahtzieher oder deren Einsatzleitung stellen oder entlarven."
      ],
      "complications": [
        "Die Parade selbst erzeugt viele Geraeusche, Bewegungen und politische Angriffsflaechen.",
        "Jede Partei des Reichs deutet das Ereignis anders und nutzt Fehler sofort aus.",
        "Ein offener Fehlschlag koennte die Krone oder die Gilde dauerhaft schwaechen."
      ],
      "clues": [
        "Fanfaren, Glocken, Tierpflege und Lieferketten greifen exakt ineinander.",
        "Ein Teil der scheinbaren Sicherheitsmassnahmen ist selbst Teil des Plans."
      ],
      "rewards": [
        "500 GM",
        "Koenigliche Anerkennung oder grosser Schutzbrief",
        "Zugang zu hochrangigen Ressourcen der Gilde",
        "Ein dauerhafter, weltlich oder politisch bedeutsamer Gefallen"
      ],
      "outcomes": {
        "success": "Die Parade wird gerettet und das Netzwerk hinter der Verschwoerung bricht sichtbar zusammen.",
        "partial": "Die Katastrophe wird verkleinert, aber nicht voellig verhindert; einige Koepfe entkommen.",
        "failure": "Die Parade endet im Desaster und eine neue Ordnung erhebt Anspruch auf die Stadt."
      }
    },
    "id": "abenteuergilde-auftraege-platin",
    "titel": "Abenteuergilde-Auftraege Platin",
    "description": "Platin-Auftraege der Abenteurergilde als eigenstaendige Zufallstabelle mit vollstaendigen Auftragseintraegen.",
    "tier": "Platin",
    "dice": 6,
    "parts": false
  },
  "abenteuergilde-auftraege-silber.json": {
    "1": {
      "id": "AG-004",
      "titel": "Die Scheune der Schreie",
      "tier": "Silber",
      "hook": "Ein ganzer Hof ist verriegelt; aus der Scheune hört man Krachen, aber niemand traut sich hinein.",
      "briefing": "Die Tiere im Inneren sind am Durchdrehen. Der Besitzer ist verschwunden.",
      "objectives": [
        "Scheune sichern, Tiere retten, Brand vermeiden.",
        "Den verschwundenen Besitzer finden.",
        "Verbindung zu Lieferketten (Futterhändler, Stallmeister) herstellen."
      ],
      "complications": [
        "Ein alchemistisches Gerät im Heuboden stößt unregelmäßig Dampf aus.",
        "Der Besitzer war verschuldet; Unterweltinteressen mischen mit."
      ],
      "clues": [
        "Ein unscheinbarer grauer Staub in Ritzen – unter UV/Feenlicht kurz sichtbar.",
        "Ein Lieferschein mit falschem Siegel."
      ],
      "outcomes": {
        "success": "Gerät/Staub gesichert; Spur zu Futterhändler.",
        "partial": "Scheune beschädigt; Entschädigungsforderung.",
        "failure": "Brand; Stadtwache übernimmt und versiegelt alles."
      }
    },
    "2": {
      "id": "AG-005",
      "titel": "Schlachtfeld der Hufe",
      "tier": "Silber",
      "hook": "Beim Markt-Renntag drehen Pferde durch, rennen in die Menge, zertrampeln Stände.",
      "briefing": "Die Gilde muss die Menge schützen und herausfinden, warum ausgerechnet Turnierpferde betroffen sind.",
      "objectives": [
        "Pferde stoppen (Netze, Beruhigung, Barrieren).",
        "Stallungen untersuchen: Sattelzeug, Wasser, Heu, Huföl.",
        "Verdächtige in der Menge identifizieren (Saboteure, Händler, Wache)."
      ],
      "complications": [
        "Der General nutzt die Gelegenheit für mehr Wachenpräsenz und Ausgangssperren.",
        "Ein Konkurrent beschuldigt öffentlich den Handwerker-Kandidaten."
      ],
      "clues": [
        "Huföl stammt aus einer neuen Charge; Geruch neutral, aber temperaturabhängig.",
        "Ein Stallbursche wurde bestochen, 'nur ein bisschen Öl' zu verwenden."
      ],
      "outcomes": {
        "success": "Beweis für manipulierte Lieferkette.",
        "partial": "Adliger verletzt; politischer Druck steigt.",
        "failure": "Markt kollabiert; Misstrauen gegen Gilde."
      }
    },
    "3": {
      "id": "AG-006",
      "titel": "Fieber im Fischteich",
      "tier": "Silber",
      "hook": "In den Fischteichen am Stadtrand sterben Fische, und Wasservögel greifen Menschen an.",
      "briefing": "Die Wasserhüter fürchten Seuche; der Tempel ruft nach Reinigung.",
      "objectives": [
        "Wasserquelle upstream finden.",
        "Proben nehmen und an die magische Universität liefern.",
        "Wildvögel vertreiben, ohne sie zu töten."
      ],
      "complications": [
        "Ein Mühlenbesitzer blockiert Zugang (hat Angst vor Schuld).",
        "Die Substanz ist für Humanoide unsichtbar, aber verursacht Halluzinationen bei Monstern."
      ],
      "clues": [
        "An der Uferlinie klebt ein unsichtbarer Film, der auf Salz reagiert.",
        "Ein unterirdischer Abfluss führt Richtung alte Werkstattkanäle."
      ],
      "outcomes": {
        "success": "Spur in die Kanalisation/alte Werkstätten.",
        "partial": "Universität fordert Quarantäne; Handel leidet.",
        "failure": "Tempel erklärt es zum göttlichen Zorn; Unruhen."
      }
    },
    "4": {
      "id": "AG-009",
      "titel": "Prüfung der Meister",
      "tier": "Silber",
      "hook": "Die Handwerkergilde bittet die Gilde um neutrale Beobachter für die Auswahlmetriken – nach Sabotagevorfällen.",
      "briefing": "Offiziell geht es um Fairness. Inoffiziell fürchten einige Meister, dass die Streuner den Prozess kapern.",
      "objectives": [
        "Prüfstationen sichern (Material, Werkzeuge, Aufträge).",
        "Unregelmäßigkeiten dokumentieren, ohne Partei zu ergreifen.",
        "Einen Saboteur auf frischer Tat ertappen."
      ],
      "complications": [
        "Der Handwerker-Kandidat wirkt hilfsbereit und kompetent; Rivalen wirken paranoid.",
        "Der General nutzt jeden Skandal, um Stadtwache in die Gilde zu setzen."
      ],
      "clues": [
        "Sabotage-Methode passt zu den Tier-Ausfällen (gleiche Substanz in Schmieröl/Staub).",
        "Ein Prüfungsraum hat winzige Kratzspuren in Pfotenform, aber nur als Markierung für Dead Drop."
      ],
      "outcomes": {
        "success": "Beweis für Manipulation; politischer Hebel gegen Streuner.",
        "partial": "Beweise reichen nicht, aber Verdacht wächst.",
        "failure": "Gilde spaltet sich; Zeremonie wird riskanter."
      }
    },
    "5": {
      "id": "AG-013",
      "titel": "Schriftrolle aus der Universität",
      "tier": "Silber",
      "hook": "Die magische Universität braucht Eskorte für ein Artefakt-Transportkonvoi.",
      "briefing": "Ein Professor will nichts über die Ladung sagen, aber die Route ist heikel.",
      "objectives": [
        "Konvoi unauffällig begleiten.",
        "Hinterhalt verhindern oder abwehren.",
        "Herausfinden, wer die Route verraten hat."
      ],
      "complications": [
        "Ein Student ist heimlich mitgereist (und löst Probleme aus).",
        "Ein magischer Störimpuls setzt Schutzzauber zeitweise außer Kraft."
      ],
      "rewards": [
        "Zugang zu Bibliotheksressourcen",
        "Ein einmaliger magischer Dienst (Identify/Remove Curse etc.)"
      ]
    },
    "6": {
      "id": "AG-016",
      "titel": "Grenzfeuer",
      "tier": "Silber",
      "hook": "An der Nordgrenze brennen Signalfeuer falsch; ein Fort meldet Infiltration.",
      "briefing": "Der General will schnelle Aufklärung, bevor Panik entsteht.",
      "objectives": [
        "Zum Fort reisen und Lage prüfen.",
        "Saboteure finden (Spuren, Codes, Insider).",
        "Signalnetz reparieren/absichern."
      ],
      "complications": [
        "Der Kommandant vor Ort ist loyal zum General, nicht zum König.",
        "Die 'Saboteure' sind Flüchtlinge, die Schutz suchen."
      ],
      "rewards": [
        "Militärische Ausrüstung",
        "Ein Empfehlungsschreiben (oder Feindschaft) des Generals"
      ]
    },
    "7": {
      "id": "AG-018",
      "titel": "Schatten über dem Theater",
      "tier": "Silber",
      "hook": "Ein Theaterdirektor bittet: Jemand sabotiert Aufführungen mit Illusionsmagie.",
      "briefing": "Das Theater ist politisch wichtig – dort werden Meinungen gemacht.",
      "objectives": [
        "Saboteur entlarven (Backstage, Proben, Publikumsraum).",
        "Aufführung retten, ohne Panik.",
        "Motiv aufdecken: Geld, Politik, Rache."
      ],
      "complications": [
        "Der Saboteur ist ein gefeierter Künstler mit Immunität durch Patron.",
        "Eine echte, gefährliche Illusion entgleist (Panikstempel).\"],"
      ],
      "rewards": [
        "Einfluss in der Kulturszene",
        "Hinweise auf Gerüchtekampagnen (Barden-Netzwerk)"
      ]
    },
    "8": {
      "id": "AG-023",
      "titel": "Rauch ueber den Gaerten",
      "tier": "Silber",
      "aushang": "Gesucht: diskrete, faehige Abenteurer fuer den Botanischen Garten. Bienen, Pfauen und Ziertiere sind ausser Rand und Band, und aus einem Gewaechshaus steigt nachts violetter Dunst auf. Keine oeffentliche Panik, gute Bezahlung.",
      "auftraggeber": "Verwalterin des Botanischen Gartens, im Namen des Foerderkreises",
      "briefing": "Ein Silberauftrag fuer Personen mit ruhiger Hand: Besucher muessen geschuetzt, das Gewaechshaus untersucht und die Ursache des Dunsts festgestellt werden, ohne die maechtigen Spender gegen die Gilde aufzubringen.",
      "objectives": [
        "Besucher und Personal sichern oder evakuieren.",
        "Gewaechshaus, Bewaesserung und Duenger pruefen.",
        "Eine Dunstprobe fuer Untersuchung sichern."
      ],
      "complications": [
        "Die Gartenleitung verschweigt illegale Beschleunigungsversuche mit Pflanzen.",
        "Ein Bienenzuechter nutzt die Lage fuer Anschuldigungen gegen Rivalen."
      ],
      "clues": [
        "Die Reaktion verstaerkt sich bei Waerme und hoher Feuchtigkeit.",
        "Ein verborgenes Rohrsystem fuehrt zu einer alten Kraeuterkueche."
      ],
      "rewards": [
        "80 GM",
        "Seltene Kraeuter oder Saaten im Wert von 25 GM",
        "Ein Gefallen des botanischen Foerderkreises"
      ],
      "outcomes": {
        "success": "Die Kraeuterkueche wird als Verteilerstelle entlarvt.",
        "partial": "Der Garten wird geschlossen, aber die Verantwortlichen entgehen vorerst.",
        "failure": "Die Beweise werden vernichtet und der Garten wird politisch versiegelt."
      }
    },
    "9": {
      "id": "AG-024",
      "titel": "Die Glocke im Schacht",
      "tier": "Silber",
      "aushang": "Bergwerksauftrag: Fledermaeuse, Grubenponys und Lastziegen drehen beim Schlagen der Alarmglocke durch. Gesucht werden belastbare Leute zur Sicherung der Foerderstollen und Aufklaerung im Schacht. Gefahrenzulage inklusive.",
      "auftraggeber": "Steinbruch- und Erzgemeinschaft am Nordgrat",
      "briefing": "Die Auftraggeber wollen den Betrieb nicht stilllegen, bevor Klarheit herrscht. Abenteurer sollen Tiere und Arbeiter schuetzen, Klangquellen pruefen und moegliche Sabotage dokumentieren.",
      "objectives": [
        "Stallungen und Foerderwege sichern.",
        "Glocke, Seilzuege und Erzstaubablagerungen untersuchen.",
        "Tiere beruhigen oder aus dem kritischen Stollenabschnitt bringen."
      ],
      "complications": [
        "Ein Vorarbeiter faelscht Sicherheitsberichte.",
        "Ein Nebenschacht ist teilweise eingestuerzt."
      ],
      "clues": [
        "Auf dem Glockenjoch sitzt ein reaktiver Rueckstand.",
        "Die heftigsten Reaktionen treten nur in einem bestimmten Seitenstollen auf."
      ],
      "rewards": [
        "90 GM",
        "Bergwerkszulage in Erz oder Rohmetall im Wert von 20 GM",
        "Vorzugsrecht auf Transport oder Unterkunft am Nordgrat"
      ],
      "outcomes": {
        "success": "Die Resonanzquelle wird entdeckt und eine tiefere Sabotagespur gesichert.",
        "partial": "Der Betrieb laeuft weiter, doch das Problem ist nur eingedaemmt.",
        "failure": "Ein neuer Einsturz zerstoert Spuren und kostet Vertrauen."
      }
    },
    "10": {
      "id": "AG-025",
      "titel": "Das Wehr am schwarzen Bach",
      "tier": "Silber",
      "aushang": "Soforthilfe am Stadtwehr gesucht. Aale, Otter und Wasservoegel verhalten sich aggressiv, die Schleusen klemmen, und Ueberschwemmung droht. Wer Ursache und Mechanik sichert, erhaelt guten Lohn.",
      "auftraggeber": "Wasserhueter des Westwehrs",
      "briefing": "Dies ist ein Auftrag fuer das Brett, weil Schnelligkeit zaehlt: Das Wehr muss gesichert werden, aber zugleich sollen Wasserproben und moegliche Zuleitungen dokumentiert werden.",
      "objectives": [
        "Schleusen bedienen oder notduerftig stabilisieren.",
        "Wasserlaeufe ober- und unterhalb des Wehrs pruefen.",
        "Werkkanaele und Metallkontakte vergleichen."
      ],
      "complications": [
        "Mueller und Faerber blockieren einander die Zugaenge.",
        "Ein Stadtrat fordert vorschnell das Oeffnen aller Schleusen."
      ],
      "clues": [
        "Der violette Film sitzt besonders dort, wo stilles Wasser Metall beruehrt.",
        "Ein Seitenkanal fuehrt in alte Werkstattgewoelbe."
      ],
      "rewards": [
        "85 GM",
        "Freie Faehr- und Wehrpassage fuer spaetere Reisen",
        "Dankesschreiben der Wasserhueter"
      ],
      "outcomes": {
        "success": "Die Werkstattgewoelbe werden als wichtige Spur entdeckt.",
        "partial": "Das Wehr haelt, doch Muehlen und Handel leiden.",
        "failure": "Ein Viertel wird ueberschwemmt und die Beweislage versinkt im Chaos."
      }
    },
    "11": {
      "id": "AG-026",
      "titel": "Falsches Futter, falscher Eid",
      "tier": "Silber",
      "aushang": "Diskrete Hilfe im Militaerdepot gesucht. Meldehunde, Stallfalken und Botentauben verhalten sich unzuverlaessig. Gesucht werden neutrale Abenteurer, die Beschaffung und Futterpruefung uebernehmen. Schweigepflicht erwartet.",
      "auftraggeber": "Quartiermeisteramt, inoffiziell ueber einen Lagerverwalter",
      "briefing": "Ein klassischer Silberauftrag fuers schwarze Brett mit politischer Note: Das Depot soll funktionstuechtig bleiben, aber jemand muss die Lieferungen pruefen und moegliche Bestechung nachweisen.",
      "objectives": [
        "Futterlager, Wasser und Pflegeoele pruefen.",
        "Mindestens eine betroffene Charge sichern.",
        "Lieferweg und Beschaffungskette nachverfolgen."
      ],
      "complications": [
        "Ein Offizier versucht belastende Beweise verschwinden zu lassen.",
        "Jede Verzoegerung wird als Angriff auf die Einsatzbereitschaft gewertet."
      ],
      "clues": [
        "Nur eine neue Notfallcharge ist betroffen.",
        "Mehrere Formulare tragen dieselbe Faelscherhand."
      ],
      "rewards": [
        "95 GM",
        "Militaerrationen und Pfeile oder Bolzen fuer eine Gruppe",
        "Ein militaerischer Passierschein fuer eingeschraenkte Zonen"
      ],
      "outcomes": {
        "success": "Korruption in der Beschaffung wird belegbar.",
        "partial": "Die Tiere werden gerettet, doch das Amt schiebt Schuld ab.",
        "failure": "Botenrouten brechen zusammen und das Depot schottet sich ab."
      }
    },
    "12": {
      "id": "AG-027",
      "titel": "Die Menagerie des Sammlers",
      "tier": "Silber",
      "aushang": "Diskreter Einsatz im Anwesen eines Sammlers gesucht. Exotische Tiere wurden waehrend einer Vorfuehrung aggressiv. Gesucht werden besonnene Leute mit Erfahrung im Umgang mit Bestien. Schweigen wird zusaetzlich belohnt.",
      "auftraggeber": "Verwalter des Hauses Veler, im Namen des Sammlers",
      "briefing": "Der Auftrag ist fuer ein schwarzes Brett ungewoehnlich fein, aber eindeutig: Das Anwesen sichern, Tiere einhegen und herausfinden, ob Kaefigpflege, Futter oder ein Gast verantwortlich ist.",
      "objectives": [
        "Ausgebrochene Tiere eindämmen oder umlenken.",
        "Futterkammer, Kaefigschloesser und Pflegesalben untersuchen.",
        "Personal und Gaeste unauffaellig befragen."
      ],
      "complications": [
        "Der Sammler will jeden Skandal vertuschen.",
        "Ein Gast moechte im Chaos ein seltenes Tier stehlen."
      ],
      "clues": [
        "Mehrere Kaefigschloesser tragen reaktives Oel.",
        "Ein neues Parfum scheint die Tiere zusaetzlich zu reizen."
      ],
      "rewards": [
        "100 GM",
        "Eine wertvolle, aber unkritische Kuriositaet aus der Sammlung",
        "Einladung oder Nameingang in besseren Kreisen"
      ],
      "outcomes": {
        "success": "Pflegeoel und Parfum liefern eine belastbare Verbindungsroute.",
        "partial": "Das Anwesen bleibt ruhig, doch der Auftraggeber drueckt auf Schweigen.",
        "failure": "Ein Tier entkommt in die Stadt und verschiebt alle Aufmerksamkeit."
      }
    },
    "13": {
      "id": "AG-042",
      "titel": "Das kalte Archiv",
      "tier": "Silber",
      "aushang": "Gesucht: verlaessliche Abenteurer fuer das Stadtarchiv. Mehrere wichtige Akten sind ueber Nacht vereist, umsortiert oder verschwunden. Das Archiv braucht diskrete Hilfe, bevor Rat und Gilden davon erfahren.",
      "auftraggeber": "Archivarin Tessa Mare",
      "briefing": "Ein Silberauftrag mit Ermittlungscharakter. Die Gruppe soll das Archiv sichern, fehlende Akten finden und pruefen, ob es sich um Magie, Diebstahl oder Sabotage durch einen Insider handelt.",
      "objectives": [
        "Die betroffenen Archivraeume sichern.",
        "Fehlende oder manipulierte Akten identifizieren.",
        "Den Einbruchs- oder Magiepfad finden."
      ],
      "complications": [
        "Ein Archivar hat selbst Fehler vertuscht und liefert falsche Angaben.",
        "Ein Frostzauber hat Schutzsiegel teilweise unlesbar gemacht."
      ],
      "clues": [
        "Nur bestimmte Schrankreihen sind betroffen, und alle enthalten Bau- oder Liefervertraege.",
        "An einem Kellerfenster kleben Reste alchemischen Reifs."
      ],
      "rewards": [
        "82 GM",
        "Archivzugang fuer spaetere Recherchen",
        "Eine beglaubigte Kopie eines seltenen Plans oder Registers"
      ],
      "outcomes": {
        "success": "Die Akten werden gesichert und ein Diebstahlmuster wird sichtbar.",
        "partial": "Der Schaden wird begrenzt, aber eine wichtige Akte bleibt weg.",
        "failure": "Das Archiv wird versiegelt und die politische Lage verhaertet sich."
      }
    },
    "14": {
      "id": "AG-043",
      "titel": "Die Karawane der stillen Hufe",
      "tier": "Silber",
      "aushang": "Gesucht: erfahrene Begleitung fuer eine Karawane, deren Zugtiere seit zwei Naechten kaum noch Laute von sich geben, dann aber ploetzlich panisch ausschlagen. Ware und Tiere sind wertvoll; diskrete Untersuchung erwuenscht.",
      "auftraggeber": "Karawanenmeisterin Jara Venn",
      "briefing": "Ein Silberauftrag zwischen Eskorte und Ermittlung. Die Gruppe soll die Karawane sicher bis zum naechsten Umschlagplatz bringen, die Ursache des merkwuerdigen Tierverhaltens finden und klaeren, ob ein Konkurrent oder eine Liefercharge dahintersteckt.",
      "objectives": [
        "Karawane, Treiber und Zugtiere auf der gefaehrdeten Strecke sichern.",
        "Futter, Hufpflege, Geschirr und Wasserfaesser untersuchen.",
        "Den letzten Umschlagplatz oder einen Saboteur identifizieren."
      ],
      "complications": [
        "Ein Teil der Karawanenwache arbeitet heimlich fuer einen rivalisierenden Haendler.",
        "Die Tiere reagieren auf bestimmte Pfeifsignale und Metallklirren mit verzogerter Panik."
      ],
      "clues": [
        "An mehreren Hufriemen sitzt ein geruchloses, reaktives Oel.",
        "Die stillsten Tiere wurden alle am selben Brunnen getraenkt."
      ],
      "rewards": [
        "98 GM",
        "Transportplatz fuer eine spaetere Reise",
        "Handelskontakt zu Karawanen und Umschlagplaetzen"
      ],
      "outcomes": {
        "success": "Die Karawane erreicht ihr Ziel und ein Umschlagplatz wird als Verteilerpunkt belastbar verdaechtig.",
        "partial": "Die Ware kommt an, aber ein Tier geht verloren und der Saboteur entkommt.",
        "failure": "Die Karawane zerstreut sich auf der Strasse, und mehrere Spuren verschwinden mit der Ladung."
      }
    },
    "15": {
      "id": "AG-044",
      "titel": "Die roten Ziegel",
      "tier": "Silber",
      "aushang": "Sonderauftrag fuer die Bauhuette: Eine neue Lieferung roter Ziegel zerplatzt bei Hitze, verraeuchert Lagerhaeuser und macht Arbeiter krank. Ursache unbekannt. Gesucht werden belastbare Leute zur Untersuchung.",
      "auftraggeber": "Bauhuette der Stadt",
      "briefing": "Ein Silberauftrag mit Material- und Sabotagefokus. Die Gruppe soll Lager, Brennofen und Lieferwege untersuchen, weitere Schaeden verhindern und feststellen, ob die Ziegel absichtlich manipuliert wurden.",
      "objectives": [
        "Lager und Ofenbereich absichern.",
        "Gelieferte Ziegel mit alten Chargen vergleichen.",
        "Lieferweg, Brandzeichen und Brennprotokolle pruefen."
      ],
      "complications": [
        "Ein Bauprojekt fuer einen einflussreichen Auftraggeber wartet auf genau diese Steine.",
        "Der Ofenmeister versucht, eigene Nachlaessigkeit als Sabotage zu tarnen."
      ],
      "clues": [
        "Nur die juengsten Chargen zeigen einen violett dunklen Kern.",
        "Mehrere Karren wurden an derselben Zwischenstation umgeladen."
      ],
      "rewards": [
        "86 GM",
        "Baukontakte und Lagerraumhilfe",
        "Baumaterial oder Handwerkerunterstuetzung im Wert von 20 GM"
      ],
      "outcomes": {
        "success": "Die faulen Chargen werden erkannt und die Zwischenstation wird verdaechtig.",
        "partial": "Weitere Schaeden werden verhindert, aber die Lieferkette bleibt lueckenhaft.",
        "failure": "Ein Lagerhausbrand oder Einsturz verschlimmert die Lage."
      }
    },
    "16": {
      "id": "AG-045",
      "titel": "Im Schatten der Arena",
      "tier": "Silber",
      "aushang": "Vor den naechsten Arenaspielen verschwinden Ausruestung, Siegespreise und Startlisten. Gesucht wird eine neutrale Gruppe zur Sicherung der Vorbereitung und Untersuchung moeglicher Sabotage vor Spielbeginn.",
      "auftraggeber": "Arena-Verwalterin Selka Dorn",
      "briefing": "Ein Silberauftrag mit oeffentlichem Risiko: Die Arena darf nicht im Chaos versinken. Die Auftragnehmer sollen Hinterraeume sichern, Saboteure finden und die Spiele retten oder gezielt absagen.",
      "objectives": [
        "Hinterraeume, Ruestkammern und Preislager absichern.",
        "Fehlende Gegenstaende und manipulierte Listen aufspueren.",
        "Moegliche Saboteure unter Personal, Wettmachern oder Kaempfern identifizieren."
      ],
      "complications": [
        "Wettmacher setzen auf einen Skandal und stoeren die Ermittlungen.",
        "Ein beruehmter Gladiator schuetzt einen verdaechtigen Waffenmeister."
      ],
      "clues": [
        "Mehrere Startlisten wurden mit fast identischer Handschrift geaendert.",
        "Eine Siegerklinge taucht im Pfandregister eines nahegelegenen Hauses auf."
      ],
      "rewards": [
        "92 GM",
        "Freier Eintritt und Kontakte in die Arena",
        "Wettgutscheine oder Stadionmarken im Wert von 15 GM"
      ],
      "outcomes": {
        "success": "Die Spiele bleiben kontrollierbar und ein Sabotagepfad wird offengelegt.",
        "partial": "Die Arena bleibt offen, aber ein oeffentlicher Zwischenfall beschaedigt den Ruf der Gilde.",
        "failure": "Die Spiele enden im Skandal und die Spur wird von Wettmachern aufgekauft."
      }
    },
    "id": "abenteuergilde-auftraege-silber",
    "titel": "Abenteuergilde-Auftraege Silber",
    "description": "Silber-Auftraege der Abenteurergilde als eigenstaendige Zufallstabelle mit vollstaendigen Auftragseintraegen.",
    "tier": "Silber",
    "dice": 16,
    "parts": false
  },
  "ereignisse-nacht.json": {
    "id": "ereignisse-nacht",
    "titel": "Nächtliche harmlose Ereignisse",
    "description": "Harmlose nächtliche Ereignisse für Rast, Lager oder Herberge. Alle Ergebnisse bleiben weitgehend folgenarm und betreffen höchstens Kleinigkeiten, geringe Geldbeträge oder unwichtige Gegenstände.",
    "dice": 100,
    "parts": false,
    "1-60": "Nichts passiert.",
    "61-64": "Du hast einen harmlosen Traum, an den du dich nach dem Aufwachen nur noch bruchstückhaft erinnerst.",
    "65-67": "Du hast einen leichten Albtraum und wachst kurz schweißgebadet auf, kannst aber wieder einschlafen.",
    "68-72": "Ratten haben an deinem Gepäck geknabbert und 1W4 Proviant oder einen billigen Beutel (Munition) beschädigt.",
    "73-77": "Ein neugieriges Tier hat ein paar Kupfermünzen oder Kleinkram aus deinem offenen Gepäck verschleppt. Verlust: 1W6 KM.",
    "78-80": "Du findest am Morgen winzige Pfotenabdrücke um dein Lager oder Bett, aber nichts von Bedeutung ist passiert.",
    "81-84": "Du träumst auffallend klar von einem Symbol, Tier oder Ort. Es wirkt bedeutungsvoll, hat aber keine sofort erkennbare Wirkung.",
    "85-86": "Im Morgengrauen sitzt ein Vogel, Frosch oder anderes kleines Tier direkt auf deinem Gepäck und betrachtet dich, bevor es davonhuscht.",
    "86-90": "Ein Bettlerkind, Straßenjunge oder nächtlicher Dieb hat sich an deinem Lager versucht und nur Kleinkram erwischt. Verlust: 1W10 KM oder ein billiger Alltagsgegenstand.",
    "91-94": "Du findest am Morgen eine merkwürdige Kleinigkeit in deinem Gepäck oder neben deinem Lager: eine Feder, Murmel, Muschel, Nuss oder billige Münze.",
    "95-100": "Die Nacht bringt ein bemerkenswert klares, aber harmloses Omen: ein Traum, eine Sternschnuppe, ein Tierlaut oder ein flüsternder Satz, den du als vage Prophezeiung deuten darfst."
  },
  "ereignisse-tempelbrand.json": {
    "1": "Eine kleine Statue der Herdgöttin beginnt trotz des Infernos ruhig und golden zu leuchten; in ihrem Umkreis brennt nichts.",
    "2": "Eine Dachbalkenreihe bricht ein und versperrt den direkten Weg zum Hauptschiff.",
    "3": "Weihrauch aus dem Schrein einer Traumgottheit vermischt sich mit Rauch; alle in der Nähe haben für einen Moment wirre Visionen.",
    "4": "Ein Schrein der Meeresgottheit bricht auf und eine Welle aus geweihtem Wasser löscht kurzfristig einen Brandherd.",
    "5": "Panische Gläubige streiten sich, welche Reliquien zuerst gerettet werden sollen.",
    "6": "Glocken beginnen von selbst zu läuten, obwohl niemand am Seil zieht.",
    "7": "Ein Priester behauptet, die Flammen seien eine göttliche Prüfung, und weigert sich zu fliehen.",
    "8": "Brennende Stoffbanner fallen von der Decke und bilden gefährliche Feuerbarrieren.",
    "9": "Ein Altar der Glücksgottheit kippt um und verschüttet Hunderte Münzen über den Boden.",
    "10": "Die Flammen im Schrein eines Kriegsgottes nehmen für einen Augenblick die Form marschierender Soldaten an.",
    "11": "Eine eingesperrte Gruppe Kinderchorknaben ruft aus einer Seitenskapelle um Hilfe.",
    "12": "Ein Heiligtum der Windgöttin erzeugt plötzlich einen heftigen Luftstoß, der das Feuer in einen anderen Tempeltrakt treibt.",
    "13": "Das heilige Öl einer Lampengöttin explodiert in einer Stichflamme.",
    "14": "Eine Statue der Garten- oder Erntegottheit lässt rankenartige Wurzeln aus den Ritzen wachsen, die einen Fluchtweg blockieren.",
    "15": "Der Boden über einer alten Gruft sackt gefährlich ab.",
    "16": "Aus einem Opferbecken steigen silberne Funken auf, die wie winzige Sterne durch den Rauch tanzen.",
    "17": "Ein Novize trägt eine falsche Reliquie heraus, während die echte unbeachtet im Feuer liegt.",
    "18": "Die Ikone einer Katzengottheit bleibt unversehrt, obwohl alles um sie herum verkohlt.",
    "19": "Ein Schwarm heiliger Tauben gerät in Panik und stürzt wirbelnd durch das Hauptschiff.",
    "20": "Der Schrein eines Handelsgottes öffnet durch Hitze einen Geheimschacht zu den Spendengeldern.",
    "21": "Zwei rivalisierende Priester beschuldigen sich gegenseitig der Brandstiftung.",
    "22": "Ein Wandgemälde beginnt zu schmelzen und enthüllt darunter eine ältere, vergessene Darstellung.",
    "23": "Die Gebetsmühlen einer Wissensgottheit drehen sich plötzlich von selbst und murmeln Prophezeiungen im Rauch.",
    "24": "Ein Schrein der Reisenden schützt kurzzeitig einen Korridor mit kühler, klarer Luft.",
    "25": "Ein zerspringendes Glasfenster regnet brennende Scherben auf den Innenhof.",
    "26": "Das Metall eines Sonnenschreins wird glühend heiß und droht jeden zu verbrennen, der sich ihm nähert.",
    "27": "Die Flammen greifen auf die Bibliotheksnische mit heiligen Texten über.",
    "28": "Ein besessener Gläubiger will um jeden Preis die Gebeine eines lokalen Heiligen retten.",
    "29": "Der Rauch färbt sich im Bereich eines Mondschreins violett und macht Geräusche dumpf und fern.",
    "30": "Ein Altar der Gerechtigkeit kippt exakt auf die Seite einer der streitenden Fraktionen.",
    "31": "Das Opferfeuer eines kleinen Kriegsgottes frisst sich widerwillig nicht weiter und bildet eine sichere Insel.",
    "32": "Ein Schrein der Kindheit oder Familie ruft durch flackernde Stimmen die Namen Anwesender.",
    "33": "Ein gewaltiger Kronleuchter reißt sich los und stürzt brennend ins Mittelschiff.",
    "34": "Eine Statue weint plötzlich Blut, Harz oder geschmolzenes Gold.",
    "35": "Die Reliquie eines Wetterschreins knistert und lädt die Luft mit statischer Energie auf.",
    "36": "Ein geheimer Reliquienraum wird durch die Hitze geöffnet.",
    "37": "Ein heiliger Brunnen beginnt zu kochen.",
    "38": "Eine Bettlerschar versucht im Chaos, Opfergaben und Almosen an sich zu nehmen.",
    "39": "Im Schrein der Masken- oder Theatergottheit scheinen brennende Gesichter im Rauch zu lachen.",
    "40": "Ein kleiner Tempelhund führt jemanden zu einem eingeschlossenen Priester.",
    "41": "Der Glockenturm droht einzustürzen, bleibt aber noch wenige Augenblicke stehen.",
    "42": "Ein Krankenzimmer mit verletzten Pilgern füllt sich gefährlich schnell mit Rauch.",
    "43": "Ein Schrein der Jagd wird von panischen, im Tempel gehaltenen Opfertieren durchbrochen.",
    "44": "Das Feuer erreicht eine Kammer mit heiligen Kräutern und erzeugt berauschende Dämpfe.",
    "45": "Eine Gebetskette aus Metall glüht rot und brennt sich in den Steinboden.",
    "46": "Ein Schrein der Nacht verschlingt das Licht in seinem Umkreis; dort ist es plötzlich unnatürlich dunkel.",
    "47": "Durch die Flammen wird ein verborgenes Wandrelief einer verbotenen Gottheit sichtbar.",
    "48": "Ein Novize will nicht fliehen, weil er noch auf ein Zeichen seiner Gottheit wartet.",
    "49": "Die Flammen vor dem Schrein der Schmiedegottheit schlagen blau und kontrolliert statt chaotisch.",
    "50": "Eine Tür ist von geschmolzenem Wachs hunderter Votivkerzen versiegelt.",
    "51": "Der Rauch sammelt sich zu einer Gestalt, die einem lokalen Halbgott oder Volksheiligen ähnelt.",
    "52": "Ein Paar will noch im brennenden Tempel ein Gelübde oder eine Hochzeit vollenden.",
    "53": "Brennende Pergamentfetzen aus der Hallenkalenderkammer wirbeln umher und tragen Namen, Daten oder Omen.",
    "54": "Ein Becken mit Opferfischen oder heiligen Amphibien zerbricht und überschwemmt einen Gang.",
    "55": "Die heiligen Glocken verstummen abrupt – und im folgenden Schweigen hört man nur entfernte Hilfeschreie.",
    "56": "Ein untergeordneter Feuergott scheint die Flammen bewusst von seinem eigenen Schrein fernzuhalten.",
    "57": "Ein Schrein der Heilung bleibt kühl, aber jede dort versorgte Person hört leise flüsternde Gebete.",
    "58": "Ein Reliquienkasten ist abgeschlossen und der Schlüsselträger vermisst.",
    "59": "Der Boden der Schatzkammer wird so heiß, dass Münzen und Edelsteine nur unter Gefahr geborgen werden können.",
    "60": "Eine fromme Prozession versucht, singend durch das Feuer zu ziehen, um ein Wunder zu erbitten.",
    "61": "Ein Beichtstuhl enthält einen Eingeschlossenen, der aus Angst keine Antwort gibt.",
    "62": "Durch brechende Dachfenster fällt Mond- oder Sonnenlicht direkt auf einen einzigen Altar.",
    "63": "Ein heiliger Baum im Innenhof fängt Feuer und lässt glühende Samen durch den Tempel treiben.",
    "64": "Die Ketten des großen Räucherbeckens reißen und der Kessel schwingt brennend durch den Raum.",
    "65": "Eine Statue der Fruchtbarkeit oder Geburt schützt ein verstecktes Kind unter ihrem Sockel.",
    "66": "In einem Schrein der Wahrheit kann plötzlich niemand mehr lügen – selbst in Panik nicht.",
    "67": "Die Opfergaben eines Weingottes entzünden sich und verwandeln den Boden in eine brennende, klebrige Fläche.",
    "68": "Ein Goldmosaik löst sich von der Wand und fällt scheppernd herab.",
    "69": "Der Schrein einer Flussgottheit lässt einen schmalen Wasserlauf durch den Tempelboden brechen.",
    "70": "Ein Priester berichtet, im Rauch die Ursache des Brandes gesehen zu haben.",
    "71": "Brennende Seile lösen ein Netz, das früher zur Zierde diente und nun Menschen festsetzen kann.",
    "72": "Im Schrein eines Schicksalsgottes beginnen Losstäbe, Knochen oder Karten von selbst zu fallen.",
    "73": "Ein Seitengang scheint länger oder kürzer zu werden, als hätte eine kleine Wegegottheit ihren Einfluss verloren.",
    "74": "Die Asche im Heiligtum eines Totengottes bewegt sich, als würden Hände daraus greifen.",
    "75": "Ein geweihtes Schwert oder Banner muss zurückgelassen oder unter Risiko gerettet werden.",
    "76": "Die Hitze sprengt eine Mauer auf und offenbart eine verborgene Nebenkapelle.",
    "77": "Ein Schrein der Musik antwortet auf das Knistern des Feuers mit geisterhaftem Gesang.",
    "78": "Ein Tempeldieb gibt sich als Helfer aus, um unbemerkt eine bedeutende Reliquie zu stehlen.",
    "79": "Die Flammen im Schrein eines Liebesgottes bilden für einen Moment ineinander verschlungene Silhouetten.",
    "80": "Aus der Decke regnet geschmolzenes Buntglas wie farbiger Hagel.",
    "81": "Ein Schrein der Boten oder Reisenden offenbart eine kleine, nur Eingeweihten bekannte Fluchttür.",
    "82": "Eine Ikone der Hoffnung leuchtet so hell, dass der Rauch in ihrer Nähe kurz durchsichtig wird.",
    "83": "Ein Opferstier, Tempelhirsch oder anderes heiliges Tier bricht in Panik los.",
    "84": "Die Flammen erreichen ein Lager alchemistischer Reinigungsmittel und verändern plötzlich Farbe und Intensität.",
    "85": "Ein Schrein des Schlafes strahlt Ruhe aus; erschöpfte Menschen wollen dort einfach liegenbleiben.",
    "86": "Ein blinder Orakelpriester beschreibt einen sicheren Weg, obwohl er die Flammen nicht sehen kann.",
    "87": "Der Rauch trägt die Düfte verschiedener Kulte durcheinander, was Halluzinationen oder emotionale Erinnerungen auslöst.",
    "88": "Ein Schrein der Ordnung bleibt unheimlich unberührt, als hätte das Feuer eine unsichtbare Grenze respektiert.",
    "89": "Die Spendenlisten des Tempels drohen zu verbrennen und mit ihnen belastende oder schützende Geheimnisse.",
    "90": "Ein untergeordneter Donnergott sendet eine kurze Entladung, die ein Tor aufsprengt – oder jemanden verletzt.",
    "91": "Eine Wand mit Votivtafeln stürzt ein und legt dahinter verborgene Skelette, Schätze oder Beweismaterial frei.",
    "92": "Ein Schrein der Vergebung dämpft plötzlich Panik; für einen Moment legen selbst Feinde ihre Waffen nieder.",
    "93": "Ein Verrückter oder wahrhaft Inspirierter tanzt mitten im Feuer und ruft, die Götter seien anwesend.",
    "94": "Das Gewölbe über dem Hauptaltar knackt laut und droht jeden Augenblick nachzugeben.",
    "95": "Ein kleiner Schutzgeist, Tempelkobold oder geweihtes Tier führt Retter zu einer eingeschlossenen Gruppe.",
    "96": "Die Flammen verbrennen ein Banner und enthüllen darunter das Symbol eines verdrängten Kultes.",
    "97": "Ein Schrein der Sterne zeigt im Rauch eine Konstellation oder ein Omen, das später wichtig werden könnte.",
    "98": "Die Hitze lässt ein uraltes Siegel brechen, unter dem etwas Verborgenes lag.",
    "99": "Gerade als alles verloren scheint, erklingt aus mehreren Schreinen gleichzeitig ein einziges gemeinsames Gebet.",
    "100": "Mitten im Inferno manifestiert sich für einen Augenblick ein sichtbares Wunder mehrerer niederen Gottheiten zugleich – Wasser, Licht, Wind, Schatten oder Wurzeln greifen ineinander – und verändern den Verlauf des Brandes dramatisch.",
    "id": "ereignisse-tempelbrand",
    "titel": "W100 Ereignisse bei einem Tempelbrand",
    "description": "Dramatische, göttliche, chaotische und rettungsrelevante Ereignisse während eines Feuers in einem großen Vielgöttertempel.",
    "dice": 100,
    "parts": false,
    "header": "Ereignisse"
  },
  "ortsnamen-baukasten.json": {
    "1": [
      "Aben",
      "-au"
    ],
    "2": [
      "Abern",
      "-bach"
    ],
    "3": [
      "Achen",
      "-berg"
    ],
    "4": [
      "Adler",
      "-born"
    ],
    "5": [
      "Ahorn",
      "-bruch"
    ],
    "6": [
      "Alten",
      "-brück"
    ],
    "7": [
      "Amber",
      "-brunn"
    ],
    "8": [
      "Anger",
      "-burg"
    ],
    "9": [
      "Arken",
      "-busch"
    ],
    "10": [
      "Aschen",
      "-damm"
    ],
    "11": [
      "Auen",
      "-dorf"
    ],
    "12": [
      "Bären",
      "-eck"
    ],
    "13": [
      "Berg",
      "-fels"
    ],
    "14": [
      "Bern",
      "-feld"
    ],
    "15": [
      "Birken",
      "-furt"
    ],
    "16": [
      "Blau",
      "-garten"
    ],
    "17": [
      "Blumen",
      "-grund"
    ],
    "18": [
      "Bracken",
      "-grün"
    ],
    "19": [
      "Brand",
      "-hag"
    ],
    "20": [
      "Braun",
      "-hain"
    ],
    "21": [
      "Brom",
      "-halde"
    ],
    "22": [
      "Brunn",
      "-hall"
    ],
    "23": [
      "Buchen",
      "-heim"
    ],
    "24": [
      "Dämmer",
      "-hof"
    ],
    "25": [
      "Dorn",
      "-höhe"
    ],
    "26": [
      "Drachen",
      "-horn"
    ],
    "27": [
      "Dunkel",
      "-kamp"
    ],
    "28": [
      "Eber",
      "-kamm"
    ],
    "29": [
      "Eiben",
      "-klamm"
    ],
    "30": [
      "Eichen",
      "-klippe"
    ],
    "31": [
      "Eisen",
      "-mark"
    ],
    "32": [
      "Elben",
      "-meer"
    ],
    "33": [
      "Erlen",
      "-moor"
    ],
    "34": [
      "Falken",
      "-mühle"
    ],
    "35": [
      "Farn",
      "-rain"
    ],
    "36": [
      "Felsen",
      "-ried"
    ],
    "37": [
      "Fichten",
      "-ruh"
    ],
    "38": [
      "Finster",
      "-sand"
    ],
    "39": [
      "Flammen",
      "-schacht"
    ],
    "40": [
      "Fluss",
      "-scheid"
    ],
    "41": [
      "Forst",
      "-see"
    ],
    "42": [
      "Frost",
      "-senke"
    ],
    "43": [
      "Gold",
      "-spitz"
    ],
    "44": [
      "Grau",
      "-stadt"
    ],
    "45": [
      "Grim",
      "-steg"
    ],
    "46": [
      "Grün",
      "-stein"
    ],
    "47": [
      "Hain",
      "-tal"
    ],
    "48": [
      "Hammer",
      "-thal"
    ],
    "49": [
      "Hasel",
      "-tor"
    ],
    "50": [
      "Hecken",
      "-trift"
    ],
    "51": [
      "Heide",
      "-ufer"
    ],
    "52": [
      "Herbst",
      "-wald"
    ],
    "53": [
      "Hirsch",
      "-wang"
    ],
    "54": [
      "Hoch",
      "-wart"
    ],
    "55": [
      "Holz",
      "-wacht"
    ],
    "56": [
      "Hohen",
      "-weg"
    ],
    "57": [
      "Jade",
      "-weiler"
    ],
    "58": [
      "Jäger",
      "-wiese"
    ],
    "59": [
      "Kalten",
      "-wind"
    ],
    "60": [
      "Kiefer",
      "-winkel"
    ],
    "61": [
      "Klingen",
      "-zell"
    ],
    "62": [
      "Königs",
      "-zelln"
    ],
    "63": [
      "Kupfer",
      "-quell"
    ],
    "64": [
      "Lärchen",
      "-strom"
    ],
    "65": [
      "Licht",
      "-hafen"
    ],
    "66": [
      "Lilien",
      "-kron"
    ],
    "67": [
      "Linden",
      "-ring"
    ],
    "68": [
      "Marder",
      "-graben"
    ],
    "69": [
      "Mistel",
      "-quarz"
    ],
    "70": [
      "Mond",
      "-schlucht"
    ],
    "71": [
      "Moor",
      "-plateau"
    ],
    "72": [
      "Mühlen",
      "-forst"
    ],
    "73": [
      "Nacht",
      "-auwald"
    ],
    "74": [
      "Nebel",
      "-nest"
    ],
    "75": [
      "Nord",
      "-hainen"
    ],
    "76": [
      "Ober",
      "-bruchwald"
    ],
    "77": [
      "Ochsen",
      "-kuppe"
    ],
    "78": [
      "Pilger",
      "-zahn"
    ],
    "79": [
      "Quarz",
      "-sporn"
    ],
    "80": [
      "Quell",
      "-grat"
    ],
    "81": [
      "Raben",
      "-hügel"
    ],
    "82": [
      "Regen",
      "-klippe"
    ],
    "83": [
      "Ried",
      "-torf"
    ],
    "84": [
      "Rosen",
      "-horst"
    ],
    "85": [
      "Rot",
      "-pfad"
    ],
    "86": [
      "Schatten",
      "-ruhen"
    ],
    "87": [
      "Schiefer",
      "-hort"
    ],
    "88": [
      "Silber",
      "-blick"
    ],
    "89": [
      "Sonnen",
      "-felde"
    ],
    "90": [
      "Stahl",
      "-land"
    ],
    "91": [
      "Stein",
      "-reich"
    ],
    "92": [
      "Sturm",
      "-strom"
    ],
    "93": [
      "Tannen",
      "-wasser"
    ],
    "94": [
      "Thorn",
      "-pass"
    ],
    "95": [
      "Ulmen",
      "-bronn"
    ],
    "96": [
      "Wald",
      "-hainwald"
    ],
    "97": [
      "Weiden",
      "-felsen"
    ],
    "98": [
      "Winter",
      "-krone"
    ],
    "99": [
      "Wolf",
      "-acker"
    ],
    "100": [
      "Zedern",
      "-furten"
    ],
    "id": "ortsnamen-baukasten",
    "titel": "W100 Ortsnamen-Baukastentabelle",
    "description": "Zweiteilige W100-Baukastentabelle für Ortsnamen im Mittelalter-Fantasy-Setting. Ein Wurf für das Präfix, ein weiterer für das Suffix.",
    "dice": 100,
    "parts": true,
    "header": [
      "Präfix",
      "Suffix"
    ]
  },
  "ortsnamen.json": {
    "1": [
      "Zum Goldenen Krug",
      "Avaron",
      "Amberfall",
      "Auenfeld",
      "Arkenhall",
      "Aderstrom",
      "Abendkamm",
      "Avarien",
      "Aeloria"
    ],
    "2": [
      "Zum Schlafenden Drachen",
      "Belmoor",
      "Aschfurt",
      "Birkendorf",
      "Aurelstadt",
      "Albenfluss",
      "Adlergrat",
      "Belmoor",
      "Alvaron"
    ],
    "3": [
      "Die Drei Humpen",
      "Caldor",
      "Birkenhain",
      "Bruchheim",
      "Brackenhall",
      "Aschenstrom",
      "Aschenzahn",
      "Caldor",
      "Amarith"
    ],
    "4": [
      "Zum Schwarzen Widder",
      "Durnheim",
      "Dornwacht",
      "Dämmerdorf",
      "Calenburg",
      "Bernfluss",
      "Bärenhorn",
      "Dornmark",
      "Arkenor"
    ],
    "5": [
      "Zur Silbernen Gans",
      "Elmsfelde",
      "Eibenruh",
      "Eberfeld",
      "Durnheim",
      "Birkenlauf",
      "Bernsteinspitze",
      "Eryndor",
      "Avaron"
    ],
    "6": [
      "Zum Roten Hahn",
      "Falkenried",
      "Falkenbrunn",
      "Eichenried",
      "Eberfels",
      "Blauwasser",
      "Blutfels",
      "Falkenmark",
      "Belthara"
    ],
    "7": [
      "Der Krumme Löffel",
      "Grauquell",
      "Graustein",
      "Falkendorf",
      "Eisenfurt",
      "Brunnader",
      "Dornkamm",
      "Graumark",
      "Caledoria"
    ],
    "8": [
      "Zum Alten Wehrturm",
      "Hohenfels",
      "Hohenrain",
      "Fennheim",
      "Falkenstadt",
      "Dornbach",
      "Drachenzahn",
      "Hohenland",
      "Cindorath"
    ],
    "9": [
      "Die Kupferlaterne",
      "Isental",
      "Ilmfurt",
      "Fichtenau",
      "Felsenhain",
      "Eibenfluss",
      "Düsterfels",
      "Isenmark",
      "Damaris"
    ],
    "10": [
      "Zur Trockenen Kehle",
      "Jornwacht",
      "Jägerwald",
      "Forstweiler",
      "Gildenmark",
      "Eisenbach",
      "Ebergrat",
      "Jadekraun",
      "Durnakar"
    ],
    "11": [
      "Zum Goldenen Apfel",
      "Karshain",
      "Kesselmark",
      "Grünbach",
      "Grauwacht",
      "Falkenwasser",
      "Eisenkamm",
      "Karshain",
      "Elarion"
    ],
    "12": [
      "Der Fette Karpfen",
      "Lichtenau",
      "Lichtenquell",
      "Hainfeld",
      "Grünhaven",
      "Fernquell",
      "Falkenspitze",
      "Königsmark",
      "Elyndra"
    ],
    "13": [
      "Zur Letzten Rast",
      "Mondhain",
      "Mondwacht",
      "Haselried",
      "Hafenau",
      "Flutlauf",
      "Feuerzahn",
      "Kaldorien",
      "Erythar"
    ],
    "14": [
      "Zum Hinkenden Ochsen",
      "Nebelbruch",
      "Nebelhain",
      "Heudorf",
      "Helmsbruck",
      "Frostwasser",
      "Frostsporn",
      "Lichtenmark",
      "Falvaris"
    ],
    "15": [
      "Das Braune Pony",
      "Orinth",
      "Osenbruch",
      "Hirschweiler",
      "Hohenfels",
      "Glutbach",
      "Gletscherhorn",
      "Lornheim",
      "Fendoria"
    ],
    "16": [
      "Zur Grünen Linde",
      "Rabenmark",
      "Pilgersteg",
      "Holzdorf",
      "Ilmaris",
      "Goldader",
      "Goldkamm",
      "Morgenland",
      "Galadorn"
    ],
    "17": [
      "Zum Durstigen Kobold",
      "Silberfurt",
      "Quellenruh",
      "Hügelfeld",
      "Jadern",
      "Grauwasser",
      "Grauhorn",
      "Nebelmark",
      "Ghalyra"
    ],
    "18": [
      "Der Salzhafen",
      "Tannwacht",
      "Rotschlucht",
      "Kleeheim",
      "Kaldor",
      "Grünquell",
      "Grünzacke",
      "Nordmark",
      "Graemora"
    ],
    "19": [
      "Zum Eisenfass",
      "Uldheim",
      "Schattenau",
      "Knappendorf",
      "Königsruh",
      "Haderfluss",
      "Haderfels",
      "Orenshain",
      "Halcyr"
    ],
    "20": [
      "Die Brennende Fackel",
      "Valdorn",
      "Steinwiese",
      "Kornau",
      "Königswacht",
      "Hirschlauf",
      "Himmelsgrat",
      "Ostmark",
      "Ilaris"
    ],
    "21": [
      "Zum Mondkrug",
      "Winterhall",
      "Talwacht",
      "Kräuterdorf",
      "Kupferhall",
      "Ilmstrom",
      "Hochfels",
      "Quellheim",
      "Isandria"
    ],
    "22": [
      "Der Schiefe Turm",
      "Ysmark",
      "Ulmenpfad",
      "Krugweiler",
      "Lauerhafen",
      "Jadewasser",
      "Ilmspitze",
      "Riedmark",
      "Jadessar"
    ],
    "23": [
      "Zum Rostigen Schwert",
      "Zornfels",
      "Waldsee",
      "Krummfurt",
      "Lichtentor",
      "Kaltquell",
      "Jorngrat",
      "Silberhain",
      "Karador"
    ],
    "24": [
      "Die Nebelkrähe",
      "Arkenwald",
      "Windbruch",
      "Kupferdorf",
      "Löwentor",
      "Kornbach",
      "Kaiserzahn",
      "Sonnwald",
      "Kharanth"
    ],
    "25": [
      "Zur Trunkenen Eule",
      "Birkental",
      "Zedernruh",
      "Lindenau",
      "Mondbruck",
      "Krähenader",
      "Kalenfels",
      "Sternenmark",
      "Liorath"
    ],
    "26": [
      "Zum Rostigen Anker",
      "Cindor",
      "Quellfurt",
      "Kornheim",
      "Kronwacht",
      "Lichtenlauf",
      "Kaltgrat",
      "Lorenmark",
      "Lorandis"
    ],
    "27": [
      "Zur Lachenden Nixe",
      "Dornau",
      "Rabenstein",
      "Lenzdorf",
      "Lichtenmark",
      "Marderlauf",
      "Klingenberg",
      "Mornthal",
      "Marnakar"
    ],
    "28": [
      "Zum Kupferkessel",
      "Eberquell",
      "Rosenmark",
      "Lindengrund",
      "Mornhafen",
      "Morgenquell",
      "Königsgrat",
      "Norrheim",
      "Myrathis"
    ],
    "29": [
      "Der Trunkene Greif",
      "Finsterried",
      "Schieferau",
      "Moorfurt",
      "Nachtfurt",
      "Nebelwasser",
      "Krähenzacke",
      "Ophira",
      "Navoris"
    ],
    "30": [
      "Zur Bernsteinrose",
      "Goldhain",
      "Silberrain",
      "Ochsenfurt",
      "Nordhall",
      "Nordstrom",
      "Kupferkuppe",
      "Praedor",
      "Nythoria"
    ],
    "31": [
      "Zum Wachsamen Wolf",
      "Harrowind",
      "Sonnenhang",
      "Pilgerheim",
      "Orinsbruck",
      "Osenquell",
      "Löwenzahn",
      "Quarien",
      "Ophirion"
    ],
    "32": [
      "Der Feiste Hecht",
      "Ironthal",
      "Steinfeld",
      "Quellheim",
      "Oberwall",
      "Pilgerstrom",
      "Mondzacke",
      "Rabenwald",
      "Orinthia"
    ],
    "33": [
      "Zum Weißen Eber",
      "Jaderfels",
      "Totenfurt",
      "Nebeldorf",
      "Praedor",
      "Quellwind",
      "Nebelhorn",
      "Rosenwald",
      "Praedoria"
    ],
    "34": [
      "Die Torkelnde Hexe",
      "Kronfurt",
      "Ulmengraben",
      "Riedfeld",
      "Quorheim",
      "Rabenwasser",
      "Nordgrat",
      "Schattenhain",
      "Quendor"
    ],
    "35": [
      "Zum Gespaltenen Helm",
      "Lorenthal",
      "Wachtfels",
      "Rinderau",
      "Rabenwall",
      "Regenlauf",
      "Ophirspitze",
      "Silbermark",
      "Ravendor"
    ],
    "36": [
      "Die Neun Ziegen",
      "Mornheim",
      "Weidensteg",
      "Rothain",
      "Rosengard",
      "Riedstrom",
      "Rabenhorn",
      "Sonnenfels",
      "Rhyndor"
    ],
    "37": [
      "Zum Fahlen Raben",
      "Nordquell",
      "Wintersteg",
      "Schafsteg",
      "Schieferhall",
      "Rosenquell",
      "Regenkuppe",
      "Steinmark",
      "Selvaris"
    ],
    "38": [
      "Der Tanzende Troll",
      "Ostwald",
      "Zinnenruh",
      "Schollenheim",
      "Silberstadt",
      "Schaumfluss",
      "Riesengrat",
      "Sturmwald",
      "Serephor"
    ],
    "39": [
      "Zum Glühenden Huf",
      "Perrinau",
      "Ahornmark",
      "Sonnenweiler",
      "Sonnenwall",
      "Schilfstrom",
      "Rosenfels",
      "Tannland",
      "Silvaron"
    ],
    "40": [
      "Die Flinke Schwalbe",
      "Quelldorn",
      "Brackenfeld",
      "Steinweiler",
      "Steinbruck",
      "Schattenader",
      "Schildgrat",
      "Uldorien",
      "Sorandor"
    ],
    "41": [
      "Der Singende Stein",
      "Rotsenke",
      "Dornrain",
      "Taldorf",
      "Sturmhafen",
      "Silberstrom",
      "Schattenhorn",
      "Valdorn",
      "Stormara"
    ],
    "42": [
      "Zum Elfenbogen",
      "Steinwacht",
      "Eichenwacht",
      "Ulmenau",
      "Tannburg",
      "Sonnenlauf",
      "Silbergrat",
      "Waldheim",
      "Sundarim"
    ],
    "43": [
      "Die Goldene Forelle",
      "Trübersee",
      "Frostquell",
      "Waldheim",
      "Uldenhall",
      "Spiegelbach",
      "Sonnenkuppe",
      "Wintermark",
      "Talandor"
    ],
    "44": [
      "Zum Siebten Stern",
      "Ulmenau",
      "Glutsteg",
      "Wasserau",
      "Valenbruck",
      "Steinquell",
      "Steinzahn",
      "Xeranthia",
      "Thamor"
    ],
    "45": [
      "Der Knurrende Bär",
      "Varnheim",
      "Heidefurt",
      "Wiesengrund",
      "Wellenmark",
      "Sternlauf",
      "Sternenhorn",
      "Ysorien",
      "Uldorim"
    ],
    "46": [
      "Das Grüne Segel",
      "Westmark",
      "Igelhain",
      "Winterheim",
      "Westfurt",
      "Tannenquell",
      "Sturmgrat",
      "Zedoria",
      "Valoria"
    ],
    "47": [
      "Zur Schwarzen Katze",
      "Ylvenau",
      "Jadestein",
      "Wolfsau",
      "Windmark",
      "Tiefwasser",
      "Tannhorn",
      "Abendmark",
      "Velaryn"
    ],
    "48": [
      "Der Honigmond",
      "Zinnenwald",
      "Krähenfurt",
      "Zedernfeld",
      "Ylvenstadt",
      "Trauerfluss",
      "Tiefkuppe",
      "Bernsteinland",
      "Veyrath"
    ],
    "49": [
      "Zum Weißen Hirsch",
      "Aschenfurt",
      "Lerchenfeld",
      "Ackerheim",
      "Zedernhall",
      "Uferstrom",
      "Todesgrat",
      "Drachenmark",
      "Wyrmara"
    ],
    "50": [
      "Das Bernsteinfass",
      "Bromtal",
      "Mühlengraben",
      "Birkenweiler",
      "Aschenburg",
      "Wellenlauf",
      "Uldkamm",
      "Eichenreich",
      "Xandria"
    ],
    "51": [
      "Zum Grünen Kessel",
      "Corvain",
      "Sturmhain",
      "Steinau",
      "Sternenfels",
      "Sturmader",
      "Sturmzahn",
      "Sonnenmark",
      "Thalorien"
    ],
    "52": [
      "Zum Silbernen Becher",
      "Drachenruh",
      "Tannengrund",
      "Tannheim",
      "Sturmwacht",
      "Taunfluss",
      "Talhorn",
      "Sturmreich",
      "Uldareth"
    ],
    "53": [
      "Die Alte Brücke",
      "Eibenhall",
      "Ulmenhof",
      "Uhlenried",
      "Talring",
      "Ulmenstrom",
      "Ulmenkamm",
      "Talandor",
      "Valerion"
    ],
    "54": [
      "Zum Blauen Hirsch",
      "Falkenquell",
      "Veldenau",
      "Weilerau",
      "Torenheim",
      "Velisar",
      "Velenspitze",
      "Uldmark",
      "Vespera"
    ],
    "55": [
      "Die Reisende Kerze",
      "Glutkamm",
      "Waldesruh",
      "Winterried",
      "Velenburg",
      "Waldstrom",
      "Waldkamm",
      "Valoria",
      "Westoria"
    ],
    "56": [
      "Zum Tintenfisch",
      "Hirschau",
      "Xerfall",
      "Ziegenhain",
      "Westmark",
      "Winterwasser",
      "Wintergrat",
      "Westmark",
      "Xeranth"
    ],
    "57": [
      "Zum Verlorenen Stiefel",
      "Immerquell",
      "Ysental",
      "Abendweiler",
      "Winterhall",
      "Zedernquell",
      "Zornspitze",
      "Zorndor",
      "Ysoria"
    ],
    "58": [
      "Zur Mondsichel",
      "Jarnfels",
      "Zedernfurt",
      "Buchenried",
      "Ysandor",
      "Abendstrom",
      "Amberkuppe",
      "Ysland",
      "Zandorim"
    ],
    "59": [
      "Zum Rußigen Schornstein",
      "Königsried",
      "Abendstein",
      "Drosselheim",
      "Amberstadt",
      "Bernsteinlauf",
      "Brackenfels",
      "Amberien",
      "Zorathia"
    ],
    "60": [
      "Die Frohe Keule",
      "Lornsee",
      "Bärenhang",
      "Eibenweiler",
      "Zinnenburg",
      "Dämmerfluss",
      "Caldorhorn",
      "Brackenor",
      "Amberis"
    ],
    "61": [
      "Zur Goldenen Ähre",
      "Marderfurt",
      "Calenau",
      "Furtheim",
      "Bernsteinfurt",
      "Eryndra",
      "Donnergrat",
      "Corvain",
      "Bravaron"
    ],
    "62": [
      "Zum Gebrochenen Speer",
      "Nebelwacht",
      "Dämmerbrunn",
      "Grünweiler",
      "Corvantis",
      "Falkenader",
      "Eibenzacke",
      "Finstermark",
      "Caeloria"
    ],
    "63": [
      "Die Stille Quelle",
      "Oakenhall",
      "Eberfurt",
      "Heckenfeld",
      "Drachenwacht",
      "Glimmerlauf",
      "Falkenkamm",
      "Dämmerland",
      "Duskara"
    ],
    "64": [
      "Zum Roten Turm",
      "Praedor",
      "Fichtenruh",
      "Immenried",
      "Eichenhall",
      "Himmelsquell",
      "Glutkamm",
      "Eibenland",
      "Ebonreach"
    ],
    "65": [
      "Das Mondschaf",
      "Quarnheim",
      "Goldquell",
      "Kaltenau",
      "Flammfurt",
      "Immerfluss",
      "Hochzahn",
      "Grünmark",
      "Feralis"
    ],
    "66": [
      "Zur Taubenkrone",
      "Riedmark",
      "Haderwald",
      "Lärchenheim",
      "Grauburg",
      "Jorstrom",
      "Immerfels",
      "Hirschmark",
      "Glavorn"
    ],
    "67": [
      "Der Alte Zollhof",
      "Sturmfels",
      "Isenklamm",
      "Marderfeld",
      "Hadermark",
      "Kelterbach",
      "Jadekuppe",
      "Immerreich",
      "Highthera"
    ],
    "68": [
      "Der Graue Wolf",
      "Tormund",
      "Klingenrain",
      "Nussdorf",
      "Irongard",
      "Lornfluss",
      "Knochengrat",
      "Jadedor",
      "Iskandor"
    ],
    "69": [
      "Zum Süßen Met",
      "Ulvengrat",
      "Lichtenau",
      "Oberried",
      "Jaspistor",
      "Moorwasser",
      "Lauerfels",
      "Kesselmark",
      "Jhaelor"
    ],
    "70": [
      "Die Weite Treppe",
      "Velisar",
      "Moorgrund",
      "Pflaumenheim",
      "Klingenwall",
      "Nachtfluss",
      "Mondgrat",
      "Lorenwald",
      "Korvath"
    ],
    "71": [
      "Der Kupferne Hahn",
      "Wolfsquell",
      "Nebelsteg",
      "Quendelau",
      "Lorensheim",
      "Ophirstrom",
      "Nebelspitze",
      "Moorreich",
      "Lumeria"
    ],
    "72": [
      "Zum Rauchenden Fass",
      "Xandor",
      "Ochsengrund",
      "Rabenfeld",
      "Marmorhall",
      "Perlfluss",
      "Orinberg",
      "Nordorien",
      "Mythrassa"
    ],
    "73": [
      "Die Lachende Harfe",
      "Ysental",
      "Pappelrain",
      "Schlehdorf",
      "Nordbruck",
      "Quellenwind",
      "Praedorfels",
      "Ostrand",
      "Norathis"
    ],
    "74": [
      "Zum Steinernen Kelch",
      "Zedernmark",
      "Riedwacht",
      "Silberau",
      "Osthafen",
      "Rauschstrom",
      "Quellsporn",
      "Pilgerland",
      "Olyndor"
    ],
    "75": [
      "Der Müde Pilger",
      "Abendhain",
      "Sommerquell",
      "Sommerheim",
      "Pilgerhall",
      "Sommerwasser",
      "Rabenkamm",
      "Quenland",
      "Phaedoria"
    ],
    "76": [
      "Zum Scharlachroten Fuchs",
      "Bärenfels",
      "Grünwacht",
      "Golddorf",
      "Goldhafen",
      "Goldstrom",
      "Graugrat",
      "Goldmark",
      "Goldoria"
    ],
    "77": [
      "Zum Schiefen Schild",
      "Calenfurt",
      "Himmelsrain",
      "Hagendorf",
      "Hohenbrück",
      "Hainfluss",
      "Himmelssporn",
      "Haderland",
      "Hesperon"
    ],
    "78": [
      "Der Eberzahn",
      "Dunkelried",
      "Eisenquell",
      "Igelheim",
      "Isenstadt",
      "Isenlauf",
      "Isengrat",
      "Irondor",
      "Ilyrion"
    ],
    "79": [
      "Zum Zersprungenen Horn",
      "Eryndor",
      "Kranichmoor",
      "Jägerdorf",
      "Jorwacht",
      "Jägerstrom",
      "Jägerhorn",
      "Jornreich",
      "Jorath"
    ],
    "80": [
      "Zum Saffranmond",
      "Felswacht",
      "Lärchenwacht",
      "Kesselried",
      "Kesselburg",
      "Klingenfluss",
      "Kesselzahn",
      "Kronland",
      "Kaledor"
    ],
    "81": [
      "Die Vier Winde",
      "Graumark",
      "Mondensteg",
      "Lerchweiler",
      "Löwenhall",
      "Lerchenlauf",
      "Lichtgrat",
      "Lichtenland",
      "Letharis"
    ],
    "82": [
      "Der Pfeifende Kessel",
      "Hochquell",
      "Nordbrunn",
      "Mühlau",
      "Mondstadt",
      "Mondwasser",
      "Mornzahn",
      "Mondmark",
      "Morvannon"
    ],
    "83": [
      "Zum Messingfalken",
      "Ironshade",
      "Ockerhain",
      "Nesselgrund",
      "Nebelmark",
      "Nebelader",
      "Nordkamm",
      "Nebelreich",
      "Nordrien"
    ],
    "84": [
      "Das Letzte Fass",
      "Jadekamm",
      "Pfauenfeld",
      "Ochsweiler",
      "Oakhall",
      "Ockerstrom",
      "Ockerhorn",
      "Orinthia",
      "Otherys"
    ],
    "85": [
      "Der Graue Mantel",
      "Klingenau",
      "Quarzbach",
      "Pappelried",
      "Purpurheim",
      "Pappelstrom",
      "Pilgerkamm",
      "Purpurmark",
      "Pyranor"
    ],
    "86": [
      "Zum Goldenen Esel",
      "Lyrendorf",
      "Rotkamm",
      "Quellried",
      "Quarzbruck",
      "Quarzlauf",
      "Quarzhorn",
      "Quellmark",
      "Quelthas"
    ],
    "87": [
      "Die Zwölf Kerzen",
      "Moorhain",
      "Salzwind",
      "Rosenau",
      "Rotenhall",
      "Rotsandstrom",
      "Rotenfels",
      "Rotenreich",
      "Rhenoria"
    ],
    "88": [
      "Zur Granatrose",
      "Norrheim",
      "Ophira",
      "Tannwacht",
      "Seidenmark",
      "Silberbach",
      "Schieferhorn",
      "Seidenmark",
      "Solvaron"
    ],
    "89": [
      "Zum Runenstein",
      "Rabenquell",
      "Uferhall",
      "Sauerfeld",
      "Thalburg",
      "Tannstrom",
      "Tannspitze",
      "Thalorien",
      "Talvaria"
    ],
    "90": [
      "Zum Hellen Amboss",
      "Sonnemark",
      "Vierwinkel",
      "Tannengrund",
      "Ulmenstadt",
      "Uferlauf",
      "Uralspitze",
      "Ulvmark",
      "Umberon"
    ],
    "91": [
      "Zum Schimmernden Aal",
      "Thalgrim",
      "Wildau",
      "Uferdorf",
      "Varnheim",
      "Vierquell",
      "Viergrat",
      "Varnor",
      "Vardessa"
    ],
    "92": [
      "Der Schwarze Besen",
      "Umberwald",
      "Yorhain",
      "Vogelried",
      "Waldbruck",
      "Waldader",
      "Waldsporn",
      "Waldor",
      "Wyrandor"
    ],
    "93": [
      "Zum Flüsternden Wald",
      "Vesperau",
      "Zornfurt",
      "Weidenheim",
      "Xenhaven",
      "Windwasser",
      "Windhorn",
      "Westorien",
      "Xaloria"
    ],
    "94": [
      "Das Krumme Rad",
      "Waldruh",
      "Amselried",
      "Wiesenau",
      "Ysmark",
      "Yorstrom",
      "Xerzahn",
      "Xenor",
      "Ysvaris"
    ],
    "95": [
      "Zur Eisernen Möwe",
      "Xeranth",
      "Braunquell",
      "Zedernried",
      "Zorngard",
      "Zornquell",
      "Ysensporn",
      "Yrdor",
      "Zethar"
    ],
    "96": [
      "Der Schlaflose Riese",
      "Yrdor",
      "Dornklamm",
      "Amselheim",
      "Auenstadt",
      "Auenbach",
      "Zedernkuppe",
      "Zedorien",
      "Avarith"
    ],
    "97": [
      "Zur Roten Pflaume",
      "Zorngrat",
      "Ebermark",
      "Braunweiler",
      "Brunnstadt",
      "Braunquell",
      "Amselgrat",
      "Aelmark",
      "Brackenor"
    ],
    "98": [
      "Der Wolf und Krug",
      "Aeloria",
      "Felsengrün",
      "Dornweiler",
      "Dornwall",
      "Drachenlauf",
      "Braunfels",
      "Braunmark",
      "Corandis"
    ],
    "99": [
      "Zum Goldenen Schlaf",
      "Brackenhall",
      "Graubrück",
      "Eberried",
      "Eryndor",
      "Eibenquell",
      "Dämmerhorn",
      "Calenor",
      "Dravaria"
    ],
    "100": [
      "Die Königinnenruhe",
      "Callau",
      "Hohenbrunn",
      "Fichtenheim",
      "Finstermark",
      "Fennfluss",
      "Erynkamm",
      "Dunmark",
      "Everion"
    ],
    "id": "ortsnamen",
    "titel": "Verschiedene Ortsnamen",
    "description": "Direkte W100-Liste fertiger Namen für Tavernen, Städte, Dörfer, Flüsse, Länder, Kontinente, Berge und ähnliches.",
    "dice": 100,
    "parts": true,
    "header": [
      "Taverne",
      "Orte",
      "Dörfer",
      "Städte",
      "Länder",
      "Flüsse",
      "Berge",
      "Länder",
      "Kontinente"
    ]
  },
  "taverne-bauskasten.json": {
    "1": [
      "Goldenen",
      "Krug"
    ],
    "2": [
      "Schlafenden",
      "Drachen"
    ],
    "3": [
      "Roten",
      "Eber"
    ],
    "4": [
      "Schwarzen",
      "Wolf"
    ],
    "5": [
      "Silbernen",
      "Hirsch"
    ],
    "6": [
      "Grünen",
      "Greif"
    ],
    "7": [
      "Durstigen",
      "Bären"
    ],
    "8": [
      "Alten",
      "Anker"
    ],
    "9": [
      "Rostigen",
      "Helm"
    ],
    "10": [
      "Trunkenen",
      "Speer"
    ],
    "11": [
      "Lachenden",
      "Kessel"
    ],
    "12": [
      "Brennenden",
      "Turm"
    ],
    "13": [
      "Hinkenden",
      "Ochsen"
    ],
    "14": [
      "Singenden",
      "Falken"
    ],
    "15": [
      "Bellenden",
      "Hund"
    ],
    "16": [
      "Heulenden",
      "Raben"
    ],
    "17": [
      "Kupfernen",
      "Kelch"
    ],
    "18": [
      "Eisernen",
      "Schild"
    ],
    "19": [
      "Gläsernen",
      "Becher"
    ],
    "20": [
      "Steingrauen",
      "Widder"
    ],
    "21": [
      "Blauen",
      "Mond"
    ],
    "22": [
      "Weißen",
      "Stern"
    ],
    "23": [
      "Grauen",
      "Esel"
    ],
    "24": [
      "Braunen",
      "Hengst"
    ],
    "25": [
      "Müden",
      "Pilger"
    ],
    "26": [
      "Wachsamen",
      "Wächter"
    ],
    "27": [
      "Flinken",
      "Fuchs"
    ],
    "28": [
      "Wilden",
      "Keiler"
    ],
    "29": [
      "Listigen",
      "Kobold"
    ],
    "30": [
      "Pfeifenden",
      "Kater"
    ],
    "31": [
      "Flüsternden",
      "Wald"
    ],
    "32": [
      "Donnernden",
      "Amboss"
    ],
    "33": [
      "Leuchtenden",
      "Funken"
    ],
    "34": [
      "Zersprungenen",
      "Humpen"
    ],
    "35": [
      "Schiefen",
      "Löffel"
    ],
    "36": [
      "Krummen",
      "Nagel"
    ],
    "37": [
      "Runenverzierten",
      "Stein"
    ],
    "38": [
      "Fahlen",
      "Löwen"
    ],
    "39": [
      "Honiggelben",
      "Met"
    ],
    "40": [
      "Nebligen",
      "Morgenstern"
    ],
    "41": [
      "Rußigen",
      "Schornstein"
    ],
    "42": [
      "Süßen",
      "Apfel"
    ],
    "43": [
      "Salzigen",
      "Hafen"
    ],
    "44": [
      "Fernen",
      "Wanderer"
    ],
    "45": [
      "Letzten",
      "Weg"
    ],
    "46": [
      "Ersten",
      "Becher"
    ],
    "47": [
      "Stolzen",
      "Ritter"
    ],
    "48": [
      "Verlorenen",
      "Stiefel"
    ],
    "49": [
      "Gespaltenen",
      "Schädel"
    ],
    "50": [
      "Glühenden",
      "Huf"
    ],
    "51": [
      "Kalten",
      "Brunnen"
    ],
    "52": [
      "Warmen",
      "Herd"
    ],
    "53": [
      "Gesegneten",
      "Hammer"
    ],
    "54": [
      "Vergessenen",
      "König"
    ],
    "55": [
      "Verborgenen",
      "Pfad"
    ],
    "56": [
      "Stummen",
      "Boten"
    ],
    "57": [
      "Tanzenden",
      "Troll"
    ],
    "58": [
      "Scharlachroten",
      "Hahn"
    ],
    "59": [
      "Goldbraunen",
      "Widderkopf"
    ],
    "60": [
      "Bernsteinfarbenen",
      "Fisch"
    ],
    "61": [
      "Dämmerigen",
      "Keller"
    ],
    "62": [
      "Heiteren",
      "Zecher"
    ],
    "63": [
      "Finstern",
      "Riesen"
    ],
    "64": [
      "Sturmumtosten",
      "Mast"
    ],
    "65": [
      "Mondlosen",
      "Himmel"
    ],
    "66": [
      "Sonnenhellen",
      "Saal"
    ],
    "67": [
      "Reisenden",
      "Wagen"
    ],
    "68": [
      "Einsamen",
      "Reiter"
    ],
    "69": [
      "Klirrenden",
      "Beutel"
    ],
    "70": [
      "Klugen",
      "Rabenkopf"
    ],
    "71": [
      "Rotbärtigen",
      "Zwerg"
    ],
    "72": [
      "Glänzenden",
      "Pfennig"
    ],
    "73": [
      "Feisten",
      "Greifen"
    ],
    "74": [
      "Knarrenden",
      "Wagenrad"
    ],
    "75": [
      "Torkelnden",
      "Bock"
    ],
    "76": [
      "Schimmernden",
      "Aal"
    ],
    "77": [
      "Zwielichtigen",
      "Gaukler"
    ],
    "78": [
      "Funkelnden",
      "Rubin"
    ],
    "79": [
      "Gestrandeten",
      "Matrosen"
    ],
    "80": [
      "Verwunschenen",
      "Spiegel"
    ],
    "81": [
      "Stillen",
      "Quell"
    ],
    "82": [
      "Pfeilschnellen",
      "Hasen"
    ],
    "83": [
      "Dunklen",
      "Kellerfass"
    ],
    "84": [
      "Rauchenden",
      "Fass"
    ],
    "85": [
      "Würzigen",
      "Metkrug"
    ],
    "86": [
      "Gebrochenen",
      "Pfeil"
    ],
    "87": [
      "Schweren",
      "Hammerkopf"
    ],
    "88": [
      "Tiefen",
      "Schacht"
    ],
    "89": [
      "Wogenden",
      "Seehund"
    ],
    "90": [
      "Schäumenden",
      "Kelterfass"
    ],
    "91": [
      "Dreiäugigen",
      "Ziegenbock"
    ],
    "92": [
      "Einäugigen",
      "Riesen"
    ],
    "93": [
      "Gescheckten",
      "Hengstkopf"
    ],
    "94": [
      "Purpurnen",
      "Phönix"
    ],
    "95": [
      "Winterkalten",
      "Kamin"
    ],
    "96": [
      "Sommerwarmen",
      "Garten"
    ],
    "97": [
      "Blutroten",
      "Dolch"
    ],
    "98": [
      "Sanften",
      "Wind"
    ],
    "99": [
      "Fröhlichen",
      "Spielmann"
    ],
    "100": [
      "Königlichen",
      "Greifenkopf"
    ],
    "id": "taverne-baukasten",
    "titel": "W100 Taverne-Baukastentabelle",
    "description": "Zweiteilige W100-Baukastentabelle für Tavernen- und Gasthausnamen. Ein Wurf für das beschreibende Wort, ein weiterer für das Substantiv.",
    "dice": 100,
    "parts": true,
    "header": [
      "Adjektiv",
      "Substantiv"
    ]
  },
  "traeume-athene+poseidon.json": {
    "1": "Du stehst auf einer Klippe über schwarzem Meer, während eine Eule auf deinem Schild sitzt und in die Brandung blickt, als erwarte sie dort einen Feind.",
    "2": "Ein bärtiger König legt dir schweigend eine Hand auf die Schulter, doch sein Schatten endet in einem gebrochenen Speer.",
    "3": "Du wanderst durch brennende Mauern, ohne ihren Namen zu kennen, während hinter dir ein einzelner Helm im Staub zurückbleibt.",
    "4": "Athene reicht dir einen Speer aus weißem Licht, doch Poseidon zieht mit einer Welle an seinem Schaft.",
    "5": "Du siehst einen Palast aus Ithaka-Stein, aber seine Türen öffnen sich direkt in die Ruinen einer fremden Stadt.",
    "6": "Ein Mann mit müden Augen nennt dich Sohn, während hinter ihm das Meer Lügner zischt.",
    "7": "In deinem Traum kniest du vor einem Altar der Athene, doch das Weihwasser schmeckt nach Salz.",
    "8": "Du siehst einen kleinen Jungen auf einem Schlachtfeld, der von zwei Männern zugleich fortgetragen wird: einem Sieger und einem Toten.",
    "9": "Eine Eule sitzt auf einer zerbrochenen trojanischen Mauer und blickt dich an, als kenne sie deinen wahren Namen.",
    "10": "Du hältst ein Schwert in der Hand, aber im Metall spiegeln sich nicht dein Gesicht, sondern die Züge eines gefallenen Prinzen.",
    "11": "Poseidon schickt dir im Traum ein Schiff ohne Ruder, auf dem nur ein Speer und ein Kinderumhang liegen.",
    "12": "Du stehst im Hof eines Palastes, während Athene mit Kreide eine Linie zieht, die du niemals überschreiten sollst.",
    "13": "Ein Mann mit der Stimme des Odysseus, aber ohne Gesicht, sagt: Fernhalten heißt nicht vergessen.",
    "14": "Du siehst ein hölzernes Pferd, doch aus seinem Inneren dringen keine Krieger, sondern Kinderweinen und Gebete.",
    "15": "Ein goldener Helm rollt über Marmorboden und bleibt vor deinen Füßen liegen; im Inneren steht nur ein Name, den du nicht lesen kannst.",
    "16": "Du gehst durch ein Labyrinth aus Schiffstauen, das in einer trojanischen Thronhalle endet.",
    "17": "Athene setzt dir einen Lorbeerkranz auf, der sich langsam in einen Kranz aus Speerspitzen verwandelt.",
    "18": "Im Traum liegt Ithaka friedlich im Morgenlicht, doch unter der Insel pocht etwas wie ein schlafendes Herz aus Zorn.",
    "19": "Du kämpfst gegen Wellen mit Schild und Schwert, bis die See selbst deinen Kampfstil annimmt.",
    "20": "Ein fremder Greis nennt dich Erbe zweier Niederlagen und verschwindet im Nebel.",
    "21": "Du siehst Odysseus auf einem Thron sitzen, doch statt eines Zepters hält er eine zerbrochene Kinderkette in der Hand.",
    "22": "Eine Stimme flüstert: Nicht der, der dich zeugte, formte dich – aber Blut merkt sich seinen Weg.",
    "23": "Du gehst durch eine Bibliothek der Athene, in der alle Karten nach Troja führen, selbst jene von Ithaka.",
    "24": "Poseidon schlägt mit seinem Dreizack ins Meer, und jede Welle trägt dir ein anderes Gesicht deines Vaters zu.",
    "25": "Du stehst vor einem Grab ohne Namen, aber mit trojanischen Löwen und ithakischen Olivenzweigen verziert.",
    "26": "Im Traum ruft dich jemand vom Deck eines Schiffes, doch du erkennst nicht, ob es ein Vater oder ein Feind ist.",
    "27": "Eine Eule hackt auf einen bronzenen Helm ein, bis darunter schwarzes Pferdehaar zum Vorschein kommt.",
    "28": "Du siehst dich selbst als Kind an Odysseus’ Tisch sitzen, während eine unsichtbare Hand im Hintergrund Orakelscherben ordnet.",
    "29": "Athene spricht mit sanfter Stimme zu dir, doch hinter ihr türmt sich eine Sturmflut auf.",
    "30": "Du trägst eine Standarte durch eine Stadt aus Feuer; vorn prangt Ithakas Zeichen, auf der Rückseite Trojas.",
    "31": "In deinem Traum gibt dir Odysseus ein Messer mit der Warnung: Nicht alles, was schneidet, ist Verrat.",
    "32": "Du findest am Strand einen Kinderschild mit dem trojanischen Pferd darauf – und weißt nicht, warum er dir vertraut vorkommt.",
    "33": "Poseidons Tempel ist leer, nur eine nasse Spur führt zu einem Altar der Athene.",
    "34": "Ein geflügelter Helm liegt auf einem Kissen, aber als du ihn aufsetzt, hörst du Kampfgeschrei aus einer brennenden Stadt.",
    "35": "Du siehst Penelope im Traum einen Mantel weben, in dessen Muster sich Stadtmauern und Wellen umeinander winden.",
    "36": "Ein blinder Seher zeigt auf dich und sagt: Geliebt, gesandt und gefürchtet.",
    "37": "Du stehst an einer Weggabelung: links ein Palast unter Olivenbäumen, rechts eine Stadt aus Asche und Gold.",
    "38": "Odysseus umarmt dich im Traum, doch zwischen euch steckt ein Speer im Boden.",
    "39": "Eine Eule fliegt über das Meer und verliert Federn, die als kleine Schiffe ins Wasser fallen.",
    "40": "Du hörst im Schlaf eine Frauenstimme sagen: Weisheit schützt nicht vor dem Preis der Wahrheit.",
    "41": "Ein Prinz in trojanischer Rüstung kniet vor dir und nimmt seinen Helm ab – darunter ist dein Gesicht.",
    "42": "Du wachst im Traum in einem fremden Bett auf, während draußen zugleich Meeresrauschen und Schlachttrommeln erklingen.",
    "43": "Athene zeigt dir ein Schachbrett aus Schwarz und Gold; die letzte Figur trägt deinen Namen.",
    "44": "Poseidon zieht mit einem Finger eine Furche durchs Meer, die sich in eine Narbe auf deiner Brust verwandelt.",
    "45": "Du siehst Odysseus als jungen Mann aus Troja treten, mit einem Bündel im Arm und Tränen im Blick.",
    "46": "In deinem Traum ist dein Schild halb Eule, halb springender Delphin, und beide Seiten streiten miteinander.",
    "47": "Ein unvollendetes Fresko zeigt den Fall Trojas, doch die wichtigste Figur wurde herausgeschlagen.",
    "48": "Du wanderst durch einen Tempel voller Statuen der Athene; in jeder steht ein anderer möglicher Vater.",
    "49": "Auf einem Tisch liegen zwei Brote: eins mit Oliven bestreut, eins mit Granatapfelkernen; du darfst nur eines nehmen.",
    "50": "Poseidon flüstert dir zu: Selbst die Weisheit hat Grenzen, wenn sie dem Meer trotzt.",
    "51": "Du träumst von einem Eid, den Odysseus vor Athene schwor, während er dich als Säugling im Arm hielt.",
    "52": "Ein alter Helm aus Troja ist innen mit ithakischen Segensformeln beschrieben.",
    "53": "Du stehst in voller Rüstung vor einem Kind, das sich als Odysseus und Hektor zugleich entpuppt.",
    "54": "Eine Eule sitzt auf dem Mast eines Schiffes, bis eine Welle sie fortreißt und sie als Speer wieder auftaucht.",
    "55": "Du gehst durch die Überreste einer Schlacht und findest nur zwei unversehrte Dinge: ein Spielzeug und einen Eidring.",
    "56": "Athene hält dir einen Spiegel hin; darin siehst du keinen Helden, sondern eine Entscheidung.",
    "57": "Im Traum nennt dich ein Chor trojanischer Frauen Wiederkehr, während ithakische Stimmen Untergang singen.",
    "58": "Du stehst auf einer Stadtmauer und weißt nicht, ob du sie verteidigen oder stürmen sollst.",
    "59": "Odysseus sitzt allein beim Feuer und liest eine Prophezeiung, die jedes Mal in Flammen aufgeht, wenn du näherkommst.",
    "60": "Ein Mann mit edlen trojanischen Zügen legt dir schweigend einen Umhang um, bevor ihn das Meer verschluckt.",
    "61": "Poseidons Zorn zeigt sich als Schiffsfriedhof, in dem nur dein Name unversehrt in Holz geritzt ist.",
    "62": "Du siehst ein Schwert, das in der Erde Ithakas steckt, doch seine Klinge ist aus trojanischer Bronze.",
    "63": "Athene führt dich in einen Garten aus Olivenbäumen, unter deren Wurzeln Helme und Knochen liegen.",
    "64": "Ein Kind fragt dich im Traum: Wenn du wüsstest, wessen Sohn du bist – wen würdest du verraten?",
    "65": "Du gehst durch Ithakas Hallen, aber alle Diener tragen trojanische Trauerbinden.",
    "66": "Eine Eule pickt eine Muschel auf und darin findest du das Bild einer brennenden Stadt.",
    "67": "Du träumst, Odysseus schickt dich auf Reise, doch jeder Weg zurück zum Palast wird von Wellen verschlungen.",
    "68": "In einer bronzenen Schale liest Athene deine Zukunft: Ruhm, Wahrheit, Verlust und einen sterbenden König.",
    "69": "Poseidon erhebt sich aus dem Meer und spricht nicht zu dir, sondern zu Athene: Dies ist dein Spielstein.",
    "70": "Ein trojanischer Speer steckt im Boden eines ithakischen Tempels, und niemand außer dir scheint ihn zu sehen.",
    "71": "Du sitzt am Bankett mit Odysseus, doch jeder leere Stuhl ist mit dem Namen eines Gefallenen beschriftet.",
    "72": "Im Traum küsst dich eine Frau aus Licht auf die Stirn und sagt: Du bist geliebt, auch wenn Liebe Furcht kennt.",
    "73": "Ein Schatten mit der Haltung Hektors trainiert dich schweigend im Schwertkampf, ohne sich je umzudrehen.",
    "74": "Athene schreibt ein einziges Wort auf deinen Schild, aber Salzwasser löscht es immer wieder aus.",
    "75": "Du findest ein trojanisches Kinderamulett in deiner Reisetasche, obwohl du es niemals besessen hast.",
    "76": "Poseidon lässt im Traum einen Palast überfluten, doch nur ein Kinderzimmer bleibt trocken.",
    "77": "Ein Orakel ruft: Der Sohn, der nicht bleiben durfte, wird einst zurückkehren, wenn es zu spät ist.",
    "78": "Du stehst vor Odysseus, der eine Krone trägt, die langsam zu einem Dornenreif aus Schiffsnägeln wird.",
    "79": "Im Traum hält Athene deine Hand, während du über das Meer gehst, aber hinter dir ziehen Ketten durchs Wasser.",
    "80": "Du hörst das Wort Vater aus zwei Richtungen zugleich: vom Meer und von einer brennenden Mauer.",
    "81": "Eine Eule landet auf einem trojanischen Standbild und verwandelt es in einen Wegweiser nach Ithaka.",
    "82": "Du träumst von einem letzten Gespräch mit Odysseus, das nie stattgefunden hat, aber wie Erinnerung schmerzt.",
    "83": "Ein kleines Holzpferd schwimmt in einer Pfütze, die sich zu einem Ozean ausweitet.",
    "84": "Poseidon zeigt dir eine Insel aus Knochen und sagt: Dort enden List und Weisheit.",
    "85": "Du kniest in einem Tempel der Athene, doch der Boden unter dir ist aus Schiffsplanken gebaut.",
    "86": "Ein Mann in trojanischer Rüstung legt dir schweigend die Hand aufs Herz, und du spürst dieselbe Geste von Odysseus’ Hand darüber.",
    "87": "Im Traum steht Penelope zwischen dir und einer verschlossenen Tür und webt mit Tränen eine Grenze.",
    "88": "Athene zeigt dir einen Speer, der nur dann gerade ist, wenn du ihn gegen dich selbst richtest.",
    "89": "Du siehst einen Thronsaal, in dem jeder Rat von Eulen begleitet wird, aber durch jede Säule Meerwasser sickert.",
    "90": "Ein Greifvogel trägt einen blutigen Helm über das Meer, bis er ihn vor einem Altar niederlegt.",
    "91": "Odysseus ruft dich mein Sohn, während hinter ihm eine unsichtbare Stimme nicht nur ergänzt.",
    "92": "Du träumst von einem Turnier, in dem du gegen einen unbekannten trojanischen Ritter kämpfst, der deine Bewegungen genau kennt.",
    "93": "Poseidon zerbricht im Traum eine Statue der Athene, doch aus den Trümmern wächst ein Olivenbaum.",
    "94": "Du stehst auf einem Schiff zwischen Ithaka und Troja, und beide Küsten entfernen sich gleichzeitig von dir.",
    "95": "Ein altes Orakel schreibt deinen Namen neben den eines Königs und eines gefallenen Helden.",
    "96": "Athene sagt: Wahrheit ist keine Klinge. Sie ist das, was bleibt, wenn Klingen brechen.",
    "97": "Du siehst Odysseus am Ende seines Lebens, allein am Ufer, und hinter dir fällt der Schatten eines Speers auf ihn.",
    "98": "Eine Eule und ein Seepferd ziehen in entgegengesetzte Richtungen an deinem Mantel, bis der Stoff reißt.",
    "99": "Im Traum öffnet sich endlich die letzte Tür: Dahinter stehen Odysseus, Hektor und Athene schweigend nebeneinander.",
    "100": "Du stehst auf den Mauern einer namenlosen Stadt über einem sturmgepeitschten Meer. Athene legt dir die Hand auf die Schulter, Poseidons Wellen schlagen gegen das Fundament, und zwei Stimmen – die eines liebenden Vaters und die eines gefallenen Helden – sagen zugleich: Du wirst entscheiden, was von uns bleibt.",
    "id": "traeume-athene+poseidon",
    "titel": "Traumtabelle für den Konflikt zwischen Athene und Poseidon",
    "description": "Träume eines für Astyax mit Bezug auf Athene, Poseidon, Ethaka, verborgener Herkunft und Prophezeihungen.",
    "dice": 100,
    "parts": false,
    "header": "Träume"
  },
  "traeume-druidin.json": {
    "1": "Du sitzt als Kind auf einem moosigen Stein, während deine Oma dir zeigt, wie man das Flüstern junger Birken von gewöhnlichem Wind unterscheidet.",
    "2": "Ein Rotkehlchen landet auf deinem Finger und singt dieselbe Melodie, mit der deine Oma dich früher zum Lernen rief.",
    "3": "Du läufst barfuß durch taunasses Gras und findest die winzigen Spuren deiner Eltern, die irgendwo am Horizont in einen Waldpfad übergehen.",
    "4": "Eine uralte Eiche öffnet in ihrer Rinde zwei Augen und fragt dich, ob du noch weißt, welcher Pilz heilt und welcher nur schöne Lügen erzählt.",
    "5": "Deine Oma braut Tee aus Farnspitzen und Mondblüten, und jede Tasse zeigt dir kurz einen anderen Ort, an dem deine Eltern gerade lagern könnten.",
    "6": "Du schläfst in einem Nest aus Klee und Moos, während Glühwürmchen über dir Sternbilder in Form von Tieren zeichnen.",
    "7": "Ein Dachs mit silberner Nase führt dich zu einem verborgenen Hain, in dem jeder Stein nach Regen riecht.",
    "8": "Du hörst das Lachen deiner Eltern zwischen den Bäumen, aber als du ihnen nachgehst, findest du nur einen Kreis aus Pilzen und frische Haselblätter.",
    "9": "Eine Schnecke trägt ein winziges Haus auf ihrem Rücken, das genauso aussieht wie die Hütte deiner Oma.",
    "10": "Deine Oma legt dir Erde in die Hand und sagt, dass jede gute Druidin zuerst lernen müsse zuzuhören, bevor sie spricht.",
    "11": "Du siehst einen Fluss, in dem die Fische als kleine Lichter stromaufwärts schwimmen und dabei Geschichten aus fernen Ländern summen.",
    "12": "Ein Fuchs schläft zusammengerollt in deinem Schoß, während am Waldrand zwei vertraute Gestalten weiterziehen, ohne sich umzudrehen.",
    "13": "Zwischen Baumwurzeln wächst ein Kranz aus Pilzen, und in jeder Kappe spiegelt sich ein anderer Abend mit deiner Oma.",
    "14": "Du schwebst auf einem großen Ahornblatt über eine endlose Waldlandschaft, in der irgendwo das Lagerfeuer deiner Eltern blinkt.",
    "15": "Eine Kröte mit freundlichen Augen trägt einen kleinen Wanderstab im Maul und legt ihn dir feierlich zu Füßen.",
    "16": "Der Wind webt aus Birkenpollen ein Gesicht, das deiner Oma ähnelt, und nickt dir still zu.",
    "17": "Du pflanzt Samen in einen schwarzen Boden, und aus jedem wächst sofort ein winziger Baum mit goldenen Blättern.",
    "18": "Ein Eichhörnchen stiehlt dir im Traum eine Nuss und versteckt sie in einem alten Zauberbuch deiner Oma.",
    "19": "Deine Eltern winken dir von einem Hügel aus zu, doch zwischen euch wächst in Sekunden ein ganzer Wald empor.",
    "20": "Ein alter Hirsch senkt sein Geweih, damit du daran kleine Windspiele aus Eicheln und Federn hängen kannst.",
    "21": "Du folgst einem Bachlauf aus klarem Wasser, in dem die Kiesel wie kleine Monde leuchten.",
    "22": "Deine Oma sitzt auf einem Baumstumpf und schnitzt aus Rinde winzige Tierfiguren, die danach lebendig davonlaufen.",
    "23": "Ein ganzer Schwarm Schmetterlinge trägt Brieffetzen durch den Wald; auf jedem steht nur ein einziges Wort in der Handschrift deiner Eltern.",
    "24": "Du schlägst ein Zelt aus Farnen auf, und das Zelt summt nachts leise dieselben Schlaflieder wie früher deine Oma.",
    "25": "Eine Eule bringt dir im Traum einen glatten Stein, in dem die Sterne des letzten Herbstes eingeschlossen sind.",
    "26": "Du gehst durch einen Regen aus Blütenblättern, die sich auf deiner Haut in kleine grüne Runen verwandeln.",
    "27": "Ein Baumstamm öffnet sich wie eine Tür und zeigt dir das geheime Vorratsversteck deiner Oma für Kräuter und Honig.",
    "28": "Im Mondlicht tanzen Dachse, Hasen und Füchse in einem Kreis und lassen dir höflich einen Platz frei.",
    "29": "Du findest einen Pfad aus Pilzkreisen, der dich immer wieder zu demselben friedlichen Teich zurückführt.",
    "30": "Deine Eltern sitzen an einem fernen Lagerfeuer und rösten Kastanien, während ihre Schatten wie wandernde Bäume aussehen.",
    "31": "Du hörst unter der Erde das langsame Murmeln von Wurzeln, die einander Geschichten aus dem letzten Jahrhundert erzählen.",
    "32": "Deine Oma zeigt dir, wie man Tau von Spinnenweben sammelt, ohne das Netz zu beschädigen.",
    "33": "Eine Wildkatze bringt dir ein Bündel Kräuter, das genau die Mischung enthält, die deine Oma immer für Fieber nutzte.",
    "34": "Ein Biber baut einen Damm aus bunten Herbstblättern statt aus Holz und nickt stolz, als du ihn lobst.",
    "35": "Du sitzt auf einem riesigen Pilz und blickst über einen Wald, der sich mit jedem Atemzug in eine andere Jahreszeit verwandelt.",
    "36": "Ein Kranich zieht über dich hinweg und lässt eine einzelne silberne Feder fallen, die nach Morgentau duftet.",
    "37": "Der Boden unter deinen Füßen wird weich wie Moos und trägt dich wie ein Bett durch einen stillen Hain.",
    "38": "Du findest einen Korb voller Beeren, den deine Oma für dich gepackt haben muss, obwohl niemand zu sehen ist.",
    "39": "Ein Regenbogen endet nicht am Himmel, sondern beginnt an den Wurzeln einer uralten Weide.",
    "40": "Du siehst deine Eltern auf einem Boot aus Schilf einen Fluss hinabfahren, begleitet von Fischottern.",
    "41": "Ein Igel trägt Apfelblüten auf seinen Stacheln und verbeugt sich, als hätte er eine wichtige Botschaft für dich.",
    "42": "Deine Oma bittet dich, den Unterschied zwischen stiller Erde und schlafender Erde zu ertasten.",
    "43": "Ein Schwarm kleiner Frösche hüpft im Takt eines Liedes, das du aus deiner Kindheit kennst.",
    "44": "Du schläfst im Geäst einer alten Eiche, während Spechte in der Rinde Muster klopfen wie druidische Schriftzeichen.",
    "45": "Eine Wolke in Form eines Kaninchens zieht tief über den Boden und frisst im Vorbeiziehen Klee.",
    "46": "Du sammelst Pilze mit deiner Oma, aber jeder Pilz enthält beim Umdrehen einen winzigen Sternenhimmel auf seiner Unterseite.",
    "47": "Ein Bach spricht mit der Stimme deiner Mutter und lacht über einen Witz, den nur eure Familie kennt.",
    "48": "Ein Fuchs und eine Krähe streiten sich freundlich darüber, wer dich zuerst zu einem versteckten Hain führen darf.",
    "49": "Du siehst deinen alten Lernplatz im Wald, doch jede Wurzel ist inzwischen von sanft leuchtendem Moos bedeckt.",
    "50": "Eine Libelle mit smaragdgrünen Flügeln kreist dreimal um deinen Kopf und fliegt dann in Richtung Sonnenaufgang davon.",
    "51": "Deine Oma lässt Samen aus ihrer Tasche auf den Boden rieseln, und aus jedem wächst ein anderer heiliger Baum.",
    "52": "Ein Kreis aus Pilzen hebt sich wie kleine Hocker aus dem Boden, als warte der Wald auf ein Gespräch mit dir.",
    "53": "Du hörst das entfernte Horn deiner Eltern, doch statt Echo antworten Waldvögel in derselben Tonfolge.",
    "54": "Ein alter Hirsch führt dich zu einer Quelle, in deren Wasser du dich als kleines Kind mit schlammigen Knien siehst.",
    "55": "Zwischen Farnen liegt ein kleiner geschnitzter Löffel, genau wie der, mit dem deine Oma Heiltränke umrührte.",
    "56": "Eine Weinbergschnecke zieht eine silberne Spur, die sich als Karte eines unbekannten Waldes entpuppt.",
    "57": "Du pflückst Holunderbeeren, und jede einzelne enthält für einen Herzschlag ein Bild deiner Eltern auf Reisen.",
    "58": "Ein Hase sitzt vor dir und wäscht sich mit solcher Ernsthaftigkeit, als vollführe er ein Ritual.",
    "59": "Die Sterne sinken tief zwischen die Äste herab, bis du sie wie leuchtende Früchte pflücken könntest.",
    "60": "Deine Oma steckt dir eine Eichel in die Tasche und sagt, dass man manche Wege erst versteht, wenn man selbst Wurzeln schlägt.",
    "61": "Ein Wasserfall rauscht rückwärts nach oben und füllt die Wolken neu mit Regen.",
    "62": "Du siehst zwei kleine Lichter durch einen dunklen Wald wandern und erkennst in ihnen die Laternen deiner Eltern.",
    "63": "Ein alter Rabe spricht nur in Namen von Bäumen und scheint zu erwarten, dass du antwortest.",
    "64": "Auf einer Wiese schlafen Rehe, Kaninchen und Füchse friedlich nebeneinander, als gäbe es keine Angst in der Welt.",
    "65": "Du lernst im Traum, wie man aus drei Grashalmen und einem Tautropfen einen Segenszauber webt.",
    "66": "Eine Weide beugt sich tief zu dir hinunter, damit du in ihrem Spiegelbild unter den Wurzeln den Himmel sehen kannst.",
    "67": "Deine Oma hat aus Kräutern kleine Figuren deiner Eltern gebunden und setzt sie auf einen Fensterstock im Morgenlicht.",
    "68": "Ein Dutzend Glühwürmchen bildet den Umriss eines gemütlichen Wagens, wie ihn deine Eltern auf Reisen nutzen könnten.",
    "69": "Du folgst den Spuren eines Dachses und findest statt eines Baus eine Bibliothek aus Rinde, Blättern und Stein.",
    "70": "Ein Eichhörnchen vergräbt vor dir eine Nuss und ein winziges silbernes Glöckchen, als wären beide gleich wertvoll.",
    "71": "Im Traum regnet es nur auf einen einzigen Kreis aus Wildblumen, während ringsum die Luft trocken bleibt.",
    "72": "Du riechst frisches Brot und feuchte Erde und findest deine Oma an einem Lehmofen mitten im Wald.",
    "73": "Eine Schlange häutet sich, und aus der alten Haut wird ein flatterndes Band aus Farnen und Moos.",
    "74": "Du siehst ein Lager deiner Eltern, verlassen nur für einen Augenblick, während ein neugieriger Waschbär darin nach Keksen sucht.",
    "75": "Ein Specht hämmert drei klare Schläge an einen Baum, und daraufhin öffnen sich alle Tannenzapfen im Hain gleichzeitig.",
    "76": "Ein Murmeltier trägt eine kleine Reisetasche und sieht dabei so entschlossen aus, dass du lachen musst.",
    "77": "Die Blumen eines ganzen Feldes drehen sich nachts zum Mond statt zur Sonne.",
    "78": "Deine Oma streicht dir Erde über die Stirn und sagt, dass jede Druidin einmal von der Welt selbst gesegnet werden müsse.",
    "79": "Ein Koi schwimmt durch die Luft wie durch Wasser und hinterlässt schimmernde Tropfen, die zu Margeriten werden.",
    "80": "Du wanderst durch einen Wald, in dem jeder Baum die Rinde eines anderen Baumes trägt.",
    "81": "Ein Bär schläft schnarchend in einem Bett aus Moos und lässt sich nicht einmal von tanzenden Mäusen stören.",
    "82": "Du hörst deine Eltern eine Geschichte am Feuer erzählen, doch nur die Tiere des Waldes lauschen ihnen.",
    "83": "Eine Spinne webt ihr Netz zwischen zwei Geweihspitzen, und das Netz zeigt den Verlauf der Jahreszeiten.",
    "84": "Du hältst eine Handvoll Waldboden und spürst darin das ruhige Pulsieren von Regenwürmern, Wurzeln und schlafenden Samen.",
    "85": "Deine Oma zeichnet mit einem Stock Kreise in den Schlamm und jeder Kreis wird zu einem kleinen Teich.",
    "86": "Ein Schwarm Bienen summt im Takt deines Herzschlags und baut aus Licht einen goldenen Honigkamm in die Luft.",
    "87": "Du findest einen Wanderstab, der bereits Knospen trägt, als würde er noch immer wachsen.",
    "88": "Ein Reh tritt aus dem Unterholz und trägt um den Hals eine kleine Schnur mit einer Feder deiner Mutter und einem Knopf deines Vaters.",
    "89": "Ein Flussarm trocknet aus und wird sofort zu einem Weg aus glatten, sonnenwarmen Steinen.",
    "90": "Du schläfst im Schoß einer alten Eiche, und die Blätter über dir erzählen dir die Namen aller Winde.",
    "91": "Ein Marder bringt dir einen glänzenden Kiesel und erwartet offensichtlich, dass du ihn gegen etwas ebenso Schönes tauschst.",
    "92": "Die Schatten von Bäumen lösen sich im Mondlicht von ihren Stämmen und gehen still spazieren.",
    "93": "Deine Oma zeigt dir einen Garten, in dem jede Heilpflanze nur dann blüht, wenn man ihr freundlich guten Morgen sagt.",
    "94": "Du siehst die Stiefelabdrücke deiner Eltern im Schnee, doch aus jedem Abdruck wächst sofort ein Krokus.",
    "95": "Ein alter Uhu hockt auf einem Wegweiser, dessen Pfeile statt Orten nur Jahreszeiten anzeigen.",
    "96": "Du pflückst im Traum Beeren, und jede schmeckt nach einem anderen Ort, den du noch nicht bereist hast.",
    "97": "Ein sanfter Sommerregen fällt auf ein Spinnennetz und verwandelt es in eine glitzernde Harfe.",
    "98": "Deine Oma sitzt an einer Quelle und sagt, dass man verlorene Menschen manchmal am besten findet, indem man zuerst dem Wasser dankt.",
    "99": "Ein ganzer Wald neigt sich im Wind wie zu einer Verbeugung vor dir, und für einen Moment fühlst du dich vollkommen zuhause.",
    "100": "Du stehst in einem uralten Hain, in dem deine Oma, deine Eltern und zahllose Tiere schweigend auf dich warten; als die Sonne aufgeht, beginnen alle Bäume gleichzeitig zu blühen.",
    "id": "traeume-druidin",
    "titel": "Traumtabelle für eine Gnom-Druidin",
    "description": "Naturverbundene Träume von Jade über ihre Oma und ihre Eltern.",
    "dice": 100,
    "parts": false
  },
  "traeume-hera.json": {
    "1": "Du stehst in einer marmorgepflasterten Halle, während eine goldgekrönte Frau mit Pfauenfedern im Haar auf einem Thron aus Drachenschuppen sitzt. Hinter ihr schläft etwas Gewaltiges unter schwarzen Tüchern.",
    "2": "Du siehst dein Familienwappen an einer Burgmauer, doch bei jedem Windstoß verwandelt es sich abwechselnd in einen Drachenkopf und ein tarrasquenartiges Auge.",
    "3": "In deinem Traum läufst du durch einen Hochzeitssaal aus weißem Stein. Unter dem Boden hörst du langsames, tiefes Atmen wie von einem eingesperrten Titan.",
    "4": "Hera legt dir ein Zepter in die Hand, doch als du es greifst, entpuppt es sich als gewaltige Klaue.",
    "5": "Du stehst vor einem Nest aus Gold, Marmor und Knochen. Darin liegen ein Drachenei und ein steinernes Ei, beide warm.",
    "6": "Eine Stimme ruft deinen Familiennamen in einer Sprache, die wie Donner und zischender Atem zugleich klingt.",
    "7": "Du siehst einen langen Banketttisch mit deinen Ahnen. Jeder trägt Kronen, aber einer trägt stattdessen Hörner aus Knochen.",
    "8": "Ein Pfau schreitet durch eine verbrannte Ebene und pickt aus der Asche eine einzelne Drachenkralle hervor.",
    "9": "Du kniest vor einem Herdfeuer, das plötzlich auflodert und die Form eines aufgerissenen Tarrasquenmauls annimmt.",
    "10": "In einer stillen Kapelle der Hera hängt ein Banner, das aus Drachenhaut gefertigt scheint, aber heilig leuchtet.",
    "11": "Du gehst durch den Ahnensaal und alle Porträts haben plötzlich Reptilienaugen.",
    "12": "Eine Königin mit dem Gesicht deiner Mutter trägt einen Schleier aus Schuppen und Tränen.",
    "13": "Du träumst von einer goldenen Krone, die viel zu schwer ist, weil im Inneren kleine Zähne wachsen.",
    "14": "In einem Rosengarten aus weißem Stein windet sich ein junger Drache um eine alte Familienstatue.",
    "15": "Du hörst ein Urteil, gesprochen von Hera selbst, aber statt Worten fallen Schuppen auf den Boden.",
    "16": "Deine Hand liegt auf einem heiligen Eidbuch, doch die Seiten bestehen aus gehärteter Monsterhaut.",
    "17": "Du siehst einen Drachen, der über eure Burg wacht, doch sein Schatten ist viel größer als sein Körper und erinnert an etwas urzeitlich Monströses.",
    "18": "Ein gewaltiger Fußtritt erschüttert deinen Traum, und Weinbecher zerspringen in einer königlichen Halle.",
    "19": "Du gehst in Rüstung durch einen Tempel der Hera, doch in den Nischen schlafen an Ketten gelegte Bestien.",
    "20": "Eine goldene Tür mit zehn Schlössern trägt die Inschrift: Die Familie bewahrt, was nicht herrschen darf.",
    "21": "Du siehst deine Eltern an einem Altar, auf dem weder Eheringe noch Schwerter liegen, sondern Zähne und Schuppen.",
    "22": "Ein Pfau verliert eine Feder, und als sie den Boden berührt, wird daraus ein Drachenspeer.",
    "23": "In einem Spiegel erscheint dir dein eigenes Gesicht, aber hinter dir öffnen sich zwei gewaltige Augen in der Dunkelheit.",
    "24": "Ein Chor aus adligen Stimmen singt ein Hochzeitslied, das langsam in ein Warngebet übergeht.",
    "25": "Hera setzt dir einen Lorbeerkranz auf, doch die Blätter verwandeln sich in kleine smaragdgrüne Drachenzungen.",
    "26": "In einer Mondnacht siehst du eine Silhouette mit Flügeln auf der Spitze eures Familiensitzes landen.",
    "27": "Der Marmorboden eines Thronsaals reißt auf, und darunter liegt ein schlafender Panzer aus Stein und Zorn.",
    "28": "Du trägst ein Banner in die Schlacht, doch der Stoff ist schwer wie Schuppenplatten.",
    "29": "Ein Ei aus schwarzem Marmor liegt in einem goldenen Wiegenkorb, und alle knien davor.",
    "30": "Eine Stimme sagt: Treue schützt, Stolz verdirbt, während du zwischen einem Drachenhort und einem Familienaltar stehst.",
    "31": "Du siehst einen kleinen Halbelfenjungen mit deinem Gesicht, der einen Drachen mit bloßer Hand füttert.",
    "32": "In einem Palasthof trinkt ein Pfau aus einer Pfütze aus flüssigem Gold, in der sich Schuppen spiegeln.",
    "33": "Eine alte Ahnin küsst deine Stirn und hinterlässt dort die Spur einer Kralle.",
    "34": "Du gehst durch eine Gruft, in der statt Sarkophagen riesige Ketten im Boden verankert sind.",
    "35": "Ein Drachenkopf aus Mosaik beginnt dir Fragen über Ehre, Familie und Gehorsam zu stellen.",
    "36": "Hera steht auf einer Mauer und blickt auf ein Tal voller Knochen, als würde sie über gefallene Königreiche richten.",
    "37": "Du siehst eine Hochzeitszeremonie, bei der das Eheversprechen auf eine uralte Schuppe gesprochen wird.",
    "38": "In deinem Traum trägt dein Schwert einen Spiegelglanz, bis sich darin eine monströse Pupille öffnet.",
    "39": "Deine Familie sitzt schweigend beim Mahl, aber bei jedem Blinzeln haben sie andere Gesichter: elbisch, drakonisch, titanisch, wieder menschlich.",
    "40": "Eine goldene Kette hält ein riesiges schlagendes Herz unter einem Tempelboden fest.",
    "41": "Du stehst auf einem Balkon, und über dir kreist ein Drache mit Pfauenfedern an den Flügeln.",
    "42": "Ein Siegelring deines Hauses wird zu heiß, bis du ihn fallen lässt; wo er landet, sprießen Schuppen aus dem Stein.",
    "43": "Du hörst das Wort Erbe und siehst gleichzeitig einen Thron und einen Abgrund.",
    "44": "In einem Tempelbecken schwimmt statt Wasser flüssiger Himmel, darin eine gewaltige Rückenplatte.",
    "45": "Eine edle Frau aus deinem Stammbaum öffnet eine Schatulle, in der ein Drachenei liegt, umwickelt von einem Ehering.",
    "46": "Du siehst eine Prozession weiß gekleideter Priesterinnen, die ein einziges riesiges Horn tragen.",
    "47": "Auf deinem Familienfriedhof sind alle Grabsteine mit Krallenrillen versehen.",
    "48": "Ein Drache verneigt sich vor Hera, doch im nächsten Moment zerbricht der Boden unter seinen Klauen.",
    "49": "Du kniest vor einem Altar der Königin der Götter, und hinter dem Altar schlägt ein Schweif langsam gegen Stein.",
    "50": "Ein Paar goldener Türen öffnet sich und zeigt eine Höhle, die zugleich Schatzkammer, Krypta und Kerker ist.",
    "51": "Dein Traum zeigt einen Stammbaum, dessen Wurzeln nicht in Erde enden, sondern sich um eine uralte Schuppe winden.",
    "52": "Du siehst sieben Kronen auf einem Tisch, aber nur eine bleibt unversehrt, als Feuer durch den Raum rollt.",
    "53": "Ein uralter Drache spricht mit der Stimme deines Vaters und nennt Hera Zeugin unseres Bundes.",
    "54": "Aus einem Kelch voller Wein steigt Rauch auf, der die Form einer Bestie mit Panzerhaut annimmt.",
    "55": "Ein Pfau hackt wiederholt auf einen goldenen Helm ein, bis darunter Drachenknochen sichtbar werden.",
    "56": "Du wanderst durch einen Regen aus Edelsteinen, doch jeder Stein ist in Wahrheit ein Zahn.",
    "57": "Eine Priesterin der Hera zeichnet mit Kreide einen Kreis, der eher einer Bannrune als einem Segenszeichen gleicht.",
    "58": "In einem langen Korridor hört man Schuppen über Stein kratzen, obwohl niemand zu sehen ist.",
    "59": "Du siehst deine Familie bei Hofe, geschniegelt und lächelnd, während unter der Tafel ein riesiges Auge aufgeht.",
    "60": "Hera hält in einer Hand ein Zepter und in der anderen eine Kette, und du weißt nicht, welches Geschenk für dich bestimmt ist.",
    "61": "In einer brennenden Bibliothek bleiben nur zwei Bücher unversehrt: das Eherecht und ein Bestiarium uralter Titanen.",
    "62": "Du träumst von einem Schwur, der mit Blut, Gold und einem einzelnen Tropfen Drachenfeuer besiegelt wird.",
    "63": "Dein Schild spiegelt nicht dich, sondern einen gepanzerten Rücken, der sich unter Erde bewegt.",
    "64": "In einer Kathedrale hängen Banner mit euren Farben, aber sie flattern wie lebendige Flügel.",
    "65": "Eine Stimme flüstert: Nicht alles, was bewacht wird, soll befreit werden.",
    "66": "Du siehst eine Königshochzeit, bei der der Brautschleier aus hauchdünner Membran zwischen Schuppen besteht.",
    "67": "Eine alte Tür aus Elfenbein trägt die eingravierten Namen deiner Ahnen; der letzte Platz ist leer.",
    "68": "In einem Traumgericht wirft Hera Schuppen auf eine Waage, um Schuld und Würde deiner Familie zu messen.",
    "69": "Du gehst durch eine Menagerie aus Statuen, doch eine davon atmet warmen Rauch.",
    "70": "Ein Drachenhort liegt vor dir, doch mitten darin steckt eine einzelne, stumpfe, monströs große Klaue.",
    "71": "Deine Rüstung ist mit Gold verziert, bis sie sich plötzlich in einen Panzer aus ineinandergreifenden Platten verwandelt.",
    "72": "Ein Ahnengeist zeigt dir eine Höhle, in der königliche Insignien neben Futtertrögen stehen.",
    "73": "Im Traum musst du einen Eid sprechen, während hinter dir etwas an Ketten zerrt.",
    "74": "Du siehst einen Pfau auf einem Berg aus Schilden tanzen, und unter den Schilden wächst ein Schuppenrücken hervor.",
    "75": "Eine silberne Glocke läutet, und mit jedem Klang öffnet sich ein weiteres Drachenauge in der Dunkelheit.",
    "76": "Ein Kind in Adelskleidung füttert weiße Tauben, doch unter ihnen schleicht ein kleines reptilisches Junges.",
    "77": "Du stehst vor einem Stammbaum aus Marmor, in dem einige Namen wie mit Krallen ausgelöscht wurden.",
    "78": "In einem gläsernen Saal hängen Ketten von der Decke, jede groß genug für ein anderes Ungeheuer.",
    "79": "Hera blickt dich schweigend an, während ein goldener Ring langsam um eine gewaltige Schuppe geschoben wird.",
    "80": "Eine Bestie schläft unter einem Rosenbeet, und jede Rose wächst aus einer alten Narbe.",
    "81": "Ein Drache hebt seine Flügel, und auf der Innenseite stehen die Namen alter Bündnisse geschrieben.",
    "82": "In einem Traum trägst du eine Krone, die aus zehn kleinen Drachenschädeln gefertigt ist, doch Hera nimmt sie dir wortlos wieder ab.",
    "83": "Du siehst deinen Familiensitz in Flammen, aber das Feuer kommt nicht von außen, sondern aus dem Inneren der Mauern.",
    "84": "Eine goldene Pfauenfeder fällt in einen Abgrund und wird auf halbem Weg zu einer Schuppe.",
    "85": "Du stehst vor einer Ahnenstatue, deren Sockel mit Tarrasquenplatten gepanzert ist.",
    "86": "Ein Ritter in der Rüstung deines Hauses reitet auf etwas, das wie ein drakonischer Albtraum aus Legenden wirkt.",
    "87": "In einem Festraum stößt Hera einen Becher um, und auf dem verschütteten Wein erscheinen die Umrisse eines alten Siegels.",
    "88": "Du träumst von einer Gruft, in der statt Knochen nur Häute, Panzerstücke und zerbrochene Kronen aufbewahrt werden.",
    "89": "Eine Drachenkönigin küsst deine Stirn, und Hera wischt die Spur mit strengem Blick wieder fort.",
    "90": "Du trägst eine Fackel durch eine Höhle voller Schätze, bis du erkennst, dass jeder Schatz Teil eines Gefängnisses ist.",
    "91": "Im Traum sprichst du mit einem uralten Drachen über Pflicht, und er nennt deine Familie Wächter wider Willen.",
    "92": "Du siehst einen Altar mit zwei Opfergaben: einen Ehering und einen Drachenzahn; Hera fordert, dass du wählst.",
    "93": "Ein schwarzer Himmel voller Blitze erhellt kurz eine gewaltige gepanzerte Silhouette hinter eurer Burg.",
    "94": "Dein Paladinschwur erscheint in flammenden Buchstaben an einer Höhlenwand mit tiefen Kratzspuren.",
    "95": "Eine Prozession deines Hauses zieht durch einen Tempel, doch statt Musik hört man fernes Brüllen.",
    "96": "Hera zeigt dir einen goldenen Schlüssel, der genau in die Brustplatte einer uralten Kreatur passen würde.",
    "97": "Du stehst an einer Wiege aus Stein, in der kein Kind, sondern ein schlafender, geschuppter Schatten liegt.",
    "98": "In einem Traumgarten wachsen anstelle von Früchten Kronen, Zähne und kleine Eierschalen.",
    "99": "Die Königin der Götter spricht: Eure Linie band den Hunger, doch das Band ist nicht ewig.",
    "100": "Du stehst allein in der großen Halle deiner Familie. Hera sitzt auf dem Thron, ein Drache windet sich rechts von ihr, eine tarrasquenhafte Silhouette ruht links im Schatten. Sie sagt nur: Dein Blut ist nicht bloß Erbe. Es ist Verantwortung.",
    "id": "traeume-hera",
    "titel": "Traumtabelle für Hera",
    "description": "Dynastische, mythische und bedrohliche Träume für Tybald mit Bezug auf Hera und seine Familiengeschichte.",
    "dice": 100,
    "parts": false,
    "header": "Träume"
  },
  "traeume-hestia.json": {
    "1": "Du sitzt am heimischen Herd, doch die Flammen brennen blau. Eine ruhige Stimme verlangt, dass du einen Silberring ins Feuer wirfst, damit ein Streit in der Familie endet.",
    "2": "Du siehst eine verlassene Zwergenhalle voller kalter Feuerstellen. Hestia fordert ein Fass guten Biers, das am Herd geöffnet und den Ahnen dargebracht werden soll.",
    "3": "In deinem Traum knetet deine Mutter Brot aus glühender Asche. Die Göttin verlangt einen Laib aus bestem Mehl und Kräutern, gebacken nur für Bedürftige.",
    "4": "Ein Herdstein springt entzwei, und aus dem Riss tropft Gold. Hestia verlangt 10 GM in geprägten Münzen, eingeschmolzen oder geopfert, damit das Haus verschont bleibt.",
    "5": "Du hörst Kinderlachen aus einem Kamin, in dem kein Feuer brennt. Die Göttin fordert eine geschnitzte Holzpuppe oder ein Kinderspielzeug als Gabe für Schutz der Jugend.",
    "6": "Ein eiserner Kessel über dem Feuer zeigt das Gesicht eines Fremden. Hestia verlangt, dass du eine warme Mahlzeit an einen Reisenden spendest.",
    "7": "Du gehst durch Schnee, bis ein einziges Herdfeuer dich ruft. Die Göttin fordert deinen dicksten Wollumhang für einen Frierenden.",
    "8": "Eine Ahnenstatue sitzt am Feuer und schweigt. Hestia verlangt einen Edelstein im Wert von mindestens 25 GM, damit ein vergessenes Versprechen erinnert wird.",
    "9": "Du siehst Brot, das nie verbrennt, obwohl es in weißen Flammen liegt. Die Göttin verlangt ein Festmahl für deine Gefährten, ehe ihr ein gefährliches Vorhaben beginnt.",
    "10": "Eine kleine Flamme springt von deinem Herd in deine Hand und schmerzt nicht. Hestia fordert ein Opfer von eigenem Blut auf dem Herdstein, nur einen Tropfen, als Zeichen persönlicher Bindung.",
    "11": "Du träumst von einer Taverne, in der jeder Platz gedeckt ist, aber niemand isst. Hestia verlangt eine goldene Schale oder einen vergoldeten Becher als Herdgabe.",
    "12": "Deine Ahnen schmieden an einem Herd Ambosse aus Brot. Die Göttin fordert ein Werkzeug deines Handwerks, das du einem jungen Zwerg schenkst.",
    "13": "Ein Kind bittet dich um Suppe, doch sein Gesicht ist aus Glut. Hestia verlangt eine Mahlzeit für sieben Bedürftige.",
    "14": "Du siehst dein Elternhaus, doch alle Türen sind zugemauert. Die Göttin fordert einen eisernen Schlüssel, der im Herdfeuer geopfert werden muss.",
    "15": "Auf einem Herd ruht eine Krone aus Backstein. Hestia verlangt eine kostbare Krone, Tiara oder wenigstens ein goldverziertes Symbol des Standes, geopfert zugunsten der Gemeinschaft.",
    "16": "Ein schwarzer Rauch formt das Wort Gastrecht. Die Göttin verlangt die Aufnahme eines Fremden für eine Nacht, ohne Fragen.",
    "17": "In deinem Traum singen Schalen und Töpfe im Chor. Hestia fordert einen Satz guter Kochutensilien für einen armen Haushalt oder Tempel.",
    "18": "Ein altes Herdfeuer erlischt, bis du eine Münze hineinwirfst. Die Göttin verlangt 1W6 x 10 GM, die nicht zurückgenommen werden dürfen.",
    "19": "Du siehst einen Fuchs am Herd schlafen. Hestia verlangt Milch, Honig und Brot als einfache, aber reine Opfergabe.",
    "20": "Eine flammende Hand legt einen schweren Familienring in deine Hand. Hestia fordert, dass du ein Erbstück vorübergehend oder endgültig opferst, um ein größeres Übel fernzuhalten.",
    "21": "Du träumst von einem Bankett, bei dem alle Plätze leer bleiben bis auf einen. Die Göttin verlangt einen Platz am Feuer dauerhaft für Gäste freizuhalten.",
    "22": "Im Herdfeuer erscheinen Landkarten aus Glut. Hestia verlangt Reiseproviant im Wert von 15 GM, gespendet an Pilger oder Flüchtlinge.",
    "23": "Eine Zwergenhalle stürzt ein, doch ein einziger Herd bleibt stehen. Die Göttin fordert einen behauenen Stein mit deinem Clanzeichen, ins Feuer oder in einen Tempel gesetzt.",
    "24": "Du hörst das Knacken von Kastanien, obwohl keine da sind. Hestia verlangt ein winterliches Vorratsopfer: Nüsse, Mehl, Öl und Salz.",
    "25": "Eine Herdkette aus Silber windet sich wie eine Schlange. Hestia verlangt eine Silberkette oder Brosche, damit ein Eid gebunden wird.",
    "26": "Du siehst dein Spiegelbild im Suppentopf, älter und müder. Die Göttin fordert eine Nachtwache am Herd eines Kranken.",
    "27": "Ein kleines Feuer im Brotlaib brennt, ohne ihn zu verzehren. Hestia verlangt das erste Brot eines neuen Ofens oder Lagers.",
    "28": "Du sitzt mit deinen Ahnen an einem stillen Tisch. Die Göttin fordert ein Gebet mit Weihrauch und Öl, das in völliger Stille gesprochen wird.",
    "29": "Dein Traum zeigt einen Herd ohne Dach über sich. Hestia verlangt Holz, Stein oder Geld zum Wiederaufbau eines Hauses.",
    "30": "Du trägst einen glühenden Amboss, der sich in einen Laib verwandelt. Hestia fordert eine Spende an einen Tempel oder Waisenhort im Wert von 25 GM.",
    "31": "Ein alter Widder liegt zusammengerollt vorm Feuer. Hestia verlangt ein wertvolles Tierprodukt: Wolle, Käse oder Milch von bester Qualität.",
    "32": "Du siehst einen Kupferkessel, in dem Sterne kochen. Hestia fordert eine Kupferspende von mindestens 20 GM Wert.",
    "33": "Die Herdflammen formen eine Wiege. Die Göttin verlangt eine Decke, Kleidung oder Nahrung für ein Neugeborenes.",
    "34": "In deinem Traum bittet ein verstorbener Ahne um einen letzten Becher. Hestia fordert teuren Wein oder starken Zwergenschnaps ins Feuer zu gießen.",
    "35": "Ein Feuergeist zählt langsam deine Münzen. Hestia verlangt genau 33 GM, nicht mehr und nicht weniger.",
    "36": "Du findest einen goldenen Löffel in der Asche. Hestia verlangt Besteck oder Tischgeschirr aus gutem Metall für einen Tempel.",
    "37": "Aus einem Herdstein wächst ein Olivenbaum aus Eisen. Die Göttin fordert wertiges Öl, seltene Kräuter und sauberes Salz.",
    "38": "Eine Tür im Kamin öffnet sich zu einem warmen Saal. Hestia verlangt eine Einladung an jemanden, den dein Clan meidet.",
    "39": "Dein Traum zeigt eine Feuerstelle im Herzen eines Vulkans. Hestia fordert einen Rubin oder Karneol im Wert von 50 GM.",
    "40": "Du siehst zwei Hände über einem Herd, die sich beinahe berühren. Die Göttin verlangt eine Versöhnungsgabe: Brot und Salz zwischen Feinden geteilt.",
    "41": "Eine Katze mit Augen aus Kohlen schläft auf deinem Schoß. Hestia verlangt einen kleinen silbernen Anhänger in Tierform.",
    "42": "Du hörst Hämmer im Takt eines Herzschlags. Hestia fordert eine Glocke oder Klangschale für einen Tempel oder Schrein.",
    "43": "Am Herd sitzt eine Witwe in weißer Asche. Die Göttin verlangt eine Woche lang jeden Abend eine Kerze und ein Gebet für die Verstorbenen.",
    "44": "Ein roter Mantel hängt über dem Kamin, aber niemand trägt ihn. Hestia verlangt ein edles Kleidungsstück, verschenkt an jemanden in Not.",
    "45": "Du siehst Brotlaibe mit Runen des Clans gebrannt. Hestia fordert ein Festbrot für die ganze Sippe, bezahlt aus deinem eigenen Beutel.",
    "46": "Die Feuerstelle spricht mit der Stimme deiner Großmutter. Hestia verlangt ein Familienrezept oder eine Familientradition, die mit Fremden geteilt werden soll.",
    "47": "Ein Herdfeuer frisst langsam eine Schriftrolle. Die Göttin verlangt ein wertvolles Geheimnis, das du preisgeben oder aufgeben musst.",
    "48": "Du siehst sieben leere Teller und einen vollen. Hestia verlangt Fasten bis zum Abend und dann das Teilen der einzigen Mahlzeit.",
    "49": "Eine eiserne Gabel zeigt nach Norden. Hestia verlangt eine Wallfahrt zu einem vergessenen Herdschrein.",
    "50": "Im Traum kocht Suppe in deinem Helm. Hestia fordert deinen Helm oder ein gleichwertiges Stück Ausrüstung als Pfand, bis eine Schuld beglichen ist.",
    "51": "Flammen umspielen die Namen deiner Ahnen. Die Göttin verlangt ein Ahnenopfer in Form von Goldstaub oder gravierten Plättchen im Wert von 40 GM.",
    "52": "Du siehst einen Herd in einer Höhle, an dem Monster friedlich essen. Hestia fordert Gastfreundschaft selbst gegenüber einem Feind, solange er das Feuer respektiert.",
    "53": "Ein eisiger Wind löscht alle Fackeln außer einer Kerze. Hestia verlangt reines Bienenwachs und einen silbernen Kerzenhalter.",
    "54": "Du trägst glühende Kohlen in bloßen Händen und verbrennst dich nicht. Die Göttin verlangt eine Prüfung der Hingabe: ein wichtiges persönliches Kleinod ins Feuer.",
    "55": "Eine alte Zwergin zählt Brotstücke wie Münzen. Hestia fordert zehn frisch gebackene Laibe für die Armen oder Reisenden.",
    "56": "Aus deinem Herd wächst ein Turm aus Schalen. Hestia verlangt edles Geschirr im Wert von 25 GM.",
    "57": "Dein Schatten sitzt schon am Feuer, bevor du ankommst. Hestia fordert eine Nacht des stillen Gebets ohne Waffen in Reichweite.",
    "58": "Du siehst eine Hallendecke voller Rauchzeichen. Hestia verlangt eine Botschaft des Friedens an einen entfernten Verwandten oder Rivalen.",
    "59": "In der Glut liegt eine einzelne Perle. Die Göttin fordert eine Perle oder Mondstein im Wert von 50 GM.",
    "60": "Ein Kind reicht dir verbranntes Brot und lächelt. Hestia fordert Demut: du sollst die einfachste Mahlzeit essen und die beste verschenken.",
    "61": "Ein Herdstein blutet flüssiges Kupfer. Hestia verlangt ein Kupferopfer und das Schmieden eines Symbols des Schutzes.",
    "62": "Du träumst von einem endlosen Tisch in einer Minenhalle. Die Göttin verlangt eine gemeinsame Mahlzeit für Arbeiter, Wachen oder Diener.",
    "63": "Drei Flammen sprechen nacheinander mit dir: Heim, Clan, Tempel. Hestia verlangt, dass du eines von dreien priorisierst und die anderen vorerst zurückstellst.",
    "64": "Eine eiserne Wiege schaukelt vor dem Herd. Die Göttin fordert eine Schutzgabe für Mutter und Kind, bezahlt von dir.",
    "65": "Du siehst einen Ring aus Salz um ein Feuer gezogen. Hestia verlangt eine Reinigungszeremonie mit Salz, Öl und Asche.",
    "66": "Ein Suppenkessel öffnet sich wie ein Auge. Hestia fordert dein aufrichtiges Geständnis vor dem Herdfeuer, ehe die nächste Reise beginnt.",
    "67": "Du hörst die Stimme der Göttin aus einem Brotofen sagen: Kein Heim ohne Preis. Sie verlangt 100 GM für einen neuen Herd oder Schrein.",
    "68": "Dein Traum zeigt eine Halle, in der alle Speere am Eingang abgelegt werden. Hestia fordert Waffenruhe an einem heiligen Feuer, selbst widerwillig.",
    "69": "In der Asche liegt ein Zahn aus Gold. Die Göttin verlangt ein wertvolles persönliches Schmuckstück, geopfert aus freien Stücken.",
    "70": "Du siehst Flammen in Form eines Ambosses und einer Schüssel. Hestia fordert Arbeit und Fürsorge zugleich: tagsüber bauen, abends speisen.",
    "71": "Eine alte Feuerstelle in einer Ruine ruft deinen Namen. Hestia verlangt deren Wiederentfachung mit kostbarem Öl und Gebet.",
    "72": "Im Traum servierst du einem Bettler auf goldenen Tellern. Die Göttin verlangt eine überreichliche Mahlzeit für jemanden, der nichts zurückgeben kann.",
    "73": "Du siehst eine Kette aus Herdsteinen, die ein Tal verbindet. Hestia fordert eine Spende an mehrere Haushalte statt an nur einen Tempel.",
    "74": "Eine geöffnete Hand über dem Feuer hält einen Saphir. Hestia verlangt einen blauen Edelstein im Wert von 75 GM.",
    "75": "Dein Ahnenhaus ist verlassen, aber der Herd noch warm. Hestia fordert eine Rückkehr zu einem alten Familienort, samt Opfer von Brot, Salz und Münzen.",
    "76": "Im Kamin sitzt ein schweigender Gast in Reisegewand. Hestia verlangt, dass du einem Reisenden vertraust, obwohl dein Instinkt warnt.",
    "77": "Du siehst einen mit Gold ausgelegten Backofen. Die Göttin verlangt ein kunstvolles sakrales Gefäß oder einen verzierten Kessel.",
    "78": "Aus der Glut erhebt sich eine Mauer aus Broten. Hestia fordert eine Speisung einer ganzen Gemeinschaft nach Gefahr oder Krieg.",
    "79": "Eine einzelne Kohle glimmt in völliger Dunkelheit. Hestia verlangt, dass du das letzte Stück Hoffnung oder Vorrat teilst, nicht für dich behältst.",
    "80": "Ein Herdfeuer im Regen brennt nur, weil jemand darüber wacht. Hestia fordert eine Nacht ohne Schlaf an einem Schutzfeuer.",
    "81": "Du trägst einen goldenen Kessel auf einer Pilgerstraße. Hestia verlangt ein wertvolles Kochgefäß für einen Schrein.",
    "82": "Eine Familienchronik liegt offen in der Asche. Die Göttin verlangt eine Geschichte oder Wahrheit, die den Clan heilt, aber beschämt.",
    "83": "Du siehst Brotlaibe in Form kleiner Häuser. Hestia fordert den Bau oder die Finanzierung eines Notlagers.",
    "84": "Aus dem Herd springt ein Funke in einen Ehering. Hestia verlangt eine Segnung, Rettung oder Bewahrung eines Bundes, notfalls mit großem persönlichem Preis.",
    "85": "Eine Steinschüssel füllt sich mit flüssigem Silber. Hestia fordert Silber im Wert von 50 GM, aber nur ehrlichen Gewinn, kein geraubtes Gut.",
    "86": "Du sitzt an einem Feuer mit deinen Gefährten, doch einer fehlt. Hestia verlangt eine Gedenkmahlzeit und ein Opfer für einen verlorenen Kameraden.",
    "87": "Im Herdfeuer liegt ein Sternsplitter. Hestia verlangt einen besonders seltenen Weihrauch, Edelstein oder Meteoritensplitter, wenn du ihn beschaffen kannst.",
    "88": "Ein Kind aus Rauch fragt, wem dein Feuer gehört. Hestia fordert die Weihe eines neuen Herds in ihrem Namen.",
    "89": "Du siehst einen goldenen Löffel verbiegen, weil Suppe für nur einen gekocht wird. Hestia verlangt Großzügigkeit statt Vorratshaltung.",
    "90": "Eine Halle voller kalter Kohlen erwärmt sich erst, als du dein Amulett hineinlegst. Die Göttin verlangt dein heiliges Symbol für eine Nacht ins Feuer, ohne Gewissheit, dass es unversehrt bleibt.",
    "91": "Du träumst von sieben Herden, die einer nach dem anderen verlöschen. Hestia verlangt sieben Opfer in sieben Nächten: Brot, Salz, Öl, Bier, Milch, Kräuter und eine Münze.",
    "92": "Eine Flamme sitzt wie eine Krone auf deinem Kopf. Die Göttin fordert den Verzicht auf Stolz oder Rang: verschenke etwas, das deinen Status zeigt.",
    "93": "Ein Tischtuch aus Glut breitet sich über eine ganze Festhalle. Hestia verlangt ein großes Versöhnungsmahl zwischen verfeindeten Gruppen.",
    "94": "Im Herdfeuer liegen Münzen und Knochen friedlich nebeneinander. Die Göttin verlangt sowohl materielle als auch persönliche Hingabe: Gold und ein Gelübde.",
    "95": "Eine uralte Zwergenpriesterin rührt in einem goldenen Topf. Hestia verlangt ein Opfer im Wert von 100 GM oder mehr, damit ein Haus, Tempel oder Clan geschützt wird.",
    "96": "Dein Traum zeigt einen Herd in den Tiefen der Erde, gespeist von Magma. Hestia fordert einen seltenen Metallbarren ins Feuer, damit ein größeres Feuer gesegnet wird.",
    "97": "Alle deine Ahnen drehen sich zu dir und warten schweigend. Die Göttin verlangt ein Erbstück deines Clans, das du nur mit schwerem Herzen opfern kannst.",
    "98": "Aus der Glut erhebt sich ein Haus aus reinem Gold und zerfällt wieder. Hestia fordert den Verzicht auf Reichtum zugunsten von Sicherheit und Gemeinschaft.",
    "99": "Du stehst allein vor einem riesigen Herd, in dem die Namen deiner Lieben brennen. Hestia verlangt ein Opfer, das weh tut: ein Schatz, ein Statussymbol oder ein alter Anspruch.",
    "100": "Die Göttin selbst erscheint als stille Zwergin am Feuer. Sie sagt: Kein Heim ohne Hingabe. Dann fordert sie das wertvollste Opfer bisher, etwas im Wert von mindestens 250 GM, ein bedeutendes Erbstück oder ein schweres persönliches Gelübde, und verspricht dafür, dass ein Heim, eine Familie oder ein heiliger Ort bewahrt wird.",
    "id": "traeume-hestia",
    "titel": "W100 Traumtabelle für Hestia",
    "description": "Prophetische, fordernde und häuslich-heilige Träume für Mila mit Bezug zu Hestia.",
    "dice": 100,
    "parts": false,
    "header": "Träume"
  },
  "wanted-bronze.json": {
    "1": {
      "name": "Tillo \"Flinkfinger\" Merz",
      "vergehen": "Taschendiebstahl, Beutelschneiderei, Flucht vor der Stadtwache",
      "beschreibung": "Männlicher Halbling, lockiges braunes Haar, auffällig grüne Weste, stets mit zu großem Hut.",
      "zuletzt_gesehen": "Auf dem Marktplatz im Gerberviertel.",
      "besonderer_hinweis": "Arbeitet gern in Menschenmengen und nutzt Kinder oder Straßenhändler als Ablenkung.",
      "belohnung": "25 Goldstücke",
      "hinweis": "Lebend festsetzen. Beute möglichst vollständig sicherstellen."
    },
    "2": {
      "name": "Alva Krähenzahn",
      "vergehen": "Betrug mit gefälschten Heiltränken, Verkauf wertloser Tinkturen",
      "beschreibung": "Menschliche Frau, schwarzes Haar, wettergegerbtes Gesicht, trägt häufig Reisekiste und Kräutertasche.",
      "zuletzt_gesehen": "In den Außengassen nahe dem Südtor.",
      "besonderer_hinweis": "Gibt sich als wandernde Heilerin aus und verschwindet meist vor Tagesanbruch.",
      "belohnung": "30 Goldstücke",
      "hinweis": "Vorsicht vor Rauchpulvern und Blendstaub."
    },
    "3": {
      "name": "Borkel Einauge",
      "vergehen": "Schlägerei, Wegelagerei, Bedrohung von Händlern",
      "beschreibung": "Menschlicher Mann, groß, kräftig, linkes Auge milchig blind, zerfetzter Ledermantel.",
      "zuletzt_gesehen": "An der Straße zum nördlichen Mühlenpfad.",
      "besonderer_hinweis": "Vermutlich mit 2–3 weiteren Halunken unterwegs.",
      "belohnung": "35 Goldstücke",
      "hinweis": "Bewaffnet mit Knüppel oder rostigem Kurzschwert."
    },
    "4": {
      "name": "Mira \"Die Falsche Nonne\"",
      "vergehen": "Spendenbetrug, Amtsanmaßung, Diebstahl von Tempelgut",
      "beschreibung": "Menschliche Frau, mittleres Alter, einfache graue Robe, spricht sanft und überzeugend.",
      "zuletzt_gesehen": "Vor kleinen Schreinen in Armenvierteln.",
      "besonderer_hinweis": "Gibt sich als fromme Sammlerin für Waisen oder Tempelreparaturen aus.",
      "belohnung": "25 Goldstücke",
      "hinweis": "Möglichst mitsamt Aufzeichnungen und Spendenkasse vorführen."
    },
    "5": {
      "name": "Ollo und Pell",
      "vergehen": "Stallraub, Hühner- und Ziegendiebstahl, kleinere Einbrüche",
      "beschreibung": "Zwei junge Halbelfen, oft gemeinsam, einer rotblond, einer schwarzhaarig.",
      "zuletzt_gesehen": "Bei Gehöften südwestlich der Stadt.",
      "besonderer_hinweis": "Reiten häufig auf gestohlenen Eseln davon.",
      "belohnung": "20 Goldstücke pro Person",
      "hinweis": "Lebend erwünscht. Gestohlene Tiere unversehrt zurückführen."
    },
    "6": {
      "name": "Grete Felsnase",
      "vergehen": "Falschspiel, gezinkte Würfel, Betrug bei Glücksspielen",
      "beschreibung": "Zwergin, kupferrote Zöpfe, breites Grinsen, trägt viele Ringe an den Fingern.",
      "zuletzt_gesehen": "In Schankhäusern beim Hafen.",
      "besonderer_hinweis": "Behauptet lautstark, nur aus Glück zu gewinnen.",
      "belohnung": "30 Goldstücke",
      "hinweis": "Würfelbecher, Karten und Münzen als Beweise mitbringen."
    },
    "7": {
      "name": "Der Sackmann",
      "vergehen": "Einbruch in Lagerhäuser, Diebstahl von Mehl, Salz und Vorräten",
      "beschreibung": "Identität unbekannt; trägt Sackhaube mit Sehschlitzen, schmal, flink.",
      "zuletzt_gesehen": "Lagergassen am östlichen Hafen.",
      "besonderer_hinweis": "Hinterlässt häufig verschüttetes Korn und durchtrennte Seile.",
      "belohnung": "40 Goldstücke",
      "hinweis": "Möglicherweise nur ein einzelner Täter, möglicherweise Nachahmer."
    },
    "8": {
      "name": "Kella Riemenhand",
      "vergehen": "Hehlerei kleiner Waren, Weiterverkauf gestohlener Gürtel, Werkzeuge und Messer",
      "beschreibung": "Halbork-Frau, kahl rasierter Schädel, lederne Armschiene, scharfe Stimme.",
      "zuletzt_gesehen": "Im Viertel der Gerber und Sattler.",
      "besonderer_hinweis": "Kauft Diebesgut billig auf und verkauft es unkenntlich weiter.",
      "belohnung": "35 Goldstücke",
      "hinweis": "Lagerort gestohlener Ware von besonderem Interesse."
    },
    "9": {
      "name": "Pater Enzio",
      "vergehen": "Verkauf falscher Segnungen, Aberglaubensbetrug, Erpressung von Bauern",
      "beschreibung": "Älterer Mensch, schütteres Haar, falscher Priesterkragen, trägt bronzene Glocke.",
      "zuletzt_gesehen": "Auf Landstraßen zwischen Dörfern.",
      "besonderer_hinweis": "Droht mit „göttlichem Fluch“, falls keine Münzen gezahlt werden.",
      "belohnung": "20 Goldstücke",
      "hinweis": "Möglichst ohne öffentliche Prügelei festsetzen."
    },
    "10": {
      "name": "Nib und Nab",
      "vergehen": "Brandstiftung aus Mutwillen, Vandalismus, Zerstörung von Marktständen",
      "beschreibung": "Zwei junge Gnome, vermutlich Geschwister, ständig rußverschmiert, tragen Zündschnüre.",
      "zuletzt_gesehen": "In der Nähe stillgelegter Werkstätten.",
      "besonderer_hinweis": "Nutzen Knallpulver, Rauchkugeln und stinkende Alchemie.",
      "belohnung": "40 Goldstücke für beide zusammen",
      "hinweis": "Vorsicht vor improvisierten Fallen."
    },
    "id": "wanted-poster-bronze-steckbriefe",
    "titel": "Wanted Poster Bronze-Steckbriefe",
    "description": "W10-Zufallstabelle mit Bronze-Steckbriefen vom schwarzen Brett.",
    "dice": 10,
    "parts": false
  },
  "wanted-gold.json": {
    "1": {
      "name": "Rask \"Laternenmesser\"",
      "vergehen": "Mehrfacher Mord, Raub, Flucht aus Gewahrsam",
      "beschreibung": "Menschlicher Mann, hager, kurze schwarze Haare, tiefe Schnittnarbe über der rechten Wange.",
      "zuletzt_gesehen": "In dunklen Gassen nahe der Hafenmauer.",
      "besonderer_hinweis": "Greift bevorzugt nachts und aus dem Hinterhalt an.",
      "belohnung": "300 Goldstücke",
      "hinweis": "Als äußerst gefährlich einzustufen."
    },
    "2": {
      "name": "Noreia Aschensang",
      "vergehen": "Brandstiftung, Erpressung, Anstiftung zu Aufruhr",
      "beschreibung": "Halbelfin, rot gefärbtes Haar, goldene Ohrringe, auffallend melodische Stimme.",
      "zuletzt_gesehen": "Bei Armenküchen, Marktplätzen und öffentlichen Versammlungen.",
      "besonderer_hinweis": "Nutzt Charme, Musik und gezielte Hetze, bevor Feuer gelegt wird.",
      "belohnung": "325 Goldstücke",
      "hinweis": "Möglichst lebend, um Hintermänner zu ermitteln."
    },
    "3": {
      "name": "Vargan Steinfaust",
      "vergehen": "Anführung bewaffneter Räuber, Überfälle auf Karawanen, Tötung von Wachen",
      "beschreibung": "Zwerg, massig, grauer Bart, eiserne Faustprothese.",
      "zuletzt_gesehen": "Auf der Handelsstraße durch den Hügelpass.",
      "besonderer_hinweis": "Führt eine disziplinierte Räubergruppe mit militärischer Härte.",
      "belohnung": "350 Goldstücke",
      "hinweis": "Seine Bande ist organisiert und gut bewaffnet."
    },
    "4": {
      "name": "Meistra Kallidra",
      "vergehen": "Verbotene Nekromantie, Grabschändung, Handel mit Gebeinen",
      "beschreibung": "Menschliche Frau, bleiche Haut, violette Robe, oft mit Knochenstab.",
      "zuletzt_gesehen": "Bei alten Friedhöfen und verfallenen Kapellen.",
      "besonderer_hinweis": "Vermutlich begleitet von Untoten oder alchemischen Dienern.",
      "belohnung": "400 Goldstücke",
      "hinweis": "Priesterliche Unterstützung empfohlen."
    },
    "5": {
      "name": "Orenz der Sammler",
      "vergehen": "Entführung von Handwerkern und Schreiberlingen, erzwungene Arbeit, Folter",
      "beschreibung": "Menschlicher Mann, geschniegelt, schmale Nase, stets mit feinem Stock.",
      "zuletzt_gesehen": "In verlassenen Stadthäusern nahe dem Fluss.",
      "besonderer_hinweis": "Hält Opfer angeblich für „nützliche Ressourcen“.",
      "belohnung": "375 Goldstücke",
      "hinweis": "Opferrettung hat Vorrang."
    },
    "6": {
      "name": "Die Graue Natter",
      "vergehen": "Spionage, Auftragsmord, Verkauf von Staatsgeheimnissen",
      "beschreibung": "Wahre Identität unbekannt; Gerüchte sprechen von wechselndem Aussehen und vielen Namen.",
      "zuletzt_gesehen": "Keine sichere Sichtung.",
      "besonderer_hinweis": "Hat möglicherweise Kontakte zu Hof, Wache oder Rat.",
      "belohnung": "450 Goldstücke",
      "hinweis": "Jeder belastbare Hinweis ist ebenfalls vergütungspflichtig."
    },
    "id": "wanted-poster-gold-steckbriefe",
    "titel": "Wanted Poster Gold-Steckbriefe",
    "description": "W6-Zufallstabelle mit Gold-Steckbriefen vom schwarzen Brett.",
    "dice": 6,
    "parts": false
  },
  "wanted-platin.json": {
    "1": {
      "name": "Garrick Moorkrone",
      "vergehen": "Hochverrat, Finanzierung bewaffneter Aufstände, Bestechung von Offizieren",
      "beschreibung": "Menschlicher Adliger, ergrautes Haar, aufrechter Gang, trägt oft dunklen Reitmantel mit Silberbrosche.",
      "zuletzt_gesehen": "Auf Landsitzen östlich der Hauptstadt, jedoch oft unter Schutz reisend.",
      "besonderer_hinweis": "Politisch vernetzt, besitzt loyale bewaffnete Gefolgsleute.",
      "belohnung": "1.000 Goldstücke",
      "hinweis": "Nur mit Genehmigung höherer Stellen oder im Namen der Krone zugreifen."
    },
    "2": {
      "name": "Sereth die Schwarze Glocke",
      "vergehen": "Kultführung, Menschenopfer, Entführung, Dämonenpakt",
      "beschreibung": "Elfe unklaren Alters, weißes Haar, schwarze Glocke am Gürtel, dunkle zeremonielle Gewänder.",
      "zuletzt_gesehen": "In Ruinen südlich des Königsforstes.",
      "besonderer_hinweis": "Führt fanatische Anhänger und bedient sich finsterer Magie.",
      "belohnung": "1.200 Goldstücke",
      "hinweis": "Priester, Magiekundige und erfahrene Kämpfer dringend empfohlen."
    },
    "3": {
      "name": "Königsmörder Halbrecht",
      "vergehen": "Attentatsversuch auf hochgestellte Würdenträger, mehrfacher Mord, Flucht aus königlichem Gewahrsam",
      "beschreibung": "Menschlicher Mann, mittelgroß, bartlos, unscheinbares Gesicht, oft als Diener verkleidet.",
      "zuletzt_gesehen": "Zuletzt in der Hauptstadt; seitdem keine bestätigte Spur.",
      "besonderer_hinweis": "Meister der Tarnung und des Giftgebrauchs.",
      "belohnung": "1.500 Goldstücke",
      "hinweis": "Mit äußerster Vorsicht vorgehen. Nicht allein verfolgen."
    },
    "4": {
      "name": "Brynja Feuerkette",
      "vergehen": "Piraterie, Brandplünderung, Versenkung königlicher Handelsschiffe, Mord",
      "beschreibung": "Zwergin, geflochtener schwarzer Bart, brandnarbiges Gesicht, Kettenmantel mit roten Metallringen.",
      "zuletzt_gesehen": "Auf einem schnellen schwarzen Flussschiff mit rotem Segel.",
      "besonderer_hinweis": "Führt eine disziplinierte und grausame Flussräuberbande.",
      "belohnung": "1.300 Goldstücke",
      "hinweis": "Zugriff vorzugsweise mit Wasserwache oder bewaffneter Eskorte."
    },
    "id": "wanted-poster-platin-steckbriefe",
    "titel": "Wanted Poster Platin-Steckbriefe",
    "description": "W4-Zufallstabelle mit Platin-Steckbriefen vom schwarzen Brett.",
    "dice": 4,
    "parts": false
  },
  "wanted-silber.json": {
    "1": {
      "name": "Harlon \"Der Schröpfer\"",
      "vergehen": "Schutzgelderpressung, Bedrohung von Ladenbesitzern, schwere Körperverletzung",
      "beschreibung": "Menschlicher Mann, Narben über dem Kinn, grauer Mantel, eiserner Schlagring.",
      "zuletzt_gesehen": "Im Krämerbezirk.",
      "besonderer_hinweis": "Hat mehrere einschüchternde Schläger unter sich.",
      "belohnung": "100 Goldstücke",
      "hinweis": "Lebend bevorzugt, um Aussagen über sein Netzwerk zu erhalten."
    },
    "2": {
      "name": "Salma Nebelschritt",
      "vergehen": "Einbruch in wohlhabende Häuser, Diebstahl von Schmuck und Dokumenten",
      "beschreibung": "Elfin, dunkler Umhang, silbernes Ohrpiercing, bewegt sich lautlos.",
      "zuletzt_gesehen": "In den besseren Wohnvierteln nahe der Ratsallee.",
      "besonderer_hinweis": "Gilt als ausgezeichnete Kletterin und Schlösserknackerin.",
      "belohnung": "120 Goldstücke",
      "hinweis": "Dächer und Balkone im Auge behalten."
    },
    "3": {
      "name": "Bruder Kalven",
      "vergehen": "Verbotene Predigten, Aufwiegelung, Verbreitung staatsfeindlicher Schriften",
      "beschreibung": "Menschlicher Mann, tonsurähnlicher Haarschnitt, heisere Stimme, einfache dunkle Robe.",
      "zuletzt_gesehen": "In Hinterhöfen und Kellerandachten.",
      "besonderer_hinweis": "Verführt Zuhörer mit feurigen Reden und sammelt Anhänger.",
      "belohnung": "90 Goldstücke",
      "hinweis": "Schriften und Listen seiner Versammlungen sicherstellen."
    },
    "4": {
      "name": "Dorga Schiefhammer",
      "vergehen": "Schmuggel von Waffen in die Stadt, Bestechung, Urkundenfälschung",
      "beschreibung": "Zwergin, schwer gebaut, halber Bartzopf, dunkles Kettenhemd unter Arbeitskleidung.",
      "zuletzt_gesehen": "Am westlichen Flusskai.",
      "besonderer_hinweis": "Arbeitet über harmlose Frachtkisten und gefälschte Liefersiegel.",
      "belohnung": "125 Goldstücke",
      "hinweis": "Kontakte im Hafen möglich."
    },
    "5": {
      "name": "Jorin Fassbinder",
      "vergehen": "Vergiftung von Konkurrenzfässern, Sabotage, versuchter Mord",
      "beschreibung": "Menschlicher Mann, blasse Haut, kräftige Arme, trägt meist ein Fassmesser.",
      "zuletzt_gesehen": "Bei Brauereien und Lagerkellern.",
      "besonderer_hinweis": "Mischt Bitterstoffe und Gifte in Getränkevorräte.",
      "belohnung": "110 Goldstücke",
      "hinweis": "Behälter und Werkzeuge als Beweise sichern."
    },
    "6": {
      "name": "Mutter Ruß",
      "vergehen": "Anwerben minderjähriger Diebe, Hehlerei, Bandenführung",
      "beschreibung": "Ältere Frau unbekannter Herkunft, verrußtes Gesicht, humpelnd, spricht freundlich und kalt zugleich.",
      "zuletzt_gesehen": "In den Schornsteingassen des Armenviertels.",
      "besonderer_hinweis": "Nutzt Straßenkinder als Boten und Späher.",
      "belohnung": "130 Goldstücke",
      "hinweis": "Diskretion empfohlen, um die Kinder nicht unnötig zu gefährden."
    },
    "7": {
      "name": "Torvik und die Kettenhunde",
      "vergehen": "Söldnergewalt, Einschüchterung, Entführung von Schuldnern",
      "beschreibung": "Torvik ist ein breitschultriger Halbork mit Kettenpeitsche; 4–6 Gefolgsleute.",
      "zuletzt_gesehen": "Entlang der Speicher und Lagerplätze.",
      "besonderer_hinweis": "Arbeitet gegen Bezahlung für Kredithaie und dubiose Händler.",
      "belohnung": "150 Goldstücke für Torvik, kleinere Summen für bestätigte Gefolgsleute",
      "hinweis": "Nur mit ausreichender Kampfkraft angehen."
    },
    "8": {
      "name": "Yselle von Dorn",
      "vergehen": "Fälschung von Adelsbriefen, Verkauf gefälschter Siegel, Erpressung",
      "beschreibung": "Adlige Erscheinung, dunkles Haar, teure Kleidung, stets mit Handschuhen.",
      "zuletzt_gesehen": "In besseren Gasthäusern und beim Schreiberviertel.",
      "besonderer_hinweis": "Wirkt charmant und kultiviert, ist aber äußerst gefährlich im Umgang mit Dokumenten.",
      "belohnung": "140 Goldstücke",
      "hinweis": "Schriftproben und Siegelwerkzeuge von besonderem Wert."
    },
    "id": "wanted-poster-silber-steckbriefe",
    "titel": "Wanted Poster Silber-Steckbriefe",
    "description": "W8-Zufallstabelle mit Silber-Steckbriefen vom schwarzen Brett.",
    "dice": 8,
    "parts": false
  }
};
