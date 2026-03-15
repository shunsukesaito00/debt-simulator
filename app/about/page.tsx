import Link from "next/link";

export const metadata = { title: "運営者情報" };

export default function Page() {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-soft md:p-8">
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
    </div>
  );
}