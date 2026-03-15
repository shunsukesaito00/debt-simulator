import { getArticle, CATEGORY_LABELS, getArticleListSectionIdForCategory } from "@/lib/articles";
import { TrackedLink } from "@/app/components/TrackedLink";

const SIMULATOR_HREF = "/simulator/cardloan";
const SIMULATOR_LABEL = "借入返済シミュレーターで計算する";

/** href が /articles/:slug 形式のとき slug を返す */
function slugFromHref(href: string): string | undefined {
  const m = href.match(/^\/articles\/([^#?]+)/);
  return m ? m[1] : undefined;
}

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
  const categoryAnchor = `/articles#${getArticleListSectionIdForCategory(article.category)}`;

  return (
    <section className="mt-10 border-t border-gray-200 pt-8">
      {showCta && (
        <div className="mb-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">
          <h2 className="text-base font-black text-gray-900">自分の条件で試算する</h2>
          <p className="mt-2 text-sm text-gray-700 leading-relaxed">
            借入額・金利・返済期間を入力して、月々の返済額や総利息をシミュレーションできます。
          </p>
          <TrackedLink
            href={SIMULATOR_HREF}
            className="mt-4 inline-flex items-center justify-center rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white hover:opacity-90"
            event={{
              action: "click_article_simulator_cta",
              location: "article_cta",
              target: SIMULATOR_HREF,
              link_type: "simulator_cta",
              source_article_slug: articleSlug,
            }}
          >
            {SIMULATOR_LABEL} →
          </TrackedLink>
        </div>
      )}

      {relatedLinks.length > 0 && (
        <>
          <h2 className="text-base font-black text-gray-900">関連記事</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {relatedLinks.map((link) => {
              const targetSlug = slugFromHref(link.href);
              const isSimulator = link.href === SIMULATOR_HREF;
              return (
                <li key={link.href}>
                  {isSimulator ? (
                    <TrackedLink
                      href={link.href}
                      className="text-sm font-bold text-gray-700 hover:underline"
                      event={{
                        action: "click_article_simulator_cta",
                        location: "article_related_articles",
                        target: link.href,
                        link_type: "simulator_cta",
                        source_article_slug: articleSlug,
                      }}
                    >
                      {link.label}
                    </TrackedLink>
                  ) : (
                    <TrackedLink
                      href={link.href}
                      className="text-sm font-bold text-gray-700 hover:underline"
                      event={{
                        action: "click_article_related_article",
                        location: "article_related_articles",
                        target: link.href,
                        link_type: "related_article",
                        source_article_slug: articleSlug,
                        article_slug: targetSlug,
                      }}
                    >
                      {link.label}
                    </TrackedLink>
                  )}
                </li>
              );
            })}
            <li>
              <TrackedLink
                href={categoryAnchor}
                className="text-sm font-bold text-gray-700 hover:underline"
                event={{
                  action: "click_article_related_article",
                  location: "article_related_articles",
                  target: categoryAnchor,
                  link_type: "related_article",
                  source_article_slug: articleSlug,
                  category_key: article.category,
                }}
              >
                「{categoryLabel}」の記事一覧へ
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                href="/articles"
                className="text-sm font-bold text-gray-700 hover:underline"
                event={{
                  action: "click_article_back_to_articles",
                  location: "article_footer",
                  target: "/articles",
                  link_type: "articles_index_link",
                  source_article_slug: articleSlug,
                }}
              >
                記事一覧へ戻る
              </TrackedLink>
            </li>
          </ul>
        </>
      )}
    </section>
  );
}
