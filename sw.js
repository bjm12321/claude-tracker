/* Account Tracker service worker.
   index.html is network-first so a push to GitHub Pages shows up on next load;
   icons/manifest are cache-first. Offline falls back to the cached shell. */
var CACHE = "tracker-v12";
var ASSETS = ["./", "index.html", "manifest.webmanifest", "icon192.png", "icon512.png", "appletouchicon.png"];

self.addEventListener("install", function(e){
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function(c){ return c.addAll(ASSETS).catch(function(){}); }));
});

// Let the page trigger an immediate activation of a waiting worker.
self.addEventListener("message", function(e){
  if(e.data && e.data.type === "SKIP_WAITING") self.skipWaiting();
});

self.addEventListener("activate", function(e){
  e.waitUntil(
    caches.keys().then(function(keys){
      return Promise.all(keys.map(function(k){ if(k!==CACHE) return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function(e){
  var req = e.request;
  if(req.method !== "GET") return;
  var url = new URL(req.url);
  // never touch GitHub API calls
  if(url.hostname.indexOf("github") !== -1) return;

  // Only the app shell (root or index.html) is the network-first "document";
  // other pages like log.html / bookmarklets.html must not overwrite it.
  var isDoc = req.mode === "navigate" && /\/(index\.html)?$/.test(url.pathname);
  if(isDoc){
    // network-first for the app shell
    e.respondWith(
      fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put("index.html", copy); });
        return res;
      }).catch(function(){
        return caches.match("index.html").then(function(m){ return m || caches.match("./"); });
      })
    );
    return;
  }
  // cache-first for static assets
  e.respondWith(
    caches.match(req).then(function(m){
      return m || fetch(req).then(function(res){
        var copy = res.clone();
        caches.open(CACHE).then(function(c){ c.put(req, copy); });
        return res;
      }).catch(function(){ return m; });
    })
  );
});
