# Portfolio — clementbalcon.github.io

## L'atelier — état réel au 7 septembre 2026

L'accueil (`index.html`) est l'atelier de mécanique de précision décrit dans
[PLAN_ATELIER_IMMERSIF.md](PLAN_ATELIER_IMMERSIF.md) : deux images
(`assets/atelier/scene-desktop.webp`, `scene-mobile.webp`, pas un recadrage
l'une de l'autre) avec des `<a href>` réels positionnés en pourcentage
par-dessus, un par projet (7 : matra, robafis, nerf, tn06, am25,
cardashboard, training). Vue par défaut = `#atelier`. L'ancienne interface
« L'établi » (dossiers) est devenue la vue « Tous les projets » (`#projects`),
l'accès texte explicite demandé par le plan. Les 2 accès optionnels
(#experience, #projet) ne sont plus des objets de la scène — seulement dans
la nav (voir composition.md, choix de Codex repris tel quel).

**Traitement visuel — deuxième itération, celle qui reste** : illustration
générée (photo-réaliste, éclairage chaud d'atelier), pas le dessin technique
SVG de la première tentative (rejeté : « le résultat est naze », ça se
lisait comme un diagramme, pas un lieu). Générée via le plugin Codex pour
Claude Code (`openai/codex-plugin-cc`), qui a utilisé la génération d'image
incluse dans l'abonnement ChatGPT déjà connecté à la CLI Codex locale
(`auth_mode: chatgpt`, vérifié avant coup — aucune clé API, aucune
facturation séparée activée). Les fichiers `scene-*.svg` dans
`design/atelier/` restent comme référence historique de la première
tentative ; ne pas les réintégrer.

**Fichiers de référence** : `design/atelier/composition.md` (les deux
directions successives, le debat Claude/Codex, les prompts utilisés),
`hotspots.json` (coordonnées en % partagées desktop/mobile, vérifiées sans
chevauchement — recalibrées sur les nouvelles images, les anciennes valeurs
SVG sont obsolètes), `assets/atelier/scene-*-raw.png` (sorties brutes de
génération, ~2,4 Mo chacune, gardées comme source — les `.webp` optimisés à
~175 Ko chacun sont ce qui est réellement chargé par `index.html`).

**Structure des hotspots** : chaque `<a class="atelier-hotspot" data-hotspot="…">`
est positionné en `left/top/width/height` (%) directement dans son `style`,
à l'intérieur d'un `.atelier-scene-wrap` (`position: relative`) qui contient
aussi l'`<img>`. Pas de `<rect class="hit">` imbriqué comme dans l'ancienne
version SVG — le lien lui-même EST la zone cliquable. `.atelier-hotspot:hover`
et `:focus-visible` partagent le même style (bordure + fond teintés) ; l'état
`.is-focused` (posé par le JS au retour d'une page projet) déclenche le même
style.

**Ids renommés** : les 7 anciens dossiers (`id="matra"` etc.) sont devenus
`id="dossier-matra"` etc. pour libérer les ids courts, désormais utilisés par
le routeur pour désigner l'objet correspondant dans l'atelier (`#matra` =
« va à l'atelier et mets en évidence le Solder Pen », plus « ouvre
matra.html » pour le lien réel de l'objet lui-même). Si un nouveau lien
interne vers un dossier doit être ajouté (ex. liens « preuve » de la section
compétences), cibler `#dossier-<id>`, pas `#<id>`.

**Mode développeur** : `index.html?hotspots=1` affiche contours, centre et
identifiant de chaque zone interactive (classe `.hotspot-debug` sur `body`,
overlay CSS + un `<span class="hotspot-debug-dot">` injecté par JS) — à
utiliser pour recalibrer `hotspots.json` après tout changement de cadrage ou
de régénération d'image.

**Codex pour Claude Code** : plugin installé (`/plugin marketplace add
openai/codex-plugin-cc`, `/plugin install codex@openai-codex`). Invocation
uniquement via l'agent `codex:codex-rescue` (forwarder simple vers
`codex-companion.mjs task`, voir la skill `codex:codex-cli-runtime` pour la
convention d'appel exacte). Auth réutilisée automatiquement depuis la CLI
Codex locale déjà connectée en `chatgpt` — ne jamais configurer de clé API
séparée pour ce projet, ça activerait une facturation que Clément a
explicitement refusée.

**Piège d'environnement rencontré** : macOS a révoqué l'accès à tout
`~/Documents` en pleine édition (même famille de bug TCC que le dossier
Desktop, documenté plus bas) — `ls`, Python et les outils de fichiers du
CLI Claude Code renvoyaient tous `Operation not permitted` sur le dossier
entier, pas seulement ce dépôt. Un simple octroi de Full Disk Access au
Terminal n'a pas suffi tant que l'appli n'avait pas été entièrement quittée
(Cmd+Q) puis rouverte — les process déjà lancés gardent l'état TCC refusé
jusqu'au redémarrage. Si ça se reproduit : redémarrer Terminal, pas
seulement retenter.

**Non fait / limites connues** (voir aussi section 16-17 du plan) :
- Pas de test Safari réel (uniquement Chromium via Playwright dans cet
  environnement).
- Ordre de tabulation des 7 objets stable mais pas strictement trié en ordre
  de lecture visuelle (gauche→droite, haut→bas) — fonctionnel, perfectible.
- Pas de ré-audit complet des 7 pages projet + Training (elles n'ont pas été
  modifiées dans ce chantier, mais n'ont pas non plus été re-testées).
- Une seule génération de chaque image (pas d'itération sur plusieurs
  variantes) — acceptée telle quelle par Clément après revue, mais si un
  détail gêne à l'usage (ex. le cric TN06 partiellement hors cadre côté
  mobile), une régénération ciblée reste possible plutôt qu'un correctif
  manuel de l'image.

## Historique — avant l'atelier (« L'établi », interface papier)

Ce qui suit décrit l'état à `338234d`, antérieur à l'intégration de
l'atelier. Gardé pour mémoire : le contenu (parcours, compétences,
confidentialité) reste valable, mais la description de l'accueil ne
correspond plus à ce qui est chargé aujourd'hui.

## État actuel — septembre 2026
- Copie de travail : `/Users/ClementBalcon/Documents/Pro/clementbalcon.github.io`.
  Éviter la copie Desktop (commandes Git susceptibles de rester bloquées).
- Direction actuelle : **L'établi**, un portfolio à dossiers consultables.
  Papier `#eeece4`, encre `#252b27`, accent vermillon `#bc3b20`, Archivo condensée
  et légendes monospace. Privilégier les objets réels, les schémas et les règles
  fines. La grille de cartes vert sombre de `0819bb8` a été abandonnée après
  retour de Clément : elle était trop générique et conservait le mauvais hero.
- Trois vues : `#projects` (sept dossiers, un seul visible), `#experience`
  (terrain, formation, compétences et engagements), `#projet` (cap MECA V.A).
  Sur desktop, liste verticale et planche de travail ; sur mobile, liste
  d'onglets défilant localement et une seule fiche. Ne pas réempiler les sept
  dossiers dans le parcours normal ni recréer un hero d'introduction long.
- `index.html` n'affiche plus de Rafale et ne charge ni frame, ni GSAP,
  ScrollTrigger, Lenis ou jeu curseur. Aucun canvas, scroll verrouillé, autoplay
  ou morph. Fichiers Blender, 150 frames et jeu des sous-pages inchangés.
  La nouvelle image de partage `og-atelier.jpg` est une capture de l'accueil.
- Les images des projets sont les assets publics existants. Le schéma Taipei
  est un SVG de principe, pas un résultat de simulation. Le diagramme Training
  décrit les fonctions, sans inventer de mesures. Le zoom est une transformation
  CSS actionnée par bouton, sans interpolation de nouvelles vues CAO.
- Les ancres (`#matra`, `#robafis`, etc.) ouvrent le bon dossier au chargement.
  `history.pushState`, `popstate` et `hashchange` assurent les retours navigateur.
  Les anciennes ancres `#work`, `#path`, `#about`, `#hero`, `#jet-hero` sont des
  alias JS. `#skills` ouvre le parcours et son détail ; `#sandbox` reste au footer.
- Amélioration progressive : HTML complet visible sans JS ; les liens natifs
  restent fonctionnels. JS applique `hidden`, rôles tab/tablist/tabpanel et
  tabindex mobile/desktop ; flèches, Home et End activent les dossiers.
  Curseur natif et focus visible. Le mode mouvement réduit coupe les transitions.
- Les pages projets conservent le jeu curseur en mode normal. Avec
  `prefers-reduced-motion: reduce`, elles utilisent le curseur natif et des
  portails statiques activables au clavier. Le sandbox attend alors un clic
  explicite sur « Lancer le jeu animé ».
- Correction `955c4f3` : le jeu des sous-pages attend un mouvement de souris
  avant de permettre une collision de navigation avec le portail. Sans cela,
  la position initiale du pointeur virtuel restait au spawn et renvoyait vers
  l'accueil à l'expiration du cooldown, même pendant une lecture sans souris.
- Vérifier les huit pages portfolio et l'écran public de `training.html` aux
  largeurs 375 / 680 / 1440, dans les deux modes de mouvement. Ne pas considérer
  un simple parsing HTML comme une validation responsive.
- En environnement Codex, serveur local ET Chromium doivent s'exécuter dans le
  même contexte autorisé hors bac à sable : un serveur autorisé peut être
  inaccessible depuis un `curl` resté dans le bac à sable. Playwright et Chromium
  sont déjà présents dans `/private/tmp/pw-check` et `~/Library/Caches/ms-playwright`.
- Ne pas pousser sans accord de Clément. Les contraintes de confidentialité
  ci-dessous restent applicables.

### Validation de L'établi — 6 septembre 2026
- Chromium / Playwright : 54 combinaisons (8 pages portfolio + écran public
  Training × 375 / 680 / 1440 × mouvement normal / réduit), sans débordement
  horizontal, image visible manquante, ancre cassée ou erreur JS détectée.
- 54 états de l'accueil supplémentaires : sept dossiers et deux autres vues,
  aux trois largeurs et dans les deux modes. Chaque vue est isolée et ses
  visuels chargent. Captures inspectées, notamment les cadrages mobile/desktop.
- Flèches / Home / End, zoom via Espace, liens de compétences, précédent /
  suivant et rechargement des dix ancres principales vérifiés. Les portails
  restent activables avec Entrée ; AM25 ne quitte plus la page sans souris.
- Sans JS : les sept dossiers et trois vues restent accessibles aux largeurs
  375 et 1440. CDN de polices bloqué : 45 états (neuf vues × cinq largeurs,
  375 / 680 / 820 / 1024 / 1440) sans débordement horizontal.
- Accueil Solder Pen : 928 px de hauteur à 1440×900, 1078 px à 375×900.
  Les autres dossiers remplacent la fiche au lieu d'allonger la page.
- Rapport : `/private/tmp/pw-check/portfolio-audit/report.json`, états dans
  `atelier.json`, contrôle CDN dans `resilience.json`, captures `atelier-*.png`.
  Lanceur : `node /private/tmp/pw-check/portfolio-audit.cjs` hors bac à sable.
  Option `--social` : capture 1200×630 de l'accueil vers `og-atelier.jpg`.
- Limites : Chromium uniquement, pas de connexion à Training ni de validation
  visuelle du lecteur PDF natif headless. Les contraintes de confidentialité
  Safran / Matra ont été conservées. Aucun push effectué.

### Validation précédente — 5 septembre 2026
- Chromium / Playwright : 54 combinaisons (9 pages × 3 largeurs × 2 modes),
  sans débordement horizontal, image manquante ou erreur JavaScript détectée.
- Aucun effet CSS actif en mode mouvement réduit au chargement ; le jeu curseur
  des sous-pages n'est pas initialisé dans ce mode. Le jeu du sandbox est opt-in.
- Focus clavier visible, activation Entrée des sept portails de retour vérifiée
  en desktop dans les deux modes ; ancres de destination contrôlées.
- Rapport et captures locaux : `/private/tmp/pw-check/portfolio-audit/`.
  Lanceur : `node /private/tmp/pw-check/portfolio-audit.cjs` hors bac à sable.
- Limites : tests sous Chromium, sans session authentifiée Training. Les liens
  vers les PDF existent ; le lecteur PDF natif headless peut interrompre ses
  requêtes (`ERR_ABORTED`), ce qui ne constitue pas une validation visuelle des PDF.

Les descriptions détaillées du hero et de l'ancien accueil ci-dessous sont une
référence historique antérieure à `0819bb8`, pas la mécanique actuellement chargée.
Les règles de confidentialité et les descriptions des sous-pages restent valables.

## Repo & déploiement
- GitHub Pages : `clementbalcon/clementbalcon.github.io`, branche `main`, push SSH
- Dossier local : `/Users/ClementBalcon/Documents/Pro/clementbalcon.github.io/`
- URL publique : `https://clementbalcon.fr` (GitHub Pages)

## Stack
- Site statique monofichier (`index.html`) + sous-pages HTML séparées
- CSS embarqué dans chaque fichier, pas de framework
- Fonts Google : Archivo (variable, axes `wght` 100-900 + `wdth` 62.5-125%) — remplace Inter + Bebas Neue.
  `--font-display` (titres, `font-weight:800; font-stretch:125%`) et `--font-body` (texte courant, poids par défaut),
  déclarées en variables CSS dans chacun des 8 fichiers HTML (hors `training.html`, non concerné).
- Accueil : JS natif embarqué. GSAP / ScrollTrigger / Lenis concernaient le hero historique.

## Jet hero (séquence Rafale scrubée au scroll, façon rideradian.com) — v2
- `#jet-hero` (450vh, 360vh mobile) > `.jet-sticky` (sticky 100vh) > `#jet-canvas` + `.jet-title`
- 150 frames WebP transparentes 1920×1080 dans `frames/hero/` (~4,2 Mo), rendues avec Blender (EEVEE)
- Scène Blender autonome (textures packées) : `blender/rafale_hero.blend` + script `blender/animate_render_v2.py`
  (`setup_scene.py` / `animate_render.py` = ancienne v1, gardés pour référence)
- Modèle 3D : « Dassault Rafale » par andertan (Sketchfab), CC Attribution — crédit obligatoire au footer
- Trajectoire caméra (LINEAR, `cam.location`, world-space) : face lointaine (f1, titre devant l'avion)
  → face proche (f45, bascule z-index + fondu du titre entre 28-40% de scroll) → 3/4 avant (f75)
  → profil (f105) → vue plongeante petite (f150, ~19,5% de large). Nez du modèle vers -X.
- Rotation Z de la MESH (pas du pivot — `HeroPivot` est un empty non parenté, tourner le pivot ne
  fait rien) de 0 à 57.42° entre f105 et f150 : corrige le roulis imprévisible de la contrainte
  TRACK_TO en vue quasi verticale pour finir exactement horizontal, nez à gauche (convention de
  `Rafale.png`, qui est une vue de DESSUS, pas un profil).
- **Morph vers le curseur-jeu** : à la fin du scroll (`onLeave` du ScrollTrigger principal),
  `jetLandingRect()` calcule où l'avion finit à l'écran (même math "cover" que le dessin canvas)
  et appelle `window.__jetSpawn(rect)` — défini par le jeu inline plus bas dans le fichier (PAS
  `rafale-game.js`, qui sert aux sous-pages) — qui positionne le curseur-avion (`wrap`, normalement
  caché à `opacity:0` et dont la boucle `tick()` ne démarre qu'au premier spawn) à cet endroit avec
  un effet de pop-in, puis fond le canvas vers transparent. `onEnterBack` fait l'inverse
  (`window.__jetDespawn()`). Sur mobile (pas de jeu, `window.__jetSpawn` indéfini) : pas de morph,
  le canvas reste affiché sur sa dernière frame.
- `prefers-reduced-motion` : hero réduit à 100vh, frame 1 statique, pas de morph ni de curseur-jeu.
- Pour re-rendre : `/Applications/Blender.app/Contents/MacOS/Blender -b blender/rafale_hero.blend -P blender/animate_render_v2.py`
- Piège de vérification : dans l'outil de preview utilisé pour développer ceci, `requestAnimationFrame`
  ne se déclenche pas tout seul (tab non visible) — ni le ticker GSAP ni les transitions CSS n'avancent
  sans être forcés (`gsap.ticker.tick()` en boucle). Sur un navigateur normal, aucun souci : c'est
  une limite de l'outil de test, pas du site.

## Thème visuel
- Fond : `#40916C` (vert), highlight radial `#52a87e` — l'ancien thème dark aerospace `#060c15` n'est plus utilisé sur index
- Variables CSS : `--bg`, `--white`, `--w70`, `--w40`, `--w20`
- Curseur desktop : Rafale jouable (`rafale-game.js`, `Rafale.png`), `cursor: none`

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
0. **Jet hero** — séquence Rafale au scroll, nom + titre en overlay (hors `.wrap`)
1. **Hero** — bio + langues (le nom/titre a migré dans le jet hero)
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

# Commit local après validation ; push uniquement après accord de Clément
git add <fichiers> && git commit -m "message"

# Python pour lire PDF (si besoin)
/Library/Frameworks/Python.framework/Versions/3.10/bin/python3
# pypdf installé dans /tmp/pdflibs2
```
