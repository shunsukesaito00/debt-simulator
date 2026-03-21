import type { Metadata } from "next";
import Link from "next/link";
import { getArticlesForSearch } from "@/lib/articles";
import { SiteSearchClient } from "@/app/components/SiteSearchClient";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();
const URL = `${BASE}/search`;

export const metadata: Metadata = {
  title: "記事を検索",
  description: `${SITE_NAME}の記事をキーワードで検索できます。`,
  alternates: { canonical: URL },
  robots: { index: true, follow: true },
  openGraph: { title: "記事を検索", description: "記事のキーワード検索。", url: URL, type: "website" },
};

export default function Page() {
  const articles = getArticlesForSearch();

  return (
    <div className="ds-page-width">
      <nav className="mb-6 text-sm text-stone-600" aria-label="パンくず">
        <ol className="flex flex-wrap items-center gap-1">
          <li>
            <Link href="/" className="hover:underline">
              ホーム
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="font-bold text-stone-900">検索</li>
        </ol>
      </nav>

      <div className="ds-card ds-card-pad">
        <h1 className="ds-page-serif text-2xl font-bold text-stone-900 md:text-3xl">記事を検索</h1>
        <p className="mt-2 text-base text-stone-600 leading-relaxed">
          タイトル・要約・カテゴリ名のキーワードで、読みたい記事を探せます。
        </p>
        <div className="mt-6">
          <SiteSearchClient articles={articles} />
        </div>
      </div>
    </div>
  );
}
