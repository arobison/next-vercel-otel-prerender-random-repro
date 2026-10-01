# `@vercel/otel` http spans fail Cache Components prerendering with `Math.random()`

Minimal reproduction: Next.js 16.3.8, `cacheComponents: true`, `@vercel/otel` 2.1.3 with its default config.

```sh
pnpm install
pnpm dev
curl 'http://localhost:3000/?q=1'
```

After the request, `next dev` logs:

```
Error: Route "/": Next.js encountered the unstable value `Math.random()` while prerendering.
    at nodeHttpGet (app/page.tsx:5:10)
```

The error points at `https.get` in `app/page.tsx`. `@vercel/otel`'s fetch/http instrumentation wraps `node:https`, and creating its span generates a span id with `Math.random()`.

**Control:** rename `instrumentation.ts` (so `registerOTel()` never runs) and the error goes away.

The page combines a `'use cache'` read (`getLabel`), request data (`await searchParams`), and an outbound request through `node:http(s)` rather than `fetch` (Stripe's Node SDK, for example). Without the `'use cache'` read, the error does not occur.
