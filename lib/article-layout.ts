/**
 * 表・Recharts など横幅が必要な記事は `ArticlePageShell` の `wide` で max-w-4xl。
 * テキスト中心は `.ds-article-shell`（max-w-3xl）で統一。
 */
const WIDE_LAYOUT_SLUGS = new Set<string>([
  "borrow-100-interest",
  "borrow-200-monthly-payment",
  "borrow-200-15percent-5years-total-interest",
  "borrow-300-monthly-payment",
  "borrow-300-15percent-5years-total-interest",
  "revo-100-interest",
  "revo-100man-15percent-simulation",
  "revo-100man-50k-years",
  "repayment-method-difference",
  "equal-principal-first-payment-higher",
  "fixed-principal-payment-schedule",
  "repayment-term-longer-total-interest",
  "monthly-50000-interest-at-15percent",
  "monthly-50000-how-much-can-borrow",
  "fixed-payment-principal-interest-cannot-payoff",
  "fixed-monthly-payment-borrowing-reverse-calculator",
  "early-repayment-effect",
  "early-repayment-100k-effect",
  "100man-100months-risk-at-15percent",
]);

export function articleUsesWideLayout(slug: string): boolean {
  return WIDE_LAYOUT_SLUGS.has(slug);
}
