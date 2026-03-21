# People-first 記事テンプレート

新規記事を「AIの骨組み + 人間の一次情報追加」で運用するための構造と共通ブロックの説明です。既存記事は一気に置き換えず、新規・改訂時から段階的に取り入れます。

## 記事に必ず入れたいブロック

| ブロック | 役割 | 実装 |
|----------|------|------|
| **1. このページの前提** | 比較条件・条件を選んだ理由 | `ArticlePagePremise` |
| **2. 読み方のポイント** | どの数字を見るか・誤解しやすい点 | `ArticleReadingPoints` |
| **3. 編集メモ** | 何を判断してほしいか・比較軸の理由・独自メモ | `ArticleEditorMemo` |
| **4. シミュレーターCTA** | 自分の条件で試算する導線 | `ArticleFooter`（既存） |
| **5. 関連記事** | 条件別の関連リンク | `ArticleFooter`（既存・lib/articles の relatedLinks） |
| **6. 記事一覧への導線** | カテゴリ一覧・記事一覧へ戻る | `ArticleFooter`（既存） |

## ページシェル・幅（全記事共通）

- **`ArticlePageShell`**（`app/components/ArticlePageShell.tsx`）でラップする。パンくずは **ホーム → 悩み別に読む（記事一覧）→ 記事タイトル**（`lib/article-breadcrumb.ts` の `ARTICLES_INDEX_CRUMB_LABEL` と JSON-LD `getArticleBreadcrumbJsonLd` を揃える）。
- **幅**: 通常は `ds-article-shell`（本文は `max-w-prose` 相当）。**表・Recharts が主役**の記事は `wide={articleUsesWideLayout("your-slug")}` で `max-w-3xl`。slug の登録は **`lib/article-layout.ts`** の `WIDE_LAYOUT_SLUGS`。
- **見出し**: 記事タイトル（h1）やセクション見出し（h2）に **`ds-page-serif`** と **`font-bold`** を寄せると一覧ページとトーンが揃う（既存記事は段階的にで可）。

### タイポグラフィ（2025 モダンUI刷新）

- **UI・本文のベース**: `app/layout.tsx` の **Zen Kaku Gothic New**（`--font-ui-sans`）。ナビ・ボタン・フォーム・トップのリードはゴシック基調。
- **編集感のある見出し**: **Noto Serif JP**（`--font-heading-serif`）は **`.ds-page-serif`** と `.ds-blog-prose` 内 h2/h3 に限定して使う。
- **トークン**: 角丸・影・CTA 色は `app/globals.css` の `--ds-*` と `.ds-btn-primary`（緑系アクセント）に集約。新規コンポーネントは可能な限り `ds-*` を継承する。

## 推奨レイアウト順

1. パンくず（`ArticlePageShell` 内）
2. タイトル + 短いリード
3. **このページの前提**（目次の直後がわかりやすい）
4. 目次
5. 本文（結論 → 条件別の説明 → 注意点 → まとめ）
6. **読み方のポイント**（結論の前後や表の直後など）
7. **編集メモ**（本文の最後、フッターの直前）
8. **ArticleFooter**（シミュレーターCTA・関連記事・記事一覧へ）

## 人間が必ず埋める想定

- **前提**  
  - `comparisonConditions`: この記事で採用している条件（例: 年利15%、元利均等、3年・5年返済）  
  - （任意）`reasonForConditions`: その条件を選んだ理由  

- **読み方のポイント**  
  - `points`: 「どの数字を見るか」など、1項目ずつ `{ label, body }`  
  - （任意）`misconceptions`: 誤解しやすい点のリスト  

- **編集メモ**  
  - `purpose`: このページで読者に判断してほしいこと  
  - （任意）`reasonAxis`: この比較軸を採用した理由  
  - （任意）`memo`: 短い独自メモ  

- **本文**  
  - 結論・条件別の説明・注意点・まとめは従来どおり記事ごとに記述。  
  - 共通ブロックは「構造」だけ提供し、本文の自動生成は行わない。

## 新規記事での使い方

```tsx
import { ArticleFooter } from "@/app/components/ArticleFooter";
import { ArticlePageShell } from "@/app/components/ArticlePageShell";
import { articleUsesWideLayout } from "@/lib/article-layout";
import {
  ArticlePagePremise,
  ArticleReadingPoints,
  ArticleEditorMemo,
} from "@/app/components/article";

// 前提
const premise = {
  comparisonConditions: [
    "年利15%",
    "元利均等",
    "3年・5年・7年返済で比較",
  ],
  reasonForConditions: "多くのカードローンで目安にされやすい条件で比較しています。",
};

// 読み方のポイント
const readingPoints = {
  points: [
    { label: "見る数字", body: "借入額の目安と総利息。返済期間を延ばすと借入額は増えるが総利息も増える。" },
  ],
  misconceptions: ["「月3万ならいくらでも借りられる」と誤解しないよう、総支払額まで確認する。"],
};

// 編集メモ
const editorMemo = {
  purpose: "月3万円返済できる場合の借入額の目安を、返済期間別に選べるようにする。",
  reasonAxis: "返済可能額から逆算するニーズが高いため。",
  memo: "7年はリボに近い長期例として追加。",
};

export default function Page() {
  return (
    <ArticlePageShell currentPageTitle="記事タイトル" wide={articleUsesWideLayout("your-slug")}>
      <div className="ds-card ds-card-pad">
        {/* h1・目次・本文 ... */}
        <ArticlePagePremise {...premise} />
        <ArticleReadingPoints {...readingPoints} />
        <ArticleEditorMemo {...editorMemo} />
        <ArticleFooter articleSlug="your-slug" />
      </div>
    </ArticlePageShell>
  );
}
```

## 既存記事への段階導入

- 既存記事は **ArticleFooter のみ** のままでも問題なし。  
- 追加するときは、まず **前提** と **編集メモ** から入れると、意図の共有と今後の修正がしやすい。  
- **読み方のポイント** は、表や数値が多い記事から優先して入れると効果的。  
- 共通ブロックはすべて **任意配置**。1本だけ使うことも可能。

## ファイル構成

```
app/components/
├── ArticleFooter.tsx          # 既存（CTA・関連記事・一覧導線）
├── ArticlePageShell.tsx       # パンくず＋記事幅（ds-article-shell / wide）
└── article/
    ├── index.ts
    ├── types.ts               # ArticlePremise, ArticleReadingPoints, ArticleEditorMemo の型
    ├── ArticlePagePremise.tsx
    ├── ArticleReadingPoints.tsx
    └── ArticleEditorMemo.tsx
docs/
└── ARTICLE_TEMPLATE.md        # 本ドキュメント
```

## 型の参照

- `ArticlePremise`: `comparisonConditions`, `reasonForConditions?`
- `ArticleReadingPoints`: `points` (ReadingPoint[]), `misconceptions?`
- `ArticleEditorMemo`: `purpose`, `reasonAxis?`, `memo?`。コンポーネントの `show?: boolean` で非表示にできる。
