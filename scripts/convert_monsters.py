import json, re, glob, os, math, zipfile
from copy import deepcopy

INPUT_GLOB = '/mnt/data/*.monster'
RAW_DIR = '/mnt/data/converted_monsters/raw_json'
SITE_DIR = '/mnt/data/converted_monsters/site_json'
INDEX_PATH = '/mnt/data/converted_monsters/monster-index.json'
REPORT_PATH = '/mnt/data/converted_monsters/conversion-report.json'
ZIP_PATH = '/mnt/data/converted_monsters_bundle.zip'

os.makedirs(RAW_DIR, exist_ok=True)
os.makedirs(SITE_DIR, exist_ok=True)

CR_XP = {
    '0': 10, '1/8': 25, '1/4': 50, '1/2': 100,
    '1': 200, '2': 450, '3': 700, '4': 1100, '5': 1800, '6': 2300,
    '7': 2900, '8': 3900, '9': 5000, '10': 5900, '11': 7200, '12': 8400,
    '13': 10000, '14': 11500, '15': 13000, '16': 15000, '17': 18000,
    '18': 20000, '19': 22000, '20': 25000, '21': 33000, '22': 41000,
    '23': 50000, '24': 62000, '25': 75000, '26': 90000, '27': 105000,
    '28': 120000, '29': 135000, '30': 155000,
}

ARMOR_BASE = {
    'padded': ('light', 11, None),
    'leather': ('light', 11, None),
    'studded leather': ('light', 12, None),
    'hide armor': ('medium', 12, 2),
    'chain shirt': ('medium', 13, 2),
    'scale mail': ('medium', 14, 2),
    'breastplate': ('medium', 14, 2),
    'half plate': ('medium', 15, 2),
    'ring mail': ('heavy', 14, 0),
    'chain mail': ('heavy', 16, 0),
    'splint': ('heavy', 17, 0),
    'plate': ('heavy', 18, 0),
}

STAT_ORDER = ['str','dex','con','int','wis','cha']
STAT_NAMES = {'str':'Strength','dex':'Dexterity','con':'Constitution','int':'Intelligence','wis':'Wisdom','cha':'Charisma'}
SKILL_TO_STAT = {
    'acrobatics':'dex', 'animal handling':'wis', 'arcana':'int', 'athletics':'str',
    'deception':'cha', 'history':'int', 'insight':'wis', 'intimidation':'cha',
    'investigation':'int', 'medicine':'wis', 'nature':'int', 'perception':'wis',
    'performance':'cha', 'persuasion':'cha', 'religion':'int', 'sleight of hand':'dex',
    'stealth':'dex', 'survival':'wis'
}
SPELL_LEVELS = {
    'cantrip': 0,
    'hellish rebuke': 1, 'speak with animals': 1, 'faerie fire': 1, 'entangle': 1, 'thunderwave': 1,
    'dissonant whispers': 1, 'sleep': 1, 'tashas hideous laughter': 1,
    'heat metal': 2, 'wither and bloom': 2, 'darkvision': 2, 'hold person': 2, 'blindness/deafness': 2,
    'crown of madness': 2, 'mirror image': 2, 'shatter': 2, 'darkness': 2,
    'feign death': 3, 'aura of vitality': 3, 'plant growth': 3, 'water breathing': 3, 'conjure animals': 3,
    'antagonize': 3, 'fear': 3, 'motivational speech': 3,
    'polymorph': 4, 'stoneskin': 4, 'blight': 4, 'confusion': 4, 'greater invisibility': 4,
    'insect plague': 5, 'tree stride': 5, 'wrath of nature': 5, 'scrying': 5, 'awaken': 5,
    'heal': 6, 'wall of thorns': 6, 'flesh to stone': 6,
    'symbol': 7, 'feeblemind': 8, 'foresight': 9,
}


def slugify(text: str) -> str:
    text = text.strip()
    repl = {'ä':'ae','ö':'oe','ü':'ue','ß':'ss','Ä':'Ae','Ö':'Oe','Ü':'Ue'}
    for a,b in repl.items():
        text = text.replace(a,b)
    text = re.sub(r'[_\s]+', '-', text)
    text = re.sub(r'(?<=[a-z0-9])(?=[A-Z])', '-', text)
    text = re.sub(r'[^a-zA-Z0-9-]+', '-', text)
    text = re.sub(r'-+', '-', text).strip('-').lower()
    return text


def humanize_stem(stem: str) -> str:
    text = stem.replace('_', ' ')
    text = re.sub(r'(?<=[a-z0-9])(?=[A-Z])', ' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text


def stat_mod(score: int) -> int:
    return math.floor((score - 10) / 2)


def parse_cr_num(cr: str) -> float:
    cr = str(cr).strip()
    if '/' in cr:
        a,b = cr.split('/')
        return float(a)/float(b)
    return float(cr)


def prof_bonus_from_cr(cr: str) -> int:
    crn = parse_cr_num(cr)
    if crn <= 4:
        return 2
    if crn <= 8:
        return 3
    if crn <= 12:
        return 4
    if crn <= 16:
        return 5
    if crn <= 20:
        return 6
    if crn <= 24:
        return 7
    if crn <= 28:
        return 8
    return 9


def title_case_alignment(text: str) -> str:
    return text.replace('-', ' ')


def replace_mon_placeholder(text: str, name: str, short_name: str) -> str:
    repl = short_name or name
    return text.replace('[MON]', repl)


def extract_avg_formula(hp_text: str):
    m = re.match(r'\s*(\d+)\s*\(([^)]+)\)\s*', hp_text)
    if m:
        return int(m.group(1)), m.group(2).strip()
    return None, hp_text.strip()


def parse_display_int_prefix(text: str):
    m = re.match(r'\s*(\d+)\b', str(text))
    return int(m.group(1)) if m else None


def infer_ac(data, dex_mod):
    armor_name = str(data.get('armorName','')).strip().lower()
    shield = int(data.get('shieldBonus',0) or 0)
    other_desc = str(data.get('otherArmorDesc','')).strip()
    notes = []
    display_int = parse_display_int_prefix(other_desc)
    if armor_name == 'other' and display_int is not None:
        return display_int, other_desc, ['AC taken from custom armor description.']
    if armor_name == 'natural armor' and display_int is not None:
        return display_int, f"{display_int} (natural armor)", []
    if other_desc and '(' in other_desc and display_int is not None:
        return display_int, other_desc, []
    if armor_name in ARMOR_BASE:
        category, base, dex_cap = ARMOR_BASE[armor_name]
        applied_dex = dex_mod if dex_cap is None else min(max(dex_mod, 0), dex_cap)
        value = base + applied_dex + shield
        parts = [armor_name]
        if shield:
            parts.append('shield')
        notes.append('AC inferred from armorName, Dexterity modifier, and shieldBonus.')
        return value, f"{value} ({', '.join(parts)})", notes
    if display_int is not None:
        notes.append('AC taken from numeric armor description because armor type was not recognized.')
        return display_int, other_desc, notes
    # fallback 10 + dex + natArmorBonus + shield
    nat = int(data.get('natArmorBonus',0) or 0)
    value = 10 + dex_mod + nat + shield
    notes.append('AC inferred with fallback formula 10 + Dex mod + natArmorBonus + shieldBonus.')
    return value, str(value), notes


def normalize_damage_types(entries):
    resist, immune, vuln, other = [], [], [], []
    for e in entries or []:
        name = str(e.get('name','')).strip().lower()
        t = str(e.get('type','')).strip().lower()
        note = str(e.get('note','')).strip()
        item = {'name': name}
        if note:
            item['note'] = note.strip()
        if t == 'r':
            resist.append(item)
        elif t == 'i':
            immune.append(item)
        elif t == 'v':
            vuln.append(item)
        else:
            other.append(item)
    return resist, immune, vuln, other


def normalize_conditions(entries):
    return [str(e.get('name','')).strip().lower() for e in entries or [] if str(e.get('name','')).strip()]


def compute_saves(data, prof):
    scores = {s:int(data[f'{s}Points']) for s in STAT_ORDER}
    saves = {}
    for entry in data.get('sthrows',[]):
        stat = str(entry.get('name','')).strip().lower()
        if stat in scores:
            saves[stat] = stat_mod(scores[stat]) + prof
    return saves


def compute_skills(data, prof):
    scores = {s:int(data[f'{s}Points']) for s in STAT_ORDER}
    skills = {}
    for entry in data.get('skills',[]):
        name_raw = str(entry.get('name','')).strip()
        key = name_raw.lower()
        stat = str(entry.get('stat','')).strip().lower() or SKILL_TO_STAT.get(key)
        if stat not in scores:
            stat = SKILL_TO_STAT.get(key)
        if stat not in scores:
            continue
        bonus = stat_mod(scores[stat]) + prof
        note = str(entry.get('note','')).lower()
        if '(ex' in note:
            bonus += prof
        skills[key] = bonus
    return skills


def passive_perception(data, skills):
    wis = int(data['wisPoints'])
    pp = 10 + stat_mod(wis)
    if 'perception' in skills:
        return 10 + skills['perception']
    return pp


def parse_speeds(data):
    speeds = {}
    fields = [('walk','speed'),('burrow','burrowSpeed'),('climb','climbSpeed'),('fly','flySpeed'),('swim','swimSpeed')]
    for out_key, in_key in fields:
        try:
            val = int(str(data.get(in_key,'0')).strip())
        except ValueError:
            continue
        if val > 0:
            speeds[out_key] = f'{val} ft.'
    if data.get('hover'):
        speeds['hover'] = True
    return speeds


def parse_senses(data, pp):
    senses = {}
    for out_key, in_key in [('blindsight','blindsight'),('darkvision','darkvision'),('tremorsense','tremorsense'),('truesight','truesight')]:
        try:
            val = int(str(data.get(in_key,'0')).strip())
        except ValueError:
            continue
        if val > 0:
            senses[out_key] = f'{val} ft.'
    tp = data.get('telepathy',0)
    try:
        tp = int(tp)
    except Exception:
        tp = 0
    if tp > 0:
        senses['telepathy'] = f'{tp} ft.'
    senses['passive_perception'] = pp
    return senses


def normalize_languages(entries):
    speaks, understands = [], []
    for e in entries or []:
        name = str(e.get('name','')).strip()
        if not name:
            continue
        if e.get('speaks'):
            speaks.append(name)
        else:
            understands.append(name)
    return speaks, understands


def clean_text(text: str) -> str:
    text = text.replace('\r\n', '\n').replace('\r', '\n')
    text = re.sub(r'\n{3,}', '\n\n', text)
    return text.strip()


def split_spells(csv_text: str):
    spells = []
    for part in [p.strip() for p in csv_text.split(',')]:
        if not part:
            continue
        part = part.strip('_ ').strip()
        if part:
            spells.append(part)
    return spells


def add_spell_group(target, group, spells):
    if not spells:
        return
    target.setdefault(group, [])
    for sp in spells:
        if sp not in target[group]:
            target[group].append(sp)


def group_spells_by_level(spells):
    grouped = {}
    unknown = []
    for sp in spells:
        lvl = SPELL_LEVELS.get(sp.lower())
        if lvl is None:
            unknown.append(sp)
        elif lvl == 0:
            add_spell_group(grouped, 'cantrips_at_will', [sp])
        else:
            add_spell_group(grouped, f'level_{lvl}', [sp])
    if unknown:
        grouped['unclassified'] = unknown
    return grouped


def parse_spellcasting_from_abilities(abilities):
    result = []
    kept = []
    for ab in abilities:
        name = ab['name']
        desc = ab.get('text', ab.get('desc', ''))
        if name.lower() != 'spellcasting':
            kept.append(ab)
            continue
        entry = {'name': name, 'text': desc, 'spells': {}}
        m = re.search(r'(?:ability is|ability is)\s+([A-Z]{3})\s*\(spell save DC\s*(\d+)\s*,\s*\+?(\d+)\s*to hit\)', desc, re.I)
        if m:
            ability_map = {'STR':'strength','DEX':'dexterity','CON':'constitution','INT':'intelligence','WIS':'wisdom','CHA':'charisma'}
            entry['ability'] = ability_map.get(m.group(1).upper(), m.group(1).lower())
            entry['save_dc'] = int(m.group(2))
            entry['attack_bonus'] = int(m.group(3))
        m2 = re.search(r'is an?\s+(\d+)(?:st|nd|rd|th)-level spellcaster', desc, re.I)
        if m2:
            entry['caster_level'] = int(m2.group(1))
        # bullet formats
        for line in desc.split('\n'):
            line = line.strip(' >-*\t')
            if not line or ':' not in line:
                continue
            lhs, rhs = line.split(':',1)
            lhs = lhs.strip()
            rhs_spells = split_spells(rhs)
            low = lhs.lower()
            if 'cantrip' in low and 'at will' in low:
                add_spell_group(entry['spells'], 'cantrips_at_will', rhs_spells)
                continue
            lvlm = re.search(r'(\d+)(?:st|nd|rd|th)\s+level', low)
            if lvlm:
                lvl = int(lvlm.group(1))
                add_spell_group(entry['spells'], f'level_{lvl}', rhs_spells)
                slotm = re.search(r'\((\d+)\s*slots?\)', low)
                daylvlm = re.search(r'\((\d+)\s*/\s*day\)', low)
                if slotm:
                    entry.setdefault('slots', {})[f'level_{lvl}'] = int(slotm.group(1))
                elif daylvlm:
                    entry.setdefault('usage_by_level', {})[f'level_{lvl}'] = f"{int(daylvlm.group(1))}/day"
                continue
            daym = re.search(r'(\d+)\s*/\s*day', low)
            if daym:
                grouped = group_spells_by_level(rhs_spells)
                for k,v in grouped.items():
                    add_spell_group(entry['spells'], k, v)
                entry.setdefault('usage', {})['daily'] = int(daym.group(1))
                continue
            if 'at will' in low:
                grouped = group_spells_by_level(rhs_spells)
                for k,v in grouped.items():
                    if k.startswith('level_'):
                        add_spell_group(entry['spells'], k, v)
                    else:
                        add_spell_group(entry['spells'], 'cantrips_at_will', v)
                continue
        result.append(entry)
    return kept, result


def normalize_feature_list(entries, name, short_name):
    out = []
    for e in entries or []:
        out.append({
            'name': str(e.get('name','')).strip(),
            'text': clean_text(replace_mon_placeholder(str(e.get('desc','')).strip(), name, short_name))
        })
    return out


def main():
    index = []
    report = []
    for path in sorted(glob.glob(INPUT_GLOB)):
        with open(path, encoding='utf-8') as f:
            data = json.load(f)
        stem = os.path.splitext(os.path.basename(path))[0]
        file_slug = slugify(stem)
        display_name = data['name']
        short_name = data.get('shortName') or display_name
        alias_from_filename = humanize_stem(stem)
        aliases = []
        if slugify(alias_from_filename) != slugify(display_name):
            aliases.append(alias_from_filename)

        raw_json_path = os.path.join(RAW_DIR, f'{file_slug}.json')
        with open(raw_json_path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        ability_scores = {s:int(data[f'{s}Points']) for s in STAT_ORDER}
        ability_mods = {s:stat_mod(v) for s,v in ability_scores.items()}
        cr = str(data.get('cr','0'))
        prof = prof_bonus_from_cr(cr)
        avg_hp, hp_formula = extract_avg_formula(str(data.get('hpText','')).strip())
        ac_value, ac_display, ac_notes = infer_ac(data, ability_mods['dex'])
        saves = compute_saves(data, prof)
        skills = compute_skills(data, prof)
        pp = passive_perception(data, skills)
        senses = parse_senses(data, pp)
        speaks, understands = normalize_languages(data.get('languages'))
        traits = normalize_feature_list(data.get('abilities'), display_name, short_name)
        actions = normalize_feature_list(data.get('actions'), display_name, short_name)
        bonus_actions = normalize_feature_list(data.get('bonusActions'), display_name, short_name)
        reactions = normalize_feature_list(data.get('reactions'), display_name, short_name)
        legendary_actions = normalize_feature_list(data.get('legendaries'), display_name, short_name)
        mythic_actions = normalize_feature_list(data.get('mythics'), display_name, short_name)
        lair_actions = normalize_feature_list(data.get('lairs'), display_name, short_name)
        regional_effects = normalize_feature_list(data.get('regionals'), display_name, short_name)
        traits, spellcasting = parse_spellcasting_from_abilities(traits)
        resist, immune, vuln, other_damage = normalize_damage_types(data.get('damagetypes'))
        notes = []
        notes.extend(ac_notes)
        if aliases:
            notes.append(f'Filename suggests alias/name: {aliases[0]}.')
        custom_cr = str(data.get('customCr','')).strip()
        if custom_cr and not custom_cr.startswith(cr):
            notes.append(f'Ignored inconsistent customCr value "{custom_cr}" and used cr "{cr}".')
        if int(data.get('customProf', 0) or 0) not in (0, prof):
            notes.append(f'Ignored inconsistent customProf value "{data.get("customProf")}" and used proficiency bonus +{prof} from CR.')
        if data.get('speedDesc') and str(data.get('speedDesc')).strip() != ', '.join([f'{k} {v}' if k!='walk' else v for k,v in parse_speeds(data).items() if k!='hover']):
            notes.append('Preserved movement speeds as structured values; source text used mixed formatting/units.')

        site = {
            'id': file_slug,
            'name': display_name,
            'aliases': aliases,
            'source_file': os.path.basename(path),
            'kind': 'monster',
            'npc': data.get('type') == 'humanoid',
            'size': str(data.get('size','')).title(),
            'creature_type': str(data.get('type','')).lower(),
            'subtype': str(data.get('tag','')).strip() or None,
            'alignment': title_case_alignment(str(data.get('alignment','')).strip()),
            'armor_class': {
                'value': ac_value,
                'display': ac_display
            },
            'hit_points': {
                'average': avg_hp,
                'formula': hp_formula
            },
            'speed': parse_speeds(data),
            'abilities': {
                stat: {'score': ability_scores[stat], 'mod': ability_mods[stat]}
                for stat in STAT_ORDER
            },
            'saving_throws': saves,
            'skills': skills,
            'damage_resistances': resist,
            'damage_immunities': immune,
            'damage_vulnerabilities': vuln,
            'special_damage_defenses': data.get('specialdamage') or [],
            'condition_immunities': normalize_conditions(data.get('conditions')),
            'senses': senses,
            'languages': {
                'speaks': speaks,
                'understands': understands
            },
            'challenge_rating': cr,
            'xp': CR_XP.get(cr),
            'proficiency_bonus': prof,
            'traits': traits,
            'spellcasting': spellcasting,
            'actions': actions,
            'bonus_actions': bonus_actions,
            'reactions': reactions,
            'legendary_actions': legendary_actions,
            'legendary_actions_per_round': 3 if data.get('isLegendary') else 0,
            'legendary_description': clean_text(replace_mon_placeholder(str(data.get('legendariesDescription','')).strip(), display_name, short_name)) if data.get('isLegendary') else None,
            'mythic_actions': mythic_actions,
            'lair_actions': lair_actions,
            'regional_effects': regional_effects,
            'display': {
                'double_columns': bool(data.get('doubleColumns')),
                'separation_point': data.get('separationPoint', 0)
            },
            'import_notes': notes,
            'source_format': 'monster builder export'
        }

        site_json_path = os.path.join(SITE_DIR, f'{file_slug}.json')
        with open(site_json_path, 'w', encoding='utf-8') as f:
            json.dump(site, f, ensure_ascii=False, indent=2)

        index.append({
            'id': site['id'],
            'name': site['name'],
            'aliases': site['aliases'],
            'challenge_rating': site['challenge_rating'],
            'xp': site['xp'],
            'file': f'site_json/{file_slug}.json'
        })
        report.append({
            'id': site['id'],
            'source_file': os.path.basename(path),
            'output_file': f'{file_slug}.json',
            'notes': notes
        })

    with open(INDEX_PATH, 'w', encoding='utf-8') as f:
        json.dump(index, f, ensure_ascii=False, indent=2)
    with open(REPORT_PATH, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    with zipfile.ZipFile(ZIP_PATH, 'w', zipfile.ZIP_DEFLATED) as z:
        for root, _, files in os.walk('/mnt/data/converted_monsters'):
            for file in files:
                full = os.path.join(root, file)
                arc = os.path.relpath(full, '/mnt/data')
                z.write(full, arc)

if __name__ == '__main__':
    main()
