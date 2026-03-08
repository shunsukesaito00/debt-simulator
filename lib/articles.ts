/**
 * 記事メタデータの共通管理（知っておきたいこと）
 * 一覧ページ・ナビ・サイトマップ・記事末尾で参照。追加時はここに1件追加する。
 */

export const ARTICLE_CATEGORIES = [
  "loan-amount",
  "repayment-method",
  "revolving",
  "repayment-improvement",
  "repayment-planning",
] as const;

export type ArticleCategory = (typeof ARTICLE_CATEGORIES)[number];

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  "loan-amount": "借入額別",
  "repayment-method": "返済方式",
  revolving: "リボ払い",
  "repayment-improvement": "返済改善",
  "repayment-planning": "逆算・返済計画",
};

/** 各カテゴリの説明文（/articles のカテゴリ見出し直下に表示） */
export const CATEGORY_DESCRIPTIONS: Record<ArticleCategory, string> = {
  "loan-amount":
    "借入額が100万円、200万円、300万円と増えると、月々返済額・総利息・完済までの期間は大きく変わります。このカテゴリでは、借入額別の返済イメージを整理します。",
  "repayment-method":
    "元利均等・元金均等・定額元利・定額元金では、毎月返済額の推移や総利息が変わります。このカテゴリでは返済方式ごとの違いを比較します。",
  revolving:
    "リボ払いは毎月の返済額を一定にしやすい一方で、元本が減りにくく利息が重くなりやすい特徴があります。このカテゴリでは、リボ払いの負担を数値で整理します。",
  "repayment-improvement":
    "繰り上げ返済や追加返済、返済期間の見直しによって、総利息や完済時期は変わります。このカテゴリでは、返済を改善する考え方を解説します。",
  "repayment-planning":
    "毎月いくら返せるかを先に決めて、無理のない借入額や返済期間を考えるのが返済計画の基本です。このカテゴリでは、逆算の考え方を整理します。",
};

export type ArticleRelatedLink = { href: string; label: string };

export interface ArticleItem {
  slug: string;
  title: string;
  summary: string;
  category: ArticleCategory;
  badge?: string;
  order?: number;
  relatedLinks?: ArticleRelatedLink[];
}

const articlesData: ArticleItem[] = [
  {
    slug: "borrow-100-interest",
    title: "借金100万円の利息はいくら？年利15%での返済額をシミュレーション",
    summary:
      "借金100万円を年利15%で借りた場合の月々の返済額、総支払額、総利息を3年返済・5年返済で比較して解説します。実際の条件は返済シミュレーターで確認できます。",
    category: "loan-amount",
    relatedLinks: [
      { href: "/logic", label: "計算ロジックの詳細はこちら" },
      { href: "/faq", label: "よくある質問はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "borrow-200-monthly-payment",
    title: "借金200万円の月々返済はいくら？年利15%で3年・5年返済を比較",
    summary:
      "借金200万円を年利15%で借りた場合の月々返済額と総利息を比較し、返済期間ごとの違いをわかりやすく解説します。自分の条件は返済シミュレーターで試算できます。",
    category: "loan-amount",
    relatedLinks: [
      { href: "/logic", label: "計算ロジックの詳細はこちら" },
      { href: "/faq", label: "よくある質問はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "revo-100-interest",
    title: "リボ払い100万円の利息はいくら？完済までの総支払額をシミュレーション",
    summary:
      "リボ払いで100万円を利用した場合の利息、完済までの期間、総支払額を比較しながら、返済額による違いをわかりやすく解説します。",
    category: "revolving",
    relatedLinks: [
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を知りたい方はこちら" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "repayment-method-difference",
    title: "元利均等返済と元金均等返済の違いは？4つの返済方式を比較して解説",
    summary:
      "元利均等返済と元金均等返済の違いを中心に、定額元利・定額元金も含めた4つの返済方式の特徴や向いている人を比較して解説します。",
    category: "repayment-method",
    relatedLinks: [
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を知りたい方はこちら" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "early-repayment-effect",
    title: "繰り上げ返済の効果とは？利息はいくら減る？返済期間短縮との違いも解説",
    summary:
      "繰り上げ返済をすると何が変わるのかを、利息軽減、完済時期、毎月返済額の違いからわかりやすく解説します。",
    category: "repayment-improvement",
    relatedLinks: [
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を知りたい方はこちら" },
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "fixed-payment-principal-interest-cannot-payoff",
    title: "定額元利で完済できないのはなぜ？返済額が足りないケースをわかりやすく解説",
    summary:
      "定額元利返済で完済できないと言われる理由を、利息と返済額の関係から整理し、具体例・表・グラフでわかりやすく解説します。",
    category: "repayment-method",
    relatedLinks: [
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを知りたい方はこちら" },
      { href: "/articles/revo-100-interest", label: "リボ払いの利息を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "monthly-50000-how-much-can-borrow",
    title: "借金返済が月5万円ならいくらまで借りられる？返済額から逆算する目安を解説",
    summary:
      "毎月5万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
    category: "repayment-planning",
    relatedLinks: [
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を知りたい方はこちら" },
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "fixed-monthly-payment-borrowing-reverse-calculator",
    title: "月々返済額を固定すると借入額はいくら？返済額から逆算する考え方を解説",
    summary:
      "月々の返済額を固定した場合に、返済期間や金利によって借入額の目安がどう変わるかを、表とグラフでわかりやすく解説します。",
    category: "repayment-planning",
    badge: "新着",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを知りたい方はこちら" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "monthly-50000-interest-at-15percent",
    title: "借金返済が月5万円・金利15%なら総利息はいくら？借入額別に比較",
    summary:
      "毎月5万円返済・年利15%を前提に、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを表とグラフでわかりやすく解説します。",
    category: "loan-amount",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを知りたい方はこちら" },
      { href: "/articles/fixed-monthly-payment-borrowing-reverse-calculator", label: "月々返済額から借入額を逆算したい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "100man-100months-risk-at-15percent",
    title: "金利15%で100万円を100ヶ月返済するリスクとは？総利息と総支払額を解説",
    summary:
      "年利15%で100万円を100ヶ月かけて返済すると、毎月返済額は低く見えても総利息は大きく膨らみます。長期返済のリスクを表とグラフでわかりやすく解説します。",
    category: "repayment-improvement",
    relatedLinks: [
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息・返済額を知りたい方はこちら" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
  {
    slug: "revo-100man-15percent-simulation",
    title: "リボ払い100万円・金利15%の返済シミュレーション｜毎月返済額でどう変わる？",
    summary:
      "リボ払い100万円を年利15%で利用した場合、毎月3万円・5万円・7万円返済で完済までの期間、総支払額、総利息がどう変わるかを表とグラフでわかりやすく解説します。",
    category: "revolving",
    relatedLinks: [
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息を知りたい方はこちら" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターはこちら" },
    ],
  },
];

/** 記事一覧（従来互換・サイトマップ等で利用） */
export const articlesList = articlesData.map((a) => ({
  slug: a.slug,
  title: a.title,
  summary: a.summary,
  badge: a.badge,
}));

export type ArticleSlug = (typeof articlesList)[number]["slug"];

/** slug から記事を取得 */
export function getArticle(slug: string): ArticleItem | undefined {
  return articlesData.find((a) => a.slug === slug);
}

/** カテゴリ別に記事をグループ化（表示順はカテゴリ定義順・同一カテゴリ内は登録順） */
export function getArticlesByCategory(): Map<ArticleCategory, ArticleItem[]> {
  const map = new Map<ArticleCategory, ArticleItem[]>();
  for (const cat of ARTICLE_CATEGORIES) {
    const list = articlesData.filter((a) => a.category === cat);
    if (list.length > 0) map.set(cat, list);
  }
  return map;
}

/** シミュレーターページ下部に表示する関連記事の slug 一覧（3〜5件） */
const SIMULATOR_RELATED_SLUGS = [
  "borrow-100-interest",
  "repayment-method-difference",
  "early-repayment-effect",
  "fixed-payment-principal-interest-cannot-payoff",
  "revo-100man-15percent-simulation",
] as const;

/** シミュレーターページ用の関連記事リスト（タイトル・要約・href） */
export function getArticlesForSimulator(): ArticleItem[] {
  return SIMULATOR_RELATED_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ArticleItem => a != null
  );
}
