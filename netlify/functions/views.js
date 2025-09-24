// Example Netlify Function (ESM).
// Call from your app like: fetch('/.netlify/functions/views')
export async function handler(event, context) {
  return new Response(JSON.stringify({ ok: true, message: "Hello from Netlify Functions!" }), {
    headers: { "content-type": "application/json" },
    status: 200
  });
}
