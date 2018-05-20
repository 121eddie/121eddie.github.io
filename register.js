	// if ( 'serviceWorker' in navigator ) {
		// navigator.serviceWorker.register('serviceWorker.js')
		// .then(function(registration) {//il faut que le serviceworker sache quel cache utiliser
			// console.log('ServiceWorker installé avec le scope: ', registration.scope);
			// document.getElementById('worker').innerHTML='serviceWorker.js actif';
			// document.getElementById('cache').innerHTML='Cache actif';
		// }).catch(function(err) {
			// console.log("Echec de l'enregistrement du ServiceWorker: ", err);
		// });	
	// }else{window.alert('Votre navigateur ne supporte pas les Service Workers. Ce site ne fonctionnera pas en mode offline');};
	
		async function register(){
		var registration=await navigator.serviceWorker.register('serviceWorker.js');
		console.log('ServiceWorker installé avec le scope: ', registration.scope);
		document.getElementById('worker').innerHTML='serviceWorker.js actif';
		document.getElementById('cache').innerHTML='Cache actif';
	};
	
	// async function keepCache(kCache){
	// cache= await caches.open(kCache);
	// console.log('Cache à garder:'+kCache);
	// for (var i=0;i<caches.length;i++){
		// if (caches[i]==cache){
			// caches[i].delete();
		// }
	// }
	// return cache.addAll(['/index.html','/styles.css','/serviceWorker.js','/traitement.js']);//tout sauf version.txt //pas de résultat
// };

// async function fetchCache(){//a defaut de reponse du serveur
	// var oReq = new Request('./version.txt?date='+new Date().getTime(), {method:'get'});
	// var response=await fetch(oReq);
	// var result=await response.text();
	// console.log(result);
	// return result;
// }