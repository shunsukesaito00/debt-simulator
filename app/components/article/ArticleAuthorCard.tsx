import Link from "next/link";
import { AUTHOR_NAME } from "@/lib/site-author";

/**
 * 記事末尾などに差し込む「この記事を書いた人」カード。
 * 個人ブログでよく見られる“誰が書いているか”の手がかりを、文章の温度感に合わせて前面に出す。
 */
export function ArticleAuthorCard() {
  return (
    <div className="ds-subcard border-stone-100 bg-stone-50/50 p-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="ds-label">この記事を書いた人</div>
          <div className="mt-1 text-sm font-semibold text-stone-900">{AUTHOR_NAME}</div>
        </div>
        <div className="text-sm text-stone-600">
          <Link href="/about" className="ds-link inline-flex items-center gap-1">
            運営者情報へ →
          </Link>
        </div>
      </div>

      <div className="mt-3 text-sm text-stone-700 leading-relaxed">
        20代後半の会社員で、株式投資・FXの失敗をきっかけに約300万円の借金を経験しました。
        返済の「数字の見え方」が変わると判断も変わると実感し、体験記・副業・節約の記録と試算ツールを同じ場所に置いています。
      </div>
    </div>
  );
}

