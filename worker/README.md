# G&J Worker

`worker.js` is the existing `gj-kiss` Worker with an isolated `/feedback` route.
The original kiss handler and its bindings are preserved. Deploy this Worker
separately from GitHub Pages; there is no automatic Worker deployment on push.

Keep the existing `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` (Jake), and
`GULNAZ_TELEGRAM_CHAT_ID` bindings in Cloudflare. Never put their values here.
The rate-limit binding is configured in `wrangler.jsonc`; when deploying via
Cloudflare's multipart API, inherit the three existing bindings and add
`FEEDBACK_RATE_LIMITER` with type `ratelimit`, namespace `2026092301`, and
`simple: { limit: 5, period: 60 }`. Preserve existing Worker settings.

## Feedback endpoint

`POST https://gj-kiss.jaknils.workers.dev/feedback`

JSON: `{ "type": "Suggestion", "message": "Your feedback", "website": "" }`.
Allowed types: Suggestion, Bug, Complaint. The message is
required and limited to 3,000 UTF-16 code units; request bodies are capped at
16 KiB. The optional website field is a honeypot and must be empty.

HTTPS origins allowed: gulnazandjake.com, www.gulnazandjake.com, and
jaknilsc.github.io. Origin checks reduce browser misuse; this remains a public,
unauthenticated endpoint. The Cloudflare limiter allows five valid attempts
per IP per minute, approximately and per Cloudflare location. Shared IPs share
the limit. There is no persistent feedback storage, email, or message logging.

Feedback Telegram messages include `Origin: city, country` from Cloudflare's
request location metadata, matching kiss messages, with `Unknown` fallbacks.
This is approximate IP-based location, not browser GPS.

Responses: 200 `{ "ok": true }` only after Telegram confirms success; 400 for
invalid input/honeypot, 403 for disallowed origin, 405 for unsupported method,
413 for oversized body, 415 for non-JSON, 429 with Retry-After: 60 for rate limit,
503 for missing credentials, 502 for unconfirmed/failed delivery. OPTIONS returns
204 for allowed origins. Messages use plain text with link previews disabled.

Run regression checks with `node --test worker/worker.test.mjs` from the repo root.
