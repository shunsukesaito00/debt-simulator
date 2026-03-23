import { TrackedLink } from "@/app/components/TrackedLink";

const SIMULATOR_HREF = "/simulator/cardloan";

interface ArticleTrySimulatorCtaProps {
  sourceArticleSlug: string;
  title?: string;
  description?: string;
  buttonLabel?: string;
}

export function ArticleTrySimulatorCta({
  sourceArticleSlug,
  title = "自分の条件で確認するならシミュレーターが早い",
  description = "借入額・金利・毎月返済額を入れて、返済期間と総返済額の差を比較できます。",
  buttonLabel = "借入返済シミュレーターで計算する",
}: ArticleTrySimulatorCtaProps) {
  return (
    <section id="simulator">
      <h2 className="text-lg font-semibold text-stone-900 md:text-xl">{title}</h2>
      <p className="mt-3">{description}</p>
      <div className="mt-6">
        <TrackedLink
          href={SIMULATOR_HREF}
          className="ds-btn ds-btn-primary"
          event={{
            action: "click_article_simulator_cta",
            location: "article_body",
            target: SIMULATOR_HREF,
            link_type: "simulator_cta",
            source_article_slug: sourceArticleSlug,
          }}
        >
          {buttonLabel} →
        </TrackedLink>
      </div>
    </section>
  );
}
