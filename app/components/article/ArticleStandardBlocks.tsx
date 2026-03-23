import { getDefaultArticleEnhancements, type ArticleEnhancementBlocks } from "@/lib/article-enhancements";
import { getArticle } from "@/lib/articles";
import { ArticleFurtherReading, type FurtherReadingItem } from "./ArticleFurtherReading";
import { ArticleKeyTakeaways } from "./ArticleKeyTakeaways";

export type ArticleStandardBlocksProps = {
  slug: string;
  /** デフォルト（カテゴリ別）を上書き */
  takeaways?: string[];
  /** 追加の関連リンク（記事の relatedLinks の前に差し込み可） */
  extraReading?: FurtherReadingItem[];
  showFurtherReading?: boolean;
};

/**
 * 記事冒頭に置く標準ブロック（要約・必要時のみ関連）。
 * 文案は `lib/article-enhancements.ts` のカテゴリ別デフォルト＋ `getArticle` の relatedLinks。
 */
export function ArticleStandardBlocks({
  slug,
  takeaways: takeawaysOverride,
  extraReading = [],
  showFurtherReading = false,
}: ArticleStandardBlocksProps) {
  const defaults: ArticleEnhancementBlocks = getDefaultArticleEnhancements(slug);
  const takeaways = takeawaysOverride ?? defaults.takeaways;

  const article = getArticle(slug);
  const fromMeta: FurtherReadingItem[] =
    showFurtherReading && article?.relatedLinks?.length
      ? article.relatedLinks.map((l) => ({ href: l.href, label: l.label }))
      : [];

  const readingItems = [...extraReading, ...fromMeta];

  return (
    <div className="mt-5 space-y-3">
      <ArticleKeyTakeaways items={takeaways} />
      {readingItems.length > 0 ? <ArticleFurtherReading items={readingItems} /> : null}
    </div>
  );
}
