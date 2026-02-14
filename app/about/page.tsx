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
            借入返済の見通し（完済までの回数、利息総額、月次の推移）を把握し、
            条件比較の判断材料を提供することを目的としています。
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