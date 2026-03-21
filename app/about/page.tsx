import Link from "next/link";
import type { Metadata } from "next";
import { getSiteBaseUrl, SITE_NAME } from "@/lib/site-config";

const BASE = getSiteBaseUrl();

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "借入返済シミュレーターの運営目的・運営者・連絡先。借入返済・固定費の見え方・返済計画などを条件別に比較・試算し、判断材料を提供するサイトです。",
  alternates: { canonical: `${BASE}/about` },
  openGraph: { title: "運営者情報", description: "借入返済シミュレーターの運営目的・運営者・連絡先。", url: `${BASE}/about`, type: "website" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-prose">
      <div className="ds-card ds-card-pad">
        <p className="text-sm font-bold text-stone-600">運営者プロフィール</p>
        <h1 className="ds-page-serif mt-2 text-2xl font-bold text-stone-900 md:text-3xl">運営者情報</h1>

        <div className="mt-6 space-y-4 text-sm text-stone-700 leading-relaxed">
          <p>
            運営者の経験をもとに、返済・固定費・家計に関する記事と、条件を変えて試せる試算ツールを公開しています。
            投資助言や借入の勧誘は行っていません。
          </p>
          <p>
            記事の読み方の例は
            <Link href="/welcome" className="mx-1 font-bold text-stone-900 underline decoration-stone-300 hover:no-underline">
              はじめての方へ
            </Link>
            を参照してください。
          </p>
        </div>

        <div className="mt-8 grid gap-4 border-t border-stone-200 pt-8 text-sm text-stone-700 leading-relaxed">
          <div>
            <div className="font-semibold text-stone-900">サイト名</div>
            <div>{SITE_NAME}（返済・固定費の試算ツール「借入返済シミュレーター」を併設）</div>
          </div>

          <div>
            <div className="font-semibold text-stone-900">運営目的</div>
            <div>
              借入返済・固定費の見え方・支出の改善・返済計画などを、条件別に比較・試算し、
              判断材料を提供することを目的としています。一般論ではなく具体条件で月々負担の違いを確認できるよう、
              シミュレーターと記事を用意し、記事とツールを往復して判断できる構成にしています。
            </div>
          </div>

          <div>
            <div className="font-semibold text-stone-900">運営者</div>
            <div>個人運営（氏名・住所の公開は行っていません）</div>
          </div>

          <div>
            <div className="font-semibold text-stone-900">経歴・体験（概要）</div>
            <div className="space-y-2">
              <p>
                20代後半の会社員。株式投資・FXの失敗をきっかけに、最大で約300万円の借金を抱えた経験があります。
              </p>
              <p>
                このサイトは「借入返済の見え方が変わると、判断が変わる」という実体験をもとに、数字で確認できる判断材料をまとめる目的で作っています。記事を書くときも、この経験を前提にしています。
              </p>
              <p className="text-xs text-stone-600">
                ※運営者の属性・経験はサイトの背景説明であり、特定の投資行動や借入を推奨するものではありません。
              </p>
            </div>
          </div>

          <div>
            <div className="font-semibold text-stone-900">連絡先</div>
            <div>
              お問い合わせは{" "}
              <Link href="/contact" className="font-semibold text-stone-800 underline">
                お問い合わせフォーム
              </Link>
              からお願いします（メールアドレスの公開は行っていません）。
            </div>
          </div>
        </div>
      </div>

      <div className="ds-card ds-card-pad mt-6">
        <h2 className="ds-page-serif text-lg font-bold text-stone-900">運営方針・編集ポリシー</h2>
        <div className="mt-4 space-y-4 text-sm text-stone-700 leading-relaxed">
          <div>
            <div className="font-semibold text-stone-900">サイトの方針</div>
            <div>
              借入返済・固定費見直し・家計管理を、一般論ではなく<strong>具体的な条件で比較できる</strong>形で整理することを重視しています。金額・金利・期間などの条件を変えて比較し、読者が自分の状況に合った判断材料を得られるようにしています。
            </div>
          </div>

          <div>
            <div className="font-semibold text-stone-900">利益相反（広告・収益）</div>
            <div>
              現時点では、返済の試算や条件比較の理解を目的としたコンテンツを中心にしています。広告等を掲載する場合でも、特定の金融商品の申込みを促すことや、審査・商品選定の推奨を目的とした記事は扱いません。
            </div>
          </div>

          <div>
            <div className="font-semibold text-stone-900">記事のつくり方</div>
            <div>各記事は、次のような流れで整えています。</div>
            <ol className="mt-2 list-decimal pl-5 space-y-1">
              <li>テーマの選定：読む方の疑問や状況に沿うかを考えて決めます</li>
              <li>構成と試算：見出しと計算例のたたき台を用意し、条件が現実的かを確認します</li>
              <li>追記・推敲：前提条件・読み方の注意・免責の表現を人の手で足し、誤解がないか見直します</li>
              <li>公開前：試算の考え方と免責事項を最終確認してから公開します</li>
            </ol>
          </div>

          <div>
            <div className="font-semibold text-stone-900">更新方針</div>
            <div>
              記事は公開後も定期的に見直し、計算条件の見直し・内容の追加・読みやすさの改善を行っています。内容を直したときは、記事ページの更新日もあわせて示します。
            </div>
          </div>

          <div>
            <div className="font-semibold text-stone-900">免責・注意事項</div>
            <div>
              当サイトの記事・シミュレーターの計算結果は概算であり、実際の融資条件・返済額・利息額とは異なる場合があります。具体的な借入・返済の判断は、金融機関や専門家にご相談ください。詳しくは
              <Link href="/disclaimer" className="font-semibold text-stone-800 underline ml-1">
                免責事項
              </Link>
              をご覧ください。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
