if(!self.define){let e,i={};const s=(s,n)=>(s=new URL(s+".js",n).href,i[s]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=i,document.head.appendChild(e)}else e=s,importScripts(s),i()})).then((()=>{let e=i[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(n,r)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(i[c])return;let o={};const t=e=>s(e,c),l={module:{uri:c},exports:o,require:t};i[c]=Promise.all(n.map((e=>l[e]||t(e)))).then((e=>(r(...e),o)))}}define(["./workbox-b3e22772"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"assets/index.6b06c392.js",revision:null},{url:"assets/index.97f56a85.css",revision:null},{url:"assets/pwa.ad266e0f.js",revision:null},{url:"index.html",revision:"d70b2c2c27dca545ce0015f54bf2ac9d"},{url:"favicon.svg",revision:"1821c958bbe5e0a6a4563025af907760"},{url:"favicon.ico",revision:"1eec5fb8b2c6321d4d125dcc525aa9c6"},{url:"robots.txt",revision:"f77c87f977e0fcce05a6df46c885a129"},{url:"apple-touch-icon.png",revision:"56a9d19d3369eb4a287246ec0afc8f33"},{url:"pwa-192x192.png",revision:"1a2846bc6aee0e656f19aa0b2bb8f368"},{url:"pwa-512x512.png",revision:"843529141e4c5190e39e94cd9510ee46"},{url:"site.webmanifest",revision:"d94618bd0f57bb17f1e523a916c485a3"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
