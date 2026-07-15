import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { access, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import test, { after, before } from "node:test";

const templateRoot = new URL("../", import.meta.url);
const projectRoot = fileURLToPath(templateRoot);
const port = 32000 + (process.pid % 10000);
let server;
let renderedHtml;

before(async () => {
  let output = "";
  server = spawn(process.execPath, [".next/standalone/server.js"], {
    cwd: projectRoot,
    env: {
      ...process.env,
      HOSTNAME: "127.0.0.1",
      PORT: String(port),
    },
    stdio: ["ignore", "pipe", "pipe"],
  });
  server.stdout.on("data", (chunk) => { output += chunk; });
  server.stderr.on("data", (chunk) => { output += chunk; });

  for (let attempt = 0; attempt < 100; attempt += 1) {
    if (server.exitCode !== null) {
      throw new Error(`Production server exited early.\n${output}`);
    }
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`);
      assert.equal(response.status, 200);
      renderedHtml = await response.text();
      return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  }

  throw new Error(`Production server did not become ready.\n${output}`);
});

after(() => {
  server?.kill();
});

test("server-renders the Tracy Smog Center home page", async () => {
  const html = renderedHtml;
  assert.match(html, /<title>Tracy Smog Center \| STAR Smog Checks in Tracy, CA<\/title>/i);
  assert.match(html, /Fast STAR Smog Checks in Tracy, CA/);
  assert.match(html, /10 W Grant Line Rd, Tracy, CA/);
  assert.match(html, /href="tel:\+12098342760"/);
  assert.match(html, /href="\/tracy-smog-center-coupon\.pdf"/);
  assert.match(html, /type="application\/ld\+json"/);
  assert.match(html, new RegExp(`property="og:image" content="http://127\\.0\\.0\\.1:${port}/og\\.png"`));
  assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape/i);
});

test("ships the production identity and customer assets", async () => {
  const [page, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"name": "tracy-smog-center"/);
  assert.match(page, /name: "Tracy Smog Center"/);
  assert.match(layout, /Tracy Smog Center \| STAR Smog Checks in Tracy, CA/);
  assert.doesNotMatch(`${page}\n${layout}\n${packageJson}`, /react-loading-skeleton/);

  await Promise.all([
    access(new URL("public/tracy-smog-center-logo.png", templateRoot)),
    access(new URL("public/tracy-smog-center-coupon.pdf", templateRoot)),
    access(new URL("public/og.png", templateRoot)),
  ]);
});
