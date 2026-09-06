# Composition — L'atelier

## Constat sur les moyens disponibles

Aucun outil de génération d'image et aucune installation Blender ne sont
disponibles dans cet environnement (vérifié : `which codex`-style check sur
`/Applications/Blender.app` → absent). La direction artistique du plan
(illustration détaillée, légèrement stylisée, quasi-photographique) demande un
rendu que je ne peux pas produire moi-même sans halluciner un résultat que je
ne peux pas juger.

Décision : construire la scène comme un **dessin technique** (ligne encrée sur
papier, façon plan d'atelier ou dessin de brevet), en SVG inline, plutôt que de
livrer un décor médiocre en prétendant que c'est l'illustration finale. C'est
une direction artistique à part entière — cohérente avec « mécanique de
précision » — pas un simple placeholder honteux : traits nets, projection
cavalière (angle de fuite unique à 28°, profondeur ×0.55) pour donner du volume
sans fausse perspective, silhouettes dessinées à partir des vraies photos des
projets plutôt que des icônes génériques.

Si Clément préfère la direction « illustration peinte / quasi-photo » du plan
d'origine, les deux prompts prêts à l'emploi sont fournis plus bas : à faire
tourner dans un outil d'image (ChatGPT, Midjourney...) que je n'ai pas ici. Le
SVG technique reste alors la base de calibrage des hotspots — seul le fond
change.

## Palette (reprise du thème « établi » existant, aucune nouvelle variable)

- Papier : `--paper` `#eeece4`
- Encre : `--ink` `#252b27`
- Sourdine : `--muted` `#63675f`
- Accent (surlignage) : `--accent` `#bc3b20`
- Plan de travail : `--board` `#e0e1d7`

## Carte objets → destinations (desktop, viewBox 0 0 1600 900)

| # | Objet | Destination | Zone approx. (x,y,w,h) | Rôle |
| - | --- | --- | --- | --- |
| 01 | Solder Pen sur l'établi | matra.html | 300,560,260,140 | Objet principal, premier plan |
| 02 | Robot BACAR sur table de montage | robafis.html | 1080,470,300,330 | Deuxième point fort, silhouette bleue |
| 03 | Écran CAO (assemblage Nerf) | nerf.html | 90,300,260,220 | Poste de conception, fond gauche |
| 04 | Cric sur zone d'essai | tn06.html | 720,600,220,180 | Mécanique / transmission d'effort |
| 05 | Maquette tour + pendule sur étagère | am25.html | 1360,190,190,260 | Référence Taipei 101, schéma de principe |
| 06 | Tablette sur support | cardashboard.html | 590,460,130,140 | Projet logiciel |
| 07 | Carnet + sac de sport, coin personnel | training.html | 70,660,220,150 | Touche personnelle, discret |
| 08 | Panneau de plans (mur) | #experience | 420,50,280,170 | Parcours — optionnel |
| 09 | Tour / fraiseuse (fond) | #projet | 760,140,300,420 | Cap MECA V.A — optionnel |

Aucune zone ne chevauche une autre ; vérifié par script (voir
`hotspots.json` + contrôle de non-recouvrement dans le mode dev).

## Composition mobile (portrait, viewBox 0 0 720 1180)

Pas un recadrage central de la scène large : vue plus resserrée, légèrement
plongeante sur l'établi principal, les objets secondaires regroupés en dessous
en deux rangées plutôt qu'étalés sur un mur lointain qui n'aurait plus de sens
en portrait. Tour/fraiseuse et panneau de plans (liens optionnels vers
#projet/#experience) sont retirés de la scène mobile : la place manque pour les
garder lisibles, et leurs liens texte restent disponibles dans la nav et le
pied de page. Les 7 projets restent tous présents.

## Prompts prêts à l'emploi (si génération d'image souhaitée)

Objets sans texte, sans logo inventé, sans personne. Référence Solder Pen =
`solder_pen.png` (rendu public déjà sur le site) ; référence RobAFIS =
`robafis_img2.png`. Ne pas transmettre de document confidentiel Safran/Matra.

### Desktop (large, ~16:9)

> Vue légèrement plongeante d'un petit atelier de mécanique de précision
> français, composition éditoriale immersive, éclairage soigné. Établi en
> bois clair au premier plan à gauche avec un outil manuel cylindrique noir et
> bleu à gâchette orange (inspiré de la référence fournie) posé dessus, entouré
> d'outils épars. À droite, une table de montage avec un petit robot mécanique
> bleu à roues et bras articulé (inspiré de la référence fournie). En arrière-
> plan gauche, un poste de CAO avec écran affichant un assemblage technique en
> fil de fer. En arrière-plan centre, un tour ou une fraiseuse d'atelier, vert
> industriel désaturé, gris acier. Sur une étagère à droite, une petite
> maquette de tour avec un pendule suspendu à l'intérieur. Une tablette sur un
> support près de l'établi. Un carnet et un sac de sport dans un coin. Métal
> brossé, matières crédibles, lumière naturelle latérale et lampe d'atelier
> chaude. Perspective et échelles cohérentes, objets clairement séparés et
> reconnaissables. Illustration détaillée légèrement stylisée, ambiance
> personnelle et calme. Espace négatif en haut de l'image pour une identité et
> une navigation ajoutées en HTML par-dessus. Aucun texte dessiné, aucune
> marque inventée, aucune personne, aucun effet holographique.

### Mobile (portrait, ~9:16)

> Même atelier, même palette, même lumière, cadrage portrait resserré et
> légèrement plongeant sur l'établi principal au premier plan (outil manuel
> cylindrique noir et bleu à gâchette orange, inspiré de la référence
> fournie). En dessous, deux rangées d'objets regroupés et bien séparés : le
> petit robot mécanique bleu à roues, un écran de CAO affichant un assemblage
> technique en fil de fer, une tablette sur un support, un carnet et un sac de
> sport. Pas de machine-outil lointaine ni de mur d'arrière-plan chargé : la
> composition reste resserrée et lisible en hauteur. Illustration détaillée
> légèrement stylisée, matières crédibles. Espace négatif en haut pour une
> identité ajoutée en HTML. Aucun texte dessiné, aucune marque inventée,
> aucune personne, aucun effet holographique.

## Ce que je livre dans ce chantier

Scène desktop et mobile en SVG inline (`#atelier-desktop`, `#atelier-mobile`
dans `index.html`), un lien `<a>` réel par objet, coordonnées partagées avec le
mode développeur (`?hotspots=1`, contours + centres + identifiants). Pas de
fichier raster dans `assets/atelier/` pour l'instant : le dossier reste prêt à
recevoir la variante illustrée si Clément la fait produire.
