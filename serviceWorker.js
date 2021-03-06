const cacheArray=['./index.html','./styles.css','./traitement.js','./manifest.json','./icon200.png','./icon512.png','./favicon.ico'];
self.addEventListener('install', event => {//lors du chargement de index.html
  self.skipWaiting();//il supplante tout de suite l'ancien
  console.log("ServiceWorker installé");
});

self.addEventListener('activate', event=> {
	self.clients.claim();//le nouveau service worker prend le contrôle de toutes les pages ouvertes de l'appli web progressive
	console.log("ServiceWorker activé");
	if (navigator.onLine){
		try{
			event.waitUntil(
			caches.open('ProgWebApp')
			.then(cache=>cache.addAll(cacheArray))
			.then(console.log('pages cachéees'))
			);
		}catch (err){
			console.log(err);
		}
	}
});

//ServiceListener standard qui met en cache tout ce qui passe
//prévoit un chargement online avec mise en cache si quelquechose manque
self.addEventListener('fetch', event=>{
	var url=event.request.url;
	var trouve=false;
	console.log('Traitement du fetch '+url);
	for (var i=0;i<cacheArray.length;i++){
		if (url.endsWith(cacheArray[i].substr(1))){
			trouve=true;
			return requete(url);
		}
	}
	if (!trouve) return requete('./index.html');
});

async function requete(url){
	try{
		caches.open('ProgWebApp')
		.then(cache=>cache.match(url))
		.then(page=>{
			console.log('on sert '+url+' depuis le cache');
			page.status=200;//manipulation justifiée ici
			return page;})
	}catch(err){
		console.log('echec de '+url+': '+err);
	}
}