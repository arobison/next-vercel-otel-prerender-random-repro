import https from 'node:https';

// Any SDK that talks HTTP via node:http(s) rather than fetch (Stripe's Node SDK, for example).
function nodeHttpGet(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      res.resume();
      res.on('end', () => resolve(res.statusCode ?? 0));
    }).on('error', reject);
  });
}

async function getLabel() {
  'use cache';
  return 'upstream status';
}

// A request-time page (e.g. a checkout confirmation keyed off ?session_id).
export const instant = false;

export default async function Page({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const label = await getLabel();
  await searchParams;
  const status = await nodeHttpGet('https://example.com/');
  return <p>{label}: {status}</p>;
}
