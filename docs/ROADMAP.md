# サイト今後のロードマップ

**目的**: コンテンツ・ツール・技術の優先順位を一箇所で把握する。詳細な戦略は各ドキュメントを正とする。

| 参照ドキュメント | 内容 |
|------------------|------|
| [`GROWTH_STRATEGY.md`](../GROWTH_STRATEGY.md) | 検索・コンテンツの勝ち方、ロングテール記事の増やし方 |
| [`docs/SEO_STRATEGY_PHASE8-10.md`](./SEO_STRATEGY_PHASE8-10.md) | ドキュメント同期、内部リンク、計測・継続改善 |
| [`docs/SITE_STRUCTURE_AND_CONTENT.md`](./SITE_STRUCTURE_AND_CONTENT.md) | URL・ページ構成のスナップショット |
| [`docs/PRODUCT_BACKLOG.md`](./PRODUCT_BACKLOG.md) | プロダクト要望・リファクタのメモ |
| [`docs/TYPOGRAPHY.md`](./TYPOGRAPHY.md) | タイポ・アクセシビリティ・画像の運用 |
| [`docs/VISUAL_REGRESSION_CHECKLIST.md`](./VISUAL_REGRESSION_CHECKLIST.md) | リリース前の手動確認 URL |
| [`docs/CONTENT_SINGLE_SOURCE.md`](./CONTENT_SINGLE_SOURCE.md) | 記事メタ・カテゴリの「正」と取得関数の対応 |
| [`docs/PILLAR_AND_CLUSTER.md`](./PILLAR_AND_CLUSTER.md) | ピラー／クラスター記事の対応（運用メモ） |
| [`docs/DISCLAIMER_PATTERNS.md`](./DISCLAIMER_PATTERNS.md) | 試算・記事まわりの免責文のパターン集 |

---

## すでに土台としてあるもの（維持・更新のみ）

- **シミュレーター**（4方式・A/B・CSV）と **記事メタの一元管理**（[`lib/articles.ts`](../lib/articles.ts)）
- **内部リンクチェック**（`npm run check-links`）と **CI**（[`.github/workflows/ci.yml`](../.github/workflows/ci.yml)）
- **記事内 Recharts**: `ChartsLazy` + `ssr: false` でビルド時警告を抑制（[`article-chart-dynamic.tsx`](../app/components/article/article-chart-dynamic.tsx)）
- **可読性トークン**（`ds-*`）、**`dateModified`** による JSON-LD / サイトマップ（任意フィールド）
- **計測**: GA4 `TrackedLink`（[`docs/ANALYTICS_MEASUREMENT.md`](./ANALYTICS_MEASUREMENT.md)）
- **Lint**: `npm run lint` は `eslint .`（[`eslint.config.mjs`](../eslint.config.mjs)）。CI で `check-links` → `build`。
- **SEO ドキュメント**: [`SEO_STRATEGY_PHASE8-10.md`](./SEO_STRATEGY_PHASE8-10.md) の「今後の追加検討」は実施済み／任意の整理済み（随時更新）。

---

## 短期（運用で続けること）

1. **コンテンツ**: [`GROWTH_STRATEGY.md`](../GROWTH_STRATEGY.md) 3.2 のテーマは一通り記事化済み。新しいクエリに応じて**条件明示の記事を追加**する場合は、シミュ・`relatedLinks`・関連記事導線をセットで（方針は GROWTH_STRATEGY 参照）。
2. **メタ運用**: 記事本文やタイトルを直したら、記事データ（[`lib/articles-data.ts`](../lib/articles-data.ts)）に **`dateModified`** を付与し、JSON-LD / サイトマップ / RSS の鮮度と揃える（詳細は [`PRODUCT_BACKLOG.md`](./PRODUCT_BACKLOG.md)）。

※「品質（lint）」と「SEOドキュメントの棚卸し」は上記「すでに土台」へ移動済みです。

---

## 中期（プロダクト・情報設計）

1. **シミュレーター拡張**: ~~年収・返済負担率~~ **手取り月収（任意）と返済負担率（参考）をサマリー表示**（実装済み）。~~**無利息期間**~~ **先頭Nヶ月の利息を0とする簡易モデル**を [`lib/loan-calc.ts`](../lib/loan-calc.ts) とカードローンシミュに実装済み（免責・計算ロジックページに記載）。
2. **`lib/articles.ts` の分割**: ~~データ配列と取得ロジックのファイル分離~~ **実施済み**（[`lib/article-types.ts`](../lib/article-types.ts) / [`lib/articles-data.ts`](../lib/articles-data.ts) / [`lib/articles.ts`](../lib/articles.ts)）。
3. **構造化データの拡張**: **`/how-to` に HowTo**、**`/faq` に FAQPage ＋ BreadcrumbList**、**[`/qa/what-can-simulator-do`](../app/qa/what-can-simulator-do/page.tsx) に QAPage**（単一Q&A）を追加済み。それ以外の枠は [`SEO_STRATEGY_PHASE8-10.md`](./SEO_STRATEGY_PHASE8-10.md) で任意。

---

## 継続（サイクルで回す）

- **Search Console**: 表示クエリ・10位前後のクエリ強化（[`GROWTH_STRATEGY.md`](../GROWTH_STRATEGY.md) 7章）。
- **Core Web Vitals**: チャート・広告まわりの LCP/CLS 監視（Vercel / PSI）。
- **内部リンク**: 新規記事追加時に `relatedLinks` と本文リンクを [`check-internal-links`](../scripts/check-internal-links.mjs) で確認。
- **ビジュアル確認**: [`VISUAL_REGRESSION_CHECKLIST.md`](./VISUAL_REGRESSION_CHECKLIST.md) をリリース前に実行。

---

## 長期・あえて深追いしない領域

- 審査・商品おすすめ・ランキング中心のクエリ（企業・アフィリとの競合が強い）— [`GROWTH_STRATEGY.md`](../GROWTH_STRATEGY.md) の方針どおり。

---

## このファイルの扱い

四半期ごと、または大きな機能リリースのたびに見直し、**完了した項目は上記「短期」から削除または「すでに土台」へ移動**すると迷いが減ります。
