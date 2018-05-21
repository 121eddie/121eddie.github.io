// const cacheArray=['/icon.png','/','/styles.css','/traitement.js','/manifest.json'];
//const cacheArray=['icon.png','.','styles.css','traitement.js','manifest.json'];
const cacheArray=['./','./index.html','./styles.css','./traitement.js','./manifest.json','./icon.png'];
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
	console.log('Traitement du fetch '+event.request.url);
	// if (event.request.url.endsWith="/") event.request.url='/index.html';//le service worker doit prendre en main la redirection
	try{
		event.waitUntil(
		caches.match(event.request)
		.then(request=>{
			console.log('on sert '+event.request.url+' depuis le cache');
			return request;})
		);
	}catch(err){
		console.log('echec de '+event.request+': '+err);
	}
});
