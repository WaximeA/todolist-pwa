console.log('In service worker');

self.addEventListener('install', function(event) {
  event.waitUntil(
      caches.open('v1').then(cache => {
        cache.addAll([
          '/',
          'index.html',
          '/js/app.js',
          '/css/app.css',
          '/components/todo-add/todo-add.css',
          '/components/todo-add/todo-add.js',
          '/components/todo-element/todo-element.css',
          '/components/todo-element/todo-element.js'
        ]);
      }),
  );
});

self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    event.respondWith(
        caches.match(event.request).then(function(resp){
          return resp || fetch(event.request).then(function(response){
            let responseClone = response.clone();
            caches.open('v1').then(function(cache){
              cache.put(event.request, responseClone);
            });

            return response;
          }).then(function(){
            return self.skipWaiting();
          })
        })
    );
  }
});