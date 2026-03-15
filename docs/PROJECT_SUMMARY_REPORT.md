# プロジェクト要約レポート（設計レビュー依頼用）

**注意**: 本プロジェクトは **iOS/Swift ではなく Next.js (React / TypeScript) の Web アプリ**です。設計レビュー依頼用に、iOS レポートのフォーマットを Web/React 向けに適応して記載しています。

---

## 2.1 プロジェクト概要

### アプリの目的
- **借入返済シミュレーター**: カードローン等の借入について、金利・返済方式・期間・追加返済を入力し、月々返済額・総利息・完済時期を試算・比較する Web ツール。
- 条件別の解説記事とシミュレーターを連動させ、「条件別・比較・逆算」で判断材料を提供する情報サイトとしての役割も持つ。

### 実装済みの主要機能
- シミュレーター: 4返済方式（元利均等・元金均等・定額元利・定額元金）、金利ステップ、追加返済（毎月・単発・ボーナス）、A/B 2案比較、返済表表示・CSV ダウンロード。
- 条件連動記事: シミュレーター入力に応じて「あわせて読みたい」「返済を改善したい方へ」の記事リストを表示。
- 記事: 17本以上の条件別記事（借入額別・返済方式・リボ・返済改善・逆算）、各記事からシミュレーター・関連記事への導線。
- トップ: Hero、主カード（シミュ/記事一覧）、よくある悩み、知っておきたいこと（カテゴリ）、補助導線。
- 早見表ページ: 100万・200万・300万・年利15%・3年/5年の月々返済・総利息の一覧。
- 分析: GA4 クリック計測（トップ・シミュ・記事導線）。入力値は送信せず、導線種別・記事 slug 等のみ送信。
- 静的基盤: サイトマップ、robots、canonical、構造化データ（Article 等）。

### 未実装・予定（ドキュメント・戦略から推測）
- 無利息期間のシミュレーション対応（要望レベル）。
- 年収・返済負担率の表示（要望レベル）。
- ロングテール記事の追加は継続方針（GROWTH_STRATEGY.md）。

### 中心価値（現時点の実装ベース）
- **計算ロジックが一箇所に集約**されたシミュレーター（4方式・追加返済・金利ステップ）と、**記事メタ・関連記事・条件連動表示が lib で一元管理**されている点。シミュと記事の連動（入力に応じたおすすめ記事）が差別化になっている。

---

## 2.2 ディレクトリ構成

```
debt-simulator/
├── app/
│   ├── layout.tsx              # ルートレイアウト（メタ、HeaderNav/FooterNav、GoogleAnalytics）
│   ├── page.tsx                 # トップ（Hero、主カード、悩み、カテゴリ、補助導線）
│   ├── globals.css
│   ├── sitemap.ts               # 静的＋記事URLのサイトマップ生成
│   ├── robots.ts
│   ├── components/
│   │   ├── HeaderNav.tsx         # 固定ヘッダナビ（クライアント）
│   │   ├── FooterNav.tsx
│   │   ├── ArticleFooter.tsx    # 記事末尾共通（シミュCTA・関連記事・記事一覧へ）
│   │   ├── SupplementPageFooter.tsx  # FAQ/Logic/HowTo 用フッター
│   │   ├── TrackedLink.tsx       # クリック計測付き Link（クライアント）
│   │   ├── GoogleAnalytics.tsx  # GA4 スクリプト注入（クライアント）
│   │   └── AdSlot.tsx           # 広告スロット（クライアント）
│   ├── simulator/
│   │   └── cardloan/
│   │       └── page.tsx         # シミュレーター本体（フォーム・結果・A/B・記事ブロック）※1ファイルで約1060行
│   ├── articles/
│   │   ├── page.tsx             # 記事一覧（カテゴリ別）
│   │   └── [各記事]/
│   │       ├── page.tsx         # 記事本文（多くは Server Component）
│   │       └── *Charts.tsx      # 記事専用グラフ（Recharts・クライアント）
│   ├── quick-reference/
│   │   └── page.tsx             # 早見表（100/200/300万・3年/5年）
│   ├── how-to/page.tsx          # 使い方
│   ├── logic/page.tsx           # 計算ロジック説明
│   ├── faq/page.tsx             # FAQ
│   ├── about/page.tsx           # 運営者情報
│   ├── contact/page.tsx         # お問い合わせ
│   ├── privacy/page.tsx         # プライバシーポリシー
│   └── disclaimer/page.tsx      # 免責
├── lib/
│   ├── loan-calc.ts             # 返済計算の唯一の実装（4方式・追加返済・金利ステップ）
│   ├── loan-calc.test.ts        # 上記の単体テスト
│   ├── articles.ts              # 記事メタ・カテゴリ・条件連動ロジック・一覧取得
│   └── analytics.ts             # GA4 trackEvent（型・送信のみ、保存なし）
├── package.json                 # next, react, recharts, tailwind, vitest
├── next.config.ts
├── tailwind.config.js
├── tsconfig.json
├── vitest.config.ts
└── GROWTH_STRATEGY.md           # コンテンツ・SEO 方針メモ
```

---

## 2.3 主要ファイル一覧と責務

| ファイル | 役割 | 主要な依存 | 懸念点 |
|----------|------|------------|--------|
| **app/layout.tsx** | ルートレイアウト、メタ、Header/Footer、GA | HeaderNav, FooterNav, GoogleAnalytics | 特になし |
| **app/page.tsx** | トップ（Hero、主カード、悩み、カテゴリ、補助） | lib/articles, TrackedLink, TrackEventParams | Server Component。MainCard と多数の TrackedLink でやや長い |
| **app/simulator/cardloan/page.tsx** | シミュレーター全体（フォーム・計算・表・グラフ・A/B・記事ブロック） | lib/articles, lib/loan-calc, lib/analytics | **約1060行で肥大化**。フォーム状態・結果表示・CSV・2つの記事ブロック・説明文が同一ファイルに集中 |
| **app/articles/page.tsx** | 記事一覧（カテゴリ別セクション） | lib/articles | 静的。懸念は小さい |
| **app/articles/[slug]/page.tsx** | 各記事本文 | ArticleFooter, 記事専用 Charts | 記事ごとに構造は似るが、本文はハードコード。Charts はクライアント |
| **app/quick-reference/page.tsx** | 早見表（100/200/300万・3年/5年） | lib/loan-calc | Server Component。calcLoan を固定条件で複数回呼び出し |
| **lib/loan-calc.ts** | 返済スケジュール計算の唯一の実装 | なし（純粋関数） | 責務は明確。4方式・追加返済・金利ステップ・完済不能検出を内包 |
| **lib/articles.ts** | 記事メタ配列・カテゴリ・条件連動スコア・取得 API | なし | **約485行**。記事データ＋getArticlesForSimulatorContext＋getArticlesForRepaymentImprovement 等。スコアロジックがやや複雑 |
| **lib/analytics.ts** | GA4 イベント送信（trackEvent） | なし（window.gtag） | クライアント専用。gtag 未定義時は no-op |
| **app/components/ArticleFooter.tsx** | 記事末尾のシミュ CTA・関連記事・記事一覧へ | lib/articles, TrackedLink | 記事 slug から relatedLinks を取得。Server Component から TrackedLink 使用 |
| **app/components/TrackedLink.tsx** | クリック時に trackEvent してから遷移する Link | lib/analytics | クライアントコンポーネント。責務は単一 |
| **app/components/GoogleAnalytics.tsx** | GA4 スクリプト読み込み | なし | NEXT_PUBLIC_GA_ID が無いときは何も描画しない |

- **エントリポイント**: Next.js のため明示的な App エントリはなく、`app/layout.tsx` が実質的なルート。
- **永続化層**: なし。ユーザー入力はクライアントの React state のみ。記事データは lib/articles の定数。

---

## 2.4 画面構成と遷移

| パス | 役割 | 遷移元 |
|------|------|--------|
| **/** | トップ。Hero、主カード（シミュ/記事一覧）、よくある悩み、知っておきたいこと、補助導線 | ヘッダ「トップ」、フッター |
| **/simulator/cardloan** | シミュレーター。入力フォーム、結果（サマリー・グラフ・返済表）、A/B比較、あわせて読みたい、返済を改善したい方へ | トップ主CTA、主カード、ヘッダ、記事内 CTA |
| **/articles** | 記事一覧（カテゴリ別）。早見表へのリンクあり | トップ、ヘッダ、シミュ内「記事一覧を見る」 |
| **/articles/[slug]** | 各記事本文。パンくず、目次、本文、ArticleFooter（シミュ CTA・関連・記事一覧へ） | 一覧、トップの悩み/カテゴリ、シミュ内記事リンク |
| **/quick-reference** | 早見表（100/200/300万・15%・3年/5年） | トップ、記事一覧 |
| **/how-to** | 使い方 | トップ副CTA、ヘッダ |
| **/logic** | 計算ロジック説明 | ヘッダ、シミュフッター |
| **/faq** | FAQ | ヘッダ、シミュフッター |
| **/about** | 運営者情報 | トップ補助、ヘッダ |
| **/contact** | お問い合わせ | トップ補助、ヘッダ |
| **/privacy** | プライバシーポリシー | トップ補助 |
| **/disclaimer** | 免責 | サイトマップのみ |

- タブ: なし。シミュレーター内で A/B の切り替え用タブ（A/B）と、追加返済の「毎月/単発/ボーナス」タブあり。
- モーダル/シート: なし。すべてページ遷移（Link）または同一ページ内アンカー。

---

## 2.5 データモデル一覧

| モデル（型名） | 主なプロパティ | 役割 | 利用箇所 | 永続化 |
|----------------|----------------|------|----------|--------|
| **CalcInput** | principal, startYear, startMonth, method, rateSteps, extraPayments, months / monthlyPayment / monthlyPrincipal | 計算の入力 | シミュレーター（toCalcInput）、早見表ページ | しない |
| **CalcResult** | ok, schedule, totalPayment, totalInterest, totalBonus, months, finalYear, finalMonth / error | 計算結果 | シミュレーター、早見表 | しない |
| **ScheduleRow** | year, month, annualRatePercent, payment, interest, principal, bonus, balance | 1行分の返済表 | loan-calc の返り値、シミュ表・CSV | しない |
| **RepaymentMethod** | equal_payment \| equal_principal \| fixed_payment \| fixed_principal | 返済方式 | loan-calc, シミュレーター | しない |
| **RateStep** | fromMonth, annualRatePercent | 金利の段階 | CalcInput, loan-calc | しない |
| **ExtraPayment** | type, amount, startYyyymm / yyyymm / month 等 | 追加返済イベント | loan-calc | しない |
| **ArticleItem** | slug, title, summary, category, badge, order, relatedLinks | 記事メタ | lib/articles, 一覧・フッター・シミュ連動 | ソースコード内の定数 |
| **ArticleCategory** | loan-amount \| repayment-method \| ... | 記事カテゴリ | lib/articles | 定数 |
| **SimulatorContext** | principalMan, method, extraEnabled, years, monthlyPayment, monthlyPrincipal | 条件連動用の「入力の要約」 | getArticlesForSimulatorContext | しない |
| **TrackEventParams** | action, location, target, link_type, label?, article_slug?, ... | GA4 イベントパラメータ | analytics, TrackedLink, 各ページ | 送信のみ（サーバーに保存しない） |

- 収入/支出/資産計画・目標・Forecast に相当するモデルはなし。借入返済の試算のみ。
- 設定は環境変数のみ（NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_SITE_URL, NEXT_PUBLIC_SHOW_ADS 等）。ユーザー設定の永続化はなし。

---

## 2.6 状態管理の流れ

- **Server Component が多い**: トップ、記事一覧、各記事本文、早見表、how-to, logic, faq, about, contact, privacy, disclaimer はほぼ Server Component。状態は持たず、props と lib の取得結果で描画。
- **クライアント状態が集中する箇所**: **app/simulator/cardloan/page.tsx** のみ。useState で formA/formB（A/B 2案）、activeTab（A/B 切替）、extraTab（毎月/単発/ボーナス）を保持。updateForm でフォームを更新し、toCalcInput → calcLoan で結果を useMemo し、同一ファイル内でサマリー・グラフ・表・CSV・記事ブロックを描画。
- **データ更新→UI**: シミュレーターでは「フォーム変更 → setForm → 再レンダー → toCalcInput(form) → calcLoan → result → 表示」の一方向。他画面は初回レンダーで確定。
- **状態の単一責任**: シミュレーターは「フォーム状態＋計算結果＋表示」が 1 ファイルに集約。責務は「シミュレーター画面」として一貫しているが、**ファイルが長く、関心が混在**している。
- **双方向依存**: なし。lib/articles は lib/loan-calc に依存しない。シミュレーターは lib に依存するが、lib は React に依存しない。
- **グローバル状態・Context**: なし。GA は window.gtag 経由で外部スクリプトに送るだけ。

---

## 2.7 計算ロジック一覧

| 場所 | 何を計算するか | 入力 | 出力 | UI への反映 | 懸念点 |
|------|----------------|------|------|--------------|--------|
| **lib/loan-calc.ts** | 月次返済スケジュール（4方式対応）。利息端数切捨て、追加返済の月次充当、定額元利の完済不能検出 | CalcInput | CalcResult（schedule, totalPayment, totalInterest, months 等） | シミュレーターのサマリー・グラフ・返済表・CSV、早見表の表 | 責務は明確でテストあり。ビジネスロジックの重複はほぼなし |
| **app/quick-reference/page.tsx** | 早見表用の月々返済額・総利息（固定条件で calcLoan を複数回呼び出し） | 固定: 100/200/300万、3年/5年、15%、元利均等 | 表の行データ | 同ページの table | 計算は lib に委譲。ページの責務は「表示」のみ |
| **lib/articles.ts** | 条件連動の「おすすめ記事」スコア。借入額・返済方式・追加返済 ON/OFF・毎月返済額で記事にスコアを付与しソート | SimulatorContext | ArticleItem[]（最大5件等） | シミュレーター内「あわせて読みたい」 | スコア定数（SCORE_METHOD 等）と分岐が多く、読み手には意図がやや追いづらい。テストは未確認 |

- 記事内の「比較表」用の数値: 記事ごとにハードコードまたは記事専用 Charts 内で計算している可能性あり。**loan-calc と重複していないか**は記事単位で要確認。
- シミュレーター内に計算式は書かれておらず、すべて `calcLoan(toCalcInput(form))` に委譲。計算ロジックの散在は少ない。

---

## 2.8 永続化・保存方式

- **サーバー側 DB / ファイル保存**: なし。Vercel 等へのデプロイを想定した静的〜SSR の構成。
- **クライアント**: フォーム入力・タブ選択は React state のみ。リロードで消える。localStorage / sessionStorage は未使用。
- **「保存」されているデータ**: 記事データ（lib/articles.ts の articlesData）とカテゴリ定義はソースコード内の定数。ビルド時に静的ページやサイトマップに反映される。
- **保存責務**: ユーザーデータの保存は行っていない。記事メタの追加・変更は lib/articles.ts の編集で完結。
- **スケール時の懸念**: 記事が大幅に増えると articlesData が長くなる。カテゴリ・関連記事の管理を CMS や Markdown に移す検討は未実装。

---

## 2.9 UI コンポーネント設計

- **共通コンポーネント**: HeaderNav, FooterNav, ArticleFooter, SupplementPageFooter（3種）, TrackedLink, GoogleAnalytics, AdSlot。いずれも責務は明確。
- **再利用**: 記事ページは ArticleFooter を共通利用。主カードはトップの MainCard（page.tsx 内のローカル関数）。シミュレーター内の SimulatorRelatedArticles / SimulatorRepaymentImprovementBlock は同一ファイル内の関数コンポーネントで、他では未使用。
- **似た UI の重複**: 記事ごとに page.tsx と *Charts.tsx のパターンが繰り返されている。目次・パンくず・構造化データの書き方が記事ごとに似ており、**テンプレート化やレイアウトコンポーネント**にすると変更が効きやすい。
- **デザイン**: Tailwind で統一。カラーは gray/emerald 等。デザインシステム（トークン・コンポーネントカタログ）は未整備だが、規模的には許容範囲。
- **Charts**: Recharts を使用。記事ごとに InterestCharts, Monthly50kCharts, EarlyRepayment100kCharts 等、**記事専用の Chart コンポーネントが複数**ある。共通の「返済比較棒グラフ」などに寄せられる余地あり。

---

## 2.10 現時点の問題点・技術的負債

- **シミュレーター 1 ファイルの肥大化（約1060行）**  
  フォーム UI、toCalcInput、結果表示、返済表、CSV、A/B 比較、2 種類の記事ブロック、逆算・繰上説明文がすべて同一ファイル。分割すると可読性・テストしやすさが向上する。

- **記事ページの構造の重複**  
  パンくず・目次・jsonLd・ArticleFooter のパターンが各記事で繰り返し。1 記事追加のコストが高く、メタや目次の変更が全記事に波及しうる。

- **lib/articles.ts の複合責務**  
  記事メタの定義＋カテゴリ一覧取得＋条件連動スコア計算＋「返済改善」固定リストが同居。スコアロジックはテストされていない可能性が高く、仕様変更時のリスクがある。

- **記事データのハードコード**  
  新規記事追加時に lib/articles と app/articles/[slug]/page.tsx（および必要なら Charts）の両方の追加が必要。slug とディレクトリの不整合が起きやすい。

- **early-repayment-100k-effect のビルドエラー**  
  過去に `comparisonTableRows.map is not a function` が報告されている。EarlyRepayment100kCharts の export 形状またはデータ型の不整合の可能性。

- **命名・配置のゆらぎ**  
  「知っておきたいこと」が記事一覧のタイトルで、URL は /articles。ナビと URL の対応は一貫しているが、初見では「articles」と「知っておきたいこと」の対応が分かりにくい可能性。

- **計算ロジックのテスト**  
  loan-calc には vitest あり。articles のスコアロジックや、記事内で行っている計算の単体テストは未確認。

- **App Store 審査**  
  Web アプリのため App Store 審査は不要。広告（AdSlot）は NEXT_PUBLIC_SHOW_ADS でオフにできる。

---

## 2.11 今後の改善優先順位

- **Phase 1（早めに対応したい）**  
  - シミュレーターの分割: フォーム・結果表示・返済表・CSV・記事ブロックを別コンポーネントまたはモジュールに分離。  
  - early-repayment-100k-effect のビルドエラー解消（comparisonTableRows の型/export 確認）。

- **Phase 2（次の機能追加前に整理したい）**  
  - 記事ページの共通レイアウトまたはテンプレートの導入（パンくず・目次・jsonLd・Footer を共通化）。  
  - lib/articles のスコアロジックのテスト追加と、必要なら「記事推薦」部分の切り出し。  
  - 新規記事追加フローをドキュメント化（lib の追加＋page.tsx の作成＋sitemap は articlesList から自動）。

- **Phase 3（スケールを見据えて）**  
  - 記事を Markdown や CMS から生成する構成の検討。  
  - チャートの共通化（例: 返済比較用の共通コンポーネント）。  
  - デザイントークンやコンポーネント一覧の整備。

---

## 2.12 外部レビュー依頼用まとめ

### 強み
- 返済計算が **lib/loan-calc.ts に集約**されており、4方式・追加返済・金利ステップが一貫したループで処理されている。
- 記事メタ・カテゴリ・条件連動が **lib/articles.ts で一元管理**され、シミュと記事の連動が実現している。
- トップ・シミュ・記事の導線がはっきりしており、GA4 でクリック計測も導入済み。
- 入力値はサーバーに送信せず、プライバシー配慮が明記されている。

### 不安点
- シミュレーター 1 ファイルに責務が集中しており、修正・テストのコストが増えやすい。
- 記事追加が「lib の編集＋新規 page/Charts」に依存しており、ミスや抜けが起きやすい。
- 条件連動のスコアロジックが複雑で、仕様変更時の影響範囲が読みにくい。

### 特にレビューしてほしいポイント TOP5
1. **app/simulator/cardloan/page.tsx** の分割案（フォーム／結果／表／CSV／記事ブロックの責務分離とファイル分割）。
2. **lib/articles.ts** の条件連動スコア（scoreArticlesForContext）の可読性・テスト容易性・仕様の妥当性。
3. 記事ページ群の共通化（レイアウト or テンプレート）で、追加コストと一貫性を両立する方法。
4. **lib/loan-calc.ts** の端数処理・定額元利の「完済不能」判定が、実務の期待と一致しているかの観点。
5. 新規記事の追加・修正フローを、ミスなく回すためのディレクトリ・命名・チェックリストの提案。

### 添付すると有効なファイル候補
- lib/loan-calc.ts（計算の根幹）
- lib/articles.ts（記事と条件連動の根幹）
- app/simulator/cardloan/page.tsx（肥大化している画面）
- app/page.tsx（トップの構成）
- app/articles/early-repayment-100k-effect/page.tsx と EarlyRepayment100kCharts.tsx（ビルドエラー関連）

---

## 3.1 変更頻度が高そうなファイル

| ファイル | 理由 |
|----------|------|
| **lib/articles.ts** | 新規記事追加・relatedLinks 変更・条件連動スコアの調整が頻繁に発生しうる。 |
| **app/simulator/cardloan/page.tsx** | シミュの UI 変更・文言・新オプション（逆算説明、繰上説明等）の追加が集中する。 |
| **app/page.tsx** | トップの訴求文・導線・イベントパラメータの変更が入りやすい。 |
| **app/articles/[各記事]/page.tsx** | 記事追加・修正のたびに該当ディレクトリが触られる。 |
| **app/components/ArticleFooter.tsx** | 記事フッターの仕様変更時。現状は slug ベースで安定。 |

---

## 3.2 レビューに出すと特に有効なファイル候補

| 優先度 | ファイル | 理由 | 見てほしい点 |
|--------|----------|------|----------------|
| 1 | **lib/loan-calc.ts** | 計算の唯一の実装。バグが全画面に影響する。 | 端数・金利ステップ・定額元利の完済不能判定・追加返済の月次充当が正しいか。 |
| 2 | **app/simulator/cardloan/page.tsx** | 最も長く、責務が混在している。 | 分割案、状態の持ち方、toCalcInput の置き場所。 |
| 3 | **lib/articles.ts** | 記事と条件連動の要。 | スコアロジックの可読性、テスト方針、記事データとロジックの分離の可否。 |
| 4 | **app/page.tsx** | トップの情報設計と導線。 | セクション構成、TrackedLink の使い方、MainCard の共通化の余地。 |
| 5 | **app/articles/early-repayment-100k-effect/page.tsx** および **EarlyRepayment100kCharts.tsx** | ビルドエラーが報告されている。 | comparisonTableRows の型と export、Chart に渡すデータ形状。 |
| 6 | **app/components/ArticleFooter.tsx** | 記事末尾の共通 UI。 | 関連記事・シミュ CTA の導線、TrackedLink との組み合わせ。 |
| 7 | **app/quick-reference/page.tsx** | 早見表。 | calcLoan の呼び出し方、表の責務、メタの妥当性。 |
| 8 | **lib/analytics.ts** | 計測の入口。 | 送信パラメータの設計、個人情報が含まれないことの確認。 |
| 9 | **app/layout.tsx** | ルートレイアウト。 | メタ、スクリプト、ナビの配置。 |
| 10 | **app/articles/page.tsx** | 記事一覧。 | カテゴリ表示、早見表リンク、一覧とシミュの導線。 |

---

## 3.3 外部レビュー依頼テンプレート

以下をそのまま ChatGPT 等に渡して使えます。

---

**依頼目的**  
Next.js で構築した「借入返済シミュレーター」サイトの設計レビューをお願いします。シミュレーターと条件別記事の連動が中核で、計算ロジックは lib/loan-calc.ts、記事メタと条件連動は lib/articles.ts に集約しています。

**現状の悩み**  
- シミュレーター画面が 1 ファイルで約 1060 行あり、フォーム・計算・表示・CSV・記事ブロックがすべて同じファイルにあり、分割方法を検討したい。  
- 記事追加のたびに lib/articles.ts と app/articles/[slug]/page.tsx（と必要なら Charts）の両方を触るため、抜けや不整合を防ぎたい。  
- 条件連動の「おすすめ記事」スコア（lib/articles.ts 内）が複雑で、テストや仕様変更時の影響を把握しづらい。

**特に見てほしい点**  
1. シミュレーター画面のコンポーネント分割と状態の持ち方の提案。  
2. 記事メタ・条件連動ロジックの分離やテストしやすい形への整理案。  
3. 記事ページの共通レイアウト化で、追加コストを抑えつつ一貫性を保つ方法。  
4. 返済計算（lib/loan-calc.ts）の端数・完済不能判定が実務と整合しているかの観点。  
5. 新規記事を安全に追加するためのディレクトリ・命名・チェックリストの提案。

添付する場合は、上記「3.2 レビューに出すと特に有効なファイル候補」の 1〜5 のファイルのコードを優先して貼ると効果的です。
