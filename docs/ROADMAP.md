# サイト今後のロードマップ

**目的**: コンテンツ・ツール・技術の優先順位と、コンテンツ／SEO の大方針を一箇所で把握する。**個別の運用ルール**は下表の各ドキュメントを参照。

| 参照ドキュメント | 内容 |
|------------------|------|
| [`docs/PRODUCT_BACKLOG.md`](./PRODUCT_BACKLOG.md) | プロダクト要望・リファクタのメモ |
| [`docs/TYPOGRAPHY.md`](./TYPOGRAPHY.md) | タイポ・アクセシビリティ・画像の運用 |
| [`docs/VISUAL_REGRESSION_CHECKLIST.md`](./VISUAL_REGRESSION_CHECKLIST.md) | リリース前の手動確認 URL |
| [`docs/CONTENT_SINGLE_SOURCE.md`](./CONTENT_SINGLE_SOURCE.md) | 記事メタ・カテゴリの「正」と取得関数の対応 |
| [`docs/PILLAR_AND_CLUSTER.md`](./PILLAR_AND_CLUSTER.md) | ピラー／クラスター記事の対応（運用メモ） |
| [`docs/DISCLAIMER_PATTERNS.md`](./DISCLAIMER_PATTERNS.md) | 試算・記事まわりの免責文のパターン集 |
| [`docs/ANALYTICS_MEASUREMENT.md`](./ANALYTICS_MEASUREMENT.md) | GA4・`TrackedLink` の計測 |

---

## コンテンツ・SEO の方針（要約）

- **勝ち方**: 検索では「条件＋比較・試算」を含む**具体クエリ**を狙う。シミュレーターと記事を往復できる構成を維持する。
- **深追いしない**: 審査・商品おすすめ・ランキング中心のクエリ（企業・アフィリエイトが強い領域）は優先しない。
- **記事追加**: **1記事1意図**で借入額・金利・期間などを明示。追加時は **`relatedLinks`**・シミュ導線・関連記事をセットで検討する。
- **継続**: Search Console の表示クエリ・**10位前後**のクエリ強化。クリック・導線の見方は [`ANALYTICS_MEASUREMENT.md`](./ANALYTICS_MEASUREMENT.md) を参照。

---

## すでに土台としてあるもの（維持・更新のみ）

- **シミュレーター**（4方式・A/B・CSV）と **記事メタの一元管理**（[`lib/articles.ts`](../lib/articles.ts)）
- **内部リンクチェック**（`npm run check-links`）と **CI**（[`.github/workflows/ci.yml`](../.github/workflows/ci.yml)）
- **記事内 Recharts**: `ChartsLazy` + `ssr: false` でビルド時警告を抑制（[`article-chart-dynamic.tsx`](../app/components/article/article-chart-dynamic.tsx)）
- **可読性トークン**（`ds-*`）、**`dateModified`** による JSON-LD / サイトマップ（任意フィールド）
- **計測**: GA4 `TrackedLink`（[`docs/ANALYTICS_MEASUREMENT.md`](./ANALYTICS_MEASUREMENT.md)）
- **Lint**: `npm run lint` は `eslint .`（[`eslint.config.mjs`](../eslint.config.mjs)）。CI で `check-links` → `build`。

---

## 短期（運用で続けること）

1. **コンテンツ**: 上記「コンテンツ・SEO の方針」に沿い、新しいクエリ向けに**条件明示の記事を追加**する場合は、シミュ・`relatedLinks`・関連記事導線をセットで。
2. **メタ運用**: 記事本文やタイトルを直したら、記事データ（[`lib/articles-data.ts`](../lib/articles-data.ts)）に **`dateModified`** を付与し、JSON-LD / サイトマップ / RSS の鮮度と揃える（詳細は [`PRODUCT_BACKLOG.md`](./PRODUCT_BACKLOG.md)）。

---

## 中期（プロダクト・情報設計）

1. **シミュレーター拡張**: ~~年収・返済負担率~~ **手取り月収（任意）と返済負担率（参考）をサマリー表示**（実装済み）。~~**無利息期間**~~ **先頭Nヶ月の利息を0とする簡易モデル**を [`lib/loan-calc.ts`](../lib/loan-calc.ts) とカードローンシミュに実装済み（免責・計算ロジックページに記載）。
2. **`lib/articles.ts` の分割**: ~~データ配列と取得ロジックのファイル分離~~ **実施済み**（[`lib/article-types.ts`](../lib/article-types.ts) / [`lib/articles-data.ts`](../lib/articles-data.ts) / [`lib/articles.ts`](../lib/articles.ts)）。
3. **構造化データの拡張**: **`/how-to` に HowTo**、**`/faq` に FAQPage ＋ BreadcrumbList**、**[`/qa/what-can-simulator-do`](../app/qa/what-can-simulator-do/page.tsx) に QAPage**（単一Q&A）を追加済み。それ以外の枠は必要に応じて個別に検討。

---

## 継続（サイクルで回す）

- **Search Console**: 表示クエリ・10位前後のクエリ強化（上記「コンテンツ・SEO の方針」）。
- **Core Web Vitals**: チャート・広告まわりの LCP/CLS 監視（Vercel / PSI）。
- **内部リンク**: 新規記事追加時に `relatedLinks` と本文リンクを [`check-internal-links`](../scripts/check-internal-links.mjs) で確認。
- **ビジュアル確認**: [`VISUAL_REGRESSION_CHECKLIST.md`](./VISUAL_REGRESSION_CHECKLIST.md) をリリース前に実行。

---

## 長期・あえて深追いしない領域

- 審査・商品おすすめ・ランキング中心のクエリ（企業・アフィリとの競合が強い）— 上記「コンテンツ・SEO の方針」どおり。

---

## このファイルの扱い

四半期ごと、または大きな機能リリースのたびに見直し、**完了した項目は上記「短期」から削除または「すでに土台」へ移動**すると迷いが減ります。
