# ピラー記事とクラスター（内部リンク設計の参照）

[`GROWTH_STRATEGY.md`](../GROWTH_STRATEGY.md) 4.2・4.3 および [`docs/ROADMAP.md`](./ROADMAP.md) の「ピラー・クラスター明示」に対応する参照用ドキュメント。  
**正のデータ**は [`lib/articles-data.ts`](../lib/articles-data.ts)（`order`・`badge`・`relatedLinks`）と [`lib/article-types.ts`](../lib/article-types.ts)（カテゴリラベル）。

## カテゴリ別URL（一覧の入口）

| カテゴリ key | 一覧URL |
|--------------|---------|
| `loan-amount` | `/articles/category/loan-amount` |
| `repayment-method` | `/articles/category/repayment-method` |
| … | 他カテゴリも同様に `/articles/category/<key>` |

各カテゴリページから **借入返済シミュレーター**・**使い方**への導線を置いています（[`app/articles/category/[slug]/page.tsx`](../app/articles/category/[slug]/page.tsx)）。

## ピラー（親）記事の目安

`order: 0` または `badge: おすすめ` 等で一覧の先頭に来やすい記事を「ピラー」として扱い、子記事は `relatedLinks` と本文で接続します。

| カテゴリ | ピラー slug（目安） | 備考 |
|----------|---------------------|------|
| `fixed-cost` | `fixed-cost-guide` | order: 0・おすすめ |
| `household` | `household-budget-starter` | order: 0 |
| `improvement-effect` | `fixed-cost-5000-impact` | order: 0・おすすめ |
| `loan-amount` | `loan-amount-guide` | order: 0・おすすめ |
| `repayment-method` | `repayment-method-difference` | 方式比較の入口（order 未指定だが代表） |
| `revolving` | `revo-100-interest` | リボの入口 |
| `repayment-improvement` | `repayment-improvement-guide` | order: 0・おすすめ |
| `repayment-planning` | `monthly-50000-how-much-can-borrow` 等 | 逆算系は複数柱。必要に応じて `relatedLinks` で束ねる |
| `story` | `investment-loss-family-trust` | order: 0・体験記 |
| `side-income` | `side-income-debt-repayment-intro` | order: 0・おすすめ |
| `saving` | `saving-food-budget-20000` | order: 0・おすすめ |

※ `getArticlesByCategory()` は同一カテゴリ内で `order` 昇順のため、`order` が小さい記事が先に表示されます。

## 運用メモ

- 新規記事追加時は **同カテゴリのピラー／近接記事**へ `relatedLinks` を張る。
- ピラーを差し替える場合は **`order` / `badge` と本表**を更新する。
- フッターの「よく読まれている記事」は [`getPopularArticles()`](../lib/articles.ts) の手動キュレーション（トップと共通）。
