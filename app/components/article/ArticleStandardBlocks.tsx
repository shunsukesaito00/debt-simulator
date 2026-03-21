import { getDefaultArticleEnhancements, type ArticleEnhancementBlocks } from "@/lib/article-enhancements";
import { getArticle } from "@/lib/articles";
import { ArticleChecklist } from "./ArticleChecklist";
import { ArticleFurtherReading, type FurtherReadingItem } from "./ArticleFurtherReading";
import { ArticleKeyTakeaways } from "./ArticleKeyTakeaways";
import { ArticleScenarioCallout } from "./ArticleScenarioCallout";

export type ArticleStandardBlocksProps = {
  slug: string;
  /** デフォルト（カテゴリ別）を上書き */
  takeaways?: string[];
  scenario?: string;
  checklist?: string[];
  /** 追加の関連リンク（記事の relatedLinks の前に差し込み可） */
  extraReading?: FurtherReadingItem[];
  showFurtherReading?: boolean;
};

/**
 * 記事冒頭に置く標準ブロック（要約・シナリオ・チェック・関連）。
 * 文案は `lib/article-enhancements.ts` のカテゴリ別デフォルト＋ `getArticle` の relatedLinks。
 */
export function ArticleStandardBlocks({
  slug,
  takeaways: takeawaysOverride,
  scenario: scenarioOverride,
  checklist: checklistOverride,
  extraReading = [],
  showFurtherReading = true,
}: ArticleStandardBlocksProps) {
  const defaults: ArticleEnhancementBlocks = getDefaultArticleEnhancements(slug);
  const takeaways = takeawaysOverride ?? defaults.takeaways;
  const scenario = scenarioOverride ?? defaults.scenario;
  const checklist = checklistOverride ?? defaults.checklist;

  const article = getArticle(slug);
  const fromMeta: FurtherReadingItem[] =
    showFurtherReading && article?.relatedLinks?.length
      ? article.relatedLinks.map((l) => ({ href: l.href, label: l.label }))
      : [];

  const readingItems = [...extraReading, ...fromMeta];

  return (
    <div className="mt-6 space-y-4">
      <ArticleKeyTakeaways items={takeaways} />
      <ArticleScenarioCallout>{scenario}</ArticleScenarioCallout>
      <ArticleChecklist items={checklist} />
      {readingItems.length > 0 ? <ArticleFurtherReading items={readingItems} /> : null}
    </div>
  );
}
