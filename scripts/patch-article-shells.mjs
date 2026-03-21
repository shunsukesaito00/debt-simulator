/**
 * 各記事 page.tsx の <article>+パンくず を ArticlePageShell に置換するワンショットスクリプト。
 * 実行: node scripts/patch-article-shells.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..", "app", "articles");

const WIDE = new Set([
  "borrow-100-interest",
  "borrow-200-monthly-payment",
  "borrow-300-monthly-payment",
  "revo-100-interest",
  "revo-100man-15percent-simulation",
  "repayment-method-difference",
  "monthly-50000-interest-at-15percent",
  "monthly-50000-how-much-can-borrow",
  "fixed-payment-principal-interest-cannot-payoff",
  "fixed-monthly-payment-borrowing-reverse-calculator",
  "early-repayment-effect",
  "early-repayment-100k-effect",
  "100man-100months-risk-at-15percent",
]);

const IMPORTS = `import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";
`;

const articleNavRe =
  /<article className="(?:mx-auto max-w-3xl|ds-article-shell)">\s*<nav className="mb-4 text-sm text-stone-600" aria-label="パンくず">[\s\S]*?<\/nav>\s*/;

for (const ent of fs.readdirSync(root, { withFileTypes: true })) {
  if (!ent.isDirectory()) continue;
  const slug = ent.name;
  const file = path.join(root, slug, "page.tsx");
  if (!fs.existsSync(file)) continue;

  let s = fs.readFileSync(file, "utf8");
  if (s.includes("ArticlePageShell")) {
    console.log("skip (already)", slug);
    continue;
  }
  if (!articleNavRe.test(s)) {
    console.error("skip (no match)", slug);
    continue;
  }

  const anchor = 'from "@/lib/site-author";';
  if (!s.includes(anchor)) {
    console.error("skip (no site-author import)", slug);
    continue;
  }
  if (!s.includes(IMPORTS.trim().split("\n")[0])) {
    s = s.replace(anchor, `${anchor}\n${IMPORTS}`);
  }

  const wide = WIDE.has(slug);
  s = s.replace(
    articleNavRe,
    `\n      <ArticlePageShell currentPageTitle={ARTICLE_TITLE} wide={articleUsesWideLayout("${slug}")}>\n`
  );

  const last = s.lastIndexOf("</article>");
  if (last === -1) {
    console.error("skip (no </article>)", slug);
    continue;
  }
  s = s.slice(0, last) + "</ArticlePageShell>" + s.slice(last + "</article>".length);

  fs.writeFileSync(file, s);
  console.log("patched", slug, wide ? "wide" : "prose");
}
