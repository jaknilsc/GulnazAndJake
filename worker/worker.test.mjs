import { test } from 'node:test';
import assert from 'node:assert/strict';
import worker from './worker.js';

const origin = 'https://gulnazandjake.com';
const valid = { type: 'Suggestion', message: 'More coffee ☕', website: '' };
const env = {
  TELEGRAM_BOT_TOKEN: 'test-token', TELEGRAM_CHAT_ID: 'jake-test',
  GULNAZ_TELEGRAM_CHAT_ID: 'gulnaz-test',
  FEEDBACK_RATE_LIMITER: { limit: async () => ({ success: true }) }
};
const request = (body = valid, options = {}) => new Request('https://example.com/feedback', {
  method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', 'CF-Connecting-IP': '192.0.2.1', ...options.headers },
  body: JSON.stringify(body), ...Object.fromEntries(Object.entries(options).filter(([k]) => k !== 'headers'))
});

test('validation rejects malformed, empty, oversized and honeypot submissions without sending', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = () => { throw new Error('must not send'); };
  try {
    for (const body of [null, [], {}, { ...valid, type: 'Other' }, { ...valid, message: '  ' }, { ...valid, message: 42 }, { ...valid, message: 'a'.repeat(3001) }, { ...valid, website: 'spam' }]) {
      assert.equal((await worker.fetch(request(body), env)).status, 400);
    }
    assert.equal((await worker.fetch(request(valid, { body: '{' }), env)).status, 400);
    assert.equal((await worker.fetch(request(valid, { body: 'x'.repeat(17000) }), env)).status, 413);
    assert.equal((await worker.fetch(request(valid, { headers: { 'Content-Type': 'text/plain' } }), env)).status, 415);
    const denied = await worker.fetch(request(valid, { headers: { Origin: 'https://evil.example' } }), env);
    assert.equal(denied.status, 403);
    assert.equal(denied.headers.get('Access-Control-Allow-Origin'), null);
    assert.equal((await worker.fetch(request(valid, { headers: { Origin: '' } }), env)).status, 403);
  } finally { globalThis.fetch = original; }
});

test('preflight and method handling', async () => {
  const preflight = await worker.fetch(new Request('https://example.com/feedback', { method: 'OPTIONS', headers: { Origin: origin } }), env);
  assert.equal(preflight.status, 204);
  assert.equal(preflight.headers.get('Access-Control-Allow-Origin'), origin);
  assert.equal((await worker.fetch(new Request('https://example.com/feedback', { headers: { Origin: origin } }), env)).status, 405);
});

test('each feedback type goes only to Jake as plain text, without returning secrets', async () => {
  const original = globalThis.fetch;
  const sent = [];
  globalThis.fetch = async (url, options) => {
    assert.equal(url, 'https://api.telegram.org/bottest-token/sendMessage');
    sent.push(JSON.parse(options.body));
    return Response.json({ ok: true, result: { message_id: 1, chat: { id: 'jake-test' } } });
  };
  try {
    for (const type of ['Suggestion', 'Bug', 'Complaint', 'Excellent decision']) {
      const result = await worker.fetch(request({ ...valid, type, message: ' <b>coffee</b> ☕ ' }), env);
      assert.equal(result.status, 200);
      assert.deepEqual(await result.json(), { ok: true });
      assert.equal(sent.at(-1).chat_id, 'jake-test');
      assert.equal(sent.at(-1).parse_mode, undefined);
      assert.match(sent.at(-1).text, /<b>coffee<\/b> ☕$/);
    }
  } finally { globalThis.fetch = original; }
});

test('rate limit and Telegram errors never report success', async () => {
  const limited = await worker.fetch(request(), { ...env, FEEDBACK_RATE_LIMITER: { limit: async ({ key }) => {
    assert.equal(key, 'feedback:192.0.2.1'); return { success: false };
  } } });
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('Retry-After'), '60');
  const original = globalThis.fetch;
  try {
    for (const stub of [async () => Response.json({ ok: false }), async () => Response.json({ ok: false }, { status: 500 }), async () => { throw new Error('network'); }]) {
      globalThis.fetch = stub;
      assert.equal((await worker.fetch(request(), env)).status, 502);
    }
    assert.equal((await worker.fetch(request(), { ...env, TELEGRAM_CHAT_ID: '' })).status, 503);
  } finally { globalThis.fetch = original; }
});

test('existing kiss health and both recipient paths are preserved', async () => {
  assert.equal(await (await worker.fetch(new Request('https://example.com/'), env)).text(), 'G&J Kiss Department operational.');
  const original = globalThis.fetch;
  let sent;
  globalThis.fetch = async (_, options) => { sent = JSON.parse(options.body); return Response.json({ ok: true }); };
  try {
    for (const recipient of ['jake', 'gulnaz']) {
      const result = await worker.fetch(new Request('https://example.com/', { method: 'POST', headers: { Origin: origin }, body: JSON.stringify({ recipient }) }), env);
      assert.equal(result.status, 200);
      assert.equal(sent.chat_id, `${recipient}-test`);
      assert.match(sent.text, /KISS DEPARTMENT/);
    }
  } finally { globalThis.fetch = original; }
});
