var cache;
self.addEventListener('install', event => {//lors du chargement de index.html
  self.skipWaiting();//il supplante tout de suite l'ancien
  console.log("ServiceWorker installé");
});

self.addEventListener('activate', async function(event) {
	self.clients.claim();//le nouveau service worker prend le contrôle de toutes les pages ouvertes de l'appli web progressive
	console.log("ServiceWorker activé");
	if (navigator.onLine){
		var oReq = new Request('./version.txt?date='+new Date().getTime(), {method:'get', headers: {"Accept": "application/json"}});
		var response=await fetch(oReq);
		var result=await response.text();
		console.log('Nouvelle version du cache: '+result);//a distance: [object promise]
		cache= await caches.open(result);
		console.log('cache:'+cache);
		for (var i=0;i<caches.length;i++){
			if (caches[i]!=cache){
				caches[i].delete();
			}
		}
		// return (cache.addAll(['/index.html','/styles.css','/traitement.js']));//ne traite que la promise
		try{await cache.addAll(['/index.html','/styles.css','/traitement.js']);//en localhost: TypeError: Request failed
		}catch (err){
			console.log(err);
		}//tout sauf version.txt //pas de résultat	
	}
});

//ServiceListener standard qui met en cache tout ce qui passe
//prévoit un chargement online avec mise en cache si quelquechose manque
self.addEventListener('fetch', async function(event){
	console.log('Traitement du fetch '+event.request.url);
	if(event.request.url.includes('version.txt')){
		console.log('On laisse passer '+event.request.url);
		return fetch(event.request);
	}else{
		// Try to get the response from a cache.
		const cachedResponse = await cache.match(event.request);
		// Return it if we found one.
		if (cachedResponse){
			console.log('on sert '+event.request.url+' depuis le cache');
			return cachedResponse;
		}
		// If we didn't find a match in the cache, use the network.
		// return fetch(event.request);
	}
});
