const version = "v7";
self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(version).then(function(cache) {
			return cache.addAll([
				'/eli-merdan/sw.js',
				'/eli-merdan/site/script.js?v7',
				'/eli-merdan/site/style.css?v2',
				'/eli-merdan/site/image/back.jpg',
				'/eli-merdan/site/image/portraits/1.svg',
				'/eli-merdan/site/image/portraits/1.jpg',
				'/eli-merdan/site/DroidNaskh-Regular.woff2',
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	var cacheWhitelist = [version];

	event.waitUntil(
		caches.keys().then(function(keyList) {
			return Promise.all(keyList.map(function(key) {
				if (cacheWhitelist.indexOf(key) === -1) {
					return caches.delete(key);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(event) {
	event.respondWith(
		caches.match(event.request).then(function(resp) {
			return resp || fetch(event.request).then(function(response) {		
				return response;
			});
		}).catch(function() {
			return caches.match('/eli-merdan/index.html');
		})
	);
});
