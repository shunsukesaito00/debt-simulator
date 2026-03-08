import Link from "next/link";
import { getArticle, CATEGORY_LABELS } from "@/lib/articles";

const SIMULATOR_HREF = "/simulator/cardloan";
const SIMULATOR_LABEL = "自分の条件で返済額を試算する";

interface ArticleFooterProps {
  /** 記事の slug（関連リンク・カテゴリをここから取得） */
  articleSlug: string;
  /** シミュレーターCTAを表示するか（デフォルト true） */
  showCta?: boolean;
}

export function ArticleFooter({ articleSlug, showCta = true }: ArticleFooterProps) {
  const article = getArticle(articleSlug);
  if (!article) return null;

  const relatedLinks = article.relatedLinks ?? [];
  const categoryLabel = CATEGORY_LABELS[article.category];
  const categoryAnchor = `/articles#${article.category}`;

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      {showCta && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
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
        </div>
      )}

      {relatedLinks.length > 0 && (
        <>
          <h2 className="text-base font-black text-gray-900">関連記事</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm font-bold text-gray-700 hover:underline">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={categoryAnchor} className="text-sm font-bold text-gray-700 hover:underline">
                「{categoryLabel}」の記事一覧へ
              </Link>
            </li>
            <li>
              <Link href="/articles" className="text-sm font-bold text-gray-700 hover:underline">
                記事一覧へ戻る
              </Link>
            </li>
          </ul>
        </>
      )}
    </section>
  );
}
