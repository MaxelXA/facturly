const C="facturly-v1";
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(k=>k.addAll(["./","./index.html","./style.css","./app.js","./vendor/jspdf.umd.min.js"])).then(()=>self.skipWaiting()).catch(()=>{}));});
self.addEventListener("activate",e=>e.waitUntil(self.clients.claim()));
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(h=>h||fetch(e.request).then(r=>{
    const c=r.clone();caches.open(C).then(k=>k.put(e.request,c)).catch(()=>{});return r;}).catch(()=>caches.match("./index.html"))));
});
