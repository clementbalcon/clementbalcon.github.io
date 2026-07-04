# Portfolio — clementbalcon.github.io

## Repo & déploiement
- GitHub Pages : `clementbalcon/clementbalcon.github.io`, branche `main`, push SSH
- Dossier local : `/Users/ClementBalcon/Desktop/clementbalcon.github.io/`
- URL publique : `https://clementbalcon.github.io`

## Stack
- Site statique monofichier (`index.html`) + sous-pages HTML séparées
- CSS embarqué dans chaque fichier, pas de framework
- Fonts Google : Inter + Space Grotesk
- Pas de JS framework — animations en CSS pur

## Thème visuel
- Fond : `#060c15` (dark aerospace / blueprint)
- Accent bleu : `#38bdf8` (sky blue)
- Accent orange : `#fb923c` (amber)
- Grille de fond via `body::before` (CSS, `rgba(56,189,248,0.025)`)
- Lueur radiale via `body::after`
- Variables CSS : `--bg`, `--accent`, `--accent2`, `--text`, `--muted`, `--subtle`, `--card`, `--border`
- Avions animés en `mix-blend-mode: screen` (effet blueprint)
- Rafale uniquement : double traînée de fumée via `::before`/`::after` (deux moteurs)

## Structure des fichiers
```
index.html          — portfolio principal (toutes sections)
nerf.html           — projet TN20 CATIA V5 (16 photos locales, pas de PDF)
robafis.html        — projet RobAFIS (PDF embarqué)
tn06.html           — projet TN06 cric hydraulique (PDF embarqué)
matra.html          — projet PR Solder Pen (pas de PDF, page recap)
cardashboard.html   — projet perso CarDashboard (page recap, thème bleu nuit #1E4A73, lien GitHub)
cardashboard_*.png  — captures iPad/iPhone + icône (assets CarDashboard)
solder_pen.png      — render 3D du Solder Pen (couverture carte Matra)
logo_matra.png      — logo Matra Électronique
logo_safran.jpeg    — logo Safran Aircraft Engines
logo_utc.jpeg       — logo UTC
logo_icn.jpeg       — logo ICN
logo_sayfol.jpeg    — logo Sayfol International School
logo_lycee_moliere.jpeg
logo_utcfutsal.jpeg — logo UTC Futsal
logo_bde.jpeg       — logo BDE UTC
Rafale.png          — avion Rafale (animé, effet blueprint)
A400M.png           — avion A400M (animé, effet blueprint)
robafis.pdf, tn06.pdf, nerf_*.png/jpeg — assets projets
```

## Sections index.html (dans l'ordre)
1. **Hero** — nom, titre, drapeaux, bouton mailto
2. **Qui suis-je** — présentation, langues
3. **Expérience** — timeline Pro + Formation (côte à côte)
4. **Ce que je maîtrise** — skill cards (CAO, Production, Prog, Ingénierie Système)
5. **Projets** — 7 cartes : Solder Pen · RobAFIS · TN06 · Nerf · AM25 Taipei 101 · CarDashboard · Training Tracker
6. **Bénévolat & Associations**
7. **Mon projet** — section AE03 / parcours Safran (vague, confidentiel)

## Timeline — entrées actuelles

### Expérience pro
- **Safran Aircraft Engines** · Sep 2024–Sep 2026 · `logo_safran.jpeg`
  - Division des Moteurs Militaires, Châtellerault
- **Matra Électronique (filiale MBDA)** · 2026 · `logo_matra.png`
  - Prestation JE UTC (UTeam)
- **ICN — Itaguaí Construções Navais** · Juil.–Août 2022 · `logo_icn.jpeg`
  - Stage ouvrier, construction navale, fabrication de sous-marins, Brésil

### Formation
- **UTC Diplôme d'Ingénieur · PIL** · Fév 2024–Sept 2026 · `logo_utc.jpeg`
- **UTC Cycle Ingénieur** · Fév 2022–Fév 2024 · `logo_utc.jpeg`
- **Lycée Molière · Rio** · Août 2018–Nov 2021 · `logo_lycee_moliere.jpeg`
- **Sayfol International School · Kota Kinabalu** · Sept 2017–Juin 2018 · `logo_sayfol.jpeg`

## Logos dans la timeline
Classe `.tl-logo` : `32×32px`, `object-fit: contain`
Classe `.vol-icon` (bénévolat) : `44×44px`

## Couleur signature par sous-page
Chaque sous-page projet a sa propre couleur de fond, mais toutes à la MÊME saturation/profondeur (HSL S≈46% L≈32%) pour rester harmonieuses. Deux valeurs par page : `--bg` + `body{background}` (base) et le `radial-gradient` du `background-image` (highlight, base éclaircie ~L42%). `index.html` (page principale) et `sandbox.html` (jeu) ne suivent PAS cette palette.

| Page | Base | Highlight | Teinte |
|------|------|-----------|--------|
| nerf.html | `#774F2C` | `#9C683A` | rouille |
| robafis.html | `#2C6B77` | `#3A8C9C` | cyan |
| tn06.html | `#77642C` | `#9C843A` | bronze |
| matra.html | `#2C775C` | `#3A9C78` | vert |
| am25.html | `#432C77` | `#573A9C` | indigo |
| cardashboard.html | `#2C5277` | `#3A6B9C` | bleu nuit |
| training.html | `#772C36` | `#9C3A47` (+ accent foncé `#592129`) | grenat |

## Sous-pages projets
Toutes suivent le même template dark aerospace :
- Nav fixe avec `← Portfolio` + titre
- `body::before` grille + `body::after` lueur radiale
- Hero badge + h1 gradient + description
- Meta-row (stats + team/problématiques)
- Tags
- Contenu spécifique (PDF iframe ou sections recap)
- Footer

### matra.html (Solder Pen)
- Pas de PDF embarqué (document confidentiel)
- Couverture : `solder_pen.png` sur fond `#dde6ef` (PNG fond blanc)
- Équipe : Clément Balcon (IM05) + Tristan Marquet (IM04)
- Encadrants UTC : Benoît Eynard, Julien Duligou
- MOA : "Service Innovation & Amélioration Continue — Matra Électronique" (noms individuels retirés)
- 3 phases : Cadrage/EdA → AF/Choix techniques → Conception 3D/Prototypage
- 4 livrables : CDCF/FAST · Modèles 3D/STL · Prototype · Documentation industrielle

## Contraintes de confidentialité (IMPORTANT)

### AE03 Safran (section "Mon projet")
Classifié **C2 Confidentiel**. Règle absolue sur le site public :
- Aucun nom de projet (ni SPECTRA ni VériPart ni aucun autre)
- Aucun nom de moteur (ni M88 ni TP400 ni aucun autre)
- Aucun nom de gate (G0, G1, G2, G3)
- Rester très vague : parler de "production aéronautique", "amélioration continue", "digitalisation"

### PR Matra (matra.html)
Marqué "Document confidentiel". Règle :
- Pas de noms d'employés Matra individuels
- Ne pas mentionner les détails techniques internes (spécifications précises, fournisseurs nommés)
- OK de mentionner : le contexte général, les livrables (FAST, prototype 3D), les compétences mises en œuvre

## Identité
- Clément Balcon, étudiant ingénieur UTC (IM05), spécialité PIL
- Apprenti chez Safran Aircraft Engines (Sep 2024 – Sep 2026)
- Contact : `clement.balcon29@gmail.com`
- Drapeau 🇫🇷 🇧🇷 (né au Brésil, lycée Rio + Kota Kinabalu)

## Commandes utiles
```bash
# Voir les changements
git diff

# Commit + push rapide
git add <fichiers> && git commit -m "message" && git push

# Python pour lire PDF (si besoin)
/Library/Frameworks/Python.framework/Versions/3.10/bin/python3
# pypdf installé dans /tmp/pdflibs2
```
