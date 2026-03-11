import Link from "next/link";
import {
  getArticle,
  getArticlesByCategory,
  ARTICLE_CATEGORIES,
  CATEGORY_LABELS,
} from "@/lib/articles";

const SIMULATOR_HREF = "/simulator/cardloan";
const SIMULATOR_LABEL = "借入返済シミュレーターで試す";

/** FAQ 用: カテゴリ別の代表記事＋シミュレーターCTA */
export function SupplementPageFooterFaq() {
  const byCategory = getArticlesByCategory();
  const featured: { href: string; label: string }[] = [];
  for (const cat of ARTICLE_CATEGORIES) {
    const items = byCategory.get(cat);
    if (!items || items.length === 0) continue;
    const label = CATEGORY_LABELS[cat];
    const a = items[0];
    featured.push({ href: `/articles/${a.slug}`, label: `${label}: ${a.title}` });
    if (items.length >= 2) {
      featured.push({ href: `/articles/${items[1].slug}`, label: items[1].title });
    }
  }

  return (
    <section className="mt-10 rounded-2xl border-2 border-gray-200 bg-gray-50 p-6">
      <h2 className="text-base font-black text-gray-900">関連記事とシミュレーター</h2>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        条件別の記事で返済の考え方を整理し、シミュレーターで自分の条件を試算できます。
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {featured.slice(0, 8).map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm font-bold text-gray-700 hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link href="/articles" className="text-sm font-bold text-gray-700 hover:underline">
            記事一覧を見る →
          </Link>
        </li>
      </ul>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm font-bold text-gray-900">自分の条件で試算する</p>
        <Link
          href={SIMULATOR_HREF}
          className="mt-3 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
        >
          {SIMULATOR_LABEL} →
        </Link>
      </div>
    </section>
  );
}

/** logic 用: 返済方式・逆算・計算に近い記事＋シミュレーターCTA */
const LOGIC_RELATED_SLUGS = [
  "repayment-method-difference",
  "monthly-50000-how-much-can-borrow",
  "fixed-monthly-payment-borrowing-reverse-calculator",
  "borrow-100-interest",
];

export function SupplementPageFooterLogic() {
  const links: { href: string; label: string }[] = [];
  for (const slug of LOGIC_RELATED_SLUGS) {
    const a = getArticle(slug);
    if (a) links.push({ href: `/articles/${a.slug}`, label: a.title });
  }
  links.push({ href: "/articles", label: "記事一覧を見る" });

  return (
    <section className="mt-10 rounded-2xl border-2 border-gray-200 bg-gray-50 p-6">
      <h2 className="text-base font-black text-gray-900">関連記事とシミュレーター</h2>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        返済方式の違いや借入額の逆算など、計算ロジックに近い記事をまとめています。
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="text-sm font-bold text-gray-700 hover:underline">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm font-bold text-gray-900">自分の条件で試算する</p>
        <Link
          href={SIMULATOR_HREF}
          className="mt-3 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
        >
          {SIMULATOR_LABEL} →
        </Link>
      </div>
    </section>
  );
}

/** how-to 用: シミュレーターCTA ＋ 記事一覧 */
export function SupplementPageFooterHowTo() {
  return (
    <section className="mt-10 rounded-2xl border-2 border-gray-200 bg-gray-50 p-6">
      <h2 className="text-base font-black text-gray-900">自分の条件で試算する</h2>
      <p className="mt-2 text-sm text-gray-700 leading-relaxed">
        借入額・金利・返済期間を入力して、月々の返済額や総利息をシミュレーションできます。
      </p>
      <Link
        href={SIMULATOR_HREF}
        className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
      >
        {SIMULATOR_LABEL} →
      </Link>
      <p className="mt-6 text-sm font-bold text-gray-900">条件別の記事も読む</p>
      <Link href="/articles" className="mt-2 inline-block text-sm font-bold text-gray-700 hover:underline">
        記事一覧を見る →
      </Link>
    </section>
  );
}
