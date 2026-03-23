export type GlossaryArticleLink = {
  href: string;
  label: string;
};

export type GlossaryTerm = {
  slug: string;
  term: string;
  def: string;
  relatedSlugs?: string[];
  relatedArticles?: GlossaryArticleLink[];
  externalReferences?: GlossaryArticleLink[];
};

export const glossaryTerms: GlossaryTerm[] = [
  {
    slug: "equal-payment",
    term: "元利均等返済",
    def: "毎月の返済額（元金＋利息の合計）を一定にしつつ、残債に応じて元金と利息の内訳が変わる返済方式。",
    relatedSlugs: ["equal-principal", "apr"],
    relatedArticles: [
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを比較する" },
    ],
  },
  {
    slug: "equal-principal",
    term: "元金均等返済",
    def: "元金を毎月同額に分け、利息を加算する返済方式。初月の支払いが大きくなりやすい。",
    relatedSlugs: ["equal-payment", "apr"],
    relatedArticles: [
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを比較する" },
      { href: "/articles/equal-principal-first-payment-higher", label: "初回返済が高い理由を見る" },
    ],
  },
  {
    slug: "revolving",
    term: "リボ払い（リボルビング）",
    def: "クレジットカード等の残高を、毎月の支払い額を調整しながら返済していく方式。条件次第で完済が長引き利息が増えやすい。",
    relatedSlugs: ["apr", "prepayment"],
    relatedArticles: [
      { href: "/articles/revo-100-interest", label: "リボ払いの利息を確認する" },
      { href: "/articles/revo-50man-simulation", label: "返済額別の試算を見る" },
    ],
  },
  {
    slug: "prepayment",
    term: "繰り上げ返済",
    def: "約定返済に加え、まとまった金額を返済して元金を減らすこと。利息総額や完済時期に影響する。",
    relatedSlugs: ["revolving", "equal-payment"],
    relatedArticles: [
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を見る" },
      { href: "/articles/early-repayment-100k-effect", label: "10万円の繰り上げ効果を見る" },
    ],
  },
  {
    slug: "apr",
    term: "年利（実質年率）",
    def: "借入コストを年ベースで示す指標の一つ。契約や商品により表示方法が異なるため、契約書・公式説明を優先する。",
    relatedSlugs: ["equal-payment", "revolving"],
    externalReferences: [
      { href: "https://www.fsa.go.jp/", label: "金融庁（公式）" },
    ],
  },
  {
    slug: "fixed-cost",
    term: "固定費",
    def: "毎月おおよそ同額かかる支出（通信費・家賃・保険料など）。変動費と区別して家計を見ることがある。",
    relatedSlugs: ["side-job"],
    relatedArticles: [
      { href: "/articles/household-fixed-vs-variable", label: "固定費と変動費の分け方を見る" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリストを見る" },
    ],
  },
  {
    slug: "side-job",
    term: "副業",
    def: "本業以外の収入活動。会社規程・税務・時間管理など、個人の状況に依存する。",
    relatedSlugs: ["fixed-cost"],
    relatedArticles: [
      { href: "/articles/repayment-improvement-guide", label: "返済改善の考え方を見る" },
    ],
  },
];
