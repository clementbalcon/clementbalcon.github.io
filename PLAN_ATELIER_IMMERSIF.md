# Passation à Claude Code — L’atelier de mécanique de précision

Document préparé le 6 septembre 2026. Il décrit le travail à réaliser ; la scène immersive n’est PAS encore créée.

## 1. Demande de Clément et décision de conception

Clément a rejeté une refonte trop banale, puis proposé lui-même :
« Un site dont l’accueil est un atelier de mécanique de précision et, en cliquant sur des objets en surlignement, on entre dans les projets. »

La direction a été acceptée dans la conversation. Sa dernière demande est un plan détaillé pour poursuivre avec Claude Code.

Objectif : faire entrer le visiteur dans un lieu personnel, découvrir des objets, puis ouvrir les vrais projets. L’accueil doit être une scène d’atelier, immédiatement visible et interactive. La mécanique de précision, le travail manuel et le parcours de Clément doivent être perceptibles avant de lire une longue présentation.

La version actuelle appelée « L’établi » est une interface de dossiers sur fond papier. Elle contient du contenu réutilisable et des corrections utiles, mais elle ne réalise PAS encore ce concept spatial. Son nom ne doit pas conduire à considérer la demande comme déjà satisfaite.

### Priorités, dans cet ordre

1. Qualité artistique et crédibilité de l’atelier.
2. Compréhension immédiate des objets interactifs.
3. Accès simple aux projets et retour naturel dans l’atelier.
4. Composition mobile conçue comme telle.
5. Accessibilité, rapidité et stabilité.
6. Quelques détails animés, uniquement si les cinq premiers points fonctionnent.

### Ce que le résultat doit permettre

- Voir l’atelier dès l’arrivée, avec le nom de Clément et sa spécialité.
- Identifier plusieurs objets qu’on peut explorer sans chercher au hasard.
- Ouvrir un projet en une activation.
- Revenir au même objet depuis la page du projet.
- Accéder aussi aux projets par une liste explicite.
- Consulter le parcours, les compétences, les engagements et le cap MECA V.A.
- Comprendre et utiliser le site au clavier, au toucher et sans animation.
- Garder l’accueil court : l’exploration remplace l’empilement des sections.

## 2. État exact du dépôt à la passation

Dépôt : clementbalcon/clementbalcon.github.io.
Domaine : https://clementbalcon.fr.
Copie à utiliser : /Users/ClementBalcon/Documents/Pro/clementbalcon.github.io.
Ne pas utiliser ~/Desktop/clementbalcon.github.io : Git y reste bloqué, probablement à cause de la synchronisation iCloud.

État vérifié avant rédaction de ce document :
- Branche main, arbre de travail propre.
- HEAD : 338234d — Repenser l’accueil comme un établi à dossiers interactifs.
- main possède quatre commits locaux supplémentaires par rapport à origin/main.
- Aucun de ces quatre commits n’a été poussé.
- Référence distante locale origin/main : 87001ff.
- Aucun asset de scène immersive, hotspot de scène ou rendu d’atelier n’a été produit.
- Le présent fichier est ajouté pour la passation ; son commit documentaire éventuel vient après cette vérification.

Historique utile :
- 338234d : accueil papier, sept dossiers, vues parcours et cap, og-atelier.jpg.
- 955c4f3 : évite un retour automatique depuis les pages projet sans mouvement de souris.
- 80e12b3 : corrections responsive, mouvement réduit et clavier sur les sous-pages.
- 0819bb8 : première refonte compacte, jugée trop générique par Clément.
- 87001ff et commits précédents : ancien site, hero Rafale et passes de polish.

Au démarrage :

```bash
cd ~/Documents/Pro/clementbalcon.github.io
git status --short --branch
git log --oneline -10
git pull --ff-only
```

Lire CLAUDE.md entièrement avant modification, notamment la confidentialité.
Si le distant a avancé et que le fast-forward échoue, examiner les branches sans réinitialiser les quatre commits locaux. Une branche de travail issue du HEAD local, par exemple feat/atelier-immersif, convient.

Ne pas pousser sur origin/main sans accord de Clément. Les choix de mise en œuvre et les commits locaux peuvent être faits sans demander une confirmation à chaque étape. Ne pas supprimer les anciennes ressources en masse : elles permettent un retour en arrière.

## 3. Contraintes techniques et éléments à conserver

- Site statique : HTML, CSS et JS embarqués dans chaque page ; pas de framework ou de build.
- Google Fonts Archivo est déjà utilisé.
- L’accueil actuel ne charge plus GSAP, ScrollTrigger, Lenis ou le jeu Rafale.
- Les huit pages portfolio sont index.html, matra.html, robafis.html, nerf.html, tn06.html, am25.html, cardashboard.html et sandbox.html.
- training.html est une neuvième page, une application personnelle avec authentification. Tester seulement son écran public, sans manipuler les données du compte.
- Les sous-pages contiennent déjà les explications et documents des projets.
- La formation, les langues, les engagements et le projet MECA V.A ont été rétablis dans index.html. Conserver ces informations.
- Les pages projet disposent de portails de retour activables au clavier.
- Les corrections de 80e12b3 et 955c4f3 doivent rester effectives.

### Confidentialité absolue

Safran :
- Aucun nom de projet interne, de moteur ou de gate.
- Conserver des descriptions générales : production aéronautique, amélioration continue, digitalisation.
- Aucun document interne lisible sur un écran, un plan ou un panneau de la scène.

Matra :
- Pas de PDF confidentiel.
- Pas de noms individuels d’employés Matra.
- Pas de spécifications techniques internes ou de fournisseurs nommés.
- Le contexte général, les méthodes, les livrables génériques et le visuel public solder_pen.png peuvent être utilisés.

Ne pas envoyer de documents confidentiels à un service de génération d’images.
La scène est une évocation personnelle de l’atelier : ne pas la présenter comme une photographie de Safran, de Matra ou de MECA V.A.
Ne pas inventer de clients, de réalisations industrielles, de résultats chiffrés ou d’équipements réellement possédés par ces entreprises.

## 4. Direction artistique proposée

### Le lieu

Un atelier de mécanique de précision à taille humaine, propre mais vivant :
- Un établi principal au premier plan.
- Un poste CAO sur un côté.
- Un tour ou une fraiseuse en arrière-plan.
- Un panneau de plans et quelques outils de métrologie.
- Des matières crédibles : métal usiné, acier peint, bois ou revêtement d’établi, papier.
- Des traces d’usage discrètes, sans décor sale ou surchargé.
- Une lumière latérale douce et une lumière de travail plus chaude sur l’établi.
- Une perspective légèrement plongeante qui permet de distinguer les surfaces et objets.

La scène doit avoir une composition forte, avec une hiérarchie. Le Solder Pen et le robot constituent de bons points d’entrée. Les machines installent le contexte sans monopoliser l’attention.

Éviter de transformer la scène en collection d’icônes isométriques, en bureau informatique générique ou en interface de jeu de science-fiction. Le thème vient du métier et des objets de Clément.

### Traitement visuel

Direction recommandée : illustration détaillée, légèrement stylisée, à profondeur lisible. Une vue fixe bien composée est suffisante. Une image de qualité peut produire un résultat plus convaincant qu’une scène 3D temps réel montée rapidement.

Palette de départ, ajustable à l’illustration :
- Papier et lumière : ivoire chaud.
- Machines : vert industriel désaturé, gris acier.
- Ombres : anthracite chaud.
- Interaction : cuivre clair ou ambre lumineux, avec un contour lisible sur chaque fond.
- Typographie de l’interface : Archivo ; petites légendes techniques monospace.

Les noms, étiquettes, chiffres et boutons sont ajoutés en HTML/SVG. Ne pas demander au générateur de dessiner du texte lisible dans l’image.

### Interface visible autour de la scène

- Nom « Clément Balcon » et « Ingénieur / production & mécanique », à ajuster au statut réel confirmé par les contenus.
- Phrase d’usage courte : « Explorez l’atelier. Chaque objet raconte un projet. »
- Accès sobres : Atelier, Tous les projets, Parcours, Le cap, Contact.
- Un accès secondaire au sandbox ; il ne doit pas détourner du portfolio au chargement.
- Aucun grand bloc de texte introductif au-dessus de l’atelier.
- Pas de scroll forcé ou d’attente avant de pouvoir cliquer.

## 5. Carte des objets et des destinations

Chaque objet doit être suffisamment distinct pour être reconnu. Ces associations sont proposées pour guider la composition ; les placements exacts viennent après le cadrage.

| Objet dans l’atelier | Destination | Rôle dans la composition |
| --- | --- | --- |
| Solder Pen, posé près d’une pièce et d’outils | matra.html | Objet principal de l’établi ; conserver une ressemblance avec le rendu public |
| Robot BACAR sur une table de montage | robafis.html | Deuxième point d’intérêt fort, silhouette bleue identifiable |
| Écran CAO avec assemblage mécanique | nerf.html | Poste de conception ; image CATIA publique intégrée proprement |
| Cric de laboratoire sur une zone d’essai | tn06.html | Objet de mécanique et de transmission d’effort |
| Petite maquette de tour avec pendule, ou plan de dynamique | am25.html | Référence lisible à Taipei 101 ; diagramme de principe, pas faux résultat |
| Tablette sur un support de poste | cardashboard.html | Projet logiciel ; capture réelle ou écran illustré générique correctement identifié |
| Carnet d’entraînement près d’un sac de sport | training.html | Touche personnelle discrète ; annoncer « connexion requise » |
| Dossier / carnet de parcours | vue #experience | Formation, expérience, langues, compétences et engagements |
| Tour, fraiseuse ou plans d’implantation | vue #projet | Cap vers la mécanique de précision et MECA V.A |

Safran apparaît dans le parcours, sans créer artificiellement un projet public documenté.

Il y a sept projets. Les deux objets supplémentaires de parcours et de cap sont optionnels si la composition devient trop dense : leurs liens textuels restent toujours disponibles.

Une même machine ne doit pas conduire à deux destinations ambiguës. Chaque hotspot possède un nom et une destination stables.

## 6. Production de la scène : le chantier principal

### Choix recommandé pour la première version

Une scène fixe pré-rendue ou illustrée, affichée comme image, avec une couche de zones interactives HTML/SVG parfaitement alignée. Pas de WebGL obligatoire.

Avantages recherchés :
- Contrôle de la composition et du rendu.
- Chargement prévisible.
- Fonctionnement sur téléphone.
- Possibilité de travailler très finement les zones et les textes.
- Accessibilité native grâce à de vrais liens.
- Évolution ultérieure possible vers plusieurs calques ou des rendus plus riches.

La 3D temps réel, les déplacements libres et les mouvements de caméra complexes restent hors du premier périmètre.

### Ordre de fabrication

1. Faire un schéma de composition : machines, établi, objets, zones réservées au nom et à la navigation.
2. Placer les neuf destinations proposées sous forme de silhouettes temporaires.
3. Vérifier les proportions et la lisibilité aux formats large et portrait.
4. Produire une première illustration suffisamment aboutie.
5. Regarder l’illustration seule, en grand, avant de développer les effets.
6. Corriger les outils incohérents, les surfaces impossibles, les objets fusionnés et les zones trop sombres.
7. Produire les compositions desktop et mobile cohérentes.
8. Exporter les fichiers optimisés.
9. Tracer les zones interactives sur l’image définitive.
10. Intégrer les interactions ; ajuster ensuite les détails de la scène si nécessaire.

Ne pas calibrer les hotspots sur un brouillon dont la composition changera entièrement.

### Moyens de production

Si Claude Code dispose d’un outil de génération d’images :
- L’utiliser pour l’illustration de base.
- Donner uniquement les références publiques utiles.
- Demander des objets sans inscriptions, sans logos inventés et sans personnes.
- Conserver le prompt, les références et les fichiers sources.
- Prévoir des itérations de qualité ; la première sortie ne vaut pas validation visuelle.

Si aucun outil d’image adapté n’est disponible :
- Vérifier les capacités locales réelles avant de prétendre pouvoir produire les assets.
- Blender est déjà présent dans l’environnement historique, mais l’ancienne scène est un Rafale, pas un atelier.
- Une nouvelle scène Blender fixe est une option si les compétences et assets permettent un résultat soigné.
- Un brief de production prêt à transmettre à un outil d’image ou à un illustrateur est préférable à une scène médiocre assemblée pour cocher une case.
- Pendant ce travail, le prototype de composition et la navigation peuvent progresser avec des ressources explicitement temporaires.
- Signaler précisément tout asset indispensable encore manquant ; ne pas annoncer le site comme terminé avec un décor de substitution.

Ne pas engager un achat d’assets ou un service payant non autorisé.

### Brief initial pour l’illustration

« Vue légèrement plongeante d’un petit atelier de mécanique de précision français, composition éditoriale immersive et soigneusement éclairée. Établi au premier plan, tour et fraiseuse en arrière-plan, métal brossé, machines vert désaturé, lumière naturelle latérale et lampe d’atelier chaude. Sur les postes : outil manuel cylindrique inspiré du Solder Pen de référence, petit robot mécanique bleu, écran de CAO, cric de laboratoire, maquette de tour à pendule, tablette et carnet personnel. Objets clairement séparés et reconnaissables. Perspective et échelles cohérentes. Illustration détaillée légèrement stylisée, matières crédibles, ambiance personnelle et calme. Espaces négatifs prévus pour une identité en haut et une navigation discrète. Aucun texte dessiné, aucune marque inventée, aucune personne, aucun effet holographique. »

Ce brief est une base de production, pas une garantie de résultat. Faire d’abord la composition ; retirer les objets secondaires si leur présence nuit à la lecture.

### Livrables d’assets

Proposition de rangement :

```text
assets/atelier/
  scene-desktop.webp
  scene-desktop@2x.webp          # seulement si le gain visuel justifie son poids
  scene-mobile.webp
  scene-mobile@2x.webp          # même réserve
  scene-poster.jpg              # optionnel, partage ou fallback nécessaire
  README.md                    # sources, droits, brief, dimensions, calques
design/atelier/
  composition.md               # intentions, placements, choix visuels
  hotspots.json                # coordonnées de référence, pas forcément chargé en production
```

Les noms peuvent évoluer. Éviter les fichiers inutiles et les exports intermédiaires volumineux dans Git. Documenter où restent les sources lourdes.

Avec une image unique, les surlignages peuvent être des silhouettes SVG dessinées sur les objets. Avec des calques transparents, conserver exactement le même repère d’export pour le fond et les objets. Éviter d’accumuler des PNG pleine résolution lourds pour chaque détail.

## 7. Composition responsive et coordonnées

### Ordinateur

- L’atelier occupe l’essentiel de la première vue disponible.
- Le nom et la navigation restent présents sans diminuer la scène à une vignette.
- Adapter la scène à la largeur ET à la hauteur disponibles.
- Viser un accueil tenant dans la hauteur d’écran usuelle, sans cacher les accès sur un portable bas.
- Ne pas imposer une hauteur fixe de 900 px.
- Utiliser les unités de viewport adaptées, dont svh, en prévoyant un comportement de repli.

### Téléphone

Produire une vraie composition portrait : rapprocher les objets clés, réorganiser les machines et les espaces vides. Un simple recadrage central d’une image large risque de supprimer la moitié des destinations.

- Tous les projets doivent rester accessibles.
- Les zones tactiles font au moins 44 × 44 px comme objectif de confort.
- Les zones ne se superposent pas.
- Les repères des objets restent visibles sans survol.
- Les légendes ne sont pas coupées par le bord de l’écran.
- Garder « Tous les projets » visible et simple à atteindre.
- Aucune obligation de glisser ou de pincer pour trouver un projet.
- Pas de débordement horizontal de la page.
- Si la scène nécessite un peu de hauteur sur un petit écran, laisser un scroll naturel court ; ne pas bloquer le défilement pour tenir artificiellement dans une vue.

### Géométrie des hotspots

Décision essentielle : l’image et les zones interactives partagent toujours le même repère.

- Définir les coordonnées en unités du fichier source ou dans un SVG viewBox.
- Pour HTML, convertir une seule fois les boîtes en pourcentages du conteneur qui correspond exactement à l’image.
- Pour SVG, conserver le même ratio et le même viewBox que la composition.
- Définir un jeu de coordonnées desktop et un jeu mobile.
- Changer l’image et les coordonnées au même breakpoint.
- Ne pas utiliser object-fit: cover sans prendre explicitement en compte son recadrage.
- Dimensionner le conteneur selon le ratio de la scène et l’espace disponible.
- Tout zoom éventuel transforme le fond ET les zones ensemble.
- Prévoir un mode de développement qui affiche les contours, centres et identifiants des hotspots.
- Après toute modification de caméra, de cadrage ou d’illustration, recalibrer les zones.

Le mobile ne doit pas contenir une deuxième navigation invisible encore accessible au clavier : si deux compositions DOM existent, masquer réellement la composition inactive. Une seule série de liens avec coordonnées adaptatives est préférable.

## 8. Interaction : révéler les objets sans créer une chasse au trésor

### Au repos

- Les objets interactifs ont un repère subtil permanent : petit contour, point, ou numéro.
- Une phrase explique le principe.
- Les objets de décor non interactifs restent clairement secondaires.
- Pas de clignotement de toutes les zones.
- L’accès « Tous les projets » fonctionne immédiatement.

### Survol et focus clavier

- Mettre en lumière le contour ou la silhouette de l’objet.
- Afficher une étiquette courte : nom du projet + discipline.
- Donner le même niveau d’information au clavier qu’à la souris.
- Garder l’étiquette près de l’objet, avec une position alternative près des bords.
- Conserver un indicateur de focus distinct et contrasté.
- Les étiquettes ne doivent pas intercepter le clic prévu pour l’objet.
- Le texte utile existe dans le nom accessible du lien, pas seulement dans un tooltip.

### Activation

Première version recommandée :
- Le hotspot est un vrai lien href vers la page existante.
- Un clic ou un toucher ouvre directement cette page.
- Entrée active le lien.
- Cmd/Ctrl-clic et clic molette ouvrent un nouvel onglet.
- Le navigateur garde son comportement normal.

Le rapprochement de caméra évoqué dans la discussion est une finition facultative :
- Durée courte, de l’ordre de 180–300 ms.
- Aucune attente liée à une séquence d’images ou à une animation longue.
- Navigation immédiate si mouvement réduit.
- Pas d’interception des clics modifiés.
- Pas de mutation d’historique qui ajoute une étape vide à chaque ouverture.
- Si l’effet rend le clic moins fiable, le retirer.

Ne pas créer un passage obligé « objet → popup teaser → bouton → page » : la demande est d’entrer dans le projet en cliquant sur l’objet.

### Toucher

- Repères et noms courts disponibles sans hover.
- Un seul toucher doit suffire à ouvrir le projet.
- Ne pas utiliser le premier toucher pour simplement afficher un tooltip puis exiger un deuxième.
- L’index textuel offre une alternative confortable lorsque la scène est dense.

### Mouvement

Commencer avec une scène immobile. Ajouter ensuite, seulement si cela sert l’ambiance :
- Une variation très discrète d’éclairage.
- Une petite animation ponctuelle de l’objet sélectionné.
- Éventuellement un parallaxe limité sur pointeur fin.

Aucun mouvement n’est nécessaire à la compréhension. Arrêter les boucles lorsque l’onglet est caché. Le mode mouvement réduit supprime les mouvements, pas les indications d’interaction.

## 9. Architecture HTML et navigation proposées

Conserver le modèle statique. Reprendre les contenus utiles du fichier actuel et simplifier les mécanismes devenus inutiles.

Organisation cible :
- Header : identité et navigation.
- main :
  - #atelier : scène interactive, vue initiale.
  - #projects : index textuel compact des sept projets.
  - #experience : parcours, formation, langues, compétences et engagements.
  - #projet : objectif MECA V.A.
- Footer / #contact.
- JS embarqué pour l’état de la vue, les repères et les retours.

L’index de projets doit être pratique et compact. Il peut reprendre les résumés existants, sans redevenir le visuel principal de l’accueil.

### Table de routage à adopter explicitement

| URL ou ancre | Comportement attendu |
| --- | --- |
| index.html, sans hash | Atelier |
| #atelier | Atelier |
| #matra, #robafis, #nerf, #tn06, #am25, #cardashboard, #training | Atelier, objet correspondant repéré et accessible |
| #projects | Index textuel des projets |
| #experience | Parcours |
| #skills | Parcours et détail compétences ouvert |
| #projet | Cap MECA V.A |
| #contact | Contact visible et atteignable |
| #sandbox | Accès au sandbox visible |
| anciennes #hero et #jet-hero | Atelier |
| anciennes #work | Index des projets |
| anciennes #path et #about | Parcours |

Les ancres des sept projets existent déjà comme IDs d’articles dans l’accueil actuel. Lors de la refonte :
- Transférer ces IDs aux vrais liens/repères de la scène pour préserver les retours des sous-pages.
- Renommer les anciens articles conservés, par exemple dossier-matra, pour éviter les IDs dupliqués.
- Adapter leurs aria-labelledby, aria-controls et liens internes si ces articles restent utilisés.
- Ne pas laisser les anciennes fonctions show()/navigate() masquer l’atelier ou pointer un article supprimé.
- Mettre à jour les sélecteurs du script de test, qui connaît actuellement les onglets de dossiers.

### Retour depuis un projet

Les portails utilisent déjà index.html#matra, etc. Ces liens doivent :
- Afficher l’atelier.
- Signaler l’objet d’origine.
- Donner un focus visible approprié après une navigation explicite, sans scroll inattendu.
- Ne pas ouvrir automatiquement à nouveau la page projet.

Harmoniser les liens « Retour au portfolio » des pages avec leur ancre de projet lorsque pertinent.

L’état doit être reconstruit depuis l’URL. Un stockage local n’est pas nécessaire pour la navigation de base. Tester aussi le retour navigateur depuis une page ouverte avec un clic normal.

### Sans JavaScript

- Les projets restent des liens natifs vers les pages.
- Un index lisible est présent dans le HTML.
- Le parcours et le cap restent accessibles.
- Aucun écran noir ou panneau vide en attendant l’initialisation.
- Les contrôles qui exigent JS sont masqués ou remplacés.

Ne cacher les vues non actives qu’après une initialisation JS réussie.

## 10. Accessibilité et lisibilité

- Un seul h1 identifie Clément et l’activité.
- Un lien d’évitement amène au contenu ou à la liste des projets.
- Chaque objet interactif est un lien natif avec un nom compréhensible : « Solder Pen — conception d’outillage, projet Matra ».
- Les décorations, halos et chemins SVG non interactifs sont ignorés des lecteurs d’écran.
- Une description concise de la scène suffit ; éviter de faire annoncer chaque tournevis du décor.
- L’ordre de tabulation suit une logique stable, idéalement la même que l’index.
- Aucun tabindex positif.
- Aucun focus envoyé vers une vue masquée.
- Les parcours de retour donnent accès à l’objet d’origine.
- Ne pas communiquer la sélection uniquement par une différence de couleur.
- Les légendes disposent d’un fond ou d’une ombre adaptés aux variations de l’image.
- Le curseur de l’accueil reste natif.
- Ne pas réintroduire le curseur-avion dans la scène.
- Les animations respectent prefers-reduced-motion.
- Vérifier le zoom du navigateur et les polices de secours.

Les interactions de scène ne sont pas des onglets : ne pas réutiliser aveuglément role=tab et les flèches de l’ancien index. Ce sont principalement des liens vers des destinations.

## 11. Ressources publiques disponibles

À inspecter visuellement avant usage ; les noms ne garantissent pas la bonne composition :

| Ressource | Utilité |
| --- | --- |
| solder_pen.png | Rendu public du Solder Pen, fond transparent, 1208 × 288 |
| robafis_img1.png | Photo portrait du robot, 645 × 964 |
| robafis_img2.png, robafis_img3.png | Autres détails RobAFIS |
| nerf/hero.png | Assemblage CATIA sur fond violet, 1074 × 522 |
| nerf/assemblage.png | Assemblage complémentaire |
| nerf/*.png | Détails et étapes CAO |
| tn06_img1.png | Photo du cric, 652 × 394 |
| tn06_img2.png, tn06_img3.png | Compléments de l’étude |
| cardashboard_ipad.png | Capture réelle iPad, 1668 × 2420 |
| cardashboard_iphone.png | Capture réelle iPhone |
| photo.png | Portrait Clément |
| index.html, #experience et #projet | Contenus de parcours et de transmission familiale |
| matra.html, robafis.html, etc. | Pages détaillées et vocabulaire validé |

La capture CarDashboard montre notamment un état avant connexion. Ne pas transformer cet état en faux exemple opérationnel sans le signaler.
Le SVG de Taipei dans l’accueil actuel est un schéma de principe.
Les assets originaux servent de références visuelles et de preuves dans les dossiers. Leur collage brut sur une illustration peut nuire à la cohérence : les objets de la scène peuvent être illustrés, tandis que les pages conservent les originaux.

## 12. Performance et partage

Budgets indicatifs de départ, à mesurer et ajuster selon la qualité :
- Une seule composition principale téléchargée au premier affichage, choisie selon l’écran.
- Viser environ 500 Ko à 1 Mo pour la scène mobile et 1 à 1,5 Mo pour la scène desktop.
- L’ensemble initial devrait idéalement rester sous environ 2 Mo, hors contenus ouverts ensuite.
- Aucun chargement des 150 frames Rafale.
- Aucune bibliothèque d’animation nécessaire à la version de base.
- Les variantes haute définition ne doivent pas être téléchargées toutes ensemble.

Implémentation :
- Dimensions intrinsèques ou ratio explicite pour éviter les déplacements de mise en page.
- picture/srcset si utile ; contrôler dans le réseau quelle variante est réellement chargée.
- Image principale prioritaire, pas de loading=lazy sur l’atelier initial.
- Images des dossiers secondaires chargées au besoin.
- Éviter les filtres lourds couvrant toute la scène à chaque frame.
- Si l’image échoue, garder le nom, la navigation et la liste des projets utilisables.
- Renouveler la miniature Open Graph après intégration : og-atelier.jpg montre actuellement l’interface papier, pas la scène future.
- Tester les metas et la présence du nouvel asset, sans supposer que les plateformes ont immédiatement renouvelé leur cache.

## 13. Plan d’exécution, par étapes vérifiables

### Étape A — Reprise et état de référence

Actions :
- Lire ce document puis CLAUDE.md.
- Vérifier Git et le distant sans écraser les commits locaux.
- Lancer le serveur.
- Regarder l’accueil et quelques sous-pages dans le navigateur.
- Conserver des captures de la référence actuelle.
- Inspecter les ressources publiques.
- Créer une branche dédiée si utile.

Livrable : état de départ confirmé, inventaire des assets et liste des fichiers concernés.
Aucune réécriture graphique avant cette lecture.

### Étape B — Composition de l’atelier

Actions :
- Dessiner les cadrages large et portrait.
- Placer les objets et les zones de texte.
- Vérifier qu’on comprend l’atelier et qu’on trouve les projets.
- Construire une maquette statique grandeur réelle.
- Documenter la correspondance objets/destinations.

Livrable : deux compositions lisibles, avec leurs zones prévues.
Critère de passage : le concept se comprend même sans animation.
Point de revue visuelle : produire des captures concrètes ; ne pas interrompre systématiquement le travail pour demander une permission de continuer.

### Étape C — Illustration finale et préparation des assets

Actions :
- Produire ou obtenir les assets avec un moyen réellement disponible.
- Corriger perspective, échelle, ombres, matières et lisibilité des objets.
- Éliminer le faux texte et les incohérences.
- Vérifier les deux cadrages à leur taille d’affichage réelle.
- Exporter les images et documenter leur origine.
- Définir les contours de surlignage.

Livrable : scène desktop et mobile soignées, poids mesurés, sources documentées.
Critère de passage : ne plus dépendre d’un placeholder pour juger le rendu.

### Étape D — Accueil statique fonctionnel

Actions :
- Intégrer la scène dans index.html.
- Ajouter de vrais liens positionnés sur les objets.
- Ajouter l’identité, la consigne et la navigation.
- Conserver l’index texte, le parcours et le cap.
- Établir les ancres et résoudre les conflits d’IDs.
- Vérifier le comportement sans JS.

Livrable : site déjà navigable de bout en bout, même sans effet.
Commit logique possible : « Installer l’atelier illustré et ses accès aux projets ».

### Étape E — Surlignage et retours

Actions :
- Ajouter les silhouettes, labels, états hover/focus/selected.
- Finaliser la navigation par hash et les retours des sous-pages.
- Vérifier que le toucher n’exige pas deux activations.
- Ajouter un rapprochement court seulement s’il améliore l’expérience.
- Vérifier les clics modifiés et l’historique.

Livrable : boucle atelier → projet → atelier fiable.
Commit logique possible : « Relier les objets et préserver les retours dans l’atelier ».

### Étape F — Mobile, accessibilité et performance

Actions :
- Ajuster les zones sur les deux compositions.
- Vérifier les petites hauteurs et les largeurs intermédiaires.
- Contrôler le focus, la lisibilité et les zones tactiles.
- Contrôler le mode mouvement réduit.
- Mesurer les téléchargements et ajuster les exports.
- Vérifier les défaillances d’image et de police.
- Tester les huit pages et Training public.

Livrable : rapport de validation avec captures et limites.
Commit logique possible : « Finaliser l’atelier mobile et accessible ».

### Étape G — Cohérence et livraison

Actions :
- Vérifier les liens de retour des pages projet.
- Garder leur contenu et leur confidentialité.
- Ajuster seulement les éléments nécessaires pour que la navigation paraisse cohérente.
- Ne pas lancer à ce stade une nouvelle refonte complète des sept sous-pages.
- Produire la miniature de partage.
- Mettre à jour CLAUDE.md avec le fonctionnement réel.
- Vérifier Git, committer les fichiers restants.
- Donner à Clément un aperçu local concret et des captures.

Livrable : version locale terminée, commits clairs, état propre.
Publication : demander l’accord de Clément avant de pousser sur origin/main.

Effectuer les vérifications applicables avant chaque commit logique. Éviter un seul commit gigantesque contenant illustration, navigation, corrections et réécriture de toutes les sous-pages.

## 14. Validation détaillée

### Serveur et outils

```bash
cd ~/Documents/Pro/clementbalcon.github.io
python3 -m http.server 8000
```

Ouvrir http://localhost:8000/index.html.
Un serveur peut déjà être actif sur 8000 : vérifier sa racine et le contenu servi avant d’en lancer un deuxième.

Playwright existant :
- /private/tmp/pw-check/node_modules/playwright
- Chromium dans ~/Library/Caches/ms-playwright
- Script : /private/tmp/pw-check/portfolio-audit.cjs
- Rapports et captures : /private/tmp/pw-check/portfolio-audit/

Ces fichiers temporaires peuvent disparaître. Lire le script avant de le réutiliser.
Il contient des tests spécifiques à l’ancienne interface à onglets : adapter ces assertions à la scène, sans supprimer les contrôles généraux.
Le script sert les fichiers via son propre serveur local et lance Chromium.
Dans l’environnement Codex précédent, serveur et navigateur devaient être dans le même contexte autorisé hors sandbox. Vérifier les permissions réelles de Claude Code ; ne pas recopier aveuglément les restrictions d’un autre outil.

### Matrice minimale

- Les huit pages portfolio et l’écran public Training.
- Largeurs 375, 680 et 1440 px.
- Modes normal et prefers-reduced-motion: reduce.
- Hauteur de référence 900 px ; ajouter 375 × 667 et 1440 × 768 pour les contraintes d’espace.
- Ajouter au moins une largeur près du changement de composition.
- Chromium automatisé ; Safari réel sur ce Mac si disponible.
- Test tactile émulé avec hasTouch/isMobile : réduire seulement la largeur ne simule pas une absence de hover.

### Pour chaque objet

1. Le repère se trouve sur le bon objet.
2. Le survol met en évidence cet objet.
3. Le focus clavier offre le même nom et un contour visible.
4. Le clic ouvre la bonne destination.
5. Entrée fonctionne.
6. Le toucher fonctionne en une activation.
7. Cmd/Ctrl-clic conserve l’ouverture en nouvel onglet.
8. Le retour projet retrouve l’objet.
9. Le retour navigateur ne crée pas de boucle.
10. L’ancre directe rechargée reconstruit le bon état.

### Contrôles globaux

- document.documentElement.scrollWidth <= window.innerWidth.
- Aucun texte coupé ou superposé à un autre libellé.
- Aucun hotspot à cheval sur deux objets ou caché sous un bouton.
- Aucun lien inaccessible parce que l’image a été recadrée.
- Aucun contenu essentiel masqué définitivement par JS.
- Aucun ID dupliqué.
- Pas d’erreur JavaScript.
- Pas de ressource nécessaire manquante.
- Aucun mouvement encore actif en mode réduit.
- Aucune sortie automatique d’une page projet sans action de l’utilisateur.
- Aucune nouvelle information confidentielle.
- Chargement de la seule variante d’image appropriée.
- Fallback utilisable avec CDN de police bloqué et avec image principale bloquée.
- Liens externes et fichiers PDF présents ; le lecteur PDF headless peut produire ERR_ABORTED, à distinguer d’un fichier réellement absent.

### Captures à conserver

- Accueil au repos desktop et mobile.
- Solder Pen surligné.
- Un objet près du bord avec son label.
- Focus clavier visible.
- Vue « Tous les projets ».
- Parcours et cap.
- Retour depuis une page projet.
- Mode mouvement réduit.
- Composition portrait à petite hauteur.

Les tests de dimensions ne remplacent pas l’inspection visuelle. Une page sans overflow peut tout de même avoir un objet caché ou un label illisible.

## 15. Pièges hérités et erreurs à éviter

1. L’ancien hero Blender est historique. Ne pas suivre ses paramètres de scroll pour la nouvelle scène.
2. L’autorisation « ne pas toucher au hero » est levée depuis la demande initiale.
3. L’ancienne séquence utilisait 150 frames, 450vh desktop et 360vh mobile, GSAP et un morph vers le curseur. Tout cela est déjà absent de l’accueil actuel.
4. Les fichiers Blender et frames n’ont pas été modifiés. Si l’ancien Rafale réapparaît quelque part, son crédit reste obligatoire.
5. Le ticker GSAP manuel documenté concernait un ancien outil de preview ; il ne faut pas réintroduire GSAP pour contourner ce problème historique.
6. Le jeu des sous-pages avait un retour automatique après expiration du cooldown : 955c4f3 le corrige. Ne pas perdre cette correction.
7. Le script de test précédent a déjà détecté ce retour involontaire ; il vérifie désormais l’URL réelle avant les mesures.
8. La copie Desktop peut bloquer indéfiniment : ne pas y diagnostiquer le nouveau site.
9. Les noms de projets sont aussi des ancres : un renommage visuel ne doit pas casser les retours.
10. Les polices condensées et les petits libellés peuvent devenir peu lisibles sur une image complexe.
11. Un halo rectangulaire flottant à côté d’un objet ne réalise pas le surlignage attendu.
12. Ajouter des particules, de la fumée et du parallaxe ne corrige pas une illustration médiocre.
13. Une scène mobile obtenue uniquement par cover peut perdre plusieurs projets.
14. Une photographie publicitaire d’atelier générique ne raconte pas les projets de Clément : les objets choisis doivent être reconnaissables.
15. L’application Training n’est pas un espace de démonstration à modifier pour embellir le portfolio.
16. Les anciennes captures og-atelier.jpg et les rapports décrivent la version papier ; les renouveler pour la nouvelle scène.
17. Les quatre commits locaux ne sont pas publiés. Ne pas confondre le site public avec l’aperçu local.

## 16. Critères de fin

Le travail est terminé lorsque :
- L’accueil représente effectivement un atelier de mécanique de précision.
- Les sept projets ont chacun un accès spatial compréhensible et un accès textuel.
- L’illustration est aboutie aux deux formats.
- Le surlignage suit correctement les objets.
- Le visiteur peut ouvrir et quitter les projets sans friction.
- Le parcours, les langues, les compétences, les engagements et MECA V.A restent accessibles.
- La page d’accueil ne recrée pas un long parcours obligatoire.
- Les tests, les captures et les limites sont documentés.
- Les commits sont cohérents et le dépôt est propre.
- Le site est prêt à être montré localement ; le push attend l’accord de Clément.

Si la scène finale manque encore, l’annoncer explicitement et fournir le brief, les compositions et les éléments techniques terminés. Ne pas présenter une interface de dossiers ou un brouillon comme l’atelier terminé.

## 17. Format de passation si Claude doit s’arrêter

Toujours transmettre :
1. Branche, dernier commit, fichiers committés et fichiers en cours.
2. Captures et URL locale de la version réellement disponible.
3. État des assets : source, variante, qualité, poids, éventuels placeholders.
4. Repères de coordonnées et breakpoints réellement utilisés.
5. Navigation réalisée, ancres préservées et tests effectués.
6. Prochaines tâches dans l’ordre.
7. Obstacles précis, sans prétendre que les vérifications non faites ont passé.
8. État de publication : aucun push ou détails de l’accord obtenu.

## 18. Message de démarrage à copier dans Claude Code

« Travaille dans ~/Documents/Pro/clementbalcon.github.io. Lis d’abord PLAN_ATELIER_IMMERSIF.md, puis CLAUDE.md, et vérifie Git sans écraser les commits locaux.

Je veux réaliser le concept d’atelier de mécanique de précision décrit dans le plan : un vrai lieu illustré comme accueil, avec des objets surlignés qui ouvrent mes projets. L’interface papier actuelle n’est qu’une étape précédente.

Commence par la composition desktop/mobile et la qualité de la scène, puis implémente les vrais liens, le surlignage et les retours. Prends les décisions ordinaires sans me demander de confirmation à chaque étape. Préserve les contenus, la confidentialité et l’accessibilité. Teste les huit pages aux largeurs demandées. Fais des commits par étape logique. Ne pousse pas sur origin/main sans mon accord. Si un outil ou un asset manque, identifie-le précisément et avance sur les tâches indépendantes. »
