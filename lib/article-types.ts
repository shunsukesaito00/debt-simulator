/**
 * 記事メタの型・カテゴリ定義（`articles-data.ts` / `articles.ts` と共有）
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
    label: "固定費見直し",
    description:
      "通信・サブスク・保険など、毎月出ていく固定費を何から見直すかを整理した記事群です。",
    articleCategories: ["fixed-cost"],
  },
  {
    id: "household",
    label: "家計管理",
    description:
      "収支の把握や固定費・変動費の整理など、家計の土台を整えるための記事をまとめています。",
    articleCategories: ["household"],
  },
  {
    id: "improvement-effect",
    label: "改善効果の試算",
    description:
      "月数千円〜1万円の見直しで、1年・3年・5年にどれだけ差が出るかを比較する記事です。",
    articleCategories: ["improvement-effect"],
  },
  {
    id: "loan-comparison",
    label: "借入・リボ比較",
    description:
      "借入額や返済方式で、月々返済と総利息がどう変わるかを比較する記事をまとめています。",
    articleCategories: ["loan-amount", "repayment-method", "revolving"],
  },
  {
    id: "repayment-improvement",
    label: "返済改善",
    description:
      "繰り上げ返済や返済期間の見直しで、負担や完済時期がどう変わるかを整理した記事です。",
    articleCategories: ["repayment-improvement"],
  },
  {
    id: "repayment-planning",
    label: "返済計画",
    description:
      "毎月返せる額から、借入額や返済期間を逆算して考えるための記事をまとめています。",
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
export type ArticleRecommendationBand = "small" | "medium" | "large";
export type ArticleRateBand = "under-10" | "10-15" | "over-15";
export type ArticleRepaymentMethod = "equal_payment" | "equal_principal" | "fixed_payment" | "fixed_principal";

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
  /** 近い条件の記事推薦に使う最小メタ */
  recommendationContext?: {
    principalBand?: ArticleRecommendationBand;
    rateBand?: ArticleRateBand;
    monthlyPaymentBand?: ArticleRecommendationBand;
    methods?: ArticleRepaymentMethod[];
  };
}
