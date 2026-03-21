/**
 * 表・Recharts など横幅が必要な記事は max-w-3xl。テキスト中心も ds-article-shell（max-w-3xl）で統一。
 */
const WIDE_LAYOUT_SLUGS = new Set<string>([
  "borrow-100-interest",
  "borrow-200-monthly-payment",
  "borrow-300-monthly-payment",
  "revo-100-interest",
  "revo-100man-15percent-simulation",
  "repayment-method-difference",
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
