/**
 * 記事に ArticleStandardBlocks + ArticleProse を挿入
 * node scripts/apply-article-standard-blocks.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articlesRoot = path.join(__dirname, "../app/articles");

function walk(dir, acc = []) {
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "category") continue;
      walk(p, acc);
    } else if (name === "page.tsx" && !p.endsWith("articles/page.tsx")) {
      acc.push(p);
    }
  }
  return acc;
}

function patchFile(filePath) {
  let c = fs.readFileSync(filePath, "utf8");
  if (c.includes("ArticleStandardBlocks")) {
    return { filePath, changed: false, note: "skip: already patched" };
  }

  const slugFromFooter = /articleSlug="([^"]+)"/.exec(c)?.[1];
  const slugFromConst = /const SLUG = "([^"]+)" as const/.exec(c)?.[1];
  const slug = slugFromFooter ?? slugFromConst;
  if (!slug) {
    return { filePath, changed: false, note: "skip: no slug" };
  }
  const slugProp = slugFromConst ? "slug={SLUG}" : `slug="${slug}"`;

  // imports
  const importRe = /import \{([^}]*)\} from "@\/app\/components\/article";/;
  const im = importRe.exec(c);
  if (!im) {
    return { filePath, changed: false, note: "skip: no article import" };
  }
  const parts = im[1]
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (!parts.includes("ArticleStandardBlocks")) parts.push("ArticleStandardBlocks");
  if (!parts.includes("ArticleProse")) parts.push("ArticleProse");
  c = c.replace(importRe, `import { ${parts.join(", ")} } from "@/app/components/article";`);

  const block = `\n\n          <ArticleStandardBlocks ${slugProp} />\n`;

  if (c.includes("</p>\n\n          <ArticlePagePremise")) {
    c = c.replace("</p>\n\n          <ArticlePagePremise", `</p>${block}\n          <ArticlePagePremise`);
  } else if (c.includes("</p>\n\n          <section id=\"premise\"")) {
    c = c.replace("</p>\n\n          <section id=\"premise\"", `</p>${block}\n          <section id="premise"`);
  } else {
    return { filePath, changed: false, note: "skip: no insert point (premise)" };
  }

  // Main column: space-y-10
  if (c.includes('className="mt-8 space-y-10 text-sm text-stone-700 leading-relaxed"')) {
    c = c.replace(
      '<div className="mt-8 space-y-10 text-sm text-stone-700 leading-relaxed">',
      '<ArticleProse className="mt-8 space-y-10">'
    );
    if (c.includes("\n          </div>\n\n          <ArticleEditorMemo")) {
      c = c.replace("\n          </div>\n\n          <ArticleEditorMemo", "\n          </ArticleProse>\n\n          <ArticleEditorMemo");
    } else if (c.includes("\n          </div>\n\n          <ArticleFooter")) {
      c = c.replace("\n          </div>\n\n          <ArticleFooter", "\n          </ArticleProse>\n\n          <ArticleFooter");
    } else {
      return { filePath, changed: false, note: "ERROR: could not close ArticleProse (space-y-10)" };
    }
  } else if (c.includes('className="mt-8 space-y-6 text-sm text-stone-700 leading-relaxed"')) {
    c = c.replace(
      '<section className="mt-8 space-y-6 text-sm text-stone-700 leading-relaxed">',
      '<ArticleProse className="mt-8 space-y-6">'
    );
    if (
      c.includes(
        '\n          </section>\n\n          <div className="mt-10">\n            <ArticleReadingPoints'
      )
    ) {
      c = c.replace(
        '\n          </section>\n\n          <div className="mt-10">\n            <ArticleReadingPoints',
        "\n          </ArticleProse>\n\n          <div className=\"mt-10\">\n            <ArticleReadingPoints"
      );
    } else if (c.includes("\n          </section>\n\n          <ArticleFooter")) {
      c = c.replace(/\n          <\/section>\n\n          <ArticleFooter/, "\n          </ArticleProse>\n\n          <ArticleFooter");
    } else {
      return { filePath, changed: false, note: "ERROR: could not close ArticleProse (space-y-6)" };
    }
  } else {
    return { filePath, changed: false, note: "skip: no body wrapper pattern" };
  }

  fs.writeFileSync(filePath, c);
  return { filePath, changed: true, note: "ok" };
}

const files = walk(articlesRoot).filter((f) => !f.endsWith("/articles/page.tsx"));
const results = files.map(patchFile);
const errors = results.filter((r) => r.note.startsWith("ERROR"));
const skipped = results.filter((r) => !r.changed && !r.note.startsWith("ERROR"));
const ok = results.filter((r) => r.changed);

console.log("Patched:", ok.length);
console.log("Skipped:", skipped.length, skipped.slice(0, 8).map((r) => `${r.filePath} (${r.note})`).join("\n"));
if (errors.length) {
  console.error("Errors:", errors);
  process.exit(1);
}
