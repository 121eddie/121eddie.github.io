var cacheS;

self.addEventListener('install', event => {//lors du chargement de index.html
  self.skipWaiting();//il supplante tout de suite l'ancien
  console.log("ServiceWorker installé");
});

self.addEventListener('activate', event => {
	self.clients.claim();
	console.log("ServiceWorker activé");
	var cacheS = new URL(location).searchParams.get('cacheS');
	console.log('Cache à garder:'+cacheS);
	return caches.keys().then(noms=>{
		for(var i=0;i<noms.length;i++){
			if(noms[i]!=cacheS){
				return caches.delete(noms[i]);
				console.log('suppression du cache '+noms[i]);
			}
		}
	});
	caches.open(cacheS).then(cache=>{
		return cache.addAll(['/index.html','/styles.css','/serviceWorker.js','/traitement.js']);//tout sauf version.txt //pas de résultat
		console.log('Cache '+cacheS+ 'mis à jour');
	});

	// event.waitUntil(caches.open(cacheS))//on complète le cache
	// .then(cache=>{
		// return cache.addAll(['/index.html','/styles.css','/serviceWorker.js','/traitement.js']);//tout sauf version.txt
		// console.log('Cache '+cacheS+ 'mis à jour');
	// });
	
	// caches.open(cacheS);
	// cacheS.addALL(['/index.html','/styles.css','/serviceWorker.js','/traitement.js']);
	// console.log('Cache '+cacheS+ 'mis à jour');
});

//ServiceListener standard qui met en cache tout ce qui passe
//prévoit un chargement online avec mise en cache si quelquechose manque
self.addEventListener('fetch', event => {
	if(event.request.url.endsWith('version.txt')){
		console.log('on laisse passer /version.txt');
		return fetch(event.request);
	}else{
		console.log('Redirection de', event.request.url);
		caches.open(cacheS).then(cache=>{
		  return cache.match(event.request).then(response=> {
			if (response) {
			  console.log('Réponse trouvée dans le cache:', response);
			  return response;
			}else{
				console.log('Pas de réponse dans le cache');
				//on veut cacher en amont, pas à la volée
				// console.log('Réponse à charger sur le serveur');
				// return fetch(event.request).then(networkResponse=>{
				  // cache.put(event.request, networkResponse.clone());
				  // document.getElementById("connection").innerHTML="Online";//on vient d'utiliser la connection
				  // // return networkResponse;
				// });
			}
		  }).catch(error=>{
			// Handles exceptions that arise from match() or fetch().
			console.error('Erreur dans le chargement:', error);
			throw error;
		  });
		});
	}
});