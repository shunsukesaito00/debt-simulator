# 記事メタ・一覧の単一ソース（方針）

**目的**: `docs/SITE_STRUCTURE_AND_CONTENT.md` と実サイトの乖離を防ぎ、拡張時の迷いを減らす。

## 正（Single source of truth）

| 対象 | 正の定義場所 |
|------|----------------|
| 記事の slug・タイトル・要約・カテゴリ・`relatedLinks`・`dateModified` | [`lib/articles-data.ts`](../lib/articles-data.ts) |
| カテゴリ名・説明・一覧セクション構成 | [`lib/article-types.ts`](../lib/article-types.ts)（`CATEGORY_LABELS` 等） |
| 取得・一覧・サイトマップ用ヘルパ | [`lib/articles.ts`](../lib/articles.ts) |

## 参照用スナップショット

- [`docs/SITE_STRUCTURE_AND_CONTENT.md`](./SITE_STRUCTURE_AND_CONTENT.md) は上記の**人間向け要約**。記事を追加・変更したら、可能な範囲で本ドキュメントも更新する。

## CI・検証

- `npm run check-links` … `relatedLinks` 等の `/articles/:slug` が存在するか検証（[`scripts/check-internal-links.mjs`](../scripts/check-internal-links.mjs)）。

この方針は [`docs/SEO_STRATEGY_PHASE8-10.md`](./SEO_STRATEGY_PHASE8-10.md) フェーズ8「記事一覧の単一ソース化」に対応します。
