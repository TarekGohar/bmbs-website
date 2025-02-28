import { createRequire as topLevelCreateRequire } from 'module';const require = topLevelCreateRequire(import.meta.url);import bannerUrl from 'url';const __dirname = bannerUrl.fileURLToPath(new URL('.', import.meta.url));

// node_modules/@opennextjs/cloudflare/dist/api/cloudflare-context.js
var cloudflareContextSymbol = Symbol.for("__cloudflare-context__");

// node_modules/@opennextjs/cloudflare/dist/api/config.js
function defineCloudflareConfig(options = {}) {
  const { incrementalCache, tagCache, queue } = options;
  return {
    default: {
      override: {
        wrapper: "cloudflare-node",
        converter: "edge",
        incrementalCache: resolveOverride(incrementalCache),
        tagCache: resolveOverride(tagCache),
        queue: resolveOverride(queue)
      }
    },
    middleware: {
      external: true,
      override: {
        wrapper: "cloudflare-edge",
        converter: "edge",
        proxyExternalRequest: "fetch"
      }
    }
  };
}
function resolveOverride(value) {
  if (!value || value === "dummy") {
    return "dummy";
  }
  if (value === "direct") {
    return "direct";
  }
  return typeof value === "function" ? value : () => value;
}

// open-next.config.ts
var open_next_config_default = defineCloudflareConfig();
export {
  open_next_config_default as default
};
