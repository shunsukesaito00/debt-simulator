# タイポグラフィ・本文ラッパー（運用メモ）

## 方針

- **ページに太字は1段階だけ強く**：サイト名・ページの `h1` が最上位。セクション見出しは `font-semibold` 前後に揃える。
- **装飾目的の `<strong>` は使わない**。数値・警告・法的に重要な箇所のみ強調。
- **長文記事**：本文のブロックを可能な範囲で `.ds-blog-prose` で包み、見出し（`h2`/`h3`）のスタイルを `globals.css` に任せる。表・グラフだけ内側で `max-w-none` 等を併用可。

## クラス一覧（`app/globals.css`）

| クラス | 用途 |
|--------|------|
| `.ds-h1` | 一覧・固定ページの主見出し |
| `.ds-h2` | セクション見出し（semibold） |
| `.ds-label` | 補助ラベル（xs・medium・muted） |
| `.ds-blog-prose` | 長文を **そのまま** prose 化するとき（直下の `h2` に余白が付く） |
| `.ds-article-body` | **section 内に既に `h2` がある記事**のメインカラム（`ArticleProse`）。段落・リストの余白のみ |
| `.ds-link` | ナビ・カード内の目立たせたいリンク（medium） |
| `.ds-link-prose` | 記事本文内のリンク（下線は hover で強調） |
| `.ds-section-gap` | 記事末など連続ブロックの下余白 |

## 記事テンプレート

- **メイン本文カラム**: [`ArticleProse`](/app/components/article/ArticleProse.tsx)（クラス `.ds-article-body`）。見出しは各 `section` 内の `h2` を維持する構成向け。
- **冒頭ブロック**: [`ArticleStandardBlocks`](/app/components/article/ArticleStandardBlocks.tsx)（要約・シナリオ・チェック・関連）。詳細は [`docs/ARTICLE_CONTENT_TEMPLATE.md`](./ARTICLE_CONTENT_TEMPLATE.md)。
- 長文を **1 つの prose 流し**にしたい場合は `.ds-blog-prose` をそのまま使ってもよい（見出しは prose の子として統一）。

## 表・グラフ

表頭やチャートのラベルは **`font-semibold`** を上限にし、`font-black` は使わない（スキャンしやすさ優先）。
