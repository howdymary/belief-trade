// Vinext beta's prerender pass omits basePath when requesting static routes.
// Render the validated production handler at the real project URLs, and stage
// its assets relative to GitHub Pages' repository root. No server is deployed.
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { default as handler } from '../dist/server/index.js';

const output = resolve('out');
const prefix = '/belief-trade';
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp('public', output, { recursive: true });
await cp('dist/client/belief-trade/_next', resolve(output, '_next'), { recursive: true });

for (const route of ['', 'editorial', 'studio', 'world', 'bloom', 'mono']) {
  const url = `https://howdymary.github.io${prefix}/${route ? route + '/' : ''}`;
  const response = await handler(new Request(url));
  if (response.status !== 200) throw new Error(`Export failed: ${url} (${response.status})`);
  const html = await response.text();
  if (!html.includes('Belief') || !html.includes('</html>')) throw new Error(`Incomplete HTML: ${route}`);
  const directory = resolve(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(resolve(directory, 'index.html'), html);

  const rsc = await handler(new Request(`${url}?_rsc`, { headers: { RSC: '1', Accept: 'text/x-component' } }));
  if (rsc.status !== 200) throw new Error(`RSC export failed: ${route}`);
  await writeFile(resolve(output, route ? `${route}.rsc` : 'index.rsc'), new Uint8Array(await rsc.arrayBuffer()));
  console.log(`Exported ${prefix}/${route} (${html.length} bytes)`);
}

await writeFile(resolve(output, '404.html'), '<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Find your way — Belief Trade</title><body style="font-family:Arial;background:#f5f5f1;color:#192117;padding:12vw"><h1>A different path awaits.</h1><p>This page isn’t here. Your next belief might be.</p><a href="/belief-trade/">Explore Belief Trade →</a></body></html>');
console.log(`Static GitHub Pages export ready: ${output}`);
