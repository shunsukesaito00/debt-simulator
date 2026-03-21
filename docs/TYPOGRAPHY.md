# タイポグラフィ・本文ラッパー（運用メモ）

## 方針

- **読み幅**: 固定ページのラッパーは **`.ds-page-width`**（`max-w-3xl`）。記事一覧・記事本文と揃え、`max-w-prose`（65ch）は使わない（左右の余白が目立ちやすいため）。
- **本文の字サイズ**: メインの段落・リストは原則 **`text-base`**。補助ラベル・パンくず・メタだけ `text-sm` / `text-xs` 可。
- **ページに太字は1段階だけ強く**：サイト名・ページの `h1` が最上位。セクション見出しは `font-semibold` 前後に揃える。
- **装飾目的の `<strong>` は使わない**。数値・警告・法的に重要な箇所のみ強調。
- **長文記事**：本文のブロックを可能な範囲で `.ds-blog-prose` で包み、見出し（`h2`/`h3`）のスタイルを `globals.css` に任せる。表・グラフだけ内側で `max-w-none` 等を併用可。

## クラス一覧（`app/globals.css`）

| クラス | 用途 |
|--------|------|
| `.ds-container` | サイト全体の横ラッパー（ヘッダ・フッタ・`main`）。`max-w-6xl`。本文の読み幅は `.ds-page-width` / `.ds-article-shell` 側で制限 |
| `.ds-recharts-wrap` | Recharts `ResponsiveContainer` の親に付与（`w-full min-h-0 min-w-0`）。flex 内の幅警告対策 |
| 記事チャート（`ChartsLazy.tsx`） | `next/dynamic` + `ssr: false`（[`article-chart-dynamic.tsx`](../app/components/article/article-chart-dynamic.tsx) の `clientOnlyChart`）。SSG 時の Recharts ログを避ける |
| `.ds-h1` | 一覧・固定ページの主見出し |
| `.ds-h2` | セクション見出し（semibold） |
| `.ds-label` | 補助ラベル（xs・medium・muted） |
| `.ds-blog-prose` | 長文を **そのまま** prose 化するとき（直下の `h2` に余白が付く）。幅は **`max-w-none`**（親の `ds-article-shell` 等で読み幅を決める） |
| `.ds-article-body` | **section 内に既に `h2` がある記事**のメインカラム（`ArticleProse`）。行間 1.85・色はやわらかめ（個人ブログ寄せ） |
| `.ds-link` | ナビ・カード内の目立たせたいリンク（medium） |
| `.ds-link-prose` | 記事本文内のリンク（下線は hover で強調） |
| `.ds-section-gap` | 記事末など連続ブロックの下余白 |
| `.ds-page-width` | 固定ページの本文カラム（`mx-auto max-w-3xl w-full min-w-0`） |
| `.ds-section-title` | セクション見出し（左罫＋セリフ）。トップ・一覧のブログ的区切りに使用 |
| `.ds-meta` | 日付・メタ行（等幅・小さめ）。本文には乱用しない |
| `.ds-surface-soft` | 全面カードより軽い面（半透明白＋柔らかい枠） |
| `.ds-btn-ghost` | 主CTAの隣の軽いボタン（枠なし〜ホバーで面） |

## 記事テンプレート

- **メイン本文カラム**: [`ArticleProse`](/app/components/article/ArticleProse.tsx)（クラス `.ds-article-body`）。見出しは各 `section` 内の `h2` を維持する構成向け。
- **冒頭ブロック**: [`ArticleStandardBlocks`](/app/components/article/ArticleStandardBlocks.tsx)（要約・シナリオ・チェック・関連）。詳細は [`docs/ARTICLE_CONTENT_TEMPLATE.md`](./ARTICLE_CONTENT_TEMPLATE.md)。
- 長文を **1 つの prose 流し**にしたい場合は `.ds-blog-prose` をそのまま使ってもよい（見出しは prose の子として統一）。

## 表・グラフ

表頭やチャートのラベルは **`font-semibold`** を上限にし、`font-black` は使わない（スキャンしやすさ優先）。

## アクセシビリティ・フォーカス

- グローバル: [`app/globals.css`](../app/globals.css) の `@layer base` で `a:focus-visible` / `button:focus-visible` にリングを定義。
- カスタム操作要素（`role="button"` の `div` 等）は `focus-visible:ring-*` を手動で付与する。

## 画像（記事に増やす場合）

- `next/image` を使い、**width / height**（または `fill` + 親の `aspect-*`）と **意味のある `alt`** を付ける。
- 装飾のみの画像は `alt=""` とし、本文と重複するキャプションは避ける。
