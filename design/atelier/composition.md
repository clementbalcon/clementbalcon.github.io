# Composition — L'atelier

## Résultat final (7 septembre 2026) — lire ceci en premier

Le dessin technique SVG décrit ci-dessous (section suivante) a été jugé raté
par Clément : « le résultat est naze », ça se lisait comme un diagramme, pas
un lieu. Deuxième itération : Claude et Codex (via le plugin `openai/codex-plugin-cc`,
installé depuis) ont d'abord confronté leurs idées de composition en lecture
seule (voir « Débat Claude/Codex » plus bas), puis Codex a généré directement
les deux images finales via la génération d'image incluse dans l'abonnement
ChatGPT déjà connecté à sa CLI locale — aucune clé API, aucune facturation
séparée. Résultat : `assets/atelier/scene-desktop.webp` et `scene-mobile.webp`
(+ les `-raw.png` non compressés, gardés comme source), intégrés dans
`index.html` avec des `<a>` réels positionnés en pourcentage par-dessus
(coordonnées dans `hotspots.json`, retracées entièrement sur les nouvelles
images — les anciennes valeurs SVG ne servent plus à rien).

Composition retenue : celle proposée par Codex (établi éclairé comme point
d'ancrage, robot BACAR comme silhouette la plus forte, Solder Pen en
découverte au premier plan, cric/Taipei/CAO/tablette/carnet répartis autour,
**pas** de fraiseuse ni de panneau de plans dans la scène — ces deux accès
optionnels restent uniquement dans la nav). Le désaccord Claude/Codex sur la
hiérarchie visuelle (Solder Pen à poids égal vs. robot dominant) et sur la
méthode de production (composer les vraies photos vs. tout régénérer) a été
tranché par Clément en faveur de la proposition Codex, testée directement en
image plutôt que débattue davantage.

Ce qui suit (sections « Constat sur les moyens disponibles » à « Prompts
prêts à l'emploi ») documente la **première itération**, gardée pour
mémoire — le raisonnement sur pourquoi le SVG a été choisi puis rejeté reste
instructif, mais ce n'est plus l'état du site.

## Débat Claude/Codex sur la composition (lecture seule, avant génération)

Résumé des positions, en désaccord assumé plutôt que convergées de force :

| Point | Claude | Codex |
|---|---|---|
| Hiérarchie visuelle | Solder Pen et robot à poids égal | Robot dominant, Solder Pen secondaire (retenu) |
| Liens optionnels (parcours/cap) | Gardés en décor non cliquable sur desktop | Retirés de la scène, dans la nav uniquement (retenu) |
| Méthode de production | Décor généré + vraies photos produits composées dessus | Scène entièrement générée, objets réinventés (retenu) |
| Disposition mobile | Tension non tranchée (lisibilité vs. crédibilité) | Surface continue, pas de grille (retenu) |

Codex a aussi relevé, à raison, que la contrainte « zéro chevauchement »
entre zones était un artefact du dessin technique à la main (pas un vrai
principe de composition une fois une illustration réelle en place), et que
la palette « une seule touche de couleur vive » se contredisait déjà avec le
bleu du robot et le rouge du cric — les deux corrigés dans cette itération.

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

## Prompts prêts à l'emploi — génération via ChatGPT Pro

Marche à suivre :
1. Nouvelle conversation ChatGPT. Joindre en pièces jointes `solder_pen.png`,
   `robafis_img2.png`, `tn06_img1.png` et `nerf/hero.png` (dans
   `~/Documents/Pro/clementbalcon.github.io/`) avant de coller le prompt
   desktop — ce sont les vraies références de forme des objets.
2. Choisir le format **paysage** le plus large proposé. Générer, regarder en
   grand, régénérer si un objet est mal formé ou si du texte est apparu
   dessus — ça arrive, ce n'est pas grave, il suffit de relancer.
3. Dans la **même conversation** (pour garder le même style), coller ensuite
   le prompt mobile en format **portrait**.
4. Déposer les deux fichiers exportés (PNG, taille maximale disponible) ici,
   sans rien renommer d'autre que l'extension si besoin :
   - `~/Documents/Pro/clementbalcon.github.io/assets/atelier/scene-desktop-raw.png`
   - `~/Documents/Pro/clementbalcon.github.io/assets/atelier/scene-mobile-raw.png`

Je m'occupe ensuite du recadrage, de l'export WebP optimisé et du calibrage
des zones cliquables par-dessus.

Aucun document confidentiel Safran/Matra n'est envoyé — uniquement les 4
images publiques ci-dessus.

### Prompt 1 — Desktop (paysage large)

> Vue légèrement plongeante d'un petit atelier de mécanique de précision
> français, illustration éditoriale détaillée et légèrement stylisée, entre
> réalisme et illustration soignée, composition immersive à la profondeur
> lisible.
>
> Premier plan gauche : un établi en bois clair. Dessus repose l'outil manuel
> de la première image jointe (corps cylindrique gris, poignée bleu marine
> texturée, petit engrenage bleu, bloc de gâchette orange/jaune) — respecter
> fidèlement sa forme. Quelques outils épars autour.
>
> Premier plan droite : une table de montage métallique avec le petit robot
> mobile de la deuxième image jointe (châssis bleu, roues noires, bras
> articulé avec pince, petite carte électronique visible) — respecter
> fidèlement sa forme. Une médaille/anneau argenté posé à côté évoque un prix
> gagné, sans texte lisible dessus.
>
> Zone médiane droite, un peu en retrait : le cric hydraulique rouge de la
> troisième image jointe, posé sur une petite zone d'essai au sol — respecter
> fidèlement sa forme et sa couleur rouge.
>
> Arrière-plan gauche : un poste de CAO, écran affichant un assemblage
> technique simplifié inspiré de la quatrième image jointe (fil de fer, pas de
> texte lisible).
>
> Arrière-plan centre : une fraiseuse ou un tour d'atelier, vert industriel
> désaturé, gris acier.
>
> Étagère en hauteur à droite : une petite maquette de tour avec un pendule
> suspendu à l'intérieur par de fins câbles.
>
> Une tablette numérique sur un petit support près de l'établi.
>
> Coin avant gauche, au sol : un carnet et un sac de sport.
>
> Matières crédibles (bois, métal brossé, acier peint), lumière naturelle
> latérale douce complétée d'une lampe d'atelier chaude au-dessus de l'établi.
> Perspective et échelles cohérentes, chaque objet clairement séparé et
> identifiable, aucune superposition. Palette : bois et papier ivoire chaud,
> machines vert industriel désaturé et gris acier, ombres anthracite chaud,
> une seule touche de couleur vive (cuivre clair ou ambre) sur l'outil de
> l'établi. Espace négatif calme dans le tiers supérieur pour ajouter un titre
> en HTML par-dessus. Aucun texte, aucun logo ou marque inventée, aucune
> personne, aucun effet holographique ou futuriste.

### Prompt 2 — Mobile (portrait), à coller juste après dans la même conversation

> Dans la continuité exacte de l'image précédente (même atelier, même
> palette, même lumière, mêmes objets), génère une nouvelle composition en
> format portrait, cadrée plus serrée et légèrement plongeante.
>
> Premier plan, en haut : l'établi avec l'outil manuel noir/bleu à gâchette
> orange, comme dans l'image précédente.
>
> En dessous, organisée en rangées bien séparées et lisibles, sans mur
> d'arrière-plan chargé : le petit robot bleu à roues, l'écran de CAO avec son
> assemblage en fil de fer, le cric hydraulique rouge, la petite maquette de
> tour avec le pendule suspendu, la tablette sur son support, et enfin le
> carnet avec le sac de sport.
>
> Ne pas inclure la fraiseuse/le tour d'atelier ni de mur d'arrière-plan
> chargé : la composition doit rester resserrée et lisible du haut vers le
> bas. Même palette, mêmes matières. Espace négatif calme en haut de l'image
> pour un titre ajouté en HTML. Aucun texte, aucun logo ou marque inventée,
> aucune personne.

## Ce que je livre dans ce chantier

Scène desktop et mobile en SVG inline (`#atelier-desktop`, `#atelier-mobile`
dans `index.html`), un lien `<a>` réel par objet, coordonnées partagées avec le
mode développeur (`?hotspots=1`, contours + centres + identifiants). C'est un
dessin technique de repli (voir plus haut), pas la version finale — dès que
`scene-desktop-raw.png` et `scene-mobile-raw.png` arrivent dans
`assets/atelier/`, je les intègre et je recalibre les zones dessus.
