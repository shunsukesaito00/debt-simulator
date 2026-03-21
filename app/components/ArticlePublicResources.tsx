import Link from "next/link";

/**
 * YMYL 領域の信頼性補強用：公的相談先・参考情報への導線（記事末に配置）
 * 一覧は折りたたみで縦長スクロールを抑え、要約＋相談ガイドへの導線を先に示す。
 */
export function ArticlePublicResources() {
  return (
    <section className="ds-section-gap mt-10 border-t border-stone-200 pt-8" aria-labelledby="public-resources-heading">
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

      <details className="mt-4 rounded-lg border border-stone-200 bg-stone-50/40 px-4 py-2 text-sm">
        <summary className="cursor-pointer font-medium text-stone-800 outline-none marker:text-stone-400 [&::-webkit-details-marker]:text-stone-400">
          主な公的リンクを表示
        </summary>
        <ul className="mt-3 space-y-2 pb-2 text-stone-700">
          <li>
            <a
              href="https://www.fsa.go.jp/"
              className="ds-link-prose"
              target="_blank"
              rel="noopener noreferrer"
            >
              金融庁
            </a>
            <span className="text-stone-500"> — 貸金業規制・消費者保護の概要など</span>
          </li>
          <li>
            <a
              href="https://www.j-fsa.or.jp/"
              className="ds-link-prose"
              target="_blank"
              rel="noopener noreferrer"
            >
              日本貸金業協会
            </a>
            <span className="text-stone-500"> — 相談窓口の案内など</span>
          </li>
          <li>
            <a
              href="https://www.houterasu.or.jp/"
              className="ds-link-prose"
              target="_blank"
              rel="noopener noreferrer"
            >
              法テラス（日本司法支援センター）
            </a>
            <span className="text-stone-500"> — 無料法律相談（条件あり）</span>
          </li>
          <li>
            <span className="font-medium text-stone-800">消費生活センター（188）</span>
            <span className="text-stone-500"> — 契約・消費生活全般の相談（地域により番号・受付が異なる場合があります）</span>
          </li>
          <li>
            <a href="https://www.jcca.jp/" className="ds-link-prose" target="_blank" rel="noopener noreferrer">
              日本クレジットカウンセリング協会
            </a>
          </li>
          <li>
            <a href="https://www.stat.go.jp/" className="ds-link-prose" target="_blank" rel="noopener noreferrer">
              総務省統計局（家計調査など）
            </a>
          </li>
        </ul>
      </details>
    </section>
  );
}
