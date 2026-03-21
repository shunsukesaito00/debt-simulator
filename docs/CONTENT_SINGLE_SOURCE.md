# 記事メタ・一覧の単一ソース（方針）

**目的**: コード上の「正」と運用ドキュメントの役割をはっきりさせ、拡張時の迷いを減らす。

## 正（Single source of truth）

| 対象 | 正の定義場所 |
|------|----------------|
| 記事の slug・タイトル・要約・カテゴリ・`relatedLinks`・`dateModified` | [`lib/articles-data.ts`](../lib/articles-data.ts) |
| カテゴリ名・説明・一覧セクション構成 | [`lib/article-types.ts`](../lib/article-types.ts)（`CATEGORY_LABELS` 等） |
| 取得・一覧・サイトマップ用ヘルパ | [`lib/articles.ts`](../lib/articles.ts) |

## 運用

- 記事を追加・変更したら、必要に応じて [`docs/ROADMAP.md`](./ROADMAP.md) の方針（条件明示・内部リンク）と [`docs/PILLAR_AND_CLUSTER.md`](./PILLAR_AND_CLUSTER.md) の対応表を見直す。

## CI・検証

- `npm run check-links` … `relatedLinks` 等の `/articles/:slug` が存在するか検証（[`scripts/check-internal-links.mjs`](../scripts/check-internal-links.mjs)）。
