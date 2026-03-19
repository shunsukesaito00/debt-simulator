import Link from "next/link";
import type { Metadata } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://debt-simulator-quzc.vercel.app";

export const metadata: Metadata = {
  title: "運営者情報",
  description:
    "借入返済シミュレーターの運営目的・運営者・連絡先。借入返済・固定費の見え方・返済計画などを条件別に比較・試算し、判断材料を提供するサイトです。",
  alternates: { canonical: `${BASE}/about` },
  openGraph: { title: "運営者情報", description: "借入返済シミュレーターの運営目的・運営者・連絡先。", url: `${BASE}/about`, type: "website" },
};

export default function Page() {
  return (
    <div className="ds-card ds-card-pad">
      <h1 className="text-2xl font-black">運営者情報</h1>

      <div className="mt-5 grid gap-4 text-sm text-gray-700 leading-relaxed">
        <div>
          <div className="font-black text-gray-900">サイト名</div>
          <div>借入返済シミュレーター</div>
        </div>

        <div>
          <div className="font-black text-gray-900">運営目的</div>
          <div>
            借入返済・固定費の見え方・支出の改善・返済計画などを、条件別に比較・試算し、
            判断材料を提供することを目的としています。一般論ではなく具体条件で月々負担の違いを確認できるよう、
            シミュレーターと記事を用意し、記事とツールを往復して判断できる構成にしています。
          </div>
        </div>

        <div>
          <div className="font-black text-gray-900">運営者</div>
          <div>個人運営（氏名・住所の公開は行っていません）</div>
        </div>

        <div>
          <div className="font-black text-gray-900">運営者プロフィール（概要）</div>
          <div className="space-y-2">
            <p>
              20代後半の会社員。株式投資・FXの失敗をきっかけに、最大で約300万円の借金を抱えた経験があります。
            </p>
            <p>
              このサイトは「借入返済の見え方が変わると、判断が変わる」という実体験をもとに、数字で確認できる判断材料をまとめる目的で作っています。
            </p>
            <p className="text-xs text-gray-600">
              ※運営者の属性・経験はサイトの背景説明であり、特定の投資行動や借入を推奨するものではありません。
            </p>
          </div>
        </div>

        <div>
          <div className="font-black text-gray-900">連絡先</div>
          <div>
            お問い合わせは{" "}
            <Link
              href="https://github.com/shunsukesaito00/debt-simulator/issues"
              className="font-black text-gray-800 underline"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Issues
            </Link>
            からお願いします（メールアドレスの公開は行っていません）。
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h2 className="text-lg font-black text-gray-900">運営方針・編集ポリシー</h2>
        <div className="mt-4 space-y-4 text-sm text-gray-700 leading-relaxed">
          <div>
            <div className="font-black text-gray-900">サイトの方針</div>
            <div>
              借入返済・固定費見直し・家計管理を、一般論ではなく<strong>具体的な条件で比較できる</strong>形で整理することを重視しています。金額・金利・期間などの条件を変えて比較し、読者が自分の状況に合った判断材料を得られるようにしています。
            </div>
          </div>

          <div>
            <div className="font-black text-gray-900">利益相反（広告・収益）</div>
            <div>
              現時点では、返済の試算や条件比較の理解を目的としたコンテンツを中心にしています。広告等を掲載する場合でも、特定の金融商品の申込みを促すことや、審査・商品選定の推奨を目的とした記事は扱いません。
            </div>
          </div>

          <div>
            <div className="font-black text-gray-900">記事作成プロセス</div>
            <div>
              各記事は以下のプロセスで作成しています。
            </div>
            <ol className="mt-2 list-decimal pl-5 space-y-1">
              <li>テーマの選定：検索意図と読者ニーズに基づきテーマを決定</li>
              <li>骨組みの作成：AIツールで構成案と計算例を作成</li>
              <li>判断材料の追加：人間が前提条件・読み方のポイント・編集メモを追記し、条件の妥当性を確認</li>
              <li>公開前チェック：計算ロジック・内部リンク・構造化データ・免責事項を確認してから公開</li>
            </ol>
          </div>

          <div>
            <div className="font-black text-gray-900">更新方針</div>
            <div>
              記事は公開後も定期的に見直し、計算条件の見直し・内容の追加・読みやすさの改善を行っています。更新があった場合は、記事の構造化データ（JSON-LD）の <code className="text-xs bg-gray-100 px-1 py-0.5 rounded">dateModified</code> を更新しています。
            </div>
          </div>

          <div>
            <div className="font-black text-gray-900">免責・注意事項</div>
            <div>
              当サイトの記事・シミュレーターの計算結果は概算であり、実際の融資条件・返済額・利息額とは異なる場合があります。具体的な借入・返済の判断は、金融機関や専門家にご相談ください。詳しくは
              <Link href="/disclaimer" className="font-black text-gray-800 underline ml-1">免責事項</Link>
              をご覧ください。
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}