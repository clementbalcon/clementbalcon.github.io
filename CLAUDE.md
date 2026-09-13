# Portfolio — clementbalcon.github.io

## L'accueil — état réel au 13 septembre 2026

`index.html` est l'atelier de mécanique de précision décrit dans
[PLAN_ATELIER_IMMERSIF.md](PLAN_ATELIER_IMMERSIF.md) : un établi avec 7
objets, chacun un vrai `<a href>` vers sa page projet (matra, robafis, nerf,
tn06, am25, cardashboard, training). Vue par défaut = `#atelier`, affichée en
**plein écran** (voir plus bas). Trois autres vues dans la nav : `#projects`
(« Tous les projets », accès texte complet, l'ancienne interface « L'établi »
à dossiers), `#experience` (« Le parcours »), `#projet` (« Le cap »).

### Établi : image 2D + rendu 3D, amélioration progressive stricte
Deux couches, jamais l'une sans l'autre :

- **Base, toujours présente, jamais retirée du DOM** : image générée par IA
  (`assets/atelier/scene-desktop.webp` desktop, `scene-mobile.webp` mobile —
  pas un recadrage l'une de l'autre), avec les 7
  `<a class="atelier-hotspot" data-hotspot="…">` positionnés en % par-dessus
  dans un `.atelier-scene-wrap` (`position: relative`). Fonctionne sans JS,
  sans souris, avec un lecteur d'écran — c'est le vrai repli, pas juste un
  état de chargement.
- **Amélioration, si les conditions sont réunies** : rendu Three.js (r0.160,
  CDN jsdelivr, importmap dans le `<head>`) qui charge
  `assets/atelier3d/atelier_scene.glb` (~310 Ko) — l'établi et ses 7 objets,
  plus tour/fraiseuse/CNC/stock de matières en décor, une lampe industrielle
  en « coupole » (spot + brouillard, pour attirer l'œil au centre et estomper
  le décor). Orbite à 360° au glisser — **souris ET tactile** : OrbitControls
  gère le glisser/pincer nativement, et le raycasting marche identiquement au
  tap qu'au clic (Pointer Events unifie les deux) — zoom volontairement
  borné (`minDistance`/`maxDistance` 1.5–8.5) pour ne jamais sortir de
  l'ambiance. S'active si `!prefers-reduced-motion` **et** WebGL disponible
  **et** le modèle charge sans erreur — sinon (JS coupé, mouvement réduit,
  échec réseau, WebGL absent) l'image reste affichée telle quelle. Dès que
  ces conditions sont réunies, l'image est masquée (`visibility: hidden`)
  *avant* le chargement du modèle — pas de flash image→3D, le fond sombre de
  la scène sert d'attente naturelle (~1s) ; l'image est ré-affichée
  automatiquement si le chargement échoue à n'importe quelle étape.
- Le point de montage `#atelier3d-mount` est un **enfant direct de
  `.atelier-stage`** (pas d'un wrap desktop/mobile en particulier, pour
  fonctionner sur les deux) : le script choisit au chargement le wrap
  actuellement affiché (repère `max-width: 740px`, même que le CSS).
- Survol souris = contour blanc (technique de la coque inversée : copie
  légèrement agrandie du mesh, rendue de l'intérieur), pas d'étiquette
  flottante en 3D. Focus clavier (Tab) déclenche ce **même contour**, pas le
  rectangle 2D — ses coordonnées sont calées sur l'image plate et n'ont plus
  aucun rapport avec la disposition 3D, le montrer faisait apparaître un
  rectangle fantôme sans lien avec la scène (bug remonté par Clément, corrigé).
  L'étiquette texte (`#atelier-tag`) continue de s'afficher au focus,
  comportement hérité du 2D, inchangé.
- Clic/tap sur un objet 3D → raycasting puis `.click()` sur le vrai `<a>`
  correspondant (`data-hotspot="matra"` → objet `obj_matra` du modèle) : une
  seule source de vérité pour les liens, pas de carte dupliquée dans le
  script 3D. Les 7 `<a class="atelier-hotspot">` restent dans le DOM et dans
  l'ordre de tabulation même quand le 3D est actif (classe
  `.atelier-3d-active` sur le wrap : les hotspots passent à `opacity:0;
  pointer-events:none`, sauf sur `:focus-visible` — voir ci-dessus).
- **Pas de script Blender source committé** — le script de génération de la
  scène (matériaux, objets, décor, lampe) vivait dans un scratchpad de
  session qui a été purgé par un reset d'environnement. Toute modification
  de géométrie depuis (ex. la tige de la lampe rallongée à 8 unités pour ne
  plus voir son extrémité) s'est faite en ré-import/édition/export direct du
  GLB via Blender headless, objet par objet. Si une refonte plus profonde de
  la scène est nécessaire, il faudra soit reconstruire le script depuis
  zéro, soit continuer à éditer le GLB directement.

### Plein écran de l'atelier
`body.atelier-immersive` (posé par défaut sur la vue atelier via `show()`
dans le routeur, retiré ponctuellement par le bouton `#atelier-fullscreen-exit`
jusqu'à la prochaine navigation — recliquer sur « 01 L'atelier » réactive le
plein écran) : header (`.masthead`) et barre de vues (`.toolbar`) masqués
(`display:none`), `.atelier-stage` en `position:fixed;inset:0`. Le ratio
natif est conservé (`aspect-ratio: 16/9` desktop, `900/1599` mobile) plutôt
qu'un `object-fit:cover` qui décalerait les hotspots en % par rapport à
l'image visible — léger lettrboxing accepté sur les écrans très différents
de ces ratios. Hors plein écran, `.atelier-stage` garde un traitement de
carte (coins arrondis 14px, halo vert fin `rgba(64,145,108,.35)`, ombre
douce) — **volontairement différent du reste du site** (voir thème
ci-dessous) : son fond sombre ne peut pas se fondre dans le vert de la page
comme du texte, contrainte confirmée explicitement par Clément.

### Thème vert (13 septembre 2026)
Rappel de l'ancien fond `#40916C` du site, d'avant la refonte atelier :
- `--paper` (`#bcdcc5`) et `--board` (`#acd2b8`) remplacent le crème
  d'origine (`#eeece4`/`#e0e1d7`) — même luminosité, mêmes contrastes texte
  déjà validés partout, juste reteinté. Un premier essai plus pâle
  (`#e6f0ea`/`#d7e9df`) a été jugé « lu comme blanc, pas vraiment vert » et
  approfondi.
- `--site-green` (`#40916c`) = fond plein du **header uniquement**
  (`.masthead`, `.toolbar`), texte clair `--site-green-ink`. Le **footer
  n'a pas ce bandeau** — retiré après retour de Clément (« je veux que le
  site soit fluide ») : un deuxième bandeau plein en plus du header faisait
  trop de zones cloisonnées.
- **Aucun cadre nulle part sauf l'atelier** : « Tous les projets »
  (`.workspace`) et « Le parcours »/« Le cap » (`.folio`, partagé) n'ont ni
  bordure, ni ombre, ni coins arrondis, ni marge — le contenu est posé
  directement sur le fond vert de la page. Deux itérations ont précédé ce
  résultat : la première (même traitement carte que l'atelier : coins +
  halo) a été jugée encore « à part » ; Clément a précisé vouloir du contenu
  qui flotte sans conteneur visible du tout, d'où le retrait complet. Ne pas
  réintroduire de cadre sur ces vues sans qu'on le redemande explicitement.

### Curseur des sous-pages projet
Les 7 pages projet (matra, robafis, nerf, tn06, am25, cardashboard,
training) n'ont plus de jeu curseur-avion. `rafale-game.js` (partagé par les
7) ne contient plus que le nécessaire pour le portail de sortie
(« Sortie », en haut à droite) : clic ou Entrée/Espace au clavier, avec un
fondu blanc de transition. Curseur natif partout, plus de `cursor: none` ni
de canvas/jeu. Les fichiers `rafale_top.webp`, `mica.png`, `F35.png`
restent utilisés par `sandbox-game.js` (page `sandbox.html`, séparée, non
concernée) — ne pas les supprimer. Le jet-hero historique de `index.html`
(avion scrubé au scroll → curseur-jeu) n'existe plus du tout dans le fichier
actuel — seul un alias de hash (`'jet-hero': 'atelier'`) reste dans le
routeur pour qu'un ancien lien ne casse pas.

### Fichiers de référence
- `design/atelier/composition.md` : débat Claude/Codex sur la composition de
  l'image 2D, prompts utilisés pour la génération.
- `hotspots.json` : coordonnées % desktop/mobile des 7 zones cliquables.
- `assets/atelier/scene-*-raw.png` : sorties brutes de génération (gardées,
  gitignorées) ; les `.webp` optimisés sont ce qui charge réellement.
- `assets/atelier3d/atelier_scene.glb` : le modèle 3D (voir plus haut pour
  l'absence de script source).

### Mode développeur
`index.html?hotspots=1` affiche contours, centre et identifiant de chaque
zone interactive (classe `.hotspot-debug` sur `body`, overlay CSS + un
`<span class="hotspot-debug-dot">` injecté par JS) — à utiliser pour
recalibrer `hotspots.json` après tout changement de cadrage ou de
régénération d'image. Fonctionne aussi par-dessus le rendu 3D.

### Codex pour Claude Code
Plugin installé (`/plugin marketplace add openai/codex-plugin-cc`,
`/plugin install codex@openai-codex`). Invocation uniquement via l'agent
`codex:codex-rescue` (forwarder simple vers `codex-companion.mjs task`, voir
la skill `codex:codex-cli-runtime`). Auth réutilisée depuis la CLI Codex
locale déjà connectée en `chatgpt` — ne jamais configurer de clé API séparée
pour ce projet, ça activerait une facturation que Clément a explicitement
refusée. **Limite rencontrée à plusieurs reprises** : Chromium refuse de se
lancer dans le bac à sable de Codex (`Operation not permitted` /
`MachPortRendezvousServer: Permission denied`) — Codex ne peut donc pas
vérifier visuellement son propre travail via Playwright. Toujours revérifier
soi-même (Playwright en direct, hors du bac à sable Codex) tout changement
CSS/visuel fait par Codex avant de le pousser.

### Piège d'environnement rencontré
macOS a révoqué l'accès à tout `~/Documents` en pleine édition (bug TCC) —
`ls`, Python et les outils de fichiers du CLI Claude Code renvoyaient tous
`Operation not permitted` sur le dossier entier, pas seulement ce dépôt. Un
simple octroi de Full Disk Access au Terminal n'a pas suffi tant que l'appli
n'avait pas été entièrement quittée (Cmd+Q) puis rouverte — les process déjà
lancés gardent l'état TCC refusé jusqu'au redémarrage. Si ça se reproduit :
redémarrer Terminal, pas seulement retenter.

Séparément, les scratchpads de session (utilisés pour le prototypage 3D,
les scripts Blender, les installations Playwright) peuvent disparaître d'un
reset d'environnement à l'autre — c'est ce qui a fait perdre le script de
génération de la scène 3D (voir plus haut). Ne rien considérer comme durable
en dehors du dépôt Git lui-même.

### Non fait / limites connues
- Pas de test Safari réel (Chromium uniquement via Playwright).
- Ordre de tabulation des 7 objets de l'atelier stable mais pas strictement
  trié en ordre de lecture visuelle — fonctionnel, perfectible.
- Pas de ré-audit complet des 7 pages projet + Training au-delà de la
  vérification faite lors du retrait du curseur-jeu.
- Une seule génération de chaque image 2D (pas d'itération sur plusieurs
  variantes) — si un détail gêne à l'usage, une régénération ciblée reste
  possible plutôt qu'un correctif manuel de l'image.
- Clic/tap 3D vérifié sur un sous-ensemble des 7 objets à chaque campagne de
  test (raycasting sur meshes réels, donc fiable), pas systématiquement les
  7 un par un à chaque changement — le mécanisme sous-jacent est le même
  pour tous, mais à revérifier si un objet précis semble insensible en usage
  réel.

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
  ou morph. Fichiers Blender et 150 frames inchangés ; le jeu curseur des
  sous-pages, lui, a depuis été retiré (voir note du 7 septembre plus haut).
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
- (Périmé depuis le 7 septembre — voir note plus haut) Les pages projets
  conservaient un jeu curseur-avion en mode normal, avec un portail statique
  activable au clavier en `prefers-reduced-motion: reduce`. Le jeu a été
  retiré ; le portail clic/clavier est désormais le seul mécanisme, dans
  tous les modes. Le sandbox (page séparée) attend toujours un clic explicite
  sur « Lancer le jeu animé », inchangé.
- (Périmé, ne s'applique plus depuis le retrait du jeu) Correction `955c4f3` :
  le jeu des sous-pages attendait un mouvement de souris avant de permettre
  une collision de navigation avec le portail, pour éviter qu'une lecture au
  clavier sans souris ne renvoie vers l'accueil au spawn. Gardé pour mémoire
  du bug d'origine, plus pertinent maintenant que le jeu n'existe plus.
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
**Périmé : ce hero n'existe plus du tout dans `index.html` actuel (remplacé
par l'atelier, voir tout en haut du fichier). Section gardée pour mémoire
technique uniquement (les fichiers Blender/frames existent toujours mais ne
sont plus chargés par la page).**
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
**Périmé : décrit l'ancien hero ci-dessus, plus chargé par `index.html`.**
Le thème réellement actif aujourd'hui (papier/encre reteinté en vert) est
documenté tout en haut du fichier, section « Thème vert ».
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
assets/atelier/      — image 2D de l'atelier (desktop/mobile, webp + raw png)
assets/atelier3d/     — modèle 3D de l'atelier (atelier_scene.glb)
```

## Sections index.html (dans l'ordre)
0. **L'atelier** — établi 2D/3D, plein écran, 7 objets → 7 pages projet
1. **Tous les projets** — sept dossiers consultables (ex-« L'établi »)
2. **Le parcours** — timeline Pro + Formation, compétences, associatif
3. **Le cap** — section AE03 / parcours Safran (vague, confidentiel)

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
