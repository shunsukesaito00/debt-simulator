#!/usr/bin/env node
/**
 * 内部リンクチェック: lib/articles.ts の relatedLinks で参照されている
 * /articles/:slug が、存在する記事 slug を指しているか検証する。
 * 用法: node scripts/check-internal-links.mjs
 * 失敗時は exit 1 で終了する。
 */

import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const articlesPath = join(root, "lib/articles.ts");
const content = readFileSync(articlesPath, "utf-8");

// 記事 slug 一覧を抽出（slug: "xxx" の形式）
const slugRegex = /slug:\s*["']([^"']+)["']/g;
const slugs = new Set();
let m;
while ((m = slugRegex.exec(content)) !== null) {
  slugs.add(m[1]);
}

// /articles/xxx 形式の内部リンクを抽出（href: "/articles/xxx" または href: '/articles/xxx'）
const hrefRegex = /href:\s*["'](\/articles\/([^"']+))["']/g;
const articleLinks = [];
while ((m = hrefRegex.exec(content)) !== null) {
  articleLinks.push({ full: m[1], slug: m[2] });
}

const broken = articleLinks.filter(({ slug }) => !slugs.has(slug));
if (broken.length > 0) {
  console.error("Internal link check failed: the following article links point to non-existent slugs:");
  broken.forEach(({ full, slug }) => console.error(`  ${full} (slug: ${slug})`));
  process.exit(1);
}

console.log("Internal link check passed: all /articles/* links in lib/articles.ts point to existing slugs.");
process.exit(0);
