# ピラー（親）とクラスター（子）の対応

[`docs/ROADMAP.md`](./ROADMAP.md) の内部リンク・コンテンツ方針に沿った、**ピラー／クラスター**の参照用ドキュメントです。

**目的**: 内部リンク・関連記事の追加・見直し時に、「各カテゴリの入口記事」と「条件別の子記事」の関係を一目で把握する。

**定義（運用上）**

- **ピラー**: 同一カテゴリで `order: 0` または `badge: おすすめ` が付いた記事（カテゴリの広い入口）。
- **クラスター**: 同じカテゴリのほかの記事（条件を絞った具体例・比較）。

データの正は [`lib/articles-data.ts`](../lib/articles-data.ts)。下表はスナップショットです。

## カテゴリ別

### fixed-cost（固定費見直し）

| 役割 | slug | タイトル（短縮） |
|------|------|------------------|
| ピラー | `fixed-cost-guide` | 固定費の見直しガイド（おすすめ） |
| クラスター例 | `fixed-cost-checklist`, `fixed-cost-mobile-comparison`, … | チェックリスト・通信比較等 |

### household（家計管理）

| 役割 | slug | タイトル（短縮） |
|------|------|------------------|
| ピラー | `household-budget-starter` | 家計のスターター |
| クラスター例 | `household-fixed-vs-variable`, `household-monthly-balance-check` | 固定/変動・収支チェック |

### improvement-effect（改善効果の試算）

| 役割 | slug | タイトル（短縮） |
|------|------|------------------|
| ピラー | `fixed-cost-5000-impact` | 月5,000円見直しの効果（おすすめ） |
| クラスター例 | `fixed-cost-10000-impact`, `fixed-cost-3000-impact` | 1万円・3千円の比較 |

### loan-amount（借入額別）

| 役割 | slug | タイトル（短縮） |
|------|------|------------------|
| ピラー | `loan-amount-guide` | 借入額別の返済負担の違い（おすすめ） |
| クラスター例 | `borrow-100-interest`, `borrow-200-monthly-payment`, `borrow-300-15percent-5years-total-interest`, … | 額・期間を絞った記事 |

### repayment-method（返済方式）

| 役割 | slug | タイトル（短縮） |
|------|------|------------------|
| ピラー | `repayment-method-difference` | 4方式の比較 |
| クラスター例 | `equal-principal-first-payment-higher`, `fixed-principal-payment-schedule`, … | 方式別の深掘り |

### repayment-improvement（返済改善）

| 役割 | slug | タイトル（短縮） |
|------|------|------------------|
| ピラー | `repayment-improvement-guide` | 返済を軽くする方法（おすすめ） |
| クラスター例 | `early-repayment-effect`, `repayment-term-longer-total-interest`, … | 繰上・期間・リスク |

### repayment-planning（逆算・返済計画）

| 役割 | slug | 備考 |
|------|------|------|
| 実質の入口（いずれも具体条件別） | `monthly-50000-how-much-can-borrow`, `monthly-30000-how-much-can-borrow`, `monthly-70000-how-much-can-borrow`, `fixed-monthly-payment-borrowing-reverse-calculator` | カテゴリ内に **`order: 0` の単独ピラーは未設定**。逆算クエリ別に入口が分かれている。 |
| クラスター | 上記以外の同カテゴリ記事 | `relatedLinks` で相互に繋ぐ |

新規追加時は、どれを「一覧・カテゴリページの最初に並べるか」は `articles-data` の登録順と `order` で調整可能。

### side-income（副業実験）

中身未整備のスタブ記事は削除済み。`articles-data` に該当カテゴリの記事が無いときは一覧では「準備中」表示。

### saving（節約）

同上（スタブ削除済み。再掲時は `articles-data` に追加）。

### story（体験記）

| 役割 | slug | タイトル（短縮） |
|------|------|------------------|
| ピラー | `investment-loss-family-trust` | 投資と家族の信頼（体験記バッジ） |
| クラスター例 | `story-debt-realization-awakening`, … | 各エピソード |

### revolving（リボ払い）

| 役割 | slug | 備考 |
|------|------|------|
| 入口記事例 | `revo-100-interest`, `revo-100man-15percent-simulation` | カテゴリ内に `order: 0` は未設定のため、検索・内部リンクで入口を分散。 |
| クラスター例 | `revo-100man-30k-years`, `revo-100man-50k-years`, … | 条件別の深掘り |

---

## 運用メモ

- 新規記事追加時は、同カテゴリの**ピラー／近接記事**へ `relatedLinks` を張る。
- ピラーを差し替える場合は **`order` / `badge`** と本ファイルの表を更新する。
- 同一カテゴリ内の並びは `getArticlesByCategory()` が **`order` 昇順**（未指定は後ろ）で一覧化される。
- フッターの「よく読まれている記事」は [`getPopularArticles()`](../lib/articles.ts) の手動キュレーション（トップと共通）。

## 関連URL

- カテゴリ独立URL: `/articles/category/[カテゴリキー]`（例: `/articles/category/loan-amount`）。シミュ・早見表への CTA は [`app/articles/category/[slug]/page.tsx`](../app/articles/category/[slug]/page.tsx)。
- 記事一覧アンカー: `/articles#loan-comparison` など（[`ARTICLE_LIST_SECTIONS`](../lib/article-types.ts)）

更新したら本ファイルの「スナップショット」も可能な範囲で追随してください。
