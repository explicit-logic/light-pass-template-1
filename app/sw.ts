import { Serwist } from 'serwist';
import { defaultCache } from '@serwist/next/worker';
// import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';
// import type { RuntimeCaching } from "serwist";
// import { CacheFirst, ExpirationPlugin, NetworkFirst, NetworkOnly, RangeRequestsPlugin, StaleWhileRevalidate } from "serwist";

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: defaultCache,
  // runtimeCaching: [
  //   {
  //     matcher: /.*/i,
  //     handler: new CacheFirst(),
  //   },
  // ],
});

serwist.addEventListeners();
