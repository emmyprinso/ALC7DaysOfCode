let staticCacheName = 'alc-static-v1';
 const toCache = [
  '../',
  '../index.html',
  '../js/index.js',
  '../js/idb.js',
  '../css/style.css',
  '../css/font-awesome.min.css',
  'https://fonts.googleapis.com/css?family=Alegreya+Sans',
  'https://fonts.googleapis.com/css?family=Tangerine',
  'https://fonts.googleapis.com/css?family=Rancho&effect=shadow-multiple',
  'https://fonts.gstatic.com/s/roboto/v15/2UX7WLTfW3W8TclTUvlFyQ.woff',
  'https://fonts.gstatic.com/s/roboto/v15/d-6IYplOFocCacKzxwXSOD8E0i7KZn-EPnyo3HZu7kw.woff'
];

   self.addEventListener('install', event => {
     console.log('Install Event Running',location.pathname);
    event.waitUntil(
      caches.open(staticCacheName).then(cache => {
        return cache.addAll(toCache);
      })
    );



    
  });   


  self.addEventListener('activate', event => {
    console.log('[ServiceWorker] Activated');

    event.waitUntil(

    	// Get all the cache keys (cacheName)
		caches.keys().then(cacheNames => {
			return Promise.all(cacheNames.map(thisCacheName => {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== staticCacheName && thisCacheName.startsWith('alc-static')) {

					// Delete that cached file
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	); // end event.waitUntil

});



/*
  self.addEventListener('fetch', function(event) {
    // TODO: respond with an entry from the cache if there is one.
    // If there isn't, fetch from the network.
    console.log('first fetch event');
   event.respondWith(
       caches.match(event.request).then(function(response){
       if(response)return response;
       return fetch(event.request);
   })
   );
   });
   */
