/**
 * 記事メタデータの共通管理（知っておきたいこと）
 * 一覧ページ・ナビ・サイトマップ・記事末尾で参照。追加時はここに1件追加する。
 *
 * サイト方針: 条件別・比較別・逆算別の返済シミュレーション情報ハブ。
 * 記事は一般論ではなく「この条件ならどうなるか」を具体値で整理する方針で統一する。
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

/**
 * 各カテゴリの説明文（/articles のカテゴリ見出し直下に表示）
 * 方針: 条件別・比較別・逆算別の返済シミュレーション辞典として一貫させる
 */
export const CATEGORY_DESCRIPTIONS: Record<ArticleCategory, string> = {
  "loan-amount":
    "借入額が変わると、毎月返済額・総利息・完済までの期間がどう変わるかを整理するカテゴリです。",
  "repayment-method":
    "元利均等、元金均等、定額元利、定額元金など、返し方の違いによる負担差を比較するカテゴリです。",
  revolving:
    "毎月返済額の設定によって、完済時期や利息がどう変わるかを確認するカテゴリです。",
  "repayment-improvement":
    "繰り上げ返済、返済期間、返済方式の見直しなど、返済負担を改善する方法を整理するカテゴリです。",
  "repayment-planning":
    "借入額から考えるのではなく、毎月いくら返せるかから無理のない条件を逆算するカテゴリです。",
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
    slug: "loan-amount-guide",
    title: "借入額別に見る返済負担の違い｜100万・200万・300万で比較",
    summary:
      "借入額100万円・200万円・300万円で、月々返済額、完済までの期間、総利息がどう変わるかをわかりやすく整理して解説します。",
    category: "loan-amount",
    order: 0,
    badge: "おすすめ",
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
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "borrow-300-monthly-payment",
    title: "借金300万円の月々返済はいくら？年利15%で3年・5年・7年返済を比較",
    summary:
      "借金300万円を年利15%で借りた場合の月々返済額・総利息・完済期間を、3年・5年・7年返済で比較して解説します。自分の条件は返済シミュレーターで試算できます。",
    category: "loan-amount",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "revo-100-interest",
    title: "リボ払い100万円の利息はいくら？完済までの総支払額をシミュレーション",
    summary:
      "リボ払いで100万円を利用した場合の利息、完済までの期間、総支払額を比較しながら、返済額による違いをわかりやすく解説します。",
    category: "revolving",
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
    relatedLinks: [
      { href: "/articles/fixed-monthly-payment-borrowing-reverse-calculator", label: "月々返済額から借入額を逆算する考え方を見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
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
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-50000-interest-at-15percent",
    title: "借金返済が月5万円・金利15%なら総利息はいくら？借入額別に比較",
    summary:
      "毎月5万円返済・年利15%を前提に、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを表とグラフでわかりやすく解説します。",
    category: "loan-amount",
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
    relatedLinks: [
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息を詳しく見る" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
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
