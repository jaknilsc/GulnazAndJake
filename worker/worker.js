export default {
  async fetch(request, env) {
    if (new URL(request.url).pathname === "/feedback") {
      return handleFeedback(request, env);
    }
    const origin = request.headers.get("Origin");

    const allowedOrigins = [
      "https://gulnazandjake.com",
      "https://www.gulnazandjake.com",
      "http://gulnazandjake.com",
      "http://www.gulnazandjake.com",
      "https://jaknilsc.github.io"
    ];

    const corsHeaders = {
      "Access-Control-Allow-Origin": origin || "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type"
    };

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders
      });
    }

    if (request.method === "GET") {
      return new Response("G&J Kiss Department operational.", {
        status: 200
      });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed.", {
        status: 405,
        headers: corsHeaders
      });
    }

    if (!allowedOrigins.includes(origin)) {
      return new Response("Unauthorised human.", {
        status: 403,
        headers: corsHeaders
      });
    }

    let data;

    try {
      data = await request.json();
    } catch {
      return new Response("Invalid request.", {
        status: 400,
        headers: corsHeaders
      });
    }

    let chatId;
    let recipient;

    if (data.recipient === "gulnaz") {
      chatId = env.GULNAZ_TELEGRAM_CHAT_ID;
      recipient = "Gulnaz";
    } else if (data.recipient === "jake") {
      chatId = env.TELEGRAM_CHAT_ID;
      recipient = "Jake";
    } else {
      return new Response("Unknown recipient.", {
        status: 400,
        headers: corsHeaders
      });
    }

    const telegramURL =
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`;

      const country = request.cf?.country || "Unknown";
      const city = request.cf?.city || "Unknown";
const message = [
  "💋 G&J KISS DEPARTMENT",
  "",
  `Incoming virtual kiss for ${recipient}.`,
  "",
  `Origin: ${city}, ${country}`,
  "Delivery status: COMPLETE",
  "Physical redemption: OUTSTANDING"
].join("\n");

    const telegramResponse = await fetch(telegramURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    if (!telegramResponse.ok) {
      console.error(
        "Telegram error:",
        await telegramResponse.text()
      );

      return new Response("Telegram delivery failed.", {
        status: 502,
        headers: corsHeaders
      });
    }

    return new Response("Kiss delivered.", {
      status: 200,
      headers: corsHeaders
    });
  }
};

async function handleFeedback(request, env) {
  const origin = request.headers.get('Origin');
  const allowed = ['https://gulnazandjake.com', 'https://www.gulnazandjake.com', 'https://jaknilsc.github.io'].includes(origin);
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'Vary': 'Origin',
    ...(allowed ? { 'Access-Control-Allow-Origin': origin } : {})
  };
  const reply = (status, body, extra = {}) => new Response(JSON.stringify(body), { status, headers: { ...headers, ...extra } });
  if (!allowed) return reply(403, { error: 'Unauthorised human.' });
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: {
      ...headers, 'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '600'
    } });
  }
  if (request.method !== 'POST') return reply(405, { error: 'Method not allowed.' }, { Allow: 'POST, OPTIONS' });
  if (request.headers.get('Content-Type')?.split(';')[0].trim().toLowerCase() !== 'application/json') {
    return reply(415, { error: 'Send JSON.' });
  }
  if (Number(request.headers.get('Content-Length')) > 16384) return reply(413, { error: 'Message too large.' });

  // Bound the streamed body too; Content-Length alone is not sufficient.
  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, { error: 'Invalid request.' });
    const decoder = new TextDecoder();
    let size = 0;
    let body = '';
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 16384) {
        await reader.cancel();
        return reply(413, { error: 'Message too large.' });
      }
      body += decoder.decode(value, { stream: true });
    }
    data = JSON.parse(body + decoder.decode());
  } catch {
    return reply(400, { error: 'Invalid request.' });
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return reply(400, { error: 'Invalid request.' });
  if (data.website !== undefined && data.website !== '') return reply(400, { error: 'Invalid request.' });
  const types = ['Suggestion', 'Bug', 'Complaint'];
  if (!types.includes(data.type) || typeof data.message !== 'string' || !data.message.trim() || data.message.length > 3000) {
    return reply(400, { error: 'Choose a feedback type and enter 1–3,000 characters.' });
  }
  try {
    const { success } = await env.FEEDBACK_RATE_LIMITER.limit({ key: `feedback:${request.headers.get('CF-Connecting-IP') || 'unknown'}` });
    if (!success) return reply(429, { error: 'Management needs a moment.' }, { 'Retry-After': '60' });
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) return reply(503, { error: 'Management is temporarily unavailable.' });
    const telegramResponse = await fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: env.TELEGRAM_CHAT_ID,
        text: ['G&J FEEDBACK · MANAGEMENT DESK', '', `Type: ${data.type}`, '', data.message.trim()].join('\n'),
        link_preview_options: { is_disabled: true }
      }),
      signal: AbortSignal.timeout(10000)
    });
    const delivery = await telegramResponse.json();
    if (!telegramResponse.ok || delivery.ok !== true) return reply(502, { error: 'Telegram delivery failed.' });
    // Never return or log Telegram response data, chat IDs, tokens or feedback text.
    return reply(200, { ok: true });
  } catch {
    return reply(502, { error: 'Delivery could not be confirmed.' });
  }
}
