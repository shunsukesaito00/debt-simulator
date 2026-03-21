/**
 * 記事メタデータの共通管理（/articles 一覧・内部リンク用）
 * 一覧ページ・ナビ・サイトマップ・記事末尾で参照。追加時はここに1件追加する。
 *
 * サイト方針: 条件別・比較別・逆算別の返済シミュレーション情報ハブ。
 * 記事は一般論ではなく「この条件ならどうなるか」を具体値で整理する方針で統一する。
 */

export const ARTICLE_CATEGORIES = [
  "story",
  "side-income",
  "saving",
  "fixed-cost",
  "household",
  "improvement-effect",
  "loan-amount",
  "repayment-method",
  "revolving",
  "repayment-improvement",
  "repayment-planning",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  story: "体験記・返済日記",
  "side-income": "副業実験・収入改善",
  saving: "節約・生活改善",
  "fixed-cost": "固定費見直し",
  household: "家計管理",
  "improvement-effect": "改善効果の試算",
  "loan-amount": "借入額別",
  "repayment-method": "返済方式",
  revolving: "リボ払い",
  "repayment-improvement": "返済改善",
  "repayment-planning": "逆算・返済計画",
};

/**
 * 各カテゴリの説明文（/articles のカテゴリ見出し直下に表示）
 * 方針: 条件別・比較別・逆算別の返済シミュレーション辞典として一貫させる
 */
export const CATEGORY_DESCRIPTIONS: Record<ArticleCategory, string> = {
  story:
    "借金や返済に関する個人の体験記・日記。状況や試行錯誤の記録を置いています。",
  "side-income":
    "返済や家計改善のために取り組む副業・個人開発・販売記録をまとめるカテゴリです。月次の収益レポートと合わせて、実験の経過を確認できます。",
  saving:
    "食費・日用品・ポイントなど、暮らしの中での節約・工夫。固定費以外の変動費や生活のコツもここにまとめます。",
  "fixed-cost":
    "通信費・サブスク・保険など、毎月の固定負担を見直したい方のためのカテゴリ。何から手をつけるべきか、改善効果を比較できる記事を順次追加しています。",
  household:
    "家計簿が続かない、支出が見えないといった場面を、条件別の考え方で整理します。自分に合うやり方を選ぶときの参考にしてください。",
  "improvement-effect":
    "月5,000円・1万円の見直しで何がどう変わるか、具体条件で比較。数字で効果を確認できます。",
  "loan-amount":
    "借入額が変わると、毎月返済額・総利息・完済までの期間がどう変わるかを整理するカテゴリです。",
  "repayment-method":
    "元利均等、元金均等、定額元利、定額元金など、返し方の違いによる負担差を比較。",
  revolving:
    "毎月返済額の設定によって、完済時期や利息がどう変わるかを確認するカテゴリです。",
  "repayment-improvement":
    "繰り上げ返済、返済期間、返済方式の見直しなど、返済負担を改善する方法を整理。",
  "repayment-planning":
    "借入額からではなく、毎月いくら返せるかから無理のない条件を逆算するカテゴリです。",
};

/**
 * 記事一覧ページ（/articles）のセクション構成。
 * 生活改善・固定負担比較の入口として6セクションを表示する。
 * articleCategories が空のセクションは「準備中」表示になる。
 */
export type ArticleListSection = {
  id: string;
  label: string;
  description: string;
  articleCategories: ArticleCategory[];
};

export const ARTICLE_LIST_SECTIONS: ArticleListSection[] = [
  {
    id: "story",
    label: "体験記・返済日記",
    description:
      "借金に気づいたとき、家族に話したとき、返済計画を立てたとき——個人の体験記を読めるコーナーです。",
    articleCategories: ["story"],
  },
  {
    id: "side-income",
    label: "副業実験・収入改善",
    description:
      "返済や家計改善のために取り組む副業・個人開発・販売記録の読み物です。月次の定点観測は /income で確認できます。",
    articleCategories: ["side-income"],
  },
  {
    id: "saving",
    label: "節約・生活改善",
    description:
      "食費・ポイント・日用品など、暮らしの中での節約と工夫。固定費の記事とあわせて、支出の落としどころを探します。",
    articleCategories: ["saving"],
  },
  {
    id: "fixed-cost",
    label: "固定費をゆるく見直す",
    description:
      "通信・サブスク・保険など、「毎月ひっそり出ていくお金」が気になるときの入口です。無理なく手をつける順番と、削ったあとがイメージしやすい比較記事を集めています。",
    articleCategories: ["fixed-cost"],
  },
  {
    id: "household",
    label: "家計の見え方・体験記",
    description:
      "家計簿が続かない、収支がぼんやりする、といった悩みを、数字に強くなくても読める形で整理した記事です。体験記もここにまとめています。",
    articleCategories: ["household"],
  },
  {
    id: "improvement-effect",
    label: "少し削ったらどう変わる？",
    description:
      "月数千円〜1万円の見直しが、1年・3年・5年でどれくらい積み上がるかを比較する記事です。「小さくても続ける」のイメージづくりに。",
    articleCategories: ["improvement-effect"],
  },
  {
    id: "loan-comparison",
    label: "借入・リボの負担を比べる",
    description:
      "借入額や返済方式が変わると、月々と利息はどう動くか。リボ・カードローン・元利均等など、条件ごとの違いがつかみやすい記事を並べています。",
    articleCategories: ["loan-amount", "repayment-method", "revolving"],
  },
  {
    id: "repayment-improvement",
    label: "返済を軽くするヒント",
    description:
      "繰り上げ返済や期間の見直しで、負担や完済時期がどう変わるか。改善の選択肢を、具体例つきで読める記事です。",
    articleCategories: ["repayment-improvement"],
  },
  {
    id: "repayment-planning",
    label: "返せる額から考える",
    description:
      "「月いくらなら無理がないか」から借入額や期間の目安を考えたい方向け。逆算や固定返済額の考え方がわかる記事を集めています。",
    articleCategories: ["repayment-planning"],
  },
];

/** 記事カテゴリから記事一覧ページのセクション id へ（ArticleFooter のアンカー用） */
export function getArticleListSectionIdForCategory(cat: ArticleCategory): string {
  if (cat === "story") return "story";
  if (cat === "side-income") return "side-income";
  if (cat === "saving") return "saving";
  if (cat === "fixed-cost") return "fixed-cost";
  if (cat === "household") return "household";
  if (cat === "improvement-effect") return "improvement-effect";
  if (cat === "loan-amount" || cat === "repayment-method" || cat === "revolving") return "loan-comparison";
  if (cat === "repayment-improvement") return "repayment-improvement";
  return "repayment-planning";
}

/** カテゴリ独立ページ `/articles/category/[slug]` 用（URL は英字スラッグ） */
export const CATEGORY_URL_SLUGS: ArticleCategory[] = [...ARTICLE_CATEGORIES];

export function getCategoryFromUrlSlug(slug: string): ArticleCategory | undefined {
  return ARTICLE_CATEGORIES.includes(slug as ArticleCategory) ? (slug as ArticleCategory) : undefined;
}

export type ArticleRelatedLink = { href: string; label: string };

/** 体験記などコンテンツ種別（一覧の体験記レール・フィルタ用） */
export type ArticleKind = "story" | "guide";

export interface ArticleItem {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  badge?: string;
  order?: number;
  relatedLinks?: ArticleRelatedLink[];
  /** 体験記など */
  kind?: ArticleKind;
  /** 公開日（YYYY-MM-DD）。一覧の日付表示用 */
  publishedAt?: string;
  /** 更新日（YYYY-MM-DD）。JSON-LD・サイトマップ用 */
  dateModified?: string;
}

const articlesData: ArticleItem[] = [
  {
    slug: "fixed-cost-guide",
    title: "固定費見直しの進め方｜何から手をつけるか・改善効果の比較",
    summary:
      "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。記事とシミュレーターを往復して判断材料にしてください。",
    category: "fixed-cost",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles", label: "記事一覧で他のカテゴリも見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "fixed-cost-checklist",
    title: "固定費見直しチェックリスト｜何から削るか順番で解説",
    summary:
      "固定費を見直したい人向けに、何から手をつけるべきかを順番で整理したチェックリスト記事です。見直しやすさ・削減額・生活への影響の3軸で比較します。",
    category: "fixed-cost",
    order: 1,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月々返済額から借入額を逆算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-mobile-comparison",
    title: "スマホ料金プラン見直しの考え方｜格安プランに変えるとどれくらい変わる？",
    summary:
      "スマホ・通信費の見直しで、格安プランへの乗り換えやデータ量・オプションの見直しでどれくらい変わるかを整理します。固定費チェックリストの「通信費」を深掘りする記事です。",
    category: "fixed-cost",
    order: 2,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-subscription-audit",
    title: "サブスク整理の進め方｜見落としやすい月額課金を洗い出す方法",
    summary:
      "サブスク・月額課金を見直したい方向けに、見落としがちな契約の洗い出し方と、やめる・減らすときの判断のポイントを整理します。",
    category: "fixed-cost",
    order: 3,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-insurance-review",
    title: "保険見直しの考え方｜何を確認すべきか・削ってよいもの/ダメなもの",
    summary:
      "保険の見直しで確認すべきポイントと、削ってよい保障・慎重にすべき保障の考え方を整理します。重複保障や過剰保障の見直しの参考に。",
    category: "fixed-cost",
    order: 4,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-utility-switch",
    title: "電気・ガス乗り換えの効果は？契約見直しで月いくら変わるか",
    summary:
      "電気・ガスなどの光熱系契約を見直すと、月々の支払いがどれくらい変わる可能性があるかを整理します。乗り換えやプラン変更の判断材料に。",
    category: "fixed-cost",
    order: 5,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "household-budget-starter",
    title: "家計簿が続かない人のための最低限チェック｜記録せずに把握する方法",
    summary:
      "家計簿が続かない方向けに、記録せずに支出を把握する方法と、最低限チェックするポイントを整理します。",
    category: "household",
    order: 0,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/household-fixed-vs-variable", label: "固定費と変動費の分け方" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "household-fixed-vs-variable",
    title: "固定費と変動費の分け方｜何が固定費で何が変動費か",
    summary:
      "家計を把握するときの「固定費」と「変動費」の分け方と、それぞれ何を入れるかを整理します。",
    category: "household",
    order: 1,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/household-budget-starter", label: "家計簿が続かない人のための最低限チェック" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "household-monthly-balance-check",
    title: "月の収支をざっくり把握する方法｜手取りから逆算する考え方",
    summary:
      "家計簿をつけずに、月の収支をざっくり把握する方法と、手取りから逆算する考え方を整理します。",
    category: "household",
    order: 2,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/household-budget-starter", label: "家計簿が続かない人のための最低限チェック" },
      { href: "/articles/household-fixed-vs-variable", label: "固定費と変動費の分け方" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "investment-loss-family-trust",
    title:
      "投資で負けが膨らんだ私の体験｜取り返し、家族への信用、投資を止めたときまで",
    summary:
      "少しでも豊かになりたいと始めた投資が、現物株・信用・FXへとエスカレードし、家族に助けを求めるまでの体験記です。投資助言ではありません。",
    category: "story",
    order: 0,
    badge: "体験記",
    kind: "story",
    publishedAt: "2026-03-19",
    dateModified: "2026-03-19",
    relatedLinks: [
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクト計算" },
      { href: "/articles/repayment-improvement-guide", label: "返済の見直し・改善の考え方" },
      { href: "/about", label: "運営者情報" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-5000-impact",
    title: "固定費を月5,000円見直すとどう変わる？1年・3年・5年の改善効果を比較",
    summary:
      "月5,000円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理した記事です。固定費改善は月額ではなく継続で見るべきことを解説します。",
    category: "improvement-effect",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-10000-impact",
    title: "固定費を月1万円見直すとどう変わる？1年・3年・5年の改善効果を比較",
    summary:
      "月1万円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理した記事です。継続したときの累計効果を数字で確認できます。",
    category: "improvement-effect",
    order: 1,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-5000-impact", label: "月5,000円の効果比較を見る" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-3000-impact",
    title: "月3,000円の固定費見直しは意味がある？年間・3年・5年で検証",
    summary:
      "月3,000円の固定費見直しが年間・3年・5年でどれくらいの差になるかを具体的に整理した記事です。小さくても続ける効果を数字で確認できます。",
    category: "improvement-effect",
    order: 2,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-5000-impact", label: "月5,000円の効果比較を見る" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "loan-amount-guide",
    title: "借入額別に見る返済負担の違い｜100万・200万・300万で比較",
    summary:
      "借入額100万円・200万円・300万円で、月々返済額、完済までの期間、総利息がどう変わるかをわかりやすく整理して解説します。",
    category: "loan-amount",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を詳しく見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円での総利息を詳しく見る" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "返済額から借入額を逆算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "borrow-100-interest",
    title: "借金100万円の利息はいくら？年利15%での返済額をシミュレーション",
    summary:
      "借金100万円を年利15%で借りた場合の月々の返済額、総支払額、総利息を3年返済・5年返済で比較して解説します。実際の条件は返済シミュレーターで確認できます。",
    category: "loan-amount",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "borrow-200-monthly-payment",
    title: "借金200万円の月々返済はいくら？年利15%で3年・5年返済を比較",
    summary:
      "借金200万円を年利15%で借りた場合の月々返済額と総利息を比較し、返済期間ごとの違いをわかりやすく解説します。自分の条件は返済シミュレーターで試算できます。",
    category: "loan-amount",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "borrow-300-monthly-payment",
    title: "借金300万円の月々返済はいくら？年利15%で3年・5年・月5万円返済を比較",
    summary:
      "借入300万円を年利15%で返済する場合の月々返済額、総利息、完済までの期間を、3年返済・5年返済・月5万円返済の比較でわかりやすく解説します。",
    category: "loan-amount",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "返済額から借入額を逆算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "borrow-500-monthly-payment",
    title: "借金500万円の月々返済はいくら？年利15%で比較",
    summary:
      "借金500万円を年利15%で借りた場合、3年・5年・7年で月々の返済額と総利息がどう変わるかを整理します。",
    category: "loan-amount",
    order: 4,
    publishedAt: "2026-03-16",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別に見る返済負担の違い" },
      { href: "/articles/borrow-300-monthly-payment", label: "借金300万円の返済を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "revo-100-interest",
    title: "リボ払い100万円の利息はいくら？完済までの総支払額をシミュレーション",
    summary:
      "リボ払いで100万円を利用した場合の利息、完済までの期間、総支払額を比較しながら、返済額による違いをわかりやすく解説します。",
    category: "revolving",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/revo-100man-15percent-simulation", label: "リボ100万・金利15%の返済シミュレーションを見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "repayment-method-difference",
    title: "元利均等返済と元金均等返済の違いは？4つの返済方式を比較して解説",
    summary:
      "元利均等返済と元金均等返済の違いを中心に、定額元利・定額元金も含めた4つの返済方式の特徴や向いている人を比較して解説します。",
    category: "repayment-method",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "repayment-improvement-guide",
    title: "返済を軽くする方法｜繰り上げ返済・返済期間・返済方式の見直しを解説",
    summary:
      "返済を軽くする方法を、繰り上げ返済、返済期間、毎月返済額、返済方式の見直しという4つの視点から整理してわかりやすく解説します。",
    category: "repayment-improvement",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を詳しく見る" },
      { href: "/articles/100man-100months-risk-at-15percent", label: "長期返済のリスクを詳しく見る" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "early-repayment-effect",
    title: "繰り上げ返済の効果とは？利息はいくら減る？返済期間短縮との違いも解説",
    summary:
      "繰り上げ返済をすると何が変わるのかを、利息軽減、完済時期、毎月返済額の違いからわかりやすく解説します。",
    category: "repayment-improvement",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法を見る" },
      { href: "/articles/early-repayment-100k-effect", label: "繰り上げ返済10万円の効果を詳しく見る" },
      { href: "/articles/100man-100months-risk-at-15percent", label: "長期返済のリスクを詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "early-repayment-100k-effect",
    title: "繰り上げ返済10万円の効果は？利息はいくら減る？完済時期の違いも解説",
    summary:
      "10万円の繰り上げ返済で、総利息や完済時期がどれだけ変わるのかを、具体例・比較表・グラフでわかりやすく解説します。",
    category: "repayment-improvement",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を詳しく見る" },
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法を見る" },
      { href: "/articles/100man-100months-risk-at-15percent", label: "長期返済のリスクを見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円返済時の総利息を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "fixed-payment-principal-interest-cannot-payoff",
    title: "定額元利で完済できないのはなぜ？返済額が足りないケースをわかりやすく解説",
    summary:
      "定額元利返済で完済できないと言われる理由を、利息と返済額の関係から整理し、具体例・表・グラフでわかりやすく解説します。",
    category: "repayment-method",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを詳しく見る" },
      { href: "/articles/revo-100-interest", label: "リボ払いの利息を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-50000-how-much-can-borrow",
    title: "借金返済が月5万円ならいくらまで借りられる？返済額から逆算する目安を解説",
    summary:
      "毎月5万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
    category: "repayment-planning",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/fixed-monthly-payment-borrowing-reverse-calculator", label: "月々返済額から借入額を逆算する考え方を見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-30000-how-much-can-borrow",
    title: "月3万円返済ならいくらまで借りられる？年利15%で3年・5年・7年の目安を解説",
    summary:
      "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
    category: "repayment-planning",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを見る" },
      { href: "/articles/fixed-monthly-payment-borrowing-reverse-calculator", label: "返済額から借入額を逆算する考え方を見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-70000-how-much-can-borrow",
    title: "月7万円返済ならいくらまで借りられる？",
    summary:
      "月7万円の返済なら、年利15%でいくらまで借りられるかを3年・5年・7年で整理します。",
    category: "repayment-planning",
    order: 3,
    publishedAt: "2026-03-16",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられる？" },
      { href: "/articles/monthly-30000-how-much-can-borrow", label: "月3万円ならいくらまで借りられる？" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-monthly-payment-borrowing-reverse-calculator",
    title: "月々返済額を固定すると借入額はいくら？返済額から逆算する考え方を解説",
    summary:
      "月々の返済額を固定した場合に、返済期間や金利によって借入額の目安がどう変わるかを、表とグラフでわかりやすく解説します。",
    category: "repayment-planning",
    badge: "新着",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを知りたい方はこちら" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-50000-interest-at-15percent",
    title: "借金返済が月5万円・金利15%なら総利息はいくら？借入額別に比較",
    summary:
      "毎月5万円返済・年利15%を前提に、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを表とグラフでわかりやすく解説します。",
    category: "loan-amount",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を見る" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "100man-100months-risk-at-15percent",
    title: "金利15%で100万円を100ヶ月返済するリスクとは？総利息と総支払額を解説",
    summary:
      "年利15%で100万円を100ヶ月かけて返済すると、毎月返済額は低く見えても総利息は大きく膨らみます。長期返済のリスクを表とグラフでわかりやすく解説します。",
    category: "repayment-improvement",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法を見る" },
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を詳しく見る" },
      { href: "/articles/early-repayment-100k-effect", label: "繰り上げ返済10万円の効果を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "revo-100man-30k-years",
    title: "リボ払い100万円を月3万円で返すと何年かかる？完済までの期間と総利息を解説",
    summary:
      "リボ払い100万円を毎月3万円ずつ返済した場合、完済までの期間と総利息がどうなるかを年利15%の例でわかりやすく解説します。",
    category: "revolving",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/revo-100man-15percent-simulation", label: "リボ100万・金利15%の返済シミュレーションを見る" },
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息を詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "revo-100man-15percent-simulation",
    title: "リボ払い100万円・金利15%の返済シミュレーション｜毎月返済額でどう変わる？",
    summary:
      "リボ払い100万円を年利15%で利用した場合、毎月3万円・5万円・7万円返済で完済までの期間、総支払額、総利息がどう変わるかを表とグラフでわかりやすく解説します。",
    category: "revolving",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息を詳しく見る" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "revo-50man-simulation",
    title: "リボ払い50万円の返済シミュレーション｜毎月の返済額でどう変わる？",
    summary:
      "リボ払い50万円を年利15%で返済する場合、月1万・2万・3万円でどう変わるかを比較します。",
    category: "revolving",
    order: 4,
    publishedAt: "2026-03-16",
    relatedLinks: [
      { href: "/articles/revo-100man-15percent-simulation", label: "リボ100万円のシミュレーション" },
      { href: "/articles/revo-100-interest", label: "リボ100万円の利息" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  // --- 体験記・返済日記（追加） ---
  {
    slug: "story-debt-realization-awakening",
    title: "借金に気づいたときの話｜明細を見て初めて分かった金額",
    summary:
      "引き落としと明細を見て、借金の総額が自分の想像を超えていたときの話です。投資助言・借入勧誘をするものではありません。",
    category: "story",
    order: 1,
    publishedAt: "2025-06-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/investment-loss-family-trust", label: "投資で負けが膨らんだ体験記" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },
  {
    slug: "story-revolving-spiral",
    title: "リボ払いが膨らんだ経緯｜最低返済だけで積み上がる怖さ",
    summary:
      "最低返済だけで済ませていたところ、利息が積み上がり総額が伸びていった経緯を整理しました。個人の体験であり、契約条件は各社の説明を優先してください。",
    category: "story",
    order: 2,
    publishedAt: "2025-06-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息（記事）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/articles/story-debt-realization-awakening", label: "借金に気づいたときの話" },
    ],
  },
  {
    slug: "story-family-confession",
    title: "家族に借金を打ち明けたとき｜言葉にできなかったこと",
    summary:
      "家族に話すまでに迷ったこと、話したあとに楽になったこと、まだ残る罪悪感について。当事者の記録であり、一般論の正解は示しません。",
    category: "story",
    order: 3,
    publishedAt: "2025-07-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/investment-loss-family-trust", label: "投資で負けが膨らんだ体験記" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },
  {
    slug: "story-repayment-plan-started",
    title: "返済計画を立てたとき｜いくらから返せるかを先に決めた",
    summary:
      "手取りと生活費から「月に返せる額」を決めたうえで、どの借入から手をつけるかを考えた順番の記録です。",
    category: "story",
    order: 4,
    publishedAt: "2025-08-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法（記事）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
    ],
  },
  {
    slug: "story-side-hustle-first-month",
    title: "副業を始めた経緯と最初の1ヶ月｜収入より先に決めたこと",
    summary:
      "返済のために副業を始めるとき、最初に決めたのは「時間の上限」と「やらないこと」でした。副業の勧誘や案件紹介はしません。",
    category: "story",
    order: 5,
    publishedAt: "2025-09-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/side-income-debt-repayment-intro", label: "借金返済のために始めた副業と結果" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
    ],
  },
  {
    slug: "story-fixed-cost-audit",
    title: "固定費を見直した具体的な記録｜通信とサブスクから手をつけた",
    summary:
      "固定費の洗い出しで、通信・サブスク・保険の順に手をつけたときの記録。削減額はあくまで概算です。",
    category: "story",
    order: 6,
    publishedAt: "2025-10-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクト" },
    ],
  },
  {
    slug: "story-mental-health-while-repaying",
    title: "返済中のメンタルの保ち方｜自分を責めすぎないときの工夫",
    summary:
      "返済が続くと、不安がループしやすいと感じたときの対処。メンタルヘルスの専門的助言ではなく、個人の工夫の記録です。",
    category: "story",
    order: 7,
    publishedAt: "2025-11-01",
    kind: "story",
    relatedLinks: [
      { href: "/welcome", label: "はじめての方へ" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },
  {
    slug: "story-one-month-budget-diary",
    title: "節約生活の1ヶ月の家計簿｜何を減らしたかの記録",
    summary:
      "食費と外食を中心に、1ヶ月の支出の振り返りを記録しました。金額は個人の例です。",
    category: "story",
    order: 8,
    publishedAt: "2025-12-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
      { href: "/articles/household-monthly-balance-check", label: "月の収支をざっくり把握する方法" },
    ],
  },
  {
    slug: "story-wish-i-knew-then",
    title: "あのとき知りたかったこと｜借金を抱えたときに先に読みたかった順番",
    summary:
      "当事者として、後から振り返って「先に知りたかった」ことを整理した記事です。個人の経験に基づくものであり、すべての人に当てはまるとは限りません。",
    category: "story",
    order: 9,
    publishedAt: "2026-01-15",
    kind: "story",
    relatedLinks: [
      { href: "/welcome", label: "はじめての方へ" },
      { href: "/articles/loan-amount-guide", label: "借入額別に見る返済負担の違い" },
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法" },
    ],
  },
  // --- 副業・収入改善 ---
  {
    slug: "side-income-debt-repayment-intro",
    title: "借金返済のために始めた副業と結果｜最初の3ヶ月の記録",
    summary:
      "返済を優先するために副業を始めたときの動機と、最初の3ヶ月で起きたこと。案件紹介や勧誘はしません。",
    category: "side-income",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-06-15",
    relatedLinks: [
      { href: "/articles/story-side-hustle-first-month", label: "副業を始めた経緯と最初の1ヶ月（体験記）" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
    ],
  },
  {
    slug: "side-income-30000-month-journey",
    title: "副業で月3万円稼ぐまでにやったこと｜失敗と見直しのループ",
    summary:
      "月3万円を目安に、単価・時間・体調のバランスを調整した記録です。再現性を保証するものではありません。",
    category: "side-income",
    order: 1,
    publishedAt: "2025-07-15",
    relatedLinks: [
      { href: "/articles/side-income-debt-repayment-intro", label: "借金返済のために始めた副業と結果" },
      { href: "/articles/side-income-crowdsourcing-record", label: "クラウドソーシングで稼げるまでの記録" },
    ],
  },
  {
    slug: "side-income-employee-with-debt",
    title: "借金あり会社員の副業の選び方｜会社規程と時間の上限を先に確認する",
    summary:
      "会社の副業規程・競業の可能性・時間の上限を先に確認する理由を整理します。個人の判断材料であり、法律相談ではありません。",
    category: "side-income",
    order: 2,
    publishedAt: "2025-08-15",
    relatedLinks: [
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
    ],
  },
  {
    slug: "side-income-crowdsourcing-record",
    title: "クラウドソーシングで稼げるまでの記録｜初案件から単価の見直しまで",
    summary:
      "クラウドソーシングで初案件を取り、単価と納期の見直しをした経緯を記録します。プラットフォームの推奨はしません。",
    category: "side-income",
    order: 3,
    publishedAt: "2025-09-15",
    relatedLinks: [
      { href: "/articles/side-income-debt-repayment-intro", label: "借金返済のために始めた副業と結果" },
    ],
  },
  {
    slug: "side-income-frema-result",
    title: "フリマアプリで不用品を売った結果｜手取りと手間のバランス",
    summary:
      "不用品を売却したときの手取り・手間・発送の負担を振り返ります。サービスや商品の推奨はしません。",
    category: "side-income",
    order: 4,
    publishedAt: "2025-10-15",
    relatedLinks: [
      { href: "/articles/side-income-to-repayment-split", label: "副業収入を返済に回す配分の考え方" },
    ],
  },
  {
    slug: "side-income-tax-filing-notes",
    title: "副業の確定申告で気をつけたこと｜雑所得と経費の整理のメモ",
    summary:
      "税務の個別相談ではなく、当事者がメモを残したレベルの整理です。判断は税務署・税理士にご確認ください。",
    category: "side-income",
    order: 5,
    publishedAt: "2025-11-15",
    relatedLinks: [
      { href: "https://www.nta.go.jp/", label: "国税庁（外部）" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
    ],
  },
  {
    slug: "side-income-to-repayment-split",
    title: "副業収入を返済に回す配分の考え方｜生活費・貯金・緊急の優先順位",
    summary:
      "副業で入ったお金を、返済・生活費・少額の貯金にどう分けたかの考え方です。個人の例にすぎません。",
    category: "side-income",
    order: 6,
    publishedAt: "2025-12-15",
    relatedLinks: [
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法" },
    ],
  },
  // --- 節約・生活改善 ---
  {
    slug: "saving-food-budget-20000",
    title: "食費を月2万円に抑える工夫｜献立と買い物のルールを決めた",
    summary:
      "食費を抑えるために、献立・買い物の頻度・外食の回数にルールを決めた記録です。個人の生活スタイルに依存します。",
    category: "saving",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-20",
    relatedLinks: [
      { href: "/articles/saving-cook-vs-eat-out", label: "自炊 vs 外食のコスト比較" },
      { href: "/articles/household-fixed-vs-variable", label: "固定費と変動費の分け方" },
    ],
  },
  {
    slug: "saving-points-how-much-monthly",
    title: "ポイ活で月いくら浮くか｜還元率を過大評価しないためのメモ",
    summary:
      "ポイント還元を前提にしすぎないよう、月ごとの実績をメモした記事です。特定サービスの推奨はしません。",
    category: "saving",
    order: 1,
    publishedAt: "2025-04-10",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
    ],
  },
  {
    slug: "saving-100yen-store-tips",
    title: "100均活用の節約術｜日用品の置き換えで減らした買い物",
    summary:
      "日用品の一部を100円ショップで購入するなど、生活費の圧縮に役立った工夫を整理します。",
    category: "saving",
    order: 2,
    publishedAt: "2025-05-10",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
    ],
  },
  {
    slug: "saving-cook-vs-eat-out",
    title: "自炊 vs 外食のコスト比較｜時間単価まで含めるとどう見えるか",
    summary:
      "自炊と外食のコストを、材料費だけでなく時間も含めて比較する考え方を整理します。正解は人それぞれです。",
    category: "saving",
    order: 3,
    publishedAt: "2025-06-10",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
    ],
  },
  {
    slug: "saving-utility-monthly-trend",
    title: "光熱費の月別推移と節約記録｜エアコンとお湯の使い方を見直した",
    summary:
      "電気・ガスの請求を月別に見直し、季節要因と生活習慣の影響を整理した記録です。",
    category: "saving",
    order: 4,
    publishedAt: "2025-07-10",
    relatedLinks: [
      { href: "/articles/fixed-cost-utility-switch", label: "電気・ガス乗り換えの効果は？（記事）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
    ],
  },
];

/** 記事一覧（従来互換・サイトマップ等で利用） */
export const articlesList = articlesData.map((a) => ({
  slug: a.slug,
  title: a.title,
  summary: a.summary,
  badge: a.badge,
  publishedAt: a.publishedAt,
  dateModified: a.dateModified,
}));

/** サイトマップ・JSON-LD 用の最終更新日（なければ公開日） */
export function getArticleLastModifiedIso(a: ArticleItem): string | undefined {
  return a.dateModified ?? a.publishedAt;
}

/** サイト内検索用（slug / タイトル / 要約 / カテゴリ） */
export function getArticlesForSearch(): {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
}[] {
  return articlesData.map((a) => ({
    slug: a.slug,
    title: a.title,
    summary: a.summary,
    category: a.category,
  }));
}

export type ArticleSlug = (typeof articlesList)[number]["slug"];

/** slug から記事を取得 */
export function getArticle(slug: string): ArticleItem | undefined {
  return articlesData.find((a) => a.slug === slug);
}

/** トップページ「よくある悩みから探す」用。具体悩みに近い記事を表示優先順で返す（存在するもののみ） */
const FEATURED_PROBLEM_SLUGS: string[] = [
  "investment-loss-family-trust",
  "borrow-100-interest",
  "borrow-200-monthly-payment",
  "fixed-payment-principal-interest-cannot-payoff",
  "monthly-50000-interest-at-15percent",
  "early-repayment-100k-effect",
  "borrow-300-monthly-payment",
];

export function getFeaturedProblemArticles(): ArticleItem[] {
  return FEATURED_PROBLEM_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ArticleItem => a != null
  );
}

/** トップ「おすすめ・スポットライト」用（体験記を先頭に含む固定順） */
const HOME_SPOTLIGHT_SLUGS: string[] = [
  "investment-loss-family-trust",
  "borrow-100-interest",
  "fixed-cost-checklist",
  "borrow-200-monthly-payment",
  "early-repayment-100k-effect",
];

export function getHomeSpotlightArticles(): ArticleItem[] {
  return HOME_SPOTLIGHT_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ArticleItem => a != null
  );
}

/** はじめての方ページの「まず読む」順（記事スラッグ） */
const WELCOME_RECOMMENDED_ARTICLE_SLUGS: string[] = [
  "investment-loss-family-trust",
  "fixed-cost-checklist",
  "borrow-100-interest",
  "repayment-improvement-guide",
];

export function getWelcomeRecommendedArticles(): ArticleItem[] {
  return WELCOME_RECOMMENDED_ARTICLE_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ArticleItem => a != null
  );
}

/** トップ「よく読まれている」相当（アクセス解析なしの手動キュレーション） */
const POPULAR_ARTICLE_SLUGS: string[] = [
  "borrow-100-interest",
  "repayment-method-difference",
  "fixed-cost-checklist",
  "revo-100man-15percent-simulation",
  "investment-loss-family-trust",
];

export function getPopularArticles(): ArticleItem[] {
  return POPULAR_ARTICLE_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ArticleItem => a != null
  );
}

/** トップ「最近の記事」：publishedAt 降順（日付は各記事 JSON-LD と lib を同期済みであること） */
export function getRecentArticles(limit = 5): ArticleItem[] {
  return [...articlesData]
    .filter((a) => a.publishedAt)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))
    .slice(0, limit);
}

/** 同一カテゴリ内で publishedAt 順の前後記事を返す */
export function getAdjacentArticles(slug: string): { prev?: ArticleItem; next?: ArticleItem } {
  const article = getArticle(slug);
  if (!article) return {};
  const siblings = articlesData
    .filter((a) => a.category === article.category && a.publishedAt)
    .sort((a, b) => (a.publishedAt ?? "").localeCompare(b.publishedAt ?? ""));
  const idx = siblings.findIndex((a) => a.slug === slug);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? siblings[idx - 1] : undefined,
    next: idx < siblings.length - 1 ? siblings[idx + 1] : undefined,
  };
}

/** 体験記・ストーリー系（badge 体験記 または kind story） */
export function getStoryArticles(): ArticleItem[] {
  return articlesData.filter((a) => a.kind === "story" || a.badge === "体験記");
}

/** カテゴリ別に記事をグループ化（表示順はカテゴリ定義順・同一カテゴリ内は order 昇順→登録順） */
export function getArticlesByCategory(): Map<ArticleCategory, ArticleItem[]> {
  const map = new Map<ArticleCategory, ArticleItem[]>();
  for (const cat of ARTICLE_CATEGORIES) {
    const list = articlesData
      .filter((a) => a.category === cat)
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    if (list.length > 0) map.set(cat, list);
  }
  return map;
}

/** シミュレーターページ下部に表示する関連記事の slug 一覧（固定表示用） */
const SIMULATOR_RELATED_SLUGS = [
  "borrow-100-interest",
  "repayment-method-difference",
  "early-repayment-effect",
  "fixed-payment-principal-interest-cannot-payoff",
  "revo-100man-15percent-simulation",
] as const;

/** シミュレーターページ用の関連記事リスト（固定・条件連動でない場合のフォールバック） */
export function getArticlesForSimulator(): ArticleItem[] {
  return SIMULATOR_RELATED_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ArticleItem => a != null
  );
}

/** 条件連動でスコア対象にする記事の slug 一覧 */
const SIMULATOR_CANDIDATE_SLUGS = [
  "borrow-100-interest",
  "borrow-200-monthly-payment",
  "borrow-300-monthly-payment",
  "repayment-method-difference",
  "fixed-payment-principal-interest-cannot-payoff",
  "early-repayment-effect",
  "early-repayment-100k-effect",
  "revo-100-interest",
  "revo-100man-30k-years",
  "monthly-50000-how-much-can-borrow",
  "fixed-monthly-payment-borrowing-reverse-calculator",
  "monthly-50000-interest-at-15percent",
  "100man-100months-risk-at-15percent",
  "revo-100man-15percent-simulation",
  "repayment-improvement-guide",
] as const;

/** フォールバックで最低スコアを付与する記事（件数不足時用） */
const SIMULATOR_FALLBACK_SLUGS = [
  "repayment-method-difference",
  "borrow-100-interest",
  "early-repayment-effect",
  "revo-100-interest",
] as const;

/** シミュレーター入力条件（条件連動表示用） */
export interface SimulatorContext {
  principalMan: number;
  method: string;
  extraEnabled: boolean;
  years?: number;
  monthlyPayment?: number | null;
  monthlyPrincipal?: number | null;
}

const SCORE_METHOD = 5;
const SCORE_PRINCIPAL = 4;
const SCORE_EXTRA = 6; /* 追加返済ONのとき「次に読むべき」は繰り上げ記事を最優先 */
const SCORE_MONTHLY = 3;
const SCORE_FALLBACK = 1;

/** 条件に応じて記事ごとのスコアを計算（安定ソート用に slug の辞書順を二次キーに使う） */
function scoreArticlesForContext(ctx: SimulatorContext): Map<string, number> {
  const scores = new Map<string, number>();

  for (const slug of SIMULATOR_CANDIDATE_SLUGS) {
    scores.set(slug, 0);
  }

  const { principalMan, method, extraEnabled, monthlyPayment } = ctx;

  // A. 返済方式で優先
  if (method === "equal_payment" || method === "equal_principal") {
    scores.set("repayment-method-difference", (scores.get("repayment-method-difference") ?? 0) + SCORE_METHOD);
  }
  if (method === "fixed_payment") {
    scores.set("fixed-payment-principal-interest-cannot-payoff", (scores.get("fixed-payment-principal-interest-cannot-payoff") ?? 0) + SCORE_METHOD);
  }
  if (method === "fixed_principal") {
    scores.set("repayment-method-difference", (scores.get("repayment-method-difference") ?? 0) + SCORE_METHOD - 1);
    scores.set("fixed-payment-principal-interest-cannot-payoff", (scores.get("fixed-payment-principal-interest-cannot-payoff") ?? 0) + SCORE_METHOD - 1);
  }

  // B. 借入額で優先（定額元利のときは「100ヶ月リスク」より「完済できない理由」を優先するため 100man は加算しない）
  if (principalMan <= 120) {
    scores.set("borrow-100-interest", (scores.get("borrow-100-interest") ?? 0) + SCORE_PRINCIPAL);
    if (method !== "fixed_payment") {
      scores.set("100man-100months-risk-at-15percent", (scores.get("100man-100months-risk-at-15percent") ?? 0) + SCORE_PRINCIPAL);
    }
  } else if (principalMan <= 250) {
    scores.set("borrow-200-monthly-payment", (scores.get("borrow-200-monthly-payment") ?? 0) + SCORE_PRINCIPAL);
    scores.set("monthly-50000-interest-at-15percent", (scores.get("monthly-50000-interest-at-15percent") ?? 0) + SCORE_PRINCIPAL);
  } else {
    scores.set("borrow-300-monthly-payment", (scores.get("borrow-300-monthly-payment") ?? 0) + SCORE_PRINCIPAL);
    scores.set("monthly-50000-interest-at-15percent", (scores.get("monthly-50000-interest-at-15percent") ?? 0) + SCORE_PRINCIPAL);
    scores.set("monthly-50000-how-much-can-borrow", (scores.get("monthly-50000-how-much-can-borrow") ?? 0) + SCORE_PRINCIPAL);
  }

  // C. 追加返済ONで優先
  if (extraEnabled) {
    scores.set("early-repayment-effect", (scores.get("early-repayment-effect") ?? 0) + SCORE_EXTRA);
    scores.set("early-repayment-100k-effect", (scores.get("early-repayment-100k-effect") ?? 0) + SCORE_EXTRA);
  }

  // D. 毎月返済額で優先（定額元利のみ）
  if (method === "fixed_payment" && monthlyPayment != null) {
    if (monthlyPayment <= 30000) {
      scores.set("fixed-payment-principal-interest-cannot-payoff", (scores.get("fixed-payment-principal-interest-cannot-payoff") ?? 0) + SCORE_MONTHLY);
      scores.set("revo-100man-30k-years", (scores.get("revo-100man-30k-years") ?? 0) + SCORE_MONTHLY);
    }
    if (monthlyPayment >= 50000) {
      scores.set("monthly-50000-interest-at-15percent", (scores.get("monthly-50000-interest-at-15percent") ?? 0) + SCORE_MONTHLY);
    }
  }

  // E. フォールバック記事に最低スコア（常に何かしら出るように）
  for (const slug of SIMULATOR_FALLBACK_SLUGS) {
    scores.set(slug, (scores.get(slug) ?? 0) + SCORE_FALLBACK);
  }

  return scores;
}

/** 同点時の「次に読むべき順」の並び順（小さいほど先に表示） */
const NEXT_QUESTION_ORDER: Record<string, number> = {
  "repayment-method-difference": 1,
  "early-repayment-effect": 2,
  "early-repayment-100k-effect": 3,
  "borrow-100-interest": 4,
  "100man-100months-risk-at-15percent": 5,
  "revo-100-interest": 6,
  "revo-100man-30k-years": 7,
  "fixed-payment-principal-interest-cannot-payoff": 8,
  "borrow-200-monthly-payment": 9,
  "borrow-300-monthly-payment": 10,
  "monthly-50000-interest-at-15percent": 11,
  "monthly-50000-how-much-can-borrow": 12,
  "repayment-improvement-guide": 13,
};

/** 条件連動でシミュレーター下部に表示する記事を取得（最大4件・スコア降順・同点は次に読む順→slug昇順で安定） */
export function getArticlesForSimulatorContext(ctx: SimulatorContext): ArticleItem[] {
  const scores = scoreArticlesForContext(ctx);
  const slugsWithScore = SIMULATOR_CANDIDATE_SLUGS.map((slug) => ({
    slug,
    score: scores.get(slug) ?? 0,
    order: NEXT_QUESTION_ORDER[slug] ?? 999,
  }));
  slugsWithScore.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (a.order !== b.order) return a.order - b.order;
    return a.slug.localeCompare(b.slug);
  });
  const topSlugs = slugsWithScore.slice(0, 5).map((s) => s.slug);
  const items = topSlugs.map((slug) => getArticle(slug)).filter((a): a is ArticleItem => a != null);
  if (items.length === 0) {
    return SIMULATOR_FALLBACK_SLUGS.map((slug) => getArticle(slug)).filter((a): a is ArticleItem => a != null);
  }
  return items.slice(0, 5);
}

/** シミュレーター用「返済を改善したい方へ」ブロックに表示する記事（固定・最大3件・存在するもののみ） */
const REPAYMENT_IMPROVEMENT_SLUGS = [
  "early-repayment-effect",
  "repayment-improvement-guide",
  "fixed-payment-principal-interest-cannot-payoff",
  "repayment-method-difference",
] as const;

export function getArticlesForRepaymentImprovement(): ArticleItem[] {
  return REPAYMENT_IMPROVEMENT_SLUGS.map((slug) => getArticle(slug))
    .filter((a): a is ArticleItem => a != null)
    .slice(0, 3);
}
