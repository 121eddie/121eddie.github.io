# ilog2018 Projet 7
encadré par Pierre Vincent
réalisé par Yifan Wang et Eduard Ergenzinger

Cahier des charges et réalisation
source: https://whippet.telecom-lille.fr/mod/book/view.php?id=10298
 
⛔Pas réalisé
🆗Réalisé
fonctionnalité supplémentaire ou commentaire
Développer une application web progressive en html5/css/javascript/json  🆗
Déployer l'application sur un serveur HTTP et la tester avec un navigateur d'un smartphone android. 🆗
L'application stocke les coordonnées GPS dans la mémoire du téléphone ⛔,=> les fait télecharger 🆗ou les partage (sms🆗, email🆗, fb⛔, etc..).
Évaluer les possibilités pour exécuter l'application offline (ni 4G, ni wifi) 🆗il faut lancer en mode appli web progressive depuis l’écran d’accueil ou alors rouvrir le navigateur

Application Web Progressive
fichier manifest.json 🆗avec attribution des droits d’accès

Différentes pistes pour l'exécution offline :
fichier manifest.json mais directive cache obsolète ;
workers complexes ; 🆗
étudier la possibilité de charger une page locale (fichier) ;
chrome64 etc...

Réalisation :
notepad++ ou autre (pas d'IDE complexe) ;🆗
hébergement en localhost et sur https://121eddie.github.io/  🆗
tests avec les outils de développement du navigateur ;🆗, Firefox Nightly et Chrome pour Android
exécution sur smartphone android.🆗Adaptation de la mise en page aux smartphones


Utilisation:
L'utilisateur (PC ou smartphone android) consulte https://121eddie.github.io/index.html sur Google Chrome. C'est la seule page qui lui est montrée, les autres jouent un rôle de support.

/index.html, lance l'installation de /serviceWorker.js.
Lors de son activation, serviceWorker.js met en cache ['./index.html','./styles.css','./traitement.js','./manifest.json','./icon200.png','./icon512.png','./favicon.ico']

Si le site est lancé depuis un smartphone, le navigateur demande à l'utilisateur s'il veut installer le manifest.json sur l'écran d'acceuil en tant qu'Appli Web Progressive, avec une des 2 icônes. 
Cette Appli Web Progressive donne ensuite accès à une version simplifiée du navigateur (sans barre de saisie ou paramètres) restreinte au domaine https://121eddie.github.io, sans barre de navigation ni paramètres. 

Ensuite, quel que soit l'état de connection de la machine (online/offline, navigateur ou Appli Web Progressive), le service worker va intercepter toutes les fetches du domaine https://121eddie.github.io et y répondre avec le cache (page /index.html par défaut). (Lors du passage online=>offline, l'utilisateur doit relancer l'Appli Web Progressive ou le navigateur).


Lors du lancement, les données GPS locales sont affichées sur le site et un fichier texte local crée avec ces données.
L'utilisateur peut repéter cette opération manuellement avec le bouton 'Mettre à jour'.

Il peut enregistrer le fichier texte sur son SGF grâce au lien 'Telecharger mes coordonnees'.
Il peut saisir un destinataire email ou SMS et cliquer sur 'Email' ou 'SMS' pour lui envoyer un Email ou SMS avec l'application locale respective.
L'adresse du destinataire est enregistrée localement lors de l'envoi pour étre à nouveau proposé lors de la prochaine connection.
L'utilisateur peut aussi choisir de ne pas saisr d'adresse sur l'Appli Web Progressive, mais de le faire dans le l'application EMail ou SMS.


