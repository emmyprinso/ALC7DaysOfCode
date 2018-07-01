

 let staticCacheName = 'alc-static-v1';

   self.addEventListener('install', event => {
    event.waitUntil(
      caches.open(staticCacheName).then(cache => {
        return cache.addAll([
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
        ]);
      })
    );
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
   });*/
   