# 記事コンテンツ・テンプレート（運用）

## 目的

- **読みやすさ**: 行間・`text-base`・区切りブロックで「文字の壁」を減らす。
- **情報量**: カテゴリ別の定型（要約・シナリオ・チェック・関連）で最低限の厚みを担保し、本文は必要に応じて追記する。
- **コンプライアンス**: 他サイトの**文章の転載はしない**。構成の参考・**リンクと1行要約**・**短い引用＋出典**に限定する。

## 共通コンポーネント（実装済み）

| コンポーネント | 用途 |
|----------------|------|
| [`ArticleProse`](/app/components/article/ArticleProse.tsx) | メイン本文カラム（`.ds-article-body`） |
| [`ArticleWideBlock`](/app/components/article/ArticleProse.tsx) | 表・グラフの幅広ブロック |
| [`ArticleStandardBlocks`](/app/components/article/ArticleStandardBlocks.tsx) | 冒頭: 要約・シナリオ・チェック・関連（`slug` で `lib/article-enhancements.ts` と連動） |
| [`ArticleKeyTakeaways`](/app/components/article/ArticleKeyTakeaways.tsx) | 単体利用可 |
| [`ArticleScenarioCallout`](/app/components/article/ArticleScenarioCallout.tsx) | 単体利用可 |
| [`ArticleChecklist`](/app/components/article/ArticleChecklist.tsx) | 単体利用可 |
| [`ArticleFurtherReading`](/app/components/article/ArticleFurtherReading.tsx) | 単体利用可 |

## カテゴリ別の最低限ブロック

デフォルト文案は [`lib/article-enhancements.ts`](/lib/article-enhancements.ts) の `CATEGORY_DEFAULTS`。記事ごとに上書きする場合は `ArticleStandardBlocks` の props（`takeaways` / `scenario` / `checklist`）を渡す。

| カテゴリ | 記事の重心 | 本文で足しやすい要素 |
|----------|------------|----------------------|
| `loan-amount` / `revolving` / `repayment-method` / `repayment-improvement` / `repayment-planning` | 試算・比較 | 前提条件・よくある誤解・試算の限界・ツールへの導線 |
| `fixed-cost` / `improvement-effect` | 固定費・小さな改善の積み上げ | 優先順位・契約確認の注意 |
| `household` | 家計の見え方 | 記録の粒度・固定費とのつなぎ |
| `side-income` / `saving` | 生活・副業・節約 | 税・規約・無理のない範囲 |
| `story` | 体験記 | 免責・一般化・感情と数字の両方 |

## ベンチマーク観察

[`docs/BENCHMARK_READABILITY.md`](./BENCHMARK_READABILITY.md) に URL とチェックリストを追記する。

## 禁止・注意

- 外部記事の**長文コピペ**、**画像の無断転載**は行わない。
- 公的機関・消費者庁等へのリンクは **正しい URL** を確認する。
- 体験談は**個人の範囲**で、他者の特定に繋がる情報は書かない。
