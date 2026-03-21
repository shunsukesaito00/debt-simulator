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
