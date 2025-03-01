
import {Buffer} from "node:buffer";
globalThis.Buffer = Buffer;

import {AsyncLocalStorage} from "node:async_hooks";
globalThis.AsyncLocalStorage = AsyncLocalStorage;


const defaultDefineProperty = Object.defineProperty;
Object.defineProperty = function(o, p, a) {
  if(p=== '__import_unsupported' && Boolean(globalThis.__import_unsupported)) {
    return;
  }
  return defaultDefineProperty(o, p, a);
};

  
  
  globalThis.openNextDebug = false;globalThis.openNextVersion = "3.4.2";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@opennextjs/aws/dist/utils/error.js
function isOpenNextError(e) {
  try {
    return "__openNextInternal" in e;
  } catch {
    return false;
  }
}
var init_error = __esm({
  "node_modules/@opennextjs/aws/dist/utils/error.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/adapters/logger.js
function debug(...args) {
  if (globalThis.openNextDebug) {
    console.log(...args);
  }
}
function warn(...args) {
  console.warn(...args);
}
function error(...args) {
  if (args.some((arg) => isDownplayedErrorLog(arg))) {
    return debug(...args);
  }
  if (args.some((arg) => isOpenNextError(arg))) {
    const error2 = args.find((arg) => isOpenNextError(arg));
    if (error2.logLevel < getOpenNextErrorLogLevel()) {
      return;
    }
    if (error2.logLevel === 0) {
      return console.log(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    if (error2.logLevel === 1) {
      return warn(...args.map((arg) => isOpenNextError(arg) ? `${arg.name}: ${arg.message}` : arg));
    }
    return console.error(...args);
  }
  console.error(...args);
}
function getOpenNextErrorLogLevel() {
  const strLevel = process.env.OPEN_NEXT_ERROR_LOG_LEVEL ?? "1";
  switch (strLevel.toLowerCase()) {
    case "debug":
    case "0":
      return 0;
    case "error":
    case "2":
      return 2;
    default:
      return 1;
  }
}
var DOWNPLAYED_ERROR_LOGS, isDownplayedErrorLog;
var init_logger = __esm({
  "node_modules/@opennextjs/aws/dist/adapters/logger.js"() {
    init_error();
    DOWNPLAYED_ERROR_LOGS = [
      {
        clientName: "S3Client",
        commandName: "GetObjectCommand",
        errorName: "NoSuchKey"
      }
    ];
    isDownplayedErrorLog = (errorLog) => DOWNPLAYED_ERROR_LOGS.some((downplayedInput) => downplayedInput.clientName === errorLog?.clientName && downplayedInput.commandName === errorLog?.commandName && (downplayedInput.errorName === errorLog?.error?.name || downplayedInput.errorName === errorLog?.error?.Code));
  }
});

// node_modules/@opennextjs/aws/dist/http/util.js
function parseCookies(cookies) {
  if (!cookies) {
    return [];
  }
  return typeof cookies === "string" ? cookies.split(/(?<!Expires=\w+),/i).map((c) => c.trim()) : cookies;
}
var init_util = __esm({
  "node_modules/@opennextjs/aws/dist/http/util.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/converters/edge.js
var edge_exports = {};
__export(edge_exports, {
  default: () => edge_default
});
import { Buffer as Buffer2 } from "node:buffer";
var converter, edge_default;
var init_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/converters/edge.js"() {
    init_util();
    converter = {
      convertFrom: async (event) => {
        const url = new URL(event.url);
        const searchParams = url.searchParams;
        const query = {};
        for (const [key, value] of searchParams.entries()) {
          if (key in query) {
            if (Array.isArray(query[key])) {
              query[key].push(value);
            } else {
              query[key] = [query[key], value];
            }
          } else {
            query[key] = value;
          }
        }
        const body = await event.arrayBuffer();
        const headers = {};
        event.headers.forEach((value, key) => {
          headers[key] = value;
        });
        const rawPath = url.pathname;
        const method = event.method;
        const shouldHaveBody = method !== "GET" && method !== "HEAD";
        const cookies = Object.fromEntries(parseCookies(event.headers.get("cookie")).map((cookie) => cookie.split("=")));
        return {
          type: "core",
          method,
          rawPath,
          url: event.url,
          body: shouldHaveBody ? Buffer2.from(body) : void 0,
          headers,
          remoteAddress: event.headers.get("x-forwarded-for") ?? "::1",
          query,
          cookies
        };
      },
      convertTo: async (result) => {
        if ("internalEvent" in result) {
          const request = new Request(result.internalEvent.url, {
            body: result.internalEvent.body,
            method: result.internalEvent.method,
            headers: {
              ...result.internalEvent.headers,
              "x-forwarded-host": result.internalEvent.headers.host
            }
          });
          if (globalThis.__dangerous_ON_edge_converter_returns_request === true) {
            return request;
          }
          const cfCache = (result.isISR || result.internalEvent.rawPath.startsWith("/_next/image")) && process.env.DISABLE_CACHE !== "true" ? { cacheEverything: true } : {};
          return fetch(request, {
            // This is a hack to make sure that the response is cached by Cloudflare
            // See https://developers.cloudflare.com/workers/examples/cache-using-fetch/#caching-html-resources
            // @ts-expect-error - This is a Cloudflare specific option
            cf: cfCache
          });
        }
        const headers = new Headers();
        for (const [key, value] of Object.entries(result.headers)) {
          headers.set(key, Array.isArray(value) ? value.join(",") : value);
        }
        return new Response(result.body, {
          status: result.statusCode,
          headers
        });
      },
      name: "edge"
    };
    edge_default = converter;
  }
});

// node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js
var cloudflare_edge_exports = {};
__export(cloudflare_edge_exports, {
  default: () => cloudflare_edge_default
});
var cfPropNameMapping, handler, cloudflare_edge_default;
var init_cloudflare_edge = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/wrappers/cloudflare-edge.js"() {
    cfPropNameMapping = {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: [encodeURIComponent, "x-open-next-city"],
      country: "x-open-next-country",
      regionCode: "x-open-next-region",
      latitude: "x-open-next-latitude",
      longitude: "x-open-next-longitude"
    };
    handler = async (handler3, converter2) => async (request, env, ctx) => {
      globalThis.process = process;
      for (const [key, value] of Object.entries(env)) {
        if (typeof value === "string") {
          process.env[key] = value;
        }
      }
      const internalEvent = await converter2.convertFrom(request);
      const cfProperties = request.cf;
      for (const [propName, mapping] of Object.entries(cfPropNameMapping)) {
        const propValue = cfProperties?.[propName];
        if (propValue != null) {
          const [encode, headerName] = Array.isArray(mapping) ? mapping : [null, mapping];
          internalEvent.headers[headerName] = encode ? encode(propValue) : propValue;
        }
      }
      const response = await handler3(internalEvent, {
        waitUntil: ctx.waitUntil.bind(ctx)
      });
      const result = await converter2.convertTo(response);
      return result;
    };
    cloudflare_edge_default = {
      wrapper: handler,
      name: "cloudflare-edge",
      supportStreaming: true,
      edgeRuntime: true
    };
  }
});

// node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js
var pattern_env_exports = {};
__export(pattern_env_exports, {
  default: () => pattern_env_default
});
var envLoader, pattern_env_default;
var init_pattern_env = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/originResolver/pattern-env.js"() {
    init_logger();
    envLoader = {
      name: "env",
      resolve: async (_path) => {
        try {
          const origin = JSON.parse(process.env.OPEN_NEXT_ORIGIN ?? "{}");
          for (const [key, value] of Object.entries(globalThis.openNextConfig.functions ?? {}).filter(([key2]) => key2 !== "default")) {
            if (value.patterns.some((pattern) => {
              return new RegExp(
                // transform glob pattern to regex
                `/${pattern.replace(/\*\*/g, "(.*)").replace(/\*/g, "([^/]*)").replace(/\//g, "\\/").replace(/\?/g, ".")}`
              ).test(_path);
            })) {
              debug("Using origin", key, value.patterns);
              return origin[key];
            }
          }
          if (_path.startsWith("/_next/image") && origin.imageOptimizer) {
            debug("Using origin", "imageOptimizer", _path);
            return origin.imageOptimizer;
          }
          if (origin.default) {
            debug("Using default origin", origin.default, _path);
            return origin.default;
          }
          return false;
        } catch (e) {
          error("Error while resolving origin", e);
          return false;
        }
      }
    };
    pattern_env_default = envLoader;
  }
});

// node_modules/@opennextjs/aws/dist/utils/stream.js
import { Readable } from "node:stream";
function toReadableStream(value, isBase64) {
  return Readable.toWeb(Readable.from(Buffer.from(value, isBase64 ? "base64" : "utf8")));
}
function emptyReadableStream() {
  if (process.env.OPEN_NEXT_FORCE_NON_EMPTY_RESPONSE === "true") {
    return Readable.toWeb(Readable.from([Buffer.from("SOMETHING")]));
  }
  return Readable.toWeb(Readable.from([]));
}
var init_stream = __esm({
  "node_modules/@opennextjs/aws/dist/utils/stream.js"() {
  }
});

// node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js
var fetch_exports = {};
__export(fetch_exports, {
  default: () => fetch_default
});
var fetchProxy, fetch_default;
var init_fetch = __esm({
  "node_modules/@opennextjs/aws/dist/overrides/proxyExternalRequest/fetch.js"() {
    init_stream();
    fetchProxy = {
      name: "fetch-proxy",
      // @ts-ignore
      proxy: async (internalEvent) => {
        const { url, headers: eventHeaders, method, body } = internalEvent;
        const headers = Object.fromEntries(Object.entries(eventHeaders).filter(([key]) => key.toLowerCase() !== "cf-connecting-ip"));
        const response = await fetch(url, {
          method,
          headers,
          body
        });
        const responseHeaders = {};
        response.headers.forEach((value, key) => {
          responseHeaders[key] = value;
        });
        return {
          type: "core",
          headers: responseHeaders,
          statusCode: response.status,
          isBase64Encoded: true,
          body: response.body ?? emptyReadableStream()
        };
      }
    };
    fetch_default = fetchProxy;
  }
});

// .next/server/edge-runtime-webpack.js
var require_edge_runtime_webpack = __commonJS({
  ".next/server/edge-runtime-webpack.js"() {
    "use strict";
    (() => {
      "use strict";
      var e = {}, r = {};
      function t(o) {
        var n = r[o];
        if (void 0 !== n)
          return n.exports;
        var a = r[o] = { exports: {} }, f = true;
        try {
          e[o](a, a.exports, t), f = false;
        } finally {
          f && delete r[o];
        }
        return a.exports;
      }
      t.m = e, t.amdO = {}, (() => {
        var e2 = [];
        t.O = (r2, o, n, a) => {
          if (o) {
            a = a || 0;
            for (var f = e2.length; f > 0 && e2[f - 1][2] > a; f--)
              e2[f] = e2[f - 1];
            e2[f] = [o, n, a];
            return;
          }
          for (var i = 1 / 0, f = 0; f < e2.length; f++) {
            for (var [o, n, a] = e2[f], l = true, u = 0; u < o.length; u++)
              (false & a || i >= a) && Object.keys(t.O).every((e3) => t.O[e3](o[u])) ? o.splice(u--, 1) : (l = false, a < i && (i = a));
            if (l) {
              e2.splice(f--, 1);
              var c = n();
              void 0 !== c && (r2 = c);
            }
          }
          return r2;
        };
      })(), t.n = (e2) => {
        var r2 = e2 && e2.__esModule ? () => e2.default : () => e2;
        return t.d(r2, { a: r2 }), r2;
      }, (() => {
        var e2, r2 = Object.getPrototypeOf ? (e3) => Object.getPrototypeOf(e3) : (e3) => e3.__proto__;
        t.t = function(o, n) {
          if (1 & n && (o = this(o)), 8 & n || "object" == typeof o && o && (4 & n && o.__esModule || 16 & n && "function" == typeof o.then))
            return o;
          var a = /* @__PURE__ */ Object.create(null);
          t.r(a);
          var f = {};
          e2 = e2 || [null, r2({}), r2([]), r2(r2)];
          for (var i = 2 & n && o; "object" == typeof i && !~e2.indexOf(i); i = r2(i))
            Object.getOwnPropertyNames(i).forEach((e3) => f[e3] = () => o[e3]);
          return f.default = () => o, t.d(a, f), a;
        };
      })(), t.d = (e2, r2) => {
        for (var o in r2)
          t.o(r2, o) && !t.o(e2, o) && Object.defineProperty(e2, o, { enumerable: true, get: r2[o] });
      }, t.e = () => Promise.resolve(), t.g = function() {
        if ("object" == typeof globalThis)
          return globalThis;
        try {
          return this || Function("return this")();
        } catch (e2) {
          if ("object" == typeof window)
            return window;
        }
      }(), t.o = (e2, r2) => Object.prototype.hasOwnProperty.call(e2, r2), t.r = (e2) => {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
      }, (() => {
        var e2 = { 149: 0 };
        t.O.j = (r3) => 0 === e2[r3];
        var r2 = (r3, o2) => {
          var n, a, [f, i, l] = o2, u = 0;
          if (f.some((r4) => 0 !== e2[r4])) {
            for (n in i)
              t.o(i, n) && (t.m[n] = i[n]);
            if (l)
              var c = l(t);
          }
          for (r3 && r3(o2); u < f.length; u++)
            a = f[u], t.o(e2, a) && e2[a] && e2[a][0](), e2[a] = 0;
          return t.O(c);
        }, o = self.webpackChunk_N_E = self.webpackChunk_N_E || [];
        o.forEach(r2.bind(null, 0)), o.push = r2.bind(null, o.push.bind(o));
      })();
    })();
  }
});

// node-built-in-modules:node:async_hooks
var node_async_hooks_exports = {};
import * as node_async_hooks_star from "node:async_hooks";
var init_node_async_hooks = __esm({
  "node-built-in-modules:node:async_hooks"() {
    __reExport(node_async_hooks_exports, node_async_hooks_star);
  }
});

// node-built-in-modules:node:buffer
var node_buffer_exports = {};
import * as node_buffer_star from "node:buffer";
var init_node_buffer = __esm({
  "node-built-in-modules:node:buffer"() {
    __reExport(node_buffer_exports, node_buffer_star);
  }
});

// .next/server/src/middleware.js
var require_middleware = __commonJS({
  ".next/server/src/middleware.js"() {
    "use strict";
    (self.webpackChunk_N_E = self.webpackChunk_N_E || []).push([[550], { 1691: (e, t, r) => {
      var n = { "./en.json": 7020, "./fr.json": 2245 };
      function i(e2) {
        return Promise.resolve().then(() => {
          if (!r.o(n, e2)) {
            var t2 = Error("Cannot find module '" + e2 + "'");
            throw t2.code = "MODULE_NOT_FOUND", t2;
          }
          var i2 = n[e2];
          return r.t(i2, 19);
        });
      }
      i.keys = () => Object.keys(n), i.id = 1691, e.exports = i;
    }, 5521: (e) => {
      "use strict";
      e.exports = (init_node_async_hooks(), __toCommonJS(node_async_hooks_exports));
    }, 5356: (e) => {
      "use strict";
      e.exports = (init_node_buffer(), __toCommonJS(node_buffer_exports));
    }, 6927: (e, t, r) => {
      "use strict";
      function n(e2, t2) {
        var r2 = t2 && t2.cache ? t2.cache : l, n2 = t2 && t2.serializer ? t2.serializer : o;
        return (t2 && t2.strategy ? t2.strategy : function(e3, t3) {
          var r3, n3, o2 = 1 === e3.length ? i : a;
          return r3 = t3.cache.create(), n3 = t3.serializer, o2.bind(this, e3, r3, n3);
        })(e2, { cache: r2, serializer: n2 });
      }
      function i(e2, t2, r2, n2) {
        var i2 = null == n2 || "number" == typeof n2 || "boolean" == typeof n2 ? n2 : r2(n2), a2 = t2.get(i2);
        return void 0 === a2 && (a2 = e2.call(this, n2), t2.set(i2, a2)), a2;
      }
      function a(e2, t2, r2) {
        var n2 = Array.prototype.slice.call(arguments, 3), i2 = r2(n2), a2 = t2.get(i2);
        return void 0 === a2 && (a2 = e2.apply(this, n2), t2.set(i2, a2)), a2;
      }
      r.r(t), r.d(t, { memoize: () => n, strategies: () => u });
      var o = function() {
        return JSON.stringify(arguments);
      }, s = function() {
        function e2() {
          this.cache = /* @__PURE__ */ Object.create(null);
        }
        return e2.prototype.get = function(e3) {
          return this.cache[e3];
        }, e2.prototype.set = function(e3, t2) {
          this.cache[e3] = t2;
        }, e2;
      }(), l = { create: function() {
        return new s();
      } }, u = { variadic: function(e2, t2) {
        var r2, n2;
        return r2 = t2.cache.create(), n2 = t2.serializer, a.bind(this, e2, r2, n2);
      }, monadic: function(e2, t2) {
        var r2, n2;
        return r2 = t2.cache.create(), n2 = t2.serializer, i.bind(this, e2, r2, n2);
      } };
    }, 8324: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { LookupSupportedLocales: () => g, ResolveLocale: () => p, match: () => m });
      var n, i = r(2985), a = { supplemental: { languageMatching: { "written-new": [{ paradigmLocales: { _locales: "en en_GB es es_419 pt_BR pt_PT" } }, { $enUS: { _value: "AS+CA+GU+MH+MP+PH+PR+UM+US+VI" } }, { $cnsar: { _value: "HK+MO" } }, { $americas: { _value: "019" } }, { $maghreb: { _value: "MA+DZ+TN+LY+MR+EH" } }, { no: { _desired: "nb", _distance: "1" } }, { bs: { _desired: "hr", _distance: "4" } }, { bs: { _desired: "sh", _distance: "4" } }, { hr: { _desired: "sh", _distance: "4" } }, { sr: { _desired: "sh", _distance: "4" } }, { aa: { _desired: "ssy", _distance: "4" } }, { de: { _desired: "gsw", _distance: "4", _oneway: "true" } }, { de: { _desired: "lb", _distance: "4", _oneway: "true" } }, { no: { _desired: "da", _distance: "8" } }, { nb: { _desired: "da", _distance: "8" } }, { ru: { _desired: "ab", _distance: "30", _oneway: "true" } }, { en: { _desired: "ach", _distance: "30", _oneway: "true" } }, { nl: { _desired: "af", _distance: "20", _oneway: "true" } }, { en: { _desired: "ak", _distance: "30", _oneway: "true" } }, { en: { _desired: "am", _distance: "30", _oneway: "true" } }, { es: { _desired: "ay", _distance: "20", _oneway: "true" } }, { ru: { _desired: "az", _distance: "30", _oneway: "true" } }, { ur: { _desired: "bal", _distance: "20", _oneway: "true" } }, { ru: { _desired: "be", _distance: "20", _oneway: "true" } }, { en: { _desired: "bem", _distance: "30", _oneway: "true" } }, { hi: { _desired: "bh", _distance: "30", _oneway: "true" } }, { en: { _desired: "bn", _distance: "30", _oneway: "true" } }, { zh: { _desired: "bo", _distance: "20", _oneway: "true" } }, { fr: { _desired: "br", _distance: "20", _oneway: "true" } }, { es: { _desired: "ca", _distance: "20", _oneway: "true" } }, { fil: { _desired: "ceb", _distance: "30", _oneway: "true" } }, { en: { _desired: "chr", _distance: "20", _oneway: "true" } }, { ar: { _desired: "ckb", _distance: "30", _oneway: "true" } }, { fr: { _desired: "co", _distance: "20", _oneway: "true" } }, { fr: { _desired: "crs", _distance: "20", _oneway: "true" } }, { sk: { _desired: "cs", _distance: "20" } }, { en: { _desired: "cy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ee", _distance: "30", _oneway: "true" } }, { en: { _desired: "eo", _distance: "30", _oneway: "true" } }, { es: { _desired: "eu", _distance: "20", _oneway: "true" } }, { da: { _desired: "fo", _distance: "20", _oneway: "true" } }, { nl: { _desired: "fy", _distance: "20", _oneway: "true" } }, { en: { _desired: "ga", _distance: "20", _oneway: "true" } }, { en: { _desired: "gaa", _distance: "30", _oneway: "true" } }, { en: { _desired: "gd", _distance: "20", _oneway: "true" } }, { es: { _desired: "gl", _distance: "20", _oneway: "true" } }, { es: { _desired: "gn", _distance: "20", _oneway: "true" } }, { hi: { _desired: "gu", _distance: "30", _oneway: "true" } }, { en: { _desired: "ha", _distance: "30", _oneway: "true" } }, { en: { _desired: "haw", _distance: "20", _oneway: "true" } }, { fr: { _desired: "ht", _distance: "20", _oneway: "true" } }, { ru: { _desired: "hy", _distance: "30", _oneway: "true" } }, { en: { _desired: "ia", _distance: "30", _oneway: "true" } }, { en: { _desired: "ig", _distance: "30", _oneway: "true" } }, { en: { _desired: "is", _distance: "20", _oneway: "true" } }, { id: { _desired: "jv", _distance: "20", _oneway: "true" } }, { en: { _desired: "ka", _distance: "30", _oneway: "true" } }, { fr: { _desired: "kg", _distance: "30", _oneway: "true" } }, { ru: { _desired: "kk", _distance: "30", _oneway: "true" } }, { en: { _desired: "km", _distance: "30", _oneway: "true" } }, { en: { _desired: "kn", _distance: "30", _oneway: "true" } }, { en: { _desired: "kri", _distance: "30", _oneway: "true" } }, { tr: { _desired: "ku", _distance: "30", _oneway: "true" } }, { ru: { _desired: "ky", _distance: "30", _oneway: "true" } }, { it: { _desired: "la", _distance: "20", _oneway: "true" } }, { en: { _desired: "lg", _distance: "30", _oneway: "true" } }, { fr: { _desired: "ln", _distance: "30", _oneway: "true" } }, { en: { _desired: "lo", _distance: "30", _oneway: "true" } }, { en: { _desired: "loz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "lua", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mai", _distance: "20", _oneway: "true" } }, { en: { _desired: "mfe", _distance: "30", _oneway: "true" } }, { fr: { _desired: "mg", _distance: "30", _oneway: "true" } }, { en: { _desired: "mi", _distance: "20", _oneway: "true" } }, { en: { _desired: "ml", _distance: "30", _oneway: "true" } }, { ru: { _desired: "mn", _distance: "30", _oneway: "true" } }, { hi: { _desired: "mr", _distance: "30", _oneway: "true" } }, { id: { _desired: "ms", _distance: "30", _oneway: "true" } }, { en: { _desired: "mt", _distance: "30", _oneway: "true" } }, { en: { _desired: "my", _distance: "30", _oneway: "true" } }, { en: { _desired: "ne", _distance: "30", _oneway: "true" } }, { nb: { _desired: "nn", _distance: "20" } }, { no: { _desired: "nn", _distance: "20" } }, { en: { _desired: "nso", _distance: "30", _oneway: "true" } }, { en: { _desired: "ny", _distance: "30", _oneway: "true" } }, { en: { _desired: "nyn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "oc", _distance: "20", _oneway: "true" } }, { en: { _desired: "om", _distance: "30", _oneway: "true" } }, { en: { _desired: "or", _distance: "30", _oneway: "true" } }, { en: { _desired: "pa", _distance: "30", _oneway: "true" } }, { en: { _desired: "pcm", _distance: "20", _oneway: "true" } }, { en: { _desired: "ps", _distance: "30", _oneway: "true" } }, { es: { _desired: "qu", _distance: "30", _oneway: "true" } }, { de: { _desired: "rm", _distance: "20", _oneway: "true" } }, { en: { _desired: "rn", _distance: "30", _oneway: "true" } }, { fr: { _desired: "rw", _distance: "30", _oneway: "true" } }, { hi: { _desired: "sa", _distance: "30", _oneway: "true" } }, { en: { _desired: "sd", _distance: "30", _oneway: "true" } }, { en: { _desired: "si", _distance: "30", _oneway: "true" } }, { en: { _desired: "sn", _distance: "30", _oneway: "true" } }, { en: { _desired: "so", _distance: "30", _oneway: "true" } }, { en: { _desired: "sq", _distance: "30", _oneway: "true" } }, { en: { _desired: "st", _distance: "30", _oneway: "true" } }, { id: { _desired: "su", _distance: "20", _oneway: "true" } }, { en: { _desired: "sw", _distance: "30", _oneway: "true" } }, { en: { _desired: "ta", _distance: "30", _oneway: "true" } }, { en: { _desired: "te", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tg", _distance: "30", _oneway: "true" } }, { en: { _desired: "ti", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tk", _distance: "30", _oneway: "true" } }, { en: { _desired: "tlh", _distance: "30", _oneway: "true" } }, { en: { _desired: "tn", _distance: "30", _oneway: "true" } }, { en: { _desired: "to", _distance: "30", _oneway: "true" } }, { ru: { _desired: "tt", _distance: "30", _oneway: "true" } }, { en: { _desired: "tum", _distance: "30", _oneway: "true" } }, { zh: { _desired: "ug", _distance: "20", _oneway: "true" } }, { ru: { _desired: "uk", _distance: "20", _oneway: "true" } }, { en: { _desired: "ur", _distance: "30", _oneway: "true" } }, { ru: { _desired: "uz", _distance: "30", _oneway: "true" } }, { fr: { _desired: "wo", _distance: "30", _oneway: "true" } }, { en: { _desired: "xh", _distance: "30", _oneway: "true" } }, { en: { _desired: "yi", _distance: "30", _oneway: "true" } }, { en: { _desired: "yo", _distance: "30", _oneway: "true" } }, { zh: { _desired: "za", _distance: "20", _oneway: "true" } }, { en: { _desired: "zu", _distance: "30", _oneway: "true" } }, { ar: { _desired: "aao", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "abv", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acm", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acw", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acx", _distance: "10", _oneway: "true" } }, { ar: { _desired: "acy", _distance: "10", _oneway: "true" } }, { ar: { _desired: "adf", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aeb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "aec", _distance: "10", _oneway: "true" } }, { ar: { _desired: "afb", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ajp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apc", _distance: "10", _oneway: "true" } }, { ar: { _desired: "apd", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arq", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ars", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ary", _distance: "10", _oneway: "true" } }, { ar: { _desired: "arz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "auz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "avl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayh", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayl", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayn", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ayp", _distance: "10", _oneway: "true" } }, { ar: { _desired: "bbz", _distance: "10", _oneway: "true" } }, { ar: { _desired: "pga", _distance: "10", _oneway: "true" } }, { ar: { _desired: "shu", _distance: "10", _oneway: "true" } }, { ar: { _desired: "ssh", _distance: "10", _oneway: "true" } }, { az: { _desired: "azb", _distance: "10", _oneway: "true" } }, { et: { _desired: "vro", _distance: "10", _oneway: "true" } }, { ff: { _desired: "ffm", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fub", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fue", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuf", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuh", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fui", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuq", _distance: "10", _oneway: "true" } }, { ff: { _desired: "fuv", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gnw", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gui", _distance: "10", _oneway: "true" } }, { gn: { _desired: "gun", _distance: "10", _oneway: "true" } }, { gn: { _desired: "nhd", _distance: "10", _oneway: "true" } }, { iu: { _desired: "ikt", _distance: "10", _oneway: "true" } }, { kln: { _desired: "enb", _distance: "10", _oneway: "true" } }, { kln: { _desired: "eyo", _distance: "10", _oneway: "true" } }, { kln: { _desired: "niq", _distance: "10", _oneway: "true" } }, { kln: { _desired: "oki", _distance: "10", _oneway: "true" } }, { kln: { _desired: "pko", _distance: "10", _oneway: "true" } }, { kln: { _desired: "sgc", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tec", _distance: "10", _oneway: "true" } }, { kln: { _desired: "tuy", _distance: "10", _oneway: "true" } }, { kok: { _desired: "gom", _distance: "10", _oneway: "true" } }, { kpe: { _desired: "gkp", _distance: "10", _oneway: "true" } }, { luy: { _desired: "ida", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lkb", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lko", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lks", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lri", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lrm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lsm", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lto", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lts", _distance: "10", _oneway: "true" } }, { luy: { _desired: "lwg", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nle", _distance: "10", _oneway: "true" } }, { luy: { _desired: "nyd", _distance: "10", _oneway: "true" } }, { luy: { _desired: "rag", _distance: "10", _oneway: "true" } }, { lv: { _desired: "ltg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bhr", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bjq", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bmm", _distance: "10", _oneway: "true" } }, { mg: { _desired: "bzc", _distance: "10", _oneway: "true" } }, { mg: { _desired: "msh", _distance: "10", _oneway: "true" } }, { mg: { _desired: "skg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tdx", _distance: "10", _oneway: "true" } }, { mg: { _desired: "tkg", _distance: "10", _oneway: "true" } }, { mg: { _desired: "txy", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmv", _distance: "10", _oneway: "true" } }, { mg: { _desired: "xmw", _distance: "10", _oneway: "true" } }, { mn: { _desired: "mvf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bjn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "btj", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bve", _distance: "10", _oneway: "true" } }, { ms: { _desired: "bvu", _distance: "10", _oneway: "true" } }, { ms: { _desired: "coa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "dup", _distance: "10", _oneway: "true" } }, { ms: { _desired: "hji", _distance: "10", _oneway: "true" } }, { ms: { _desired: "id", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jak", _distance: "10", _oneway: "true" } }, { ms: { _desired: "jax", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kvr", _distance: "10", _oneway: "true" } }, { ms: { _desired: "kxd", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lce", _distance: "10", _oneway: "true" } }, { ms: { _desired: "lcf", _distance: "10", _oneway: "true" } }, { ms: { _desired: "liw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "max", _distance: "10", _oneway: "true" } }, { ms: { _desired: "meo", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfa", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mfb", _distance: "10", _oneway: "true" } }, { ms: { _desired: "min", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mqg", _distance: "10", _oneway: "true" } }, { ms: { _desired: "msi", _distance: "10", _oneway: "true" } }, { ms: { _desired: "mui", _distance: "10", _oneway: "true" } }, { ms: { _desired: "orn", _distance: "10", _oneway: "true" } }, { ms: { _desired: "ors", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pel", _distance: "10", _oneway: "true" } }, { ms: { _desired: "pse", _distance: "10", _oneway: "true" } }, { ms: { _desired: "tmw", _distance: "10", _oneway: "true" } }, { ms: { _desired: "urk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkk", _distance: "10", _oneway: "true" } }, { ms: { _desired: "vkt", _distance: "10", _oneway: "true" } }, { ms: { _desired: "xmm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zlm", _distance: "10", _oneway: "true" } }, { ms: { _desired: "zmi", _distance: "10", _oneway: "true" } }, { ne: { _desired: "dty", _distance: "10", _oneway: "true" } }, { om: { _desired: "gax", _distance: "10", _oneway: "true" } }, { om: { _desired: "hae", _distance: "10", _oneway: "true" } }, { om: { _desired: "orc", _distance: "10", _oneway: "true" } }, { or: { _desired: "spv", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pbt", _distance: "10", _oneway: "true" } }, { ps: { _desired: "pst", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qub", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qud", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quf", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qug", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quk", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qul", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qup", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qur", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qus", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qux", _distance: "10", _oneway: "true" } }, { qu: { _desired: "quy", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qva", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qve", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvi", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvj", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvm", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvs", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvw", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qvz", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qwh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qws", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxa", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxc", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxh", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxl", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxn", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxo", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxp", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxr", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxt", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxu", _distance: "10", _oneway: "true" } }, { qu: { _desired: "qxw", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdc", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sdn", _distance: "10", _oneway: "true" } }, { sc: { _desired: "sro", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aae", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aat", _distance: "10", _oneway: "true" } }, { sq: { _desired: "aln", _distance: "10", _oneway: "true" } }, { syr: { _desired: "aii", _distance: "10", _oneway: "true" } }, { uz: { _desired: "uzs", _distance: "10", _oneway: "true" } }, { yi: { _desired: "yih", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cdo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cjy", _distance: "10", _oneway: "true" } }, { zh: { _desired: "cpx", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "czo", _distance: "10", _oneway: "true" } }, { zh: { _desired: "gan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hak", _distance: "10", _oneway: "true" } }, { zh: { _desired: "hsn", _distance: "10", _oneway: "true" } }, { zh: { _desired: "lzh", _distance: "10", _oneway: "true" } }, { zh: { _desired: "mnp", _distance: "10", _oneway: "true" } }, { zh: { _desired: "nan", _distance: "10", _oneway: "true" } }, { zh: { _desired: "wuu", _distance: "10", _oneway: "true" } }, { zh: { _desired: "yue", _distance: "10", _oneway: "true" } }, { "*": { _desired: "*", _distance: "80" } }, { "en-Latn": { _desired: "am-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "az-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "bn-Beng", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "bo-Tibt", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "hy-Armn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ka-Geor", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "km-Khmr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "kn-Knda", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "lo-Laoo", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ml-Mlym", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "my-Mymr", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ne-Deva", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "or-Orya", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "pa-Guru", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ps-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "sd-Arab", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "si-Sinh", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ta-Taml", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "te-Telu", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ti-Ethi", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "tk-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "ur-Arab", _distance: "10", _oneway: "true" } }, { "ru-Cyrl": { _desired: "uz-Latn", _distance: "10", _oneway: "true" } }, { "en-Latn": { _desired: "yi-Hebr", _distance: "10", _oneway: "true" } }, { "sr-Cyrl": { _desired: "sr-Latn", _distance: "5" } }, { "zh-Hans": { _desired: "za-Latn", _distance: "10", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "zh-Hant": { _desired: "zh-Hani", _distance: "20", _oneway: "true" } }, { "ar-Arab": { _desired: "ar-Latn", _distance: "20", _oneway: "true" } }, { "bn-Beng": { _desired: "bn-Latn", _distance: "20", _oneway: "true" } }, { "gu-Gujr": { _desired: "gu-Latn", _distance: "20", _oneway: "true" } }, { "hi-Deva": { _desired: "hi-Latn", _distance: "20", _oneway: "true" } }, { "kn-Knda": { _desired: "kn-Latn", _distance: "20", _oneway: "true" } }, { "ml-Mlym": { _desired: "ml-Latn", _distance: "20", _oneway: "true" } }, { "mr-Deva": { _desired: "mr-Latn", _distance: "20", _oneway: "true" } }, { "ta-Taml": { _desired: "ta-Latn", _distance: "20", _oneway: "true" } }, { "te-Telu": { _desired: "te-Latn", _distance: "20", _oneway: "true" } }, { "zh-Hans": { _desired: "zh-Latn", _distance: "20", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Latn", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hani", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ja-Jpan": { _desired: "ja-Hrkt", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Hira", _distance: "5", _oneway: "true" } }, { "ja-Hrkt": { _desired: "ja-Kana", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hani", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Hang", _distance: "5", _oneway: "true" } }, { "ko-Kore": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "ko-Hang": { _desired: "ko-Jamo", _distance: "5", _oneway: "true" } }, { "*-*": { _desired: "*-*", _distance: "50" } }, { "ar-*-$maghreb": { _desired: "ar-*-$maghreb", _distance: "4" } }, { "ar-*-$!maghreb": { _desired: "ar-*-$!maghreb", _distance: "4" } }, { "ar-*-*": { _desired: "ar-*-*", _distance: "5" } }, { "en-*-$enUS": { _desired: "en-*-$enUS", _distance: "4" } }, { "en-*-GB": { _desired: "en-*-$!enUS", _distance: "3" } }, { "en-*-$!enUS": { _desired: "en-*-$!enUS", _distance: "4" } }, { "en-*-*": { _desired: "en-*-*", _distance: "5" } }, { "es-*-$americas": { _desired: "es-*-$americas", _distance: "4" } }, { "es-*-$!americas": { _desired: "es-*-$!americas", _distance: "4" } }, { "es-*-*": { _desired: "es-*-*", _distance: "5" } }, { "pt-*-$americas": { _desired: "pt-*-$americas", _distance: "4" } }, { "pt-*-$!americas": { _desired: "pt-*-$!americas", _distance: "4" } }, { "pt-*-*": { _desired: "pt-*-*", _distance: "5" } }, { "zh-Hant-$cnsar": { _desired: "zh-Hant-$cnsar", _distance: "4" } }, { "zh-Hant-$!cnsar": { _desired: "zh-Hant-$!cnsar", _distance: "4" } }, { "zh-Hant-*": { _desired: "zh-Hant-*", _distance: "5" } }, { "*-*-*": { _desired: "*-*-*", _distance: "4" } }] } } }, o = { "001": ["001", "001-status-grouping", "002", "005", "009", "011", "013", "014", "015", "017", "018", "019", "021", "029", "030", "034", "035", "039", "053", "054", "057", "061", "142", "143", "145", "150", "151", "154", "155", "AC", "AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CP", "CQ", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DG", "DJ", "DK", "DM", "DO", "DZ", "EA", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "EU", "EZ", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "IC", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "QO", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TA", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "UN", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "XK", "YE", "YT", "ZA", "ZM", "ZW"], "002": ["002", "002-status-grouping", "011", "014", "015", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "DZ", "EA", "EG", "EH", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IC", "IO", "KE", "KM", "LR", "LS", "LY", "MA", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SD", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TN", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], "003": ["003", "013", "021", "029", "AG", "AI", "AW", "BB", "BL", "BM", "BQ", "BS", "BZ", "CA", "CR", "CU", "CW", "DM", "DO", "GD", "GL", "GP", "GT", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PM", "PR", "SV", "SX", "TC", "TT", "US", "VC", "VG", "VI"], "005": ["005", "AR", "BO", "BR", "BV", "CL", "CO", "EC", "FK", "GF", "GS", "GY", "PE", "PY", "SR", "UY", "VE"], "009": ["009", "053", "054", "057", "061", "AC", "AQ", "AS", "AU", "CC", "CK", "CP", "CX", "DG", "FJ", "FM", "GU", "HM", "KI", "MH", "MP", "NC", "NF", "NR", "NU", "NZ", "PF", "PG", "PN", "PW", "QO", "SB", "TA", "TK", "TO", "TV", "UM", "VU", "WF", "WS"], "011": ["011", "BF", "BJ", "CI", "CV", "GH", "GM", "GN", "GW", "LR", "ML", "MR", "NE", "NG", "SH", "SL", "SN", "TG"], "013": ["013", "BZ", "CR", "GT", "HN", "MX", "NI", "PA", "SV"], "014": ["014", "BI", "DJ", "ER", "ET", "IO", "KE", "KM", "MG", "MU", "MW", "MZ", "RE", "RW", "SC", "SO", "SS", "TF", "TZ", "UG", "YT", "ZM", "ZW"], "015": ["015", "DZ", "EA", "EG", "EH", "IC", "LY", "MA", "SD", "TN"], "017": ["017", "AO", "CD", "CF", "CG", "CM", "GA", "GQ", "ST", "TD"], "018": ["018", "BW", "LS", "NA", "SZ", "ZA"], "019": ["003", "005", "013", "019", "019-status-grouping", "021", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BM", "BO", "BQ", "BR", "BS", "BV", "BZ", "CA", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GL", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PM", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "US", "UY", "VC", "VE", "VG", "VI"], "021": ["021", "BM", "CA", "GL", "PM", "US"], "029": ["029", "AG", "AI", "AW", "BB", "BL", "BQ", "BS", "CU", "CW", "DM", "DO", "GD", "GP", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "PR", "SX", "TC", "TT", "VC", "VG", "VI"], "030": ["030", "CN", "HK", "JP", "KP", "KR", "MN", "MO", "TW"], "034": ["034", "AF", "BD", "BT", "IN", "IR", "LK", "MV", "NP", "PK"], "035": ["035", "BN", "ID", "KH", "LA", "MM", "MY", "PH", "SG", "TH", "TL", "VN"], "039": ["039", "AD", "AL", "BA", "ES", "GI", "GR", "HR", "IT", "ME", "MK", "MT", "PT", "RS", "SI", "SM", "VA", "XK"], "053": ["053", "AU", "CC", "CX", "HM", "NF", "NZ"], "054": ["054", "FJ", "NC", "PG", "SB", "VU"], "057": ["057", "FM", "GU", "KI", "MH", "MP", "NR", "PW", "UM"], "061": ["061", "AS", "CK", "NU", "PF", "PN", "TK", "TO", "TV", "WF", "WS"], 142: ["030", "034", "035", "142", "143", "145", "AE", "AF", "AM", "AZ", "BD", "BH", "BN", "BT", "CN", "CY", "GE", "HK", "ID", "IL", "IN", "IQ", "IR", "JO", "JP", "KG", "KH", "KP", "KR", "KW", "KZ", "LA", "LB", "LK", "MM", "MN", "MO", "MV", "MY", "NP", "OM", "PH", "PK", "PS", "QA", "SA", "SG", "SY", "TH", "TJ", "TL", "TM", "TR", "TW", "UZ", "VN", "YE"], 143: ["143", "KG", "KZ", "TJ", "TM", "UZ"], 145: ["145", "AE", "AM", "AZ", "BH", "CY", "GE", "IL", "IQ", "JO", "KW", "LB", "OM", "PS", "QA", "SA", "SY", "TR", "YE"], 150: ["039", "150", "151", "154", "155", "AD", "AL", "AT", "AX", "BA", "BE", "BG", "BY", "CH", "CQ", "CZ", "DE", "DK", "EE", "ES", "FI", "FO", "FR", "GB", "GG", "GI", "GR", "HR", "HU", "IE", "IM", "IS", "IT", "JE", "LI", "LT", "LU", "LV", "MC", "MD", "ME", "MK", "MT", "NL", "NO", "PL", "PT", "RO", "RS", "RU", "SE", "SI", "SJ", "SK", "SM", "UA", "VA", "XK"], 151: ["151", "BG", "BY", "CZ", "HU", "MD", "PL", "RO", "RU", "SK", "UA"], 154: ["154", "AX", "CQ", "DK", "EE", "FI", "FO", "GB", "GG", "IE", "IM", "IS", "JE", "LT", "LV", "NO", "SE", "SJ"], 155: ["155", "AT", "BE", "CH", "DE", "FR", "LI", "LU", "MC", "NL"], 202: ["011", "014", "017", "018", "202", "AO", "BF", "BI", "BJ", "BW", "CD", "CF", "CG", "CI", "CM", "CV", "DJ", "ER", "ET", "GA", "GH", "GM", "GN", "GQ", "GW", "IO", "KE", "KM", "LR", "LS", "MG", "ML", "MR", "MU", "MW", "MZ", "NA", "NE", "NG", "RE", "RW", "SC", "SH", "SL", "SN", "SO", "SS", "ST", "SZ", "TD", "TF", "TG", "TZ", "UG", "YT", "ZA", "ZM", "ZW"], 419: ["005", "013", "029", "419", "AG", "AI", "AR", "AW", "BB", "BL", "BO", "BQ", "BR", "BS", "BV", "BZ", "CL", "CO", "CR", "CU", "CW", "DM", "DO", "EC", "FK", "GD", "GF", "GP", "GS", "GT", "GY", "HN", "HT", "JM", "KN", "KY", "LC", "MF", "MQ", "MS", "MX", "NI", "PA", "PE", "PR", "PY", "SR", "SV", "SX", "TC", "TT", "UY", "VC", "VE", "VG", "VI"], EU: ["AT", "BE", "BG", "CY", "CZ", "DE", "DK", "EE", "ES", "EU", "FI", "FR", "GR", "HR", "HU", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PL", "PT", "RO", "SE", "SI", "SK"], EZ: ["AT", "BE", "CY", "DE", "EE", "ES", "EZ", "FI", "FR", "GR", "IE", "IT", "LT", "LU", "LV", "MT", "NL", "PT", "SI", "SK"], QO: ["AC", "AQ", "CP", "DG", "QO", "TA"], UN: ["AD", "AE", "AF", "AG", "AL", "AM", "AO", "AR", "AT", "AU", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BN", "BO", "BR", "BS", "BT", "BW", "BY", "BZ", "CA", "CD", "CF", "CG", "CH", "CI", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "ER", "ES", "ET", "FI", "FJ", "FM", "FR", "GA", "GB", "GD", "GE", "GH", "GM", "GN", "GQ", "GR", "GT", "GW", "GY", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IN", "IQ", "IR", "IS", "IT", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MG", "MH", "MK", "ML", "MM", "MN", "MR", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NP", "NR", "NZ", "OM", "PA", "PE", "PG", "PH", "PK", "PL", "PT", "PW", "PY", "QA", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SI", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SY", "SZ", "TD", "TG", "TH", "TJ", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TZ", "UA", "UG", "UN", "US", "UY", "UZ", "VC", "VE", "VN", "VU", "WS", "YE", "ZA", "ZM", "ZW"] }, s = /-u(?:-[0-9a-z]{2,8})+/gi;
      function l(e2, t2, r2) {
        if (void 0 === r2 && (r2 = Error), !e2)
          throw new r2(t2);
      }
      function u(e2, t2, r2) {
        var n2 = t2.split("-"), a2 = n2[0], s2 = n2[1], l2 = n2[2], u2 = true;
        if (l2 && "$" === l2[0]) {
          var c2 = "!" !== l2[1], d2 = (c2 ? r2[l2.slice(1)] : r2[l2.slice(2)]).map(function(e3) {
            return o[e3] || [e3];
          }).reduce(function(e3, t3) {
            return (0, i.fX)((0, i.fX)([], e3, true), t3, true);
          }, []);
          u2 && (u2 = !(d2.indexOf(e2.region || "") > 1 != c2));
        } else
          u2 && (u2 = !e2.region || "*" === l2 || l2 === e2.region);
        return u2 && (u2 = !e2.script || "*" === s2 || s2 === e2.script), u2 && (u2 = !e2.language || "*" === a2 || a2 === e2.language), u2;
      }
      function c(e2) {
        return [e2.language, e2.script, e2.region].filter(Boolean).join("-");
      }
      function d(e2, t2, r2) {
        for (var n2 = 0, i2 = r2.matches; n2 < i2.length; n2++) {
          var a2 = i2[n2], o2 = u(e2, a2.desired, r2.matchVariables) && u(t2, a2.supported, r2.matchVariables);
          if (a2.oneway || o2 || (o2 = u(e2, a2.supported, r2.matchVariables) && u(t2, a2.desired, r2.matchVariables)), o2) {
            var s2 = 10 * a2.distance;
            if (r2.paradigmLocales.indexOf(c(e2)) > -1 != r2.paradigmLocales.indexOf(c(t2)) > -1)
              return s2 - 1;
            return s2;
          }
        }
        throw Error("No matching distance found");
      }
      function h(e2) {
        return Intl.getCanonicalLocales(e2)[0];
      }
      function f(e2, t2) {
        for (var r2 = t2; ; ) {
          if (e2.indexOf(r2) > -1)
            return r2;
          var n2 = r2.lastIndexOf("-");
          if (!~n2)
            return;
          n2 >= 2 && "-" === r2[n2 - 2] && (n2 -= 2), r2 = r2.slice(0, n2);
        }
      }
      function p(e2, t2, r2, o2, u2, c2) {
        "lookup" === r2.localeMatcher ? g2 = function(e3, t3, r3) {
          for (var n2 = { locale: "" }, i2 = 0; i2 < t3.length; i2++) {
            var a2 = t3[i2], o3 = a2.replace(s, ""), l2 = f(e3, o3);
            if (l2)
              return n2.locale = l2, a2 !== o3 && (n2.extension = a2.slice(o3.length, a2.length)), n2;
          }
          return n2.locale = r3(), n2;
        }(Array.from(e2), t2, c2) : (v = Array.from(e2), b = [], w = t2.reduce(function(e3, t3) {
          var r3 = t3.replace(s, "");
          return b.push(r3), e3[r3] = t3, e3;
        }, {}), (void 0 === S && (S = 838), E = 1 / 0, C = { matchedDesiredLocale: "", distances: {} }, b.forEach(function(e3, t3) {
          C.distances[e3] || (C.distances[e3] = {}), v.forEach(function(r3) {
            var o3, s2, l2, u3, c3, h2, f2 = (o3 = new Intl.Locale(e3).maximize(), s2 = new Intl.Locale(r3).maximize(), l2 = { language: o3.language, script: o3.script || "", region: o3.region || "" }, u3 = { language: s2.language, script: s2.script || "", region: s2.region || "" }, c3 = 0, h2 = function() {
              var e4, t4;
              if (!n) {
                var r4 = null === (t4 = null === (e4 = a.supplemental.languageMatching["written-new"][0]) || void 0 === e4 ? void 0 : e4.paradigmLocales) || void 0 === t4 ? void 0 : t4._locales.split(" "), o4 = a.supplemental.languageMatching["written-new"].slice(1, 5);
                n = { matches: a.supplemental.languageMatching["written-new"].slice(5).map(function(e5) {
                  var t5 = Object.keys(e5)[0], r5 = e5[t5];
                  return { supported: t5, desired: r5._desired, distance: +r5._distance, oneway: "true" === r5.oneway };
                }, {}), matchVariables: o4.reduce(function(e5, t5) {
                  var r5 = Object.keys(t5)[0], n2 = t5[r5];
                  return e5[r5.slice(1)] = n2._value.split("+"), e5;
                }, {}), paradigmLocales: (0, i.fX)((0, i.fX)([], r4, true), r4.map(function(e5) {
                  return new Intl.Locale(e5.replace(/_/g, "-")).maximize().toString();
                }), true) };
              }
              return n;
            }(), l2.language !== u3.language && (c3 += d({ language: o3.language, script: "", region: "" }, { language: s2.language, script: "", region: "" }, h2)), l2.script !== u3.script && (c3 += d({ language: o3.language, script: l2.script, region: "" }, { language: s2.language, script: l2.script, region: "" }, h2)), l2.region !== u3.region && (c3 += d(l2, u3, h2)), c3 + 0 + 40 * t3);
            C.distances[e3][r3] = f2, f2 < E && (E = f2, C.matchedDesiredLocale = e3, C.matchedSupportedLocale = r3);
          });
        }), E >= S && (C.matchedDesiredLocale = void 0, C.matchedSupportedLocale = void 0), C).matchedSupportedLocale && C.matchedDesiredLocale && (y = C.matchedSupportedLocale, _ = w[C.matchedDesiredLocale].slice(C.matchedDesiredLocale.length) || void 0), g2 = y ? { locale: y, extension: _ } : { locale: c2() }), null == g2 && (g2 = { locale: c2(), extension: "" });
        var p2, g2, m2, v, y, _, b, w, S, E, C, T = g2.locale, P = u2[T], x = { locale: "en", dataLocale: T };
        m2 = g2.extension ? function(e3) {
          l(e3 === e3.toLowerCase(), "Expected extension to be lowercase"), l("-u-" === e3.slice(0, 3), "Expected extension to be a Unicode locale extension");
          for (var t3, r3 = [], n2 = [], i2 = e3.length, a2 = 3; a2 < i2; ) {
            var o3 = e3.indexOf("-", a2), s2 = void 0;
            s2 = -1 === o3 ? i2 - a2 : o3 - a2;
            var u3 = e3.slice(a2, a2 + s2);
            l(s2 >= 2, "Expected a subtag to have at least 2 characters"), void 0 === t3 && 2 != s2 ? -1 === r3.indexOf(u3) && r3.push(u3) : 2 === s2 ? (t3 = { key: u3, value: "" }, void 0 === n2.find(function(e4) {
              return e4.key === (null == t3 ? void 0 : t3.key);
            }) && n2.push(t3)) : (null == t3 ? void 0 : t3.value) === "" ? t3.value = u3 : (l(void 0 !== t3, "Expected keyword to be defined"), t3.value += "-" + u3), a2 += s2 + 1;
          }
          return { attributes: r3, keywords: n2 };
        }(g2.extension).keywords : [];
        for (var R = [], A = function(e3) {
          var t3, n2, i2 = null !== (p2 = null == P ? void 0 : P[e3]) && void 0 !== p2 ? p2 : [];
          l(Array.isArray(i2), "keyLocaleData for ".concat(e3, " must be an array"));
          var a2 = i2[0];
          l(void 0 === a2 || "string" == typeof a2, "value must be a string or undefined");
          var o3 = void 0, s2 = m2.find(function(t4) {
            return t4.key === e3;
          });
          if (s2) {
            var u3 = s2.value;
            "" !== u3 ? i2.indexOf(u3) > -1 && (o3 = { key: e3, value: a2 = u3 }) : i2.indexOf("true") > -1 && (o3 = { key: e3, value: a2 = "true" });
          }
          var c3 = r2[e3];
          l(null == c3 || "string" == typeof c3, "optionsValue must be a string or undefined"), "string" == typeof c3 && (t3 = e3.toLowerCase(), n2 = c3.toLowerCase(), l(void 0 !== t3, "ukey must be defined"), "" === (c3 = n2) && (c3 = "true")), c3 !== a2 && i2.indexOf(c3) > -1 && (a2 = c3, o3 = void 0), o3 && R.push(o3), x[e3] = a2;
        }, O = 0; O < o2.length; O++)
          A(o2[O]);
        return R.length > 0 && (T = function(e3, t3, r3) {
          l(-1 === e3.indexOf("-u-"), "Expected locale to not have a Unicode locale extension");
          for (var n2 = "-u", i2 = 0; i2 < t3.length; i2++) {
            var a2 = t3[i2];
            n2 += "-".concat(a2);
          }
          for (var o3 = 0; o3 < r3.length; o3++) {
            var s2 = r3[o3], u3 = s2.key, c3 = s2.value;
            n2 += "-".concat(u3), "" !== c3 && (n2 += "-".concat(c3));
          }
          if ("-u" === n2)
            return h(e3);
          var d2 = e3.indexOf("-x-");
          return h(-1 === d2 ? e3 + n2 : e3.slice(0, d2) + n2 + e3.slice(d2));
        }(T, [], R)), x.locale = T, x;
      }
      function g(e2, t2) {
        for (var r2 = [], n2 = 0; n2 < t2.length; n2++) {
          var i2 = f(e2, t2[n2].replace(s, ""));
          i2 && r2.push(i2);
        }
        return r2;
      }
      function m(e2, t2, r2, n2) {
        return p(t2, Intl.getCanonicalLocales(e2), { localeMatcher: (null == n2 ? void 0 : n2.algorithm) || "best fit" }, [], {}, function() {
          return r2;
        }).locale;
      }
    }, 117: (e, t, r) => {
      "use strict";
      r.r(t), r.d(t, { ErrorCode: () => l, FormatError: () => er, IntlMessageFormat: () => eu, InvalidValueError: () => en, InvalidValueTypeError: () => ei, MissingValueError: () => ea, PART_TYPE: () => u, default: () => ec, formatToParts: () => es, isFormatXMLElementFn: () => eo });
      var n, i, a, o, s, l, u, c = r(2985), d = r(6927);
      function h(e2) {
        return e2.type === i.literal;
      }
      function f(e2) {
        return e2.type === i.number;
      }
      function p(e2) {
        return e2.type === i.date;
      }
      function g(e2) {
        return e2.type === i.time;
      }
      function m(e2) {
        return e2.type === i.select;
      }
      function v(e2) {
        return e2.type === i.plural;
      }
      function y(e2) {
        return e2.type === i.tag;
      }
      function _(e2) {
        return !!(e2 && "object" == typeof e2 && e2.type === a.number);
      }
      function b(e2) {
        return !!(e2 && "object" == typeof e2 && e2.type === a.dateTime);
      }
      !function(e2) {
        e2[e2.EXPECT_ARGUMENT_CLOSING_BRACE = 1] = "EXPECT_ARGUMENT_CLOSING_BRACE", e2[e2.EMPTY_ARGUMENT = 2] = "EMPTY_ARGUMENT", e2[e2.MALFORMED_ARGUMENT = 3] = "MALFORMED_ARGUMENT", e2[e2.EXPECT_ARGUMENT_TYPE = 4] = "EXPECT_ARGUMENT_TYPE", e2[e2.INVALID_ARGUMENT_TYPE = 5] = "INVALID_ARGUMENT_TYPE", e2[e2.EXPECT_ARGUMENT_STYLE = 6] = "EXPECT_ARGUMENT_STYLE", e2[e2.INVALID_NUMBER_SKELETON = 7] = "INVALID_NUMBER_SKELETON", e2[e2.INVALID_DATE_TIME_SKELETON = 8] = "INVALID_DATE_TIME_SKELETON", e2[e2.EXPECT_NUMBER_SKELETON = 9] = "EXPECT_NUMBER_SKELETON", e2[e2.EXPECT_DATE_TIME_SKELETON = 10] = "EXPECT_DATE_TIME_SKELETON", e2[e2.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE = 11] = "UNCLOSED_QUOTE_IN_ARGUMENT_STYLE", e2[e2.EXPECT_SELECT_ARGUMENT_OPTIONS = 12] = "EXPECT_SELECT_ARGUMENT_OPTIONS", e2[e2.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE = 13] = "EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE", e2[e2.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE = 14] = "INVALID_PLURAL_ARGUMENT_OFFSET_VALUE", e2[e2.EXPECT_SELECT_ARGUMENT_SELECTOR = 15] = "EXPECT_SELECT_ARGUMENT_SELECTOR", e2[e2.EXPECT_PLURAL_ARGUMENT_SELECTOR = 16] = "EXPECT_PLURAL_ARGUMENT_SELECTOR", e2[e2.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT = 17] = "EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT", e2[e2.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT = 18] = "EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT", e2[e2.INVALID_PLURAL_ARGUMENT_SELECTOR = 19] = "INVALID_PLURAL_ARGUMENT_SELECTOR", e2[e2.DUPLICATE_PLURAL_ARGUMENT_SELECTOR = 20] = "DUPLICATE_PLURAL_ARGUMENT_SELECTOR", e2[e2.DUPLICATE_SELECT_ARGUMENT_SELECTOR = 21] = "DUPLICATE_SELECT_ARGUMENT_SELECTOR", e2[e2.MISSING_OTHER_CLAUSE = 22] = "MISSING_OTHER_CLAUSE", e2[e2.INVALID_TAG = 23] = "INVALID_TAG", e2[e2.INVALID_TAG_NAME = 25] = "INVALID_TAG_NAME", e2[e2.UNMATCHED_CLOSING_TAG = 26] = "UNMATCHED_CLOSING_TAG", e2[e2.UNCLOSED_TAG = 27] = "UNCLOSED_TAG";
      }(n || (n = {})), function(e2) {
        e2[e2.literal = 0] = "literal", e2[e2.argument = 1] = "argument", e2[e2.number = 2] = "number", e2[e2.date = 3] = "date", e2[e2.time = 4] = "time", e2[e2.select = 5] = "select", e2[e2.plural = 6] = "plural", e2[e2.pound = 7] = "pound", e2[e2.tag = 8] = "tag";
      }(i || (i = {})), function(e2) {
        e2[e2.number = 0] = "number", e2[e2.dateTime = 1] = "dateTime";
      }(a || (a = {}));
      var w = /[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/, S = /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g, E = /[\t-\r \x85\u200E\u200F\u2028\u2029]/i, C = /^\.(?:(0+)(\*)?|(#+)|(0+)(#+))$/g, T = /^(@+)?(\+|#+)?[rs]?$/g, P = /(\*)(0+)|(#+)(0+)|(0+)/g, x = /^(0+)$/;
      function R(e2) {
        var t2 = {};
        return "r" === e2[e2.length - 1] ? t2.roundingPriority = "morePrecision" : "s" === e2[e2.length - 1] && (t2.roundingPriority = "lessPrecision"), e2.replace(T, function(e3, r2, n2) {
          return "string" != typeof n2 ? (t2.minimumSignificantDigits = r2.length, t2.maximumSignificantDigits = r2.length) : "+" === n2 ? t2.minimumSignificantDigits = r2.length : "#" === r2[0] ? t2.maximumSignificantDigits = r2.length : (t2.minimumSignificantDigits = r2.length, t2.maximumSignificantDigits = r2.length + ("string" == typeof n2 ? n2.length : 0)), "";
        }), t2;
      }
      function A(e2) {
        switch (e2) {
          case "sign-auto":
            return { signDisplay: "auto" };
          case "sign-accounting":
          case "()":
            return { currencySign: "accounting" };
          case "sign-always":
          case "+!":
            return { signDisplay: "always" };
          case "sign-accounting-always":
          case "()!":
            return { signDisplay: "always", currencySign: "accounting" };
          case "sign-except-zero":
          case "+?":
            return { signDisplay: "exceptZero" };
          case "sign-accounting-except-zero":
          case "()?":
            return { signDisplay: "exceptZero", currencySign: "accounting" };
          case "sign-never":
          case "+_":
            return { signDisplay: "never" };
        }
      }
      function O(e2) {
        return A(e2) || {};
      }
      var M = { "001": ["H", "h"], 419: ["h", "H", "hB", "hb"], AC: ["H", "h", "hb", "hB"], AD: ["H", "hB"], AE: ["h", "hB", "hb", "H"], AF: ["H", "hb", "hB", "h"], AG: ["h", "hb", "H", "hB"], AI: ["H", "h", "hb", "hB"], AL: ["h", "H", "hB"], AM: ["H", "hB"], AO: ["H", "hB"], AR: ["h", "H", "hB", "hb"], AS: ["h", "H"], AT: ["H", "hB"], AU: ["h", "hb", "H", "hB"], AW: ["H", "hB"], AX: ["H"], AZ: ["H", "hB", "h"], BA: ["H", "hB", "h"], BB: ["h", "hb", "H", "hB"], BD: ["h", "hB", "H"], BE: ["H", "hB"], BF: ["H", "hB"], BG: ["H", "hB", "h"], BH: ["h", "hB", "hb", "H"], BI: ["H", "h"], BJ: ["H", "hB"], BL: ["H", "hB"], BM: ["h", "hb", "H", "hB"], BN: ["hb", "hB", "h", "H"], BO: ["h", "H", "hB", "hb"], BQ: ["H"], BR: ["H", "hB"], BS: ["h", "hb", "H", "hB"], BT: ["h", "H"], BW: ["H", "h", "hb", "hB"], BY: ["H", "h"], BZ: ["H", "h", "hb", "hB"], CA: ["h", "hb", "H", "hB"], CC: ["H", "h", "hb", "hB"], CD: ["hB", "H"], CF: ["H", "h", "hB"], CG: ["H", "hB"], CH: ["H", "hB", "h"], CI: ["H", "hB"], CK: ["H", "h", "hb", "hB"], CL: ["h", "H", "hB", "hb"], CM: ["H", "h", "hB"], CN: ["H", "hB", "hb", "h"], CO: ["h", "H", "hB", "hb"], CP: ["H"], CR: ["h", "H", "hB", "hb"], CU: ["h", "H", "hB", "hb"], CV: ["H", "hB"], CW: ["H", "hB"], CX: ["H", "h", "hb", "hB"], CY: ["h", "H", "hb", "hB"], CZ: ["H"], DE: ["H", "hB"], DG: ["H", "h", "hb", "hB"], DJ: ["h", "H"], DK: ["H"], DM: ["h", "hb", "H", "hB"], DO: ["h", "H", "hB", "hb"], DZ: ["h", "hB", "hb", "H"], EA: ["H", "h", "hB", "hb"], EC: ["h", "H", "hB", "hb"], EE: ["H", "hB"], EG: ["h", "hB", "hb", "H"], EH: ["h", "hB", "hb", "H"], ER: ["h", "H"], ES: ["H", "hB", "h", "hb"], ET: ["hB", "hb", "h", "H"], FI: ["H"], FJ: ["h", "hb", "H", "hB"], FK: ["H", "h", "hb", "hB"], FM: ["h", "hb", "H", "hB"], FO: ["H", "h"], FR: ["H", "hB"], GA: ["H", "hB"], GB: ["H", "h", "hb", "hB"], GD: ["h", "hb", "H", "hB"], GE: ["H", "hB", "h"], GF: ["H", "hB"], GG: ["H", "h", "hb", "hB"], GH: ["h", "H"], GI: ["H", "h", "hb", "hB"], GL: ["H", "h"], GM: ["h", "hb", "H", "hB"], GN: ["H", "hB"], GP: ["H", "hB"], GQ: ["H", "hB", "h", "hb"], GR: ["h", "H", "hb", "hB"], GT: ["h", "H", "hB", "hb"], GU: ["h", "hb", "H", "hB"], GW: ["H", "hB"], GY: ["h", "hb", "H", "hB"], HK: ["h", "hB", "hb", "H"], HN: ["h", "H", "hB", "hb"], HR: ["H", "hB"], HU: ["H", "h"], IC: ["H", "h", "hB", "hb"], ID: ["H"], IE: ["H", "h", "hb", "hB"], IL: ["H", "hB"], IM: ["H", "h", "hb", "hB"], IN: ["h", "H"], IO: ["H", "h", "hb", "hB"], IQ: ["h", "hB", "hb", "H"], IR: ["hB", "H"], IS: ["H"], IT: ["H", "hB"], JE: ["H", "h", "hb", "hB"], JM: ["h", "hb", "H", "hB"], JO: ["h", "hB", "hb", "H"], JP: ["H", "K", "h"], KE: ["hB", "hb", "H", "h"], KG: ["H", "h", "hB", "hb"], KH: ["hB", "h", "H", "hb"], KI: ["h", "hb", "H", "hB"], KM: ["H", "h", "hB", "hb"], KN: ["h", "hb", "H", "hB"], KP: ["h", "H", "hB", "hb"], KR: ["h", "H", "hB", "hb"], KW: ["h", "hB", "hb", "H"], KY: ["h", "hb", "H", "hB"], KZ: ["H", "hB"], LA: ["H", "hb", "hB", "h"], LB: ["h", "hB", "hb", "H"], LC: ["h", "hb", "H", "hB"], LI: ["H", "hB", "h"], LK: ["H", "h", "hB", "hb"], LR: ["h", "hb", "H", "hB"], LS: ["h", "H"], LT: ["H", "h", "hb", "hB"], LU: ["H", "h", "hB"], LV: ["H", "hB", "hb", "h"], LY: ["h", "hB", "hb", "H"], MA: ["H", "h", "hB", "hb"], MC: ["H", "hB"], MD: ["H", "hB"], ME: ["H", "hB", "h"], MF: ["H", "hB"], MG: ["H", "h"], MH: ["h", "hb", "H", "hB"], MK: ["H", "h", "hb", "hB"], ML: ["H"], MM: ["hB", "hb", "H", "h"], MN: ["H", "h", "hb", "hB"], MO: ["h", "hB", "hb", "H"], MP: ["h", "hb", "H", "hB"], MQ: ["H", "hB"], MR: ["h", "hB", "hb", "H"], MS: ["H", "h", "hb", "hB"], MT: ["H", "h"], MU: ["H", "h"], MV: ["H", "h"], MW: ["h", "hb", "H", "hB"], MX: ["h", "H", "hB", "hb"], MY: ["hb", "hB", "h", "H"], MZ: ["H", "hB"], NA: ["h", "H", "hB", "hb"], NC: ["H", "hB"], NE: ["H"], NF: ["H", "h", "hb", "hB"], NG: ["H", "h", "hb", "hB"], NI: ["h", "H", "hB", "hb"], NL: ["H", "hB"], NO: ["H", "h"], NP: ["H", "h", "hB"], NR: ["H", "h", "hb", "hB"], NU: ["H", "h", "hb", "hB"], NZ: ["h", "hb", "H", "hB"], OM: ["h", "hB", "hb", "H"], PA: ["h", "H", "hB", "hb"], PE: ["h", "H", "hB", "hb"], PF: ["H", "h", "hB"], PG: ["h", "H"], PH: ["h", "hB", "hb", "H"], PK: ["h", "hB", "H"], PL: ["H", "h"], PM: ["H", "hB"], PN: ["H", "h", "hb", "hB"], PR: ["h", "H", "hB", "hb"], PS: ["h", "hB", "hb", "H"], PT: ["H", "hB"], PW: ["h", "H"], PY: ["h", "H", "hB", "hb"], QA: ["h", "hB", "hb", "H"], RE: ["H", "hB"], RO: ["H", "hB"], RS: ["H", "hB", "h"], RU: ["H"], RW: ["H", "h"], SA: ["h", "hB", "hb", "H"], SB: ["h", "hb", "H", "hB"], SC: ["H", "h", "hB"], SD: ["h", "hB", "hb", "H"], SE: ["H"], SG: ["h", "hb", "H", "hB"], SH: ["H", "h", "hb", "hB"], SI: ["H", "hB"], SJ: ["H"], SK: ["H"], SL: ["h", "hb", "H", "hB"], SM: ["H", "h", "hB"], SN: ["H", "h", "hB"], SO: ["h", "H"], SR: ["H", "hB"], SS: ["h", "hb", "H", "hB"], ST: ["H", "hB"], SV: ["h", "H", "hB", "hb"], SX: ["H", "h", "hb", "hB"], SY: ["h", "hB", "hb", "H"], SZ: ["h", "hb", "H", "hB"], TA: ["H", "h", "hb", "hB"], TC: ["h", "hb", "H", "hB"], TD: ["h", "H", "hB"], TF: ["H", "h", "hB"], TG: ["H", "hB"], TH: ["H", "h"], TJ: ["H", "h"], TL: ["H", "hB", "hb", "h"], TM: ["H", "h"], TN: ["h", "hB", "hb", "H"], TO: ["h", "H"], TR: ["H", "hB"], TT: ["h", "hb", "H", "hB"], TW: ["hB", "hb", "h", "H"], TZ: ["hB", "hb", "H", "h"], UA: ["H", "hB", "h"], UG: ["hB", "hb", "H", "h"], UM: ["h", "hb", "H", "hB"], US: ["h", "hb", "H", "hB"], UY: ["h", "H", "hB", "hb"], UZ: ["H", "hB", "h"], VA: ["H", "h", "hB"], VC: ["h", "hb", "H", "hB"], VE: ["h", "H", "hB", "hb"], VG: ["h", "hb", "H", "hB"], VI: ["h", "hb", "H", "hB"], VN: ["H", "h"], VU: ["h", "H"], WF: ["H", "hB"], WS: ["h", "H"], XK: ["H", "hB", "h"], YE: ["h", "hB", "hb", "H"], YT: ["H", "hB"], ZA: ["H", "h", "hb", "hB"], ZM: ["h", "hb", "H", "hB"], ZW: ["H", "h"], "af-ZA": ["H", "h", "hB", "hb"], "ar-001": ["h", "hB", "hb", "H"], "ca-ES": ["H", "h", "hB"], "en-001": ["h", "hb", "H", "hB"], "en-HK": ["h", "hb", "H", "hB"], "en-IL": ["H", "h", "hb", "hB"], "en-MY": ["h", "hb", "H", "hB"], "es-BR": ["H", "h", "hB", "hb"], "es-ES": ["H", "h", "hB", "hb"], "es-GQ": ["H", "h", "hB", "hb"], "fr-CA": ["H", "h", "hB"], "gl-ES": ["H", "h", "hB"], "gu-IN": ["hB", "hb", "h", "H"], "hi-IN": ["hB", "h", "H"], "it-CH": ["H", "h", "hB"], "it-IT": ["H", "h", "hB"], "kn-IN": ["hB", "h", "H"], "ml-IN": ["hB", "h", "H"], "mr-IN": ["hB", "hb", "h", "H"], "pa-IN": ["hB", "hb", "h", "H"], "ta-IN": ["hB", "h", "hb", "H"], "te-IN": ["hB", "h", "H"], "zu-ZA": ["H", "hB", "hb", "h"] }, L = new RegExp("^".concat(w.source, "*")), N = new RegExp("".concat(w.source, "*$"));
      function I(e2, t2) {
        return { start: e2, end: t2 };
      }
      var k = !!String.prototype.startsWith && "_a".startsWith("a", 1), B = !!String.fromCodePoint, D = !!Object.fromEntries, H = !!String.prototype.codePointAt, U = !!String.prototype.trimStart, j = !!String.prototype.trimEnd, q = Number.isSafeInteger ? Number.isSafeInteger : function(e2) {
        return "number" == typeof e2 && isFinite(e2) && Math.floor(e2) === e2 && 9007199254740991 >= Math.abs(e2);
      }, G = true;
      try {
        var $ = Z("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
        G = (null === (o = $.exec("a")) || void 0 === o ? void 0 : o[0]) === "a";
      } catch (e2) {
        G = false;
      }
      var F = k ? function(e2, t2, r2) {
        return e2.startsWith(t2, r2);
      } : function(e2, t2, r2) {
        return e2.slice(r2, r2 + t2.length) === t2;
      }, V = B ? String.fromCodePoint : function() {
        for (var e2, t2 = [], r2 = 0; r2 < arguments.length; r2++)
          t2[r2] = arguments[r2];
        for (var n2 = "", i2 = t2.length, a2 = 0; i2 > a2; ) {
          if ((e2 = t2[a2++]) > 1114111)
            throw RangeError(e2 + " is not a valid code point");
          n2 += e2 < 65536 ? String.fromCharCode(e2) : String.fromCharCode(((e2 -= 65536) >> 10) + 55296, e2 % 1024 + 56320);
        }
        return n2;
      }, z = D ? Object.fromEntries : function(e2) {
        for (var t2 = {}, r2 = 0; r2 < e2.length; r2++) {
          var n2 = e2[r2], i2 = n2[0], a2 = n2[1];
          t2[i2] = a2;
        }
        return t2;
      }, K = H ? function(e2, t2) {
        return e2.codePointAt(t2);
      } : function(e2, t2) {
        var r2, n2 = e2.length;
        if (!(t2 < 0) && !(t2 >= n2)) {
          var i2 = e2.charCodeAt(t2);
          return i2 < 55296 || i2 > 56319 || t2 + 1 === n2 || (r2 = e2.charCodeAt(t2 + 1)) < 56320 || r2 > 57343 ? i2 : (i2 - 55296 << 10) + (r2 - 56320) + 65536;
        }
      }, W = U ? function(e2) {
        return e2.trimStart();
      } : function(e2) {
        return e2.replace(L, "");
      }, X = j ? function(e2) {
        return e2.trimEnd();
      } : function(e2) {
        return e2.replace(N, "");
      };
      function Z(e2, t2) {
        return new RegExp(e2, t2);
      }
      if (G) {
        var Y = Z("([^\\p{White_Space}\\p{Pattern_Syntax}]*)", "yu");
        s = function(e2, t2) {
          var r2;
          return Y.lastIndex = t2, null !== (r2 = Y.exec(e2)[1]) && void 0 !== r2 ? r2 : "";
        };
      } else
        s = function(e2, t2) {
          for (var r2 = []; ; ) {
            var n2, i2 = K(e2, t2);
            if (void 0 === i2 || ee(i2) || (n2 = i2) >= 33 && n2 <= 35 || 36 === n2 || n2 >= 37 && n2 <= 39 || 40 === n2 || 41 === n2 || 42 === n2 || 43 === n2 || 44 === n2 || 45 === n2 || n2 >= 46 && n2 <= 47 || n2 >= 58 && n2 <= 59 || n2 >= 60 && n2 <= 62 || n2 >= 63 && n2 <= 64 || 91 === n2 || 92 === n2 || 93 === n2 || 94 === n2 || 96 === n2 || 123 === n2 || 124 === n2 || 125 === n2 || 126 === n2 || 161 === n2 || n2 >= 162 && n2 <= 165 || 166 === n2 || 167 === n2 || 169 === n2 || 171 === n2 || 172 === n2 || 174 === n2 || 176 === n2 || 177 === n2 || 182 === n2 || 187 === n2 || 191 === n2 || 215 === n2 || 247 === n2 || n2 >= 8208 && n2 <= 8213 || n2 >= 8214 && n2 <= 8215 || 8216 === n2 || 8217 === n2 || 8218 === n2 || n2 >= 8219 && n2 <= 8220 || 8221 === n2 || 8222 === n2 || 8223 === n2 || n2 >= 8224 && n2 <= 8231 || n2 >= 8240 && n2 <= 8248 || 8249 === n2 || 8250 === n2 || n2 >= 8251 && n2 <= 8254 || n2 >= 8257 && n2 <= 8259 || 8260 === n2 || 8261 === n2 || 8262 === n2 || n2 >= 8263 && n2 <= 8273 || 8274 === n2 || 8275 === n2 || n2 >= 8277 && n2 <= 8286 || n2 >= 8592 && n2 <= 8596 || n2 >= 8597 && n2 <= 8601 || n2 >= 8602 && n2 <= 8603 || n2 >= 8604 && n2 <= 8607 || 8608 === n2 || n2 >= 8609 && n2 <= 8610 || 8611 === n2 || n2 >= 8612 && n2 <= 8613 || 8614 === n2 || n2 >= 8615 && n2 <= 8621 || 8622 === n2 || n2 >= 8623 && n2 <= 8653 || n2 >= 8654 && n2 <= 8655 || n2 >= 8656 && n2 <= 8657 || 8658 === n2 || 8659 === n2 || 8660 === n2 || n2 >= 8661 && n2 <= 8691 || n2 >= 8692 && n2 <= 8959 || n2 >= 8960 && n2 <= 8967 || 8968 === n2 || 8969 === n2 || 8970 === n2 || 8971 === n2 || n2 >= 8972 && n2 <= 8991 || n2 >= 8992 && n2 <= 8993 || n2 >= 8994 && n2 <= 9e3 || 9001 === n2 || 9002 === n2 || n2 >= 9003 && n2 <= 9083 || 9084 === n2 || n2 >= 9085 && n2 <= 9114 || n2 >= 9115 && n2 <= 9139 || n2 >= 9140 && n2 <= 9179 || n2 >= 9180 && n2 <= 9185 || n2 >= 9186 && n2 <= 9254 || n2 >= 9255 && n2 <= 9279 || n2 >= 9280 && n2 <= 9290 || n2 >= 9291 && n2 <= 9311 || n2 >= 9472 && n2 <= 9654 || 9655 === n2 || n2 >= 9656 && n2 <= 9664 || 9665 === n2 || n2 >= 9666 && n2 <= 9719 || n2 >= 9720 && n2 <= 9727 || n2 >= 9728 && n2 <= 9838 || 9839 === n2 || n2 >= 9840 && n2 <= 10087 || 10088 === n2 || 10089 === n2 || 10090 === n2 || 10091 === n2 || 10092 === n2 || 10093 === n2 || 10094 === n2 || 10095 === n2 || 10096 === n2 || 10097 === n2 || 10098 === n2 || 10099 === n2 || 10100 === n2 || 10101 === n2 || n2 >= 10132 && n2 <= 10175 || n2 >= 10176 && n2 <= 10180 || 10181 === n2 || 10182 === n2 || n2 >= 10183 && n2 <= 10213 || 10214 === n2 || 10215 === n2 || 10216 === n2 || 10217 === n2 || 10218 === n2 || 10219 === n2 || 10220 === n2 || 10221 === n2 || 10222 === n2 || 10223 === n2 || n2 >= 10224 && n2 <= 10239 || n2 >= 10240 && n2 <= 10495 || n2 >= 10496 && n2 <= 10626 || 10627 === n2 || 10628 === n2 || 10629 === n2 || 10630 === n2 || 10631 === n2 || 10632 === n2 || 10633 === n2 || 10634 === n2 || 10635 === n2 || 10636 === n2 || 10637 === n2 || 10638 === n2 || 10639 === n2 || 10640 === n2 || 10641 === n2 || 10642 === n2 || 10643 === n2 || 10644 === n2 || 10645 === n2 || 10646 === n2 || 10647 === n2 || 10648 === n2 || n2 >= 10649 && n2 <= 10711 || 10712 === n2 || 10713 === n2 || 10714 === n2 || 10715 === n2 || n2 >= 10716 && n2 <= 10747 || 10748 === n2 || 10749 === n2 || n2 >= 10750 && n2 <= 11007 || n2 >= 11008 && n2 <= 11055 || n2 >= 11056 && n2 <= 11076 || n2 >= 11077 && n2 <= 11078 || n2 >= 11079 && n2 <= 11084 || n2 >= 11085 && n2 <= 11123 || n2 >= 11124 && n2 <= 11125 || n2 >= 11126 && n2 <= 11157 || 11158 === n2 || n2 >= 11159 && n2 <= 11263 || n2 >= 11776 && n2 <= 11777 || 11778 === n2 || 11779 === n2 || 11780 === n2 || 11781 === n2 || n2 >= 11782 && n2 <= 11784 || 11785 === n2 || 11786 === n2 || 11787 === n2 || 11788 === n2 || 11789 === n2 || n2 >= 11790 && n2 <= 11798 || 11799 === n2 || n2 >= 11800 && n2 <= 11801 || 11802 === n2 || 11803 === n2 || 11804 === n2 || 11805 === n2 || n2 >= 11806 && n2 <= 11807 || 11808 === n2 || 11809 === n2 || 11810 === n2 || 11811 === n2 || 11812 === n2 || 11813 === n2 || 11814 === n2 || 11815 === n2 || 11816 === n2 || 11817 === n2 || n2 >= 11818 && n2 <= 11822 || 11823 === n2 || n2 >= 11824 && n2 <= 11833 || n2 >= 11834 && n2 <= 11835 || n2 >= 11836 && n2 <= 11839 || 11840 === n2 || 11841 === n2 || 11842 === n2 || n2 >= 11843 && n2 <= 11855 || n2 >= 11856 && n2 <= 11857 || 11858 === n2 || n2 >= 11859 && n2 <= 11903 || n2 >= 12289 && n2 <= 12291 || 12296 === n2 || 12297 === n2 || 12298 === n2 || 12299 === n2 || 12300 === n2 || 12301 === n2 || 12302 === n2 || 12303 === n2 || 12304 === n2 || 12305 === n2 || n2 >= 12306 && n2 <= 12307 || 12308 === n2 || 12309 === n2 || 12310 === n2 || 12311 === n2 || 12312 === n2 || 12313 === n2 || 12314 === n2 || 12315 === n2 || 12316 === n2 || 12317 === n2 || n2 >= 12318 && n2 <= 12319 || 12320 === n2 || 12336 === n2 || 64830 === n2 || 64831 === n2 || n2 >= 65093 && n2 <= 65094)
              break;
            r2.push(i2), t2 += i2 >= 65536 ? 2 : 1;
          }
          return V.apply(void 0, r2);
        };
      var J = function() {
        function e2(e3, t2) {
          void 0 === t2 && (t2 = {}), this.message = e3, this.position = { offset: 0, line: 1, column: 1 }, this.ignoreTag = !!t2.ignoreTag, this.locale = t2.locale, this.requiresOtherClause = !!t2.requiresOtherClause, this.shouldParseSkeletons = !!t2.shouldParseSkeletons;
        }
        return e2.prototype.parse = function() {
          if (0 !== this.offset())
            throw Error("parser can only be used once");
          return this.parseMessage(0, "", false);
        }, e2.prototype.parseMessage = function(e3, t2, r2) {
          for (var a2 = []; !this.isEOF(); ) {
            var o2 = this.char();
            if (123 === o2) {
              var s2 = this.parseArgument(e3, r2);
              if (s2.err)
                return s2;
              a2.push(s2.val);
            } else if (125 === o2 && e3 > 0)
              break;
            else if (35 === o2 && ("plural" === t2 || "selectordinal" === t2)) {
              var l2 = this.clonePosition();
              this.bump(), a2.push({ type: i.pound, location: I(l2, this.clonePosition()) });
            } else if (60 !== o2 || this.ignoreTag || 47 !== this.peek()) {
              if (60 === o2 && !this.ignoreTag && Q(this.peek() || 0)) {
                var s2 = this.parseTag(e3, t2);
                if (s2.err)
                  return s2;
                a2.push(s2.val);
              } else {
                var s2 = this.parseLiteral(e3, t2);
                if (s2.err)
                  return s2;
                a2.push(s2.val);
              }
            } else {
              if (!r2)
                return this.error(n.UNMATCHED_CLOSING_TAG, I(this.clonePosition(), this.clonePosition()));
              break;
            }
          }
          return { val: a2, err: null };
        }, e2.prototype.parseTag = function(e3, t2) {
          var r2 = this.clonePosition();
          this.bump();
          var a2 = this.parseTagName();
          if (this.bumpSpace(), this.bumpIf("/>"))
            return { val: { type: i.literal, value: "<".concat(a2, "/>"), location: I(r2, this.clonePosition()) }, err: null };
          if (!this.bumpIf(">"))
            return this.error(n.INVALID_TAG, I(r2, this.clonePosition()));
          var o2 = this.parseMessage(e3 + 1, t2, true);
          if (o2.err)
            return o2;
          var s2 = o2.val, l2 = this.clonePosition();
          if (!this.bumpIf("</"))
            return this.error(n.UNCLOSED_TAG, I(r2, this.clonePosition()));
          if (this.isEOF() || !Q(this.char()))
            return this.error(n.INVALID_TAG, I(l2, this.clonePosition()));
          var u2 = this.clonePosition();
          return a2 !== this.parseTagName() ? this.error(n.UNMATCHED_CLOSING_TAG, I(u2, this.clonePosition())) : (this.bumpSpace(), this.bumpIf(">")) ? { val: { type: i.tag, value: a2, children: s2, location: I(r2, this.clonePosition()) }, err: null } : this.error(n.INVALID_TAG, I(l2, this.clonePosition()));
        }, e2.prototype.parseTagName = function() {
          var e3, t2 = this.offset();
          for (this.bump(); !this.isEOF() && (45 === (e3 = this.char()) || 46 === e3 || e3 >= 48 && e3 <= 57 || 95 === e3 || e3 >= 97 && e3 <= 122 || e3 >= 65 && e3 <= 90 || 183 == e3 || e3 >= 192 && e3 <= 214 || e3 >= 216 && e3 <= 246 || e3 >= 248 && e3 <= 893 || e3 >= 895 && e3 <= 8191 || e3 >= 8204 && e3 <= 8205 || e3 >= 8255 && e3 <= 8256 || e3 >= 8304 && e3 <= 8591 || e3 >= 11264 && e3 <= 12271 || e3 >= 12289 && e3 <= 55295 || e3 >= 63744 && e3 <= 64975 || e3 >= 65008 && e3 <= 65533 || e3 >= 65536 && e3 <= 983039); )
            this.bump();
          return this.message.slice(t2, this.offset());
        }, e2.prototype.parseLiteral = function(e3, t2) {
          for (var r2 = this.clonePosition(), n2 = ""; ; ) {
            var a2 = this.tryParseQuote(t2);
            if (a2) {
              n2 += a2;
              continue;
            }
            var o2 = this.tryParseUnquoted(e3, t2);
            if (o2) {
              n2 += o2;
              continue;
            }
            var s2 = this.tryParseLeftAngleBracket();
            if (s2) {
              n2 += s2;
              continue;
            }
            break;
          }
          var l2 = I(r2, this.clonePosition());
          return { val: { type: i.literal, value: n2, location: l2 }, err: null };
        }, e2.prototype.tryParseLeftAngleBracket = function() {
          var e3;
          return this.isEOF() || 60 !== this.char() || !this.ignoreTag && (Q(e3 = this.peek() || 0) || 47 === e3) ? null : (this.bump(), "<");
        }, e2.prototype.tryParseQuote = function(e3) {
          if (this.isEOF() || 39 !== this.char())
            return null;
          switch (this.peek()) {
            case 39:
              return this.bump(), this.bump(), "'";
            case 123:
            case 60:
            case 62:
            case 125:
              break;
            case 35:
              if ("plural" === e3 || "selectordinal" === e3)
                break;
              return null;
            default:
              return null;
          }
          this.bump();
          var t2 = [this.char()];
          for (this.bump(); !this.isEOF(); ) {
            var r2 = this.char();
            if (39 === r2) {
              if (39 === this.peek())
                t2.push(39), this.bump();
              else {
                this.bump();
                break;
              }
            } else
              t2.push(r2);
            this.bump();
          }
          return V.apply(void 0, t2);
        }, e2.prototype.tryParseUnquoted = function(e3, t2) {
          if (this.isEOF())
            return null;
          var r2 = this.char();
          return 60 === r2 || 123 === r2 || 35 === r2 && ("plural" === t2 || "selectordinal" === t2) || 125 === r2 && e3 > 0 ? null : (this.bump(), V(r2));
        }, e2.prototype.parseArgument = function(e3, t2) {
          var r2 = this.clonePosition();
          if (this.bump(), this.bumpSpace(), this.isEOF())
            return this.error(n.EXPECT_ARGUMENT_CLOSING_BRACE, I(r2, this.clonePosition()));
          if (125 === this.char())
            return this.bump(), this.error(n.EMPTY_ARGUMENT, I(r2, this.clonePosition()));
          var a2 = this.parseIdentifierIfPossible().value;
          if (!a2)
            return this.error(n.MALFORMED_ARGUMENT, I(r2, this.clonePosition()));
          if (this.bumpSpace(), this.isEOF())
            return this.error(n.EXPECT_ARGUMENT_CLOSING_BRACE, I(r2, this.clonePosition()));
          switch (this.char()) {
            case 125:
              return this.bump(), { val: { type: i.argument, value: a2, location: I(r2, this.clonePosition()) }, err: null };
            case 44:
              if (this.bump(), this.bumpSpace(), this.isEOF())
                return this.error(n.EXPECT_ARGUMENT_CLOSING_BRACE, I(r2, this.clonePosition()));
              return this.parseArgumentOptions(e3, t2, a2, r2);
            default:
              return this.error(n.MALFORMED_ARGUMENT, I(r2, this.clonePosition()));
          }
        }, e2.prototype.parseIdentifierIfPossible = function() {
          var e3 = this.clonePosition(), t2 = this.offset(), r2 = s(this.message, t2), n2 = t2 + r2.length;
          return this.bumpTo(n2), { value: r2, location: I(e3, this.clonePosition()) };
        }, e2.prototype.parseArgumentOptions = function(e3, t2, r2, o2) {
          var s2, l2 = this.clonePosition(), u2 = this.parseIdentifierIfPossible().value, d2 = this.clonePosition();
          switch (u2) {
            case "":
              return this.error(n.EXPECT_ARGUMENT_TYPE, I(l2, d2));
            case "number":
            case "date":
            case "time":
              this.bumpSpace();
              var h2 = null;
              if (this.bumpIf(",")) {
                this.bumpSpace();
                var f2 = this.clonePosition(), p2 = this.parseSimpleArgStyleIfPossible();
                if (p2.err)
                  return p2;
                var g2 = X(p2.val);
                if (0 === g2.length)
                  return this.error(n.EXPECT_ARGUMENT_STYLE, I(this.clonePosition(), this.clonePosition()));
                h2 = { style: g2, styleLocation: I(f2, this.clonePosition()) };
              }
              var m2 = this.tryParseArgumentClose(o2);
              if (m2.err)
                return m2;
              var v2 = I(o2, this.clonePosition());
              if (h2 && F(null == h2 ? void 0 : h2.style, "::", 0)) {
                var y2, _2 = W(h2.style.slice(2));
                if ("number" === u2) {
                  var p2 = this.parseNumberSkeletonFromString(_2, h2.styleLocation);
                  if (p2.err)
                    return p2;
                  return { val: { type: i.number, value: r2, location: v2, style: p2.val }, err: null };
                }
                if (0 === _2.length)
                  return this.error(n.EXPECT_DATE_TIME_SKELETON, v2);
                var b2 = _2;
                this.locale && (b2 = function(e4, t3) {
                  for (var r3 = "", n2 = 0; n2 < e4.length; n2++) {
                    var i2 = e4.charAt(n2);
                    if ("j" === i2) {
                      for (var a2 = 0; n2 + 1 < e4.length && e4.charAt(n2 + 1) === i2; )
                        a2++, n2++;
                      var o3 = 1 + (1 & a2), s3 = a2 < 2 ? 1 : 3 + (a2 >> 1), l3 = function(e5) {
                        var t4, r4 = e5.hourCycle;
                        if (void 0 === r4 && e5.hourCycles && e5.hourCycles.length && (r4 = e5.hourCycles[0]), r4)
                          switch (r4) {
                            case "h24":
                              return "k";
                            case "h23":
                              return "H";
                            case "h12":
                              return "h";
                            case "h11":
                              return "K";
                            default:
                              throw Error("Invalid hourCycle");
                          }
                        var n3 = e5.language;
                        return "root" !== n3 && (t4 = e5.maximize().region), (M[t4 || ""] || M[n3 || ""] || M["".concat(n3, "-001")] || M["001"])[0];
                      }(t3);
                      for (("H" == l3 || "k" == l3) && (s3 = 0); s3-- > 0; )
                        r3 += "a";
                      for (; o3-- > 0; )
                        r3 = l3 + r3;
                    } else
                      "J" === i2 ? r3 += "H" : r3 += i2;
                  }
                  return r3;
                }(_2, this.locale));
                var g2 = { type: a.dateTime, pattern: b2, location: h2.styleLocation, parsedOptions: this.shouldParseSkeletons ? (y2 = {}, b2.replace(S, function(e4) {
                  var t3 = e4.length;
                  switch (e4[0]) {
                    case "G":
                      y2.era = 4 === t3 ? "long" : 5 === t3 ? "narrow" : "short";
                      break;
                    case "y":
                      y2.year = 2 === t3 ? "2-digit" : "numeric";
                      break;
                    case "Y":
                    case "u":
                    case "U":
                    case "r":
                      throw RangeError("`Y/u/U/r` (year) patterns are not supported, use `y` instead");
                    case "q":
                    case "Q":
                      throw RangeError("`q/Q` (quarter) patterns are not supported");
                    case "M":
                    case "L":
                      y2.month = ["numeric", "2-digit", "short", "long", "narrow"][t3 - 1];
                      break;
                    case "w":
                    case "W":
                      throw RangeError("`w/W` (week) patterns are not supported");
                    case "d":
                      y2.day = ["numeric", "2-digit"][t3 - 1];
                      break;
                    case "D":
                    case "F":
                    case "g":
                      throw RangeError("`D/F/g` (day) patterns are not supported, use `d` instead");
                    case "E":
                      y2.weekday = 4 === t3 ? "long" : 5 === t3 ? "narrow" : "short";
                      break;
                    case "e":
                      if (t3 < 4)
                        throw RangeError("`e..eee` (weekday) patterns are not supported");
                      y2.weekday = ["short", "long", "narrow", "short"][t3 - 4];
                      break;
                    case "c":
                      if (t3 < 4)
                        throw RangeError("`c..ccc` (weekday) patterns are not supported");
                      y2.weekday = ["short", "long", "narrow", "short"][t3 - 4];
                      break;
                    case "a":
                      y2.hour12 = true;
                      break;
                    case "b":
                    case "B":
                      throw RangeError("`b/B` (period) patterns are not supported, use `a` instead");
                    case "h":
                      y2.hourCycle = "h12", y2.hour = ["numeric", "2-digit"][t3 - 1];
                      break;
                    case "H":
                      y2.hourCycle = "h23", y2.hour = ["numeric", "2-digit"][t3 - 1];
                      break;
                    case "K":
                      y2.hourCycle = "h11", y2.hour = ["numeric", "2-digit"][t3 - 1];
                      break;
                    case "k":
                      y2.hourCycle = "h24", y2.hour = ["numeric", "2-digit"][t3 - 1];
                      break;
                    case "j":
                    case "J":
                    case "C":
                      throw RangeError("`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead");
                    case "m":
                      y2.minute = ["numeric", "2-digit"][t3 - 1];
                      break;
                    case "s":
                      y2.second = ["numeric", "2-digit"][t3 - 1];
                      break;
                    case "S":
                    case "A":
                      throw RangeError("`S/A` (second) patterns are not supported, use `s` instead");
                    case "z":
                      y2.timeZoneName = t3 < 4 ? "short" : "long";
                      break;
                    case "Z":
                    case "O":
                    case "v":
                    case "V":
                    case "X":
                    case "x":
                      throw RangeError("`Z/O/v/V/X/x` (timeZone) patterns are not supported, use `z` instead");
                  }
                  return "";
                }), y2) : {} };
                return { val: { type: "date" === u2 ? i.date : i.time, value: r2, location: v2, style: g2 }, err: null };
              }
              return { val: { type: "number" === u2 ? i.number : "date" === u2 ? i.date : i.time, value: r2, location: v2, style: null !== (s2 = null == h2 ? void 0 : h2.style) && void 0 !== s2 ? s2 : null }, err: null };
            case "plural":
            case "selectordinal":
            case "select":
              var w2 = this.clonePosition();
              if (this.bumpSpace(), !this.bumpIf(","))
                return this.error(n.EXPECT_SELECT_ARGUMENT_OPTIONS, I(w2, (0, c.Cl)({}, w2)));
              this.bumpSpace();
              var E2 = this.parseIdentifierIfPossible(), C2 = 0;
              if ("select" !== u2 && "offset" === E2.value) {
                if (!this.bumpIf(":"))
                  return this.error(n.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, I(this.clonePosition(), this.clonePosition()));
                this.bumpSpace();
                var p2 = this.tryParseDecimalInteger(n.EXPECT_PLURAL_ARGUMENT_OFFSET_VALUE, n.INVALID_PLURAL_ARGUMENT_OFFSET_VALUE);
                if (p2.err)
                  return p2;
                this.bumpSpace(), E2 = this.parseIdentifierIfPossible(), C2 = p2.val;
              }
              var T2 = this.tryParsePluralOrSelectOptions(e3, u2, t2, E2);
              if (T2.err)
                return T2;
              var m2 = this.tryParseArgumentClose(o2);
              if (m2.err)
                return m2;
              var P2 = I(o2, this.clonePosition());
              if ("select" === u2)
                return { val: { type: i.select, value: r2, options: z(T2.val), location: P2 }, err: null };
              return { val: { type: i.plural, value: r2, options: z(T2.val), offset: C2, pluralType: "plural" === u2 ? "cardinal" : "ordinal", location: P2 }, err: null };
            default:
              return this.error(n.INVALID_ARGUMENT_TYPE, I(l2, d2));
          }
        }, e2.prototype.tryParseArgumentClose = function(e3) {
          return this.isEOF() || 125 !== this.char() ? this.error(n.EXPECT_ARGUMENT_CLOSING_BRACE, I(e3, this.clonePosition())) : (this.bump(), { val: true, err: null });
        }, e2.prototype.parseSimpleArgStyleIfPossible = function() {
          for (var e3 = 0, t2 = this.clonePosition(); !this.isEOF(); )
            switch (this.char()) {
              case 39:
                this.bump();
                var r2 = this.clonePosition();
                if (!this.bumpUntil("'"))
                  return this.error(n.UNCLOSED_QUOTE_IN_ARGUMENT_STYLE, I(r2, this.clonePosition()));
                this.bump();
                break;
              case 123:
                e3 += 1, this.bump();
                break;
              case 125:
                if (!(e3 > 0))
                  return { val: this.message.slice(t2.offset, this.offset()), err: null };
                e3 -= 1;
                break;
              default:
                this.bump();
            }
          return { val: this.message.slice(t2.offset, this.offset()), err: null };
        }, e2.prototype.parseNumberSkeletonFromString = function(e3, t2) {
          var r2 = [];
          try {
            r2 = function(e4) {
              if (0 === e4.length)
                throw Error("Number skeleton cannot be empty");
              for (var t3 = e4.split(E).filter(function(e5) {
                return e5.length > 0;
              }), r3 = [], n2 = 0; n2 < t3.length; n2++) {
                var i2 = t3[n2].split("/");
                if (0 === i2.length)
                  throw Error("Invalid number skeleton");
                for (var a2 = i2[0], o2 = i2.slice(1), s2 = 0; s2 < o2.length; s2++)
                  if (0 === o2[s2].length)
                    throw Error("Invalid number skeleton");
                r3.push({ stem: a2, options: o2 });
              }
              return r3;
            }(e3);
          } catch (e4) {
            return this.error(n.INVALID_NUMBER_SKELETON, t2);
          }
          return { val: { type: a.number, tokens: r2, location: t2, parsedOptions: this.shouldParseSkeletons ? function(e4) {
            for (var t3 = {}, r3 = 0; r3 < e4.length; r3++) {
              var n2 = e4[r3];
              switch (n2.stem) {
                case "percent":
                case "%":
                  t3.style = "percent";
                  continue;
                case "%x100":
                  t3.style = "percent", t3.scale = 100;
                  continue;
                case "currency":
                  t3.style = "currency", t3.currency = n2.options[0];
                  continue;
                case "group-off":
                case ",_":
                  t3.useGrouping = false;
                  continue;
                case "precision-integer":
                case ".":
                  t3.maximumFractionDigits = 0;
                  continue;
                case "measure-unit":
                case "unit":
                  t3.style = "unit", t3.unit = n2.options[0].replace(/^(.*?)-/, "");
                  continue;
                case "compact-short":
                case "K":
                  t3.notation = "compact", t3.compactDisplay = "short";
                  continue;
                case "compact-long":
                case "KK":
                  t3.notation = "compact", t3.compactDisplay = "long";
                  continue;
                case "scientific":
                  t3 = (0, c.Cl)((0, c.Cl)((0, c.Cl)({}, t3), { notation: "scientific" }), n2.options.reduce(function(e5, t4) {
                    return (0, c.Cl)((0, c.Cl)({}, e5), A(t4) || {});
                  }, {}));
                  continue;
                case "engineering":
                  t3 = (0, c.Cl)((0, c.Cl)((0, c.Cl)({}, t3), { notation: "engineering" }), n2.options.reduce(function(e5, t4) {
                    return (0, c.Cl)((0, c.Cl)({}, e5), A(t4) || {});
                  }, {}));
                  continue;
                case "notation-simple":
                  t3.notation = "standard";
                  continue;
                case "unit-width-narrow":
                  t3.currencyDisplay = "narrowSymbol", t3.unitDisplay = "narrow";
                  continue;
                case "unit-width-short":
                  t3.currencyDisplay = "code", t3.unitDisplay = "short";
                  continue;
                case "unit-width-full-name":
                  t3.currencyDisplay = "name", t3.unitDisplay = "long";
                  continue;
                case "unit-width-iso-code":
                  t3.currencyDisplay = "symbol";
                  continue;
                case "scale":
                  t3.scale = parseFloat(n2.options[0]);
                  continue;
                case "rounding-mode-floor":
                  t3.roundingMode = "floor";
                  continue;
                case "rounding-mode-ceiling":
                  t3.roundingMode = "ceil";
                  continue;
                case "rounding-mode-down":
                  t3.roundingMode = "trunc";
                  continue;
                case "rounding-mode-up":
                  t3.roundingMode = "expand";
                  continue;
                case "rounding-mode-half-even":
                  t3.roundingMode = "halfEven";
                  continue;
                case "rounding-mode-half-down":
                  t3.roundingMode = "halfTrunc";
                  continue;
                case "rounding-mode-half-up":
                  t3.roundingMode = "halfExpand";
                  continue;
                case "integer-width":
                  if (n2.options.length > 1)
                    throw RangeError("integer-width stems only accept a single optional option");
                  n2.options[0].replace(P, function(e5, r4, n3, i3, a3, o3) {
                    if (r4)
                      t3.minimumIntegerDigits = n3.length;
                    else if (i3 && a3)
                      throw Error("We currently do not support maximum integer digits");
                    else if (o3)
                      throw Error("We currently do not support exact integer digits");
                    return "";
                  });
                  continue;
              }
              if (x.test(n2.stem)) {
                t3.minimumIntegerDigits = n2.stem.length;
                continue;
              }
              if (C.test(n2.stem)) {
                if (n2.options.length > 1)
                  throw RangeError("Fraction-precision stems only accept a single optional option");
                n2.stem.replace(C, function(e5, r4, n3, i3, a3, o3) {
                  return "*" === n3 ? t3.minimumFractionDigits = r4.length : i3 && "#" === i3[0] ? t3.maximumFractionDigits = i3.length : a3 && o3 ? (t3.minimumFractionDigits = a3.length, t3.maximumFractionDigits = a3.length + o3.length) : (t3.minimumFractionDigits = r4.length, t3.maximumFractionDigits = r4.length), "";
                });
                var i2 = n2.options[0];
                "w" === i2 ? t3 = (0, c.Cl)((0, c.Cl)({}, t3), { trailingZeroDisplay: "stripIfInteger" }) : i2 && (t3 = (0, c.Cl)((0, c.Cl)({}, t3), R(i2)));
                continue;
              }
              if (T.test(n2.stem)) {
                t3 = (0, c.Cl)((0, c.Cl)({}, t3), R(n2.stem));
                continue;
              }
              var a2 = A(n2.stem);
              a2 && (t3 = (0, c.Cl)((0, c.Cl)({}, t3), a2));
              var o2 = function(e5) {
                var t4;
                if ("E" === e5[0] && "E" === e5[1] ? (t4 = { notation: "engineering" }, e5 = e5.slice(2)) : "E" === e5[0] && (t4 = { notation: "scientific" }, e5 = e5.slice(1)), t4) {
                  var r4 = e5.slice(0, 2);
                  if ("+!" === r4 ? (t4.signDisplay = "always", e5 = e5.slice(2)) : "+?" === r4 && (t4.signDisplay = "exceptZero", e5 = e5.slice(2)), !x.test(e5))
                    throw Error("Malformed concise eng/scientific notation");
                  t4.minimumIntegerDigits = e5.length;
                }
                return t4;
              }(n2.stem);
              o2 && (t3 = (0, c.Cl)((0, c.Cl)({}, t3), o2));
            }
            return t3;
          }(r2) : {} }, err: null };
        }, e2.prototype.tryParsePluralOrSelectOptions = function(e3, t2, r2, i2) {
          for (var a2, o2 = false, s2 = [], l2 = /* @__PURE__ */ new Set(), u2 = i2.value, c2 = i2.location; ; ) {
            if (0 === u2.length) {
              var d2 = this.clonePosition();
              if ("select" !== t2 && this.bumpIf("=")) {
                var h2 = this.tryParseDecimalInteger(n.EXPECT_PLURAL_ARGUMENT_SELECTOR, n.INVALID_PLURAL_ARGUMENT_SELECTOR);
                if (h2.err)
                  return h2;
                c2 = I(d2, this.clonePosition()), u2 = this.message.slice(d2.offset, this.offset());
              } else
                break;
            }
            if (l2.has(u2))
              return this.error("select" === t2 ? n.DUPLICATE_SELECT_ARGUMENT_SELECTOR : n.DUPLICATE_PLURAL_ARGUMENT_SELECTOR, c2);
            "other" === u2 && (o2 = true), this.bumpSpace();
            var f2 = this.clonePosition();
            if (!this.bumpIf("{"))
              return this.error("select" === t2 ? n.EXPECT_SELECT_ARGUMENT_SELECTOR_FRAGMENT : n.EXPECT_PLURAL_ARGUMENT_SELECTOR_FRAGMENT, I(this.clonePosition(), this.clonePosition()));
            var p2 = this.parseMessage(e3 + 1, t2, r2);
            if (p2.err)
              return p2;
            var g2 = this.tryParseArgumentClose(f2);
            if (g2.err)
              return g2;
            s2.push([u2, { value: p2.val, location: I(f2, this.clonePosition()) }]), l2.add(u2), this.bumpSpace(), u2 = (a2 = this.parseIdentifierIfPossible()).value, c2 = a2.location;
          }
          return 0 === s2.length ? this.error("select" === t2 ? n.EXPECT_SELECT_ARGUMENT_SELECTOR : n.EXPECT_PLURAL_ARGUMENT_SELECTOR, I(this.clonePosition(), this.clonePosition())) : this.requiresOtherClause && !o2 ? this.error(n.MISSING_OTHER_CLAUSE, I(this.clonePosition(), this.clonePosition())) : { val: s2, err: null };
        }, e2.prototype.tryParseDecimalInteger = function(e3, t2) {
          var r2 = 1, n2 = this.clonePosition();
          this.bumpIf("+") || this.bumpIf("-") && (r2 = -1);
          for (var i2 = false, a2 = 0; !this.isEOF(); ) {
            var o2 = this.char();
            if (o2 >= 48 && o2 <= 57)
              i2 = true, a2 = 10 * a2 + (o2 - 48), this.bump();
            else
              break;
          }
          var s2 = I(n2, this.clonePosition());
          return i2 ? q(a2 *= r2) ? { val: a2, err: null } : this.error(t2, s2) : this.error(e3, s2);
        }, e2.prototype.offset = function() {
          return this.position.offset;
        }, e2.prototype.isEOF = function() {
          return this.offset() === this.message.length;
        }, e2.prototype.clonePosition = function() {
          return { offset: this.position.offset, line: this.position.line, column: this.position.column };
        }, e2.prototype.char = function() {
          var e3 = this.position.offset;
          if (e3 >= this.message.length)
            throw Error("out of bound");
          var t2 = K(this.message, e3);
          if (void 0 === t2)
            throw Error("Offset ".concat(e3, " is at invalid UTF-16 code unit boundary"));
          return t2;
        }, e2.prototype.error = function(e3, t2) {
          return { val: null, err: { kind: e3, message: this.message, location: t2 } };
        }, e2.prototype.bump = function() {
          if (!this.isEOF()) {
            var e3 = this.char();
            10 === e3 ? (this.position.line += 1, this.position.column = 1, this.position.offset += 1) : (this.position.column += 1, this.position.offset += e3 < 65536 ? 1 : 2);
          }
        }, e2.prototype.bumpIf = function(e3) {
          if (F(this.message, e3, this.offset())) {
            for (var t2 = 0; t2 < e3.length; t2++)
              this.bump();
            return true;
          }
          return false;
        }, e2.prototype.bumpUntil = function(e3) {
          var t2 = this.offset(), r2 = this.message.indexOf(e3, t2);
          return r2 >= 0 ? (this.bumpTo(r2), true) : (this.bumpTo(this.message.length), false);
        }, e2.prototype.bumpTo = function(e3) {
          if (this.offset() > e3)
            throw Error("targetOffset ".concat(e3, " must be greater than or equal to the current offset ").concat(this.offset()));
          for (e3 = Math.min(e3, this.message.length); ; ) {
            var t2 = this.offset();
            if (t2 === e3)
              break;
            if (t2 > e3)
              throw Error("targetOffset ".concat(e3, " is at invalid UTF-16 code unit boundary"));
            if (this.bump(), this.isEOF())
              break;
          }
        }, e2.prototype.bumpSpace = function() {
          for (; !this.isEOF() && ee(this.char()); )
            this.bump();
        }, e2.prototype.peek = function() {
          if (this.isEOF())
            return null;
          var e3 = this.char(), t2 = this.offset(), r2 = this.message.charCodeAt(t2 + (e3 >= 65536 ? 2 : 1));
          return null != r2 ? r2 : null;
        }, e2;
      }();
      function Q(e2) {
        return e2 >= 97 && e2 <= 122 || e2 >= 65 && e2 <= 90;
      }
      function ee(e2) {
        return e2 >= 9 && e2 <= 13 || 32 === e2 || 133 === e2 || e2 >= 8206 && e2 <= 8207 || 8232 === e2 || 8233 === e2;
      }
      function et(e2, t2) {
        void 0 === t2 && (t2 = {});
        var r2 = new J(e2, t2 = (0, c.Cl)({ shouldParseSkeletons: true, requiresOtherClause: true }, t2)).parse();
        if (r2.err) {
          var i2 = SyntaxError(n[r2.err.kind]);
          throw i2.location = r2.err.location, i2.originalMessage = r2.err.message, i2;
        }
        return (null == t2 ? void 0 : t2.captureLocation) || function e3(t3) {
          t3.forEach(function(t4) {
            if (delete t4.location, m(t4) || v(t4))
              for (var r3 in t4.options)
                delete t4.options[r3].location, e3(t4.options[r3].value);
            else
              f(t4) && _(t4.style) ? delete t4.style.location : (p(t4) || g(t4)) && b(t4.style) ? delete t4.style.location : y(t4) && e3(t4.children);
          });
        }(r2.val), r2.val;
      }
      !function(e2) {
        e2.MISSING_VALUE = "MISSING_VALUE", e2.INVALID_VALUE = "INVALID_VALUE", e2.MISSING_INTL_API = "MISSING_INTL_API";
      }(l || (l = {}));
      var er = function(e2) {
        function t2(t3, r2, n2) {
          var i2 = e2.call(this, t3) || this;
          return i2.code = r2, i2.originalMessage = n2, i2;
        }
        return (0, c.C6)(t2, e2), t2.prototype.toString = function() {
          return "[formatjs Error: ".concat(this.code, "] ").concat(this.message);
        }, t2;
      }(Error), en = function(e2) {
        function t2(t3, r2, n2, i2) {
          return e2.call(this, 'Invalid values for "'.concat(t3, '": "').concat(r2, '". Options are "').concat(Object.keys(n2).join('", "'), '"'), l.INVALID_VALUE, i2) || this;
        }
        return (0, c.C6)(t2, e2), t2;
      }(er), ei = function(e2) {
        function t2(t3, r2, n2) {
          return e2.call(this, 'Value for "'.concat(t3, '" must be of type ').concat(r2), l.INVALID_VALUE, n2) || this;
        }
        return (0, c.C6)(t2, e2), t2;
      }(er), ea = function(e2) {
        function t2(t3, r2) {
          return e2.call(this, 'The intl string context variable "'.concat(t3, '" was not provided to the string "').concat(r2, '"'), l.MISSING_VALUE, r2) || this;
        }
        return (0, c.C6)(t2, e2), t2;
      }(er);
      function eo(e2) {
        return "function" == typeof e2;
      }
      function es(e2, t2, r2, n2, a2, o2, s2) {
        if (1 === e2.length && h(e2[0]))
          return [{ type: u.literal, value: e2[0].value }];
        for (var c2 = [], d2 = 0; d2 < e2.length; d2++) {
          var w2 = e2[d2];
          if (h(w2)) {
            c2.push({ type: u.literal, value: w2.value });
            continue;
          }
          if (w2.type === i.pound) {
            "number" == typeof o2 && c2.push({ type: u.literal, value: r2.getNumberFormat(t2).format(o2) });
            continue;
          }
          var S2 = w2.value;
          if (!(a2 && S2 in a2))
            throw new ea(S2, s2);
          var E2 = a2[S2];
          if (w2.type === i.argument) {
            E2 && "string" != typeof E2 && "number" != typeof E2 || (E2 = "string" == typeof E2 || "number" == typeof E2 ? String(E2) : ""), c2.push({ type: "string" == typeof E2 ? u.literal : u.object, value: E2 });
            continue;
          }
          if (p(w2)) {
            var C2 = "string" == typeof w2.style ? n2.date[w2.style] : b(w2.style) ? w2.style.parsedOptions : void 0;
            c2.push({ type: u.literal, value: r2.getDateTimeFormat(t2, C2).format(E2) });
            continue;
          }
          if (g(w2)) {
            var C2 = "string" == typeof w2.style ? n2.time[w2.style] : b(w2.style) ? w2.style.parsedOptions : n2.time.medium;
            c2.push({ type: u.literal, value: r2.getDateTimeFormat(t2, C2).format(E2) });
            continue;
          }
          if (f(w2)) {
            var C2 = "string" == typeof w2.style ? n2.number[w2.style] : _(w2.style) ? w2.style.parsedOptions : void 0;
            C2 && C2.scale && (E2 *= C2.scale || 1), c2.push({ type: u.literal, value: r2.getNumberFormat(t2, C2).format(E2) });
            continue;
          }
          if (y(w2)) {
            var T2 = w2.children, P2 = w2.value, x2 = a2[P2];
            if (!eo(x2))
              throw new ei(P2, "function", s2);
            var R2 = x2(es(T2, t2, r2, n2, a2, o2).map(function(e3) {
              return e3.value;
            }));
            Array.isArray(R2) || (R2 = [R2]), c2.push.apply(c2, R2.map(function(e3) {
              return { type: "string" == typeof e3 ? u.literal : u.object, value: e3 };
            }));
          }
          if (m(w2)) {
            var A2 = w2.options[E2] || w2.options.other;
            if (!A2)
              throw new en(w2.value, E2, Object.keys(w2.options), s2);
            c2.push.apply(c2, es(A2.value, t2, r2, n2, a2));
            continue;
          }
          if (v(w2)) {
            var A2 = w2.options["=".concat(E2)];
            if (!A2) {
              if (!Intl.PluralRules)
                throw new er('Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n', l.MISSING_INTL_API, s2);
              var O2 = r2.getPluralRules(t2, { type: w2.pluralType }).select(E2 - (w2.offset || 0));
              A2 = w2.options[O2] || w2.options.other;
            }
            if (!A2)
              throw new en(w2.value, E2, Object.keys(w2.options), s2);
            c2.push.apply(c2, es(A2.value, t2, r2, n2, a2, E2 - (w2.offset || 0)));
            continue;
          }
        }
        return c2.length < 2 ? c2 : c2.reduce(function(e3, t3) {
          var r3 = e3[e3.length - 1];
          return r3 && r3.type === u.literal && t3.type === u.literal ? r3.value += t3.value : e3.push(t3), e3;
        }, []);
      }
      function el(e2) {
        return { create: function() {
          return { get: function(t2) {
            return e2[t2];
          }, set: function(t2, r2) {
            e2[t2] = r2;
          } };
        } };
      }
      !function(e2) {
        e2[e2.literal = 0] = "literal", e2[e2.object = 1] = "object";
      }(u || (u = {}));
      var eu = function() {
        function e2(t2, r2, n2, i2) {
          void 0 === r2 && (r2 = e2.defaultLocale);
          var a2, o2, s2 = this;
          if (this.formatterCache = { number: {}, dateTime: {}, pluralRules: {} }, this.format = function(e3) {
            var t3 = s2.formatToParts(e3);
            if (1 === t3.length)
              return t3[0].value;
            var r3 = t3.reduce(function(e4, t4) {
              return e4.length && t4.type === u.literal && "string" == typeof e4[e4.length - 1] ? e4[e4.length - 1] += t4.value : e4.push(t4.value), e4;
            }, []);
            return r3.length <= 1 ? r3[0] || "" : r3;
          }, this.formatToParts = function(e3) {
            return es(s2.ast, s2.locales, s2.formatters, s2.formats, e3, void 0, s2.message);
          }, this.resolvedOptions = function() {
            var e3;
            return { locale: (null === (e3 = s2.resolvedLocale) || void 0 === e3 ? void 0 : e3.toString()) || Intl.NumberFormat.supportedLocalesOf(s2.locales)[0] };
          }, this.getAst = function() {
            return s2.ast;
          }, this.locales = r2, this.resolvedLocale = e2.resolveLocale(r2), "string" == typeof t2) {
            if (this.message = t2, !e2.__parse)
              throw TypeError("IntlMessageFormat.__parse must be set to process `message` of type `string`");
            var l2 = i2 || {}, h2 = (l2.formatters, (0, c.Tt)(l2, ["formatters"]));
            this.ast = e2.__parse(t2, (0, c.Cl)((0, c.Cl)({}, h2), { locale: this.resolvedLocale }));
          } else
            this.ast = t2;
          if (!Array.isArray(this.ast))
            throw TypeError("A message must be provided as a String or AST.");
          this.formats = (a2 = e2.formats, n2 ? Object.keys(a2).reduce(function(e3, t3) {
            var r3, i3;
            return e3[t3] = (r3 = a2[t3], (i3 = n2[t3]) ? (0, c.Cl)((0, c.Cl)((0, c.Cl)({}, r3 || {}), i3 || {}), Object.keys(r3).reduce(function(e4, t4) {
              return e4[t4] = (0, c.Cl)((0, c.Cl)({}, r3[t4]), i3[t4] || {}), e4;
            }, {})) : r3), e3;
          }, (0, c.Cl)({}, a2)) : a2), this.formatters = i2 && i2.formatters || (void 0 === (o2 = this.formatterCache) && (o2 = { number: {}, dateTime: {}, pluralRules: {} }), { getNumberFormat: (0, d.memoize)(function() {
            for (var e3, t3 = [], r3 = 0; r3 < arguments.length; r3++)
              t3[r3] = arguments[r3];
            return new ((e3 = Intl.NumberFormat).bind.apply(e3, (0, c.fX)([void 0], t3, false)))();
          }, { cache: el(o2.number), strategy: d.strategies.variadic }), getDateTimeFormat: (0, d.memoize)(function() {
            for (var e3, t3 = [], r3 = 0; r3 < arguments.length; r3++)
              t3[r3] = arguments[r3];
            return new ((e3 = Intl.DateTimeFormat).bind.apply(e3, (0, c.fX)([void 0], t3, false)))();
          }, { cache: el(o2.dateTime), strategy: d.strategies.variadic }), getPluralRules: (0, d.memoize)(function() {
            for (var e3, t3 = [], r3 = 0; r3 < arguments.length; r3++)
              t3[r3] = arguments[r3];
            return new ((e3 = Intl.PluralRules).bind.apply(e3, (0, c.fX)([void 0], t3, false)))();
          }, { cache: el(o2.pluralRules), strategy: d.strategies.variadic }) });
        }
        return Object.defineProperty(e2, "defaultLocale", { get: function() {
          return e2.memoizedDefaultLocale || (e2.memoizedDefaultLocale = new Intl.NumberFormat().resolvedOptions().locale), e2.memoizedDefaultLocale;
        }, enumerable: false, configurable: true }), e2.memoizedDefaultLocale = null, e2.resolveLocale = function(e3) {
          if (void 0 !== Intl.Locale) {
            var t2 = Intl.NumberFormat.supportedLocalesOf(e3);
            return new Intl.Locale(t2.length > 0 ? t2[0] : "string" == typeof e3 ? e3 : e3[0]);
          }
        }, e2.__parse = et, e2.formats = { number: { integer: { maximumFractionDigits: 0 }, currency: { style: "currency" }, percent: { style: "percent" } }, date: { short: { month: "numeric", day: "numeric", year: "2-digit" }, medium: { month: "short", day: "numeric", year: "numeric" }, long: { month: "long", day: "numeric", year: "numeric" }, full: { weekday: "long", month: "long", day: "numeric", year: "numeric" } }, time: { short: { hour: "numeric", minute: "numeric" }, medium: { hour: "numeric", minute: "numeric", second: "numeric" }, long: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" }, full: { hour: "numeric", minute: "numeric", second: "numeric", timeZoneName: "short" } } }, e2;
      }();
      let ec = eu;
    }, 3590: (e, t, r) => {
      "use strict";
      var n = r(3610), i = r(2635), a = r(9678), o = r(2262);
      function s(e2) {
        if (!(this instanceof s))
          return new s(e2);
        this.request = e2;
      }
      e.exports = s, e.exports.Negotiator = s, s.prototype.charset = function(e2) {
        var t2 = this.charsets(e2);
        return t2 && t2[0];
      }, s.prototype.charsets = function(e2) {
        return n(this.request.headers["accept-charset"], e2);
      }, s.prototype.encoding = function(e2, t2) {
        var r2 = this.encodings(e2, t2);
        return r2 && r2[0];
      }, s.prototype.encodings = function(e2, t2) {
        return i(this.request.headers["accept-encoding"], e2, (t2 || {}).preferred);
      }, s.prototype.language = function(e2) {
        var t2 = this.languages(e2);
        return t2 && t2[0];
      }, s.prototype.languages = function(e2) {
        return a(this.request.headers["accept-language"], e2);
      }, s.prototype.mediaType = function(e2) {
        var t2 = this.mediaTypes(e2);
        return t2 && t2[0];
      }, s.prototype.mediaTypes = function(e2) {
        return o(this.request.headers.accept, e2);
      }, s.prototype.preferredCharset = s.prototype.charset, s.prototype.preferredCharsets = s.prototype.charsets, s.prototype.preferredEncoding = s.prototype.encoding, s.prototype.preferredEncodings = s.prototype.encodings, s.prototype.preferredLanguage = s.prototype.language, s.prototype.preferredLanguages = s.prototype.languages, s.prototype.preferredMediaType = s.prototype.mediaType, s.prototype.preferredMediaTypes = s.prototype.mediaTypes;
    }, 3610: (e) => {
      "use strict";
      e.exports = r, e.exports.preferredCharsets = r;
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var o = function(e3) {
          for (var r3 = e3.split(","), n2 = 0, i2 = 0; n2 < r3.length; n2++) {
            var a2 = function(e4, r4) {
              var n3 = t.exec(e4);
              if (!n3)
                return null;
              var i3 = n3[1], a3 = 1;
              if (n3[2])
                for (var o2 = n3[2].split(";"), s2 = 0; s2 < o2.length; s2++) {
                  var l = o2[s2].trim().split("=");
                  if ("q" === l[0]) {
                    a3 = parseFloat(l[1]);
                    break;
                  }
                }
              return { charset: i3, q: a3, i: r4 };
            }(r3[n2].trim(), n2);
            a2 && (r3[i2++] = a2);
          }
          return r3.length = i2, r3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!r2)
          return o.filter(a).sort(n).map(i);
        var s = r2.map(function(e3, t2) {
          return function(e4, t3, r3) {
            for (var n2 = { o: -1, q: 0, s: 0 }, i2 = 0; i2 < t3.length; i2++) {
              var a2 = function(e5, t4, r4) {
                var n3 = 0;
                if (t4.charset.toLowerCase() === e5.toLowerCase())
                  n3 |= 1;
                else if ("*" !== t4.charset)
                  return null;
                return { i: r4, o: t4.i, q: t4.q, s: n3 };
              }(e4, t3[i2], r3);
              a2 && 0 > (n2.s - a2.s || n2.q - a2.q || n2.o - a2.o) && (n2 = a2);
            }
            return n2;
          }(e3, o, t2);
        });
        return s.filter(a).sort(n).map(function(e3) {
          return r2[s.indexOf(e3)];
        });
      }
      function n(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function i(e2) {
        return e2.charset;
      }
      function a(e2) {
        return e2.q > 0;
      }
    }, 2635: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredEncodings = n;
      var t = /^\s*([^\s;]+)\s*(?:;(.*))?$/;
      function r(e2, t2, r2) {
        var n2 = 0;
        if (t2.encoding.toLowerCase() === e2.toLowerCase())
          n2 |= 1;
        else if ("*" !== t2.encoding)
          return null;
        return { encoding: e2, i: r2, o: t2.i, q: t2.q, s: n2 };
      }
      function n(e2, n2, s) {
        var l = function(e3) {
          for (var n3 = e3.split(","), i2 = false, a2 = 1, o2 = 0, s2 = 0; o2 < n3.length; o2++) {
            var l2 = function(e4, r2) {
              var n4 = t.exec(e4);
              if (!n4)
                return null;
              var i3 = n4[1], a3 = 1;
              if (n4[2])
                for (var o3 = n4[2].split(";"), s3 = 0; s3 < o3.length; s3++) {
                  var l3 = o3[s3].trim().split("=");
                  if ("q" === l3[0]) {
                    a3 = parseFloat(l3[1]);
                    break;
                  }
                }
              return { encoding: i3, q: a3, i: r2 };
            }(n3[o2].trim(), o2);
            l2 && (n3[s2++] = l2, i2 = i2 || r("identity", l2), a2 = Math.min(a2, l2.q || 1));
          }
          return i2 || (n3[s2++] = { encoding: "identity", q: a2, i: o2 }), n3.length = s2, n3;
        }(e2 || ""), u = s ? function(e3, t2) {
          if (e3.q !== t2.q)
            return t2.q - e3.q;
          var r2 = s.indexOf(e3.encoding), n3 = s.indexOf(t2.encoding);
          return -1 === r2 && -1 === n3 ? t2.s - e3.s || e3.o - t2.o || e3.i - t2.i : -1 !== r2 && -1 !== n3 ? r2 - n3 : -1 === r2 ? 1 : -1;
        } : i;
        if (!n2)
          return l.filter(o).sort(u).map(a);
        var c = n2.map(function(e3, t2) {
          return function(e4, t3, n3) {
            for (var i2 = { encoding: e4, o: -1, q: 0, s: 0 }, a2 = 0; a2 < t3.length; a2++) {
              var o2 = r(e4, t3[a2], n3);
              o2 && 0 > (i2.s - o2.s || i2.q - o2.q || i2.o - o2.o) && (i2 = o2);
            }
            return i2;
          }(e3, l, t2);
        });
        return c.filter(o).sort(u).map(function(e3) {
          return n2[c.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i;
      }
      function a(e2) {
        return e2.encoding;
      }
      function o(e2) {
        return e2.q > 0;
      }
    }, 9678: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredLanguages = n;
      var t = /^\s*([^\s\-;]+)(?:-([^\s;]+))?\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var n2 = t.exec(e2);
        if (!n2)
          return null;
        var i2 = n2[1], a2 = n2[2], o2 = i2;
        a2 && (o2 += "-" + a2);
        var s = 1;
        if (n2[3])
          for (var l = n2[3].split(";"), u = 0; u < l.length; u++) {
            var c = l[u].split("=");
            "q" === c[0] && (s = parseFloat(c[1]));
          }
        return { prefix: i2, suffix: a2, q: s, i: r2, full: o2 };
      }
      function n(e2, t2) {
        var n2 = function(e3) {
          for (var t3 = e3.split(","), n3 = 0, i2 = 0; n3 < t3.length; n3++) {
            var a2 = r(t3[n3].trim(), n3);
            a2 && (t3[i2++] = a2);
          }
          return t3.length = i2, t3;
        }(void 0 === e2 ? "*" : e2 || "");
        if (!t2)
          return n2.filter(o).sort(i).map(a);
        var s = t2.map(function(e3, t3) {
          return function(e4, t4, n3) {
            for (var i2 = { o: -1, q: 0, s: 0 }, a2 = 0; a2 < t4.length; a2++) {
              var o2 = function(e5, t5, n4) {
                var i3 = r(e5);
                if (!i3)
                  return null;
                var a3 = 0;
                if (t5.full.toLowerCase() === i3.full.toLowerCase())
                  a3 |= 4;
                else if (t5.prefix.toLowerCase() === i3.full.toLowerCase())
                  a3 |= 2;
                else if (t5.full.toLowerCase() === i3.prefix.toLowerCase())
                  a3 |= 1;
                else if ("*" !== t5.full)
                  return null;
                return { i: n4, o: t5.i, q: t5.q, s: a3 };
              }(e4, t4[a2], n3);
              o2 && 0 > (i2.s - o2.s || i2.q - o2.q || i2.o - o2.o) && (i2 = o2);
            }
            return i2;
          }(e3, n2, t3);
        });
        return s.filter(o).sort(i).map(function(e3) {
          return t2[s.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function a(e2) {
        return e2.full;
      }
      function o(e2) {
        return e2.q > 0;
      }
    }, 2262: (e) => {
      "use strict";
      e.exports = n, e.exports.preferredMediaTypes = n;
      var t = /^\s*([^\s\/;]+)\/([^;\s]+)\s*(?:;(.*))?$/;
      function r(e2, r2) {
        var n2 = t.exec(e2);
        if (!n2)
          return null;
        var i2 = /* @__PURE__ */ Object.create(null), a2 = 1, o2 = n2[2], u = n2[1];
        if (n2[3])
          for (var c = function(e3) {
            for (var t2 = e3.split(";"), r3 = 1, n3 = 0; r3 < t2.length; r3++)
              s(t2[n3]) % 2 == 0 ? t2[++n3] = t2[r3] : t2[n3] += ";" + t2[r3];
            t2.length = n3 + 1;
            for (var r3 = 0; r3 < t2.length; r3++)
              t2[r3] = t2[r3].trim();
            return t2;
          }(n2[3]).map(l), d = 0; d < c.length; d++) {
            var h = c[d], f = h[0].toLowerCase(), p = h[1], g = p && '"' === p[0] && '"' === p[p.length - 1] ? p.slice(1, -1) : p;
            if ("q" === f) {
              a2 = parseFloat(g);
              break;
            }
            i2[f] = g;
          }
        return { type: u, subtype: o2, params: i2, q: a2, i: r2 };
      }
      function n(e2, t2) {
        var n2 = function(e3) {
          for (var t3 = function(e4) {
            for (var t4 = e4.split(","), r2 = 1, n4 = 0; r2 < t4.length; r2++)
              s(t4[n4]) % 2 == 0 ? t4[++n4] = t4[r2] : t4[n4] += "," + t4[r2];
            return t4.length = n4 + 1, t4;
          }(e3), n3 = 0, i2 = 0; n3 < t3.length; n3++) {
            var a2 = r(t3[n3].trim(), n3);
            a2 && (t3[i2++] = a2);
          }
          return t3.length = i2, t3;
        }(void 0 === e2 ? "*/*" : e2 || "");
        if (!t2)
          return n2.filter(o).sort(i).map(a);
        var l2 = t2.map(function(e3, t3) {
          return function(e4, t4, n3) {
            for (var i2 = { o: -1, q: 0, s: 0 }, a2 = 0; a2 < t4.length; a2++) {
              var o2 = function(e5, t5, n4) {
                var i3 = r(e5), a3 = 0;
                if (!i3)
                  return null;
                if (t5.type.toLowerCase() == i3.type.toLowerCase())
                  a3 |= 4;
                else if ("*" != t5.type)
                  return null;
                if (t5.subtype.toLowerCase() == i3.subtype.toLowerCase())
                  a3 |= 2;
                else if ("*" != t5.subtype)
                  return null;
                var o3 = Object.keys(t5.params);
                if (o3.length > 0) {
                  if (!o3.every(function(e6) {
                    return "*" == t5.params[e6] || (t5.params[e6] || "").toLowerCase() == (i3.params[e6] || "").toLowerCase();
                  }))
                    return null;
                  a3 |= 1;
                }
                return { i: n4, o: t5.i, q: t5.q, s: a3 };
              }(e4, t4[a2], n3);
              o2 && 0 > (i2.s - o2.s || i2.q - o2.q || i2.o - o2.o) && (i2 = o2);
            }
            return i2;
          }(e3, n2, t3);
        });
        return l2.filter(o).sort(i).map(function(e3) {
          return t2[l2.indexOf(e3)];
        });
      }
      function i(e2, t2) {
        return t2.q - e2.q || t2.s - e2.s || e2.o - t2.o || e2.i - t2.i || 0;
      }
      function a(e2) {
        return e2.type + "/" + e2.subtype;
      }
      function o(e2) {
        return e2.q > 0;
      }
      function s(e2) {
        for (var t2 = 0, r2 = 0; -1 !== (r2 = e2.indexOf('"', r2)); )
          t2++, r2++;
        return t2;
      }
      function l(e2) {
        var t2, r2, n2 = e2.indexOf("=");
        return -1 === n2 ? t2 = e2 : (t2 = e2.slice(0, n2), r2 = e2.slice(n2 + 1)), [t2, r2];
      }
    }, 9230: (e, t, r) => {
      "use strict";
      var n = r(6119);
      t.A = n.default;
    }, 1922: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(4315), i = r(9668);
      t.default = function(e2) {
        var t2;
        let { localizedPathnames: r2, request: a, resolvedLocale: o, routing: s } = e2, l = a.nextUrl.clone(), u = i.getHost(a.headers);
        function c(e3, t3) {
          return e3.pathname = n.normalizeTrailingSlash(e3.pathname), a.nextUrl.basePath && ((e3 = new URL(e3)).pathname = i.applyBasePath(e3.pathname, a.nextUrl.basePath)), "<".concat(e3.toString(), '>; rel="alternate"; hreflang="').concat(t3, '"');
        }
        function d(e3, t3) {
          return r2 && "object" == typeof r2 ? i.formatTemplatePathname(e3, r2[o], r2[t3]) : e3;
        }
        u && (l.port = "", l.host = u), l.protocol = null !== (t2 = a.headers.get("x-forwarded-proto")) && void 0 !== t2 ? t2 : l.protocol, l.pathname = i.getNormalizedPathname(l.pathname, s.locales, s.localePrefix);
        let h = i.getLocalePrefixes(s.locales, s.localePrefix, false).flatMap((e3) => {
          let t3, [n2, a2] = e3;
          function o2(e4) {
            return "/" === e4 ? a2 : a2 + e4;
          }
          if (s.domains)
            return s.domains.filter((e4) => i.isLocaleSupportedOnDomain(n2, e4)).map((e4) => ((t3 = new URL(l)).port = "", t3.host = e4.domain, t3.pathname = d(l.pathname, n2), n2 === e4.defaultLocale && "always" !== s.localePrefix.mode || (t3.pathname = o2(t3.pathname)), c(t3, n2)));
          {
            let e4;
            e4 = r2 && "object" == typeof r2 ? d(l.pathname, n2) : l.pathname, n2 === s.defaultLocale && "always" !== s.localePrefix.mode || (e4 = o2(e4)), t3 = new URL(e4, l);
          }
          return c(t3, n2);
        });
        if (!s.domains && ("always" !== s.localePrefix.mode || "/" === l.pathname)) {
          let e3 = new URL(d(l.pathname, s.defaultLocale), l);
          h.push(c(e3, "x-default"));
        }
        return h.join(", ");
      };
    }, 6119: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(269), i = r(1637), a = r(1375), o = r(4315), s = r(1922), l = r(3969), u = r(3632), c = r(9668);
      t.default = function(e2, t2) {
        var r2, d, h;
        let f = i.receiveRoutingConfig({ ...e2, alternateLinks: null !== (r2 = null == t2 ? void 0 : t2.alternateLinks) && void 0 !== r2 ? r2 : e2.alternateLinks, localeDetection: null !== (d = null == t2 ? void 0 : t2.localeDetection) && void 0 !== d ? d : e2.localeDetection, localeCookie: null !== (h = null == t2 ? void 0 : t2.localeCookie) && void 0 !== h ? h : e2.localeCookie });
        return function(e3) {
          var t3;
          let r3;
          try {
            r3 = decodeURI(e3.nextUrl.pathname);
          } catch (e4) {
            return n.NextResponse.next();
          }
          let i2 = c.sanitizePathname(r3), { domain: d2, locale: h2 } = l.default(f, e3.headers, e3.cookies, i2), p = d2 ? d2.defaultLocale === h2 : h2 === f.defaultLocale, g = (null === (t3 = f.domains) || void 0 === t3 ? void 0 : t3.filter((e4) => c.isLocaleSupportedOnDomain(h2, e4))) || [], m = null != f.domains && !d2;
          function v(t4) {
            let r4 = new URL(t4, e3.url);
            e3.nextUrl.basePath && (r4.pathname = c.applyBasePath(r4.pathname, e3.nextUrl.basePath));
            let i3 = new Headers(e3.headers);
            return i3.set(a.HEADER_LOCALE_NAME, h2), n.NextResponse.rewrite(r4, { request: { headers: i3 } });
          }
          function y(t4, r4) {
            var i3, a2;
            let s2 = new URL(t4, e3.url);
            if (s2.pathname = o.normalizeTrailingSlash(s2.pathname), g.length > 0 && !r4 && d2) {
              let e4 = c.getBestMatchingDomain(d2, h2, g);
              e4 && (r4 = e4.domain, e4.defaultLocale === h2 && "as-needed" === f.localePrefix.mode && (s2.pathname = c.getNormalizedPathname(s2.pathname, f.locales, f.localePrefix)));
            }
            return r4 && (s2.host = r4, e3.headers.get("x-forwarded-host") && (s2.protocol = null !== (i3 = e3.headers.get("x-forwarded-proto")) && void 0 !== i3 ? i3 : e3.nextUrl.protocol, s2.port = null !== (a2 = e3.headers.get("x-forwarded-port")) && void 0 !== a2 ? a2 : "")), e3.nextUrl.basePath && (s2.pathname = c.applyBasePath(s2.pathname, e3.nextUrl.basePath)), n.NextResponse.redirect(s2.toString());
          }
          let _ = c.getNormalizedPathname(i2, f.locales, f.localePrefix), b = c.getPathnameMatch(i2, f.locales, f.localePrefix), w = null != b, S = "never" === f.localePrefix.mode || p && "as-needed" === f.localePrefix.mode, E, C, T = _, P = f.pathnames;
          if (P) {
            let t4;
            if ([t4, C] = c.getInternalTemplate(P, _, h2), C) {
              let r4 = P[C], n2 = "string" == typeof r4 ? r4 : r4[h2];
              if (o.matchesPathname(n2, _))
                T = c.formatTemplatePathname(_, n2, C);
              else {
                let i3;
                i3 = t4 ? "string" == typeof r4 ? r4 : r4[t4] : C;
                let a2 = S ? void 0 : o.getLocalePrefix(h2, f.localePrefix), s2 = c.formatTemplatePathname(_, i3, n2);
                E = y(c.formatPathname(s2, a2, e3.nextUrl.search));
              }
            }
          }
          if (!E) {
            if ("/" !== T || w) {
              let t4 = c.formatPathname(T, c.getLocaleAsPrefix(h2), e3.nextUrl.search);
              if (w) {
                let r4 = c.formatPathname(_, b.prefix, e3.nextUrl.search);
                if ("never" === f.localePrefix.mode)
                  E = y(c.formatPathname(_, void 0, e3.nextUrl.search));
                else if (b.exact) {
                  if (p && S)
                    E = y(c.formatPathname(_, void 0, e3.nextUrl.search));
                  else if (f.domains) {
                    let e4 = c.getBestMatchingDomain(d2, b.locale, g);
                    E = (null == d2 ? void 0 : d2.domain) === (null == e4 ? void 0 : e4.domain) || m ? v(t4) : y(r4, null == e4 ? void 0 : e4.domain);
                  } else
                    E = v(t4);
                } else
                  E = y(r4);
              } else
                E = S ? v(t4) : y(c.formatPathname(_, o.getLocalePrefix(h2, f.localePrefix), e3.nextUrl.search));
            } else
              E = S ? v(c.formatPathname(T, c.getLocaleAsPrefix(h2), e3.nextUrl.search)) : y(c.formatPathname(_, o.getLocalePrefix(h2, f.localePrefix), e3.nextUrl.search));
          }
          return f.localeDetection && f.localeCookie && u.default(e3, E, h2, f.localeCookie), "never" !== f.localePrefix.mode && f.alternateLinks && f.locales.length > 1 && E.headers.set("Link", s.default({ routing: f, localizedPathnames: null != C && P ? P[C] : void 0, request: e3, resolvedLocale: h2 })), E;
        };
      };
    }, 3969: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(8324), i = r(3590), a = r(9668), o = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(i);
      function s(e2, t2, r2) {
        let i2;
        let a2 = new o.default({ headers: { "accept-language": e2.get("accept-language") || void 0 } }).languages();
        try {
          let e3 = t2.slice().sort((e4, t3) => t3.length - e4.length);
          i2 = n.match(a2, e3, r2);
        } catch (e3) {
        }
        return i2;
      }
      function l(e2, t2) {
        if (e2.localeCookie && t2.has(e2.localeCookie.name)) {
          var r2;
          let n2 = null === (r2 = t2.get(e2.localeCookie.name)) || void 0 === r2 ? void 0 : r2.value;
          if (n2 && e2.locales.includes(n2))
            return n2;
        }
      }
      function u(e2, t2, r2, n2) {
        var i2;
        let o2;
        return n2 && (o2 = null === (i2 = a.getPathnameMatch(n2, e2.locales, e2.localePrefix)) || void 0 === i2 ? void 0 : i2.locale), !o2 && e2.localeDetection && (o2 = l(e2, r2)), !o2 && e2.localeDetection && (o2 = s(t2, e2.locales, e2.defaultLocale)), o2 || (o2 = e2.defaultLocale), o2;
      }
      t.default = function(e2, t2, r2, n2) {
        return e2.domains ? function(e3, t3, r3, n3) {
          let i2;
          let o2 = function(e4, t4) {
            let r4 = a.getHost(e4);
            if (r4)
              return t4.find((e5) => e5.domain === r4);
          }(t3, e3.domains);
          if (!o2)
            return { locale: u(e3, t3, r3, n3) };
          if (n3) {
            var c;
            let t4 = null === (c = a.getPathnameMatch(n3, e3.locales, e3.localePrefix)) || void 0 === c ? void 0 : c.locale;
            if (t4) {
              if (!a.isLocaleSupportedOnDomain(t4, o2))
                return { locale: t4, domain: o2 };
              i2 = t4;
            }
          }
          if (!i2 && e3.localeDetection) {
            let t4 = l(e3, r3);
            t4 && a.isLocaleSupportedOnDomain(t4, o2) && (i2 = t4);
          }
          if (!i2 && e3.localeDetection) {
            let r4 = s(t3, o2.locales || e3.locales, o2.defaultLocale);
            r4 && (i2 = r4);
          }
          return i2 || (i2 = o2.defaultLocale), { locale: i2, domain: o2 };
        }(e2, t2, r2, n2) : { locale: u(e2, t2, r2, n2) };
      }, t.getAcceptLanguageLocale = s;
    }, 3632: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e2, t2, r, n) {
        var i;
        let { name: a, ...o } = n;
        (null === (i = e2.cookies.get(a)) || void 0 === i ? void 0 : i.value) !== r && t2.cookies.set(a, r, { path: e2.nextUrl.basePath || void 0, ...o });
      };
    }, 9668: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true });
      var n = r(4315);
      function i(e2, t2) {
        let r2 = !(arguments.length > 2 && void 0 !== arguments[2]) || arguments[2], i2 = e2.map((e3) => [e3, n.getLocalePrefix(e3, t2)]);
        return r2 && i2.sort((e3, t3) => t3[1].length - e3[1].length), i2;
      }
      function a(e2, t2) {
        let r2 = n.normalizeTrailingSlash(t2), i2 = n.normalizeTrailingSlash(e2), a2 = n.templateToRegex(i2).exec(r2);
        if (!a2)
          return;
        let o2 = {};
        for (let e3 = 1; e3 < a2.length; e3++) {
          var s2;
          let t3 = null === (s2 = i2.match(/\[([^\]]+)\]/g)) || void 0 === s2 ? void 0 : s2[e3 - 1].replace(/[[\]]/g, "");
          t3 && (o2[t3] = a2[e3]);
        }
        return o2;
      }
      function o(e2, t2) {
        if (!t2)
          return e2;
        let r2 = e2 = e2.replace(/\[\[/g, "[").replace(/\]\]/g, "]");
        return Object.entries(t2).forEach((e3) => {
          let [t3, n2] = e3;
          r2 = r2.replace("[".concat(t3, "]"), n2);
        }), r2;
      }
      function s(e2, t2) {
        return t2.defaultLocale === e2 || !t2.locales || t2.locales.includes(e2);
      }
      t.applyBasePath = function(e2, t2) {
        return n.normalizeTrailingSlash(t2 + e2);
      }, t.formatPathname = function(e2, t2, r2) {
        let i2 = e2;
        return t2 && (i2 = n.prefixPathname(t2, i2)), r2 && (i2 += r2), i2;
      }, t.formatPathnameTemplate = o, t.formatTemplatePathname = function(e2, t2, r2, i2) {
        let s2 = "";
        return s2 += o(r2, a(t2, e2)), s2 = n.normalizeTrailingSlash(s2);
      }, t.getBestMatchingDomain = function(e2, t2, r2) {
        let n2;
        return e2 && s(t2, e2) && (n2 = e2), n2 || (n2 = r2.find((e3) => e3.defaultLocale === t2)), n2 || (n2 = r2.find((e3) => {
          var r3;
          return null === (r3 = e3.locales) || void 0 === r3 ? void 0 : r3.includes(t2);
        })), n2 || null != (null == e2 ? void 0 : e2.locales) || (n2 = e2), n2 || (n2 = r2.find((e3) => !e3.locales)), n2;
      }, t.getHost = function(e2) {
        var t2, r2;
        return null !== (t2 = null !== (r2 = e2.get("x-forwarded-host")) && void 0 !== r2 ? r2 : e2.get("host")) && void 0 !== t2 ? t2 : void 0;
      }, t.getInternalTemplate = function(e2, t2, r2) {
        for (let i2 of n.getSortedPathnames(Object.keys(e2))) {
          let a2 = e2[i2];
          if ("string" == typeof a2) {
            if (n.matchesPathname(a2, t2))
              return [void 0, i2];
          } else {
            let e3 = Object.entries(a2), o2 = e3.findIndex((e4) => {
              let [t3] = e4;
              return t3 === r2;
            });
            for (let [r3, a3] of (o2 > 0 && e3.unshift(e3.splice(o2, 1)[0]), e3))
              if (n.matchesPathname(a3, t2))
                return [r3, i2];
          }
        }
        for (let r3 of Object.keys(e2))
          if (n.matchesPathname(r3, t2))
            return [void 0, r3];
        return [void 0, void 0];
      }, t.getLocaleAsPrefix = function(e2) {
        return "/".concat(e2);
      }, t.getLocalePrefixes = i, t.getNormalizedPathname = function(e2, t2, r2) {
        e2.endsWith("/") || (e2 += "/");
        let a2 = i(t2, r2), o2 = RegExp("^(".concat(a2.map((e3) => {
          let [, t3] = e3;
          return t3.replaceAll("/", "\\/");
        }).join("|"), ")/(.*)"), "i"), s2 = e2.match(o2), l = s2 ? "/" + s2[2] : e2;
        return "/" !== l && (l = n.normalizeTrailingSlash(l)), l;
      }, t.getPathnameMatch = function(e2, t2, r2) {
        for (let [n2, a2] of i(t2, r2)) {
          let t3, r3;
          if (e2 === a2 || e2.startsWith(a2 + "/"))
            t3 = r3 = true;
          else {
            let n3 = e2.toLowerCase(), i2 = a2.toLowerCase();
            (n3 === i2 || n3.startsWith(i2 + "/")) && (t3 = false, r3 = true);
          }
          if (r3)
            return { locale: n2, prefix: a2, matchedPrefix: e2.slice(0, a2.length), exact: t3 };
        }
      }, t.getRouteParams = a, t.isLocaleSupportedOnDomain = s, t.sanitizePathname = function(e2) {
        return e2.replace(/\\/g, "%5C").replace(/\/+/g, "/");
      };
    }, 5194: (e, t, r) => {
      "use strict";
      var n = r(3098);
      t.o = n.default;
    }, 1637: (e, t) => {
      "use strict";
      function r(e2) {
        return !(null != e2 && !e2) && { name: "NEXT_LOCALE", maxAge: 31536e3, sameSite: "lax", ..."object" == typeof e2 && e2 };
      }
      function n(e2) {
        return "object" == typeof e2 ? e2 : { mode: e2 || "always" };
      }
      Object.defineProperty(t, "__esModule", { value: true }), t.receiveLocaleCookie = r, t.receiveLocalePrefixConfig = n, t.receiveRoutingConfig = function(e2) {
        var t2, i;
        return { ...e2, localePrefix: n(e2.localePrefix), localeCookie: r(e2.localeCookie), localeDetection: null === (t2 = e2.localeDetection) || void 0 === t2 || t2, alternateLinks: null === (i = e2.alternateLinks) || void 0 === i || i };
      };
    }, 3098: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.default = function(e2) {
        return e2;
      };
    }, 1375: (e, t) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), t.HEADER_LOCALE_NAME = "X-NEXT-INTL-LOCALE", t.LOCALE_SEGMENT_NAME = "locale";
    }, 4315: (e, t) => {
      "use strict";
      function r(e2) {
        return ("object" == typeof e2 ? null == e2.host && null == e2.hostname : !/^[a-z]+:/i.test(e2)) && !function(e3) {
          let t2 = "object" == typeof e3 ? e3.pathname : e3;
          return null != t2 && !t2.startsWith("/");
        }(e2);
      }
      function n(e2, t2) {
        let r2;
        return "string" == typeof e2 ? r2 = i(t2, e2) : (r2 = { ...e2 }, e2.pathname && (r2.pathname = i(t2, e2.pathname))), r2;
      }
      function i(e2, t2) {
        let r2 = e2;
        return /^\/(\?.*)?$/.test(t2) && (t2 = t2.slice(1)), r2 += t2;
      }
      function a(e2, t2) {
        return t2 === e2 || t2.startsWith("".concat(e2, "/"));
      }
      function o(e2) {
        let t2 = function() {
          try {
            return "true" === process.env._next_intl_trailing_slash;
          } catch (e3) {
            return false;
          }
        }();
        if ("/" !== e2) {
          let r2 = e2.endsWith("/");
          t2 && !r2 ? e2 += "/" : !t2 && r2 && (e2 = e2.slice(0, -1));
        }
        return e2;
      }
      function s(e2) {
        return "/" + e2;
      }
      function l(e2) {
        let t2 = e2.replace(/\[\[(\.\.\.[^\]]+)\]\]/g, "?(.*)").replace(/\[(\.\.\.[^\]]+)\]/g, "(.+)").replace(/\[([^\]]+)\]/g, "([^/]+)");
        return new RegExp("^".concat(t2, "$"));
      }
      function u(e2) {
        return e2.includes("[[...");
      }
      function c(e2) {
        return e2.includes("[...");
      }
      function d(e2) {
        return e2.includes("[");
      }
      function h(e2, t2) {
        let r2 = e2.split("/"), n2 = t2.split("/"), i2 = Math.max(r2.length, n2.length);
        for (let e3 = 0; e3 < i2; e3++) {
          let t3 = r2[e3], i3 = n2[e3];
          if (!t3 && i3)
            return -1;
          if (t3 && !i3)
            return 1;
          if (t3 || i3) {
            if (!d(t3) && d(i3))
              return -1;
            if (d(t3) && !d(i3))
              return 1;
            if (!c(t3) && c(i3))
              return -1;
            if (c(t3) && !c(i3))
              return 1;
            if (!u(t3) && u(i3))
              return -1;
            if (u(t3) && !u(i3))
              return 1;
          }
        }
        return 0;
      }
      Object.defineProperty(t, "__esModule", { value: true }), t.getLocaleAsPrefix = s, t.getLocalePrefix = function(e2, t2) {
        var r2;
        return "never" !== t2.mode && (null === (r2 = t2.prefixes) || void 0 === r2 ? void 0 : r2[e2]) || s(e2);
      }, t.getSortedPathnames = function(e2) {
        return e2.sort(h);
      }, t.hasPathnamePrefixed = a, t.isLocalizableHref = r, t.isPromise = function(e2) {
        return "function" == typeof e2.then;
      }, t.localizeHref = function(e2, t2) {
        let i2 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : t2, o2 = arguments.length > 3 ? arguments[3] : void 0, s2 = arguments.length > 4 ? arguments[4] : void 0;
        if (!r(e2))
          return e2;
        let l2 = a(s2, o2);
        return (t2 !== i2 || l2) && null != s2 ? n(e2, s2) : e2;
      }, t.matchesPathname = function(e2, t2) {
        let r2 = o(e2), n2 = o(t2);
        return l(r2).test(n2);
      }, t.normalizeTrailingSlash = o, t.prefixHref = n, t.prefixPathname = i, t.templateToRegex = l, t.unprefixPathname = function(e2, t2) {
        return e2.replace(new RegExp("^".concat(t2)), "") || "/";
      };
    }, 7555: (e) => {
      "use strict";
      var t = Object.defineProperty, r = Object.getOwnPropertyDescriptor, n = Object.getOwnPropertyNames, i = Object.prototype.hasOwnProperty, a = {};
      function o(e2) {
        var t2;
        let r2 = ["path" in e2 && e2.path && `Path=${e2.path}`, "expires" in e2 && (e2.expires || 0 === e2.expires) && `Expires=${("number" == typeof e2.expires ? new Date(e2.expires) : e2.expires).toUTCString()}`, "maxAge" in e2 && "number" == typeof e2.maxAge && `Max-Age=${e2.maxAge}`, "domain" in e2 && e2.domain && `Domain=${e2.domain}`, "secure" in e2 && e2.secure && "Secure", "httpOnly" in e2 && e2.httpOnly && "HttpOnly", "sameSite" in e2 && e2.sameSite && `SameSite=${e2.sameSite}`, "partitioned" in e2 && e2.partitioned && "Partitioned", "priority" in e2 && e2.priority && `Priority=${e2.priority}`].filter(Boolean), n2 = `${e2.name}=${encodeURIComponent(null != (t2 = e2.value) ? t2 : "")}`;
        return 0 === r2.length ? n2 : `${n2}; ${r2.join("; ")}`;
      }
      function s(e2) {
        let t2 = /* @__PURE__ */ new Map();
        for (let r2 of e2.split(/; */)) {
          if (!r2)
            continue;
          let e3 = r2.indexOf("=");
          if (-1 === e3) {
            t2.set(r2, "true");
            continue;
          }
          let [n2, i2] = [r2.slice(0, e3), r2.slice(e3 + 1)];
          try {
            t2.set(n2, decodeURIComponent(null != i2 ? i2 : "true"));
          } catch {
          }
        }
        return t2;
      }
      function l(e2) {
        var t2, r2;
        if (!e2)
          return;
        let [[n2, i2], ...a2] = s(e2), { domain: o2, expires: l2, httponly: d2, maxage: h2, path: f, samesite: p, secure: g, partitioned: m, priority: v } = Object.fromEntries(a2.map(([e3, t3]) => [e3.toLowerCase().replace(/-/g, ""), t3]));
        return function(e3) {
          let t3 = {};
          for (let r3 in e3)
            e3[r3] && (t3[r3] = e3[r3]);
          return t3;
        }({ name: n2, value: decodeURIComponent(i2), domain: o2, ...l2 && { expires: new Date(l2) }, ...d2 && { httpOnly: true }, ..."string" == typeof h2 && { maxAge: Number(h2) }, path: f, ...p && { sameSite: u.includes(t2 = (t2 = p).toLowerCase()) ? t2 : void 0 }, ...g && { secure: true }, ...v && { priority: c.includes(r2 = (r2 = v).toLowerCase()) ? r2 : void 0 }, ...m && { partitioned: true } });
      }
      ((e2, r2) => {
        for (var n2 in r2)
          t(e2, n2, { get: r2[n2], enumerable: true });
      })(a, { RequestCookies: () => d, ResponseCookies: () => h, parseCookie: () => s, parseSetCookie: () => l, stringifyCookie: () => o }), e.exports = ((e2, a2, o2, s2) => {
        if (a2 && "object" == typeof a2 || "function" == typeof a2)
          for (let l2 of n(a2))
            i.call(e2, l2) || l2 === o2 || t(e2, l2, { get: () => a2[l2], enumerable: !(s2 = r(a2, l2)) || s2.enumerable });
        return e2;
      })(t({}, "__esModule", { value: true }), a);
      var u = ["strict", "lax", "none"], c = ["low", "medium", "high"], d = class {
        constructor(e2) {
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let t2 = e2.get("cookie");
          if (t2)
            for (let [e3, r2] of s(t2))
              this._parsed.set(e3, { name: e3, value: r2 });
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        get size() {
          return this._parsed.size;
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed);
          if (!e2.length)
            return r2.map(([e3, t3]) => t3);
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter(([e3]) => e3 === n2).map(([e3, t3]) => t3);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2] = 1 === e2.length ? [e2[0].name, e2[0].value] : e2, n2 = this._parsed;
          return n2.set(t2, { name: t2, value: r2 }), this._headers.set("cookie", Array.from(n2).map(([e3, t3]) => o(t3)).join("; ")), this;
        }
        delete(e2) {
          let t2 = this._parsed, r2 = Array.isArray(e2) ? e2.map((e3) => t2.delete(e3)) : t2.delete(e2);
          return this._headers.set("cookie", Array.from(t2).map(([e3, t3]) => o(t3)).join("; ")), r2;
        }
        clear() {
          return this.delete(Array.from(this._parsed.keys())), this;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((e2) => `${e2.name}=${encodeURIComponent(e2.value)}`).join("; ");
        }
      }, h = class {
        constructor(e2) {
          var t2, r2, n2;
          this._parsed = /* @__PURE__ */ new Map(), this._headers = e2;
          let i2 = null != (n2 = null != (r2 = null == (t2 = e2.getSetCookie) ? void 0 : t2.call(e2)) ? r2 : e2.get("set-cookie")) ? n2 : [];
          for (let e3 of Array.isArray(i2) ? i2 : function(e4) {
            if (!e4)
              return [];
            var t3, r3, n3, i3, a2, o2 = [], s2 = 0;
            function l2() {
              for (; s2 < e4.length && /\s/.test(e4.charAt(s2)); )
                s2 += 1;
              return s2 < e4.length;
            }
            for (; s2 < e4.length; ) {
              for (t3 = s2, a2 = false; l2(); )
                if ("," === (r3 = e4.charAt(s2))) {
                  for (n3 = s2, s2 += 1, l2(), i3 = s2; s2 < e4.length && "=" !== (r3 = e4.charAt(s2)) && ";" !== r3 && "," !== r3; )
                    s2 += 1;
                  s2 < e4.length && "=" === e4.charAt(s2) ? (a2 = true, s2 = i3, o2.push(e4.substring(t3, n3)), t3 = s2) : s2 = n3 + 1;
                } else
                  s2 += 1;
              (!a2 || s2 >= e4.length) && o2.push(e4.substring(t3, e4.length));
            }
            return o2;
          }(i2)) {
            let t3 = l(e3);
            t3 && this._parsed.set(t3.name, t3);
          }
        }
        get(...e2) {
          let t2 = "string" == typeof e2[0] ? e2[0] : e2[0].name;
          return this._parsed.get(t2);
        }
        getAll(...e2) {
          var t2;
          let r2 = Array.from(this._parsed.values());
          if (!e2.length)
            return r2;
          let n2 = "string" == typeof e2[0] ? e2[0] : null == (t2 = e2[0]) ? void 0 : t2.name;
          return r2.filter((e3) => e3.name === n2);
        }
        has(e2) {
          return this._parsed.has(e2);
        }
        set(...e2) {
          let [t2, r2, n2] = 1 === e2.length ? [e2[0].name, e2[0].value, e2[0]] : e2, i2 = this._parsed;
          return i2.set(t2, function(e3 = { name: "", value: "" }) {
            return "number" == typeof e3.expires && (e3.expires = new Date(e3.expires)), e3.maxAge && (e3.expires = new Date(Date.now() + 1e3 * e3.maxAge)), (null === e3.path || void 0 === e3.path) && (e3.path = "/"), e3;
          }({ name: t2, value: r2, ...n2 })), function(e3, t3) {
            for (let [, r3] of (t3.delete("set-cookie"), e3)) {
              let e4 = o(r3);
              t3.append("set-cookie", e4);
            }
          }(i2, this._headers), this;
        }
        delete(...e2) {
          let [t2, r2] = "string" == typeof e2[0] ? [e2[0]] : [e2[0].name, e2[0]];
          return this.set({ ...r2, name: t2, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(o).join("; ");
        }
      };
    }, 1777: (e, t, r) => {
      (() => {
        "use strict";
        var t2 = { 491: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ContextAPI = void 0;
          let n2 = r2(223), i2 = r2(172), a2 = r2(930), o = "context", s = new n2.NoopContextManager();
          class l {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new l()), this._instance;
            }
            setGlobalContextManager(e3) {
              return (0, i2.registerGlobal)(o, e3, a2.DiagAPI.instance());
            }
            active() {
              return this._getContextManager().active();
            }
            with(e3, t4, r3, ...n3) {
              return this._getContextManager().with(e3, t4, r3, ...n3);
            }
            bind(e3, t4) {
              return this._getContextManager().bind(e3, t4);
            }
            _getContextManager() {
              return (0, i2.getGlobal)(o) || s;
            }
            disable() {
              this._getContextManager().disable(), (0, i2.unregisterGlobal)(o, a2.DiagAPI.instance());
            }
          }
          t3.ContextAPI = l;
        }, 930: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagAPI = void 0;
          let n2 = r2(56), i2 = r2(912), a2 = r2(957), o = r2(172);
          class s {
            constructor() {
              function e3(e4) {
                return function(...t5) {
                  let r3 = (0, o.getGlobal)("diag");
                  if (r3)
                    return r3[e4](...t5);
                };
              }
              let t4 = this;
              t4.setLogger = (e4, r3 = { logLevel: a2.DiagLogLevel.INFO }) => {
                var n3, s2, l;
                if (e4 === t4) {
                  let e5 = Error("Cannot use diag as the logger for itself. Please use a DiagLogger implementation like ConsoleDiagLogger or a custom implementation");
                  return t4.error(null !== (n3 = e5.stack) && void 0 !== n3 ? n3 : e5.message), false;
                }
                "number" == typeof r3 && (r3 = { logLevel: r3 });
                let u = (0, o.getGlobal)("diag"), c = (0, i2.createLogLevelDiagLogger)(null !== (s2 = r3.logLevel) && void 0 !== s2 ? s2 : a2.DiagLogLevel.INFO, e4);
                if (u && !r3.suppressOverrideMessage) {
                  let e5 = null !== (l = Error().stack) && void 0 !== l ? l : "<failed to generate stacktrace>";
                  u.warn(`Current logger will be overwritten from ${e5}`), c.warn(`Current logger will overwrite one already registered from ${e5}`);
                }
                return (0, o.registerGlobal)("diag", c, t4, true);
              }, t4.disable = () => {
                (0, o.unregisterGlobal)("diag", t4);
              }, t4.createComponentLogger = (e4) => new n2.DiagComponentLogger(e4), t4.verbose = e3("verbose"), t4.debug = e3("debug"), t4.info = e3("info"), t4.warn = e3("warn"), t4.error = e3("error");
            }
            static instance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
          }
          t3.DiagAPI = s;
        }, 653: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.MetricsAPI = void 0;
          let n2 = r2(660), i2 = r2(172), a2 = r2(930), o = "metrics";
          class s {
            constructor() {
            }
            static getInstance() {
              return this._instance || (this._instance = new s()), this._instance;
            }
            setGlobalMeterProvider(e3) {
              return (0, i2.registerGlobal)(o, e3, a2.DiagAPI.instance());
            }
            getMeterProvider() {
              return (0, i2.getGlobal)(o) || n2.NOOP_METER_PROVIDER;
            }
            getMeter(e3, t4, r3) {
              return this.getMeterProvider().getMeter(e3, t4, r3);
            }
            disable() {
              (0, i2.unregisterGlobal)(o, a2.DiagAPI.instance());
            }
          }
          t3.MetricsAPI = s;
        }, 181: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.PropagationAPI = void 0;
          let n2 = r2(172), i2 = r2(874), a2 = r2(194), o = r2(277), s = r2(369), l = r2(930), u = "propagation", c = new i2.NoopTextMapPropagator();
          class d {
            constructor() {
              this.createBaggage = s.createBaggage, this.getBaggage = o.getBaggage, this.getActiveBaggage = o.getActiveBaggage, this.setBaggage = o.setBaggage, this.deleteBaggage = o.deleteBaggage;
            }
            static getInstance() {
              return this._instance || (this._instance = new d()), this._instance;
            }
            setGlobalPropagator(e3) {
              return (0, n2.registerGlobal)(u, e3, l.DiagAPI.instance());
            }
            inject(e3, t4, r3 = a2.defaultTextMapSetter) {
              return this._getGlobalPropagator().inject(e3, t4, r3);
            }
            extract(e3, t4, r3 = a2.defaultTextMapGetter) {
              return this._getGlobalPropagator().extract(e3, t4, r3);
            }
            fields() {
              return this._getGlobalPropagator().fields();
            }
            disable() {
              (0, n2.unregisterGlobal)(u, l.DiagAPI.instance());
            }
            _getGlobalPropagator() {
              return (0, n2.getGlobal)(u) || c;
            }
          }
          t3.PropagationAPI = d;
        }, 997: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceAPI = void 0;
          let n2 = r2(172), i2 = r2(846), a2 = r2(139), o = r2(607), s = r2(930), l = "trace";
          class u {
            constructor() {
              this._proxyTracerProvider = new i2.ProxyTracerProvider(), this.wrapSpanContext = a2.wrapSpanContext, this.isSpanContextValid = a2.isSpanContextValid, this.deleteSpan = o.deleteSpan, this.getSpan = o.getSpan, this.getActiveSpan = o.getActiveSpan, this.getSpanContext = o.getSpanContext, this.setSpan = o.setSpan, this.setSpanContext = o.setSpanContext;
            }
            static getInstance() {
              return this._instance || (this._instance = new u()), this._instance;
            }
            setGlobalTracerProvider(e3) {
              let t4 = (0, n2.registerGlobal)(l, this._proxyTracerProvider, s.DiagAPI.instance());
              return t4 && this._proxyTracerProvider.setDelegate(e3), t4;
            }
            getTracerProvider() {
              return (0, n2.getGlobal)(l) || this._proxyTracerProvider;
            }
            getTracer(e3, t4) {
              return this.getTracerProvider().getTracer(e3, t4);
            }
            disable() {
              (0, n2.unregisterGlobal)(l, s.DiagAPI.instance()), this._proxyTracerProvider = new i2.ProxyTracerProvider();
            }
          }
          t3.TraceAPI = u;
        }, 277: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.deleteBaggage = t3.setBaggage = t3.getActiveBaggage = t3.getBaggage = void 0;
          let n2 = r2(491), i2 = (0, r2(780).createContextKey)("OpenTelemetry Baggage Key");
          function a2(e3) {
            return e3.getValue(i2) || void 0;
          }
          t3.getBaggage = a2, t3.getActiveBaggage = function() {
            return a2(n2.ContextAPI.getInstance().active());
          }, t3.setBaggage = function(e3, t4) {
            return e3.setValue(i2, t4);
          }, t3.deleteBaggage = function(e3) {
            return e3.deleteValue(i2);
          };
        }, 993: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.BaggageImpl = void 0;
          class r2 {
            constructor(e3) {
              this._entries = e3 ? new Map(e3) : /* @__PURE__ */ new Map();
            }
            getEntry(e3) {
              let t4 = this._entries.get(e3);
              if (t4)
                return Object.assign({}, t4);
            }
            getAllEntries() {
              return Array.from(this._entries.entries()).map(([e3, t4]) => [e3, t4]);
            }
            setEntry(e3, t4) {
              let n2 = new r2(this._entries);
              return n2._entries.set(e3, t4), n2;
            }
            removeEntry(e3) {
              let t4 = new r2(this._entries);
              return t4._entries.delete(e3), t4;
            }
            removeEntries(...e3) {
              let t4 = new r2(this._entries);
              for (let r3 of e3)
                t4._entries.delete(r3);
              return t4;
            }
            clear() {
              return new r2();
            }
          }
          t3.BaggageImpl = r2;
        }, 830: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataSymbol = void 0, t3.baggageEntryMetadataSymbol = Symbol("BaggageEntryMetadata");
        }, 369: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.baggageEntryMetadataFromString = t3.createBaggage = void 0;
          let n2 = r2(930), i2 = r2(993), a2 = r2(830), o = n2.DiagAPI.instance();
          t3.createBaggage = function(e3 = {}) {
            return new i2.BaggageImpl(new Map(Object.entries(e3)));
          }, t3.baggageEntryMetadataFromString = function(e3) {
            return "string" != typeof e3 && (o.error(`Cannot create baggage metadata from unknown type: ${typeof e3}`), e3 = ""), { __TYPE__: a2.baggageEntryMetadataSymbol, toString: () => e3 };
          };
        }, 67: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.context = void 0;
          let n2 = r2(491);
          t3.context = n2.ContextAPI.getInstance();
        }, 223: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopContextManager = void 0;
          let n2 = r2(780);
          class i2 {
            active() {
              return n2.ROOT_CONTEXT;
            }
            with(e3, t4, r3, ...n3) {
              return t4.call(r3, ...n3);
            }
            bind(e3, t4) {
              return t4;
            }
            enable() {
              return this;
            }
            disable() {
              return this;
            }
          }
          t3.NoopContextManager = i2;
        }, 780: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ROOT_CONTEXT = t3.createContextKey = void 0, t3.createContextKey = function(e3) {
            return Symbol.for(e3);
          };
          class r2 {
            constructor(e3) {
              let t4 = this;
              t4._currentContext = e3 ? new Map(e3) : /* @__PURE__ */ new Map(), t4.getValue = (e4) => t4._currentContext.get(e4), t4.setValue = (e4, n2) => {
                let i2 = new r2(t4._currentContext);
                return i2._currentContext.set(e4, n2), i2;
              }, t4.deleteValue = (e4) => {
                let n2 = new r2(t4._currentContext);
                return n2._currentContext.delete(e4), n2;
              };
            }
          }
          t3.ROOT_CONTEXT = new r2();
        }, 506: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.diag = void 0;
          let n2 = r2(930);
          t3.diag = n2.DiagAPI.instance();
        }, 56: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagComponentLogger = void 0;
          let n2 = r2(172);
          class i2 {
            constructor(e3) {
              this._namespace = e3.namespace || "DiagComponentLogger";
            }
            debug(...e3) {
              return a2("debug", this._namespace, e3);
            }
            error(...e3) {
              return a2("error", this._namespace, e3);
            }
            info(...e3) {
              return a2("info", this._namespace, e3);
            }
            warn(...e3) {
              return a2("warn", this._namespace, e3);
            }
            verbose(...e3) {
              return a2("verbose", this._namespace, e3);
            }
          }
          function a2(e3, t4, r3) {
            let i3 = (0, n2.getGlobal)("diag");
            if (i3)
              return r3.unshift(t4), i3[e3](...r3);
          }
          t3.DiagComponentLogger = i2;
        }, 972: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagConsoleLogger = void 0;
          let r2 = [{ n: "error", c: "error" }, { n: "warn", c: "warn" }, { n: "info", c: "info" }, { n: "debug", c: "debug" }, { n: "verbose", c: "trace" }];
          class n2 {
            constructor() {
              for (let e3 = 0; e3 < r2.length; e3++)
                this[r2[e3].n] = function(e4) {
                  return function(...t4) {
                    if (console) {
                      let r3 = console[e4];
                      if ("function" != typeof r3 && (r3 = console.log), "function" == typeof r3)
                        return r3.apply(console, t4);
                    }
                  };
                }(r2[e3].c);
            }
          }
          t3.DiagConsoleLogger = n2;
        }, 912: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createLogLevelDiagLogger = void 0;
          let n2 = r2(957);
          t3.createLogLevelDiagLogger = function(e3, t4) {
            function r3(r4, n3) {
              let i2 = t4[r4];
              return "function" == typeof i2 && e3 >= n3 ? i2.bind(t4) : function() {
              };
            }
            return e3 < n2.DiagLogLevel.NONE ? e3 = n2.DiagLogLevel.NONE : e3 > n2.DiagLogLevel.ALL && (e3 = n2.DiagLogLevel.ALL), t4 = t4 || {}, { error: r3("error", n2.DiagLogLevel.ERROR), warn: r3("warn", n2.DiagLogLevel.WARN), info: r3("info", n2.DiagLogLevel.INFO), debug: r3("debug", n2.DiagLogLevel.DEBUG), verbose: r3("verbose", n2.DiagLogLevel.VERBOSE) };
          };
        }, 957: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.DiagLogLevel = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.ERROR = 30] = "ERROR", e3[e3.WARN = 50] = "WARN", e3[e3.INFO = 60] = "INFO", e3[e3.DEBUG = 70] = "DEBUG", e3[e3.VERBOSE = 80] = "VERBOSE", e3[e3.ALL = 9999] = "ALL";
          }(t3.DiagLogLevel || (t3.DiagLogLevel = {}));
        }, 172: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.unregisterGlobal = t3.getGlobal = t3.registerGlobal = void 0;
          let n2 = r2(200), i2 = r2(521), a2 = r2(130), o = i2.VERSION.split(".")[0], s = Symbol.for(`opentelemetry.js.api.${o}`), l = n2._globalThis;
          t3.registerGlobal = function(e3, t4, r3, n3 = false) {
            var a3;
            let o2 = l[s] = null !== (a3 = l[s]) && void 0 !== a3 ? a3 : { version: i2.VERSION };
            if (!n3 && o2[e3]) {
              let t5 = Error(`@opentelemetry/api: Attempted duplicate registration of API: ${e3}`);
              return r3.error(t5.stack || t5.message), false;
            }
            if (o2.version !== i2.VERSION) {
              let t5 = Error(`@opentelemetry/api: Registration of version v${o2.version} for ${e3} does not match previously registered API v${i2.VERSION}`);
              return r3.error(t5.stack || t5.message), false;
            }
            return o2[e3] = t4, r3.debug(`@opentelemetry/api: Registered a global for ${e3} v${i2.VERSION}.`), true;
          }, t3.getGlobal = function(e3) {
            var t4, r3;
            let n3 = null === (t4 = l[s]) || void 0 === t4 ? void 0 : t4.version;
            if (n3 && (0, a2.isCompatible)(n3))
              return null === (r3 = l[s]) || void 0 === r3 ? void 0 : r3[e3];
          }, t3.unregisterGlobal = function(e3, t4) {
            t4.debug(`@opentelemetry/api: Unregistering a global for ${e3} v${i2.VERSION}.`);
            let r3 = l[s];
            r3 && delete r3[e3];
          };
        }, 130: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.isCompatible = t3._makeCompatibilityCheck = void 0;
          let n2 = r2(521), i2 = /^(\d+)\.(\d+)\.(\d+)(-(.+))?$/;
          function a2(e3) {
            let t4 = /* @__PURE__ */ new Set([e3]), r3 = /* @__PURE__ */ new Set(), n3 = e3.match(i2);
            if (!n3)
              return () => false;
            let a3 = { major: +n3[1], minor: +n3[2], patch: +n3[3], prerelease: n3[4] };
            if (null != a3.prerelease)
              return function(t5) {
                return t5 === e3;
              };
            function o(e4) {
              return r3.add(e4), false;
            }
            return function(e4) {
              if (t4.has(e4))
                return true;
              if (r3.has(e4))
                return false;
              let n4 = e4.match(i2);
              if (!n4)
                return o(e4);
              let s = { major: +n4[1], minor: +n4[2], patch: +n4[3], prerelease: n4[4] };
              return null != s.prerelease || a3.major !== s.major ? o(e4) : 0 === a3.major ? a3.minor === s.minor && a3.patch <= s.patch ? (t4.add(e4), true) : o(e4) : a3.minor <= s.minor ? (t4.add(e4), true) : o(e4);
            };
          }
          t3._makeCompatibilityCheck = a2, t3.isCompatible = a2(n2.VERSION);
        }, 886: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.metrics = void 0;
          let n2 = r2(653);
          t3.metrics = n2.MetricsAPI.getInstance();
        }, 901: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ValueType = void 0, function(e3) {
            e3[e3.INT = 0] = "INT", e3[e3.DOUBLE = 1] = "DOUBLE";
          }(t3.ValueType || (t3.ValueType = {}));
        }, 102: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createNoopMeter = t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = t3.NOOP_OBSERVABLE_GAUGE_METRIC = t3.NOOP_OBSERVABLE_COUNTER_METRIC = t3.NOOP_UP_DOWN_COUNTER_METRIC = t3.NOOP_HISTOGRAM_METRIC = t3.NOOP_COUNTER_METRIC = t3.NOOP_METER = t3.NoopObservableUpDownCounterMetric = t3.NoopObservableGaugeMetric = t3.NoopObservableCounterMetric = t3.NoopObservableMetric = t3.NoopHistogramMetric = t3.NoopUpDownCounterMetric = t3.NoopCounterMetric = t3.NoopMetric = t3.NoopMeter = void 0;
          class r2 {
            constructor() {
            }
            createHistogram(e3, r3) {
              return t3.NOOP_HISTOGRAM_METRIC;
            }
            createCounter(e3, r3) {
              return t3.NOOP_COUNTER_METRIC;
            }
            createUpDownCounter(e3, r3) {
              return t3.NOOP_UP_DOWN_COUNTER_METRIC;
            }
            createObservableGauge(e3, r3) {
              return t3.NOOP_OBSERVABLE_GAUGE_METRIC;
            }
            createObservableCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_COUNTER_METRIC;
            }
            createObservableUpDownCounter(e3, r3) {
              return t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC;
            }
            addBatchObservableCallback(e3, t4) {
            }
            removeBatchObservableCallback(e3) {
            }
          }
          t3.NoopMeter = r2;
          class n2 {
          }
          t3.NoopMetric = n2;
          class i2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopCounterMetric = i2;
          class a2 extends n2 {
            add(e3, t4) {
            }
          }
          t3.NoopUpDownCounterMetric = a2;
          class o extends n2 {
            record(e3, t4) {
            }
          }
          t3.NoopHistogramMetric = o;
          class s {
            addCallback(e3) {
            }
            removeCallback(e3) {
            }
          }
          t3.NoopObservableMetric = s;
          class l extends s {
          }
          t3.NoopObservableCounterMetric = l;
          class u extends s {
          }
          t3.NoopObservableGaugeMetric = u;
          class c extends s {
          }
          t3.NoopObservableUpDownCounterMetric = c, t3.NOOP_METER = new r2(), t3.NOOP_COUNTER_METRIC = new i2(), t3.NOOP_HISTOGRAM_METRIC = new o(), t3.NOOP_UP_DOWN_COUNTER_METRIC = new a2(), t3.NOOP_OBSERVABLE_COUNTER_METRIC = new l(), t3.NOOP_OBSERVABLE_GAUGE_METRIC = new u(), t3.NOOP_OBSERVABLE_UP_DOWN_COUNTER_METRIC = new c(), t3.createNoopMeter = function() {
            return t3.NOOP_METER;
          };
        }, 660: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NOOP_METER_PROVIDER = t3.NoopMeterProvider = void 0;
          let n2 = r2(102);
          class i2 {
            getMeter(e3, t4, r3) {
              return n2.NOOP_METER;
            }
          }
          t3.NoopMeterProvider = i2, t3.NOOP_METER_PROVIDER = new i2();
        }, 200: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3)
              "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(46), t3);
        }, 651: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3._globalThis = void 0, t3._globalThis = "object" == typeof globalThis ? globalThis : r.g;
        }, 46: function(e2, t3, r2) {
          var n2 = this && this.__createBinding || (Object.create ? function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), Object.defineProperty(e3, n3, { enumerable: true, get: function() {
              return t4[r3];
            } });
          } : function(e3, t4, r3, n3) {
            void 0 === n3 && (n3 = r3), e3[n3] = t4[r3];
          }), i2 = this && this.__exportStar || function(e3, t4) {
            for (var r3 in e3)
              "default" === r3 || Object.prototype.hasOwnProperty.call(t4, r3) || n2(t4, e3, r3);
          };
          Object.defineProperty(t3, "__esModule", { value: true }), i2(r2(651), t3);
        }, 939: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.propagation = void 0;
          let n2 = r2(181);
          t3.propagation = n2.PropagationAPI.getInstance();
        }, 874: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTextMapPropagator = void 0;
          class r2 {
            inject(e3, t4) {
            }
            extract(e3, t4) {
              return e3;
            }
            fields() {
              return [];
            }
          }
          t3.NoopTextMapPropagator = r2;
        }, 194: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.defaultTextMapSetter = t3.defaultTextMapGetter = void 0, t3.defaultTextMapGetter = { get(e3, t4) {
            if (null != e3)
              return e3[t4];
          }, keys: (e3) => null == e3 ? [] : Object.keys(e3) }, t3.defaultTextMapSetter = { set(e3, t4, r2) {
            null != e3 && (e3[t4] = r2);
          } };
        }, 845: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.trace = void 0;
          let n2 = r2(997);
          t3.trace = n2.TraceAPI.getInstance();
        }, 403: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NonRecordingSpan = void 0;
          let n2 = r2(476);
          class i2 {
            constructor(e3 = n2.INVALID_SPAN_CONTEXT) {
              this._spanContext = e3;
            }
            spanContext() {
              return this._spanContext;
            }
            setAttribute(e3, t4) {
              return this;
            }
            setAttributes(e3) {
              return this;
            }
            addEvent(e3, t4) {
              return this;
            }
            setStatus(e3) {
              return this;
            }
            updateName(e3) {
              return this;
            }
            end(e3) {
            }
            isRecording() {
              return false;
            }
            recordException(e3, t4) {
            }
          }
          t3.NonRecordingSpan = i2;
        }, 614: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracer = void 0;
          let n2 = r2(491), i2 = r2(607), a2 = r2(403), o = r2(139), s = n2.ContextAPI.getInstance();
          class l {
            startSpan(e3, t4, r3 = s.active()) {
              if (null == t4 ? void 0 : t4.root)
                return new a2.NonRecordingSpan();
              let n3 = r3 && (0, i2.getSpanContext)(r3);
              return "object" == typeof n3 && "string" == typeof n3.spanId && "string" == typeof n3.traceId && "number" == typeof n3.traceFlags && (0, o.isSpanContextValid)(n3) ? new a2.NonRecordingSpan(n3) : new a2.NonRecordingSpan();
            }
            startActiveSpan(e3, t4, r3, n3) {
              let a3, o2, l2;
              if (arguments.length < 2)
                return;
              2 == arguments.length ? l2 = t4 : 3 == arguments.length ? (a3 = t4, l2 = r3) : (a3 = t4, o2 = r3, l2 = n3);
              let u = null != o2 ? o2 : s.active(), c = this.startSpan(e3, a3, u), d = (0, i2.setSpan)(u, c);
              return s.with(d, l2, void 0, c);
            }
          }
          t3.NoopTracer = l;
        }, 124: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.NoopTracerProvider = void 0;
          let n2 = r2(614);
          class i2 {
            getTracer(e3, t4, r3) {
              return new n2.NoopTracer();
            }
          }
          t3.NoopTracerProvider = i2;
        }, 125: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracer = void 0;
          let n2 = new (r2(614)).NoopTracer();
          class i2 {
            constructor(e3, t4, r3, n3) {
              this._provider = e3, this.name = t4, this.version = r3, this.options = n3;
            }
            startSpan(e3, t4, r3) {
              return this._getTracer().startSpan(e3, t4, r3);
            }
            startActiveSpan(e3, t4, r3, n3) {
              let i3 = this._getTracer();
              return Reflect.apply(i3.startActiveSpan, i3, arguments);
            }
            _getTracer() {
              if (this._delegate)
                return this._delegate;
              let e3 = this._provider.getDelegateTracer(this.name, this.version, this.options);
              return e3 ? (this._delegate = e3, this._delegate) : n2;
            }
          }
          t3.ProxyTracer = i2;
        }, 846: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.ProxyTracerProvider = void 0;
          let n2 = r2(125), i2 = new (r2(124)).NoopTracerProvider();
          class a2 {
            getTracer(e3, t4, r3) {
              var i3;
              return null !== (i3 = this.getDelegateTracer(e3, t4, r3)) && void 0 !== i3 ? i3 : new n2.ProxyTracer(this, e3, t4, r3);
            }
            getDelegate() {
              var e3;
              return null !== (e3 = this._delegate) && void 0 !== e3 ? e3 : i2;
            }
            setDelegate(e3) {
              this._delegate = e3;
            }
            getDelegateTracer(e3, t4, r3) {
              var n3;
              return null === (n3 = this._delegate) || void 0 === n3 ? void 0 : n3.getTracer(e3, t4, r3);
            }
          }
          t3.ProxyTracerProvider = a2;
        }, 996: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SamplingDecision = void 0, function(e3) {
            e3[e3.NOT_RECORD = 0] = "NOT_RECORD", e3[e3.RECORD = 1] = "RECORD", e3[e3.RECORD_AND_SAMPLED = 2] = "RECORD_AND_SAMPLED";
          }(t3.SamplingDecision || (t3.SamplingDecision = {}));
        }, 607: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.getSpanContext = t3.setSpanContext = t3.deleteSpan = t3.setSpan = t3.getActiveSpan = t3.getSpan = void 0;
          let n2 = r2(780), i2 = r2(403), a2 = r2(491), o = (0, n2.createContextKey)("OpenTelemetry Context Key SPAN");
          function s(e3) {
            return e3.getValue(o) || void 0;
          }
          function l(e3, t4) {
            return e3.setValue(o, t4);
          }
          t3.getSpan = s, t3.getActiveSpan = function() {
            return s(a2.ContextAPI.getInstance().active());
          }, t3.setSpan = l, t3.deleteSpan = function(e3) {
            return e3.deleteValue(o);
          }, t3.setSpanContext = function(e3, t4) {
            return l(e3, new i2.NonRecordingSpan(t4));
          }, t3.getSpanContext = function(e3) {
            var t4;
            return null === (t4 = s(e3)) || void 0 === t4 ? void 0 : t4.spanContext();
          };
        }, 325: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceStateImpl = void 0;
          let n2 = r2(564);
          class i2 {
            constructor(e3) {
              this._internalState = /* @__PURE__ */ new Map(), e3 && this._parse(e3);
            }
            set(e3, t4) {
              let r3 = this._clone();
              return r3._internalState.has(e3) && r3._internalState.delete(e3), r3._internalState.set(e3, t4), r3;
            }
            unset(e3) {
              let t4 = this._clone();
              return t4._internalState.delete(e3), t4;
            }
            get(e3) {
              return this._internalState.get(e3);
            }
            serialize() {
              return this._keys().reduce((e3, t4) => (e3.push(t4 + "=" + this.get(t4)), e3), []).join(",");
            }
            _parse(e3) {
              !(e3.length > 512) && (this._internalState = e3.split(",").reverse().reduce((e4, t4) => {
                let r3 = t4.trim(), i3 = r3.indexOf("=");
                if (-1 !== i3) {
                  let a2 = r3.slice(0, i3), o = r3.slice(i3 + 1, t4.length);
                  (0, n2.validateKey)(a2) && (0, n2.validateValue)(o) && e4.set(a2, o);
                }
                return e4;
              }, /* @__PURE__ */ new Map()), this._internalState.size > 32 && (this._internalState = new Map(Array.from(this._internalState.entries()).reverse().slice(0, 32))));
            }
            _keys() {
              return Array.from(this._internalState.keys()).reverse();
            }
            _clone() {
              let e3 = new i2();
              return e3._internalState = new Map(this._internalState), e3;
            }
          }
          t3.TraceStateImpl = i2;
        }, 564: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.validateValue = t3.validateKey = void 0;
          let r2 = "[_0-9a-z-*/]", n2 = `[a-z]${r2}{0,255}`, i2 = `[a-z0-9]${r2}{0,240}@[a-z]${r2}{0,13}`, a2 = RegExp(`^(?:${n2}|${i2})$`), o = /^[ -~]{0,255}[!-~]$/, s = /,|=/;
          t3.validateKey = function(e3) {
            return a2.test(e3);
          }, t3.validateValue = function(e3) {
            return o.test(e3) && !s.test(e3);
          };
        }, 98: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.createTraceState = void 0;
          let n2 = r2(325);
          t3.createTraceState = function(e3) {
            return new n2.TraceStateImpl(e3);
          };
        }, 476: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.INVALID_SPAN_CONTEXT = t3.INVALID_TRACEID = t3.INVALID_SPANID = void 0;
          let n2 = r2(475);
          t3.INVALID_SPANID = "0000000000000000", t3.INVALID_TRACEID = "00000000000000000000000000000000", t3.INVALID_SPAN_CONTEXT = { traceId: t3.INVALID_TRACEID, spanId: t3.INVALID_SPANID, traceFlags: n2.TraceFlags.NONE };
        }, 357: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanKind = void 0, function(e3) {
            e3[e3.INTERNAL = 0] = "INTERNAL", e3[e3.SERVER = 1] = "SERVER", e3[e3.CLIENT = 2] = "CLIENT", e3[e3.PRODUCER = 3] = "PRODUCER", e3[e3.CONSUMER = 4] = "CONSUMER";
          }(t3.SpanKind || (t3.SpanKind = {}));
        }, 139: (e2, t3, r2) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.wrapSpanContext = t3.isSpanContextValid = t3.isValidSpanId = t3.isValidTraceId = void 0;
          let n2 = r2(476), i2 = r2(403), a2 = /^([0-9a-f]{32})$/i, o = /^[0-9a-f]{16}$/i;
          function s(e3) {
            return a2.test(e3) && e3 !== n2.INVALID_TRACEID;
          }
          function l(e3) {
            return o.test(e3) && e3 !== n2.INVALID_SPANID;
          }
          t3.isValidTraceId = s, t3.isValidSpanId = l, t3.isSpanContextValid = function(e3) {
            return s(e3.traceId) && l(e3.spanId);
          }, t3.wrapSpanContext = function(e3) {
            return new i2.NonRecordingSpan(e3);
          };
        }, 847: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.SpanStatusCode = void 0, function(e3) {
            e3[e3.UNSET = 0] = "UNSET", e3[e3.OK = 1] = "OK", e3[e3.ERROR = 2] = "ERROR";
          }(t3.SpanStatusCode || (t3.SpanStatusCode = {}));
        }, 475: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.TraceFlags = void 0, function(e3) {
            e3[e3.NONE = 0] = "NONE", e3[e3.SAMPLED = 1] = "SAMPLED";
          }(t3.TraceFlags || (t3.TraceFlags = {}));
        }, 521: (e2, t3) => {
          Object.defineProperty(t3, "__esModule", { value: true }), t3.VERSION = void 0, t3.VERSION = "1.6.0";
        } }, n = {};
        function i(e2) {
          var r2 = n[e2];
          if (void 0 !== r2)
            return r2.exports;
          var a2 = n[e2] = { exports: {} }, o = true;
          try {
            t2[e2].call(a2.exports, a2, a2.exports, i), o = false;
          } finally {
            o && delete n[e2];
          }
          return a2.exports;
        }
        i.ab = "//";
        var a = {};
        (() => {
          Object.defineProperty(a, "__esModule", { value: true }), a.trace = a.propagation = a.metrics = a.diag = a.context = a.INVALID_SPAN_CONTEXT = a.INVALID_TRACEID = a.INVALID_SPANID = a.isValidSpanId = a.isValidTraceId = a.isSpanContextValid = a.createTraceState = a.TraceFlags = a.SpanStatusCode = a.SpanKind = a.SamplingDecision = a.ProxyTracerProvider = a.ProxyTracer = a.defaultTextMapSetter = a.defaultTextMapGetter = a.ValueType = a.createNoopMeter = a.DiagLogLevel = a.DiagConsoleLogger = a.ROOT_CONTEXT = a.createContextKey = a.baggageEntryMetadataFromString = void 0;
          var e2 = i(369);
          Object.defineProperty(a, "baggageEntryMetadataFromString", { enumerable: true, get: function() {
            return e2.baggageEntryMetadataFromString;
          } });
          var t3 = i(780);
          Object.defineProperty(a, "createContextKey", { enumerable: true, get: function() {
            return t3.createContextKey;
          } }), Object.defineProperty(a, "ROOT_CONTEXT", { enumerable: true, get: function() {
            return t3.ROOT_CONTEXT;
          } });
          var r2 = i(972);
          Object.defineProperty(a, "DiagConsoleLogger", { enumerable: true, get: function() {
            return r2.DiagConsoleLogger;
          } });
          var n2 = i(957);
          Object.defineProperty(a, "DiagLogLevel", { enumerable: true, get: function() {
            return n2.DiagLogLevel;
          } });
          var o = i(102);
          Object.defineProperty(a, "createNoopMeter", { enumerable: true, get: function() {
            return o.createNoopMeter;
          } });
          var s = i(901);
          Object.defineProperty(a, "ValueType", { enumerable: true, get: function() {
            return s.ValueType;
          } });
          var l = i(194);
          Object.defineProperty(a, "defaultTextMapGetter", { enumerable: true, get: function() {
            return l.defaultTextMapGetter;
          } }), Object.defineProperty(a, "defaultTextMapSetter", { enumerable: true, get: function() {
            return l.defaultTextMapSetter;
          } });
          var u = i(125);
          Object.defineProperty(a, "ProxyTracer", { enumerable: true, get: function() {
            return u.ProxyTracer;
          } });
          var c = i(846);
          Object.defineProperty(a, "ProxyTracerProvider", { enumerable: true, get: function() {
            return c.ProxyTracerProvider;
          } });
          var d = i(996);
          Object.defineProperty(a, "SamplingDecision", { enumerable: true, get: function() {
            return d.SamplingDecision;
          } });
          var h = i(357);
          Object.defineProperty(a, "SpanKind", { enumerable: true, get: function() {
            return h.SpanKind;
          } });
          var f = i(847);
          Object.defineProperty(a, "SpanStatusCode", { enumerable: true, get: function() {
            return f.SpanStatusCode;
          } });
          var p = i(475);
          Object.defineProperty(a, "TraceFlags", { enumerable: true, get: function() {
            return p.TraceFlags;
          } });
          var g = i(98);
          Object.defineProperty(a, "createTraceState", { enumerable: true, get: function() {
            return g.createTraceState;
          } });
          var m = i(139);
          Object.defineProperty(a, "isSpanContextValid", { enumerable: true, get: function() {
            return m.isSpanContextValid;
          } }), Object.defineProperty(a, "isValidTraceId", { enumerable: true, get: function() {
            return m.isValidTraceId;
          } }), Object.defineProperty(a, "isValidSpanId", { enumerable: true, get: function() {
            return m.isValidSpanId;
          } });
          var v = i(476);
          Object.defineProperty(a, "INVALID_SPANID", { enumerable: true, get: function() {
            return v.INVALID_SPANID;
          } }), Object.defineProperty(a, "INVALID_TRACEID", { enumerable: true, get: function() {
            return v.INVALID_TRACEID;
          } }), Object.defineProperty(a, "INVALID_SPAN_CONTEXT", { enumerable: true, get: function() {
            return v.INVALID_SPAN_CONTEXT;
          } });
          let y = i(67);
          Object.defineProperty(a, "context", { enumerable: true, get: function() {
            return y.context;
          } });
          let _ = i(506);
          Object.defineProperty(a, "diag", { enumerable: true, get: function() {
            return _.diag;
          } });
          let b = i(886);
          Object.defineProperty(a, "metrics", { enumerable: true, get: function() {
            return b.metrics;
          } });
          let w = i(939);
          Object.defineProperty(a, "propagation", { enumerable: true, get: function() {
            return w.propagation;
          } });
          let S = i(845);
          Object.defineProperty(a, "trace", { enumerable: true, get: function() {
            return S.trace;
          } }), a.default = { context: y.context, diag: _.diag, metrics: b.metrics, propagation: w.propagation, trace: S.trace };
        })(), e.exports = a;
      })();
    }, 8503: (e) => {
      (() => {
        "use strict";
        "undefined" != typeof __nccwpck_require__ && (__nccwpck_require__.ab = "//");
        var t = {};
        (() => {
          t.parse = function(t2, r2) {
            if ("string" != typeof t2)
              throw TypeError("argument str must be a string");
            for (var i2 = {}, a = t2.split(n), o = (r2 || {}).decode || e2, s = 0; s < a.length; s++) {
              var l = a[s], u = l.indexOf("=");
              if (!(u < 0)) {
                var c = l.substr(0, u).trim(), d = l.substr(++u, l.length).trim();
                '"' == d[0] && (d = d.slice(1, -1)), void 0 == i2[c] && (i2[c] = function(e3, t3) {
                  try {
                    return t3(e3);
                  } catch (t4) {
                    return e3;
                  }
                }(d, o));
              }
            }
            return i2;
          }, t.serialize = function(e3, t2, n2) {
            var a = n2 || {}, o = a.encode || r;
            if ("function" != typeof o)
              throw TypeError("option encode is invalid");
            if (!i.test(e3))
              throw TypeError("argument name is invalid");
            var s = o(t2);
            if (s && !i.test(s))
              throw TypeError("argument val is invalid");
            var l = e3 + "=" + s;
            if (null != a.maxAge) {
              var u = a.maxAge - 0;
              if (isNaN(u) || !isFinite(u))
                throw TypeError("option maxAge is invalid");
              l += "; Max-Age=" + Math.floor(u);
            }
            if (a.domain) {
              if (!i.test(a.domain))
                throw TypeError("option domain is invalid");
              l += "; Domain=" + a.domain;
            }
            if (a.path) {
              if (!i.test(a.path))
                throw TypeError("option path is invalid");
              l += "; Path=" + a.path;
            }
            if (a.expires) {
              if ("function" != typeof a.expires.toUTCString)
                throw TypeError("option expires is invalid");
              l += "; Expires=" + a.expires.toUTCString();
            }
            if (a.httpOnly && (l += "; HttpOnly"), a.secure && (l += "; Secure"), a.sameSite)
              switch ("string" == typeof a.sameSite ? a.sameSite.toLowerCase() : a.sameSite) {
                case true:
                case "strict":
                  l += "; SameSite=Strict";
                  break;
                case "lax":
                  l += "; SameSite=Lax";
                  break;
                case "none":
                  l += "; SameSite=None";
                  break;
                default:
                  throw TypeError("option sameSite is invalid");
              }
            return l;
          };
          var e2 = decodeURIComponent, r = encodeURIComponent, n = /; */, i = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
        })(), e.exports = t;
      })();
    }, 5541: (e) => {
      (() => {
        "use strict";
        var t = { 993: (e2) => {
          var t2 = Object.prototype.hasOwnProperty, r2 = "~";
          function n2() {
          }
          function i2(e3, t3, r3) {
            this.fn = e3, this.context = t3, this.once = r3 || false;
          }
          function a(e3, t3, n3, a2, o2) {
            if ("function" != typeof n3)
              throw TypeError("The listener must be a function");
            var s2 = new i2(n3, a2 || e3, o2), l = r2 ? r2 + t3 : t3;
            return e3._events[l] ? e3._events[l].fn ? e3._events[l] = [e3._events[l], s2] : e3._events[l].push(s2) : (e3._events[l] = s2, e3._eventsCount++), e3;
          }
          function o(e3, t3) {
            0 == --e3._eventsCount ? e3._events = new n2() : delete e3._events[t3];
          }
          function s() {
            this._events = new n2(), this._eventsCount = 0;
          }
          Object.create && (n2.prototype = /* @__PURE__ */ Object.create(null), new n2().__proto__ || (r2 = false)), s.prototype.eventNames = function() {
            var e3, n3, i3 = [];
            if (0 === this._eventsCount)
              return i3;
            for (n3 in e3 = this._events)
              t2.call(e3, n3) && i3.push(r2 ? n3.slice(1) : n3);
            return Object.getOwnPropertySymbols ? i3.concat(Object.getOwnPropertySymbols(e3)) : i3;
          }, s.prototype.listeners = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            if (!n3)
              return [];
            if (n3.fn)
              return [n3.fn];
            for (var i3 = 0, a2 = n3.length, o2 = Array(a2); i3 < a2; i3++)
              o2[i3] = n3[i3].fn;
            return o2;
          }, s.prototype.listenerCount = function(e3) {
            var t3 = r2 ? r2 + e3 : e3, n3 = this._events[t3];
            return n3 ? n3.fn ? 1 : n3.length : 0;
          }, s.prototype.emit = function(e3, t3, n3, i3, a2, o2) {
            var s2 = r2 ? r2 + e3 : e3;
            if (!this._events[s2])
              return false;
            var l, u, c = this._events[s2], d = arguments.length;
            if (c.fn) {
              switch (c.once && this.removeListener(e3, c.fn, void 0, true), d) {
                case 1:
                  return c.fn.call(c.context), true;
                case 2:
                  return c.fn.call(c.context, t3), true;
                case 3:
                  return c.fn.call(c.context, t3, n3), true;
                case 4:
                  return c.fn.call(c.context, t3, n3, i3), true;
                case 5:
                  return c.fn.call(c.context, t3, n3, i3, a2), true;
                case 6:
                  return c.fn.call(c.context, t3, n3, i3, a2, o2), true;
              }
              for (u = 1, l = Array(d - 1); u < d; u++)
                l[u - 1] = arguments[u];
              c.fn.apply(c.context, l);
            } else {
              var h, f = c.length;
              for (u = 0; u < f; u++)
                switch (c[u].once && this.removeListener(e3, c[u].fn, void 0, true), d) {
                  case 1:
                    c[u].fn.call(c[u].context);
                    break;
                  case 2:
                    c[u].fn.call(c[u].context, t3);
                    break;
                  case 3:
                    c[u].fn.call(c[u].context, t3, n3);
                    break;
                  case 4:
                    c[u].fn.call(c[u].context, t3, n3, i3);
                    break;
                  default:
                    if (!l)
                      for (h = 1, l = Array(d - 1); h < d; h++)
                        l[h - 1] = arguments[h];
                    c[u].fn.apply(c[u].context, l);
                }
            }
            return true;
          }, s.prototype.on = function(e3, t3, r3) {
            return a(this, e3, t3, r3, false);
          }, s.prototype.once = function(e3, t3, r3) {
            return a(this, e3, t3, r3, true);
          }, s.prototype.removeListener = function(e3, t3, n3, i3) {
            var a2 = r2 ? r2 + e3 : e3;
            if (!this._events[a2])
              return this;
            if (!t3)
              return o(this, a2), this;
            var s2 = this._events[a2];
            if (s2.fn)
              s2.fn !== t3 || i3 && !s2.once || n3 && s2.context !== n3 || o(this, a2);
            else {
              for (var l = 0, u = [], c = s2.length; l < c; l++)
                (s2[l].fn !== t3 || i3 && !s2[l].once || n3 && s2[l].context !== n3) && u.push(s2[l]);
              u.length ? this._events[a2] = 1 === u.length ? u[0] : u : o(this, a2);
            }
            return this;
          }, s.prototype.removeAllListeners = function(e3) {
            var t3;
            return e3 ? (t3 = r2 ? r2 + e3 : e3, this._events[t3] && o(this, t3)) : (this._events = new n2(), this._eventsCount = 0), this;
          }, s.prototype.off = s.prototype.removeListener, s.prototype.addListener = s.prototype.on, s.prefixed = r2, s.EventEmitter = s, e2.exports = s;
        }, 213: (e2) => {
          e2.exports = (e3, t2) => (t2 = t2 || (() => {
          }), e3.then((e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => e4), (e4) => new Promise((e5) => {
            e5(t2());
          }).then(() => {
            throw e4;
          })));
        }, 574: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.default = function(e3, t3, r2) {
            let n2 = 0, i2 = e3.length;
            for (; i2 > 0; ) {
              let a = i2 / 2 | 0, o = n2 + a;
              0 >= r2(e3[o], t3) ? (n2 = ++o, i2 -= a + 1) : i2 = a;
            }
            return n2;
          };
        }, 821: (e2, t2, r2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          let n2 = r2(574);
          class i2 {
            constructor() {
              this._queue = [];
            }
            enqueue(e3, t3) {
              let r3 = { priority: (t3 = Object.assign({ priority: 0 }, t3)).priority, run: e3 };
              if (this.size && this._queue[this.size - 1].priority >= t3.priority) {
                this._queue.push(r3);
                return;
              }
              let i3 = n2.default(this._queue, r3, (e4, t4) => t4.priority - e4.priority);
              this._queue.splice(i3, 0, r3);
            }
            dequeue() {
              let e3 = this._queue.shift();
              return null == e3 ? void 0 : e3.run;
            }
            filter(e3) {
              return this._queue.filter((t3) => t3.priority === e3.priority).map((e4) => e4.run);
            }
            get size() {
              return this._queue.length;
            }
          }
          t2.default = i2;
        }, 816: (e2, t2, r2) => {
          let n2 = r2(213);
          class i2 extends Error {
            constructor(e3) {
              super(e3), this.name = "TimeoutError";
            }
          }
          let a = (e3, t3, r3) => new Promise((a2, o) => {
            if ("number" != typeof t3 || t3 < 0)
              throw TypeError("Expected `milliseconds` to be a positive number");
            if (t3 === 1 / 0) {
              a2(e3);
              return;
            }
            let s = setTimeout(() => {
              if ("function" == typeof r3) {
                try {
                  a2(r3());
                } catch (e4) {
                  o(e4);
                }
                return;
              }
              let n3 = "string" == typeof r3 ? r3 : `Promise timed out after ${t3} milliseconds`, s2 = r3 instanceof Error ? r3 : new i2(n3);
              "function" == typeof e3.cancel && e3.cancel(), o(s2);
            }, t3);
            n2(e3.then(a2, o), () => {
              clearTimeout(s);
            });
          });
          e2.exports = a, e2.exports.default = a, e2.exports.TimeoutError = i2;
        } }, r = {};
        function n(e2) {
          var i2 = r[e2];
          if (void 0 !== i2)
            return i2.exports;
          var a = r[e2] = { exports: {} }, o = true;
          try {
            t[e2](a, a.exports, n), o = false;
          } finally {
            o && delete r[e2];
          }
          return a.exports;
        }
        n.ab = "//";
        var i = {};
        (() => {
          Object.defineProperty(i, "__esModule", { value: true });
          let e2 = n(993), t2 = n(816), r2 = n(821), a = () => {
          }, o = new t2.TimeoutError();
          class s extends e2 {
            constructor(e3) {
              var t3, n2, i2, o2;
              if (super(), this._intervalCount = 0, this._intervalEnd = 0, this._pendingCount = 0, this._resolveEmpty = a, this._resolveIdle = a, !("number" == typeof (e3 = Object.assign({ carryoverConcurrencyCount: false, intervalCap: 1 / 0, interval: 0, concurrency: 1 / 0, autoStart: true, queueClass: r2.default }, e3)).intervalCap && e3.intervalCap >= 1))
                throw TypeError(`Expected \`intervalCap\` to be a number from 1 and up, got \`${null !== (n2 = null === (t3 = e3.intervalCap) || void 0 === t3 ? void 0 : t3.toString()) && void 0 !== n2 ? n2 : ""}\` (${typeof e3.intervalCap})`);
              if (void 0 === e3.interval || !(Number.isFinite(e3.interval) && e3.interval >= 0))
                throw TypeError(`Expected \`interval\` to be a finite number >= 0, got \`${null !== (o2 = null === (i2 = e3.interval) || void 0 === i2 ? void 0 : i2.toString()) && void 0 !== o2 ? o2 : ""}\` (${typeof e3.interval})`);
              this._carryoverConcurrencyCount = e3.carryoverConcurrencyCount, this._isIntervalIgnored = e3.intervalCap === 1 / 0 || 0 === e3.interval, this._intervalCap = e3.intervalCap, this._interval = e3.interval, this._queue = new e3.queueClass(), this._queueClass = e3.queueClass, this.concurrency = e3.concurrency, this._timeout = e3.timeout, this._throwOnTimeout = true === e3.throwOnTimeout, this._isPaused = false === e3.autoStart;
            }
            get _doesIntervalAllowAnother() {
              return this._isIntervalIgnored || this._intervalCount < this._intervalCap;
            }
            get _doesConcurrentAllowAnother() {
              return this._pendingCount < this._concurrency;
            }
            _next() {
              this._pendingCount--, this._tryToStartAnother(), this.emit("next");
            }
            _resolvePromises() {
              this._resolveEmpty(), this._resolveEmpty = a, 0 === this._pendingCount && (this._resolveIdle(), this._resolveIdle = a, this.emit("idle"));
            }
            _onResumeInterval() {
              this._onInterval(), this._initializeIntervalIfNeeded(), this._timeoutId = void 0;
            }
            _isIntervalPaused() {
              let e3 = Date.now();
              if (void 0 === this._intervalId) {
                let t3 = this._intervalEnd - e3;
                if (!(t3 < 0))
                  return void 0 === this._timeoutId && (this._timeoutId = setTimeout(() => {
                    this._onResumeInterval();
                  }, t3)), true;
                this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0;
              }
              return false;
            }
            _tryToStartAnother() {
              if (0 === this._queue.size)
                return this._intervalId && clearInterval(this._intervalId), this._intervalId = void 0, this._resolvePromises(), false;
              if (!this._isPaused) {
                let e3 = !this._isIntervalPaused();
                if (this._doesIntervalAllowAnother && this._doesConcurrentAllowAnother) {
                  let t3 = this._queue.dequeue();
                  return !!t3 && (this.emit("active"), t3(), e3 && this._initializeIntervalIfNeeded(), true);
                }
              }
              return false;
            }
            _initializeIntervalIfNeeded() {
              this._isIntervalIgnored || void 0 !== this._intervalId || (this._intervalId = setInterval(() => {
                this._onInterval();
              }, this._interval), this._intervalEnd = Date.now() + this._interval);
            }
            _onInterval() {
              0 === this._intervalCount && 0 === this._pendingCount && this._intervalId && (clearInterval(this._intervalId), this._intervalId = void 0), this._intervalCount = this._carryoverConcurrencyCount ? this._pendingCount : 0, this._processQueue();
            }
            _processQueue() {
              for (; this._tryToStartAnother(); )
                ;
            }
            get concurrency() {
              return this._concurrency;
            }
            set concurrency(e3) {
              if (!("number" == typeof e3 && e3 >= 1))
                throw TypeError(`Expected \`concurrency\` to be a number from 1 and up, got \`${e3}\` (${typeof e3})`);
              this._concurrency = e3, this._processQueue();
            }
            async add(e3, r3 = {}) {
              return new Promise((n2, i2) => {
                let a2 = async () => {
                  this._pendingCount++, this._intervalCount++;
                  try {
                    let a3 = void 0 === this._timeout && void 0 === r3.timeout ? e3() : t2.default(Promise.resolve(e3()), void 0 === r3.timeout ? this._timeout : r3.timeout, () => {
                      (void 0 === r3.throwOnTimeout ? this._throwOnTimeout : r3.throwOnTimeout) && i2(o);
                    });
                    n2(await a3);
                  } catch (e4) {
                    i2(e4);
                  }
                  this._next();
                };
                this._queue.enqueue(a2, r3), this._tryToStartAnother(), this.emit("add");
              });
            }
            async addAll(e3, t3) {
              return Promise.all(e3.map(async (e4) => this.add(e4, t3)));
            }
            start() {
              return this._isPaused && (this._isPaused = false, this._processQueue()), this;
            }
            pause() {
              this._isPaused = true;
            }
            clear() {
              this._queue = new this._queueClass();
            }
            async onEmpty() {
              if (0 !== this._queue.size)
                return new Promise((e3) => {
                  let t3 = this._resolveEmpty;
                  this._resolveEmpty = () => {
                    t3(), e3();
                  };
                });
            }
            async onIdle() {
              if (0 !== this._pendingCount || 0 !== this._queue.size)
                return new Promise((e3) => {
                  let t3 = this._resolveIdle;
                  this._resolveIdle = () => {
                    t3(), e3();
                  };
                });
            }
            get size() {
              return this._queue.size;
            }
            sizeBy(e3) {
              return this._queue.filter(e3).length;
            }
            get pending() {
              return this._pendingCount;
            }
            get isPaused() {
              return this._isPaused;
            }
            get timeout() {
              return this._timeout;
            }
            set timeout(e3) {
              this._timeout = e3;
            }
          }
          i.default = s;
        })(), e.exports = i;
      })();
    }, 1432: (e, t, r) => {
      "use strict";
      var n = r(3886);
      function i() {
      }
      var a = { d: { f: i, r: function() {
        throw Error("Invalid form element. requestFormReset must be passed a form that was rendered by React.");
      }, D: i, C: i, L: i, m: i, X: i, S: i, M: i }, p: 0, findDOMNode: null };
      if (!n.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE)
        throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      function o(e2, t2) {
        return "font" === e2 ? "" : "string" == typeof t2 ? "use-credentials" === t2 ? t2 : "" : void 0;
      }
      t.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, t.preconnect = function(e2, t2) {
        "string" == typeof e2 && (t2 = t2 ? "string" == typeof (t2 = t2.crossOrigin) ? "use-credentials" === t2 ? t2 : "" : void 0 : null, a.d.C(e2, t2));
      }, t.prefetchDNS = function(e2) {
        "string" == typeof e2 && a.d.D(e2);
      }, t.preinit = function(e2, t2) {
        if ("string" == typeof e2 && t2 && "string" == typeof t2.as) {
          var r2 = t2.as, n2 = o(r2, t2.crossOrigin), i2 = "string" == typeof t2.integrity ? t2.integrity : void 0, s = "string" == typeof t2.fetchPriority ? t2.fetchPriority : void 0;
          "style" === r2 ? a.d.S(e2, "string" == typeof t2.precedence ? t2.precedence : void 0, { crossOrigin: n2, integrity: i2, fetchPriority: s }) : "script" === r2 && a.d.X(e2, { crossOrigin: n2, integrity: i2, fetchPriority: s, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0 });
        }
      }, t.preinitModule = function(e2, t2) {
        if ("string" == typeof e2) {
          if ("object" == typeof t2 && null !== t2) {
            if (null == t2.as || "script" === t2.as) {
              var r2 = o(t2.as, t2.crossOrigin);
              a.d.M(e2, { crossOrigin: r2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0 });
            }
          } else
            null == t2 && a.d.M(e2);
        }
      }, t.preload = function(e2, t2) {
        if ("string" == typeof e2 && "object" == typeof t2 && null !== t2 && "string" == typeof t2.as) {
          var r2 = t2.as, n2 = o(r2, t2.crossOrigin);
          a.d.L(e2, r2, { crossOrigin: n2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0, nonce: "string" == typeof t2.nonce ? t2.nonce : void 0, type: "string" == typeof t2.type ? t2.type : void 0, fetchPriority: "string" == typeof t2.fetchPriority ? t2.fetchPriority : void 0, referrerPolicy: "string" == typeof t2.referrerPolicy ? t2.referrerPolicy : void 0, imageSrcSet: "string" == typeof t2.imageSrcSet ? t2.imageSrcSet : void 0, imageSizes: "string" == typeof t2.imageSizes ? t2.imageSizes : void 0, media: "string" == typeof t2.media ? t2.media : void 0 });
        }
      }, t.preloadModule = function(e2, t2) {
        if ("string" == typeof e2) {
          if (t2) {
            var r2 = o(t2.as, t2.crossOrigin);
            a.d.m(e2, { as: "string" == typeof t2.as && "script" !== t2.as ? t2.as : void 0, crossOrigin: r2, integrity: "string" == typeof t2.integrity ? t2.integrity : void 0 });
          } else
            a.d.m(e2);
        }
      }, t.version = "19.0.0-rc-65e06cb7-20241218";
    }, 3042: (e, t, r) => {
      "use strict";
      e.exports = r(1432);
    }, 3426: (e, t, r) => {
      "use strict";
      var n = r(3042), i = r(3886);
      function a(e10) {
        tv(function() {
          throw e10;
        });
      }
      var o = Promise, s = "function" == typeof queueMicrotask ? queueMicrotask : function(e10) {
        o.resolve(null).then(e10).catch(a);
      }, l = null, u = 0;
      function c(e10, t2) {
        if (0 !== t2.byteLength) {
          if (2048 < t2.byteLength)
            0 < u && (e10.enqueue(new Uint8Array(l.buffer, 0, u)), l = new Uint8Array(2048), u = 0), e10.enqueue(t2);
          else {
            var r2 = l.length - u;
            r2 < t2.byteLength && (0 === r2 ? e10.enqueue(l) : (l.set(t2.subarray(0, r2), u), e10.enqueue(l), t2 = t2.subarray(r2)), l = new Uint8Array(2048), u = 0), l.set(t2, u), u += t2.byteLength;
          }
        }
        return true;
      }
      var d = new TextEncoder();
      function h(e10) {
        return d.encode(e10);
      }
      function f(e10) {
        return e10.byteLength;
      }
      function p(e10, t2) {
        "function" == typeof e10.error ? e10.error(t2) : e10.close();
      }
      var g = Symbol.for("react.client.reference"), m = Symbol.for("react.server.reference");
      function v(e10, t2, r2) {
        return Object.defineProperties(e10, { $$typeof: { value: g }, $$id: { value: t2 }, $$async: { value: r2 } });
      }
      var y = Function.prototype.bind, _ = Array.prototype.slice;
      function b() {
        var e10 = y.apply(this, arguments);
        if (this.$$typeof === m) {
          var t2 = _.call(arguments, 1);
          return Object.defineProperties(e10, { $$typeof: { value: m }, $$id: { value: this.$$id }, $$bound: t2 = { value: this.$$bound ? this.$$bound.concat(t2) : t2 }, bind: { value: b, configurable: true } });
        }
        return e10;
      }
      var w = Promise.prototype, S = { get: function(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "$$id":
            return e10.$$id;
          case "$$async":
            return e10.$$async;
          case "name":
            return e10.name;
          case "displayName":
          case "defaultProps":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
          case "then":
            throw Error("Cannot await or return from a thenable. You cannot await a client module from a server component.");
        }
        throw Error("Cannot access " + String(e10.name) + "." + String(t2) + " on the server. You cannot dot into a client module from a server component. You can only pass the imported name through.");
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } };
      function E(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "$$id":
            return e10.$$id;
          case "$$async":
            return e10.$$async;
          case "name":
            return e10.name;
          case "defaultProps":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "__esModule":
            var r2 = e10.$$id;
            return e10.default = v(function() {
              throw Error("Attempted to call the default export of " + r2 + " from the server but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
            }, e10.$$id + "#", e10.$$async), true;
          case "then":
            if (e10.then)
              return e10.then;
            if (e10.$$async)
              return;
            var n2 = v({}, e10.$$id, true), i2 = new Proxy(n2, C);
            return e10.status = "fulfilled", e10.value = i2, e10.then = v(function(e11) {
              return Promise.resolve(e11(i2));
            }, e10.$$id + "#then", false);
        }
        if ("symbol" == typeof t2)
          throw Error("Cannot read Symbol exports. Only named exports are supported on a client module imported on the server.");
        return (n2 = e10[t2]) || (Object.defineProperty(n2 = v(function() {
          throw Error("Attempted to call " + String(t2) + "() from the server but " + String(t2) + " is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
        }, e10.$$id + "#" + t2, e10.$$async), "name", { value: t2 }), n2 = e10[t2] = new Proxy(n2, S)), n2;
      }
      var C = { get: function(e10, t2) {
        return E(e10, t2);
      }, getOwnPropertyDescriptor: function(e10, t2) {
        var r2 = Object.getOwnPropertyDescriptor(e10, t2);
        return r2 || (r2 = { value: E(e10, t2), writable: false, configurable: false, enumerable: false }, Object.defineProperty(e10, t2, r2)), r2;
      }, getPrototypeOf: function() {
        return w;
      }, set: function() {
        throw Error("Cannot assign to a client module from a server module.");
      } }, T = n.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, P = T.d;
      function x(e10) {
        if (null == e10)
          return null;
        var t2, r2 = false, n2 = {};
        for (t2 in e10)
          null != e10[t2] && (r2 = true, n2[t2] = e10[t2]);
        return r2 ? n2 : null;
      }
      T.d = { f: P.f, r: P.r, D: function(e10) {
        if ("string" == typeof e10 && e10) {
          var t2 = ey();
          if (t2) {
            var r2 = t2.hints, n2 = "D|" + e10;
            r2.has(n2) || (r2.add(n2), eb(t2, "D", e10));
          } else
            P.D(e10);
        }
      }, C: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "C|" + (null == t2 ? "null" : t2) + "|" + e10;
            n2.has(i2) || (n2.add(i2), "string" == typeof t2 ? eb(r2, "C", [e10, t2]) : eb(r2, "C", e10));
          } else
            P.C(e10, t2);
        }
      }, L: function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = ey();
          if (n2) {
            var i2 = n2.hints, a2 = "L";
            if ("image" === t2 && r2) {
              var o2 = r2.imageSrcSet, s2 = r2.imageSizes, l2 = "";
              "string" == typeof o2 && "" !== o2 ? (l2 += "[" + o2 + "]", "string" == typeof s2 && (l2 += "[" + s2 + "]")) : l2 += "[][]" + e10, a2 += "[image]" + l2;
            } else
              a2 += "[" + t2 + "]" + e10;
            i2.has(a2) || (i2.add(a2), (r2 = x(r2)) ? eb(n2, "L", [e10, t2, r2]) : eb(n2, "L", [e10, t2]));
          } else
            P.L(e10, t2, r2);
        }
      }, m: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "m|" + e10;
            if (n2.has(i2))
              return;
            return n2.add(i2), (t2 = x(t2)) ? eb(r2, "m", [e10, t2]) : eb(r2, "m", e10);
          }
          P.m(e10, t2);
        }
      }, X: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "X|" + e10;
            if (n2.has(i2))
              return;
            return n2.add(i2), (t2 = x(t2)) ? eb(r2, "X", [e10, t2]) : eb(r2, "X", e10);
          }
          P.X(e10, t2);
        }
      }, S: function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = ey();
          if (n2) {
            var i2 = n2.hints, a2 = "S|" + e10;
            if (i2.has(a2))
              return;
            return i2.add(a2), (r2 = x(r2)) ? eb(n2, "S", [e10, "string" == typeof t2 ? t2 : 0, r2]) : "string" == typeof t2 ? eb(n2, "S", [e10, t2]) : eb(n2, "S", e10);
          }
          P.S(e10, t2, r2);
        }
      }, M: function(e10, t2) {
        if ("string" == typeof e10) {
          var r2 = ey();
          if (r2) {
            var n2 = r2.hints, i2 = "M|" + e10;
            if (n2.has(i2))
              return;
            return n2.add(i2), (t2 = x(t2)) ? eb(r2, "M", [e10, t2]) : eb(r2, "M", e10);
          }
          P.M(e10, t2);
        }
      } };
      var R = "function" == typeof AsyncLocalStorage, A = R ? new AsyncLocalStorage() : null;
      "object" == typeof async_hooks && async_hooks.createHook, "object" == typeof async_hooks && async_hooks.executionAsyncId;
      var O = Symbol.for("react.temporary.reference"), M = { get: function(e10, t2) {
        switch (t2) {
          case "$$typeof":
            return e10.$$typeof;
          case "name":
          case "displayName":
          case "defaultProps":
          case "toJSON":
            return;
          case Symbol.toPrimitive:
            return Object.prototype[Symbol.toPrimitive];
          case Symbol.toStringTag:
            return Object.prototype[Symbol.toStringTag];
          case "Provider":
            throw Error("Cannot render a Client Context Provider on the Server. Instead, you can export a Client Component wrapper that itself renders a Client Context Provider.");
        }
        throw Error("Cannot access " + String(t2) + " on the server. You cannot dot into a temporary client reference from a server component. You can only pass the value through to the client.");
      }, set: function() {
        throw Error("Cannot assign to a temporary client reference from a server module.");
      } }, L = Symbol.for("react.element"), N = Symbol.for("react.transitional.element"), I = Symbol.for("react.fragment"), k = Symbol.for("react.context"), B = Symbol.for("react.forward_ref"), D = Symbol.for("react.suspense"), H = Symbol.for("react.suspense_list"), U = Symbol.for("react.memo"), j = Symbol.for("react.lazy"), q = Symbol.for("react.memo_cache_sentinel");
      Symbol.for("react.postpone");
      var G = Symbol.iterator;
      function $(e10) {
        return null === e10 || "object" != typeof e10 ? null : "function" == typeof (e10 = G && e10[G] || e10["@@iterator"]) ? e10 : null;
      }
      var F = Symbol.asyncIterator, V = Error("Suspense Exception: This is not a real error! It's an implementation detail of `use` to interrupt the current render. You must either rethrow it immediately, or move the `use` call outside of the `try/catch` block. Capturing without rethrowing will lead to unexpected behavior.\n\nTo handle async errors, wrap your component in an error boundary, or call the promise's `.catch` method and pass the result to `use`.");
      function z() {
      }
      var K = null;
      function W() {
        if (null === K)
          throw Error("Expected a suspended thenable. This is a bug in React. Please file an issue.");
        var e10 = K;
        return K = null, e10;
      }
      var X = null, Z = 0, Y = null;
      function J() {
        var e10 = Y || [];
        return Y = null, e10;
      }
      var Q = { useMemo: function(e10) {
        return e10();
      }, useCallback: function(e10) {
        return e10;
      }, useDebugValue: function() {
      }, useDeferredValue: ee, useTransition: ee, readContext: er, useContext: er, useReducer: ee, useRef: ee, useState: ee, useInsertionEffect: ee, useLayoutEffect: ee, useImperativeHandle: ee, useEffect: ee, useId: function() {
        if (null === X)
          throw Error("useId can only be used while React is rendering");
        var e10 = X.identifierCount++;
        return ":" + X.identifierPrefix + "S" + e10.toString(32) + ":";
      }, useSyncExternalStore: ee, useCacheRefresh: function() {
        return et;
      }, useMemoCache: function(e10) {
        for (var t2 = Array(e10), r2 = 0; r2 < e10; r2++)
          t2[r2] = q;
        return t2;
      }, use: function(e10) {
        if (null !== e10 && "object" == typeof e10 || "function" == typeof e10) {
          if ("function" == typeof e10.then) {
            var t2 = Z;
            return Z += 1, null === Y && (Y = []), function(e11, t3, r2) {
              switch (void 0 === (r2 = e11[r2]) ? e11.push(t3) : r2 !== t3 && (t3.then(z, z), t3 = r2), t3.status) {
                case "fulfilled":
                  return t3.value;
                case "rejected":
                  throw t3.reason;
                default:
                  switch ("string" == typeof t3.status ? t3.then(z, z) : ((e11 = t3).status = "pending", e11.then(function(e12) {
                    if ("pending" === t3.status) {
                      var r3 = t3;
                      r3.status = "fulfilled", r3.value = e12;
                    }
                  }, function(e12) {
                    if ("pending" === t3.status) {
                      var r3 = t3;
                      r3.status = "rejected", r3.reason = e12;
                    }
                  })), t3.status) {
                    case "fulfilled":
                      return t3.value;
                    case "rejected":
                      throw t3.reason;
                  }
                  throw K = t3, V;
              }
            }(Y, e10, t2);
          }
          e10.$$typeof === k && er();
        }
        if (e10.$$typeof === g) {
          if (null != e10.value && e10.value.$$typeof === k)
            throw Error("Cannot read a Client Context from a Server Component.");
          throw Error("Cannot use() an already resolved Client Reference.");
        }
        throw Error("An unsupported type was passed to use(): " + String(e10));
      } };
      function ee() {
        throw Error("This Hook is not supported in Server Components.");
      }
      function et() {
        throw Error("Refreshing the cache is not supported in Server Components.");
      }
      function er() {
        throw Error("Cannot read a Client Context from a Server Component.");
      }
      var en = { getCacheForType: function(e10) {
        var t2 = (t2 = ey()) ? t2.cache : /* @__PURE__ */ new Map(), r2 = t2.get(e10);
        return void 0 === r2 && (r2 = e10(), t2.set(e10, r2)), r2;
      } }, ei = i.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
      if (!ei)
        throw Error('The "react" package in this environment is not configured correctly. The "react-server" condition must be enabled in any environment that runs React Server Components.');
      var ea = Array.isArray, eo = Object.getPrototypeOf;
      function es(e10) {
        return Object.prototype.toString.call(e10).replace(/^\[object (.*)\]$/, function(e11, t2) {
          return t2;
        });
      }
      function el(e10) {
        switch (typeof e10) {
          case "string":
            return JSON.stringify(10 >= e10.length ? e10 : e10.slice(0, 10) + "...");
          case "object":
            if (ea(e10))
              return "[...]";
            if (null !== e10 && e10.$$typeof === eu)
              return "client";
            return "Object" === (e10 = es(e10)) ? "{...}" : e10;
          case "function":
            return e10.$$typeof === eu ? "client" : (e10 = e10.displayName || e10.name) ? "function " + e10 : "function";
          default:
            return String(e10);
        }
      }
      var eu = Symbol.for("react.client.reference");
      function ec(e10, t2) {
        var r2 = es(e10);
        if ("Object" !== r2 && "Array" !== r2)
          return r2;
        r2 = -1;
        var n2 = 0;
        if (ea(e10)) {
          for (var i2 = "[", a2 = 0; a2 < e10.length; a2++) {
            0 < a2 && (i2 += ", ");
            var o2 = e10[a2];
            o2 = "object" == typeof o2 && null !== o2 ? ec(o2) : el(o2), "" + a2 === t2 ? (r2 = i2.length, n2 = o2.length, i2 += o2) : i2 = 10 > o2.length && 40 > i2.length + o2.length ? i2 + o2 : i2 + "...";
          }
          i2 += "]";
        } else if (e10.$$typeof === N)
          i2 = "<" + function e11(t3) {
            if ("string" == typeof t3)
              return t3;
            switch (t3) {
              case D:
                return "Suspense";
              case H:
                return "SuspenseList";
            }
            if ("object" == typeof t3)
              switch (t3.$$typeof) {
                case B:
                  return e11(t3.render);
                case U:
                  return e11(t3.type);
                case j:
                  var r3 = t3._payload;
                  t3 = t3._init;
                  try {
                    return e11(t3(r3));
                  } catch (e12) {
                  }
              }
            return "";
          }(e10.type) + "/>";
        else {
          if (e10.$$typeof === eu)
            return "client";
          for (o2 = 0, i2 = "{", a2 = Object.keys(e10); o2 < a2.length; o2++) {
            0 < o2 && (i2 += ", ");
            var s2 = a2[o2], l2 = JSON.stringify(s2);
            i2 += ('"' + s2 + '"' === l2 ? s2 : l2) + ": ", l2 = "object" == typeof (l2 = e10[s2]) && null !== l2 ? ec(l2) : el(l2), s2 === t2 ? (r2 = i2.length, n2 = l2.length, i2 += l2) : i2 = 10 > l2.length && 40 > i2.length + l2.length ? i2 + l2 : i2 + "...";
          }
          i2 += "}";
        }
        return void 0 === t2 ? i2 : -1 < r2 && 0 < n2 ? "\n  " + i2 + "\n  " + (e10 = " ".repeat(r2) + "^".repeat(n2)) : "\n  " + i2;
      }
      var ed = Object.prototype, eh = JSON.stringify;
      function ef(e10) {
        console.error(e10);
      }
      function ep() {
      }
      function eg(e10, t2, r2, n2, i2, a2, o2, s2, l2, u2, c2) {
        if (null !== ei.A && ei.A !== en)
          throw Error("Currently React only supports one RSC renderer at a time.");
        ei.A = en, l2 = /* @__PURE__ */ new Set(), s2 = [];
        var d2 = /* @__PURE__ */ new Set();
        this.type = e10, this.status = 10, this.flushScheduled = false, this.destination = this.fatalError = null, this.bundlerConfig = r2, this.cache = /* @__PURE__ */ new Map(), this.pendingChunks = this.nextChunkId = 0, this.hints = d2, this.abortListeners = /* @__PURE__ */ new Set(), this.abortableTasks = l2, this.pingedTasks = s2, this.completedImportChunks = [], this.completedHintChunks = [], this.completedRegularChunks = [], this.completedErrorChunks = [], this.writtenSymbols = /* @__PURE__ */ new Map(), this.writtenClientReferences = /* @__PURE__ */ new Map(), this.writtenServerReferences = /* @__PURE__ */ new Map(), this.writtenObjects = /* @__PURE__ */ new WeakMap(), this.temporaryReferences = o2, this.identifierPrefix = i2 || "", this.identifierCount = 1, this.taintCleanupQueue = [], this.onError = void 0 === n2 ? ef : n2, this.onPostpone = void 0 === a2 ? ep : a2, this.onAllReady = u2, this.onFatalError = c2, e10 = eP(this, t2, null, false, l2), s2.push(e10);
      }
      function em() {
      }
      var ev = null;
      function ey() {
        if (ev)
          return ev;
        if (R) {
          var e10 = A.getStore();
          if (e10)
            return e10;
        }
        return null;
      }
      function e_(e10, t2, r2) {
        var n2 = eP(e10, null, t2.keyPath, t2.implicitSlot, e10.abortableTasks);
        switch (r2.status) {
          case "fulfilled":
            return n2.model = r2.value, eT(e10, n2), n2.id;
          case "rejected":
            return t2 = eI(e10, r2.reason, null), eB(e10, n2.id, t2), n2.status = 4, e10.abortableTasks.delete(n2), n2.id;
          default:
            if (12 === e10.status)
              return e10.abortableTasks.delete(n2), n2.status = 3, t2 = eh(ex(e10.fatalError)), eD(e10, n2.id, t2), n2.id;
            "string" != typeof r2.status && (r2.status = "pending", r2.then(function(e11) {
              "pending" === r2.status && (r2.status = "fulfilled", r2.value = e11);
            }, function(e11) {
              "pending" === r2.status && (r2.status = "rejected", r2.reason = e11);
            }));
        }
        return r2.then(function(t3) {
          n2.model = t3, eT(e10, n2);
        }, function(t3) {
          0 === n2.status && (t3 = eI(e10, t3, n2), eB(e10, n2.id, t3), n2.status = 4, e10.abortableTasks.delete(n2), eV(e10));
        }), n2.id;
      }
      function eb(e10, t2, r2) {
        t2 = h(":H" + t2 + (r2 = eh(r2)) + "\n"), e10.completedHintChunks.push(t2), eV(e10);
      }
      function ew(e10) {
        if ("fulfilled" === e10.status)
          return e10.value;
        if ("rejected" === e10.status)
          throw e10.reason;
        throw e10;
      }
      function eS() {
      }
      function eE(e10, t2, r2, n2, i2) {
        var a2 = t2.thenableState;
        if (t2.thenableState = null, Z = 0, Y = a2, n2 = n2(i2, void 0), 12 === e10.status)
          throw "object" == typeof n2 && null !== n2 && "function" == typeof n2.then && n2.$$typeof !== g && n2.then(eS, eS), null;
        if ("object" == typeof n2 && null !== n2 && n2.$$typeof !== g) {
          if ("function" == typeof n2.then) {
            if ("fulfilled" === (i2 = n2).status)
              return i2.value;
            n2 = function(e11) {
              switch (e11.status) {
                case "fulfilled":
                case "rejected":
                  break;
                default:
                  "string" != typeof e11.status && (e11.status = "pending", e11.then(function(t3) {
                    "pending" === e11.status && (e11.status = "fulfilled", e11.value = t3);
                  }, function(t3) {
                    "pending" === e11.status && (e11.status = "rejected", e11.reason = t3);
                  }));
              }
              return { $$typeof: j, _payload: e11, _init: ew };
            }(n2);
          }
          var o2 = $(n2);
          if (o2) {
            var s2 = n2;
            (n2 = {})[Symbol.iterator] = function() {
              return o2.call(s2);
            };
          } else if (!("function" != typeof n2[F] || "function" == typeof ReadableStream && n2 instanceof ReadableStream)) {
            var l2 = n2;
            (n2 = {})[F] = function() {
              return l2[F]();
            };
          }
        }
        return i2 = t2.keyPath, a2 = t2.implicitSlot, null !== r2 ? t2.keyPath = null === i2 ? r2 : i2 + "," + r2 : null === i2 && (t2.implicitSlot = true), e10 = eN(e10, t2, eq, "", n2), t2.keyPath = i2, t2.implicitSlot = a2, e10;
      }
      function eC(e10, t2, r2) {
        return null !== t2.keyPath ? (e10 = [N, I, t2.keyPath, { children: r2 }], t2.implicitSlot ? [e10] : e10) : r2;
      }
      function eT(e10, t2) {
        var r2 = e10.pingedTasks;
        r2.push(t2), 1 === r2.length && (e10.flushScheduled = null !== e10.destination, 21 === e10.type || 10 === e10.status ? s(function() {
          return e$(e10);
        }) : tv(function() {
          return e$(e10);
        }, 0));
      }
      function eP(e10, t2, r2, n2, i2) {
        e10.pendingChunks++;
        var a2 = e10.nextChunkId++;
        "object" != typeof t2 || null === t2 || null !== r2 || n2 || e10.writtenObjects.set(t2, ex(a2));
        var o2 = { id: a2, status: 0, model: t2, keyPath: r2, implicitSlot: n2, ping: function() {
          return eT(e10, o2);
        }, toJSON: function(t3, r3) {
          var n3 = o2.keyPath, i3 = o2.implicitSlot;
          try {
            var a3 = eN(e10, o2, this, t3, r3);
          } catch (l2) {
            if (t3 = "object" == typeof (t3 = o2.model) && null !== t3 && (t3.$$typeof === N || t3.$$typeof === j), 12 === e10.status)
              o2.status = 3, n3 = e10.fatalError, a3 = t3 ? "$L" + n3.toString(16) : ex(n3);
            else if ("object" == typeof (r3 = l2 === V ? W() : l2) && null !== r3 && "function" == typeof r3.then) {
              var s2 = (a3 = eP(e10, o2.model, o2.keyPath, o2.implicitSlot, e10.abortableTasks)).ping;
              r3.then(s2, s2), a3.thenableState = J(), o2.keyPath = n3, o2.implicitSlot = i3, a3 = t3 ? "$L" + a3.id.toString(16) : ex(a3.id);
            } else
              o2.keyPath = n3, o2.implicitSlot = i3, e10.pendingChunks++, n3 = e10.nextChunkId++, i3 = eI(e10, r3, o2), eB(e10, n3, i3), a3 = t3 ? "$L" + n3.toString(16) : ex(n3);
          }
          return a3;
        }, thenableState: null };
        return i2.add(o2), o2;
      }
      function ex(e10) {
        return "$" + e10.toString(16);
      }
      function eR(e10, t2, r2) {
        return e10 = eh(r2), h(t2 = t2.toString(16) + ":" + e10 + "\n");
      }
      function eA(e10, t2, r2, n2) {
        var i2 = n2.$$async ? n2.$$id + "#async" : n2.$$id, a2 = e10.writtenClientReferences, o2 = a2.get(i2);
        if (void 0 !== o2)
          return t2[0] === N && "1" === r2 ? "$L" + o2.toString(16) : ex(o2);
        try {
          var s2 = e10.bundlerConfig, l2 = n2.$$id;
          o2 = "";
          var u2 = s2[l2];
          if (u2)
            o2 = u2.name;
          else {
            var c2 = l2.lastIndexOf("#");
            if (-1 !== c2 && (o2 = l2.slice(c2 + 1), u2 = s2[l2.slice(0, c2)]), !u2)
              throw Error('Could not find the module "' + l2 + '" in the React Client Manifest. This is probably a bug in the React Server Components bundler.');
          }
          if (true === u2.async && true === n2.$$async)
            throw Error('The module "' + l2 + '" is marked as an async ESM module but was loaded as a CJS proxy. This is probably a bug in the React Server Components bundler.');
          var d2 = true === u2.async || true === n2.$$async ? [u2.id, u2.chunks, o2, 1] : [u2.id, u2.chunks, o2];
          e10.pendingChunks++;
          var f2 = e10.nextChunkId++, p2 = eh(d2), g2 = f2.toString(16) + ":I" + p2 + "\n", m2 = h(g2);
          return e10.completedImportChunks.push(m2), a2.set(i2, f2), t2[0] === N && "1" === r2 ? "$L" + f2.toString(16) : ex(f2);
        } catch (n3) {
          return e10.pendingChunks++, t2 = e10.nextChunkId++, r2 = eI(e10, n3, null), eB(e10, t2, r2), ex(t2);
        }
      }
      function eO(e10, t2) {
        return t2 = eP(e10, t2, null, false, e10.abortableTasks), eG(e10, t2), t2.id;
      }
      function eM(e10, t2, r2) {
        e10.pendingChunks++;
        var n2 = e10.nextChunkId++;
        return eH(e10, n2, t2, r2), ex(n2);
      }
      var eL = false;
      function eN(e10, t2, r2, n2, i2) {
        if (t2.model = i2, i2 === N)
          return "$";
        if (null === i2)
          return null;
        if ("object" == typeof i2) {
          switch (i2.$$typeof) {
            case N:
              var a2 = null, o2 = e10.writtenObjects;
              if (null === t2.keyPath && !t2.implicitSlot) {
                var s2 = o2.get(i2);
                if (void 0 !== s2) {
                  if (eL !== i2)
                    return s2;
                  eL = null;
                } else
                  -1 === n2.indexOf(":") && void 0 !== (r2 = o2.get(r2)) && (a2 = r2 + ":" + n2, o2.set(i2, a2));
              }
              return r2 = (n2 = i2.props).ref, "object" == typeof (e10 = function e11(t3, r3, n3, i3, a3, o3) {
                if (null != a3)
                  throw Error("Refs cannot be used in Server Components, nor passed to Client Components.");
                if ("function" == typeof n3 && n3.$$typeof !== g && n3.$$typeof !== O)
                  return eE(t3, r3, i3, n3, o3);
                if (n3 === I && null === i3)
                  return n3 = r3.implicitSlot, null === r3.keyPath && (r3.implicitSlot = true), o3 = eN(t3, r3, eq, "", o3.children), r3.implicitSlot = n3, o3;
                if (null != n3 && "object" == typeof n3 && n3.$$typeof !== g)
                  switch (n3.$$typeof) {
                    case j:
                      if (n3 = (0, n3._init)(n3._payload), 12 === t3.status)
                        throw null;
                      return e11(t3, r3, n3, i3, a3, o3);
                    case B:
                      return eE(t3, r3, i3, n3.render, o3);
                    case U:
                      return e11(t3, r3, n3.type, i3, a3, o3);
                  }
                return t3 = i3, i3 = r3.keyPath, null === t3 ? t3 = i3 : null !== i3 && (t3 = i3 + "," + t3), o3 = [N, n3, t3, o3], r3 = r3.implicitSlot && null !== t3 ? [o3] : o3;
              }(e10, t2, i2.type, i2.key, void 0 !== r2 ? r2 : null, n2)) && null !== e10 && null !== a2 && (o2.has(e10) || o2.set(e10, a2)), e10;
            case j:
              if (t2.thenableState = null, i2 = (n2 = i2._init)(i2._payload), 12 === e10.status)
                throw null;
              return eN(e10, t2, eq, "", i2);
            case L:
              throw Error('A React Element from an older version of React was rendered. This is not supported. It can happen if:\n- Multiple copies of the "react" package is used.\n- A library pre-bundled an old copy of "react" or "react/jsx-runtime".\n- A compiler tries to "inline" JSX instead of using the runtime.');
          }
          if (i2.$$typeof === g)
            return eA(e10, r2, n2, i2);
          if (void 0 !== e10.temporaryReferences && void 0 !== (a2 = e10.temporaryReferences.get(i2)))
            return "$T" + a2;
          if (o2 = (a2 = e10.writtenObjects).get(i2), "function" == typeof i2.then) {
            if (void 0 !== o2) {
              if (null !== t2.keyPath || t2.implicitSlot)
                return "$@" + e_(e10, t2, i2).toString(16);
              if (eL !== i2)
                return o2;
              eL = null;
            }
            return e10 = "$@" + e_(e10, t2, i2).toString(16), a2.set(i2, e10), e10;
          }
          if (void 0 !== o2) {
            if (eL !== i2)
              return o2;
            eL = null;
          } else if (-1 === n2.indexOf(":") && void 0 !== (o2 = a2.get(r2))) {
            if (s2 = n2, ea(r2) && r2[0] === N)
              switch (n2) {
                case "1":
                  s2 = "type";
                  break;
                case "2":
                  s2 = "key";
                  break;
                case "3":
                  s2 = "props";
                  break;
                case "4":
                  s2 = "_owner";
              }
            a2.set(i2, o2 + ":" + s2);
          }
          if (ea(i2))
            return eC(e10, t2, i2);
          if (i2 instanceof Map)
            return "$Q" + eO(e10, i2 = Array.from(i2)).toString(16);
          if (i2 instanceof Set)
            return "$W" + eO(e10, i2 = Array.from(i2)).toString(16);
          if ("function" == typeof FormData && i2 instanceof FormData)
            return "$K" + eO(e10, i2 = Array.from(i2.entries())).toString(16);
          if (i2 instanceof Error)
            return "$Z";
          if (i2 instanceof ArrayBuffer)
            return eM(e10, "A", new Uint8Array(i2));
          if (i2 instanceof Int8Array)
            return eM(e10, "O", i2);
          if (i2 instanceof Uint8Array)
            return eM(e10, "o", i2);
          if (i2 instanceof Uint8ClampedArray)
            return eM(e10, "U", i2);
          if (i2 instanceof Int16Array)
            return eM(e10, "S", i2);
          if (i2 instanceof Uint16Array)
            return eM(e10, "s", i2);
          if (i2 instanceof Int32Array)
            return eM(e10, "L", i2);
          if (i2 instanceof Uint32Array)
            return eM(e10, "l", i2);
          if (i2 instanceof Float32Array)
            return eM(e10, "G", i2);
          if (i2 instanceof Float64Array)
            return eM(e10, "g", i2);
          if (i2 instanceof BigInt64Array)
            return eM(e10, "M", i2);
          if (i2 instanceof BigUint64Array)
            return eM(e10, "m", i2);
          if (i2 instanceof DataView)
            return eM(e10, "V", i2);
          if ("function" == typeof Blob && i2 instanceof Blob)
            return function(e11, t3) {
              function r3(t4) {
                if (!s3) {
                  s3 = true, e11.abortListeners.delete(n3);
                  var i4 = eI(e11, t4, a3);
                  eB(e11, a3.id, i4), eV(e11), o3.cancel(t4).then(r3, r3);
                }
              }
              function n3(t4) {
                if (!s3) {
                  s3 = true, e11.abortListeners.delete(n3);
                  var i4 = eI(e11, t4, a3);
                  eB(e11, a3.id, i4), eV(e11), o3.cancel(t4).then(r3, r3);
                }
              }
              var i3 = [t3.type], a3 = eP(e11, i3, null, false, e11.abortableTasks), o3 = t3.stream().getReader(), s3 = false;
              return e11.abortListeners.add(n3), o3.read().then(function t4(l2) {
                if (!s3) {
                  if (!l2.done)
                    return i3.push(l2.value), o3.read().then(t4).catch(r3);
                  e11.abortListeners.delete(n3), s3 = true, eT(e11, a3);
                }
              }).catch(r3), "$B" + a3.id.toString(16);
            }(e10, i2);
          if (a2 = $(i2))
            return (n2 = a2.call(i2)) === i2 ? "$i" + eO(e10, Array.from(n2)).toString(16) : eC(e10, t2, Array.from(n2));
          if ("function" == typeof ReadableStream && i2 instanceof ReadableStream)
            return function(e11, t3, r3) {
              function n3(t4) {
                if (!l2) {
                  l2 = true, e11.abortListeners.delete(i3);
                  var r4 = eI(e11, t4, s3);
                  eB(e11, s3.id, r4), eV(e11), o3.cancel(t4).then(n3, n3);
                }
              }
              function i3(t4) {
                if (!l2) {
                  l2 = true, e11.abortListeners.delete(i3);
                  var r4 = eI(e11, t4, s3);
                  eB(e11, s3.id, r4), eV(e11), o3.cancel(t4).then(n3, n3);
                }
              }
              var a3 = r3.supportsBYOB;
              if (void 0 === a3)
                try {
                  r3.getReader({ mode: "byob" }).releaseLock(), a3 = true;
                } catch (e12) {
                  a3 = false;
                }
              var o3 = r3.getReader(), s3 = eP(e11, t3.model, t3.keyPath, t3.implicitSlot, e11.abortableTasks);
              e11.abortableTasks.delete(s3), e11.pendingChunks++, t3 = s3.id.toString(16) + ":" + (a3 ? "r" : "R") + "\n", e11.completedRegularChunks.push(h(t3));
              var l2 = false;
              return e11.abortListeners.add(i3), o3.read().then(function t4(r4) {
                if (!l2) {
                  if (r4.done)
                    e11.abortListeners.delete(i3), r4 = s3.id.toString(16) + ":C\n", e11.completedRegularChunks.push(h(r4)), eV(e11), l2 = true;
                  else
                    try {
                      s3.model = r4.value, e11.pendingChunks++, ej(e11, s3, s3.model), eV(e11), o3.read().then(t4, n3);
                    } catch (e12) {
                      n3(e12);
                    }
                }
              }, n3), ex(s3.id);
            }(e10, t2, i2);
          if ("function" == typeof (a2 = i2[F]))
            return null !== t2.keyPath ? (e10 = [N, I, t2.keyPath, { children: i2 }], e10 = t2.implicitSlot ? [e10] : e10) : (n2 = a2.call(i2), e10 = function(e11, t3, r3, n3) {
              function i3(t4) {
                if (!s3) {
                  s3 = true, e11.abortListeners.delete(a3);
                  var r4 = eI(e11, t4, o3);
                  eB(e11, o3.id, r4), eV(e11), "function" == typeof n3.throw && n3.throw(t4).then(i3, i3);
                }
              }
              function a3(t4) {
                if (!s3) {
                  s3 = true, e11.abortListeners.delete(a3);
                  var r4 = eI(e11, t4, o3);
                  eB(e11, o3.id, r4), eV(e11), "function" == typeof n3.throw && n3.throw(t4).then(i3, i3);
                }
              }
              r3 = r3 === n3;
              var o3 = eP(e11, t3.model, t3.keyPath, t3.implicitSlot, e11.abortableTasks);
              e11.abortableTasks.delete(o3), e11.pendingChunks++, t3 = o3.id.toString(16) + ":" + (r3 ? "x" : "X") + "\n", e11.completedRegularChunks.push(h(t3));
              var s3 = false;
              return e11.abortListeners.add(a3), n3.next().then(function t4(r4) {
                if (!s3) {
                  if (r4.done) {
                    if (e11.abortListeners.delete(a3), void 0 === r4.value)
                      var l2 = o3.id.toString(16) + ":C\n";
                    else
                      try {
                        var u2 = eO(e11, r4.value);
                        l2 = o3.id.toString(16) + ":C" + eh(ex(u2)) + "\n";
                      } catch (e12) {
                        i3(e12);
                        return;
                      }
                    e11.completedRegularChunks.push(h(l2)), eV(e11), s3 = true;
                  } else
                    try {
                      o3.model = r4.value, e11.pendingChunks++, ej(e11, o3, o3.model), eV(e11), n3.next().then(t4, i3);
                    } catch (e12) {
                      i3(e12);
                    }
                }
              }, i3), ex(o3.id);
            }(e10, t2, i2, n2)), e10;
          if (i2 instanceof Date)
            return "$D" + i2.toJSON();
          if ((e10 = eo(i2)) !== ed && (null === e10 || null !== eo(e10)))
            throw Error("Only plain objects, and a few built-ins, can be passed to Client Components from Server Components. Classes or null prototypes are not supported." + ec(r2, n2));
          return i2;
        }
        if ("string" == typeof i2)
          return "Z" === i2[i2.length - 1] && r2[n2] instanceof Date ? "$D" + i2 : 1024 <= i2.length && null !== f ? (e10.pendingChunks++, t2 = e10.nextChunkId++, eU(e10, t2, i2), ex(t2)) : e10 = "$" === i2[0] ? "$" + i2 : i2;
        if ("boolean" == typeof i2)
          return i2;
        if ("number" == typeof i2)
          return Number.isFinite(i2) ? 0 === i2 && -1 / 0 == 1 / i2 ? "$-0" : i2 : 1 / 0 === i2 ? "$Infinity" : -1 / 0 === i2 ? "$-Infinity" : "$NaN";
        if (void 0 === i2)
          return "$undefined";
        if ("function" == typeof i2) {
          if (i2.$$typeof === g)
            return eA(e10, r2, n2, i2);
          if (i2.$$typeof === m)
            return void 0 !== (n2 = (t2 = e10.writtenServerReferences).get(i2)) ? e10 = "$F" + n2.toString(16) : (n2 = null === (n2 = i2.$$bound) ? null : Promise.resolve(n2), e10 = eO(e10, { id: i2.$$id, bound: n2 }), t2.set(i2, e10), e10 = "$F" + e10.toString(16)), e10;
          if (void 0 !== e10.temporaryReferences && void 0 !== (e10 = e10.temporaryReferences.get(i2)))
            return "$T" + e10;
          if (i2.$$typeof === O)
            throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
          if (/^on[A-Z]/.test(n2))
            throw Error("Event handlers cannot be passed to Client Component props." + ec(r2, n2) + "\nIf you need interactivity, consider converting part of this to a Client Component.");
          throw Error('Functions cannot be passed directly to Client Components unless you explicitly expose it by marking it with "use server". Or maybe you meant to call this function rather than return it.' + ec(r2, n2));
        }
        if ("symbol" == typeof i2) {
          if (void 0 !== (a2 = (t2 = e10.writtenSymbols).get(i2)))
            return ex(a2);
          if (Symbol.for(a2 = i2.description) !== i2)
            throw Error("Only global symbols received from Symbol.for(...) can be passed to Client Components. The symbol Symbol.for(" + i2.description + ") cannot be found among global symbols." + ec(r2, n2));
          return e10.pendingChunks++, n2 = e10.nextChunkId++, r2 = eR(e10, n2, "$S" + a2), e10.completedImportChunks.push(r2), t2.set(i2, n2), ex(n2);
        }
        if ("bigint" == typeof i2)
          return "$n" + i2.toString(10);
        throw Error("Type " + typeof i2 + " is not supported in Client Component props." + ec(r2, n2));
      }
      function eI(e10, t2) {
        var r2 = ev;
        ev = null;
        try {
          var n2 = e10.onError, i2 = R ? A.run(void 0, n2, t2) : n2(t2);
        } finally {
          ev = r2;
        }
        if (null != i2 && "string" != typeof i2)
          throw Error('onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' + typeof i2 + '" instead');
        return i2 || "";
      }
      function ek(e10, t2) {
        (0, e10.onFatalError)(t2), null !== e10.destination ? (e10.status = 14, p(e10.destination, t2)) : (e10.status = 13, e10.fatalError = t2);
      }
      function eB(e10, t2, r2) {
        r2 = { digest: r2 }, t2 = h(t2 = t2.toString(16) + ":E" + eh(r2) + "\n"), e10.completedErrorChunks.push(t2);
      }
      function eD(e10, t2, r2) {
        t2 = h(t2 = t2.toString(16) + ":" + r2 + "\n"), e10.completedRegularChunks.push(t2);
      }
      function eH(e10, t2, r2, n2) {
        e10.pendingChunks++;
        var i2 = new Uint8Array(n2.buffer, n2.byteOffset, n2.byteLength);
        i2 = (n2 = 2048 < n2.byteLength ? i2.slice() : i2).byteLength, t2 = h(t2 = t2.toString(16) + ":" + r2 + i2.toString(16) + ","), e10.completedRegularChunks.push(t2, n2);
      }
      function eU(e10, t2, r2) {
        if (null === f)
          throw Error("Existence of byteLengthOfChunk should have already been checked. This is a bug in React.");
        e10.pendingChunks++;
        var n2 = (r2 = h(r2)).byteLength;
        t2 = h(t2 = t2.toString(16) + ":T" + n2.toString(16) + ","), e10.completedRegularChunks.push(t2, r2);
      }
      function ej(e10, t2, r2) {
        var n2 = t2.id;
        "string" == typeof r2 && null !== f ? eU(e10, n2, r2) : r2 instanceof ArrayBuffer ? eH(e10, n2, "A", new Uint8Array(r2)) : r2 instanceof Int8Array ? eH(e10, n2, "O", r2) : r2 instanceof Uint8Array ? eH(e10, n2, "o", r2) : r2 instanceof Uint8ClampedArray ? eH(e10, n2, "U", r2) : r2 instanceof Int16Array ? eH(e10, n2, "S", r2) : r2 instanceof Uint16Array ? eH(e10, n2, "s", r2) : r2 instanceof Int32Array ? eH(e10, n2, "L", r2) : r2 instanceof Uint32Array ? eH(e10, n2, "l", r2) : r2 instanceof Float32Array ? eH(e10, n2, "G", r2) : r2 instanceof Float64Array ? eH(e10, n2, "g", r2) : r2 instanceof BigInt64Array ? eH(e10, n2, "M", r2) : r2 instanceof BigUint64Array ? eH(e10, n2, "m", r2) : r2 instanceof DataView ? eH(e10, n2, "V", r2) : (r2 = eh(r2, t2.toJSON), eD(e10, t2.id, r2));
      }
      var eq = {};
      function eG(e10, t2) {
        if (0 === t2.status) {
          t2.status = 5;
          try {
            eL = t2.model;
            var r2 = eN(e10, t2, eq, "", t2.model);
            if (eL = r2, t2.keyPath = null, t2.implicitSlot = false, "object" == typeof r2 && null !== r2)
              e10.writtenObjects.set(r2, ex(t2.id)), ej(e10, t2, r2);
            else {
              var n2 = eh(r2);
              eD(e10, t2.id, n2);
            }
            e10.abortableTasks.delete(t2), t2.status = 1;
          } catch (r3) {
            if (12 === e10.status) {
              e10.abortableTasks.delete(t2), t2.status = 3;
              var i2 = eh(ex(e10.fatalError));
              eD(e10, t2.id, i2);
            } else {
              var a2 = r3 === V ? W() : r3;
              if ("object" == typeof a2 && null !== a2 && "function" == typeof a2.then) {
                t2.status = 0, t2.thenableState = J();
                var o2 = t2.ping;
                a2.then(o2, o2);
              } else {
                e10.abortableTasks.delete(t2), t2.status = 4;
                var s2 = eI(e10, a2, t2);
                eB(e10, t2.id, s2);
              }
            }
          } finally {
          }
        }
      }
      function e$(e10) {
        var t2 = ei.H;
        ei.H = Q;
        var r2 = ev;
        X = ev = e10;
        var n2 = 0 < e10.abortableTasks.size;
        try {
          var i2 = e10.pingedTasks;
          e10.pingedTasks = [];
          for (var a2 = 0; a2 < i2.length; a2++)
            eG(e10, i2[a2]);
          null !== e10.destination && eF(e10, e10.destination), n2 && 0 === e10.abortableTasks.size && (0, e10.onAllReady)();
        } catch (t3) {
          eI(e10, t3, null), ek(e10, t3);
        } finally {
          ei.H = t2, X = null, ev = r2;
        }
      }
      function eF(e10, t2) {
        l = new Uint8Array(2048), u = 0;
        try {
          for (var r2 = e10.completedImportChunks, n2 = 0; n2 < r2.length; n2++)
            e10.pendingChunks--, c(t2, r2[n2]);
          r2.splice(0, n2);
          var i2 = e10.completedHintChunks;
          for (n2 = 0; n2 < i2.length; n2++)
            c(t2, i2[n2]);
          i2.splice(0, n2);
          var a2 = e10.completedRegularChunks;
          for (n2 = 0; n2 < a2.length; n2++)
            e10.pendingChunks--, c(t2, a2[n2]);
          a2.splice(0, n2);
          var o2 = e10.completedErrorChunks;
          for (n2 = 0; n2 < o2.length; n2++)
            e10.pendingChunks--, c(t2, o2[n2]);
          o2.splice(0, n2);
        } finally {
          e10.flushScheduled = false, l && 0 < u && (t2.enqueue(new Uint8Array(l.buffer, 0, u)), l = null, u = 0);
        }
        0 === e10.pendingChunks && (e10.status = 14, t2.close(), e10.destination = null);
      }
      function eV(e10) {
        false === e10.flushScheduled && 0 === e10.pingedTasks.length && null !== e10.destination && (e10.flushScheduled = true, tv(function() {
          e10.flushScheduled = false;
          var t2 = e10.destination;
          t2 && eF(e10, t2);
        }, 0));
      }
      function ez(e10, t2) {
        try {
          11 >= e10.status && (e10.status = 12);
          var r2 = e10.abortableTasks;
          if (0 < r2.size) {
            var n2 = void 0 === t2 ? Error("The render was aborted by the server without a reason.") : "object" == typeof t2 && null !== t2 && "function" == typeof t2.then ? Error("The render was aborted by the server with a promise.") : t2, i2 = eI(e10, n2, null), a2 = e10.nextChunkId++;
            e10.fatalError = a2, e10.pendingChunks++, eB(e10, a2, i2, n2), r2.forEach(function(t3) {
              if (5 !== t3.status) {
                t3.status = 3;
                var r3 = ex(a2);
                t3 = eR(e10, t3.id, r3), e10.completedErrorChunks.push(t3);
              }
            }), r2.clear(), (0, e10.onAllReady)();
          }
          var o2 = e10.abortListeners;
          if (0 < o2.size) {
            var s2 = void 0 === t2 ? Error("The render was aborted by the server without a reason.") : "object" == typeof t2 && null !== t2 && "function" == typeof t2.then ? Error("The render was aborted by the server with a promise.") : t2;
            o2.forEach(function(e11) {
              return e11(s2);
            }), o2.clear();
          }
          null !== e10.destination && eF(e10, e10.destination);
        } catch (t3) {
          eI(e10, t3, null), ek(e10, t3);
        }
      }
      function eK(e10, t2) {
        var r2 = "", n2 = e10[t2];
        if (n2)
          r2 = n2.name;
        else {
          var i2 = t2.lastIndexOf("#");
          if (-1 !== i2 && (r2 = t2.slice(i2 + 1), n2 = e10[t2.slice(0, i2)]), !n2)
            throw Error('Could not find the module "' + t2 + '" in the React Server Manifest. This is probably a bug in the React Server Components bundler.');
        }
        return n2.async ? [n2.id, n2.chunks, r2, 1] : [n2.id, n2.chunks, r2];
      }
      var eW = /* @__PURE__ */ new Map();
      function eX(e10) {
        var t2 = globalThis.__next_require__(e10);
        return "function" != typeof t2.then || "fulfilled" === t2.status ? null : (t2.then(function(e11) {
          t2.status = "fulfilled", t2.value = e11;
        }, function(e11) {
          t2.status = "rejected", t2.reason = e11;
        }), t2);
      }
      function eZ() {
      }
      function eY(e10) {
        for (var t2 = e10[1], n2 = [], i2 = 0; i2 < t2.length; ) {
          var a2 = t2[i2++];
          t2[i2++];
          var o2 = eW.get(a2);
          if (void 0 === o2) {
            o2 = r.e(a2), n2.push(o2);
            var s2 = eW.set.bind(eW, a2, null);
            o2.then(s2, eZ), eW.set(a2, o2);
          } else
            null !== o2 && n2.push(o2);
        }
        return 4 === e10.length ? 0 === n2.length ? eX(e10[0]) : Promise.all(n2).then(function() {
          return eX(e10[0]);
        }) : 0 < n2.length ? Promise.all(n2) : null;
      }
      function eJ(e10) {
        var t2 = globalThis.__next_require__(e10[0]);
        if (4 === e10.length && "function" == typeof t2.then) {
          if ("fulfilled" === t2.status)
            t2 = t2.value;
          else
            throw t2.reason;
        }
        return "*" === e10[2] ? t2 : "" === e10[2] ? t2.__esModule ? t2.default : t2 : t2[e10[2]];
      }
      var eQ = Object.prototype.hasOwnProperty;
      function e0(e10, t2, r2, n2) {
        this.status = e10, this.value = t2, this.reason = r2, this._response = n2;
      }
      function e1(e10) {
        return new e0("pending", null, null, e10);
      }
      function e2(e10, t2) {
        for (var r2 = 0; r2 < e10.length; r2++)
          (0, e10[r2])(t2);
      }
      function e3(e10, t2) {
        if ("pending" !== e10.status && "blocked" !== e10.status)
          e10.reason.error(t2);
        else {
          var r2 = e10.reason;
          e10.status = "rejected", e10.reason = t2, null !== r2 && e2(r2, t2);
        }
      }
      function e6(e10, t2, r2) {
        if ("pending" !== e10.status)
          e10 = e10.reason, "C" === t2[0] ? e10.close("C" === t2 ? '"$undefined"' : t2.slice(1)) : e10.enqueueModel(t2);
        else {
          var n2 = e10.value, i2 = e10.reason;
          if (e10.status = "resolved_model", e10.value = t2, e10.reason = r2, null !== n2)
            switch (e7(e10), e10.status) {
              case "fulfilled":
                e2(n2, e10.value);
                break;
              case "pending":
              case "blocked":
              case "cyclic":
                if (e10.value)
                  for (t2 = 0; t2 < n2.length; t2++)
                    e10.value.push(n2[t2]);
                else
                  e10.value = n2;
                if (e10.reason) {
                  if (i2)
                    for (t2 = 0; t2 < i2.length; t2++)
                      e10.reason.push(i2[t2]);
                } else
                  e10.reason = i2;
                break;
              case "rejected":
                i2 && e2(i2, e10.reason);
            }
        }
      }
      function e8(e10, t2, r2) {
        return new e0("resolved_model", (r2 ? '{"done":true,"value":' : '{"done":false,"value":') + t2 + "}", -1, e10);
      }
      function e5(e10, t2, r2) {
        e6(e10, (r2 ? '{"done":true,"value":' : '{"done":false,"value":') + t2 + "}", -1);
      }
      e0.prototype = Object.create(Promise.prototype), e0.prototype.then = function(e10, t2) {
        switch ("resolved_model" === this.status && e7(this), this.status) {
          case "fulfilled":
            e10(this.value);
            break;
          case "pending":
          case "blocked":
          case "cyclic":
            e10 && (null === this.value && (this.value = []), this.value.push(e10)), t2 && (null === this.reason && (this.reason = []), this.reason.push(t2));
            break;
          default:
            t2(this.reason);
        }
      };
      var e4 = null, e9 = null;
      function e7(e10) {
        var t2 = e4, r2 = e9;
        e4 = e10, e9 = null;
        var n2 = -1 === e10.reason ? void 0 : e10.reason.toString(16), i2 = e10.value;
        e10.status = "cyclic", e10.value = null, e10.reason = null;
        try {
          var a2 = JSON.parse(i2), o2 = function e11(t3, r3, n3, i3, a3) {
            if ("string" == typeof i3)
              return function(e12, t4, r4, n4, i4) {
                if ("$" === n4[0]) {
                  switch (n4[1]) {
                    case "$":
                      return n4.slice(1);
                    case "@":
                      return te(e12, t4 = parseInt(n4.slice(2), 16));
                    case "F":
                      return n4 = tn(e12, n4 = n4.slice(2), t4, r4, ts), function(e13, t5, r5, n5, i5, a5) {
                        var o5 = eK(e13._bundlerConfig, t5);
                        if (t5 = eY(o5), r5)
                          r5 = Promise.all([r5, t5]).then(function(e14) {
                            e14 = e14[0];
                            var t6 = eJ(o5);
                            return t6.bind.apply(t6, [null].concat(e14));
                          });
                        else {
                          if (!t5)
                            return eJ(o5);
                          r5 = Promise.resolve(t5).then(function() {
                            return eJ(o5);
                          });
                        }
                        return r5.then(tt(n5, i5, a5, false, e13, ts, []), tr(n5)), null;
                      }(e12, n4.id, n4.bound, e4, t4, r4);
                    case "T":
                      var a4, o4;
                      if (void 0 === i4 || void 0 === e12._temporaryReferences)
                        throw Error("Could not reference an opaque temporary reference. This is likely due to misconfiguring the temporaryReferences options on the server.");
                      return a4 = e12._temporaryReferences, o4 = new Proxy(o4 = Object.defineProperties(function() {
                        throw Error("Attempted to call a temporary Client Reference from the server but it is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
                      }, { $$typeof: { value: O } }), M), a4.set(o4, i4), o4;
                    case "Q":
                      return tn(e12, n4 = n4.slice(2), t4, r4, ti);
                    case "W":
                      return tn(e12, n4 = n4.slice(2), t4, r4, ta);
                    case "K":
                      t4 = n4.slice(2);
                      var s3 = e12._prefix + t4 + "_", l2 = new FormData();
                      return e12._formData.forEach(function(e13, t5) {
                        t5.startsWith(s3) && l2.append(t5.slice(s3.length), e13);
                      }), l2;
                    case "i":
                      return tn(e12, n4 = n4.slice(2), t4, r4, to);
                    case "I":
                      return 1 / 0;
                    case "-":
                      return "$-0" === n4 ? -0 : -1 / 0;
                    case "N":
                      return NaN;
                    case "u":
                      return;
                    case "D":
                      return new Date(Date.parse(n4.slice(2)));
                    case "n":
                      return BigInt(n4.slice(2));
                  }
                  switch (n4[1]) {
                    case "A":
                      return tl(e12, n4, ArrayBuffer, 1, t4, r4);
                    case "O":
                      return tl(e12, n4, Int8Array, 1, t4, r4);
                    case "o":
                      return tl(e12, n4, Uint8Array, 1, t4, r4);
                    case "U":
                      return tl(e12, n4, Uint8ClampedArray, 1, t4, r4);
                    case "S":
                      return tl(e12, n4, Int16Array, 2, t4, r4);
                    case "s":
                      return tl(e12, n4, Uint16Array, 2, t4, r4);
                    case "L":
                      return tl(e12, n4, Int32Array, 4, t4, r4);
                    case "l":
                      return tl(e12, n4, Uint32Array, 4, t4, r4);
                    case "G":
                      return tl(e12, n4, Float32Array, 4, t4, r4);
                    case "g":
                      return tl(e12, n4, Float64Array, 8, t4, r4);
                    case "M":
                      return tl(e12, n4, BigInt64Array, 8, t4, r4);
                    case "m":
                      return tl(e12, n4, BigUint64Array, 8, t4, r4);
                    case "V":
                      return tl(e12, n4, DataView, 1, t4, r4);
                    case "B":
                      return t4 = parseInt(n4.slice(2), 16), e12._formData.get(e12._prefix + t4);
                  }
                  switch (n4[1]) {
                    case "R":
                      return tc(e12, n4, void 0);
                    case "r":
                      return tc(e12, n4, "bytes");
                    case "X":
                      return th(e12, n4, false);
                    case "x":
                      return th(e12, n4, true);
                  }
                  return tn(e12, n4 = n4.slice(1), t4, r4, ts);
                }
                return n4;
              }(t3, r3, n3, i3, a3);
            if ("object" == typeof i3 && null !== i3) {
              if (void 0 !== a3 && void 0 !== t3._temporaryReferences && t3._temporaryReferences.set(i3, a3), Array.isArray(i3))
                for (var o3 = 0; o3 < i3.length; o3++)
                  i3[o3] = e11(t3, i3, "" + o3, i3[o3], void 0 !== a3 ? a3 + ":" + o3 : void 0);
              else
                for (o3 in i3)
                  eQ.call(i3, o3) && (r3 = void 0 !== a3 && -1 === o3.indexOf(":") ? a3 + ":" + o3 : void 0, void 0 !== (r3 = e11(t3, i3, o3, i3[o3], r3)) ? i3[o3] = r3 : delete i3[o3]);
            }
            return i3;
          }(e10._response, { "": a2 }, "", a2, n2);
          if (null !== e9 && 0 < e9.deps)
            e9.value = o2, e10.status = "blocked";
          else {
            var s2 = e10.value;
            e10.status = "fulfilled", e10.value = o2, null !== s2 && e2(s2, o2);
          }
        } catch (t3) {
          e10.status = "rejected", e10.reason = t3;
        } finally {
          e4 = t2, e9 = r2;
        }
      }
      function te(e10, t2) {
        var r2 = e10._chunks, n2 = r2.get(t2);
        return n2 || (n2 = null != (n2 = e10._formData.get(e10._prefix + t2)) ? new e0("resolved_model", n2, t2, e10) : e10._closed ? new e0("rejected", null, e10._closedReason, e10) : e1(e10), r2.set(t2, n2)), n2;
      }
      function tt(e10, t2, r2, n2, i2, a2, o2) {
        if (e9) {
          var s2 = e9;
          n2 || s2.deps++;
        } else
          s2 = e9 = { deps: n2 ? 0 : 1, value: null };
        return function(n3) {
          for (var l2 = 1; l2 < o2.length; l2++)
            n3 = n3[o2[l2]];
          t2[r2] = a2(i2, n3), "" === r2 && null === s2.value && (s2.value = t2[r2]), s2.deps--, 0 === s2.deps && "blocked" === e10.status && (n3 = e10.value, e10.status = "fulfilled", e10.value = s2.value, null !== n3 && e2(n3, s2.value));
        };
      }
      function tr(e10) {
        return function(t2) {
          return e3(e10, t2);
        };
      }
      function tn(e10, t2, r2, n2, i2) {
        var a2 = parseInt((t2 = t2.split(":"))[0], 16);
        switch ("resolved_model" === (a2 = te(e10, a2)).status && e7(a2), a2.status) {
          case "fulfilled":
            for (n2 = 1, r2 = a2.value; n2 < t2.length; n2++)
              r2 = r2[t2[n2]];
            return i2(e10, r2);
          case "pending":
          case "blocked":
          case "cyclic":
            var o2 = e4;
            return a2.then(tt(o2, r2, n2, "cyclic" === a2.status, e10, i2, t2), tr(o2)), null;
          default:
            throw a2.reason;
        }
      }
      function ti(e10, t2) {
        return new Map(t2);
      }
      function ta(e10, t2) {
        return new Set(t2);
      }
      function to(e10, t2) {
        return t2[Symbol.iterator]();
      }
      function ts(e10, t2) {
        return t2;
      }
      function tl(e10, t2, r2, n2, i2, a2) {
        return t2 = parseInt(t2.slice(2), 16), t2 = e10._formData.get(e10._prefix + t2), t2 = r2 === ArrayBuffer ? t2.arrayBuffer() : t2.arrayBuffer().then(function(e11) {
          return new r2(e11);
        }), n2 = e4, t2.then(tt(n2, i2, a2, false, e10, ts, []), tr(n2)), null;
      }
      function tu(e10, t2, r2, n2) {
        var i2 = e10._chunks;
        for (r2 = new e0("fulfilled", r2, n2, e10), i2.set(t2, r2), e10 = e10._formData.getAll(e10._prefix + t2), t2 = 0; t2 < e10.length; t2++)
          "C" === (i2 = e10[t2])[0] ? n2.close("C" === i2 ? '"$undefined"' : i2.slice(1)) : n2.enqueueModel(i2);
      }
      function tc(e10, t2, r2) {
        t2 = parseInt(t2.slice(2), 16);
        var n2 = null;
        r2 = new ReadableStream({ type: r2, start: function(e11) {
          n2 = e11;
        } });
        var i2 = null;
        return tu(e10, t2, r2, { enqueueModel: function(t3) {
          if (null === i2) {
            var r3 = new e0("resolved_model", t3, -1, e10);
            e7(r3), "fulfilled" === r3.status ? n2.enqueue(r3.value) : (r3.then(function(e11) {
              return n2.enqueue(e11);
            }, function(e11) {
              return n2.error(e11);
            }), i2 = r3);
          } else {
            r3 = i2;
            var a2 = e1(e10);
            a2.then(function(e11) {
              return n2.enqueue(e11);
            }, function(e11) {
              return n2.error(e11);
            }), i2 = a2, r3.then(function() {
              i2 === a2 && (i2 = null), e6(a2, t3, -1);
            });
          }
        }, close: function() {
          if (null === i2)
            n2.close();
          else {
            var e11 = i2;
            i2 = null, e11.then(function() {
              return n2.close();
            });
          }
        }, error: function(e11) {
          if (null === i2)
            n2.error(e11);
          else {
            var t3 = i2;
            i2 = null, t3.then(function() {
              return n2.error(e11);
            });
          }
        } }), r2;
      }
      function td() {
        return this;
      }
      function th(e10, t2, r2) {
        t2 = parseInt(t2.slice(2), 16);
        var n2 = [], i2 = false, a2 = 0, o2 = {};
        return o2[F] = function() {
          var t3, r3 = 0;
          return (t3 = { next: t3 = function(t4) {
            if (void 0 !== t4)
              throw Error("Values cannot be passed to next() of AsyncIterables passed to Client Components.");
            if (r3 === n2.length) {
              if (i2)
                return new e0("fulfilled", { done: true, value: void 0 }, null, e10);
              n2[r3] = e1(e10);
            }
            return n2[r3++];
          } })[F] = td, t3;
        }, tu(e10, t2, r2 = r2 ? o2[F]() : o2, { enqueueModel: function(t3) {
          a2 === n2.length ? n2[a2] = e8(e10, t3, false) : e5(n2[a2], t3, false), a2++;
        }, close: function(t3) {
          for (i2 = true, a2 === n2.length ? n2[a2] = e8(e10, t3, true) : e5(n2[a2], t3, true), a2++; a2 < n2.length; )
            e5(n2[a2++], '"$undefined"', true);
        }, error: function(t3) {
          for (i2 = true, a2 === n2.length && (n2[a2] = e1(e10)); a2 < n2.length; )
            e3(n2[a2++], t3);
        } }), r2;
      }
      function tf(e10, t2, r2) {
        var n2 = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : new FormData();
        return { _bundlerConfig: e10, _prefix: t2, _formData: n2, _chunks: /* @__PURE__ */ new Map(), _closed: false, _closedReason: null, _temporaryReferences: r2 };
      }
      function tp(e10) {
        var t2;
        t2 = Error("Connection closed."), e10._closed = true, e10._closedReason = t2, e10._chunks.forEach(function(e11) {
          "pending" === e11.status && e3(e11, t2);
        });
      }
      function tg(e10, t2, r2) {
        var n2 = eK(e10, t2);
        return e10 = eY(n2), r2 ? Promise.all([r2, e10]).then(function(e11) {
          e11 = e11[0];
          var t3 = eJ(n2);
          return t3.bind.apply(t3, [null].concat(e11));
        }) : e10 ? Promise.resolve(e10).then(function() {
          return eJ(n2);
        }) : Promise.resolve(eJ(n2));
      }
      function tm(e10, t2, r2) {
        if (tp(e10 = tf(t2, r2, void 0, e10)), (e10 = te(e10, 0)).then(function() {
        }), "fulfilled" !== e10.status)
          throw e10.reason;
        return e10.value;
      }
      t.createClientModuleProxy = function(e10) {
        return new Proxy(e10 = v({}, e10, false), C);
      }, t.createTemporaryReferenceSet = function() {
        return /* @__PURE__ */ new WeakMap();
      }, t.decodeAction = function(e10, t2) {
        var r2 = new FormData(), n2 = null;
        return e10.forEach(function(i2, a2) {
          a2.startsWith("$ACTION_") ? a2.startsWith("$ACTION_REF_") ? (i2 = tm(e10, t2, i2 = "$ACTION_" + a2.slice(12) + ":"), n2 = tg(t2, i2.id, i2.bound)) : a2.startsWith("$ACTION_ID_") && (n2 = tg(t2, i2 = a2.slice(11), null)) : r2.append(a2, i2);
        }), null === n2 ? null : n2.then(function(e11) {
          return e11.bind(null, r2);
        });
      }, t.decodeFormState = function(e10, t2, r2) {
        var n2 = t2.get("$ACTION_KEY");
        if ("string" != typeof n2)
          return Promise.resolve(null);
        var i2 = null;
        if (t2.forEach(function(e11, n3) {
          n3.startsWith("$ACTION_REF_") && (i2 = tm(t2, r2, "$ACTION_" + n3.slice(12) + ":"));
        }), null === i2)
          return Promise.resolve(null);
        var a2 = i2.id;
        return Promise.resolve(i2.bound).then(function(t3) {
          return null === t3 ? null : [e10, n2, a2, t3.length - 1];
        });
      }, t.decodeReply = function(e10, t2, r2) {
        if ("string" == typeof e10) {
          var n2 = new FormData();
          n2.append("0", e10), e10 = n2;
        }
        return t2 = te(e10 = tf(t2, "", r2 ? r2.temporaryReferences : void 0, e10), 0), tp(e10), t2;
      }, t.registerClientReference = function(e10, t2, r2) {
        return v(e10, t2 + "#" + r2, false);
      }, t.registerServerReference = function(e10, t2, r2) {
        return Object.defineProperties(e10, { $$typeof: { value: m }, $$id: { value: null === r2 ? t2 : t2 + "#" + r2, configurable: true }, $$bound: { value: null, configurable: true }, bind: { value: b, configurable: true } });
      };
      let tv = "function" == typeof globalThis.setImmediate && globalThis.propertyIsEnumerable("setImmediate") ? globalThis.setImmediate : setTimeout;
      t.renderToReadableStream = function(e10, t2, r2) {
        var n2 = new eg(20, e10, t2, r2 ? r2.onError : void 0, r2 ? r2.identifierPrefix : void 0, r2 ? r2.onPostpone : void 0, r2 ? r2.temporaryReferences : void 0, void 0, void 0, em, em);
        if (r2 && r2.signal) {
          var i2 = r2.signal;
          if (i2.aborted)
            ez(n2, i2.reason);
          else {
            var a2 = function() {
              ez(n2, i2.reason), i2.removeEventListener("abort", a2);
            };
            i2.addEventListener("abort", a2);
          }
        }
        return new ReadableStream({ type: "bytes", start: function() {
          n2.flushScheduled = null !== n2.destination, R ? s(function() {
            A.run(n2, e$, n2);
          }) : s(function() {
            return e$(n2);
          }), tv(function() {
            10 === n2.status && (n2.status = 11);
          }, 0);
        }, pull: function(e11) {
          if (13 === n2.status)
            n2.status = 14, p(e11, n2.fatalError);
          else if (14 !== n2.status && null === n2.destination) {
            n2.destination = e11;
            try {
              eF(n2, e11);
            } catch (e12) {
              eI(n2, e12, null), ek(n2, e12);
            }
          }
        }, cancel: function(e11) {
          n2.destination = null, ez(n2, e11);
        } }, { highWaterMark: 0 });
      };
    }, 7877: (e, t, r) => {
      "use strict";
      var n;
      (n = r(3426)).renderToReadableStream, n.decodeReply, n.decodeAction, n.decodeFormState, n.registerServerReference, t.YR = n.registerClientReference, n.createClientModuleProxy, n.createTemporaryReferenceSet;
    }, 4544: (e, t) => {
      "use strict";
      var r = { H: null, A: null };
      function n(e2) {
        var t2 = "https://react.dev/errors/" + e2;
        if (1 < arguments.length) {
          t2 += "?args[]=" + encodeURIComponent(arguments[1]);
          for (var r2 = 2; r2 < arguments.length; r2++)
            t2 += "&args[]=" + encodeURIComponent(arguments[r2]);
        }
        return "Minified React error #" + e2 + "; visit " + t2 + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
      }
      var i = Array.isArray, a = Symbol.for("react.transitional.element"), o = Symbol.for("react.portal"), s = Symbol.for("react.fragment"), l = Symbol.for("react.strict_mode"), u = Symbol.for("react.profiler"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), h = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.iterator, g = Object.prototype.hasOwnProperty, m = Object.assign;
      function v(e2, t2, r2, n2, i2, o2) {
        return { $$typeof: a, type: e2, key: t2, ref: void 0 !== (r2 = o2.ref) ? r2 : null, props: o2 };
      }
      function y(e2) {
        return "object" == typeof e2 && null !== e2 && e2.$$typeof === a;
      }
      var _ = /\/+/g;
      function b(e2, t2) {
        var r2, n2;
        return "object" == typeof e2 && null !== e2 && null != e2.key ? (r2 = "" + e2.key, n2 = { "=": "=0", ":": "=2" }, "$" + r2.replace(/[=:]/g, function(e3) {
          return n2[e3];
        })) : t2.toString(36);
      }
      function w() {
      }
      function S(e2, t2, r2) {
        if (null == e2)
          return e2;
        var s2 = [], l2 = 0;
        return !function e3(t3, r3, s3, l3, u2) {
          var c2, d2, h2, g2 = typeof t3;
          ("undefined" === g2 || "boolean" === g2) && (t3 = null);
          var m2 = false;
          if (null === t3)
            m2 = true;
          else
            switch (g2) {
              case "bigint":
              case "string":
              case "number":
                m2 = true;
                break;
              case "object":
                switch (t3.$$typeof) {
                  case a:
                  case o:
                    m2 = true;
                    break;
                  case f:
                    return e3((m2 = t3._init)(t3._payload), r3, s3, l3, u2);
                }
            }
          if (m2)
            return u2 = u2(t3), m2 = "" === l3 ? "." + b(t3, 0) : l3, i(u2) ? (s3 = "", null != m2 && (s3 = m2.replace(_, "$&/") + "/"), e3(u2, r3, s3, "", function(e4) {
              return e4;
            })) : null != u2 && (y(u2) && (c2 = u2, d2 = s3 + (null == u2.key || t3 && t3.key === u2.key ? "" : ("" + u2.key).replace(_, "$&/") + "/") + m2, u2 = v(c2.type, d2, void 0, void 0, void 0, c2.props)), r3.push(u2)), 1;
          m2 = 0;
          var S2 = "" === l3 ? "." : l3 + ":";
          if (i(t3))
            for (var E2 = 0; E2 < t3.length; E2++)
              g2 = S2 + b(l3 = t3[E2], E2), m2 += e3(l3, r3, s3, g2, u2);
          else if ("function" == typeof (E2 = null === (h2 = t3) || "object" != typeof h2 ? null : "function" == typeof (h2 = p && h2[p] || h2["@@iterator"]) ? h2 : null))
            for (t3 = E2.call(t3), E2 = 0; !(l3 = t3.next()).done; )
              g2 = S2 + b(l3 = l3.value, E2++), m2 += e3(l3, r3, s3, g2, u2);
          else if ("object" === g2) {
            if ("function" == typeof t3.then)
              return e3(function(e4) {
                switch (e4.status) {
                  case "fulfilled":
                    return e4.value;
                  case "rejected":
                    throw e4.reason;
                  default:
                    switch ("string" == typeof e4.status ? e4.then(w, w) : (e4.status = "pending", e4.then(function(t4) {
                      "pending" === e4.status && (e4.status = "fulfilled", e4.value = t4);
                    }, function(t4) {
                      "pending" === e4.status && (e4.status = "rejected", e4.reason = t4);
                    })), e4.status) {
                      case "fulfilled":
                        return e4.value;
                      case "rejected":
                        throw e4.reason;
                    }
                }
                throw e4;
              }(t3), r3, s3, l3, u2);
            throw Error(n(31, "[object Object]" === (r3 = String(t3)) ? "object with keys {" + Object.keys(t3).join(", ") + "}" : r3));
          }
          return m2;
        }(e2, s2, "", "", function(e3) {
          return t2.call(r2, e3, l2++);
        }), s2;
      }
      function E(e2) {
        if (-1 === e2._status) {
          var t2 = e2._result;
          (t2 = t2()).then(function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 1, e2._result = t3);
          }, function(t3) {
            (0 === e2._status || -1 === e2._status) && (e2._status = 2, e2._result = t3);
          }), -1 === e2._status && (e2._status = 0, e2._result = t2);
        }
        if (1 === e2._status)
          return e2._result.default;
        throw e2._result;
      }
      function C() {
        return /* @__PURE__ */ new WeakMap();
      }
      function T() {
        return { s: 0, v: void 0, o: null, p: null };
      }
      t.Children = { map: S, forEach: function(e2, t2, r2) {
        S(e2, function() {
          t2.apply(this, arguments);
        }, r2);
      }, count: function(e2) {
        var t2 = 0;
        return S(e2, function() {
          t2++;
        }), t2;
      }, toArray: function(e2) {
        return S(e2, function(e3) {
          return e3;
        }) || [];
      }, only: function(e2) {
        if (!y(e2))
          throw Error(n(143));
        return e2;
      } }, t.Fragment = s, t.Profiler = u, t.StrictMode = l, t.Suspense = d, t.__SERVER_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, t.cache = function(e2) {
        return function() {
          var t2 = r.A;
          if (!t2)
            return e2.apply(null, arguments);
          var n2 = t2.getCacheForType(C);
          void 0 === (t2 = n2.get(e2)) && (t2 = T(), n2.set(e2, t2)), n2 = 0;
          for (var i2 = arguments.length; n2 < i2; n2++) {
            var a2 = arguments[n2];
            if ("function" == typeof a2 || "object" == typeof a2 && null !== a2) {
              var o2 = t2.o;
              null === o2 && (t2.o = o2 = /* @__PURE__ */ new WeakMap()), void 0 === (t2 = o2.get(a2)) && (t2 = T(), o2.set(a2, t2));
            } else
              null === (o2 = t2.p) && (t2.p = o2 = /* @__PURE__ */ new Map()), void 0 === (t2 = o2.get(a2)) && (t2 = T(), o2.set(a2, t2));
          }
          if (1 === t2.s)
            return t2.v;
          if (2 === t2.s)
            throw t2.v;
          try {
            var s2 = e2.apply(null, arguments);
            return (n2 = t2).s = 1, n2.v = s2;
          } catch (e3) {
            throw (s2 = t2).s = 2, s2.v = e3, e3;
          }
        };
      }, t.cloneElement = function(e2, t2, r2) {
        if (null == e2)
          throw Error(n(267, e2));
        var i2 = m({}, e2.props), a2 = e2.key, o2 = void 0;
        if (null != t2)
          for (s2 in void 0 !== t2.ref && (o2 = void 0), void 0 !== t2.key && (a2 = "" + t2.key), t2)
            g.call(t2, s2) && "key" !== s2 && "__self" !== s2 && "__source" !== s2 && ("ref" !== s2 || void 0 !== t2.ref) && (i2[s2] = t2[s2]);
        var s2 = arguments.length - 2;
        if (1 === s2)
          i2.children = r2;
        else if (1 < s2) {
          for (var l2 = Array(s2), u2 = 0; u2 < s2; u2++)
            l2[u2] = arguments[u2 + 2];
          i2.children = l2;
        }
        return v(e2.type, a2, void 0, void 0, o2, i2);
      }, t.createElement = function(e2, t2, r2) {
        var n2, i2 = {}, a2 = null;
        if (null != t2)
          for (n2 in void 0 !== t2.key && (a2 = "" + t2.key), t2)
            g.call(t2, n2) && "key" !== n2 && "__self" !== n2 && "__source" !== n2 && (i2[n2] = t2[n2]);
        var o2 = arguments.length - 2;
        if (1 === o2)
          i2.children = r2;
        else if (1 < o2) {
          for (var s2 = Array(o2), l2 = 0; l2 < o2; l2++)
            s2[l2] = arguments[l2 + 2];
          i2.children = s2;
        }
        if (e2 && e2.defaultProps)
          for (n2 in o2 = e2.defaultProps)
            void 0 === i2[n2] && (i2[n2] = o2[n2]);
        return v(e2, a2, void 0, void 0, null, i2);
      }, t.createRef = function() {
        return { current: null };
      }, t.forwardRef = function(e2) {
        return { $$typeof: c, render: e2 };
      }, t.isValidElement = y, t.lazy = function(e2) {
        return { $$typeof: f, _payload: { _status: -1, _result: e2 }, _init: E };
      }, t.memo = function(e2, t2) {
        return { $$typeof: h, type: e2, compare: void 0 === t2 ? null : t2 };
      }, t.use = function(e2) {
        return r.H.use(e2);
      }, t.useCallback = function(e2, t2) {
        return r.H.useCallback(e2, t2);
      }, t.useDebugValue = function() {
      }, t.useId = function() {
        return r.H.useId();
      }, t.useMemo = function(e2, t2) {
        return r.H.useMemo(e2, t2);
      }, t.version = "19.0.0-rc-65e06cb7-20241218";
    }, 3886: (e, t, r) => {
      "use strict";
      e.exports = r(4544);
    }, 3113: (e, t, r) => {
      var n;
      (() => {
        var i = { 226: function(i2, a2) {
          !function(o2, s2) {
            "use strict";
            var l = "function", u = "undefined", c = "object", d = "string", h = "major", f = "model", p = "name", g = "type", m = "vendor", v = "version", y = "architecture", _ = "console", b = "mobile", w = "tablet", S = "smarttv", E = "wearable", C = "embedded", T = "Amazon", P = "Apple", x = "ASUS", R = "BlackBerry", A = "Browser", O = "Chrome", M = "Firefox", L = "Google", N = "Huawei", I = "Microsoft", k = "Motorola", B = "Opera", D = "Samsung", H = "Sharp", U = "Sony", j = "Xiaomi", q = "Zebra", G = "Facebook", $ = "Chromium OS", F = "Mac OS", V = function(e2, t2) {
              var r2 = {};
              for (var n2 in e2)
                t2[n2] && t2[n2].length % 2 == 0 ? r2[n2] = t2[n2].concat(e2[n2]) : r2[n2] = e2[n2];
              return r2;
            }, z = function(e2) {
              for (var t2 = {}, r2 = 0; r2 < e2.length; r2++)
                t2[e2[r2].toUpperCase()] = e2[r2];
              return t2;
            }, K = function(e2, t2) {
              return typeof e2 === d && -1 !== W(t2).indexOf(W(e2));
            }, W = function(e2) {
              return e2.toLowerCase();
            }, X = function(e2, t2) {
              if (typeof e2 === d)
                return e2 = e2.replace(/^\s\s*/, ""), typeof t2 === u ? e2 : e2.substring(0, 350);
            }, Z = function(e2, t2) {
              for (var r2, n2, i3, a3, o3, u2, d2 = 0; d2 < t2.length && !o3; ) {
                var h2 = t2[d2], f2 = t2[d2 + 1];
                for (r2 = n2 = 0; r2 < h2.length && !o3 && h2[r2]; )
                  if (o3 = h2[r2++].exec(e2))
                    for (i3 = 0; i3 < f2.length; i3++)
                      u2 = o3[++n2], typeof (a3 = f2[i3]) === c && a3.length > 0 ? 2 === a3.length ? typeof a3[1] == l ? this[a3[0]] = a3[1].call(this, u2) : this[a3[0]] = a3[1] : 3 === a3.length ? typeof a3[1] !== l || a3[1].exec && a3[1].test ? this[a3[0]] = u2 ? u2.replace(a3[1], a3[2]) : void 0 : this[a3[0]] = u2 ? a3[1].call(this, u2, a3[2]) : void 0 : 4 === a3.length && (this[a3[0]] = u2 ? a3[3].call(this, u2.replace(a3[1], a3[2])) : void 0) : this[a3] = u2 || s2;
                d2 += 2;
              }
            }, Y = function(e2, t2) {
              for (var r2 in t2)
                if (typeof t2[r2] === c && t2[r2].length > 0) {
                  for (var n2 = 0; n2 < t2[r2].length; n2++)
                    if (K(t2[r2][n2], e2))
                      return "?" === r2 ? s2 : r2;
                } else if (K(t2[r2], e2))
                  return "?" === r2 ? s2 : r2;
              return e2;
            }, J = { ME: "4.90", "NT 3.11": "NT3.51", "NT 4.0": "NT4.0", 2e3: "NT 5.0", XP: ["NT 5.1", "NT 5.2"], Vista: "NT 6.0", 7: "NT 6.1", 8: "NT 6.2", 8.1: "NT 6.3", 10: ["NT 6.4", "NT 10.0"], RT: "ARM" }, Q = { browser: [[/\b(?:crmo|crios)\/([\w\.]+)/i], [v, [p, "Chrome"]], [/edg(?:e|ios|a)?\/([\w\.]+)/i], [v, [p, "Edge"]], [/(opera mini)\/([-\w\.]+)/i, /(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i, /(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i], [p, v], [/opios[\/ ]+([\w\.]+)/i], [v, [p, B + " Mini"]], [/\bopr\/([\w\.]+)/i], [v, [p, B]], [/(kindle)\/([\w\.]+)/i, /(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i, /(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i, /(ba?idubrowser)[\/ ]?([\w\.]+)/i, /(?:ms|\()(ie) ([\w\.]+)/i, /(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i, /(heytap|ovi)browser\/([\d\.]+)/i, /(weibo)__([\d\.]+)/i], [p, v], [/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i], [v, [p, "UC" + A]], [/microm.+\bqbcore\/([\w\.]+)/i, /\bqbcore\/([\w\.]+).+microm/i], [v, [p, "WeChat(Win) Desktop"]], [/micromessenger\/([\w\.]+)/i], [v, [p, "WeChat"]], [/konqueror\/([\w\.]+)/i], [v, [p, "Konqueror"]], [/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i], [v, [p, "IE"]], [/ya(?:search)?browser\/([\w\.]+)/i], [v, [p, "Yandex"]], [/(avast|avg)\/([\w\.]+)/i], [[p, /(.+)/, "$1 Secure " + A], v], [/\bfocus\/([\w\.]+)/i], [v, [p, M + " Focus"]], [/\bopt\/([\w\.]+)/i], [v, [p, B + " Touch"]], [/coc_coc\w+\/([\w\.]+)/i], [v, [p, "Coc Coc"]], [/dolfin\/([\w\.]+)/i], [v, [p, "Dolphin"]], [/coast\/([\w\.]+)/i], [v, [p, B + " Coast"]], [/miuibrowser\/([\w\.]+)/i], [v, [p, "MIUI " + A]], [/fxios\/([-\w\.]+)/i], [v, [p, M]], [/\bqihu|(qi?ho?o?|360)browser/i], [[p, "360 " + A]], [/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i], [[p, /(.+)/, "$1 " + A], v], [/(comodo_dragon)\/([\w\.]+)/i], [[p, /_/g, " "], v], [/(electron)\/([\w\.]+) safari/i, /(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i, /m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i], [p, v], [/(metasr)[\/ ]?([\w\.]+)/i, /(lbbrowser)/i, /\[(linkedin)app\]/i], [p], [/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i], [[p, G], v], [/(kakao(?:talk|story))[\/ ]([\w\.]+)/i, /(naver)\(.*?(\d+\.[\w\.]+).*\)/i, /safari (line)\/([\w\.]+)/i, /\b(line)\/([\w\.]+)\/iab/i, /(chromium|instagram)[\/ ]([-\w\.]+)/i], [p, v], [/\bgsa\/([\w\.]+) .*safari\//i], [v, [p, "GSA"]], [/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i], [v, [p, "TikTok"]], [/headlesschrome(?:\/([\w\.]+)| )/i], [v, [p, O + " Headless"]], [/ wv\).+(chrome)\/([\w\.]+)/i], [[p, O + " WebView"], v], [/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i], [v, [p, "Android " + A]], [/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i], [p, v], [/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i], [v, [p, "Mobile Safari"]], [/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i], [v, p], [/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i], [p, [v, Y, { "1.0": "/8", 1.2: "/1", 1.3: "/3", "2.0": "/412", "2.0.2": "/416", "2.0.3": "/417", "2.0.4": "/419", "?": "/" }]], [/(webkit|khtml)\/([\w\.]+)/i], [p, v], [/(navigator|netscape\d?)\/([-\w\.]+)/i], [[p, "Netscape"], v], [/mobile vr; rv:([\w\.]+)\).+firefox/i], [v, [p, M + " Reality"]], [/ekiohf.+(flow)\/([\w\.]+)/i, /(swiftfox)/i, /(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i, /(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i, /(firefox)\/([\w\.]+)/i, /(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i, /(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i, /(links) \(([\w\.]+)/i, /panasonic;(viera)/i], [p, v], [/(cobalt)\/([\w\.]+)/i], [p, [v, /master.|lts./, ""]]], cpu: [[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i], [[y, "amd64"]], [/(ia32(?=;))/i], [[y, W]], [/((?:i[346]|x)86)[;\)]/i], [[y, "ia32"]], [/\b(aarch64|arm(v?8e?l?|_?64))\b/i], [[y, "arm64"]], [/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i], [[y, "armhf"]], [/windows (ce|mobile); ppc;/i], [[y, "arm"]], [/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i], [[y, /ower/, "", W]], [/(sun4\w)[;\)]/i], [[y, "sparc"]], [/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i], [[y, W]]], device: [[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i], [f, [m, D], [g, w]], [/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i, /samsung[- ]([-\w]+)/i, /sec-(sgh\w+)/i], [f, [m, D], [g, b]], [/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i], [f, [m, P], [g, b]], [/\((ipad);[-\w\),; ]+apple/i, /applecoremedia\/[\w\.]+ \((ipad)/i, /\b(ipad)\d\d?,\d\d?[;\]].+ios/i], [f, [m, P], [g, w]], [/(macintosh);/i], [f, [m, P]], [/\b(sh-?[altvz]?\d\d[a-ekm]?)/i], [f, [m, H], [g, b]], [/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i], [f, [m, N], [g, w]], [/(?:huawei|honor)([-\w ]+)[;\)]/i, /\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i], [f, [m, N], [g, b]], [/\b(poco[\w ]+)(?: bui|\))/i, /\b; (\w+) build\/hm\1/i, /\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i, /\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i, /\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i], [[f, /_/g, " "], [m, j], [g, b]], [/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i], [[f, /_/g, " "], [m, j], [g, w]], [/; (\w+) bui.+ oppo/i, /\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i], [f, [m, "OPPO"], [g, b]], [/vivo (\w+)(?: bui|\))/i, /\b(v[12]\d{3}\w?[at])(?: bui|;)/i], [f, [m, "Vivo"], [g, b]], [/\b(rmx[12]\d{3})(?: bui|;|\))/i], [f, [m, "Realme"], [g, b]], [/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i, /\bmot(?:orola)?[- ](\w*)/i, /((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i], [f, [m, k], [g, b]], [/\b(mz60\d|xoom[2 ]{0,2}) build\//i], [f, [m, k], [g, w]], [/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i], [f, [m, "LG"], [g, w]], [/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i, /\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i, /\blg-?([\d\w]+) bui/i], [f, [m, "LG"], [g, b]], [/(ideatab[-\w ]+)/i, /lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i], [f, [m, "Lenovo"], [g, w]], [/(?:maemo|nokia).*(n900|lumia \d+)/i, /nokia[-_ ]?([-\w\.]*)/i], [[f, /_/g, " "], [m, "Nokia"], [g, b]], [/(pixel c)\b/i], [f, [m, L], [g, w]], [/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i], [f, [m, L], [g, b]], [/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i], [f, [m, U], [g, b]], [/sony tablet [ps]/i, /\b(?:sony)?sgp\w+(?: bui|\))/i], [[f, "Xperia Tablet"], [m, U], [g, w]], [/ (kb2005|in20[12]5|be20[12][59])\b/i, /(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i], [f, [m, "OnePlus"], [g, b]], [/(alexa)webm/i, /(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i, /(kf[a-z]+)( bui|\)).+silk\//i], [f, [m, T], [g, w]], [/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i], [[f, /(.+)/g, "Fire Phone $1"], [m, T], [g, b]], [/(playbook);[-\w\),; ]+(rim)/i], [f, m, [g, w]], [/\b((?:bb[a-f]|st[hv])100-\d)/i, /\(bb10; (\w+)/i], [f, [m, R], [g, b]], [/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i], [f, [m, x], [g, w]], [/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i], [f, [m, x], [g, b]], [/(nexus 9)/i], [f, [m, "HTC"], [g, w]], [/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i, /(zte)[- ]([\w ]+?)(?: bui|\/|\))/i, /(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i], [m, [f, /_/g, " "], [g, b]], [/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i], [f, [m, "Acer"], [g, w]], [/droid.+; (m[1-5] note) bui/i, /\bmz-([-\w]{2,})/i], [f, [m, "Meizu"], [g, b]], [/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i, /(hp) ([\w ]+\w)/i, /(asus)-?(\w+)/i, /(microsoft); (lumia[\w ]+)/i, /(lenovo)[-_ ]?([-\w]+)/i, /(jolla)/i, /(oppo) ?([\w ]+) bui/i], [m, f, [g, b]], [/(kobo)\s(ereader|touch)/i, /(archos) (gamepad2?)/i, /(hp).+(touchpad(?!.+tablet)|tablet)/i, /(kindle)\/([\w\.]+)/i, /(nook)[\w ]+build\/(\w+)/i, /(dell) (strea[kpr\d ]*[\dko])/i, /(le[- ]+pan)[- ]+(\w{1,9}) bui/i, /(trinity)[- ]*(t\d{3}) bui/i, /(gigaset)[- ]+(q\w{1,9}) bui/i, /(vodafone) ([\w ]+)(?:\)| bui)/i], [m, f, [g, w]], [/(surface duo)/i], [f, [m, I], [g, w]], [/droid [\d\.]+; (fp\du?)(?: b|\))/i], [f, [m, "Fairphone"], [g, b]], [/(u304aa)/i], [f, [m, "AT&T"], [g, b]], [/\bsie-(\w*)/i], [f, [m, "Siemens"], [g, b]], [/\b(rct\w+) b/i], [f, [m, "RCA"], [g, w]], [/\b(venue[\d ]{2,7}) b/i], [f, [m, "Dell"], [g, w]], [/\b(q(?:mv|ta)\w+) b/i], [f, [m, "Verizon"], [g, w]], [/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i], [f, [m, "Barnes & Noble"], [g, w]], [/\b(tm\d{3}\w+) b/i], [f, [m, "NuVision"], [g, w]], [/\b(k88) b/i], [f, [m, "ZTE"], [g, w]], [/\b(nx\d{3}j) b/i], [f, [m, "ZTE"], [g, b]], [/\b(gen\d{3}) b.+49h/i], [f, [m, "Swiss"], [g, b]], [/\b(zur\d{3}) b/i], [f, [m, "Swiss"], [g, w]], [/\b((zeki)?tb.*\b) b/i], [f, [m, "Zeki"], [g, w]], [/\b([yr]\d{2}) b/i, /\b(dragon[- ]+touch |dt)(\w{5}) b/i], [[m, "Dragon Touch"], f, [g, w]], [/\b(ns-?\w{0,9}) b/i], [f, [m, "Insignia"], [g, w]], [/\b((nxa|next)-?\w{0,9}) b/i], [f, [m, "NextBook"], [g, w]], [/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i], [[m, "Voice"], f, [g, b]], [/\b(lvtel\-)?(v1[12]) b/i], [[m, "LvTel"], f, [g, b]], [/\b(ph-1) /i], [f, [m, "Essential"], [g, b]], [/\b(v(100md|700na|7011|917g).*\b) b/i], [f, [m, "Envizen"], [g, w]], [/\b(trio[-\w\. ]+) b/i], [f, [m, "MachSpeed"], [g, w]], [/\btu_(1491) b/i], [f, [m, "Rotor"], [g, w]], [/(shield[\w ]+) b/i], [f, [m, "Nvidia"], [g, w]], [/(sprint) (\w+)/i], [m, f, [g, b]], [/(kin\.[onetw]{3})/i], [[f, /\./g, " "], [m, I], [g, b]], [/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i], [f, [m, q], [g, w]], [/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i], [f, [m, q], [g, b]], [/smart-tv.+(samsung)/i], [m, [g, S]], [/hbbtv.+maple;(\d+)/i], [[f, /^/, "SmartTV"], [m, D], [g, S]], [/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i], [[m, "LG"], [g, S]], [/(apple) ?tv/i], [m, [f, P + " TV"], [g, S]], [/crkey/i], [[f, O + "cast"], [m, L], [g, S]], [/droid.+aft(\w)( bui|\))/i], [f, [m, T], [g, S]], [/\(dtv[\);].+(aquos)/i, /(aquos-tv[\w ]+)\)/i], [f, [m, H], [g, S]], [/(bravia[\w ]+)( bui|\))/i], [f, [m, U], [g, S]], [/(mitv-\w{5}) bui/i], [f, [m, j], [g, S]], [/Hbbtv.*(technisat) (.*);/i], [m, f, [g, S]], [/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i, /hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i], [[m, X], [f, X], [g, S]], [/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i], [[g, S]], [/(ouya)/i, /(nintendo) ([wids3utch]+)/i], [m, f, [g, _]], [/droid.+; (shield) bui/i], [f, [m, "Nvidia"], [g, _]], [/(playstation [345portablevi]+)/i], [f, [m, U], [g, _]], [/\b(xbox(?: one)?(?!; xbox))[\); ]/i], [f, [m, I], [g, _]], [/((pebble))app/i], [m, f, [g, E]], [/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i], [f, [m, P], [g, E]], [/droid.+; (glass) \d/i], [f, [m, L], [g, E]], [/droid.+; (wt63?0{2,3})\)/i], [f, [m, q], [g, E]], [/(quest( 2| pro)?)/i], [f, [m, G], [g, E]], [/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i], [m, [g, C]], [/(aeobc)\b/i], [f, [m, T], [g, C]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i], [f, [g, b]], [/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i], [f, [g, w]], [/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i], [[g, w]], [/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i], [[g, b]], [/(android[-\w\. ]{0,9});.+buil/i], [f, [m, "Generic"]]], engine: [[/windows.+ edge\/([\w\.]+)/i], [v, [p, "EdgeHTML"]], [/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i], [v, [p, "Blink"]], [/(presto)\/([\w\.]+)/i, /(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i, /ekioh(flow)\/([\w\.]+)/i, /(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i, /(icab)[\/ ]([23]\.[\d\.]+)/i, /\b(libweb)/i], [p, v], [/rv\:([\w\.]{1,9})\b.+(gecko)/i], [v, p]], os: [[/microsoft (windows) (vista|xp)/i], [p, v], [/(windows) nt 6\.2; (arm)/i, /(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i, /(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i], [p, [v, Y, J]], [/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i], [[p, "Windows"], [v, Y, J]], [/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i, /ios;fbsv\/([\d\.]+)/i, /cfnetwork\/.+darwin/i], [[v, /_/g, "."], [p, "iOS"]], [/(mac os x) ?([\w\. ]*)/i, /(macintosh|mac_powerpc\b)(?!.+haiku)/i], [[p, F], [v, /_/g, "."]], [/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i], [v, p], [/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i, /(blackberry)\w*\/([\w\.]*)/i, /(tizen|kaios)[\/ ]([\w\.]+)/i, /\((series40);/i], [p, v], [/\(bb(10);/i], [v, [p, R]], [/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i], [v, [p, "Symbian"]], [/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i], [v, [p, M + " OS"]], [/web0s;.+rt(tv)/i, /\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i], [v, [p, "webOS"]], [/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i], [v, [p, "watchOS"]], [/crkey\/([\d\.]+)/i], [v, [p, O + "cast"]], [/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i], [[p, $], v], [/panasonic;(viera)/i, /(netrange)mmh/i, /(nettv)\/(\d+\.[\w\.]+)/i, /(nintendo|playstation) ([wids345portablevuch]+)/i, /(xbox); +xbox ([^\);]+)/i, /\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i, /(mint)[\/\(\) ]?(\w*)/i, /(mageia|vectorlinux)[; ]/i, /([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i, /(hurd|linux) ?([\w\.]*)/i, /(gnu) ?([\w\.]*)/i, /\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i, /(haiku) (\w+)/i], [p, v], [/(sunos) ?([\w\.\d]*)/i], [[p, "Solaris"], v], [/((?:open)?solaris)[-\/ ]?([\w\.]*)/i, /(aix) ((\d)(?=\.|\)| )[\w\.])*/i, /\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i, /(unix) ?([\w\.]*)/i], [p, v]] }, ee = function(e2, t2) {
              if (typeof e2 === c && (t2 = e2, e2 = s2), !(this instanceof ee))
                return new ee(e2, t2).getResult();
              var r2 = typeof o2 !== u && o2.navigator ? o2.navigator : s2, n2 = e2 || (r2 && r2.userAgent ? r2.userAgent : ""), i3 = r2 && r2.userAgentData ? r2.userAgentData : s2, a3 = t2 ? V(Q, t2) : Q, _2 = r2 && r2.userAgent == n2;
              return this.getBrowser = function() {
                var e3, t3 = {};
                return t3[p] = s2, t3[v] = s2, Z.call(t3, n2, a3.browser), t3[h] = typeof (e3 = t3[v]) === d ? e3.replace(/[^\d\.]/g, "").split(".")[0] : s2, _2 && r2 && r2.brave && typeof r2.brave.isBrave == l && (t3[p] = "Brave"), t3;
              }, this.getCPU = function() {
                var e3 = {};
                return e3[y] = s2, Z.call(e3, n2, a3.cpu), e3;
              }, this.getDevice = function() {
                var e3 = {};
                return e3[m] = s2, e3[f] = s2, e3[g] = s2, Z.call(e3, n2, a3.device), _2 && !e3[g] && i3 && i3.mobile && (e3[g] = b), _2 && "Macintosh" == e3[f] && r2 && typeof r2.standalone !== u && r2.maxTouchPoints && r2.maxTouchPoints > 2 && (e3[f] = "iPad", e3[g] = w), e3;
              }, this.getEngine = function() {
                var e3 = {};
                return e3[p] = s2, e3[v] = s2, Z.call(e3, n2, a3.engine), e3;
              }, this.getOS = function() {
                var e3 = {};
                return e3[p] = s2, e3[v] = s2, Z.call(e3, n2, a3.os), _2 && !e3[p] && i3 && "Unknown" != i3.platform && (e3[p] = i3.platform.replace(/chrome os/i, $).replace(/macos/i, F)), e3;
              }, this.getResult = function() {
                return { ua: this.getUA(), browser: this.getBrowser(), engine: this.getEngine(), os: this.getOS(), device: this.getDevice(), cpu: this.getCPU() };
              }, this.getUA = function() {
                return n2;
              }, this.setUA = function(e3) {
                return n2 = typeof e3 === d && e3.length > 350 ? X(e3, 350) : e3, this;
              }, this.setUA(n2), this;
            };
            ee.VERSION = "1.0.35", ee.BROWSER = z([p, v, h]), ee.CPU = z([y]), ee.DEVICE = z([f, m, g, _, b, S, w, E, C]), ee.ENGINE = ee.OS = z([p, v]), typeof a2 !== u ? (i2.exports && (a2 = i2.exports = ee), a2.UAParser = ee) : r.amdO ? void 0 !== (n = function() {
              return ee;
            }.call(t, r, t, e)) && (e.exports = n) : typeof o2 !== u && (o2.UAParser = ee);
            var et = typeof o2 !== u && (o2.jQuery || o2.Zepto);
            if (et && !et.ua) {
              var er = new ee();
              et.ua = er.getResult(), et.ua.get = function() {
                return er.getUA();
              }, et.ua.set = function(e2) {
                er.setUA(e2);
                var t2 = er.getResult();
                for (var r2 in t2)
                  et.ua[r2] = t2[r2];
              };
            }
          }("object" == typeof window ? window : this);
        } }, a = {};
        function o(e2) {
          var t2 = a[e2];
          if (void 0 !== t2)
            return t2.exports;
          var r2 = a[e2] = { exports: {} }, n2 = true;
          try {
            i[e2].call(r2.exports, r2, r2.exports, o), n2 = false;
          } finally {
            n2 && delete a[e2];
          }
          return r2.exports;
        }
        o.ab = "//";
        var s = o(226);
        e.exports = s;
      })();
    }, 269: (e, t, r) => {
      "use strict";
      function n() {
        throw Error('ImageResponse moved from "next/server" to "next/og" since Next.js 14, please import from "next/og" instead');
      }
      r.r(t), r.d(t, { ImageResponse: () => n, NextRequest: () => i.J, NextResponse: () => a.R, URLPattern: () => c, after: () => h, connection: () => y, userAgent: () => u, userAgentFromString: () => l });
      var i = r(7390), a = r(1532), o = r(3113), s = r.n(o);
      function l(e2) {
        return { ...s()(e2), isBot: void 0 !== e2 && /Googlebot|Mediapartners-Google|AdsBot-Google|googleweblight|Storebot-Google|Google-PageRenderer|Google-InspectionTool|Bingbot|BingPreview|Slurp|DuckDuckBot|baiduspider|yandex|sogou|LinkedInBot|bitlybot|tumblr|vkShare|quora link preview|facebookexternalhit|facebookcatalog|Twitterbot|applebot|redditbot|Slackbot|Discordbot|WhatsApp|SkypeUriPreview|ia_archiver/i.test(e2) };
      }
      function u({ headers: e2 }) {
        return l(e2.get("user-agent") || void 0);
      }
      let c = "undefined" == typeof URLPattern ? void 0 : URLPattern;
      var d = r(6590);
      function h(e2) {
        let t2 = d.J.getStore();
        if (!t2)
          throw Error("`after` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context");
        let { afterContext: r2 } = t2;
        return r2.after(e2);
      }
      var f = r(8553), p = r(4108), g = r(8923), m = r(5330), v = r(1135);
      function y() {
        let e2 = d.J.getStore(), t2 = f.FP.getStore();
        if (e2) {
          if (t2 && "after" === t2.phase && !(0, v.iC)())
            throw Error(`Route ${e2.route} used "connection" inside "after(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but "after(...)" executes after the request, so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`);
          if (e2.forceStatic)
            return Promise.resolve(void 0);
          if (t2) {
            if ("cache" === t2.type)
              throw Error(`Route ${e2.route} used "connection" inside "use cache". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === t2.type)
              throw Error(`Route ${e2.route} used "connection" inside a function cached with "unstable_cache(...)". The \`connection()\` function is used to indicate the subsequent code must only run when there is an actual Request, but caches must be able to be produced before a Request so this function is not allowed in this scope. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
          }
          if (e2.dynamicShouldError)
            throw new g.f(`Route ${e2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`connection\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (t2) {
            if ("prerender" === t2.type)
              return (0, m.W)(t2.renderSignal, "`connection()`");
            "prerender-ppr" === t2.type ? (0, p.Ui)(e2.route, "connection", t2.dynamicTracking) : "prerender-legacy" === t2.type && (0, p.xI)("connection", e2, t2);
          }
          (0, p.Pk)(e2, t2);
        }
        return Promise.resolve(void 0);
      }
    }, 8023: (e, t, r) => {
      "use strict";
      r.d(t, { F: () => n });
      class n extends Error {
        constructor(e2) {
          super("Dynamic server usage: " + e2), this.description = e2, this.digest = "DYNAMIC_SERVER_USAGE";
        }
      }
    }, 8923: (e, t, r) => {
      "use strict";
      r.d(t, { f: () => n });
      class n extends Error {
        constructor(...e2) {
          super(...e2), this.code = "NEXT_STATIC_GEN_BAILOUT";
        }
      }
    }, 1031: (e, t, r) => {
      "use strict";
      r.d(t, { AA: () => n, h: () => i, kz: () => a, r4: () => o });
      let n = "nxtP", i = "nxtI", a = "x-prerender-revalidate", o = "x-prerender-revalidate-if-generated", s = { shared: "shared", reactServerComponents: "rsc", serverSideRendering: "ssr", actionBrowser: "action-browser", api: "api", middleware: "middleware", instrument: "instrument", edgeAsset: "edge-asset", appPagesBrowser: "app-pages-browser" };
      ({ ...s, GROUP: { builtinReact: [s.reactServerComponents, s.actionBrowser], serverOnly: [s.reactServerComponents, s.actionBrowser, s.instrument, s.middleware], neutralTarget: [s.api], clientOnly: [s.serverSideRendering, s.appPagesBrowser], bundled: [s.reactServerComponents, s.actionBrowser, s.serverSideRendering, s.appPagesBrowser, s.shared, s.instrument], appPages: [s.reactServerComponents, s.serverSideRendering, s.appPagesBrowser, s.actionBrowser] } });
    }, 2317: (e, t, r) => {
      "use strict";
      r.d(t, { Z: () => n });
      let n = (0, r(349).xl)();
    }, 349: (e, t, r) => {
      "use strict";
      r.d(t, { cg: () => s, xl: () => o });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let a = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function o() {
        return a ? new a() : new i();
      }
      function s(e2) {
        return a ? a.bind(e2) : i.bind(e2);
      }
    }, 4108: (e, t, r) => {
      "use strict";
      r.d(t, { t3: () => l, Ui: () => u, xI: () => o, Pk: () => s });
      var n = r(3886), i = r(8023);
      r(8923), r(8553), r(6590);
      let a = "function" == typeof n.unstable_postpone;
      function o(e2, t2, r2) {
        let n2 = new i.F(`Route ${t2.route} couldn't be rendered statically because it used \`${e2}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
        throw r2.revalidate = 0, t2.dynamicUsageDescription = e2, t2.dynamicUsageStack = n2.stack, n2;
      }
      function s(e2, t2) {
        t2 && "cache" !== t2.type && "unstable-cache" !== t2.type && ("prerender" === t2.type || "prerender-legacy" === t2.type) && (t2.revalidate = 0);
      }
      function l(e2, t2, r2, n2) {
        let i2 = n2.dynamicTracking;
        throw i2 && null === i2.syncDynamicErrorWithStack && (i2.syncDynamicExpression = t2, i2.syncDynamicErrorWithStack = r2, true === n2.validating && (i2.syncDynamicLogged = true)), function(e3, t3, r3) {
          let n3 = d(`Route ${e3} needs to bail out of prerendering at this point because it used ${t3}.`);
          r3.controller.abort(n3);
          let i3 = r3.dynamicTracking;
          i3 && i3.dynamicAccesses.push({ stack: i3.isDebugDynamicAccesses ? Error().stack : void 0, expression: t3 });
        }(e2, t2, n2), d(`Route ${e2} needs to bail out of prerendering at this point because it used ${t2}.`);
      }
      function u(e2, t2, r2) {
        (function() {
          if (!a)
            throw Error("Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js");
        })(), r2 && r2.dynamicAccesses.push({ stack: r2.isDebugDynamicAccesses ? Error().stack : void 0, expression: t2 }), n.unstable_postpone(c(e2, t2));
      }
      function c(e2, t2) {
        return `Route ${e2} needs to bail out of prerendering at this point because it used ${t2}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      if (false === function(e2) {
        return e2.includes("needs to bail out of prerendering at this point because it used") && e2.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }(c("%%%", "^^^")))
        throw Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js");
      function d(e2) {
        let t2 = Error(e2);
        return t2.digest = "NEXT_PRERENDER_INTERRUPTED", t2;
      }
      RegExp(`\\n\\s+at __next_metadata_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_viewport_boundary__[\\n\\s]`), RegExp(`\\n\\s+at __next_outlet_boundary__[\\n\\s]`);
    }, 5330: (e, t, r) => {
      "use strict";
      function n(e2, t2) {
        let r2 = new Promise((r3, n2) => {
          e2.addEventListener("abort", () => {
            n2(Error(`During prerendering, ${t2} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${t2} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context.`));
          }, { once: true });
        });
        return r2.catch(i), r2;
      }
      function i() {
      }
      r.d(t, { W: () => n });
    }, 1135: (e, t, r) => {
      "use strict";
      r.d(t, { iC: () => i }), r(8923);
      var n = r(2317);
      function i() {
        let e2 = n.Z.getStore();
        return (null == e2 ? void 0 : e2.rootTaskSpawnPhase) === "action";
      }
    }, 4263: (e, t, r) => {
      "use strict";
      r.d(t, { CB: () => n, Yq: () => i, l_: () => a });
      class n extends Error {
        constructor({ page: e2 }) {
          super(`The middleware "${e2}" accepts an async API directly with the form:
  
  export function middleware(request, event) {
    return NextResponse.redirect('/new-location')
  }
  
  Read more: https://nextjs.org/docs/messages/middleware-new-signature
  `);
        }
      }
      class i extends Error {
        constructor() {
          super(`The request.page has been deprecated in favour of \`URLPattern\`.
  Read more: https://nextjs.org/docs/messages/middleware-request-page
  `);
        }
      }
      class a extends Error {
        constructor() {
          super(`The request.ua has been removed in favour of \`userAgent\` function.
  Read more: https://nextjs.org/docs/messages/middleware-parse-user-agent
  `);
        }
      }
    }, 5269: (e, t, r) => {
      "use strict";
      function n(e2) {
        return e2.replace(/\/$/, "") || "/";
      }
      function i(e2) {
        let t2 = e2.indexOf("#"), r2 = e2.indexOf("?"), n2 = r2 > -1 && (t2 < 0 || r2 < t2);
        return n2 || t2 > -1 ? { pathname: e2.substring(0, n2 ? r2 : t2), query: n2 ? e2.substring(r2, t2 > -1 ? t2 : void 0) : "", hash: t2 > -1 ? e2.slice(t2) : "" } : { pathname: e2, query: "", hash: "" };
      }
      function a(e2, t2) {
        if (!e2.startsWith("/") || !t2)
          return e2;
        let { pathname: r2, query: n2, hash: a2 } = i(e2);
        return "" + t2 + r2 + n2 + a2;
      }
      function o(e2, t2) {
        if (!e2.startsWith("/") || !t2)
          return e2;
        let { pathname: r2, query: n2, hash: a2 } = i(e2);
        return "" + r2 + t2 + n2 + a2;
      }
      function s(e2, t2) {
        if ("string" != typeof e2)
          return false;
        let { pathname: r2 } = i(e2);
        return r2 === t2 || r2.startsWith(t2 + "/");
      }
      function l(e2, t2) {
        let r2;
        let n2 = e2.split("/");
        return (t2 || []).some((t3) => !!n2[1] && n2[1].toLowerCase() === t3.toLowerCase() && (r2 = t3, n2.splice(1, 1), e2 = n2.join("/") || "/", true)), { pathname: e2, detectedLocale: r2 };
      }
      r.d(t, { X: () => h });
      let u = /(?!^https?:\/\/)(127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}|\[::1\]|localhost)/;
      function c(e2, t2) {
        return new URL(String(e2).replace(u, "localhost"), t2 && String(t2).replace(u, "localhost"));
      }
      let d = Symbol("NextURLInternal");
      class h {
        constructor(e2, t2, r2) {
          let n2, i2;
          "object" == typeof t2 && "pathname" in t2 || "string" == typeof t2 ? (n2 = t2, i2 = r2 || {}) : i2 = r2 || t2 || {}, this[d] = { url: c(e2, n2 ?? i2.base), options: i2, basePath: "" }, this.analyze();
        }
        analyze() {
          var e2, t2, r2, n2, i2;
          let a2 = function(e3, t3) {
            var r3, n3;
            let { basePath: i3, i18n: a3, trailingSlash: o3 } = null != (r3 = t3.nextConfig) ? r3 : {}, u3 = { pathname: e3, trailingSlash: "/" !== e3 ? e3.endsWith("/") : o3 };
            i3 && s(u3.pathname, i3) && (u3.pathname = function(e4, t4) {
              if (!s(e4, t4))
                return e4;
              let r4 = e4.slice(t4.length);
              return r4.startsWith("/") ? r4 : "/" + r4;
            }(u3.pathname, i3), u3.basePath = i3);
            let c2 = u3.pathname;
            if (u3.pathname.startsWith("/_next/data/") && u3.pathname.endsWith(".json")) {
              let e4 = u3.pathname.replace(/^\/_next\/data\//, "").replace(/\.json$/, "").split("/"), r4 = e4[0];
              u3.buildId = r4, c2 = "index" !== e4[1] ? "/" + e4.slice(1).join("/") : "/", true === t3.parseData && (u3.pathname = c2);
            }
            if (a3) {
              let e4 = t3.i18nProvider ? t3.i18nProvider.analyze(u3.pathname) : l(u3.pathname, a3.locales);
              u3.locale = e4.detectedLocale, u3.pathname = null != (n3 = e4.pathname) ? n3 : u3.pathname, !e4.detectedLocale && u3.buildId && (e4 = t3.i18nProvider ? t3.i18nProvider.analyze(c2) : l(c2, a3.locales)).detectedLocale && (u3.locale = e4.detectedLocale);
            }
            return u3;
          }(this[d].url.pathname, { nextConfig: this[d].options.nextConfig, parseData: true, i18nProvider: this[d].options.i18nProvider }), o2 = function(e3, t3) {
            let r3;
            if ((null == t3 ? void 0 : t3.host) && !Array.isArray(t3.host))
              r3 = t3.host.toString().split(":", 1)[0];
            else {
              if (!e3.hostname)
                return;
              r3 = e3.hostname;
            }
            return r3.toLowerCase();
          }(this[d].url, this[d].options.headers);
          this[d].domainLocale = this[d].options.i18nProvider ? this[d].options.i18nProvider.detectDomainLocale(o2) : function(e3, t3, r3) {
            if (e3)
              for (let a3 of (r3 && (r3 = r3.toLowerCase()), e3)) {
                var n3, i3;
                if (t3 === (null == (n3 = a3.domain) ? void 0 : n3.split(":", 1)[0].toLowerCase()) || r3 === a3.defaultLocale.toLowerCase() || (null == (i3 = a3.locales) ? void 0 : i3.some((e4) => e4.toLowerCase() === r3)))
                  return a3;
              }
          }(null == (t2 = this[d].options.nextConfig) ? void 0 : null == (e2 = t2.i18n) ? void 0 : e2.domains, o2);
          let u2 = (null == (r2 = this[d].domainLocale) ? void 0 : r2.defaultLocale) || (null == (i2 = this[d].options.nextConfig) ? void 0 : null == (n2 = i2.i18n) ? void 0 : n2.defaultLocale);
          this[d].url.pathname = a2.pathname, this[d].defaultLocale = u2, this[d].basePath = a2.basePath ?? "", this[d].buildId = a2.buildId, this[d].locale = a2.locale ?? u2, this[d].trailingSlash = a2.trailingSlash;
        }
        formatPathname() {
          var e2;
          let t2;
          return t2 = function(e3, t3, r2, n2) {
            if (!t3 || t3 === r2)
              return e3;
            let i2 = e3.toLowerCase();
            return !n2 && (s(i2, "/api") || s(i2, "/" + t3.toLowerCase())) ? e3 : a(e3, "/" + t3);
          }((e2 = { basePath: this[d].basePath, buildId: this[d].buildId, defaultLocale: this[d].options.forceLocale ? void 0 : this[d].defaultLocale, locale: this[d].locale, pathname: this[d].url.pathname, trailingSlash: this[d].trailingSlash }).pathname, e2.locale, e2.buildId ? void 0 : e2.defaultLocale, e2.ignorePrefix), (e2.buildId || !e2.trailingSlash) && (t2 = n(t2)), e2.buildId && (t2 = o(a(t2, "/_next/data/" + e2.buildId), "/" === e2.pathname ? "index.json" : ".json")), t2 = a(t2, e2.basePath), !e2.buildId && e2.trailingSlash ? t2.endsWith("/") ? t2 : o(t2, "/") : n(t2);
        }
        formatSearch() {
          return this[d].url.search;
        }
        get buildId() {
          return this[d].buildId;
        }
        set buildId(e2) {
          this[d].buildId = e2;
        }
        get locale() {
          return this[d].locale ?? "";
        }
        set locale(e2) {
          var t2, r2;
          if (!this[d].locale || !(null == (r2 = this[d].options.nextConfig) ? void 0 : null == (t2 = r2.i18n) ? void 0 : t2.locales.includes(e2)))
            throw TypeError(`The NextURL configuration includes no locale "${e2}"`);
          this[d].locale = e2;
        }
        get defaultLocale() {
          return this[d].defaultLocale;
        }
        get domainLocale() {
          return this[d].domainLocale;
        }
        get searchParams() {
          return this[d].url.searchParams;
        }
        get host() {
          return this[d].url.host;
        }
        set host(e2) {
          this[d].url.host = e2;
        }
        get hostname() {
          return this[d].url.hostname;
        }
        set hostname(e2) {
          this[d].url.hostname = e2;
        }
        get port() {
          return this[d].url.port;
        }
        set port(e2) {
          this[d].url.port = e2;
        }
        get protocol() {
          return this[d].url.protocol;
        }
        set protocol(e2) {
          this[d].url.protocol = e2;
        }
        get href() {
          let e2 = this.formatPathname(), t2 = this.formatSearch();
          return `${this.protocol}//${this.host}${e2}${t2}${this.hash}`;
        }
        set href(e2) {
          this[d].url = c(e2), this.analyze();
        }
        get origin() {
          return this[d].url.origin;
        }
        get pathname() {
          return this[d].url.pathname;
        }
        set pathname(e2) {
          this[d].url.pathname = e2;
        }
        get hash() {
          return this[d].url.hash;
        }
        set hash(e2) {
          this[d].url.hash = e2;
        }
        get search() {
          return this[d].url.search;
        }
        set search(e2) {
          this[d].url.search = e2;
        }
        get password() {
          return this[d].url.password;
        }
        set password(e2) {
          this[d].url.password = e2;
        }
        get username() {
          return this[d].url.username;
        }
        set username(e2) {
          this[d].url.username = e2;
        }
        get basePath() {
          return this[d].basePath;
        }
        set basePath(e2) {
          this[d].basePath = e2.startsWith("/") ? e2 : `/${e2}`;
        }
        toString() {
          return this.href;
        }
        toJSON() {
          return this.href;
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { href: this.href, origin: this.origin, protocol: this.protocol, username: this.username, password: this.password, host: this.host, hostname: this.hostname, port: this.port, pathname: this.pathname, search: this.search, searchParams: this.searchParams, hash: this.hash };
        }
        clone() {
          return new h(String(this), this[d].options);
        }
      }
    }, 1323: (e, t, r) => {
      "use strict";
      r.d(t, { l: () => n });
      class n {
        static get(e2, t2, r2) {
          let n2 = Reflect.get(e2, t2, r2);
          return "function" == typeof n2 ? n2.bind(e2) : n2;
        }
        static set(e2, t2, r2, n2) {
          return Reflect.set(e2, t2, r2, n2);
        }
        static has(e2, t2) {
          return Reflect.has(e2, t2);
        }
        static deleteProperty(e2, t2) {
          return Reflect.deleteProperty(e2, t2);
        }
      }
    }, 9308: (e, t, r) => {
      "use strict";
      r.d(t, { Ud: () => n.stringifyCookie, VO: () => n.ResponseCookies, tm: () => n.RequestCookies });
      var n = r(7555);
    }, 7390: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => l });
      var n = r(5269), i = r(1846), a = r(4263), o = r(9308);
      let s = Symbol("internal request");
      class l extends Request {
        constructor(e2, t2 = {}) {
          let r2 = "string" != typeof e2 && "url" in e2 ? e2.url : String(e2);
          (0, i.qU)(r2), e2 instanceof Request ? super(e2, t2) : super(r2, t2);
          let a2 = new n.X(r2, { headers: (0, i.Cu)(this.headers), nextConfig: t2.nextConfig });
          this[s] = { cookies: new o.tm(this.headers), nextUrl: a2, url: a2.toString() };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, nextUrl: this.nextUrl, url: this.url, bodyUsed: this.bodyUsed, cache: this.cache, credentials: this.credentials, destination: this.destination, headers: Object.fromEntries(this.headers), integrity: this.integrity, keepalive: this.keepalive, method: this.method, mode: this.mode, redirect: this.redirect, referrer: this.referrer, referrerPolicy: this.referrerPolicy, signal: this.signal };
        }
        get cookies() {
          return this[s].cookies;
        }
        get nextUrl() {
          return this[s].nextUrl;
        }
        get page() {
          throw new a.Yq();
        }
        get ua() {
          throw new a.l_();
        }
        get url() {
          return this[s].url;
        }
      }
    }, 1532: (e, t, r) => {
      "use strict";
      r.d(t, { R: () => c });
      var n = r(9308), i = r(5269), a = r(1846), o = r(1323);
      let s = Symbol("internal response"), l = /* @__PURE__ */ new Set([301, 302, 303, 307, 308]);
      function u(e2, t2) {
        var r2;
        if (null == e2 ? void 0 : null == (r2 = e2.request) ? void 0 : r2.headers) {
          if (!(e2.request.headers instanceof Headers))
            throw Error("request.headers must be an instance of Headers");
          let r3 = [];
          for (let [n2, i2] of e2.request.headers)
            t2.set("x-middleware-request-" + n2, i2), r3.push(n2);
          t2.set("x-middleware-override-headers", r3.join(","));
        }
      }
      class c extends Response {
        constructor(e2, t2 = {}) {
          super(e2, t2);
          let r2 = this.headers, l2 = new Proxy(new n.VO(r2), { get(e3, i2, a2) {
            switch (i2) {
              case "delete":
              case "set":
                return (...a3) => {
                  let o2 = Reflect.apply(e3[i2], e3, a3), s2 = new Headers(r2);
                  return o2 instanceof n.VO && r2.set("x-middleware-set-cookie", o2.getAll().map((e4) => (0, n.Ud)(e4)).join(",")), u(t2, s2), o2;
                };
              default:
                return o.l.get(e3, i2, a2);
            }
          } });
          this[s] = { cookies: l2, url: t2.url ? new i.X(t2.url, { headers: (0, a.Cu)(r2), nextConfig: t2.nextConfig }) : void 0 };
        }
        [Symbol.for("edge-runtime.inspect.custom")]() {
          return { cookies: this.cookies, url: this.url, body: this.body, bodyUsed: this.bodyUsed, headers: Object.fromEntries(this.headers), ok: this.ok, redirected: this.redirected, status: this.status, statusText: this.statusText, type: this.type };
        }
        get cookies() {
          return this[s].cookies;
        }
        static json(e2, t2) {
          let r2 = Response.json(e2, t2);
          return new c(r2.body, r2);
        }
        static redirect(e2, t2) {
          let r2 = "number" == typeof t2 ? t2 : (null == t2 ? void 0 : t2.status) ?? 307;
          if (!l.has(r2))
            throw RangeError('Failed to execute "redirect" on "response": Invalid status code');
          let n2 = "object" == typeof t2 ? t2 : {}, i2 = new Headers(null == n2 ? void 0 : n2.headers);
          return i2.set("Location", (0, a.qU)(e2)), new c(null, { ...n2, headers: i2, status: r2 });
        }
        static rewrite(e2, t2) {
          let r2 = new Headers(null == t2 ? void 0 : t2.headers);
          return r2.set("x-middleware-rewrite", (0, a.qU)(e2)), u(t2, r2), new c(null, { ...t2, headers: r2 });
        }
        static next(e2) {
          let t2 = new Headers(null == e2 ? void 0 : e2.headers);
          return t2.set("x-middleware-next", "1"), u(e2, t2), new c(null, { ...e2, headers: t2 });
        }
      }
    }, 1846: (e, t, r) => {
      "use strict";
      r.d(t, { Cu: () => o, RD: () => a, p$: () => i, qU: () => s, wN: () => l });
      var n = r(1031);
      function i(e2) {
        let t2 = new Headers();
        for (let [r2, n2] of Object.entries(e2))
          for (let e3 of Array.isArray(n2) ? n2 : [n2])
            void 0 !== e3 && ("number" == typeof e3 && (e3 = e3.toString()), t2.append(r2, e3));
        return t2;
      }
      function a(e2) {
        var t2, r2, n2, i2, a2, o2 = [], s2 = 0;
        function l2() {
          for (; s2 < e2.length && /\s/.test(e2.charAt(s2)); )
            s2 += 1;
          return s2 < e2.length;
        }
        for (; s2 < e2.length; ) {
          for (t2 = s2, a2 = false; l2(); )
            if ("," === (r2 = e2.charAt(s2))) {
              for (n2 = s2, s2 += 1, l2(), i2 = s2; s2 < e2.length && "=" !== (r2 = e2.charAt(s2)) && ";" !== r2 && "," !== r2; )
                s2 += 1;
              s2 < e2.length && "=" === e2.charAt(s2) ? (a2 = true, s2 = i2, o2.push(e2.substring(t2, n2)), t2 = s2) : s2 = n2 + 1;
            } else
              s2 += 1;
          (!a2 || s2 >= e2.length) && o2.push(e2.substring(t2, e2.length));
        }
        return o2;
      }
      function o(e2) {
        let t2 = {}, r2 = [];
        if (e2)
          for (let [n2, i2] of e2.entries())
            "set-cookie" === n2.toLowerCase() ? (r2.push(...a(i2)), t2[n2] = 1 === r2.length ? r2[0] : r2) : t2[n2] = i2;
        return t2;
      }
      function s(e2) {
        try {
          return String(new URL(String(e2)));
        } catch (t2) {
          throw Error(`URL is malformed "${String(e2)}". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls`, { cause: t2 });
        }
      }
      function l(e2, t2) {
        for (let r2 of [n.AA, n.h])
          e2 !== r2 && e2.startsWith(r2) && t2(e2.substring(r2.length));
      }
    }, 6152: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2)
          Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { getTestReqInfo: function() {
        return o;
      }, withRequest: function() {
        return a;
      } });
      let n = new (r(5521)).AsyncLocalStorage();
      function i(e2, t2) {
        let r2 = t2.header(e2, "next-test-proxy-port");
        if (r2)
          return { url: t2.url(e2), proxyPort: Number(r2), testData: t2.header(e2, "next-test-data") || "" };
      }
      function a(e2, t2, r2) {
        let a2 = i(e2, t2);
        return a2 ? n.run(a2, r2) : r2();
      }
      function o(e2, t2) {
        return n.getStore() || (e2 && t2 ? i(e2, t2) : void 0);
      }
    }, 8053: (e, t, r) => {
      "use strict";
      var n = r(5356).Buffer;
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2)
          Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { handleFetch: function() {
        return s;
      }, interceptFetch: function() {
        return l;
      }, reader: function() {
        return a;
      } });
      let i = r(6152), a = { url: (e2) => e2.url, header: (e2, t2) => e2.headers.get(t2) };
      async function o(e2, t2) {
        let { url: r2, method: i2, headers: a2, body: o2, cache: s2, credentials: l2, integrity: u, mode: c, redirect: d, referrer: h, referrerPolicy: f } = t2;
        return { testData: e2, api: "fetch", request: { url: r2, method: i2, headers: [...Array.from(a2), ["next-test-stack", function() {
          let e3 = (Error().stack ?? "").split("\n");
          for (let t3 = 1; t3 < e3.length; t3++)
            if (e3[t3].length > 0) {
              e3 = e3.slice(t3);
              break;
            }
          return (e3 = (e3 = (e3 = e3.filter((e4) => !e4.includes("/next/dist/"))).slice(0, 5)).map((e4) => e4.replace("webpack-internal:///(rsc)/", "").trim())).join("    ");
        }()]], body: o2 ? n.from(await t2.arrayBuffer()).toString("base64") : null, cache: s2, credentials: l2, integrity: u, mode: c, redirect: d, referrer: h, referrerPolicy: f } };
      }
      async function s(e2, t2) {
        let r2 = (0, i.getTestReqInfo)(t2, a);
        if (!r2)
          return e2(t2);
        let { testData: s2, proxyPort: l2 } = r2, u = await o(s2, t2), c = await e2(`http://localhost:${l2}`, { method: "POST", body: JSON.stringify(u), next: { internal: true } });
        if (!c.ok)
          throw Error(`Proxy request failed: ${c.status}`);
        let d = await c.json(), { api: h } = d;
        switch (h) {
          case "continue":
            return e2(t2);
          case "abort":
          case "unhandled":
            throw Error(`Proxy request aborted [${t2.method} ${t2.url}]`);
        }
        return function(e3) {
          let { status: t3, headers: r3, body: i2 } = e3.response;
          return new Response(i2 ? n.from(i2, "base64") : null, { status: t3, headers: new Headers(r3) });
        }(d);
      }
      function l(e2) {
        return r.g.fetch = function(t2, r2) {
          var n2;
          return (null == r2 ? void 0 : null == (n2 = r2.next) ? void 0 : n2.internal) ? e2(t2, r2) : s(e2, new Request(t2, r2));
        }, () => {
          r.g.fetch = e2;
        };
      }
    }, 2384: (e, t, r) => {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: true }), function(e2, t2) {
        for (var r2 in t2)
          Object.defineProperty(e2, r2, { enumerable: true, get: t2[r2] });
      }(t, { interceptTestApis: function() {
        return a;
      }, wrapRequestHandler: function() {
        return o;
      } });
      let n = r(6152), i = r(8053);
      function a() {
        return (0, i.interceptFetch)(r.g.fetch);
      }
      function o(e2) {
        return (t2, r2) => (0, n.withRequest)(t2, i.reader, () => e2(t2, r2));
      }
    }, 3897: (e, t, r) => {
      "use strict";
      var n = r(2559), i = r(5267);
      r(117), r(3886), r(6927), n.IntlError, n.IntlErrorCode, n.createFormatter, t.gZ = i.createCache, t.CB = i.createIntlFormatters, t.TD = i.initializeConfig;
    }, 2559: (e, t, r) => {
      "use strict";
      var n = r(117), i = r(3886), a = r(5267), o = function(e2) {
        return e2 && e2.__esModule ? e2 : { default: e2 };
      }(n);
      function s(e2, t2, r2) {
        var n2;
        return (t2 = "symbol" == typeof (n2 = function(e3, t3) {
          if ("object" != typeof e3 || !e3)
            return e3;
          var r3 = e3[Symbol.toPrimitive];
          if (void 0 !== r3) {
            var n3 = r3.call(e3, t3 || "default");
            if ("object" != typeof n3)
              return n3;
            throw TypeError("@@toPrimitive must return a primitive value.");
          }
          return ("string" === t3 ? String : Number)(e3);
        }(t2, "string")) ? n2 : n2 + "") in e2 ? Object.defineProperty(e2, t2, { value: r2, enumerable: true, configurable: true, writable: true }) : e2[t2] = r2, e2;
      }
      let l = function(e2) {
        return e2.MISSING_MESSAGE = "MISSING_MESSAGE", e2.MISSING_FORMAT = "MISSING_FORMAT", e2.ENVIRONMENT_FALLBACK = "ENVIRONMENT_FALLBACK", e2.INSUFFICIENT_PATH = "INSUFFICIENT_PATH", e2.INVALID_MESSAGE = "INVALID_MESSAGE", e2.INVALID_KEY = "INVALID_KEY", e2.FORMATTING_ERROR = "FORMATTING_ERROR", e2;
      }({});
      class u extends Error {
        constructor(e2, t2) {
          let r2 = e2;
          t2 && (r2 += ": " + t2), super(r2), s(this, "code", void 0), s(this, "originalMessage", void 0), this.code = e2, t2 && (this.originalMessage = t2);
        }
      }
      function c(e2, t2) {
        return e2 ? Object.keys(e2).reduce((r2, n2) => (r2[n2] = { timeZone: t2, ...e2[n2] }, r2), {}) : e2;
      }
      function d(e2, t2, r2, n2) {
        let i2 = a.joinPath(n2, r2);
        if (!t2)
          throw Error(i2);
        let o2 = t2;
        return r2.split(".").forEach((t3) => {
          let r3 = o2[t3];
          if (null == t3 || null == r3)
            throw Error(i2 + " (".concat(e2, ")"));
          o2 = r3;
        }), o2;
      }
      let h = 365 / 12 * 86400, f = { second: 1, seconds: 1, minute: 60, minutes: 60, hour: 3600, hours: 3600, day: 86400, days: 86400, week: 604800, weeks: 604800, month: 365 / 12 * 86400, months: 365 / 12 * 86400, quarter: 365 / 12 * 259200, quarters: 365 / 12 * 259200, year: 31536e3, years: 31536e3 };
      t.IntlError = u, t.IntlErrorCode = l, t.createBaseTranslator = function(e2) {
        let t2 = function(e3, t3, r2) {
          let n2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : a.defaultOnError;
          try {
            if (!t3)
              throw Error(void 0);
            let n3 = r2 ? d(e3, t3, r2) : t3;
            if (!n3)
              throw Error(r2);
            return n3;
          } catch (t4) {
            let e4 = new u(l.MISSING_MESSAGE, t4.message);
            return n2(e4), e4;
          }
        }(e2.locale, e2.messages, e2.namespace, e2.onError);
        return function(e3) {
          let { cache: t3, defaultTranslationValues: r2, formats: n2, formatters: s2, getMessageFallback: h2 = a.defaultGetMessageFallback, locale: f2, messagesOrError: p, namespace: g, onError: m, timeZone: v } = e3, y = p instanceof u;
          function _(e4, t4, r3) {
            let n3 = new u(t4, r3);
            return m(n3), h2({ error: n3, key: e4, namespace: g });
          }
          function b(e4, u2, m2) {
            let b2, w2;
            if (y)
              return h2({ error: p, key: e4, namespace: g });
            try {
              b2 = d(f2, p, e4, g);
            } catch (t4) {
              return _(e4, l.MISSING_MESSAGE, t4.message);
            }
            if ("object" == typeof b2) {
              let t4;
              return _(e4, Array.isArray(b2) ? l.INVALID_MESSAGE : l.INSUFFICIENT_PATH, t4);
            }
            let S = function(e5, t4) {
              if (t4)
                return;
              let r3 = e5.replace(/'([{}])/gi, "$1");
              return /<|{/.test(r3) ? void 0 : r3;
            }(b2, u2);
            if (S)
              return S;
            s2.getMessageFormat || (s2.getMessageFormat = a.memoFn(function() {
              return new o.default(arguments.length <= 0 ? void 0 : arguments[0], arguments.length <= 1 ? void 0 : arguments[1], arguments.length <= 2 ? void 0 : arguments[2], { formatters: s2, ...arguments.length <= 3 ? void 0 : arguments[3] });
            }, t3.message));
            try {
              w2 = s2.getMessageFormat(b2, f2, function(e5, t4) {
                let r3 = t4 ? { ...e5, dateTime: c(e5.dateTime, t4) } : e5, n3 = o.default.formats.date, i2 = t4 ? c(n3, t4) : n3, a2 = o.default.formats.time, s3 = t4 ? c(a2, t4) : a2;
                return { ...r3, date: { ...i2, ...r3.dateTime }, time: { ...s3, ...r3.dateTime } };
              }({ ...n2, ...m2 }, v), { formatters: { ...s2, getDateTimeFormat: (e5, t4) => s2.getDateTimeFormat(e5, { timeZone: v, ...t4 }) } });
            } catch (t4) {
              return _(e4, l.INVALID_MESSAGE, t4.message);
            }
            try {
              let e5 = w2.format(function(e6) {
                if (0 === Object.keys(e6).length)
                  return;
                let t4 = {};
                return Object.keys(e6).forEach((r3) => {
                  let n3, a2 = 0, o2 = e6[r3];
                  n3 = "function" == typeof o2 ? (e7) => {
                    let t5 = o2(e7);
                    return i.isValidElement(t5) ? i.cloneElement(t5, { key: r3 + a2++ }) : t5;
                  } : o2, t4[r3] = n3;
                }), t4;
              }({ ...r2, ...u2 }));
              if (null == e5)
                throw Error(void 0);
              return i.isValidElement(e5) || Array.isArray(e5) || "string" == typeof e5 ? e5 : String(e5);
            } catch (t4) {
              return _(e4, l.FORMATTING_ERROR, t4.message);
            }
          }
          function w(e4, t4, r3) {
            let n3 = b(e4, t4, r3);
            return "string" != typeof n3 ? _(e4, l.INVALID_MESSAGE, void 0) : n3;
          }
          return w.rich = b, w.markup = (e4, t4, r3) => {
            let n3 = b(e4, t4, r3);
            if ("string" != typeof n3) {
              let t5 = new u(l.FORMATTING_ERROR, void 0);
              return m(t5), h2({ error: t5, key: e4, namespace: g });
            }
            return n3;
          }, w.raw = (e4) => {
            if (y)
              return h2({ error: p, key: e4, namespace: g });
            try {
              return d(f2, p, e4, g);
            } catch (t4) {
              return _(e4, l.MISSING_MESSAGE, t4.message);
            }
          }, w.has = (e4) => {
            if (y)
              return false;
            try {
              return d(f2, p, e4, g), true;
            } catch (e5) {
              return false;
            }
          }, w;
        }({ ...e2, messagesOrError: t2 });
      }, t.createFormatter = function(e2) {
        let { _cache: t2 = a.createCache(), _formatters: r2 = a.createIntlFormatters(t2), formats: n2, locale: i2, now: o2, onError: s2 = a.defaultOnError, timeZone: c2 } = e2;
        function d2(e3) {
          var t3;
          return null !== (t3 = e3) && void 0 !== t3 && t3.timeZone || (c2 ? e3 = { ...e3, timeZone: c2 } : s2(new u(l.ENVIRONMENT_FALLBACK, void 0))), e3;
        }
        function p(e3, t3, r3, n3) {
          let i3;
          try {
            i3 = function(e4, t4) {
              let r4;
              if ("string" == typeof t4) {
                if (!(r4 = null == e4 ? void 0 : e4[t4])) {
                  let e5 = new u(l.MISSING_FORMAT, void 0);
                  throw s2(e5), e5;
                }
              } else
                r4 = t4;
              return r4;
            }(t3, e3);
          } catch (e4) {
            return n3();
          }
          try {
            return r3(i3);
          } catch (e4) {
            return s2(new u(l.FORMATTING_ERROR, e4.message)), n3();
          }
        }
        function g(e3, t3) {
          return p(t3, null == n2 ? void 0 : n2.dateTime, (t4) => (t4 = d2(t4), r2.getDateTimeFormat(i2, t4).format(e3)), () => String(e3));
        }
        function m() {
          return o2 || (s2(new u(l.ENVIRONMENT_FALLBACK, void 0)), /* @__PURE__ */ new Date());
        }
        return { dateTime: g, number: function(e3, t3) {
          return p(t3, null == n2 ? void 0 : n2.number, (t4) => r2.getNumberFormat(i2, t4).format(e3), () => String(e3));
        }, relativeTime: function(e3, t3) {
          try {
            var n3;
            let a2, o3;
            let s3 = {};
            t3 instanceof Date || "number" == typeof t3 ? a2 = new Date(t3) : t3 && (a2 = null != t3.now ? new Date(t3.now) : m(), o3 = t3.unit, s3.style = t3.style, s3.numberingSystem = t3.numberingSystem), a2 || (a2 = m());
            let l2 = (new Date(e3).getTime() - a2.getTime()) / 1e3;
            o3 || (o3 = function(e4) {
              let t4 = Math.abs(e4);
              return t4 < 60 ? "second" : t4 < 3600 ? "minute" : t4 < 86400 ? "hour" : t4 < 604800 ? "day" : t4 < h ? "week" : t4 < 31536e3 ? "month" : "year";
            }(l2)), s3.numeric = "second" === o3 ? "auto" : "always";
            let u2 = (n3 = o3, Math.round(l2 / f[n3]));
            return r2.getRelativeTimeFormat(i2, s3).format(u2, o3);
          } catch (t4) {
            return s2(new u(l.FORMATTING_ERROR, t4.message)), String(e3);
          }
        }, list: function(e3, t3) {
          let a2 = [], o3 = /* @__PURE__ */ new Map(), s3 = 0;
          for (let t4 of e3) {
            let e4;
            "object" == typeof t4 ? (e4 = String(s3), o3.set(e4, t4)) : e4 = String(t4), a2.push(e4), s3++;
          }
          return p(t3, null == n2 ? void 0 : n2.list, (e4) => {
            let t4 = r2.getListFormat(i2, e4).formatToParts(a2).map((e5) => "literal" === e5.type ? e5.value : o3.get(e5.value) || e5.value);
            return o3.size > 0 ? t4 : t4.join("");
          }, () => String(e3));
        }, dateTimeRange: function(e3, t3, a2) {
          return p(a2, null == n2 ? void 0 : n2.dateTime, (n3) => (n3 = d2(n3), r2.getDateTimeFormat(i2, n3).formatRange(e3, t3)), () => [g(e3), g(t3)].join("\u2009\u2013\u2009"));
        } };
      }, t.resolveNamespace = function(e2, t2) {
        return e2 === t2 ? void 0 : e2.slice((t2 + ".").length);
      };
    }, 5267: (e, t, r) => {
      "use strict";
      var n = r(6927);
      function i() {
        for (var e2 = arguments.length, t2 = Array(e2), r2 = 0; r2 < e2; r2++)
          t2[r2] = arguments[r2];
        return t2.filter(Boolean).join(".");
      }
      function a(e2) {
        return i(e2.namespace, e2.key);
      }
      function o(e2) {
        console.error(e2);
      }
      function s(e2, t2) {
        return n.memoize(e2, { cache: { create: () => ({ get: (e3) => t2[e3], set(e3, r2) {
          t2[e3] = r2;
        } }) }, strategy: n.strategies.variadic });
      }
      function l(e2, t2) {
        return s(function() {
          for (var t3 = arguments.length, r2 = Array(t3), n2 = 0; n2 < t3; n2++)
            r2[n2] = arguments[n2];
          return new e2(...r2);
        }, t2);
      }
      t.createCache = function() {
        return { dateTime: {}, number: {}, message: {}, relativeTime: {}, pluralRules: {}, list: {}, displayNames: {} };
      }, t.createIntlFormatters = function(e2) {
        return { getDateTimeFormat: l(Intl.DateTimeFormat, e2.dateTime), getNumberFormat: l(Intl.NumberFormat, e2.number), getPluralRules: l(Intl.PluralRules, e2.pluralRules), getRelativeTimeFormat: l(Intl.RelativeTimeFormat, e2.relativeTime), getListFormat: l(Intl.ListFormat, e2.list), getDisplayNames: l(Intl.DisplayNames, e2.displayNames) };
      }, t.defaultGetMessageFallback = a, t.defaultOnError = o, t.initializeConfig = function(e2) {
        let { getMessageFallback: t2, messages: r2, onError: n2, ...i2 } = e2;
        return { ...i2, messages: r2, onError: n2 || o, getMessageFallback: t2 || a };
      }, t.joinPath = i, t.memoFn = s;
    }, 6590: (e, t, r) => {
      "use strict";
      r.d(t, { J: () => n });
      let n = (0, r(2058).xl)();
    }, 8553: (e, t, r) => {
      "use strict";
      r.d(t, { XN: () => i, FP: () => n });
      let n = (0, r(2058).xl)();
      function i(e2) {
        let t2 = n.getStore();
        if (t2) {
          if ("request" === t2.type)
            return t2;
          if ("prerender" === t2.type || "prerender-ppr" === t2.type || "prerender-legacy" === t2.type)
            throw Error(`\`${e2}\` cannot be called inside a prerender. This is a bug in Next.js.`);
          if ("cache" === t2.type)
            throw Error(`\`${e2}\` cannot be called inside "use cache". Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/messages/next-request-in-use-cache`);
          if ("unstable-cache" === t2.type)
            throw Error(`\`${e2}\` cannot be called inside unstable_cache. Call it outside and pass an argument instead. Read more: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
        }
        throw Error(`\`${e2}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`);
      }
    }, 3622: (e, t, r) => {
      "use strict";
      let n;
      r.r(t), r.d(t, { default: () => tM });
      var i = {};
      async function a() {
        return "_ENTRIES" in globalThis && _ENTRIES.middleware_instrumentation && await _ENTRIES.middleware_instrumentation;
      }
      r.r(i), r.d(i, { config: () => tx, default: () => tP });
      let o = null;
      async function s() {
        if ("phase-production-build" === process.env.NEXT_PHASE)
          return;
        o || (o = a());
        let e10 = await o;
        if (null == e10 ? void 0 : e10.register)
          try {
            await e10.register();
          } catch (e11) {
            throw e11.message = `An error occurred while loading instrumentation hook: ${e11.message}`, e11;
          }
      }
      async function l(...e10) {
        let t2 = await a();
        try {
          var r2;
          await (null == t2 ? void 0 : null == (r2 = t2.onRequestError) ? void 0 : r2.call(t2, ...e10));
        } catch (e11) {
          console.error("Error in instrumentation.onRequestError:", e11);
        }
      }
      let u = null;
      function c() {
        return u || (u = s()), u;
      }
      function d(e10) {
        return `The edge runtime does not support Node.js '${e10}' module.
Learn More: https://nextjs.org/docs/messages/node-module-in-edge-runtime`;
      }
      process !== r.g.process && (process.env = r.g.process.env, r.g.process = process), Object.defineProperty(globalThis, "__import_unsupported", { value: function(e10) {
        let t2 = new Proxy(function() {
        }, { get(t3, r2) {
          if ("then" === r2)
            return {};
          throw Error(d(e10));
        }, construct() {
          throw Error(d(e10));
        }, apply(r2, n2, i2) {
          if ("function" == typeof i2[0])
            return i2[0](t2);
          throw Error(d(e10));
        } });
        return new Proxy({}, { get: () => t2 });
      }, enumerable: false, configurable: false }), c();
      var h = r(4263), f = r(1846);
      let p = Symbol("response"), g = Symbol("passThrough"), m = Symbol("waitUntil");
      class v {
        constructor(e10, t2) {
          this[g] = false, this[m] = t2 ? { kind: "external", function: t2 } : { kind: "internal", promises: [] };
        }
        respondWith(e10) {
          this[p] || (this[p] = Promise.resolve(e10));
        }
        passThroughOnException() {
          this[g] = true;
        }
        waitUntil(e10) {
          if ("external" === this[m].kind)
            return (0, this[m].function)(e10);
          this[m].promises.push(e10);
        }
      }
      class y extends v {
        constructor(e10) {
          var t2;
          super(e10.request, null == (t2 = e10.context) ? void 0 : t2.waitUntil), this.sourcePage = e10.page;
        }
        get request() {
          throw new h.CB({ page: this.sourcePage });
        }
        respondWith() {
          throw new h.CB({ page: this.sourcePage });
        }
      }
      var _ = r(7390), b = r(1532);
      function w(e10, t2) {
        let r2 = "string" == typeof t2 ? new URL(t2) : t2, n2 = new URL(e10, t2), i2 = r2.protocol + "//" + r2.host;
        return n2.protocol + "//" + n2.host === i2 ? n2.toString().replace(i2, "") : n2.toString();
      }
      var S = r(5269);
      let E = "Next-Router-Prefetch", C = ["RSC", "Next-Router-State-Tree", E, "Next-HMR-Refresh", "Next-Router-Segment-Prefetch"], T = ["__nextFallback", "__nextLocale", "__nextInferredLocaleFromDefault", "__nextDefaultLocale", "__nextIsNotFound", "_rsc"], P = ["__nextDataReq"];
      var x = r(1323);
      class R extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new R();
        }
      }
      class A extends Headers {
        constructor(e10) {
          super(), this.headers = new Proxy(e10, { get(t2, r2, n2) {
            if ("symbol" == typeof r2)
              return x.l.get(t2, r2, n2);
            let i2 = r2.toLowerCase(), a2 = Object.keys(e10).find((e11) => e11.toLowerCase() === i2);
            if (void 0 !== a2)
              return x.l.get(t2, a2, n2);
          }, set(t2, r2, n2, i2) {
            if ("symbol" == typeof r2)
              return x.l.set(t2, r2, n2, i2);
            let a2 = r2.toLowerCase(), o2 = Object.keys(e10).find((e11) => e11.toLowerCase() === a2);
            return x.l.set(t2, o2 ?? r2, n2, i2);
          }, has(t2, r2) {
            if ("symbol" == typeof r2)
              return x.l.has(t2, r2);
            let n2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 !== i2 && x.l.has(t2, i2);
          }, deleteProperty(t2, r2) {
            if ("symbol" == typeof r2)
              return x.l.deleteProperty(t2, r2);
            let n2 = r2.toLowerCase(), i2 = Object.keys(e10).find((e11) => e11.toLowerCase() === n2);
            return void 0 === i2 || x.l.deleteProperty(t2, i2);
          } });
        }
        static seal(e10) {
          return new Proxy(e10, { get(e11, t2, r2) {
            switch (t2) {
              case "append":
              case "delete":
              case "set":
                return R.callable;
              default:
                return x.l.get(e11, t2, r2);
            }
          } });
        }
        merge(e10) {
          return Array.isArray(e10) ? e10.join(", ") : e10;
        }
        static from(e10) {
          return e10 instanceof Headers ? e10 : new A(e10);
        }
        append(e10, t2) {
          let r2 = this.headers[e10];
          "string" == typeof r2 ? this.headers[e10] = [r2, t2] : Array.isArray(r2) ? r2.push(t2) : this.headers[e10] = t2;
        }
        delete(e10) {
          delete this.headers[e10];
        }
        get(e10) {
          let t2 = this.headers[e10];
          return void 0 !== t2 ? this.merge(t2) : null;
        }
        has(e10) {
          return void 0 !== this.headers[e10];
        }
        set(e10, t2) {
          this.headers[e10] = t2;
        }
        forEach(e10, t2) {
          for (let [r2, n2] of this.entries())
            e10.call(t2, n2, r2, this);
        }
        *entries() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = e10.toLowerCase(), r2 = this.get(t2);
            yield [t2, r2];
          }
        }
        *keys() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = e10.toLowerCase();
            yield t2;
          }
        }
        *values() {
          for (let e10 of Object.keys(this.headers)) {
            let t2 = this.get(e10);
            yield t2;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      }
      var O = r(9308), M = r(6590), L = r(8553);
      class N extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new N();
        }
      }
      class I {
        static seal(e10) {
          return new Proxy(e10, { get(e11, t2, r2) {
            switch (t2) {
              case "clear":
              case "delete":
              case "set":
                return N.callable;
              default:
                return x.l.get(e11, t2, r2);
            }
          } });
        }
      }
      let k = Symbol.for("next.mutated.cookies");
      class B {
        static wrap(e10, t2) {
          let r2 = new O.VO(new Headers());
          for (let t3 of e10.getAll())
            r2.set(t3);
          let n2 = [], i2 = /* @__PURE__ */ new Set(), a2 = () => {
            let e11 = M.J.getStore();
            if (e11 && (e11.pathWasRevalidated = true), n2 = r2.getAll().filter((e12) => i2.has(e12.name)), t2) {
              let e12 = [];
              for (let t3 of n2) {
                let r3 = new O.VO(new Headers());
                r3.set(t3), e12.push(r3.toString());
              }
              t2(e12);
            }
          }, o2 = new Proxy(r2, { get(e11, t3, r3) {
            switch (t3) {
              case k:
                return n2;
              case "delete":
                return function(...t4) {
                  i2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e11.delete(...t4), o2;
                  } finally {
                    a2();
                  }
                };
              case "set":
                return function(...t4) {
                  i2.add("string" == typeof t4[0] ? t4[0] : t4[0].name);
                  try {
                    return e11.set(...t4), o2;
                  } finally {
                    a2();
                  }
                };
              default:
                return x.l.get(e11, t3, r3);
            }
          } });
          return o2;
        }
      }
      function D(e10) {
        if ("action" !== (0, L.XN)(e10).phase)
          throw new N();
      }
      var H = r(1031), U = function(e10) {
        return e10.handleRequest = "BaseServer.handleRequest", e10.run = "BaseServer.run", e10.pipe = "BaseServer.pipe", e10.getStaticHTML = "BaseServer.getStaticHTML", e10.render = "BaseServer.render", e10.renderToResponseWithComponents = "BaseServer.renderToResponseWithComponents", e10.renderToResponse = "BaseServer.renderToResponse", e10.renderToHTML = "BaseServer.renderToHTML", e10.renderError = "BaseServer.renderError", e10.renderErrorToResponse = "BaseServer.renderErrorToResponse", e10.renderErrorToHTML = "BaseServer.renderErrorToHTML", e10.render404 = "BaseServer.render404", e10;
      }(U || {}), j = function(e10) {
        return e10.loadDefaultErrorComponents = "LoadComponents.loadDefaultErrorComponents", e10.loadComponents = "LoadComponents.loadComponents", e10;
      }(j || {}), q = function(e10) {
        return e10.getRequestHandler = "NextServer.getRequestHandler", e10.getServer = "NextServer.getServer", e10.getServerRequestHandler = "NextServer.getServerRequestHandler", e10.createServer = "createServer.createServer", e10;
      }(q || {}), G = function(e10) {
        return e10.compression = "NextNodeServer.compression", e10.getBuildId = "NextNodeServer.getBuildId", e10.createComponentTree = "NextNodeServer.createComponentTree", e10.clientComponentLoading = "NextNodeServer.clientComponentLoading", e10.getLayoutOrPageModule = "NextNodeServer.getLayoutOrPageModule", e10.generateStaticRoutes = "NextNodeServer.generateStaticRoutes", e10.generateFsStaticRoutes = "NextNodeServer.generateFsStaticRoutes", e10.generatePublicRoutes = "NextNodeServer.generatePublicRoutes", e10.generateImageRoutes = "NextNodeServer.generateImageRoutes.route", e10.sendRenderResult = "NextNodeServer.sendRenderResult", e10.proxyRequest = "NextNodeServer.proxyRequest", e10.runApi = "NextNodeServer.runApi", e10.render = "NextNodeServer.render", e10.renderHTML = "NextNodeServer.renderHTML", e10.imageOptimizer = "NextNodeServer.imageOptimizer", e10.getPagePath = "NextNodeServer.getPagePath", e10.getRoutesManifest = "NextNodeServer.getRoutesManifest", e10.findPageComponents = "NextNodeServer.findPageComponents", e10.getFontManifest = "NextNodeServer.getFontManifest", e10.getServerComponentManifest = "NextNodeServer.getServerComponentManifest", e10.getRequestHandler = "NextNodeServer.getRequestHandler", e10.renderToHTML = "NextNodeServer.renderToHTML", e10.renderError = "NextNodeServer.renderError", e10.renderErrorToHTML = "NextNodeServer.renderErrorToHTML", e10.render404 = "NextNodeServer.render404", e10.startResponse = "NextNodeServer.startResponse", e10.route = "route", e10.onProxyReq = "onProxyReq", e10.apiResolver = "apiResolver", e10.internalFetch = "internalFetch", e10;
      }(G || {}), $ = function(e10) {
        return e10.startServer = "startServer.startServer", e10;
      }($ || {}), F = function(e10) {
        return e10.getServerSideProps = "Render.getServerSideProps", e10.getStaticProps = "Render.getStaticProps", e10.renderToString = "Render.renderToString", e10.renderDocument = "Render.renderDocument", e10.createBodyResult = "Render.createBodyResult", e10;
      }(F || {}), V = function(e10) {
        return e10.renderToString = "AppRender.renderToString", e10.renderToReadableStream = "AppRender.renderToReadableStream", e10.getBodyResult = "AppRender.getBodyResult", e10.fetch = "AppRender.fetch", e10;
      }(V || {}), z = function(e10) {
        return e10.executeRoute = "Router.executeRoute", e10;
      }(z || {}), K = function(e10) {
        return e10.runHandler = "Node.runHandler", e10;
      }(K || {}), W = function(e10) {
        return e10.runHandler = "AppRouteRouteHandlers.runHandler", e10;
      }(W || {}), X = function(e10) {
        return e10.generateMetadata = "ResolveMetadata.generateMetadata", e10.generateViewport = "ResolveMetadata.generateViewport", e10;
      }(X || {}), Z = function(e10) {
        return e10.execute = "Middleware.execute", e10;
      }(Z || {});
      let Y = ["Middleware.execute", "BaseServer.handleRequest", "Render.getServerSideProps", "Render.getStaticProps", "AppRender.fetch", "AppRender.getBodyResult", "Render.renderDocument", "Node.runHandler", "AppRouteRouteHandlers.runHandler", "ResolveMetadata.generateMetadata", "ResolveMetadata.generateViewport", "NextNodeServer.createComponentTree", "NextNodeServer.findPageComponents", "NextNodeServer.getLayoutOrPageModule", "NextNodeServer.startResponse", "NextNodeServer.clientComponentLoading"], J = ["NextNodeServer.findPageComponents", "NextNodeServer.createComponentTree", "NextNodeServer.clientComponentLoading"];
      function Q(e10) {
        return null !== e10 && "object" == typeof e10 && "then" in e10 && "function" == typeof e10.then;
      }
      let { context: ee, propagation: et, trace: er, SpanStatusCode: en, SpanKind: ei, ROOT_CONTEXT: ea } = n = r(1777);
      class eo extends Error {
        constructor(e10, t2) {
          super(), this.bubble = e10, this.result = t2;
        }
      }
      let es = (e10, t2) => {
        (function(e11) {
          return "object" == typeof e11 && null !== e11 && e11 instanceof eo;
        })(t2) && t2.bubble ? e10.setAttribute("next.bubble", true) : (t2 && e10.recordException(t2), e10.setStatus({ code: en.ERROR, message: null == t2 ? void 0 : t2.message })), e10.end();
      }, el = /* @__PURE__ */ new Map(), eu = n.createContextKey("next.rootSpanId"), ec = 0, ed = () => ec++, eh = { set(e10, t2, r2) {
        e10.push({ key: t2, value: r2 });
      } };
      class ef {
        getTracerInstance() {
          return er.getTracer("next.js", "0.0.1");
        }
        getContext() {
          return ee;
        }
        getTracePropagationData() {
          let e10 = ee.active(), t2 = [];
          return et.inject(e10, t2, eh), t2;
        }
        getActiveScopeSpan() {
          return er.getSpan(null == ee ? void 0 : ee.active());
        }
        withPropagatedContext(e10, t2, r2) {
          let n2 = ee.active();
          if (er.getSpanContext(n2))
            return t2();
          let i2 = et.extract(n2, e10, r2);
          return ee.with(i2, t2);
        }
        trace(...e10) {
          var t2;
          let [r2, n2, i2] = e10, { fn: a2, options: o2 } = "function" == typeof n2 ? { fn: n2, options: {} } : { fn: i2, options: { ...n2 } }, s2 = o2.spanName ?? r2;
          if (!Y.includes(r2) && "1" !== process.env.NEXT_OTEL_VERBOSE || o2.hideSpan)
            return a2();
          let l2 = this.getSpanContext((null == o2 ? void 0 : o2.parentSpan) ?? this.getActiveScopeSpan()), u2 = false;
          l2 ? (null == (t2 = er.getSpanContext(l2)) ? void 0 : t2.isRemote) && (u2 = true) : (l2 = (null == ee ? void 0 : ee.active()) ?? ea, u2 = true);
          let c2 = ed();
          return o2.attributes = { "next.span_name": s2, "next.span_type": r2, ...o2.attributes }, ee.with(l2.setValue(eu, c2), () => this.getTracerInstance().startActiveSpan(s2, o2, (e11) => {
            let t3 = "performance" in globalThis && "measure" in performance ? globalThis.performance.now() : void 0, n3 = () => {
              el.delete(c2), t3 && process.env.NEXT_OTEL_PERFORMANCE_PREFIX && J.includes(r2 || "") && performance.measure(`${process.env.NEXT_OTEL_PERFORMANCE_PREFIX}:next-${(r2.split(".").pop() || "").replace(/[A-Z]/g, (e12) => "-" + e12.toLowerCase())}`, { start: t3, end: performance.now() });
            };
            u2 && el.set(c2, new Map(Object.entries(o2.attributes ?? {})));
            try {
              if (a2.length > 1)
                return a2(e11, (t5) => es(e11, t5));
              let t4 = a2(e11);
              if (Q(t4))
                return t4.then((t5) => (e11.end(), t5)).catch((t5) => {
                  throw es(e11, t5), t5;
                }).finally(n3);
              return e11.end(), n3(), t4;
            } catch (t4) {
              throw es(e11, t4), n3(), t4;
            }
          }));
        }
        wrap(...e10) {
          let t2 = this, [r2, n2, i2] = 3 === e10.length ? e10 : [e10[0], {}, e10[1]];
          return Y.includes(r2) || "1" === process.env.NEXT_OTEL_VERBOSE ? function() {
            let e11 = n2;
            "function" == typeof e11 && "function" == typeof i2 && (e11 = e11.apply(this, arguments));
            let a2 = arguments.length - 1, o2 = arguments[a2];
            if ("function" != typeof o2)
              return t2.trace(r2, e11, () => i2.apply(this, arguments));
            {
              let n3 = t2.getContext().bind(ee.active(), o2);
              return t2.trace(r2, e11, (e12, t3) => (arguments[a2] = function(e13) {
                return null == t3 || t3(e13), n3.apply(this, arguments);
              }, i2.apply(this, arguments)));
            }
          } : i2;
        }
        startSpan(...e10) {
          let [t2, r2] = e10, n2 = this.getSpanContext((null == r2 ? void 0 : r2.parentSpan) ?? this.getActiveScopeSpan());
          return this.getTracerInstance().startSpan(t2, r2, n2);
        }
        getSpanContext(e10) {
          return e10 ? er.setSpan(ee.active(), e10) : void 0;
        }
        getRootSpanAttributes() {
          let e10 = ee.active().getValue(eu);
          return el.get(e10);
        }
        setRootSpanAttribute(e10, t2) {
          let r2 = ee.active().getValue(eu), n2 = el.get(r2);
          n2 && n2.set(e10, t2);
        }
      }
      let ep = (() => {
        let e10 = new ef();
        return () => e10;
      })(), eg = "__prerender_bypass";
      Symbol("__next_preview_data"), Symbol(eg);
      class em {
        constructor(e10, t2, r2, n2) {
          var i2;
          let a2 = e10 && function(e11, t3) {
            let r3 = A.from(e11.headers);
            return { isOnDemandRevalidate: r3.get(H.kz) === t3.previewModeId, revalidateOnlyGenerated: r3.has(H.r4) };
          }(t2, e10).isOnDemandRevalidate, o2 = null == (i2 = r2.get(eg)) ? void 0 : i2.value;
          this.isEnabled = !!(!a2 && o2 && e10 && o2 === e10.previewModeId), this._previewModeId = null == e10 ? void 0 : e10.previewModeId, this._mutableCookies = n2;
        }
        enable() {
          if (!this._previewModeId)
            throw Error("Invariant: previewProps missing previewModeId this should never happen");
          this._mutableCookies.set({ name: eg, value: this._previewModeId, httpOnly: true, sameSite: "none", secure: true, path: "/" });
        }
        disable() {
          this._mutableCookies.set({ name: eg, value: "", httpOnly: true, sameSite: "none", secure: true, path: "/", expires: /* @__PURE__ */ new Date(0) });
        }
      }
      function ev(e10, t2) {
        if ("x-middleware-set-cookie" in e10.headers && "string" == typeof e10.headers["x-middleware-set-cookie"]) {
          let r2 = e10.headers["x-middleware-set-cookie"], n2 = new Headers();
          for (let e11 of (0, f.RD)(r2))
            n2.append("set-cookie", e11);
          for (let e11 of new O.VO(n2).getAll())
            t2.set(e11);
        }
      }
      var ey = r(5541), e_ = r.n(ey);
      class eb extends Error {
        constructor(e10, t2) {
          super("Invariant: " + (e10.endsWith(".") ? e10 : e10 + ".") + " This is a bug in Next.js.", t2), this.name = "InvariantError";
        }
      }
      async function ew(e10, t2) {
        if (!e10)
          return t2();
        let r2 = eS(e10);
        try {
          return await t2();
        } finally {
          let t3 = function(e11, t4) {
            let r3 = new Set(e11.revalidatedTags), n2 = new Set(e11.pendingRevalidateWrites);
            return { revalidatedTags: t4.revalidatedTags.filter((e12) => !r3.has(e12)), pendingRevalidates: Object.fromEntries(Object.entries(t4.pendingRevalidates).filter(([t5]) => !(t5 in e11.pendingRevalidates))), pendingRevalidateWrites: t4.pendingRevalidateWrites.filter((e12) => !n2.has(e12)) };
          }(r2, eS(e10));
          await eE(e10, t3);
        }
      }
      function eS(e10) {
        return { revalidatedTags: e10.revalidatedTags ? [...e10.revalidatedTags] : [], pendingRevalidates: { ...e10.pendingRevalidates }, pendingRevalidateWrites: e10.pendingRevalidateWrites ? [...e10.pendingRevalidateWrites] : [] };
      }
      async function eE(e10, { revalidatedTags: t2, pendingRevalidates: r2, pendingRevalidateWrites: n2 }) {
        var i2;
        return Promise.all([null == (i2 = e10.incrementalCache) ? void 0 : i2.revalidateTag(t2), ...Object.values(r2), ...n2]);
      }
      var eC = r(349), eT = r(2317);
      class eP {
        constructor({ waitUntil: e10, onClose: t2, onTaskError: r2 }) {
          this.workUnitStores = /* @__PURE__ */ new Set(), this.waitUntil = e10, this.onClose = t2, this.onTaskError = r2, this.callbackQueue = new (e_())(), this.callbackQueue.pause();
        }
        after(e10) {
          if (Q(e10))
            this.waitUntil || ex(), this.waitUntil(e10.catch((e11) => this.reportTaskError("promise", e11)));
          else if ("function" == typeof e10)
            this.addCallback(e10);
          else
            throw Error("`after()`: Argument must be a promise or a function");
        }
        addCallback(e10) {
          this.waitUntil || ex();
          let t2 = L.FP.getStore();
          t2 && this.workUnitStores.add(t2);
          let r2 = eT.Z.getStore(), n2 = r2 ? r2.rootTaskSpawnPhase : null == t2 ? void 0 : t2.phase;
          this.runCallbacksOnClosePromise || (this.runCallbacksOnClosePromise = this.runCallbacksOnClose(), this.waitUntil(this.runCallbacksOnClosePromise));
          let i2 = (0, eC.cg)(async () => {
            try {
              await eT.Z.run({ rootTaskSpawnPhase: n2 }, () => e10());
            } catch (e11) {
              this.reportTaskError("function", e11);
            }
          });
          this.callbackQueue.add(i2);
        }
        async runCallbacksOnClose() {
          return await new Promise((e10) => this.onClose(e10)), this.runCallbacks();
        }
        async runCallbacks() {
          if (0 === this.callbackQueue.size)
            return;
          for (let e11 of this.workUnitStores)
            e11.phase = "after";
          let e10 = M.J.getStore();
          if (!e10)
            throw new eb("Missing workStore in AfterContext.runCallbacks");
          return ew(e10, () => (this.callbackQueue.start(), this.callbackQueue.onIdle()));
        }
        reportTaskError(e10, t2) {
          if (console.error("promise" === e10 ? "A promise passed to `after()` rejected:" : "An error occurred in a function passed to `after()`:", t2), this.onTaskError)
            try {
              null == this.onTaskError || this.onTaskError.call(this, t2);
            } catch (e11) {
              console.error(new eb("`onTaskError` threw while handling an error thrown from an `after` task", { cause: e11 }));
            }
        }
      }
      function ex() {
        throw Error("`after()` will not work correctly, because `waitUntil` is not available in the current environment.");
      }
      class eR {
        onClose(e10) {
          if (this.isClosed)
            throw Error("Cannot subscribe to a closed CloseController");
          this.target.addEventListener("close", e10), this.listeners++;
        }
        dispatchClose() {
          if (this.isClosed)
            throw Error("Cannot close a CloseController multiple times");
          this.listeners > 0 && this.target.dispatchEvent(new Event("close")), this.isClosed = true;
        }
        constructor() {
          this.target = new EventTarget(), this.listeners = 0, this.isClosed = false;
        }
      }
      function eA() {
        return { previewModeId: process.env.__NEXT_PREVIEW_MODE_ID, previewModeSigningKey: process.env.__NEXT_PREVIEW_MODE_SIGNING_KEY || "", previewModeEncryptionKey: process.env.__NEXT_PREVIEW_MODE_ENCRYPTION_KEY || "" };
      }
      let eO = Symbol.for("@next/request-context");
      class eM extends _.J {
        constructor(e10) {
          super(e10.input, e10.init), this.sourcePage = e10.page;
        }
        get request() {
          throw new h.CB({ page: this.sourcePage });
        }
        respondWith() {
          throw new h.CB({ page: this.sourcePage });
        }
        waitUntil() {
          throw new h.CB({ page: this.sourcePage });
        }
      }
      let eL = { keys: (e10) => Array.from(e10.keys()), get: (e10, t2) => e10.get(t2) ?? void 0 }, eN = (e10, t2) => ep().withPropagatedContext(e10.headers, t2, eL), eI = false;
      async function ek(e10) {
        var t2;
        let n2, i2;
        !function() {
          if (!eI && (eI = true, "true" === process.env.NEXT_PRIVATE_TEST_PROXY)) {
            let { interceptTestApis: e11, wrapRequestHandler: t3 } = r(2384);
            e11(), eN = t3(eN);
          }
        }(), await c();
        let a2 = void 0 !== self.__BUILD_MANIFEST;
        e10.request.url = e10.request.url.replace(/\.rsc($|\?)/, "$1");
        let o2 = new S.X(e10.request.url, { headers: e10.request.headers, nextConfig: e10.request.nextConfig });
        for (let e11 of [...o2.searchParams.keys()]) {
          let t3 = o2.searchParams.getAll(e11);
          (0, f.wN)(e11, (r2) => {
            for (let e12 of (o2.searchParams.delete(r2), t3))
              o2.searchParams.append(r2, e12);
            o2.searchParams.delete(e11);
          });
        }
        let s2 = o2.buildId;
        o2.buildId = "";
        let l2 = e10.request.headers["x-nextjs-data"];
        l2 && "/index" === o2.pathname && (o2.pathname = "/");
        let u2 = (0, f.p$)(e10.request.headers), d2 = /* @__PURE__ */ new Map();
        if (!a2)
          for (let e11 of C) {
            let t3 = e11.toLowerCase(), r2 = u2.get(t3);
            r2 && (d2.set(t3, r2), u2.delete(t3));
          }
        let h2 = new eM({ page: e10.page, input: function(e11, t3) {
          let r2 = "string" == typeof e11, n3 = r2 ? new URL(e11) : e11;
          for (let e12 of T)
            n3.searchParams.delete(e12);
          if (t3)
            for (let e12 of P)
              n3.searchParams.delete(e12);
          return r2 ? n3.toString() : n3;
        }(o2, true).toString(), init: { body: e10.request.body, headers: u2, method: e10.request.method, nextConfig: e10.request.nextConfig, signal: e10.request.signal } });
        l2 && Object.defineProperty(h2, "__isData", { enumerable: false, value: true }), !globalThis.__incrementalCache && e10.IncrementalCache && (globalThis.__incrementalCache = new e10.IncrementalCache({ appDir: true, fetchCache: true, minimalMode: true, fetchCacheKeyPrefix: "", dev: false, requestHeaders: e10.request.headers, requestProtocol: "https", getPrerenderManifest: () => ({ version: -1, routes: {}, dynamicRoutes: {}, notFoundRoutes: [], preview: eA() }) }));
        let p2 = e10.request.waitUntil ?? (null == (t2 = function() {
          let e11 = globalThis[eO];
          return null == e11 ? void 0 : e11.get();
        }()) ? void 0 : t2.waitUntil), g2 = new y({ request: h2, page: e10.page, context: p2 ? { waitUntil: p2 } : void 0 });
        if ((n2 = await eN(h2, () => {
          if ("/middleware" === e10.page || "/src/middleware" === e10.page) {
            let t3 = g2.waitUntil.bind(g2), r2 = new eR();
            return ep().trace(Z.execute, { spanName: `middleware ${h2.method} ${h2.nextUrl.pathname}`, attributes: { "http.target": h2.nextUrl.pathname, "http.method": h2.method } }, async () => {
              try {
                var n3, a3, o3, l3, u3, c2, d3;
                let f2 = eA(), p3 = (u3 = h2.nextUrl, c2 = void 0, d3 = (e11) => {
                  i2 = e11;
                }, function(e11, t4, r3, n4, i3, a4, o4, s3, l4, u4) {
                  function c3(e12) {
                    r3 && r3.setHeader("Set-Cookie", e12);
                  }
                  let d4 = {};
                  return { type: "request", phase: e11, implicitTags: i3 ?? [], url: { pathname: n4.pathname, search: n4.search ?? "" }, get headers() {
                    return d4.headers || (d4.headers = function(e12) {
                      let t5 = A.from(e12);
                      for (let e13 of C)
                        t5.delete(e13.toLowerCase());
                      return A.seal(t5);
                    }(t4.headers)), d4.headers;
                  }, get cookies() {
                    if (!d4.cookies) {
                      let e12 = new O.tm(A.from(t4.headers));
                      ev(t4, e12), d4.cookies = I.seal(e12);
                    }
                    return d4.cookies;
                  }, set cookies(value) {
                    d4.cookies = value;
                  }, get mutableCookies() {
                    if (!d4.mutableCookies) {
                      let e12 = function(e13, t5) {
                        let r4 = new O.tm(A.from(e13));
                        return B.wrap(r4, t5);
                      }(t4.headers, a4 || (r3 ? c3 : void 0));
                      ev(t4, e12), d4.mutableCookies = e12;
                    }
                    return d4.mutableCookies;
                  }, get userspaceMutableCookies() {
                    if (!d4.userspaceMutableCookies) {
                      let e12 = function(e13) {
                        let t5 = new Proxy(e13, { get(e14, r4, n5) {
                          switch (r4) {
                            case "delete":
                              return function(...r5) {
                                return D("cookies().delete"), e14.delete(...r5), t5;
                              };
                            case "set":
                              return function(...r5) {
                                return D("cookies().set"), e14.set(...r5), t5;
                              };
                            default:
                              return x.l.get(e14, r4, n5);
                          }
                        } });
                        return t5;
                      }(this.mutableCookies);
                      d4.userspaceMutableCookies = e12;
                    }
                    return d4.userspaceMutableCookies;
                  }, get draftMode() {
                    return d4.draftMode || (d4.draftMode = new em(s3, t4, this.cookies, this.mutableCookies)), d4.draftMode;
                  }, renderResumeDataCache: o4 ?? null, isHmrRefresh: l4, serverComponentsHmrCache: u4 || globalThis.__serverComponentsHmrCache };
                }("action", h2, void 0, u3, c2, d3, void 0, f2, false, void 0)), m2 = function({ page: e11, fallbackRouteParams: t4, renderOpts: r3, requestEndedState: n4, isPrefetchRequest: i3 }) {
                  var a4;
                  let o4 = { isStaticGeneration: !r3.supportsDynamicResponse && !r3.isDraftMode && !r3.isServerAction, page: e11, fallbackRouteParams: t4, route: (a4 = e11.split("/").reduce((e12, t5, r4, n5) => t5 ? "(" === t5[0] && t5.endsWith(")") || "@" === t5[0] || ("page" === t5 || "route" === t5) && r4 === n5.length - 1 ? e12 : e12 + "/" + t5 : e12, "")).startsWith("/") ? a4 : "/" + a4, incrementalCache: r3.incrementalCache || globalThis.__incrementalCache, cacheLifeProfiles: r3.cacheLifeProfiles, isRevalidate: r3.isRevalidate, isPrerendering: r3.nextExport, fetchCache: r3.fetchCache, isOnDemandRevalidate: r3.isOnDemandRevalidate, isDraftMode: r3.isDraftMode, requestEndedState: n4, isPrefetchRequest: i3, buildId: r3.buildId, reactLoadableManifest: (null == r3 ? void 0 : r3.reactLoadableManifest) || {}, assetPrefix: (null == r3 ? void 0 : r3.assetPrefix) || "", afterContext: function(e12) {
                    let { waitUntil: t5, onClose: r4, onAfterTaskError: n5 } = e12;
                    return new eP({ waitUntil: t5, onClose: r4, onTaskError: n5 });
                  }(r3) };
                  return r3.store = o4, o4;
                }({ page: "/", fallbackRouteParams: null, renderOpts: { cacheLifeProfiles: null == (a3 = e10.request.nextConfig) ? void 0 : null == (n3 = a3.experimental) ? void 0 : n3.cacheLife, experimental: { isRoutePPREnabled: false, dynamicIO: false, authInterrupts: !!(null == (l3 = e10.request.nextConfig) ? void 0 : null == (o3 = l3.experimental) ? void 0 : o3.authInterrupts) }, buildId: s2 ?? "", supportsDynamicResponse: true, waitUntil: t3, onClose: r2.onClose.bind(r2), onAfterTaskError: void 0 }, requestEndedState: { ended: false }, isPrefetchRequest: h2.headers.has(E) });
                return await M.J.run(m2, () => L.FP.run(p3, e10.handler, h2, g2));
              } finally {
                setTimeout(() => {
                  r2.dispatchClose();
                }, 0);
              }
            });
          }
          return e10.handler(h2, g2);
        })) && !(n2 instanceof Response))
          throw TypeError("Expected an instance of Response to be returned");
        n2 && i2 && n2.headers.set("set-cookie", i2);
        let v2 = null == n2 ? void 0 : n2.headers.get("x-middleware-rewrite");
        if (n2 && v2 && !a2) {
          let t3 = new S.X(v2, { forceLocale: true, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          t3.host === h2.nextUrl.host && (t3.buildId = s2 || t3.buildId, n2.headers.set("x-middleware-rewrite", String(t3)));
          let r2 = w(String(t3), String(o2));
          l2 && n2.headers.set("x-nextjs-rewrite", r2);
        }
        let _2 = null == n2 ? void 0 : n2.headers.get("Location");
        if (n2 && _2 && !a2) {
          let t3 = new S.X(_2, { forceLocale: false, headers: e10.request.headers, nextConfig: e10.request.nextConfig });
          n2 = new Response(n2.body, n2), t3.host === h2.nextUrl.host && (t3.buildId = s2 || t3.buildId, n2.headers.set("Location", String(t3))), l2 && (n2.headers.delete("Location"), n2.headers.set("x-nextjs-redirect", w(String(t3), String(o2))));
        }
        let R2 = n2 || b.R.next(), N2 = R2.headers.get("x-middleware-override-headers"), k2 = [];
        if (N2) {
          for (let [e11, t3] of d2)
            R2.headers.set(`x-middleware-request-${e11}`, t3), k2.push(e11);
          k2.length > 0 && R2.headers.set("x-middleware-override-headers", N2 + "," + k2.join(","));
        }
        return { response: R2, waitUntil: ("internal" === g2[m].kind ? Promise.all(g2[m].promises).then(() => {
        }) : void 0) ?? Promise.resolve(), fetchMetrics: h2.fetchMetrics };
      }
      var eB = r(9230), eD = r(5194);
      function eH() {
        return (eH = Object.assign ? Object.assign.bind() : function(e10) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var r2 = arguments[t2];
            for (var n2 in r2)
              ({}).hasOwnProperty.call(r2, n2) && (e10[n2] = r2[n2]);
          }
          return e10;
        }).apply(null, arguments);
      }
      let eU = (0, r(2058).xl)();
      var ej = function(e10) {
        return e10[e10.SeeOther = 303] = "SeeOther", e10[e10.TemporaryRedirect = 307] = "TemporaryRedirect", e10[e10.PermanentRedirect = 308] = "PermanentRedirect", e10;
      }({});
      let eq = "NEXT_REDIRECT";
      var eG = function(e10) {
        return e10.push = "push", e10.replace = "replace", e10;
      }({});
      function e$(e10, t2, r2) {
        void 0 === r2 && (r2 = ej.TemporaryRedirect);
        let n2 = Error(eq);
        return n2.digest = eq + ";" + t2 + ";" + e10 + ";" + r2 + ";", n2;
      }
      function eF(e10, t2) {
        let r2 = eU.getStore();
        throw e$(e10, t2 || ((null == r2 ? void 0 : r2.isAction) ? eG.push : eG.replace), ej.TemporaryRedirect);
      }
      function eV(e10, t2) {
        throw void 0 === t2 && (t2 = eG.replace), e$(e10, t2, ej.PermanentRedirect);
      }
      Object.values({ NOT_FOUND: 404, FORBIDDEN: 403, UNAUTHORIZED: 401 });
      let ez = "NEXT_HTTP_ERROR_FALLBACK;404";
      function eK() {
        let e10 = Error(ez);
        throw e10.digest = ez, e10;
      }
      r(8023);
      var eW = r(4108);
      Symbol.for("react.postpone");
      var eX = r(3886);
      function eZ(e10) {
        return ("object" == typeof e10 ? null == e10.host && null == e10.hostname : !/^[a-z]+:/i.test(e10)) && !function(e11) {
          let t2 = "object" == typeof e11 ? e11.pathname : e11;
          return null != t2 && !t2.startsWith("/");
        }(e10);
      }
      function eY(e10) {
        return "function" == typeof e10.then;
      }
      let eJ = (0, r(7877).YR)(function() {
        throw Error(`Attempted to call the default export of "/Users/tarekgohar/Desktop/Projects/bmbs-website/node_modules/next-intl/dist/esm/navigation/shared/BaseLink.js" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.`);
      }, "/Users/tarekgohar/Desktop/Projects/bmbs-website/node_modules/next-intl/dist/esm/navigation/shared/BaseLink.js", "default");
      function eQ(e10) {
        let t2 = new URLSearchParams();
        for (let [r2, n2] of Object.entries(e10))
          Array.isArray(n2) ? n2.forEach((e11) => {
            t2.append(r2, String(e11));
          }) : t2.set(r2, String(n2));
        return "?" + t2.toString();
      }
      var e0 = r(3897), e1 = r(8923);
      let e2 = { current: null }, e3 = "function" == typeof eX.cache ? eX.cache : (e10) => e10, e6 = console.warn;
      function e8(e10) {
        return function(...t2) {
          e6(e10(...t2));
        };
      }
      e3((e10) => {
        try {
          e6(e2.current);
        } finally {
          e2.current = null;
        }
      });
      var e5 = r(1135);
      /* @__PURE__ */ new WeakMap(), e8(function(e10, t2) {
        let r2 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r2}used ${t2}. \`cookies()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      });
      var e4 = r(5330);
      function e9() {
        let e10 = M.J.getStore(), t2 = L.FP.getStore();
        if (e10) {
          if (t2 && "after" === t2.phase && !(0, e5.iC)())
            throw Error(`Route ${e10.route} used "headers" inside "after(...)". This is not supported. If you need this data inside an "after" callback, use "headers" outside of the callback. See more info here: https://nextjs.org/docs/canary/app/api-reference/functions/after`);
          if (e10.forceStatic)
            return te(A.seal(new Headers({})));
          if (t2) {
            if ("cache" === t2.type)
              throw Error(`Route ${e10.route} used "headers" inside "use cache". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === t2.type)
              throw Error(`Route ${e10.route} used "headers" inside a function cached with "unstable_cache(...)". Accessing Dynamic data sources inside a cache scope is not supported. If you need this data inside a cached function use "headers" outside of the cached function and pass the required dynamic data in as an argument. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
          }
          if (e10.dynamicShouldError)
            throw new e1.f(`Route ${e10.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`headers\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (t2) {
            if ("prerender" === t2.type)
              return function(e11, t3) {
                let r2 = e7.get(t3);
                if (r2)
                  return r2;
                let n2 = (0, e4.W)(t3.renderSignal, "`headers()`");
                return e7.set(t3, n2), Object.defineProperties(n2, { append: { value: function() {
                  let r3 = `\`headers().append(${tt(arguments[0])}, ...)\``, n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, delete: { value: function() {
                  let r3 = `\`headers().delete(${tt(arguments[0])})\``, n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, get: { value: function() {
                  let r3 = `\`headers().get(${tt(arguments[0])})\``, n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, has: { value: function() {
                  let r3 = `\`headers().has(${tt(arguments[0])})\``, n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, set: { value: function() {
                  let r3 = `\`headers().set(${tt(arguments[0])}, ...)\``, n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, getSetCookie: { value: function() {
                  let r3 = "`headers().getSetCookie()`", n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, forEach: { value: function() {
                  let r3 = "`headers().forEach(...)`", n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, keys: { value: function() {
                  let r3 = "`headers().keys()`", n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, values: { value: function() {
                  let r3 = "`headers().values()`", n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, entries: { value: function() {
                  let r3 = "`headers().entries()`", n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } }, [Symbol.iterator]: { value: function() {
                  let r3 = "`headers()[Symbol.iterator]()`", n3 = tr(e11, r3);
                  (0, eW.t3)(e11, r3, n3, t3);
                } } }), n2;
              }(e10.route, t2);
            "prerender-ppr" === t2.type ? (0, eW.Ui)(e10.route, "headers", t2.dynamicTracking) : "prerender-legacy" === t2.type && (0, eW.xI)("headers", e10, t2);
          }
          (0, eW.Pk)(e10, t2);
        }
        return te((0, L.XN)("headers").headers);
      }
      let e7 = /* @__PURE__ */ new WeakMap();
      function te(e10) {
        let t2 = e7.get(e10);
        if (t2)
          return t2;
        let r2 = Promise.resolve(e10);
        return e7.set(e10, r2), Object.defineProperties(r2, { append: { value: e10.append.bind(e10) }, delete: { value: e10.delete.bind(e10) }, get: { value: e10.get.bind(e10) }, has: { value: e10.has.bind(e10) }, set: { value: e10.set.bind(e10) }, getSetCookie: { value: e10.getSetCookie.bind(e10) }, forEach: { value: e10.forEach.bind(e10) }, keys: { value: e10.keys.bind(e10) }, values: { value: e10.values.bind(e10) }, entries: { value: e10.entries.bind(e10) }, [Symbol.iterator]: { value: e10[Symbol.iterator].bind(e10) } }), r2;
      }
      function tt(e10) {
        return "string" == typeof e10 ? `'${e10}'` : "...";
      }
      function tr(e10, t2) {
        let r2 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r2}used ${t2}. \`headers()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      }
      e8(tr), /* @__PURE__ */ new WeakMap();
      function tn(e10) {
        let t2 = workAsyncStorage.getStore(), r2 = workUnitAsyncStorage.getStore();
        if (t2) {
          if (r2) {
            if ("cache" === r2.type)
              throw Error(`Route ${t2.route} used "${e10}" inside "use cache". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/messages/next-request-in-use-cache`);
            if ("unstable-cache" === r2.type)
              throw Error(`Route ${t2.route} used "${e10}" inside a function cached with "unstable_cache(...)". The enabled status of draftMode can be read in caches but you must not enable or disable draftMode inside a cache. See more info here: https://nextjs.org/docs/app/api-reference/functions/unstable_cache`);
            if ("after" === r2.phase)
              throw Error(`Route ${t2.route} used "${e10}" inside \`after\`. The enabled status of draftMode can be read inside \`after\` but you cannot enable or disable draftMode. See more info here: https://nextjs.org/docs/app/api-reference/functions/after`);
          }
          if (t2.dynamicShouldError)
            throw new StaticGenBailoutError(`Route ${t2.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${e10}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`);
          if (r2) {
            if ("prerender" === r2.type) {
              let n2 = Error(`Route ${t2.route} used ${e10} without first calling \`await connection()\`. See more info here: https://nextjs.org/docs/messages/next-prerender-sync-headers`);
              abortAndThrowOnSynchronousRequestDataAccess(t2.route, e10, n2, r2);
            } else if ("prerender-ppr" === r2.type)
              postponeWithTracking(t2.route, e10, r2.dynamicTracking);
            else if ("prerender-legacy" === r2.type) {
              r2.revalidate = 0;
              let n2 = new DynamicServerError(`Route ${t2.route} couldn't be rendered statically because it used \`${e10}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`);
              throw t2.dynamicUsageDescription = e10, t2.dynamicUsageStack = n2.stack, n2;
            }
          }
        }
      }
      e8(function(e10, t2) {
        let r2 = e10 ? `Route "${e10}" ` : "This route ";
        return Error(`${r2}used ${t2}. \`draftMode()\` should be awaited before using its value. Learn more: https://nextjs.org/docs/messages/sync-dynamic-apis`);
      });
      let ti = "X-NEXT-INTL-LOCALE", ta = (0, eX.cache)(function() {
        return { locale: void 0 };
      });
      function to() {
        return ta().locale;
      }
      let ts = (0, eX.cache)(async function() {
        let e10 = e9();
        return eY(e10) ? await e10 : e10;
      }), tl = (0, eX.cache)(async function() {
        let e10;
        try {
          e10 = (await ts()).get(ti) || void 0;
        } catch (e11) {
          if (e11 instanceof Error && "DYNAMIC_SERVER_USAGE" === e11.digest) {
            let t2 = Error("Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#static-rendering", { cause: e11 });
            throw t2.digest = e11.digest, t2;
          }
          throw e11;
        }
        return e10;
      });
      async function tu() {
        return to() || await tl();
      }
      let tc = (0, eX.cache)(function() {
        let e10;
        try {
          e10 = e9().get(ti);
        } catch (e11) {
          throw e11 instanceof Error && "DYNAMIC_SERVER_USAGE" === e11.digest ? Error("Usage of next-intl APIs in Server Components currently opts into dynamic rendering. This limitation will eventually be lifted, but as a stopgap solution, you can use the `setRequestLocale` API to enable static rendering, see https://next-intl.dev/docs/getting-started/app-router/with-i18n-routing#static-rendering", { cause: e11 }) : e11;
        }
        return e10 || (console.error("\nUnable to find `next-intl` locale because the middleware didn't run on this request. See https://next-intl.dev/docs/routing/middleware#unable-to-find-locale. The `notFound()` function will be called as a result.\n"), eK()), e10;
      }), td = async ({ requestLocale: e10 }) => {
        let t2 = await e10;
        return t2 && tw.locales.includes(t2) || (t2 = tw.defaultLocale), { locale: t2, messages: (await r(1691)(`./${t2}.json`)).default };
      }, th = false, tf = false, tp = (0, eX.cache)(function() {
        return /* @__PURE__ */ new Date();
      }), tg = (0, eX.cache)(function() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone;
      }), tm = (0, eX.cache)(async function(e10, t2) {
        if ("function" != typeof e10)
          throw Error("Invalid i18n request configuration detected.\n\nPlease verify that:\n1. In case you've specified a custom location in your Next.js config, make sure that the path is correct.\n2. You have a default export in your i18n request configuration file.\n\nSee also: https://next-intl.dev/docs/usage/configuration#i18n-request\n");
        let r2 = { get locale() {
          return tf || (console.warn("\nThe `locale` parameter in `getRequestConfig` is deprecated, please switch to `await requestLocale`. See https://next-intl.dev/blog/next-intl-3-22#await-request-locale\n"), tf = true), t2 || to() || tc();
        }, get requestLocale() {
          return t2 ? Promise.resolve(t2) : tu();
        } }, n2 = e10(r2);
        eY(n2) && (n2 = await n2);
        let i2 = n2.locale;
        return i2 || (th || (console.error("\nA `locale` is expected to be returned from `getRequestConfig`, but none was returned. This will be an error in the next major version of next-intl.\n\nSee: https://next-intl.dev/blog/next-intl-3-22#await-request-locale\n"), th = true), (i2 = await r2.requestLocale) || (console.error("\nUnable to find `next-intl` locale because the middleware didn't run on this request and no `locale` was returned in `getRequestConfig`. See https://next-intl.dev/docs/routing/middleware#unable-to-find-locale. The `notFound()` function will be called as a result.\n"), eK())), { ...n2, locale: i2, now: n2.now || tp(), timeZone: n2.timeZone || tg() };
      }), tv = (0, eX.cache)(e0.CB), ty = (0, eX.cache)(e0.gZ), t_ = (0, eX.cache)(async function(e10) {
        let t2 = await tm(td, e10);
        return { ...(0, e0.TD)(t2), _formatters: tv(ty()) };
      });
      async function tb() {
        return (await t_()).locale;
      }
      let tw = (0, eD.o)({ locales: ["en", "fr"], defaultLocale: "fr", localePrefix: { mode: "always", prefixes: { en: "/en", fr: "/fr" } }, pathnames: { "/": "/" } }), { Link: tS, redirect: tE, usePathname: tC, useRouter: tT } = function(e10) {
        let { config: t2, ...r2 } = function(e11, t3) {
          var r3, n3, i2, a2, o2;
          let s2 = { ...r3 = t3 || {}, localePrefix: "object" == typeof (a2 = r3.localePrefix) ? a2 : { mode: a2 || "always" }, localeCookie: !(null != (o2 = r3.localeCookie) && !o2) && { name: "NEXT_LOCALE", maxAge: 31536e3, sameSite: "lax", ..."object" == typeof o2 && o2 }, localeDetection: null === (n3 = r3.localeDetection) || void 0 === n3 || n3, alternateLinks: null === (i2 = r3.alternateLinks) || void 0 === i2 || i2 };
          !function(e12) {
            var t4;
            if ("as-needed" === (null === (t4 = e12.localePrefix) || void 0 === t4 ? void 0 : t4.mode) && !("defaultLocale" in e12))
              throw Error("`localePrefix: 'as-needed' requires a `defaultLocale`.");
          }(s2);
          let l2 = s2.pathnames, u2 = "as-needed" === s2.localePrefix.mode && s2.domains || void 0, c2 = (0, eX.forwardRef)(function(t4, r4) {
            let n4, i3, a3, { href: o3, locale: c3, ...h3 } = t4;
            "object" == typeof o3 ? (n4 = o3.pathname, a3 = o3.query, i3 = o3.params) : n4 = o3;
            let f2 = eZ(o3), p2 = e11(), g2 = eY(p2) ? (0, eX.use)(p2) : p2, m2 = f2 ? d2({ locale: c3 || g2, href: null == l2 ? n4 : { pathname: n4, params: i3 } }, null != c3 || u2 || void 0) : n4;
            return eX.createElement(eJ, eH({ ref: r4, defaultLocale: s2.defaultLocale, href: "object" == typeof o3 ? { ...o3, pathname: m2 } : m2, locale: c3, localeCookie: s2.localeCookie, unprefixed: u2 && f2 ? { domains: s2.domains.reduce((e12, t5) => (e12[t5.domain] = t5.defaultLocale, e12), {}), pathname: d2({ locale: g2, href: null == l2 ? { pathname: n4, query: a3 } : { pathname: n4, query: a3, params: i3 } }, false) } : void 0 }, h3));
          });
          function d2(e12, t4) {
            let r4;
            let { href: n4, locale: i3 } = e12;
            return null == l2 ? "object" == typeof n4 ? (r4 = n4.pathname, n4.query && (r4 += eQ(n4.query))) : r4 = n4 : r4 = function(e13) {
              let { pathname: t5, locale: r5, params: n5, pathnames: i4, query: a3 } = e13;
              function o3(e14) {
                let t6 = i4[e14];
                return t6 || (t6 = e14), t6;
              }
              function s3(e14) {
                let t6 = "string" == typeof e14 ? e14 : e14[r5], i5 = t6;
                if (n5 && Object.entries(n5).forEach((e15) => {
                  let t7, r6, [n6, a4] = e15;
                  Array.isArray(a4) ? (t7 = "(\\[)?\\[...".concat(n6, "\\](\\])?"), r6 = a4.map((e16) => String(e16)).join("/")) : (t7 = "\\[".concat(n6, "\\]"), r6 = String(a4)), i5 = i5.replace(RegExp(t7, "g"), r6);
                }), (i5 = function(e15) {
                  let t7 = function() {
                    try {
                      return "true" === process.env._next_intl_trailing_slash;
                    } catch (e16) {
                      return false;
                    }
                  }();
                  if ("/" !== e15) {
                    let r6 = e15.endsWith("/");
                    t7 && !r6 ? e15 += "/" : !t7 && r6 && (e15 = e15.slice(0, -1));
                  }
                  return e15;
                }(i5 = i5.replace(/\[\[\.\.\..+\]\]/g, ""))).includes("["))
                  throw Error("Insufficient params provided for localized pathname.\nTemplate: ".concat(t6, "\nParams: ").concat(JSON.stringify(n5)));
                return a3 && (i5 += eQ(a3)), i5;
              }
              if ("string" == typeof t5)
                return s3(o3(t5));
              {
                let { pathname: e14, ...r6 } = t5;
                return { ...r6, pathname: s3(o3(e14)) };
              }
            }({ locale: i3, ..."string" == typeof n4 ? { pathname: n4 } : n4, pathnames: s2.pathnames }), function(e13, t5, r5, n5, i4) {
              var a3, o3, s3, l3;
              let u3, c3;
              let { mode: d3 } = r5.localePrefix;
              if (void 0 !== i4)
                u3 = i4;
              else if (eZ(e13)) {
                if ("always" === d3)
                  u3 = true;
                else if ("as-needed" === d3) {
                  let e14 = r5.defaultLocale;
                  if (r5.domains) {
                    let t6 = r5.domains.find((e15) => e15.domain === n5);
                    t6 ? e14 = t6.defaultLocale : n5 || console.error("You're using a routing configuration with `localePrefix: 'as-needed'` in combination with `domains`. In order to compute a correct pathname, you need to provide a `domain` parameter.\n\nSee: https://next-intl.dev/docs/routing#domains-localeprefix-asneeded");
                  }
                  u3 = e14 !== t5;
                }
              }
              return u3 ? (s3 = "never" !== (a3 = r5.localePrefix).mode && (null === (o3 = a3.prefixes) || void 0 === o3 ? void 0 : o3[t5]) || "/" + t5, l3 = e13, c3 = s3, /^\/(\?.*)?$/.test(l3) && (l3 = l3.slice(1)), c3 += l3) : e13;
            }(r4, i3, s2, e12.domain, t4);
          }
          function h2(e12) {
            return function(t4) {
              for (var r4 = arguments.length, n4 = Array(r4 > 1 ? r4 - 1 : 0), i3 = 1; i3 < r4; i3++)
                n4[i3 - 1] = arguments[i3];
              return e12(d2(t4, t4.domain ? void 0 : u2), ...n4);
            };
          }
          return { config: s2, Link: c2, redirect: h2(eF), permanentRedirect: h2(eV), getPathname: d2 };
        }(function() {
          return tb();
        }, e10);
        function n2(e11) {
          return () => {
            throw Error("`".concat(e11, "` is not supported in Server Components. You can use this hook if you convert the calling component to a Client Component."));
          };
        }
        return { ...r2, usePathname: n2("usePathname"), useRouter: n2("useRouter") };
      }(tw), tP = (0, eB.A)(tw), tx = { matcher: ["/", "/(fr|en)/:path*"] }, tR = { ...i }, tA = tR.middleware || tR.default, tO = "/src/middleware";
      if ("function" != typeof tA)
        throw Error(`The Middleware "${tO}" must export a \`middleware\` or a \`default\` function`);
      function tM(e10) {
        return ek({ ...e10, page: tO, handler: async (...e11) => {
          try {
            return await tA(...e11);
          } catch (i2) {
            let t2 = e11[0], r2 = new URL(t2.url), n2 = r2.pathname + r2.search;
            throw await l(i2, { path: n2, method: t2.method, headers: Object.fromEntries(t2.headers.entries()) }, { routerKind: "Pages Router", routePath: "/middleware", routeType: "middleware", revalidateReason: void 0 }), i2;
          }
        } });
      }
    }, 2058: (e, t, r) => {
      "use strict";
      r.d(t, { xl: () => o });
      let n = Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available");
      class i {
        disable() {
          throw n;
        }
        getStore() {
        }
        run() {
          throw n;
        }
        exit() {
          throw n;
        }
        enterWith() {
          throw n;
        }
        static bind(e2) {
          return e2;
        }
      }
      let a = "undefined" != typeof globalThis && globalThis.AsyncLocalStorage;
      function o() {
        return a ? new a() : new i();
      }
    }, 2985: (e, t, r) => {
      "use strict";
      r.d(t, { C6: () => i, Cl: () => a, Tt: () => o, fX: () => s });
      var n = function(e2, t2) {
        return (n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e3, t3) {
          e3.__proto__ = t3;
        } || function(e3, t3) {
          for (var r2 in t3)
            Object.prototype.hasOwnProperty.call(t3, r2) && (e3[r2] = t3[r2]);
        })(e2, t2);
      };
      function i(e2, t2) {
        if ("function" != typeof t2 && null !== t2)
          throw TypeError("Class extends value " + String(t2) + " is not a constructor or null");
        function r2() {
          this.constructor = e2;
        }
        n(e2, t2), e2.prototype = null === t2 ? Object.create(t2) : (r2.prototype = t2.prototype, new r2());
      }
      var a = function() {
        return (a = Object.assign || function(e2) {
          for (var t2, r2 = 1, n2 = arguments.length; r2 < n2; r2++)
            for (var i2 in t2 = arguments[r2])
              Object.prototype.hasOwnProperty.call(t2, i2) && (e2[i2] = t2[i2]);
          return e2;
        }).apply(this, arguments);
      };
      function o(e2, t2) {
        var r2 = {};
        for (var n2 in e2)
          Object.prototype.hasOwnProperty.call(e2, n2) && 0 > t2.indexOf(n2) && (r2[n2] = e2[n2]);
        if (null != e2 && "function" == typeof Object.getOwnPropertySymbols)
          for (var i2 = 0, n2 = Object.getOwnPropertySymbols(e2); i2 < n2.length; i2++)
            0 > t2.indexOf(n2[i2]) && Object.prototype.propertyIsEnumerable.call(e2, n2[i2]) && (r2[n2[i2]] = e2[n2[i2]]);
        return r2;
      }
      function s(e2, t2, r2) {
        if (r2 || 2 == arguments.length)
          for (var n2, i2 = 0, a2 = t2.length; i2 < a2; i2++)
            !n2 && i2 in t2 || (n2 || (n2 = Array.prototype.slice.call(t2, 0, i2)), n2[i2] = t2[i2]);
        return e2.concat(n2 || Array.prototype.slice.call(t2));
      }
      Object.create, Object.create, "function" == typeof SuppressedError && SuppressedError;
    }, 7020: (e) => {
      "use strict";
      e.exports = JSON.parse(`{"Metadata":{"about-title":"About Us","about-description":"Learn more about Brahm Mauer Bar Services.","services-title":"Services","services-description":"Explore our range of bar services.","home-title":"Home","home-description":"Welcome to Brahm Mauer Bar Services.","mila-title":"Espace Mila","mila-description":"Learn more about our new event space.","book-now-title":"Book Now","book-now-description":"Interested in working with us?","corporate-title":"Corporate","corporate-description":"Combining a bespoke bar service with a highly trained professional staff, Brahm Mauer Bar Services ensures that the event is a success in both the eyes of the client as well as their guests.","festivals-title":"Festivals","festivals-description":"We elevate the VIP experience at Montr\xE9al's most renowned festivals. From the coldest festival in the world to the main stage at Osheaga, there is no festival too big or too small for Brahm Mauer and his team.","private-title":"Private","private-description":"Recognized for making wedding dreams unforgettable realities. Our skilled mixologists will delight your guests with enticing cocktails and unparalleled service.","fundraisers-title":"Fundraisers","fundraisers-description":"Helping to make every fundraiser impactful and memorable, Brahm Mauer Bar Services brings the perfect blend of professionalism and creativity to enhance your cause.","success-title":"Booking Submitted!","success-description":"We will get in touch soon."},"Hero":{"title":"Brahm Mauer Bar Services","subtitle":"Weddings. Festivals. Corporate Events.","trusted":"Trusted by the best","rotator":{"title":"We\u2019ll take care of the drinks for your next","wedding":"wedding.","corporate":"corporate event.","private":"private party.","festival":"festival.","fundraiser":"fundraiser.","birthday":"birthday.","anniversary":"anniversary.","holiday":"holiday party.","graduation":"graduation.","gala dinner":"gala dinner."},"service":{"title":"Services","subtitle":"Explore our range of bar services.","view":"View Services"},"about":{"main-text":"With over twenty-five years of experience and a passion for bringing people together, we turn any event into a vibrant, fun-filled gathering.","subtitle":"Learn more about us"},"mila":{"subtitle":"Our versatile event space, perfect for all gatherings.","learn":"Learn More"},"book-now":"Book Now","book-now-subheading":"Interesting in working with us?"},"Navbar":{"about":"About","services":"Services","mila":"Espace Mila","book-now":"Book Now","locale":"fr","hours":"Hours","date":"Monday - Friday","time":"9:00 AM - 5:00 PM"},"Services":{"heading":"Services","read-more":"Read More","corporate":{"title":"Corporate","description":"Combining a bespoke bar service with a highly trained professional staff, Brahm Mauer Bar Services ensures that the event is a success in both the eyes of the client as well as their guests.","long-description":"Servicing Montr\xE9al and its surrounding areas Brahm Mauer Bar Services offers turnkey bar solutions. Combining a bespoke bar service with a highly trained and professional staff, Brahm Mauer Bar Services ensures that the event is a success in both the eyes of the client as well as their guests for your next Corporate Event."},"festivals":{"title":"Festivals","description":"We elevate the VIP experience at Montr\xE9al's most renowned festivals. From the coldest festival in the world to the main stage at Osheaga, there is no festival too big or too small for Brahm Mauer and his team.","long-description":"We elevate the VIP experience at Montr\xE9al\u2019s most renowned festivals. From the coldest festival in the world to the main stage at Osheaga, there is no festival too big or too small for Brahm Mauer and his team. Increasing sales, productivity, efficiencies, and the overall customer experience, BMBS has successfully secured annual contracts with Osheaga, Ile Soniq, Lasso, Piknic Electronic & Igloofest. See you in the VIP!"},"private":{"title":"Private","description":"Recognized for making wedding dreams unforgettable realities. Our skilled mixologists will delight your guests with enticing cocktails and unparalleled service.","long-description":"BMBS is recognized for making wedding dreams unforgettable realities. Our skilled mixologists will delight your guests with enticing cocktails, incredible vibes, and unparalleled service. To ensure your big day is exactly as you imagined it, our wedding team will work closely with you and your planner to build a custom-tailored menu that will exceed all expectations. From our unique ice programs to our market-fresh ingredients, your wedding is sure to be a magical experience for all. Our bars are also complete with stunning visuals which are fully customizable to match your desired style. If you want to go the extra mile to entertain and fascinate your guests, leave it up to us to enchant them at the bar."},"fundraisers":{"title":"Fundraisers","description":"Helping to make every fundraiser impactful and memorable, Brahm Mauer Bar Services brings the perfect blend of professionalism and creativity to enhance your cause.","long-description":"At Brahm Mauer Bar Services, we understand the importance of a successful fundraiser and the role it plays in making a difference. Our team brings a unique blend of professionalism, creativity, and dedication to each event, ensuring that your guests are not only entertained but also feel the significance of your cause. From custom cocktails that reflect the spirit of the event to professional, engaging service, we enhance every aspect of your fundraiser to help increase support and donations. Let us help make your next fundraising event a memorable and impactful experience."}},"About":{"title":"About Us","first-sentence":"Brahm Mauer and his team firmly believe that with the right blend of","support":"support","and":"and","second-sentence":", anything is possible. More than just a bar service, we embody the true essence of hospitality.","first-paragraph":"Based in Montreal, we provide top-tier bartending services for events of all kinds. From corporate gatherings to private parties, our skilled bartenders deliver exceptional service and unforgettable drinks tailored to your needs.","second-paragraph":"\\"Clients do not come first. Employees come first. If you take care of your employees, they will take care of the clients\\"","third-paragraph":"Our service staff are the heart of our business and the face of our brand. Passionate and highly trained, they consistently ensure everyone has an exceptional experience. Unlike competitors who rely on agency staff, leading to inconsistency, BMBS boasts a loyal, cohesive team and one of the lowest turnover rates in the industry \u2014 giving us a distinct edge.","fourth-paragraph":"The BMBS experience cannot be spoken about without mentioning their market fresh Mixology program. Their in-house mixology team creates seasonal menus for our guests to choose from. They also provide their homemade pure\u0301es to Montreal festivals, including Beach Club & Piknic Electronic. Using only the freshest ingredients and staying ahead of the trends, Brahm Mauer brings mixology to the next level.","book-now":"Book Now"},"Mila":{"first-paragraph":"Experience our new event space\u2014modern, versatile, and perfect for any occasion. The perfect spot to gather, celebrate, and enjoy.","description":"Nestled in the heart of Old Montreal, our intimate venue offers the perfect setting for all types of special events. Whether you're hosting a private celebration, corporate gathering, or intimate soir\xE9e, our space provides a charming and elegant atmosphere. Enhance your experience with exquisite cuisine from Beatrice Catering and expertly crafted cocktails from Brahm Mauer Bar Services. Let us help you create unforgettable moments in a setting that\u2019s as unique as your event.","book-now":"Book Now"},"Booking":{"title":"Booking Submitted!","subtitle":"We will get in touch soon.","main-title":"Booking Details","service-type":"Service Type","info":"Personal Information","name":"Name","name-placeholder":"Enter your name","email":"Email Address","email-placeholder":"Enter your email","phone":"Phone Number","phone-placeholder":"Enter your phone number","phone-type":{"home":"Home","mobile":"Mobile","work":"Work"},"details":"Event Details","location":"Location","location-placeholder":"Enter the location","capacity":"Attendance","capacity-placeholder":"Enter the amount of guests expected","additional-info":"Additional Information","additional-info-placeholder":"Enter any additional information","submit":"Submit Form"}}`);
    }, 2245: (e) => {
      "use strict";
      e.exports = JSON.parse(`{"Metadata":{"about-title":"\xC0 propos","about-description":"En savoir plus sur Brahm Mauer Bar Services.","services-title":"Services","services-description":"Explorez notre gamme de services de bar.","home-title":"Accueil","home-description":"Bienvenue chez Brahm Mauer Bar Services.","mila-title":"Espace Mila","mila-description":"En savoir plus sur notre nouvel espace \xE9v\xE9nementiel.","book-now-title":"R\xE9server","book-now-description":"Int\xE9ress\xE9 par une collaboration avec nous?","corporate-title":"Entreprises","corporate-description":"Combinant un service de bar sur mesure avec un personnel professionnel hautement qualifi\xE9, Brahm Mauer Bar Services garantit que l'\xE9v\xE8nement est un succ\xE8s tant aux yeux du client que de ses invit\xE9s.","festivals-title":"Festivals","festivals-description":"Nous \xE9levons l'exp\xE9rience VIP dans les festivals les plus renomm\xE9s de Montr\xE9al. Du festival le plus froid au monde \xE0 la sc\xE8ne principale d'Osheaga, il n'y a pas de festival trop grand ou trop petit pour Brahm Mauer et son \xE9quipe.","private-title":"Priv\xE9e","private-description":"Reconnu pour faire des r\xEAves de mariage des r\xE9alit\xE9s inoubliables. Nos mixologues talentueux raviront vos invit\xE9s avec des cocktails all\xE9chants et un service in\xE9gal\xE9.","fundraisers-title":"Lev\xE9e de fonds","fundraisers-description":"En aidant \xE0 rendre chaque lev\xE9e de fonds impactante et m\xE9morable, Brahm Mauer Bar Services apporte le m\xE9lange parfait de professionnalisme et de cr\xE9ativit\xE9 pour am\xE9liorer votre cause.","success-title":"R\xE9servation effectu\xE9e!","success-description":"Nous vous contacterons bient\xF4t."},"Hero":{"title":"Service de Bar Brahm Mauer","subtitle":"Mariages. Festivals. Entreprises.","trusted":"Les meilleurs font confiance","rotator":{"title":"Nous nous occupons des boissons pour votre prochain","wedding":"mariage.","corporate":"retraite ex\xE9cutive.","private":"f\xEAte priv\xE9e.","festival":"festival.","fundraiser":"lev\xE9e de fonds.","birthday":"anniversaire.","anniversary":"anniversaire.","holiday":"f\xEAte de fin d'ann\xE9e.","graduation":"graduation.","gala dinner":"d\xEEner de gala."},"service":{"title":"Services","subtitle":"Explorez notre gamme de services de bar.","view":"Voir les services"},"about":{"main-text":"Avec plus de vingt-cinq ans d'exp\xE9rience et une passion pour le rassemblement des gens, nous transformons tout \xE9v\xE9nement en un rassemblement dynamique et amusant.","subtitle":"En savoir plus sur nous"},"mila":{"subtitle":"Notre espace polyvalent, parfait pour tous les \xE9v\xE9nements.","learn":"En savoir plus"},"book-now":"R\xE9server","book-now-subheading":"Int\xE9ress\xE9 par une collaboration avec nous ?"},"Navbar":{"about":"\xC0 propos","services":"Services","mila":"Espace Mila","book-now":"R\xE9server","locale":"en","hours":"Heures","date":"Lunda - Vendredi","time":"9:00 - 17:00"},"Services":{"heading":"Services","read-more":"En savoir plus","corporate":{"title":"Entreprises","description":"Combinant un service de bar sur mesure avec un personnel professionnel hautement qualifi\xE9, Brahm Mauer Bar Services garantit que l'\xE9v\xE8nement est un succ\xE8s tant aux yeux du client que de ses invit\xE9s.","long-description":"Service Montr\xE9al et ses environs, Brahm Mauer Bar Services propose des solutions de bar cl\xE9 en main. Combinant un service de bar sur mesure avec un personnel hautement qualifi\xE9 et professionnel, Brahm Mauer Bar Services garantit que l'\xE9v\xE8nement est un succ\xE8s tant aux yeux du client que de ses invit\xE9s pour votre prochain \xE9v\xE8nement d'entreprise."},"festivals":{"title":"Festivals","description":"Nous \xE9levons l'exp\xE9rience VIP dans les festivals les plus renomm\xE9s de Montr\xE9al. Du festival le plus froid au monde \xE0 la sc\xE8ne principale d'Osheaga, il n'y a pas de festival trop grand ou trop petit pour Brahm Mauer et son \xE9quipe.","long-description":"Nous \xE9levons l\u2019exp\xE9rience VIP dans les festivals les plus renomm\xE9s de Montr\xE9al. Du festival le plus froid du monde \xE0 la sc\xE8ne principale d'Osheaga, il n'y a pas de festival trop grand ou trop petit pour Brahm Mauer et son \xE9quipe. En augmentant les ventes, la productivit\xE9, l'efficacit\xE9 et l'exp\xE9rience client globale, BMBS a obtenu avec succ\xE8s des contrats annuels avec Osheaga, Ile Soniq, Lasso, Piknic Electronic et Igloofest. Rendez-vous en VIP !"},"private":{"title":"Priv\xE9e","description":"Reconnu pour faire des r\xEAves de mariage des r\xE9alit\xE9s inoubliables. Nos mixologues talentueux raviront vos invit\xE9s avec des cocktails all\xE9chants et un service in\xE9gal\xE9.","long-description":"BMBS est reconnu pour faire des r\xEAves de mariage des r\xE9alit\xE9s inoubliables. Nos mixologues talentueux raviront vos invit\xE9s avec des cocktails all\xE9chants, des vibes incroyables et un service in\xE9gal\xE9. Pour garantir que votre grand jour soit exactement comme vous l'avez imagin\xE9, notre \xE9quipe de mariage travaillera en \xE9troite collaboration avec vous et votre planificateur pour \xE9laborer un menu sur mesure qui d\xE9passera toutes les attentes. Nos bars sont \xE9galement dot\xE9s de visuels \xE9poustouflants enti\xE8rement personnalisables pour correspondre \xE0 votre style souhait\xE9. Si vous voulez aller plus loin pour divertir et fasciner vos invit\xE9s, laissez-nous les enchanter au bar."},"fundraisers":{"title":"Lev\xE9e de fonds","description":"En aidant \xE0 rendre chaque lev\xE9e de fonds impactante et m\xE9morable, Brahm Mauer Bar Services apporte le m\xE9lange parfait de professionnalisme et de cr\xE9ativit\xE9 pour am\xE9liorer votre cause.","long-description":"Chez Brahm Mauer Bar Services, nous comprenons l'importance d'une lev\xE9e de fonds r\xE9ussie et le r\xF4le qu'elle joue pour faire la diff\xE9rence. Notre \xE9quipe apporte un m\xE9lange unique de professionnalisme, de cr\xE9ativit\xE9 et de d\xE9vouement \xE0 chaque \xE9v\xE9nement, en veillant \xE0 ce que vos invit\xE9s ne soient pas seulement divertis, mais qu'ils ressentent \xE9galement l'importance de votre cause. Des cocktails personnalis\xE9s qui refl\xE8tent l'esprit de l'\xE9v\xE9nement au service professionnel et engageant, nous am\xE9liorons chaque aspect de votre collecte de fonds pour aider \xE0 augmenter le soutien et les dons. Laissez-nous vous aider \xE0 faire de votre prochain \xE9v\xE9nement de collecte de fonds une exp\xE9rience m\xE9morable et marquante."}},"About":{"title":"\xC0 propos","first-sentence":"Brahm Mauer et son \xE9quipe sont fermement convaincus qu'avec le bon m\xE9lange de","and":"et","support":"soutien","second-sentence":", tout est possible. Plus qu'un simple service de bar, nous repr\xE9sentons l'essence m\xEAme de l'hospitalit\xE9.","first-paragraph":"Situ\xE9 \xE0 Montr\xE9al, nous fournissons des services de bar pour des \xE9v\xE9nements de toutes sortes. Qu'il s'agisse de r\xE9unions d'entreprise ou de f\xEAtes priv\xE9es, nos experts offrent un service exceptionnel et des boissons inoubliables adapt\xE9es \xE0 vos besoins.","second-paragraph":"\\"Les clients ne passent pas en premier. Les employ\xE9s passent en premier. Si vous prenez soin de vos employ\xE9s, ils prendront soin des clients\\"","third-paragraph":"Notre \xE9quipe de service est le c\u0153ur de notre entreprise et le reflet de notre marque. Passionn\xE9s et hautement qualifi\xE9s, ils garantissent une exp\xE9rience exceptionnelle \xE0 tous les clients. Contrairement \xE0 ses comp\xE9titeurs qui font appel \xE0 du personnel en agence, ce qui entra\xEEne des incoh\xE9rences, BMBS peut se vanter d'avoir une \xE9quipe loyale et coh\xE9sive et d'avoir l'un des taux de rotation les plus bas du secteur, ce qui lui donne une avantage ind\xE9niable.","fourth-paragraph":"On ne peut pas parler de l'exp\xE9rience BMBS sans mentionner leur programme de mixologie fra\xEEche du march\xE9. Leur \xE9quipe de mixologie interne cr\xE9e des menus de saison parmi lesquels nos clients peuvent choisir. Ils fournissent \xE9galement leurs pur\xE9es fait maison aux festivals montr\xE9alais, dont Beach Club & Piknic Electronic. Utilisant uniquement des ingr\xE9dients les plus frais et restant \xE0 l'avant-garde des tendances, Brahm Mauer fait passer la mixologie au niveau sup\xE9rieur.","book-now":"R\xE9server"},"Mila":{"first-paragraph":"D\xE9couvrez notre nouvel espace d'\xE9v\xE9nements, moderne, polyvalent et parfait pour toutes les occasions. L'endroit id\xE9al pour se r\xE9unir, c\xE9l\xE9brer et passer un bon moment.","description":"Nich\xE9 au c\u0153ur du Vieux-Montr\xE9al, notre lieu intime offre le cadre id\xE9al pour tous les types d'\xE9v\xE9nements sp\xE9ciaux. Qu'il s'agisse d'une c\xE9l\xE9bration priv\xE9e, d'une r\xE9union d'entreprise ou d'une soir\xE9e intime, notre espace offre une atmosph\xE8re charmante et \xE9l\xE9gante. Vous pouvez agr\xE9menter votre exp\xE9rience d'une cuisine exquise pr\xE9par\xE9e par Restauration Beatrice et de cocktails pr\xE9par\xE9s par Brahm Mauer Bar Services. Laissez-nous vous aider \xE0 cr\xE9er des moments inoubliables dans un cadre aussi unique que votre \xE9v\xE9nement","book-now":"R\xE9server"},"Booking":{"title":"R\xE9servation effectu\xE9e!","subtitle":"Nous vous contacterons bient\xF4t.","main-title":"D\xE9tails de la r\xE9servation","service-type":"Type de service","info":"Informations personnelles","name":"Nom","name-placeholder":"Entrez votre nom","email":"Courriel","email-placeholder":"Entrez votre courriel","phone":"Num\xE9ro de t\xE9l\xE9phone","phone-placeholder":"Entrez votre num\xE9ro de t\xE9l\xE9phone","phone-type":{"home":"Domicile","mobile":"Mobile","work":"Travail"},"details":"D\xE9tails de l'\xE9v\xE9nement","location":"Lieu","location-placeholder":"Entrez le lieu de l'\xE9v\xE9nement","capacity":"Capacit\xE9","capacity-placeholder":"Entrez la capacit\xE9 de l'\xE9v\xE9nement","additional-info":"Informations compl\xE9mentaires","additional-info-placeholder":"Entrez des informations compl\xE9mentaires","submit":"Soumettre le formulaire"}}`);
    } }, (e) => {
      var t = e(e.s = 3622);
      (_ENTRIES = "undefined" == typeof _ENTRIES ? {} : _ENTRIES)["middleware_src/middleware"] = t;
    }]);
  }
});

// node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js
var edgeFunctionHandler_exports = {};
__export(edgeFunctionHandler_exports, {
  default: () => edgeFunctionHandler
});
async function edgeFunctionHandler(request) {
  const path2 = new URL(request.url).pathname;
  const routes = globalThis._ROUTES;
  const correspondingRoute = routes.find((route) => route.regex.some((r) => new RegExp(r).test(path2)));
  if (!correspondingRoute) {
    throw new Error(`No route found for ${request.url}`);
  }
  const entry = await self._ENTRIES[`middleware_${correspondingRoute.name}`];
  const result = await entry.default({
    page: correspondingRoute.page,
    request: {
      ...request,
      page: {
        name: correspondingRoute.name
      }
    }
  });
  globalThis.__openNextAls.getStore()?.pendingPromiseRunner.add(result.waitUntil);
  const response = result.response;
  return response;
}
var init_edgeFunctionHandler = __esm({
  "node_modules/@opennextjs/aws/dist/core/edgeFunctionHandler.js"() {
    globalThis._ENTRIES = {};
    globalThis.self = globalThis;
    globalThis._ROUTES = [{ "name": "src/middleware", "page": "/", "regex": ["^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(\\/?index|\\/?index\\.json))?[\\/#\\?]?$", "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(fr|en))(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json)?[\\/#\\?]?$"] }];
    require_edge_runtime_webpack();
    require_middleware();
  }
});

// node_modules/@opennextjs/aws/dist/utils/promise.js
init_logger();
var DetachedPromise = class {
  resolve;
  reject;
  promise;
  constructor() {
    let resolve;
    let reject;
    this.promise = new Promise((res, rej) => {
      resolve = res;
      reject = rej;
    });
    this.resolve = resolve;
    this.reject = reject;
  }
};
var DetachedPromiseRunner = class {
  promises = [];
  withResolvers() {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    return detachedPromise;
  }
  add(promise) {
    const detachedPromise = new DetachedPromise();
    this.promises.push(detachedPromise);
    promise.then(detachedPromise.resolve, detachedPromise.reject);
  }
  async await() {
    debug(`Awaiting ${this.promises.length} detached promises`);
    const results = await Promise.allSettled(this.promises.map((p) => p.promise));
    const rejectedPromises = results.filter((r) => r.status === "rejected");
    rejectedPromises.forEach((r) => {
      error(r.reason);
    });
  }
};
async function awaitAllDetachedPromise() {
  const store = globalThis.__openNextAls.getStore();
  const promisesToAwait = store?.pendingPromiseRunner.await() ?? Promise.resolve();
  if (store?.waitUntil) {
    store.waitUntil(promisesToAwait);
    return;
  }
  await promisesToAwait;
}
function provideNextAfterProvider() {
  const NEXT_REQUEST_CONTEXT_SYMBOL = Symbol.for("@next/request-context");
  const VERCEL_REQUEST_CONTEXT_SYMBOL = Symbol.for("@vercel/request-context");
  const store = globalThis.__openNextAls.getStore();
  const waitUntil = store?.waitUntil ?? ((promise) => store?.pendingPromiseRunner.add(promise));
  const nextAfterContext = {
    get: () => ({
      waitUntil
    })
  };
  globalThis[NEXT_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  if (process.env.EMULATE_VERCEL_REQUEST_CONTEXT) {
    globalThis[VERCEL_REQUEST_CONTEXT_SYMBOL] = nextAfterContext;
  }
}
function runWithOpenNextRequestContext({ isISRRevalidation, waitUntil }, fn) {
  return globalThis.__openNextAls.run({
    requestId: Math.random().toString(36),
    pendingPromiseRunner: new DetachedPromiseRunner(),
    isISRRevalidation,
    waitUntil
  }, async () => {
    provideNextAfterProvider();
    let result;
    try {
      result = await fn();
    } finally {
      await awaitAllDetachedPromise();
    }
    return result;
  });
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/resolve.js
async function resolveConverter(converter2) {
  if (typeof converter2 === "function") {
    return converter2();
  }
  const m_1 = await Promise.resolve().then(() => (init_edge(), edge_exports));
  return m_1.default;
}
async function resolveWrapper(wrapper) {
  if (typeof wrapper === "function") {
    return wrapper();
  }
  const m_1 = await Promise.resolve().then(() => (init_cloudflare_edge(), cloudflare_edge_exports));
  return m_1.default;
}
async function resolveOriginResolver(originResolver) {
  if (typeof originResolver === "function") {
    return originResolver();
  }
  const m_1 = await Promise.resolve().then(() => (init_pattern_env(), pattern_env_exports));
  return m_1.default;
}
async function resolveProxyRequest(proxyRequest) {
  if (typeof proxyRequest === "function") {
    return proxyRequest();
  }
  const m_1 = await Promise.resolve().then(() => (init_fetch(), fetch_exports));
  return m_1.default;
}

// node_modules/@opennextjs/aws/dist/core/createGenericHandler.js
async function createGenericHandler(handler3) {
  const config = await import("./open-next.config.mjs").then((m) => m.default);
  globalThis.openNextConfig = config;
  const override = config[handler3.type]?.override;
  const converter2 = await resolveConverter(override?.converter);
  const { name, wrapper } = await resolveWrapper(override?.wrapper);
  debug("Using wrapper", name);
  return wrapper(handler3.handler, converter2);
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
import crypto from "node:crypto";
import { Readable as Readable2 } from "node:stream";

// node_modules/@opennextjs/aws/dist/adapters/config/index.js
init_logger();
import path from "node:path";
globalThis.__dirname ??= "";
var NEXT_DIR = path.join(__dirname, ".next");
var OPEN_NEXT_DIR = path.join(__dirname, ".open-next");
debug({ NEXT_DIR, OPEN_NEXT_DIR });
var NextConfig = { "env": {}, "eslint": { "ignoreDuringBuilds": true }, "typescript": { "ignoreBuildErrors": true, "tsconfigPath": "tsconfig.json" }, "distDir": ".next", "cleanDistDir": true, "assetPrefix": "", "cacheMaxMemorySize": 52428800, "configOrigin": "next.config.ts", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": true, "compress": true, "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "attachment", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "appIsrStatus": true, "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 6e4, "pagesBufferLength": 5 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": null, "productionBrowserSourceMaps": false, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactProductionProfiling": false, "reactStrictMode": null, "reactMaxHeadersLength": 6e3, "httpAgentOptions": { "keepAlive": true }, "logging": {}, "expireTime": 31536e3, "staticPageGenerationTimeout": 60, "output": "standalone", "modularizeImports": { "@mui/icons-material": { "transform": "@mui/icons-material/{{member}}" }, "lodash": { "transform": "lodash/{{member}}" } }, "outputFileTracingRoot": "/Users/tarekgohar/Desktop/Projects/bmbs-website", "experimental": { "cacheLife": { "default": { "stale": 300, "revalidate": 900, "expire": 4294967294 }, "seconds": { "stale": 0, "revalidate": 1, "expire": 60 }, "minutes": { "stale": 300, "revalidate": 60, "expire": 3600 }, "hours": { "stale": 300, "revalidate": 3600, "expire": 86400 }, "days": { "stale": 300, "revalidate": 86400, "expire": 604800 }, "weeks": { "stale": 300, "revalidate": 604800, "expire": 2592e3 }, "max": { "stale": 300, "revalidate": 2592e3, "expire": 4294967294 } }, "cacheHandlers": {}, "cssChunking": true, "multiZoneDraftMode": false, "appNavFailHandling": false, "prerenderEarlyExit": true, "serverMinification": true, "serverSourceMaps": false, "linkNoTouchStart": false, "caseSensitiveRoutes": false, "clientSegmentCache": false, "preloadEntriesOnStart": true, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "cpus": 13, "memoryBasedWorkersCount": false, "imgOptConcurrency": null, "imgOptTimeoutInSeconds": 7, "imgOptMaxInputPixels": 268402689, "imgOptSequentialRead": null, "isrFlushToDisk": true, "workerThreads": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "craCompat": false, "esmExternals": true, "fullySpecified": false, "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128e3, "turbo": { "root": "/Users/tarekgohar/Desktop/Projects/bmbs-website" }, "typedRoutes": false, "typedEnv": false, "parallelServerCompiles": false, "parallelServerBuildTraces": false, "ppr": false, "authInterrupts": false, "reactOwnerStack": false, "webpackMemoryOptimizations": false, "optimizeServerReact": true, "useEarlyImport": false, "staleTimes": { "dynamic": 0, "static": 300 }, "serverComponentsHmrCache": true, "staticGenerationMaxConcurrency": 8, "staticGenerationMinPagesPerWorker": 25, "dynamicIO": false, "inlineCss": false, "optimizePackageImports": ["lucide-react", "date-fns", "lodash-es", "ramda", "antd", "react-bootstrap", "ahooks", "@ant-design/icons", "@headlessui/react", "@headlessui-float/react", "@heroicons/react/20/solid", "@heroicons/react/24/solid", "@heroicons/react/24/outline", "@visx/visx", "@tremor/react", "rxjs", "@mui/material", "@mui/icons-material", "recharts", "react-use", "effect", "@effect/schema", "@effect/platform", "@effect/platform-node", "@effect/platform-browser", "@effect/platform-bun", "@effect/sql", "@effect/sql-mssql", "@effect/sql-mysql2", "@effect/sql-pg", "@effect/sql-squlite-node", "@effect/sql-squlite-bun", "@effect/sql-squlite-wasm", "@effect/sql-squlite-react-native", "@effect/rpc", "@effect/rpc-http", "@effect/typeclass", "@effect/experimental", "@effect/opentelemetry", "@material-ui/core", "@material-ui/icons", "@tabler/icons-react", "mui-core", "react-icons/ai", "react-icons/bi", "react-icons/bs", "react-icons/cg", "react-icons/ci", "react-icons/di", "react-icons/fa", "react-icons/fa6", "react-icons/fc", "react-icons/fi", "react-icons/gi", "react-icons/go", "react-icons/gr", "react-icons/hi", "react-icons/hi2", "react-icons/im", "react-icons/io", "react-icons/io5", "react-icons/lia", "react-icons/lib", "react-icons/lu", "react-icons/md", "react-icons/pi", "react-icons/ri", "react-icons/rx", "react-icons/si", "react-icons/sl", "react-icons/tb", "react-icons/tfi", "react-icons/ti", "react-icons/vsc", "react-icons/wi"], "trustHostHeader": false, "isExperimentalCompile": false }, "bundlePagesRouterDependencies": false, "configFileName": "next.config.ts" };
var BuildId = "xxosmDQud73f1KUfc3t_1";
var RoutesManifest = { "basePath": "", "rewrites": { "beforeFiles": [], "afterFiles": [], "fallback": [] }, "redirects": [{ "source": "/:path+/", "destination": "/:path+", "internal": true, "statusCode": 308, "regex": "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$" }], "routes": { "static": [{ "page": "/_not-found", "regex": "^/_not\\-found(?:/)?$", "routeKeys": {}, "namedRegex": "^/_not\\-found(?:/)?$" }, { "page": "/favicon.ico", "regex": "^/favicon\\.ico(?:/)?$", "routeKeys": {}, "namedRegex": "^/favicon\\.ico(?:/)?$" }], "dynamic": [{ "page": "/[locale]", "regex": "^/([^/]+?)(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)(?:/)?$" }, { "page": "/[locale]/about", "regex": "^/([^/]+?)/about(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/about(?:/)?$" }, { "page": "/[locale]/book-now", "regex": "^/([^/]+?)/book\\-now(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/book\\-now(?:/)?$" }, { "page": "/[locale]/book-now/success", "regex": "^/([^/]+?)/book\\-now/success(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/book\\-now/success(?:/)?$" }, { "page": "/[locale]/espace-mila", "regex": "^/([^/]+?)/espace\\-mila(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/espace\\-mila(?:/)?$" }, { "page": "/[locale]/services", "regex": "^/([^/]+?)/services(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/services(?:/)?$" }, { "page": "/[locale]/services/corporate", "regex": "^/([^/]+?)/services/corporate(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/services/corporate(?:/)?$" }, { "page": "/[locale]/services/festivals", "regex": "^/([^/]+?)/services/festivals(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/services/festivals(?:/)?$" }, { "page": "/[locale]/services/fundraisers", "regex": "^/([^/]+?)/services/fundraisers(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/services/fundraisers(?:/)?$" }, { "page": "/[locale]/services/private", "regex": "^/([^/]+?)/services/private(?:/)?$", "routeKeys": { "nxtPlocale": "nxtPlocale" }, "namedRegex": "^/(?<nxtPlocale>[^/]+?)/services/private(?:/)?$" }], "data": { "static": [], "dynamic": [] } }, "locales": [] };
var ConfigHeaders = [];
var PrerenderManifest = { "version": 4, "routes": { "/en": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]", "dataRoute": "/en.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/fr": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/[locale]", "dataRoute": "/fr.rsc", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] }, "/favicon.ico": { "initialHeaders": { "cache-control": "public, max-age=0, must-revalidate", "content-type": "image/x-icon", "x-next-cache-tags": "_N_T_/layout,_N_T_/favicon.ico/layout,_N_T_/favicon.ico/route,_N_T_/favicon.ico" }, "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "initialRevalidateSeconds": false, "srcRoute": "/favicon.ico", "dataRoute": null, "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "dynamicRoutes": { "/[locale]": { "experimentalBypassFor": [{ "type": "header", "key": "Next-Action" }, { "type": "header", "key": "content-type", "value": "multipart/form-data;.*" }], "routeRegex": "^/([^/]+?)(?:/)?$", "dataRoute": "/[locale].rsc", "fallback": null, "dataRouteRegex": "^/([^/]+?)\\.rsc$", "allowHeader": ["host", "x-matched-path", "x-prerender-revalidate", "x-prerender-revalidate-if-generated", "x-next-revalidated-tags", "x-next-revalidate-tag-token"] } }, "notFoundRoutes": [], "preview": { "previewModeId": "251ee645e76c7a3409962dd4740e4707", "previewModeSigningKey": "6b434f8977f673bad12f0e2cdeadf4d8cac6302f52183836417e5ff4393399bb", "previewModeEncryptionKey": "d389a212a89c7d1760b6fb6dd1175eec137c609fb8cf0d57e1b77ee73a6d7a9c" } };
var MiddlewareManifest = { "version": 3, "middleware": { "/": { "files": ["server/edge-runtime-webpack.js", "server/src/middleware.js"], "name": "src/middleware", "page": "/", "matchers": [{ "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(\\/?index|\\/?index\\.json))?[\\/#\\?]?$", "originalSource": "/" }, { "regexp": "^(?:\\/(_next\\/data\\/[^/]{1,}))?(?:\\/(fr|en))(?:\\/((?:[^\\/#\\?]+?)(?:\\/(?:[^\\/#\\?]+?))*))?(\\.json)?[\\/#\\?]?$", "originalSource": "/(fr|en)/:path*" }], "wasm": [], "assets": [], "env": { "__NEXT_BUILD_ID": "xxosmDQud73f1KUfc3t_1", "NEXT_SERVER_ACTIONS_ENCRYPTION_KEY": "BOtb8QE2XckN6aSrAyZLPd5UbWDwaXC09/sw8jD5L9E=", "__NEXT_PREVIEW_MODE_ID": "251ee645e76c7a3409962dd4740e4707", "__NEXT_PREVIEW_MODE_ENCRYPTION_KEY": "d389a212a89c7d1760b6fb6dd1175eec137c609fb8cf0d57e1b77ee73a6d7a9c", "__NEXT_PREVIEW_MODE_SIGNING_KEY": "6b434f8977f673bad12f0e2cdeadf4d8cac6302f52183836417e5ff4393399bb" } } }, "functions": {}, "sortedMiddleware": ["/"] };
var AppPathRoutesManifest = { "/favicon.ico/route": "/favicon.ico", "/_not-found/page": "/_not-found", "/[locale]/about/page": "/[locale]/about", "/[locale]/services/corporate/page": "/[locale]/services/corporate", "/[locale]/services/festivals/page": "/[locale]/services/festivals", "/[locale]/book-now/page": "/[locale]/book-now", "/[locale]/book-now/success/page": "/[locale]/book-now/success", "/[locale]/services/fundraisers/page": "/[locale]/services/fundraisers", "/[locale]/espace-mila/page": "/[locale]/espace-mila", "/[locale]/services/page": "/[locale]/services", "/[locale]/services/private/page": "/[locale]/services/private", "/[locale]/page": "/[locale]" };
var FunctionsConfigManifest = { "version": 1, "functions": {} };
process.env.NEXT_BUILD_ID = BuildId;

// node_modules/@opennextjs/aws/dist/http/openNextResponse.js
init_logger();
init_util();
import { Transform } from "node:stream";

// node_modules/@opennextjs/aws/dist/core/routing/util.js
init_util();
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/i18n/accept-header.js
function parse(raw, preferences, options) {
  const lowers = /* @__PURE__ */ new Map();
  const header = raw.replace(/[ \t]/g, "");
  if (preferences) {
    let pos = 0;
    for (const preference of preferences) {
      const lower = preference.toLowerCase();
      lowers.set(lower, { orig: preference, pos: pos++ });
      if (options.prefixMatch) {
        const parts2 = lower.split("-");
        while (parts2.pop(), parts2.length > 0) {
          const joined = parts2.join("-");
          if (!lowers.has(joined)) {
            lowers.set(joined, { orig: preference, pos: pos++ });
          }
        }
      }
    }
  }
  const parts = header.split(",");
  const selections = [];
  const map = /* @__PURE__ */ new Set();
  for (let i = 0; i < parts.length; ++i) {
    const part = parts[i];
    if (!part) {
      continue;
    }
    const params = part.split(";");
    if (params.length > 2) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const token = params[0].toLowerCase();
    if (!token) {
      throw new Error(`Invalid ${options.type} header`);
    }
    const selection = { token, pos: i, q: 1 };
    if (preferences && lowers.has(token)) {
      selection.pref = lowers.get(token).pos;
    }
    map.add(selection.token);
    if (params.length === 2) {
      const q = params[1];
      const [key, value] = q.split("=");
      if (!value || key !== "q" && key !== "Q") {
        throw new Error(`Invalid ${options.type} header`);
      }
      const score = Number.parseFloat(value);
      if (score === 0) {
        continue;
      }
      if (Number.isFinite(score) && score <= 1 && score >= 1e-3) {
        selection.q = score;
      }
    }
    selections.push(selection);
  }
  selections.sort((a, b) => {
    if (b.q !== a.q) {
      return b.q - a.q;
    }
    if (b.pref !== a.pref) {
      if (a.pref === void 0) {
        return 1;
      }
      if (b.pref === void 0) {
        return -1;
      }
      return a.pref - b.pref;
    }
    return a.pos - b.pos;
  });
  const values = selections.map((selection) => selection.token);
  if (!preferences || !preferences.length) {
    return values;
  }
  const preferred = [];
  for (const selection of values) {
    if (selection === "*") {
      for (const [preference, value] of lowers) {
        if (!map.has(preference)) {
          preferred.push(value.orig);
        }
      }
    } else {
      const lower = selection.toLowerCase();
      if (lowers.has(lower)) {
        preferred.push(lowers.get(lower).orig);
      }
    }
  }
  return preferred;
}
function acceptLanguage(header = "", preferences) {
  return parse(header, preferences, {
    type: "accept-language",
    prefixMatch: true
  })[0] || void 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/i18n/index.js
function isLocalizedPath(path2) {
  return NextConfig.i18n?.locales.includes(path2.split("/")[1].toLowerCase()) ?? false;
}
function getLocaleFromCookie(cookies) {
  const i18n = NextConfig.i18n;
  const nextLocale = cookies.NEXT_LOCALE?.toLowerCase();
  return nextLocale ? i18n?.locales.find((locale) => nextLocale === locale.toLowerCase()) : void 0;
}
function detectLocale(internalEvent, i18n) {
  if (i18n.localeDetection === false) {
    return i18n.defaultLocale;
  }
  const cookiesLocale = getLocaleFromCookie(internalEvent.cookies);
  const preferredLocale = acceptLanguage(internalEvent.headers["accept-language"], i18n?.locales);
  debug({
    cookiesLocale,
    preferredLocale,
    defaultLocale: i18n.defaultLocale
  });
  return cookiesLocale ?? preferredLocale ?? i18n.defaultLocale;
}
function localizePath(internalEvent) {
  const i18n = NextConfig.i18n;
  if (!i18n) {
    return internalEvent.rawPath;
  }
  if (isLocalizedPath(internalEvent.rawPath)) {
    return internalEvent.rawPath;
  }
  const detectedLocale = detectLocale(internalEvent, i18n);
  return `/${detectedLocale}${internalEvent.rawPath}`;
}

// node_modules/@opennextjs/aws/dist/core/routing/queue.js
function generateMessageGroupId(rawPath) {
  let a = cyrb128(rawPath);
  let t = a += 1831565813;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  const randomFloat = ((t ^ t >>> 14) >>> 0) / 4294967296;
  const maxConcurrency = Number.parseInt(process.env.MAX_REVALIDATE_CONCURRENCY ?? "10");
  const randomInt = Math.floor(randomFloat * maxConcurrency);
  return `revalidate-${randomInt}`;
}
function cyrb128(str) {
  let h1 = 1779033703;
  let h2 = 3144134277;
  let h3 = 1013904242;
  let h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
    k = str.charCodeAt(i);
    h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
    h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
    h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
    h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ h1 >>> 18, 597399067);
  h2 = Math.imul(h4 ^ h2 >>> 22, 2869860233);
  h3 = Math.imul(h1 ^ h3 >>> 17, 951274213);
  h4 = Math.imul(h2 ^ h4 >>> 19, 2716044179);
  h1 ^= h2 ^ h3 ^ h4, h2 ^= h1, h3 ^= h1, h4 ^= h1;
  return h1 >>> 0;
}

// node_modules/@opennextjs/aws/dist/core/routing/util.js
function isExternal(url, host) {
  if (!url)
    return false;
  const pattern = /^https?:\/\//;
  if (host) {
    return pattern.test(url) && !url.includes(host);
  }
  return pattern.test(url);
}
function convertFromQueryString(query) {
  if (query === "")
    return {};
  const queryParts = query.split("&");
  return queryParts.reduce((acc, part) => {
    const [key, value] = part.split("=");
    acc[key] = value;
    return acc;
  }, {});
}
function getUrlParts(url, isExternal2) {
  if (!isExternal2) {
    const regex2 = /\/([^?]*)\??(.*)/;
    const match3 = url.match(regex2);
    return {
      hostname: "",
      pathname: match3?.[1] ? `/${match3[1]}` : url,
      protocol: "",
      queryString: match3?.[2] ?? ""
    };
  }
  const regex = /^(https?:)\/\/?([^\/\s]+)(\/[^?]*)?(\?.*)?/;
  const match2 = url.match(regex);
  if (!match2) {
    throw new Error(`Invalid external URL: ${url}`);
  }
  return {
    protocol: match2[1] ?? "https:",
    hostname: match2[2],
    pathname: match2[3] ?? "",
    queryString: match2[4]?.slice(1) ?? ""
  };
}
function constructNextUrl(baseUrl, path2) {
  const nextBasePath = NextConfig.basePath;
  const url = new URL(`${nextBasePath}${path2}`, baseUrl);
  return url.href;
}
function convertToQueryString(query) {
  const urlQuery = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((entry) => urlQuery.append(key, decodeURIComponent(entry)));
    } else {
      urlQuery.append(key, decodeURIComponent(value));
    }
  });
  const queryString = urlQuery.toString();
  return queryString ? `?${queryString}` : "";
}
function getMiddlewareMatch(middlewareManifest2, functionsManifest) {
  if (functionsManifest?.functions?.["/_middleware"]) {
    return functionsManifest.functions["/_middleware"].matchers?.map(({ regexp }) => new RegExp(regexp)) ?? [/.*/];
  }
  const rootMiddleware = middlewareManifest2.middleware["/"];
  if (!rootMiddleware?.matchers)
    return [];
  return rootMiddleware.matchers.map(({ regexp }) => new RegExp(regexp));
}
function escapeRegex(str) {
  return str.replaceAll("(.)", "_\xB51_").replaceAll("(..)", "_\xB52_").replaceAll("(...)", "_\xB53_");
}
function unescapeRegex(str) {
  return str.replaceAll("_\xB51_", "(.)").replaceAll("_\xB52_", "(..)").replaceAll("_\xB53_", "(...)");
}
function convertBodyToReadableStream(method, body) {
  if (method === "GET" || method === "HEAD")
    return void 0;
  if (!body)
    return void 0;
  const readable = new ReadableStream({
    start(controller) {
      controller.enqueue(body);
      controller.close();
    }
  });
  return readable;
}
var CommonHeaders;
(function(CommonHeaders2) {
  CommonHeaders2["CACHE_CONTROL"] = "cache-control";
  CommonHeaders2["NEXT_CACHE"] = "x-nextjs-cache";
})(CommonHeaders || (CommonHeaders = {}));

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
init_logger();

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
import { createHash } from "node:crypto";
init_stream();

// node_modules/@opennextjs/aws/dist/utils/cache.js
async function hasBeenRevalidated(key, tags, cacheEntry) {
  if (globalThis.openNextConfig.dangerous?.disableTagCache) {
    return false;
  }
  const value = cacheEntry.value;
  if (!value) {
    return true;
  }
  if ("type" in cacheEntry && cacheEntry.type === "page") {
    return false;
  }
  const lastModified = cacheEntry.lastModified ?? Date.now();
  if (globalThis.tagCache.mode === "nextMode") {
    return await globalThis.tagCache.hasBeenRevalidated(tags, lastModified);
  }
  const _lastModified = await globalThis.tagCache.getLastModified(key, lastModified);
  return _lastModified === -1;
}
function getTagsFromValue(value) {
  if (!value) {
    return [];
  }
  try {
    return value.meta?.headers?.["x-next-cache-tags"]?.split(",") ?? [];
  } catch (e) {
    return [];
  }
}

// node_modules/@opennextjs/aws/dist/core/routing/cacheInterceptor.js
init_logger();
var CACHE_ONE_YEAR = 60 * 60 * 24 * 365;
var CACHE_ONE_MONTH = 60 * 60 * 24 * 30;
async function computeCacheControl(path2, body, host, revalidate, lastModified) {
  let finalRevalidate = CACHE_ONE_YEAR;
  const existingRoute = Object.entries(PrerenderManifest.routes).find((p) => p[0] === path2)?.[1];
  if (revalidate === void 0 && existingRoute) {
    finalRevalidate = existingRoute.initialRevalidateSeconds === false ? CACHE_ONE_YEAR : existingRoute.initialRevalidateSeconds;
  } else if (revalidate !== void 0) {
    finalRevalidate = revalidate === false ? CACHE_ONE_YEAR : revalidate;
  }
  const age = Math.round((Date.now() - (lastModified ?? 0)) / 1e3);
  const hash = (str) => createHash("md5").update(str).digest("hex");
  const etag = hash(body);
  if (revalidate === 0) {
    return {
      "cache-control": "private, no-cache, no-store, max-age=0, must-revalidate",
      "x-opennext-cache": "ERROR",
      etag
    };
  }
  if (finalRevalidate !== CACHE_ONE_YEAR) {
    const sMaxAge = Math.max(finalRevalidate - age, 1);
    debug("sMaxAge", {
      finalRevalidate,
      age,
      lastModified,
      revalidate
    });
    const isStale = sMaxAge === 1;
    if (isStale) {
      let url = NextConfig.trailingSlash ? `${path2}/` : path2;
      if (NextConfig.basePath) {
        url = `${NextConfig.basePath}${url}`;
      }
      await globalThis.queue.send({
        MessageBody: { host, url },
        MessageDeduplicationId: hash(`${path2}-${lastModified}-${etag}`),
        MessageGroupId: generateMessageGroupId(path2)
      });
    }
    return {
      "cache-control": `s-maxage=${sMaxAge}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
      "x-opennext-cache": isStale ? "STALE" : "HIT",
      etag
    };
  }
  return {
    "cache-control": `s-maxage=${CACHE_ONE_YEAR}, stale-while-revalidate=${CACHE_ONE_MONTH}`,
    "x-opennext-cache": "HIT",
    etag
  };
}
async function generateResult(event, localizedPath, cachedValue, lastModified) {
  debug("Returning result from experimental cache");
  let body = "";
  let type = "application/octet-stream";
  let isDataRequest = false;
  switch (cachedValue.type) {
    case "app":
      isDataRequest = Boolean(event.headers.rsc);
      body = isDataRequest ? cachedValue.rsc : cachedValue.html;
      type = isDataRequest ? "text/x-component" : "text/html; charset=utf-8";
      break;
    case "page":
      isDataRequest = Boolean(event.query.__nextDataReq);
      body = isDataRequest ? JSON.stringify(cachedValue.json) : cachedValue.html;
      type = isDataRequest ? "application/json" : "text/html; charset=utf-8";
      break;
  }
  const cacheControl = await computeCacheControl(localizedPath, body, event.headers.host, cachedValue.revalidate, lastModified);
  return {
    type: "core",
    statusCode: 200,
    body: toReadableStream(body, false),
    isBase64Encoded: false,
    headers: {
      ...cacheControl,
      "content-type": type,
      ...cachedValue.meta?.headers
    }
  };
}
async function cacheInterceptor(event) {
  if (Boolean(event.headers["next-action"]) || Boolean(event.headers["x-prerender-revalidate"]))
    return event;
  let localizedPath = localizePath(event);
  if (NextConfig.basePath) {
    localizedPath = localizedPath.replace(NextConfig.basePath, "");
  }
  localizedPath = localizedPath.replace(/\/$/, "");
  if (localizedPath === "") {
    localizedPath = "index";
  }
  debug("Checking cache for", localizedPath, PrerenderManifest);
  const isISR = Object.keys(PrerenderManifest.routes).includes(localizedPath) || Object.values(PrerenderManifest.dynamicRoutes).some((dr) => new RegExp(dr.routeRegex).test(localizedPath));
  debug("isISR", isISR);
  if (isISR) {
    try {
      const cachedData = await globalThis.incrementalCache.get(localizedPath);
      debug("cached data in interceptor", cachedData);
      if (!cachedData?.value) {
        return event;
      }
      if (cachedData.value?.type === "app") {
        const tags = getTagsFromValue(cachedData.value);
        const _hasBeenRevalidated = await hasBeenRevalidated(localizedPath, tags, cachedData);
        if (_hasBeenRevalidated) {
          return event;
        }
      }
      const host = event.headers.host;
      switch (cachedData?.value?.type) {
        case "app":
        case "page":
          return generateResult(event, localizedPath, cachedData.value, cachedData.lastModified);
        case "redirect": {
          const cacheControl = await computeCacheControl(localizedPath, "", host, cachedData.value.revalidate, cachedData.lastModified);
          return {
            type: "core",
            statusCode: cachedData.value.meta?.status ?? 307,
            body: emptyReadableStream(),
            headers: {
              ...cachedData.value.meta?.headers ?? {},
              ...cacheControl
            },
            isBase64Encoded: false
          };
        }
        default:
          return event;
      }
    } catch (e) {
      debug("Error while fetching cache", e);
      return event;
    }
  }
  return event;
}

// node_modules/path-to-regexp/dist.es2015/index.js
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path2 = "";
  var tryConsume = function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  };
  var mustConsume = function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  };
  var consumeText = function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  };
  var isSafe = function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  };
  var safePattern = function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  };
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path2 += prefix;
        prefix = "";
      }
      if (path2) {
        result.push(path2);
        path2 = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path2 += value;
      continue;
    }
    if (path2) {
      result.push(path2);
      path2 = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
function compile(str, options) {
  return tokensToFunction(parse2(str, options), options);
}
function tokensToFunction(tokens, options) {
  if (options === void 0) {
    options = {};
  }
  var reFlags = flags(options);
  var _a = options.encode, encode = _a === void 0 ? function(x) {
    return x;
  } : _a, _b = options.validate, validate = _b === void 0 ? true : _b;
  var matches = tokens.map(function(token) {
    if (typeof token === "object") {
      return new RegExp("^(?:".concat(token.pattern, ")$"), reFlags);
    }
  });
  return function(data) {
    var path2 = "";
    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];
      if (typeof token === "string") {
        path2 += token;
        continue;
      }
      var value = data ? data[token.name] : void 0;
      var optional = token.modifier === "?" || token.modifier === "*";
      var repeat = token.modifier === "*" || token.modifier === "+";
      if (Array.isArray(value)) {
        if (!repeat) {
          throw new TypeError('Expected "'.concat(token.name, '" to not repeat, but got an array'));
        }
        if (value.length === 0) {
          if (optional)
            continue;
          throw new TypeError('Expected "'.concat(token.name, '" to not be empty'));
        }
        for (var j = 0; j < value.length; j++) {
          var segment = encode(value[j], token);
          if (validate && !matches[i].test(segment)) {
            throw new TypeError('Expected all "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
          }
          path2 += token.prefix + segment + token.suffix;
        }
        continue;
      }
      if (typeof value === "string" || typeof value === "number") {
        var segment = encode(String(value), token);
        if (validate && !matches[i].test(segment)) {
          throw new TypeError('Expected "'.concat(token.name, '" to match "').concat(token.pattern, '", but got "').concat(segment, '"'));
        }
        path2 += token.prefix + segment + token.suffix;
        continue;
      }
      if (optional)
        continue;
      var typeOfMessage = repeat ? "an array" : "a string";
      throw new TypeError('Expected "'.concat(token.name, '" to be ').concat(typeOfMessage));
    }
    return path2;
  };
}
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path2 = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    };
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path: path2, index, params };
  };
}
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
function regexpToRegexp(path2, keys) {
  if (!keys)
    return path2;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path2.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path2.source);
  }
  return path2;
}
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path2) {
    return pathToRegexp(path2, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
function stringToRegexp(path2, keys, options) {
  return tokensToRegexp(parse2(path2, options), keys, options);
}
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
function pathToRegexp(path2, keys, options) {
  if (path2 instanceof RegExp)
    return regexpToRegexp(path2, keys);
  if (Array.isArray(path2))
    return arrayToRegexp(path2, keys, options);
  return stringToRegexp(path2, keys, options);
}

// node_modules/@opennextjs/aws/dist/core/routing/matcher.js
init_stream();
init_logger();
var routeHasMatcher = (headers, cookies, query) => (redirect) => {
  switch (redirect.type) {
    case "header":
      return !!headers?.[redirect.key.toLowerCase()] && new RegExp(redirect.value ?? "").test(headers[redirect.key.toLowerCase()] ?? "");
    case "cookie":
      return !!cookies?.[redirect.key] && new RegExp(redirect.value ?? "").test(cookies[redirect.key] ?? "");
    case "query":
      return query[redirect.key] && Array.isArray(redirect.value) ? redirect.value.reduce((prev, current) => prev || new RegExp(current).test(query[redirect.key]), false) : new RegExp(redirect.value ?? "").test(query[redirect.key] ?? "");
    case "host":
      return headers?.host !== "" && new RegExp(redirect.value ?? "").test(headers.host);
    default:
      return false;
  }
};
function checkHas(matcher, has, inverted = false) {
  return has ? has.reduce((acc, cur) => {
    if (acc === false)
      return false;
    return inverted ? !matcher(cur) : matcher(cur);
  }, true) : true;
}
var getParamsFromSource = (source) => (value) => {
  debug("value", value);
  const _match = source(value);
  return _match ? _match.params : {};
};
var computeParamHas = (headers, cookies, query) => (has) => {
  if (!has.value)
    return {};
  const matcher = new RegExp(`^${has.value}$`);
  const fromSource = (value) => {
    const matches = value.match(matcher);
    return matches?.groups ?? {};
  };
  switch (has.type) {
    case "header":
      return fromSource(headers[has.key.toLowerCase()] ?? "");
    case "cookie":
      return fromSource(cookies[has.key] ?? "");
    case "query":
      return Array.isArray(query[has.key]) ? fromSource(query[has.key].join(",")) : fromSource(query[has.key] ?? "");
    case "host":
      return fromSource(headers.host ?? "");
  }
};
function convertMatch(match2, toDestination, destination) {
  if (!match2) {
    return destination;
  }
  const { params } = match2;
  const isUsingParams = Object.keys(params).length > 0;
  return isUsingParams ? toDestination(params) : destination;
}
function getNextConfigHeaders(event, configHeaders) {
  if (!configHeaders) {
    return {};
  }
  const matcher = routeHasMatcher(event.headers, event.cookies, event.query);
  const requestHeaders = {};
  const localizedRawPath = localizePath(event);
  for (const { headers, has, missing, regex, source, locale } of configHeaders) {
    const path2 = locale === false ? event.rawPath : localizedRawPath;
    if (new RegExp(regex).test(path2) && checkHas(matcher, has) && checkHas(matcher, missing, true)) {
      const fromSource = match(source);
      const _match = fromSource(path2);
      headers.forEach((h) => {
        try {
          const key = convertMatch(_match, compile(h.key), h.key);
          const value = convertMatch(_match, compile(h.value), h.value);
          requestHeaders[key] = value;
        } catch {
          debug(`Error matching header ${h.key} with value ${h.value}`);
          requestHeaders[h.key] = h.value;
        }
      });
    }
  }
  return requestHeaders;
}
function handleRewrites(event, rewrites) {
  const { rawPath, headers, query, cookies, url } = event;
  const localizedRawPath = localizePath(event);
  const matcher = routeHasMatcher(headers, cookies, query);
  const computeHas = computeParamHas(headers, cookies, query);
  const rewrite = rewrites.find((route) => {
    const path2 = route.locale === false ? rawPath : localizedRawPath;
    return new RegExp(route.regex).test(path2) && checkHas(matcher, route.has) && checkHas(matcher, route.missing, true);
  });
  let finalQuery = query;
  let rewrittenUrl = url;
  const isExternalRewrite = isExternal(rewrite?.destination);
  debug("isExternalRewrite", isExternalRewrite);
  if (rewrite) {
    const { pathname, protocol, hostname, queryString } = getUrlParts(rewrite.destination, isExternalRewrite);
    const pathToUse = rewrite.locale === false ? rawPath : localizedRawPath;
    const encodePlusQueryString = queryString.replaceAll("+", "%20");
    debug("urlParts", { pathname, protocol, hostname, queryString });
    const toDestinationPath = compile(escapeRegex(pathname));
    const toDestinationHost = compile(escapeRegex(hostname));
    const toDestinationQuery = compile(escapeRegex(encodePlusQueryString));
    const params = {
      // params for the source
      ...getParamsFromSource(match(escapeRegex(rewrite.source)))(pathToUse),
      // params for the has
      ...rewrite.has?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {}),
      // params for the missing
      ...rewrite.missing?.reduce((acc, cur) => {
        return Object.assign(acc, computeHas(cur));
      }, {})
    };
    const isUsingParams = Object.keys(params).length > 0;
    let rewrittenQuery = encodePlusQueryString;
    let rewrittenHost = hostname;
    let rewrittenPath = pathname;
    if (isUsingParams) {
      rewrittenPath = unescapeRegex(toDestinationPath(params));
      rewrittenHost = unescapeRegex(toDestinationHost(params));
      rewrittenQuery = unescapeRegex(toDestinationQuery(params));
    }
    rewrittenUrl = isExternalRewrite ? `${protocol}//${rewrittenHost}${rewrittenPath}` : new URL(rewrittenPath, event.url).href;
    finalQuery = {
      ...query,
      ...convertFromQueryString(rewrittenQuery)
    };
    rewrittenUrl += convertToQueryString(finalQuery);
    debug("rewrittenUrl", { rewrittenUrl, finalQuery, isUsingParams });
  }
  return {
    internalEvent: {
      ...event,
      rawPath: new URL(rewrittenUrl).pathname,
      url: rewrittenUrl
    },
    __rewrite: rewrite,
    isExternalRewrite
  };
}
function handleTrailingSlashRedirect(event) {
  const url = new URL(event.rawPath, "http://localhost");
  if (
    // Someone is trying to redirect to a different origin, let's not do that
    url.host !== "localhost" || NextConfig.skipTrailingSlashRedirect || // We should not apply trailing slash redirect to API routes
    event.rawPath.startsWith("/api/")
  ) {
    return false;
  }
  const emptyBody = emptyReadableStream();
  if (NextConfig.trailingSlash && !event.headers["x-nextjs-data"] && !event.rawPath.endsWith("/") && !event.rawPath.match(/[\w-]+\.[\w]+$/g)) {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0]}/${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  if (!NextConfig.trailingSlash && event.rawPath.endsWith("/") && event.rawPath !== "/") {
    const headersLocation = event.url.split("?");
    return {
      type: event.type,
      statusCode: 308,
      headers: {
        Location: `${headersLocation[0].replace(/\/$/, "")}${headersLocation[1] ? `?${headersLocation[1]}` : ""}`
      },
      body: emptyBody,
      isBase64Encoded: false
    };
  }
  return false;
}
function handleRedirects(event, redirects) {
  const trailingSlashRedirect = handleTrailingSlashRedirect(event);
  if (trailingSlashRedirect)
    return trailingSlashRedirect;
  const { internalEvent, __rewrite } = handleRewrites(event, redirects.filter((r) => !r.internal));
  if (__rewrite && !__rewrite.internal) {
    return {
      type: event.type,
      statusCode: __rewrite.statusCode ?? 308,
      headers: {
        Location: internalEvent.url
      },
      body: emptyReadableStream(),
      isBase64Encoded: false
    };
  }
}
function fixDataPage(internalEvent, buildId) {
  const { rawPath, query } = internalEvent;
  const dataPattern = `${NextConfig.basePath ?? ""}/_next/data/${buildId}`;
  if (rawPath.startsWith("/_next/data") && !rawPath.startsWith(dataPattern)) {
    return {
      type: internalEvent.type,
      statusCode: 404,
      body: toReadableStream("{}"),
      headers: {
        "Content-Type": "application/json"
      },
      isBase64Encoded: false
    };
  }
  if (rawPath.startsWith(dataPattern) && rawPath.endsWith(".json")) {
    const newPath = rawPath.slice(dataPattern.length, -".json".length).replace(/^\/index$/, "/");
    query.__nextDataReq = "1";
    return {
      ...internalEvent,
      rawPath: newPath,
      query,
      url: new URL(`${newPath}${convertToQueryString(query)}`, internalEvent.url).href
    };
  }
  return internalEvent;
}
function handleFallbackFalse(internalEvent, prerenderManifest) {
  const { rawPath } = internalEvent;
  const { dynamicRoutes, routes } = prerenderManifest;
  const routeFallback = Object.entries(dynamicRoutes).filter(([, { fallback }]) => fallback === false).some(([, { routeRegex }]) => {
    const routeRegexExp = new RegExp(routeRegex);
    return routeRegexExp.test(rawPath);
  });
  const locales = NextConfig.i18n?.locales;
  const routesAlreadyHaveLocale = locales?.includes(rawPath.split("/")[1]) || // If we don't use locales, we don't need to add the default locale
  locales === void 0;
  const localizedPath = routesAlreadyHaveLocale ? rawPath : `/${NextConfig.i18n?.defaultLocale}${rawPath}`;
  const isPregenerated = Object.keys(routes).includes(localizedPath);
  if (routeFallback && !isPregenerated) {
    return {
      event: {
        ...internalEvent,
        rawPath: "/404",
        url: constructNextUrl(internalEvent.url, "/404"),
        headers: {
          ...internalEvent.headers,
          "x-invoke-status": "404"
        }
      },
      isISR: false
    };
  }
  return {
    event: internalEvent,
    isISR: routeFallback || isPregenerated
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/middleware.js
init_stream();
var middlewareManifest = MiddlewareManifest;
var functionsConfigManifest = FunctionsConfigManifest;
var middleMatch = getMiddlewareMatch(middlewareManifest, functionsConfigManifest);
function defaultMiddlewareLoader() {
  return Promise.resolve().then(() => (init_edgeFunctionHandler(), edgeFunctionHandler_exports));
}
async function handleMiddleware(internalEvent, middlewareLoader = defaultMiddlewareLoader) {
  const headers = internalEvent.headers;
  if (headers["x-isr"])
    return internalEvent;
  const normalizedPath = localizePath(internalEvent);
  const hasMatch = middleMatch.some((r) => r.test(normalizedPath));
  if (!hasMatch)
    return internalEvent;
  const initialUrl = new URL(normalizedPath, internalEvent.url);
  initialUrl.search = convertToQueryString(internalEvent.query);
  const url = initialUrl.href;
  const middleware = await middlewareLoader();
  const result = await middleware.default({
    // `geo` is pre Next 15.
    geo: {
      // The city name is percent-encoded.
      // See https://github.com/vercel/vercel/blob/4cb6143/packages/functions/src/headers.ts#L94C19-L94C37
      city: decodeURIComponent(headers["x-open-next-city"]),
      country: headers["x-open-next-country"],
      region: headers["x-open-next-region"],
      latitude: headers["x-open-next-latitude"],
      longitude: headers["x-open-next-longitude"]
    },
    headers,
    method: internalEvent.method || "GET",
    nextConfig: {
      basePath: NextConfig.basePath,
      i18n: NextConfig.i18n,
      trailingSlash: NextConfig.trailingSlash
    },
    url,
    body: convertBodyToReadableStream(internalEvent.method, internalEvent.body)
  });
  const statusCode = result.status;
  const responseHeaders = result.headers;
  const reqHeaders = {};
  const resHeaders = {};
  responseHeaders.delete("x-middleware-override-headers");
  const xMiddlewareKey = "x-middleware-request-";
  responseHeaders.forEach((value, key) => {
    if (key.startsWith(xMiddlewareKey)) {
      const k = key.substring(xMiddlewareKey.length);
      reqHeaders[k] = value;
    } else {
      if (key.toLowerCase() === "set-cookie") {
        resHeaders[key] = resHeaders[key] ? [...resHeaders[key], value] : [value];
      } else {
        resHeaders[key] = value;
      }
    }
  });
  if (statusCode >= 300 && statusCode < 400) {
    resHeaders.location = responseHeaders.get("location") ?? resHeaders.location;
    return {
      body: emptyReadableStream(),
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      isBase64Encoded: false
    };
  }
  const rewriteUrl = responseHeaders.get("x-middleware-rewrite");
  let rewritten = false;
  let isExternalRewrite = false;
  let middlewareQueryString = internalEvent.query;
  let newUrl = internalEvent.url;
  if (rewriteUrl) {
    newUrl = rewriteUrl;
    rewritten = true;
    if (isExternal(newUrl, internalEvent.headers.host)) {
      isExternalRewrite = true;
    } else {
      const rewriteUrlObject = new URL(rewriteUrl);
      middlewareQueryString = middlewareQueryString.__nextDataReq ? {
        __nextDataReq: middlewareQueryString.__nextDataReq
      } : {};
      rewriteUrlObject.searchParams.forEach((v, k) => {
        middlewareQueryString[k] = v;
      });
    }
  }
  if (result.body) {
    const body = result.body;
    return {
      type: internalEvent.type,
      statusCode,
      headers: resHeaders,
      body,
      isBase64Encoded: false
    };
  }
  return {
    responseHeaders: resHeaders,
    url: newUrl,
    rawPath: new URL(newUrl).pathname,
    type: internalEvent.type,
    headers: { ...internalEvent.headers, ...reqHeaders },
    body: internalEvent.body,
    method: internalEvent.method,
    query: middlewareQueryString,
    cookies: internalEvent.cookies,
    remoteAddress: internalEvent.remoteAddress,
    isExternalRewrite
  };
}

// node_modules/@opennextjs/aws/dist/core/routing/routeMatcher.js
var optionalLocalePrefixRegex = `^/(?:${RoutesManifest.locales.map((locale) => `${locale}/?`).join("|")})?`;
var optionalBasepathPrefixRegex = RoutesManifest.basePath ? `^${RoutesManifest.basePath}/?` : "^/";
var apiPrefix = `${RoutesManifest.basePath ?? ""}/api`;
var optionalPrefix = optionalLocalePrefixRegex.replace("^/", optionalBasepathPrefixRegex);
function routeMatcher(routeDefinitions) {
  const regexp = routeDefinitions.map((route) => ({
    page: route.page,
    regexp: new RegExp(route.regex.replace("^/", optionalPrefix))
  }));
  const appPathsSet = /* @__PURE__ */ new Set();
  const routePathsSet = /* @__PURE__ */ new Set();
  for (const [k, v] of Object.entries(AppPathRoutesManifest)) {
    if (k.endsWith("page")) {
      appPathsSet.add(v);
    } else if (k.endsWith("route")) {
      routePathsSet.add(v);
    }
  }
  return function matchRoute(path2) {
    const foundRoutes = regexp.filter((route) => route.regexp.test(path2));
    return foundRoutes.map((foundRoute) => {
      let routeType = "page";
      if (appPathsSet.has(foundRoute.page)) {
        routeType = "app";
      } else if (routePathsSet.has(foundRoute.page)) {
        routeType = "route";
      }
      return {
        route: foundRoute.page,
        type: routeType
      };
    });
  };
}
var staticRouteMatcher = routeMatcher(RoutesManifest.routes.static);
var dynamicRouteMatcher = routeMatcher(RoutesManifest.routes.dynamic);

// node_modules/@opennextjs/aws/dist/core/routingHandler.js
var MIDDLEWARE_HEADER_PREFIX = "x-middleware-response-";
var MIDDLEWARE_HEADER_PREFIX_LEN = MIDDLEWARE_HEADER_PREFIX.length;
var INTERNAL_HEADER_PREFIX = "x-opennext-";
var INTERNAL_HEADER_INITIAL_URL = `${INTERNAL_HEADER_PREFIX}initial-url`;
var INTERNAL_HEADER_LOCALE = `${INTERNAL_HEADER_PREFIX}locale`;
var INTERNAL_HEADER_RESOLVED_ROUTES = `${INTERNAL_HEADER_PREFIX}resolved-routes`;
var geoHeaderToNextHeader = {
  "x-open-next-city": "x-vercel-ip-city",
  "x-open-next-country": "x-vercel-ip-country",
  "x-open-next-region": "x-vercel-ip-country-region",
  "x-open-next-latitude": "x-vercel-ip-latitude",
  "x-open-next-longitude": "x-vercel-ip-longitude"
};
function applyMiddlewareHeaders(eventHeaders, middlewareHeaders, setPrefix = true) {
  const keyPrefix = setPrefix ? MIDDLEWARE_HEADER_PREFIX : "";
  Object.entries(middlewareHeaders).forEach(([key, value]) => {
    if (value) {
      eventHeaders[keyPrefix + key] = Array.isArray(value) ? value.join(",") : value;
    }
  });
}
async function routingHandler(event) {
  for (const [openNextGeoName, nextGeoName] of Object.entries(geoHeaderToNextHeader)) {
    const value = event.headers[openNextGeoName];
    if (value) {
      event.headers[nextGeoName] = value;
    }
  }
  for (const key of Object.keys(event.headers)) {
    if (key.startsWith(INTERNAL_HEADER_PREFIX) || key.startsWith(MIDDLEWARE_HEADER_PREFIX)) {
      delete event.headers[key];
    }
  }
  const nextHeaders = getNextConfigHeaders(event, ConfigHeaders);
  let internalEvent = fixDataPage(event, BuildId);
  if ("statusCode" in internalEvent) {
    return internalEvent;
  }
  const redirect = handleRedirects(internalEvent, RoutesManifest.redirects);
  if (redirect) {
    debug("redirect", redirect);
    return redirect;
  }
  const eventOrResult = await handleMiddleware(internalEvent);
  const isResult = "statusCode" in eventOrResult;
  if (isResult) {
    return eventOrResult;
  }
  const middlewareResponseHeaders = eventOrResult.responseHeaders;
  let isExternalRewrite = eventOrResult.isExternalRewrite ?? false;
  internalEvent = eventOrResult;
  if (!isExternalRewrite) {
    const beforeRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.beforeFiles);
    internalEvent = beforeRewrites.internalEvent;
    isExternalRewrite = beforeRewrites.isExternalRewrite;
  }
  const foundStaticRoute = staticRouteMatcher(internalEvent.rawPath);
  const isStaticRoute = !isExternalRewrite && foundStaticRoute.length > 0;
  if (!(isStaticRoute || isExternalRewrite)) {
    const afterRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.afterFiles);
    internalEvent = afterRewrites.internalEvent;
    isExternalRewrite = afterRewrites.isExternalRewrite;
  }
  const { event: fallbackEvent, isISR } = handleFallbackFalse(internalEvent, PrerenderManifest);
  internalEvent = fallbackEvent;
  const foundDynamicRoute = dynamicRouteMatcher(internalEvent.rawPath);
  const isDynamicRoute = !isExternalRewrite && foundDynamicRoute.length > 0;
  if (!(isDynamicRoute || isStaticRoute || isExternalRewrite)) {
    const fallbackRewrites = handleRewrites(internalEvent, RoutesManifest.rewrites.fallback);
    internalEvent = fallbackRewrites.internalEvent;
    isExternalRewrite = fallbackRewrites.isExternalRewrite;
  }
  const isApiRoute = internalEvent.rawPath === apiPrefix || internalEvent.rawPath.startsWith(`${apiPrefix}/`);
  const isNextImageRoute = internalEvent.rawPath.startsWith("/_next/image");
  const isRouteFoundBeforeAllRewrites = isStaticRoute || isDynamicRoute || isExternalRewrite;
  if (!(isRouteFoundBeforeAllRewrites || isApiRoute || isNextImageRoute || // We need to check again once all rewrites have been applied
  staticRouteMatcher(internalEvent.rawPath).length > 0 || dynamicRouteMatcher(internalEvent.rawPath).length > 0)) {
    internalEvent = {
      ...internalEvent,
      rawPath: "/404",
      url: constructNextUrl(internalEvent.url, "/404"),
      headers: {
        ...internalEvent.headers,
        "x-middleware-response-cache-control": "private, no-cache, no-store, max-age=0, must-revalidate"
      }
    };
  }
  if (globalThis.openNextConfig.dangerous?.enableCacheInterception && !("statusCode" in internalEvent)) {
    debug("Cache interception enabled");
    internalEvent = await cacheInterceptor(internalEvent);
    if ("statusCode" in internalEvent) {
      applyMiddlewareHeaders(internalEvent.headers, {
        ...middlewareResponseHeaders,
        ...nextHeaders
      }, false);
      return internalEvent;
    }
  }
  applyMiddlewareHeaders(internalEvent.headers, {
    ...middlewareResponseHeaders,
    ...nextHeaders
  });
  const resolvedRoutes = [
    ...foundStaticRoute,
    ...foundDynamicRoute
  ];
  debug("resolvedRoutes", resolvedRoutes);
  return {
    internalEvent,
    isExternalRewrite,
    origin: false,
    isISR,
    resolvedRoutes,
    initialURL: event.url,
    locale: NextConfig.i18n ? detectLocale(internalEvent, NextConfig.i18n) : void 0
  };
}

// node_modules/@opennextjs/aws/dist/adapters/middleware.js
globalThis.internalFetch = fetch;
globalThis.__openNextAls = new AsyncLocalStorage();
var defaultHandler = async (internalEvent, options) => {
  const originResolver = await resolveOriginResolver(globalThis.openNextConfig.middleware?.originResolver);
  const externalRequestProxy = await resolveProxyRequest(globalThis.openNextConfig.middleware?.override?.proxyExternalRequest);
  return runWithOpenNextRequestContext({
    isISRRevalidation: internalEvent.headers["x-isr"] === "1",
    waitUntil: options?.waitUntil
  }, async () => {
    const result = await routingHandler(internalEvent);
    if ("internalEvent" in result) {
      debug("Middleware intercepted event", internalEvent);
      if (!result.isExternalRewrite) {
        const origin = await originResolver.resolve(result.internalEvent.rawPath);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            headers: {
              ...result.internalEvent.headers,
              [INTERNAL_HEADER_INITIAL_URL]: internalEvent.url,
              [INTERNAL_HEADER_RESOLVED_ROUTES]: JSON.stringify(result.resolvedRoutes)
            }
          },
          isExternalRewrite: result.isExternalRewrite,
          origin,
          isISR: result.isISR,
          initialURL: result.initialURL,
          resolvedRoutes: result.resolvedRoutes
        };
      }
      try {
        return externalRequestProxy.proxy(result.internalEvent);
      } catch (e) {
        error("External request failed.", e);
        return {
          type: "middleware",
          internalEvent: {
            ...result.internalEvent,
            rawPath: "/500",
            url: constructNextUrl(result.internalEvent.url, "/500"),
            method: "GET"
          },
          // On error we need to rewrite to the 500 page which is an internal rewrite
          isExternalRewrite: false,
          origin: false,
          isISR: result.isISR,
          initialURL: result.internalEvent.url,
          resolvedRoutes: [{ route: "/500", type: "page" }]
        };
      }
    }
    debug("Middleware response", result);
    return result;
  });
};
var handler2 = await createGenericHandler({
  handler: defaultHandler,
  type: "middleware"
});
var middleware_default = {
  fetch: handler2
};
export {
  middleware_default as default,
  handler2 as handler
};
