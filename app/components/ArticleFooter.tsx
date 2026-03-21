import { getArticle, CATEGORY_LABELS, getArticleListSectionIdForCategory } from "@/lib/articles";
import { TrackedLink } from "@/app/components/TrackedLink";
import { ArticleAuthorCard } from "@/app/components/article";
import { ArticlePrevNext } from "@/app/components/ArticlePrevNext";

const SIMULATOR_HREF = "/simulator/cardloan";
const SIMULATOR_LABEL = "借入返済シミュレーターで計算する";

function slugFromHref(href: string): string | undefined {
  const m = href.match(/^\/articles\/([^#?]+)/);
  return m ? m[1] : undefined;
}

interface ArticleFooterProps {
  articleSlug: string;
  showCta?: boolean;
}

export function ArticleFooter({ articleSlug, showCta = true }: ArticleFooterProps) {
  const article = getArticle(articleSlug);
  if (!article) return null;

  const relatedLinks = article.relatedLinks ?? [];
  const categoryLabel = CATEGORY_LABELS[article.category];
  const categoryAnchor = `/articles#${getArticleListSectionIdForCategory(article.category)}`;

  const articleLinks = relatedLinks.filter((l) => slugFromHref(l.href));
  const otherLinks = relatedLinks.filter((l) => !slugFromHref(l.href));

  return (
    <section className="mt-10 border-t border-stone-200 pt-8">
      {showCta && (
        <div className="ds-subcard mb-8 p-6">
          <h2 className="text-base font-bold text-stone-900">自分の条件で試算する</h2>
          <p className="mt-2 text-sm text-stone-700 leading-relaxed">
            借入額・金利・返済期間を入力して、月々の返済額や総利息をシミュレーションできます。
          </p>
          <TrackedLink
            href={SIMULATOR_HREF}
            className="ds-btn ds-btn-primary mt-4"
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

      <div className="mb-8">
        <ArticleAuthorCard />
      </div>

      {articleLinks.length > 0 && (
        <div className="mb-8">
          <h2 className="text-base font-bold text-stone-900">あわせて読みたい</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {articleLinks.map((link) => {
              const targetSlug = slugFromHref(link.href)!;
              const target = getArticle(targetSlug);
              return (
                <TrackedLink
                  key={link.href}
                  href={link.href}
                  className="ds-subcard block p-4 transition-colors hover:border-emerald-200/80 hover:shadow-ds"
                  event={{
                    action: "click_article_related_article",
                    location: "article_related_articles",
                    target: link.href,
                    link_type: "related_article",
                    source_article_slug: articleSlug,
                    article_slug: targetSlug,
                  }}
                >
                  {target ? (
                    <>
                      <span className="rounded-md border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-semibold text-stone-500">
                        {CATEGORY_LABELS[target.category]}
                      </span>
                      <span className="mt-2 block text-sm font-semibold text-stone-900 leading-snug line-clamp-2">
                        {target.title}
                      </span>
                      <p className="mt-1 text-xs text-stone-500 leading-relaxed line-clamp-2">
                        {target.summary}
                      </p>
                    </>
                  ) : (
                    <span className="text-sm font-semibold text-stone-900">{link.label}</span>
                  )}
                </TrackedLink>
              );
            })}
          </div>
        </div>
      )}

      {otherLinks.length > 0 && (
        <ul className="mb-6 flex flex-col gap-2">
          {otherLinks.map((link) => (
            <li key={link.href}>
              <TrackedLink
                href={link.href}
                className="text-sm font-semibold text-stone-700 hover:text-emerald-900 hover:underline"
                event={{
                  action: link.href === SIMULATOR_HREF ? "click_article_simulator_cta" : "click_article_related_article",
                  location: "article_related_articles",
                  target: link.href,
                  link_type: link.href === SIMULATOR_HREF ? "simulator_cta" : "related_article",
                  source_article_slug: articleSlug,
                }}
              >
                {link.label}
              </TrackedLink>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col gap-2">
        <TrackedLink
          href={categoryAnchor}
          className="text-sm font-semibold text-stone-700 hover:text-emerald-900 hover:underline"
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
        <TrackedLink
          href="/articles"
          className="text-sm font-semibold text-stone-700 hover:text-emerald-900 hover:underline"
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
      </div>

      <ArticlePrevNext slug={articleSlug} />
    </section>
  );
}
