/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  let registry = {};

  // Used for `eval` and `importScripts` where we can't get script URL by other means.
  // In both cases, it's safe to use a global var because those functions are synchronous.
  let nextDefineUri;

  const singleRequire = (uri, parentUri) => {
    uri = new URL(uri + ".js", parentUri).href;
    return registry[uri] || (
      
        new Promise(resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = uri;
            script.onload = resolve;
            document.head.appendChild(script);
          } else {
            nextDefineUri = uri;
            importScripts(uri);
            resolve();
          }
        })
      
      .then(() => {
        let promise = registry[uri];
        if (!promise) {
          throw new Error(`Module ${uri} didn’t register its module`);
        }
        return promise;
      })
    );
  };

  self.define = (depsNames, factory) => {
    const uri = nextDefineUri || ("document" in self ? document.currentScript.src : "") || location.href;
    if (registry[uri]) {
      // Module is already loading or loaded.
      return;
    }
    let exports = {};
    const require = depUri => singleRequire(depUri, uri);
    const specialDeps = {
      module: { uri },
      exports,
      require
    };
    registry[uri] = Promise.all(depsNames.map(
      depName => specialDeps[depName] || require(depName)
    )).then(deps => {
      factory(...deps);
      return exports;
    });
  };
}
define(['./workbox-9dc17825'], (function (workbox) { 'use strict';

  self.skipWaiting();
  workbox.clientsClaim();

  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */
  workbox.precacheAndRoute([{
    "url": "apple-touch-icon.png",
    "revision": "65a800c63fbcf02e98db1f808b779e01"
  }, {
    "url": "apple-touch-icon.svg",
    "revision": "334faf2dc7ab73df3a0abf5bdb2d0a64"
  }, {
    "url": "assets/Home-CfzYer7O.js",
    "revision": null
  }, {
    "url": "assets/index-40FW6bXM.js",
    "revision": null
  }, {
    "url": "assets/index-C1b4LQUo.css",
    "revision": null
  }, {
    "url": "assets/react-U2lzZgh7.js",
    "revision": null
  }, {
    "url": "assets/vendor-l0sNRNKZ.js",
    "revision": null
  }, {
    "url": "assets/workbox-window.prod.es5-p40uij6f.js",
    "revision": null
  }, {
    "url": "favicon.png",
    "revision": "f614963ba4f21fff67569a6519f42c0c"
  }, {
    "url": "favicon.svg",
    "revision": "5039b034e2b64c0632220ab2d05a747e"
  }, {
    "url": "icon.svg",
    "revision": "3d7dd62565d59a1ca18b16cd15c04911"
  }, {
    "url": "index.html",
    "revision": "ee1c33071fef3c896c2d1fa4aa64e371"
  }, {
    "url": "logo192.png",
    "revision": "b72ced04f8afcbb7b995a0f2cbaa66da"
  }, {
    "url": "logo512.png",
    "revision": "a49d0e8997c71230ac5f6b628ba17993"
  }, {
    "url": "offline.html",
    "revision": "33dc693200fde2593abc9a378d6ba21d"
  }, {
    "url": "manifest.webmanifest",
    "revision": "214e2f5ffecce803a19c063a2ee5dd8c"
  }], {});
  workbox.cleanupOutdatedCaches();
  workbox.registerRoute(new workbox.NavigationRoute(workbox.createHandlerBoundToURL("index.html")));
  workbox.registerRoute(/^https:\/\/api\./i, new workbox.NetworkFirst({
    "cacheName": "api-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 86400
    })]
  }), 'GET');
  workbox.registerRoute(/^https:\/\/fonts\./i, new workbox.CacheFirst({
    "cacheName": "font-cache",
    plugins: [new workbox.ExpirationPlugin({
      maxEntries: 10,
      maxAgeSeconds: 31536000
    })]
  }), 'GET');

}));
//# sourceMappingURL=sw.js.map
