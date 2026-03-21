/**
 * 記事メタデータの共通管理（/articles 一覧・内部リンク用）
 * 一覧ページ・ナビ・サイトマップ・記事末尾で参照。
 *
 * - 型・カテゴリ定義: `article-types.ts`
 * - 記事データ配列: `articles-data.ts`（追加時は主にここ）
 *
 * サイト方針: 条件別・比較別・逆算別の返済シミュレーション情報ハブ。
 * 記事は一般論ではなく「この条件ならどうなるか」を具体値で整理する方針で統一する。
 */

export * from "./article-types";

import { articlesData } from "./articles-data";
import { ARTICLE_CATEGORIES, type ArticleCategory, type ArticleItem } from "./article-types";

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
  "borrow-200-15percent-5years-total-interest",
  "borrow-300-monthly-payment",
  "borrow-300-15percent-5years-total-interest",
  "repayment-method-difference",
  "equal-principal-first-payment-higher",
  "fixed-principal-payment-schedule",
  "fixed-payment-principal-interest-cannot-payoff",
  "early-repayment-effect",
  "early-repayment-100k-effect",
  "revo-100-interest",
  "revo-100man-30k-years",
  "revo-100man-50k-years",
  "monthly-50000-how-much-can-borrow",
  "fixed-monthly-payment-borrowing-reverse-calculator",
  "monthly-50000-interest-at-15percent",
  "100man-100months-risk-at-15percent",
  "revo-100man-15percent-simulation",
  "repayment-improvement-guide",
  "repayment-term-longer-total-interest",
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

  const { principalMan, method, extraEnabled, monthlyPayment, years } = ctx;

  // A. 返済方式で優先
  if (method === "equal_payment" || method === "equal_principal") {
    scores.set("repayment-method-difference", (scores.get("repayment-method-difference") ?? 0) + SCORE_METHOD);
  }
  if (method === "equal_principal") {
    scores.set(
      "equal-principal-first-payment-higher",
      (scores.get("equal-principal-first-payment-higher") ?? 0) + SCORE_METHOD,
    );
  }
  if (method === "fixed_payment") {
    scores.set("fixed-payment-principal-interest-cannot-payoff", (scores.get("fixed-payment-principal-interest-cannot-payoff") ?? 0) + SCORE_METHOD);
  }
  if (method === "fixed_principal") {
    scores.set("repayment-method-difference", (scores.get("repayment-method-difference") ?? 0) + SCORE_METHOD - 1);
    scores.set("fixed-payment-principal-interest-cannot-payoff", (scores.get("fixed-payment-principal-interest-cannot-payoff") ?? 0) + SCORE_METHOD - 1);
    scores.set(
      "fixed-principal-payment-schedule",
      (scores.get("fixed-principal-payment-schedule") ?? 0) + SCORE_METHOD,
    );
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

  // D. 返済期間が長いとき「期間と総利息」の記事を優先（元利均等・元金均等のみ）
  if (
    years != null &&
    years >= 7 &&
    (method === "equal_payment" || method === "equal_principal")
  ) {
    scores.set(
      "repayment-term-longer-total-interest",
      (scores.get("repayment-term-longer-total-interest") ?? 0) + SCORE_MONTHLY,
    );
  }

  // D2. 300万円・4〜6年・元利/元金均等のとき「300万・15%・5年・総利息」記事を優先
  if (
    principalMan >= 250 &&
    years != null &&
    years >= 4 &&
    years <= 6 &&
    (method === "equal_payment" || method === "equal_principal")
  ) {
    scores.set(
      "borrow-300-15percent-5years-total-interest",
      (scores.get("borrow-300-15percent-5years-total-interest") ?? 0) + SCORE_MONTHLY,
    );
  }

  // D3. 200万円前後（120〜249万）・4〜6年・元利/元金均等のとき「200万・15%・5年・総利息」記事を優先
  if (
    principalMan >= 120 &&
    principalMan <= 249 &&
    years != null &&
    years >= 4 &&
    years <= 6 &&
    (method === "equal_payment" || method === "equal_principal")
  ) {
    scores.set(
      "borrow-200-15percent-5years-total-interest",
      (scores.get("borrow-200-15percent-5years-total-interest") ?? 0) + SCORE_MONTHLY,
    );
  }

  // E. 毎月返済額で優先（定額元利のみ）
  if (method === "fixed_payment" && monthlyPayment != null) {
    if (monthlyPayment <= 30000) {
      scores.set("fixed-payment-principal-interest-cannot-payoff", (scores.get("fixed-payment-principal-interest-cannot-payoff") ?? 0) + SCORE_MONTHLY);
      scores.set("revo-100man-30k-years", (scores.get("revo-100man-30k-years") ?? 0) + SCORE_MONTHLY);
    }
    if (monthlyPayment >= 40000 && monthlyPayment <= 60000) {
      scores.set("revo-100man-50k-years", (scores.get("revo-100man-50k-years") ?? 0) + SCORE_MONTHLY);
    }
    if (monthlyPayment >= 50000) {
      scores.set("monthly-50000-interest-at-15percent", (scores.get("monthly-50000-interest-at-15percent") ?? 0) + SCORE_MONTHLY);
    }
  }

  // F. フォールバック記事に最低スコア（常に何かしら出るように）
  for (const slug of SIMULATOR_FALLBACK_SLUGS) {
    scores.set(slug, (scores.get(slug) ?? 0) + SCORE_FALLBACK);
  }

  return scores;
}

/** 同点時の「次に読むべき順」の並び順（小さいほど先に表示） */
const NEXT_QUESTION_ORDER: Record<string, number> = {
  "repayment-method-difference": 1,
  "equal-principal-first-payment-higher": 2,
  "fixed-principal-payment-schedule": 3,
  "early-repayment-effect": 4,
  "early-repayment-100k-effect": 5,
  "borrow-100-interest": 6,
  "100man-100months-risk-at-15percent": 7,
  "revo-100-interest": 8,
  "revo-100man-30k-years": 9,
  "revo-100man-50k-years": 10,
  "fixed-payment-principal-interest-cannot-payoff": 11,
  "borrow-200-monthly-payment": 12,
  "borrow-300-monthly-payment": 13,
  "monthly-50000-interest-at-15percent": 14,
  "monthly-50000-how-much-can-borrow": 15,
  "repayment-improvement-guide": 16,
  "repayment-term-longer-total-interest": 17,
  "borrow-300-15percent-5years-total-interest": 18,
  "borrow-200-15percent-5years-total-interest": 19,
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
