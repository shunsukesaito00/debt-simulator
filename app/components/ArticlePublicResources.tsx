import Link from "next/link";

/**
 * YMYL 領域の信頼性補強用：公的相談先・参考情報への導線（記事末に配置）
 * 一覧は折りたたみで縦長スクロールを抑え、要約＋相談ガイドへの導線を先に示す。
 */
export function ArticlePublicResources() {
  return (
    <section className="ds-section-gap mt-6 border-t border-stone-200/80 pt-6" aria-labelledby="public-resources-heading">
      <h2 id="public-resources-heading" className="text-base font-semibold text-stone-900">
        参考・相談先（公的情報）
      </h2>
      <p className="mt-2 text-sm text-stone-600 leading-relaxed">
        借入・返済・生活に関する判断は、公的な相談窓口や公的資料もあわせてご確認ください。当サイトの記事は参考情報であり、個別の法的判断や契約内容の代わりにはなりません。
      </p>
      <p className="mt-3 text-sm">
        <Link href="/resources/consultation-guide" className="ds-link-prose">
          相談先・公的支援の一覧ページへ →
        </Link>
      </p>
      <p className="mt-2 text-sm">
        <Link href="/glossary" className="ds-link-prose">
          返済方式・金利・リボ用語を用語集で確認する →
        </Link>
      </p>
    </section>
  );
}
