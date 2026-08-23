import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incrementalCache: pages read the Google Sheet per request so the client's
// edits show up immediately. Add one (plus an R2 bucket) if traffic grows.
export default defineCloudflareConfig();
