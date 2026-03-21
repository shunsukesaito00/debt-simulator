# プロダクト・コンテンツのバックログ（参照用）

実装優先度は都度判断。**全体の優先度とコンテンツ／SEO の大方針**は [`docs/ROADMAP.md`](./ROADMAP.md)。

## コンテンツ（ロングテール）

- 代表的な具体クエリ向けのテーマは一通り記事化済み。Search Console 等で新たな具体クエリが見えたら、[`ROADMAP.md`](./ROADMAP.md) の「コンテンツ・SEO の方針」に沿い、条件明示で追加する。
- 1記事1条件（借入額・金利・期間）を明示し、シミュレーター・関連記事へ導線を張る。

## シミュレーター拡張（要望・検討段階）

- ~~**無利息期間**~~ — **実施済み**: [`lib/loan-calc.ts`](../lib/loan-calc.ts) の `interestFreeMonths`（先頭Nヶ月は利息0の簡易モデル）とシミュレーターUI・免責・[`/logic`](../app/logic/page.tsx) の説明。
- ~~**年収・返済負担率**~~ — **一部実施**: 手取り月収（任意）入力と、初月返済額に対する**返済負担率（参考）**をサマリーに表示（審査判断ではない旨を免責に明記）。

## 記事メタデータ

- 本文を更新したら [`lib/articles-data.ts`](../lib/articles-data.ts) の該当記事に `dateModified: "YYYY-MM-DD"` を付与すると、JSON-LD とサイトマップの `lastModified` に反映される（`publishedAt` より優先）。取得ロジックは [`lib/articles.ts`](../lib/articles.ts) が再エクスポート。

## リファクタ（任意）

- ~~`lib/articles.ts` の `articlesData` 分割~~ — **実施済み**: [`lib/article-types.ts`](../lib/article-types.ts)（型・カテゴリ）、[`lib/articles-data.ts`](../lib/articles-data.ts)（配列）、[`lib/articles.ts`](../lib/articles.ts)（取得ロジック・再エクスポート）。
