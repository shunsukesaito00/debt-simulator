import type { ArticleItem } from "./article-types";

/** 記事メタの配列（一覧・内部リンクの単一ソース）。追加・修正はこのファイル。 */
export const articlesData: ArticleItem[] = [
  {
    slug: "fixed-cost-guide",
    title: "固定費見直しの進め方｜何から手をつけるか・改善効果の比較",
    summary:
      "通信費・サブスク・保険など、毎月の固定負担を見直したい方向けに、何から手をつけるべきかと改善効果を比較する考え方を整理します。記事とシミュレーターを往復して判断材料にしてください。",
    category: "fixed-cost",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles", label: "記事一覧で他のカテゴリも見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "fixed-cost-checklist",
    title: "固定費見直しチェックリスト｜何から削るか順番で解説",
    summary:
      "固定費を見直したい人向けに、何から手をつけるべきかを順番で整理したチェックリスト記事です。見直しやすさ・削減額・生活への影響の3軸で比較します。",
    category: "fixed-cost",
    order: 1,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月々返済額から借入額を逆算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-mobile-comparison",
    title: "スマホ料金プラン見直しの考え方｜格安プランに変えるとどれくらい変わる？",
    summary:
      "スマホ・通信費の見直しで、格安プランへの乗り換えやデータ量・オプションの見直しでどれくらい変わるかを整理します。固定費チェックリストの「通信費」を深掘りする記事です。",
    category: "fixed-cost",
    order: 2,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-subscription-audit",
    title: "サブスク整理の進め方｜見落としやすい月額課金を洗い出す方法",
    summary:
      "サブスク・月額課金を見直したい方向けに、見落としがちな契約の洗い出し方と、やめる・減らすときの判断のポイントを整理します。",
    category: "fixed-cost",
    order: 3,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-insurance-review",
    title: "保険見直しの考え方｜何を確認すべきか・削ってよいもの/ダメなもの",
    summary:
      "保険の見直しで確認すべきポイントと、削ってよい保障・慎重にすべき保障の考え方を整理します。重複保障や過剰保障の見直しの参考に。",
    category: "fixed-cost",
    order: 4,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-utility-switch",
    title: "電気・ガス乗り換えの効果は？契約見直しで月いくら変わるか",
    summary:
      "電気・ガスなどの光熱系契約を見直すと、月々の支払いがどれくらい変わる可能性があるかを整理します。乗り換えやプラン変更の判断材料に。",
    category: "fixed-cost",
    order: 5,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "household-budget-starter",
    title: "家計簿が続かない人のための最低限チェック｜記録せずに把握する方法",
    summary:
      "家計簿が続かない方向けに、記録せずに支出を把握する方法と、最低限チェックするポイントを整理します。",
    category: "household",
    order: 0,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/household-fixed-vs-variable", label: "固定費と変動費の分け方" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "household-fixed-vs-variable",
    title: "固定費と変動費の分け方｜何が固定費で何が変動費か",
    summary:
      "家計を把握するときの「固定費」と「変動費」の分け方と、それぞれ何を入れるかを整理します。",
    category: "household",
    order: 1,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/household-budget-starter", label: "家計簿が続かない人のための最低限チェック" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "household-monthly-balance-check",
    title: "月の収支をざっくり把握する方法｜手取りから逆算する考え方",
    summary:
      "家計簿をつけずに、月の収支をざっくり把握する方法と、手取りから逆算する考え方を整理します。",
    category: "household",
    order: 2,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/household-budget-starter", label: "家計簿が続かない人のための最低限チェック" },
      { href: "/articles/household-fixed-vs-variable", label: "固定費と変動費の分け方" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "investment-loss-family-trust",
    title:
      "投資で負けが膨らんだ私の体験｜取り返し、家族への信用、投資を止めたときまで",
    summary:
      "少しでも豊かになりたいと始めた投資が、現物株・信用・FXへとエスカレードし、家族に助けを求めるまでの体験記です。投資助言ではありません。",
    category: "story",
    order: 0,
    badge: "体験記",
    kind: "story",
    publishedAt: "2026-03-19",
    dateModified: "2026-03-19",
    relatedLinks: [
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクト計算" },
      { href: "/articles/repayment-improvement-guide", label: "返済の見直し・改善の考え方" },
      { href: "/about", label: "運営者情報" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-5000-impact",
    title: "固定費を月5,000円見直すとどう変わる？1年・3年・5年の改善効果を比較",
    summary:
      "月5,000円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理した記事です。固定費改善は月額ではなく継続で見るべきことを解説します。",
    category: "improvement-effect",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-10000-impact",
    title: "固定費を月1万円見直すとどう変わる？1年・3年・5年の改善効果を比較",
    summary:
      "月1万円の固定費改善で、1年・3年・5年にどれくらい差が出るかを具体的に整理した記事です。継続したときの累計効果を数字で確認できます。",
    category: "improvement-effect",
    order: 1,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-5000-impact", label: "月5,000円の効果比較を見る" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-cost-3000-impact",
    title: "月3,000円の固定費見直しは意味がある？年間・3年・5年で検証",
    summary:
      "月3,000円の固定費見直しが年間・3年・5年でどれくらいの差になるかを具体的に整理した記事です。小さくても続ける効果を数字で確認できます。",
    category: "improvement-effect",
    order: 2,
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/fixed-cost-5000-impact", label: "月5,000円の効果比較を見る" },
      { href: "/articles/fixed-cost-guide", label: "固定費見直しの進め方を見る" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクトを計算する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "loan-amount-guide",
    title: "借入額別に見る返済負担の違い｜100万・200万・300万で比較",
    summary:
      "借入額100万円・200万円・300万円で、月々返済額、完済までの期間、総利息がどう変わるかをわかりやすく整理して解説します。",
    category: "loan-amount",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を詳しく見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円での総利息を詳しく見る" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "返済額から借入額を逆算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "borrow-100-interest",
    title: "借金100万円の利息はいくら？年利15%での返済額をシミュレーション",
    summary:
      "借金100万円を年利15%で借りた場合の月々の返済額、総支払額、総利息を3年返済・5年返済で比較して解説します。実際の条件は返済シミュレーターで確認できます。",
    category: "loan-amount",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "borrow-200-monthly-payment",
    title: "借金200万円の月々返済はいくら？年利15%で3年・5年返済を比較",
    summary:
      "借金200万円を年利15%で借りた場合の月々返済額と総利息を比較し、返済期間ごとの違いをわかりやすく解説します。自分の条件は返済シミュレーターで試算できます。",
    category: "loan-amount",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/borrow-200-15percent-5years-total-interest", label: "200万円・15%・5年の総利息だけを見る" },
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "borrow-200-15percent-5years-total-interest",
    title: "借金200万円・金利15%で5年返済すると総利息はいくら？元利均等の目安",
    summary:
      "借金200万円を年利15%で5年（60回）・元利均等返済した場合の総利息・月々返済額・総支払額の目安を整理します。3年・7年との比較も。",
    category: "loan-amount",
    publishedAt: "2026-03-21",
    dateModified: "2026-03-21",
    relatedLinks: [
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を総合的に比較する" },
      { href: "/articles/borrow-300-15percent-5years-total-interest", label: "借金300万円・5年の総利息を見る" },
      { href: "/articles/repayment-term-longer-total-interest", label: "返済期間と総利息の関係を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "borrow-300-monthly-payment",
    title: "借金300万円の月々返済はいくら？年利15%で3年・5年・月5万円返済を比較",
    summary:
      "借入300万円を年利15%で返済する場合の月々返済額、総利息、完済までの期間を、3年返済・5年返済・月5万円返済の比較でわかりやすく解説します。",
    category: "loan-amount",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/borrow-300-15percent-5years-total-interest", label: "300万円・15%・5年の総利息だけを見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円・金利15%の総利息比較を見る" },
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "返済額から借入額を逆算する" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "borrow-300-15percent-5years-total-interest",
    title: "借金300万円・金利15%で5年返済すると総利息はいくら？元利均等の目安",
    summary:
      "借金300万円を年利15%で5年（60回）・元利均等返済した場合の総利息・月々返済額・総支払額の目安を整理します。3年・7年との比較も。",
    category: "loan-amount",
    publishedAt: "2026-03-21",
    dateModified: "2026-03-21",
    relatedLinks: [
      { href: "/articles/borrow-300-monthly-payment", label: "借金300万円の月々返済を総合的に比較する" },
      { href: "/articles/repayment-term-longer-total-interest", label: "返済期間を延ばすと総利息がどう変わるか" },
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "borrow-500-monthly-payment",
    title: "借金500万円の月々返済はいくら？年利15%で比較",
    summary:
      "借金500万円を年利15%で借りた場合、3年・5年・7年で月々の返済額と総利息がどう変わるかを整理します。",
    category: "loan-amount",
    order: 4,
    publishedAt: "2026-03-16",
    dateModified: "2026-03-16",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別に見る返済負担の違い" },
      { href: "/articles/borrow-300-monthly-payment", label: "借金300万円の返済を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "revo-100-interest",
    title: "リボ払い100万円の利息はいくら？完済までの総支払額をシミュレーション",
    summary:
      "リボ払いで100万円を利用した場合の利息、完済までの期間、総支払額を比較しながら、返済額による違いをわかりやすく解説します。",
    category: "revolving",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/revo-100man-15percent-simulation", label: "リボ100万・金利15%の返済シミュレーションを見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "repayment-method-difference",
    title: "元利均等返済と元金均等返済の違いは？4つの返済方式を比較して解説",
    summary:
      "元利均等返済と元金均等返済の違いを中心に、定額元利・定額元金も含めた4つの返済方式の特徴や向いている人を比較して解説します。",
    category: "repayment-method",
    publishedAt: "2025-03-08",
    dateModified: "2026-03-21",
    relatedLinks: [
      { href: "/articles/equal-principal-first-payment-higher", label: "元金均等で初回返済が高い理由を見る" },
      { href: "/articles/fixed-principal-payment-schedule", label: "定額元金の返済額の推移を見る" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "equal-principal-first-payment-higher",
    title: "元金均等返済で初回の返済額が高いのはなぜ？元利均等との違いをわかりやすく解説",
    summary:
      "元金均等返済では初回の返済額が元利均等返済より大きくなりやすい理由を、残高・利息・元本の返し方の関係から整理します。100万円・年利15%・36回の数値例つき。",
    category: "repayment-method",
    publishedAt: "2026-03-19",
    dateModified: "2026-03-19",
    relatedLinks: [
      { href: "/articles/repayment-method-difference", label: "4つの返済方式の比較を見る" },
      { href: "/articles/fixed-principal-payment-schedule", label: "定額元金の返済額の推移を見る" },
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-principal-payment-schedule",
    title: "定額元金返済の返済額は月ごとにどう変わる？推移の見方と数値例",
    summary:
      "定額元金返済では毎月の元本が一定でも、利息が残高に応じて減るため支払総額は下がっていきます。100万円・年利15%・毎月元金3万円の目安とシミュ導線を整理します。",
    category: "repayment-method",
    publishedAt: "2026-03-21",
    dateModified: "2026-03-21",
    relatedLinks: [
      { href: "/articles/repayment-method-difference", label: "4つの返済方式の比較を見る" },
      { href: "/articles/equal-principal-first-payment-higher", label: "元金均等で初回返済が高い理由を見る" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "repayment-term-longer-total-interest",
    title: "返済期間を延ばすと総利息はどれだけ増える？100万円・年利15%・元利均等の比較",
    summary:
      "同じ借入額でも返済期間が長いほど総利息は増えやすい理由を、100万円・年利15%で3年・5年・7年返済の数値例で整理します。シミュレーターで期間を変えて比較するコツも。",
    category: "repayment-improvement",
    publishedAt: "2026-03-21",
    dateModified: "2026-03-21",
    relatedLinks: [
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法を見る" },
      { href: "/articles/100man-100months-risk-at-15percent", label: "長期返済のリスクを見る" },
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "repayment-improvement-guide",
    title: "返済を軽くする方法｜繰り上げ返済・返済期間・返済方式の見直しを解説",
    summary:
      "返済を軽くする方法を、繰り上げ返済、返済期間、毎月返済額、返済方式の見直しという4つの視点から整理してわかりやすく解説します。",
    category: "repayment-improvement",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/repayment-term-longer-total-interest", label: "返済期間と総利息の関係を見る" },
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を詳しく見る" },
      { href: "/articles/100man-100months-risk-at-15percent", label: "長期返済のリスクを詳しく見る" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "early-repayment-effect",
    title: "繰り上げ返済の効果とは？利息はいくら減る？返済期間短縮との違いも解説",
    summary:
      "繰り上げ返済をすると何が変わるのかを、利息軽減、完済時期、毎月返済額の違いからわかりやすく解説します。",
    category: "repayment-improvement",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法を見る" },
      { href: "/articles/early-repayment-100k-effect", label: "繰り上げ返済10万円の効果を詳しく見る" },
      { href: "/articles/100man-100months-risk-at-15percent", label: "長期返済のリスクを詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "early-repayment-100k-effect",
    title: "繰り上げ返済10万円の効果は？利息はいくら減る？完済時期の違いも解説",
    summary:
      "10万円の繰り上げ返済で、総利息や完済時期がどれだけ変わるのかを、具体例・比較表・グラフでわかりやすく解説します。",
    category: "repayment-improvement",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を詳しく見る" },
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法を見る" },
      { href: "/articles/100man-100months-risk-at-15percent", label: "長期返済のリスクを見る" },
      { href: "/articles/monthly-50000-interest-at-15percent", label: "月5万円返済時の総利息を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "fixed-payment-principal-interest-cannot-payoff",
    title: "定額元利で完済できないのはなぜ？返済額が足りないケースをわかりやすく解説",
    summary:
      "定額元利返済で完済できないと言われる理由を、利息と返済額の関係から整理し、具体例・表・グラフでわかりやすく解説します。",
    category: "repayment-method",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/repayment-method-difference", label: "返済方式の違いを詳しく見る" },
      { href: "/articles/revo-100-interest", label: "リボ払いの利息を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-50000-how-much-can-borrow",
    title: "借金返済が月5万円ならいくらまで借りられる？返済額から逆算する目安を解説",
    summary:
      "毎月5万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
    category: "repayment-planning",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/fixed-monthly-payment-borrowing-reverse-calculator", label: "月々返済額から借入額を逆算する考え方を見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-30000-how-much-can-borrow",
    title: "月3万円返済ならいくらまで借りられる？年利15%で3年・5年・7年の目安を解説",
    summary:
      "毎月3万円返済できる場合、年利15%を前提に何万円くらいまで借りると現実的かを、3年・5年・7年返済の比較でわかりやすく解説します。",
    category: "repayment-planning",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを見る" },
      { href: "/articles/fixed-monthly-payment-borrowing-reverse-calculator", label: "返済額から借入額を逆算する考え方を見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-70000-how-much-can-borrow",
    title: "月7万円返済ならいくらまで借りられる？",
    summary:
      "月7万円の返済なら、年利15%でいくらまで借りられるかを3年・5年・7年で整理します。",
    category: "repayment-planning",
    order: 3,
    publishedAt: "2026-03-16",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられる？" },
      { href: "/articles/monthly-30000-how-much-can-borrow", label: "月3万円ならいくらまで借りられる？" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "fixed-monthly-payment-borrowing-reverse-calculator",
    title: "月々返済額を固定すると借入額はいくら？返済額から逆算する考え方を解説",
    summary:
      "月々の返済額を固定した場合に、返済期間や金利によって借入額の目安がどう変わるかを、表とグラフでわかりやすく解説します。",
    category: "repayment-planning",
    badge: "新着",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを知りたい方はこちら" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を知りたい方はこちら" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "monthly-50000-interest-at-15percent",
    title: "借金返済が月5万円・金利15%なら総利息はいくら？借入額別に比較",
    summary:
      "毎月5万円返済・年利15%を前提に、借入額100万円・200万円・300万円で総利息と完済期間がどう変わるかを表とグラフでわかりやすく解説します。",
    category: "loan-amount",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/loan-amount-guide", label: "借入額別の返済負担の違いを見る" },
      { href: "/articles/borrow-100-interest", label: "借金100万円の利息を見る" },
      { href: "/articles/borrow-200-monthly-payment", label: "借金200万円の月々返済を見る" },
      { href: "/articles/monthly-50000-how-much-can-borrow", label: "月5万円ならいくらまで借りられるかを見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "100man-100months-risk-at-15percent",
    title: "金利15%で100万円を100ヶ月返済するリスクとは？総利息と総支払額を解説",
    summary:
      "年利15%で100万円を100ヶ月かけて返済すると、毎月返済額は低く見えても総利息は大きく膨らみます。長期返済のリスクを表とグラフでわかりやすく解説します。",
    category: "repayment-improvement",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法を見る" },
      { href: "/articles/early-repayment-effect", label: "繰り上げ返済の効果を詳しく見る" },
      { href: "/articles/early-repayment-100k-effect", label: "繰り上げ返済10万円の効果を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "revo-100man-30k-years",
    title: "リボ払い100万円を月3万円で返すと何年かかる？完済までの期間と総利息を解説",
    summary:
      "リボ払い100万円を毎月3万円ずつ返済した場合、完済までの期間と総利息がどうなるかを年利15%の例でわかりやすく解説します。",
    category: "revolving",
    publishedAt: "2025-03-11",
    relatedLinks: [
      { href: "/articles/revo-100man-50k-years", label: "月5万円で返すと何年かかるかを見る" },
      { href: "/articles/revo-100man-15percent-simulation", label: "リボ100万・金利15%の返済シミュレーションを見る" },
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息を詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "revo-100man-50k-years",
    title: "リボ払い100万円を月5万円で返すと何年かかる？完済までの期間と総利息を解説",
    summary:
      "リボ払い100万円を毎月5万円で返済した場合、完済まで何年かかるのか、総利息はいくらになるのかを年利15%でシミュレーションし、月3万円・月7万円との違いも整理します。",
    category: "revolving",
    publishedAt: "2026-03-19",
    dateModified: "2026-03-19",
    relatedLinks: [
      { href: "/articles/revo-100man-30k-years", label: "月3万円で返す場合の試算を見る" },
      { href: "/articles/revo-100man-15percent-simulation", label: "返済額別の比較（3万・5万・7万）を見る" },
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息を詳しく見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  {
    slug: "revo-100man-15percent-simulation",
    title: "リボ払い100万円・金利15%の返済シミュレーション｜毎月返済額でどう変わる？",
    summary:
      "リボ払い100万円を年利15%で利用した場合、毎月3万円・5万円・7万円返済で完済までの期間、総支払額、総利息がどう変わるかを表とグラフでわかりやすく解説します。",
    category: "revolving",
    publishedAt: "2025-03-08",
    relatedLinks: [
      { href: "/articles/revo-100man-50k-years", label: "月5万円で返すと何年かかるかを見る" },
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息を詳しく見る" },
      { href: "/articles/fixed-payment-principal-interest-cannot-payoff", label: "定額元利で完済できない理由を見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで比較する" },
    ],
  },
  {
    slug: "revo-50man-simulation",
    title: "リボ払い50万円の返済シミュレーション｜毎月の返済額でどう変わる？",
    summary:
      "リボ払い50万円を年利15%で返済する場合、月1万・2万・3万円でどう変わるかを比較します。",
    category: "revolving",
    order: 4,
    publishedAt: "2026-03-16",
    dateModified: "2026-03-16",
    relatedLinks: [
      { href: "/articles/revo-100man-15percent-simulation", label: "リボ100万円のシミュレーション" },
      { href: "/articles/revo-100-interest", label: "リボ100万円の利息" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
      { href: "/articles", label: "記事一覧へ" },
    ],
  },
  // --- 体験記・返済日記（追加） ---
  {
    slug: "story-debt-realization-awakening",
    title: "借金に気づいたときの話｜明細を見て初めて分かった金額",
    summary:
      "引き落としと明細を見て、借金の総額が自分の想像を超えていたときの話です。投資助言・借入勧誘をするものではありません。",
    category: "story",
    order: 1,
    publishedAt: "2025-06-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/investment-loss-family-trust", label: "投資で負けが膨らんだ体験記" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },
  {
    slug: "story-revolving-spiral",
    title: "リボ払いが膨らんだ経緯｜最低返済だけで積み上がる怖さ",
    summary:
      "最低返済だけで済ませていたところ、利息が積み上がり総額が伸びていった経緯を整理しました。個人の体験であり、契約条件は各社の説明を優先してください。",
    category: "story",
    order: 2,
    publishedAt: "2025-06-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息（記事）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/articles/story-debt-realization-awakening", label: "借金に気づいたときの話" },
    ],
  },
  {
    slug: "story-family-confession",
    title: "家族に借金を打ち明けたとき｜言葉にできなかったこと",
    summary:
      "家族に話すまでに迷ったこと、話したあとに楽になったこと、まだ残る罪悪感について。当事者の記録であり、一般論の正解は示しません。",
    category: "story",
    order: 3,
    publishedAt: "2025-07-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/investment-loss-family-trust", label: "投資で負けが膨らんだ体験記" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },
  {
    slug: "story-repayment-plan-started",
    title: "返済計画を立てたとき｜いくらから返せるかを先に決めた",
    summary:
      "手取りと生活費から「月に返せる額」を決めたうえで、どの借入から手をつけるかを考えた順番の記録です。",
    category: "story",
    order: 4,
    publishedAt: "2025-08-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法（記事）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
    ],
  },
  {
    slug: "story-side-hustle-first-month",
    title: "副業を始めた経緯と最初の1ヶ月｜収入より先に決めたこと",
    summary:
      "返済のために副業を始めるとき、最初に決めたのは「時間の上限」と「やらないこと」でした。副業の勧誘や案件紹介はしません。",
    category: "story",
    order: 5,
    publishedAt: "2025-09-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/side-income-debt-repayment-intro", label: "借金返済のために始めた副業と結果" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
    ],
  },
  {
    slug: "story-fixed-cost-audit",
    title: "固定費を見直した具体的な記録｜通信とサブスクから手をつけた",
    summary:
      "固定費の洗い出しで、通信・サブスク・保険の順に手をつけたときの記録。削減額はあくまで概算です。",
    category: "story",
    order: 6,
    publishedAt: "2025-10-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/fixed-cost-checklist", label: "固定費見直しチェックリスト" },
      { href: "/tools/fixed-cost-impact", label: "固定費削減インパクト" },
    ],
  },
  {
    slug: "story-mental-health-while-repaying",
    title: "返済中のメンタルの保ち方｜自分を責めすぎないときの工夫",
    summary:
      "返済が続くと、不安がループしやすいと感じたときの対処。メンタルヘルスの専門的助言ではなく、個人の工夫の記録です。",
    category: "story",
    order: 7,
    publishedAt: "2025-11-01",
    kind: "story",
    relatedLinks: [
      { href: "/welcome", label: "はじめての方へ" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },
  {
    slug: "story-one-month-budget-diary",
    title: "節約生活の1ヶ月の家計簿｜何を減らしたかの記録",
    summary:
      "食費と外食を中心に、1ヶ月の支出の振り返りを記録しました。金額は個人の例です。",
    category: "story",
    order: 8,
    publishedAt: "2025-12-01",
    kind: "story",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
      { href: "/articles/household-monthly-balance-check", label: "月の収支をざっくり把握する方法" },
    ],
  },
  {
    slug: "story-wish-i-knew-then",
    title: "あのとき知りたかったこと｜借金を抱えたときに先に読みたかった順番",
    summary:
      "当事者として、後から振り返って「先に知りたかった」ことを整理した記事です。個人の経験に基づくものであり、すべての人に当てはまるとは限りません。",
    category: "story",
    order: 9,
    publishedAt: "2026-01-15",
    kind: "story",
    relatedLinks: [
      { href: "/welcome", label: "はじめての方へ" },
      { href: "/articles/loan-amount-guide", label: "借入額別に見る返済負担の違い" },
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法" },
    ],
  },
  // --- 副業・収入改善 ---
  {
    slug: "side-income-debt-repayment-intro",
    title: "借金返済のために始めた副業と結果｜最初の3ヶ月の記録",
    summary:
      "返済を優先するために副業を始めたときの動機と、最初の3ヶ月で起きたこと。案件紹介や勧誘はしません。",
    category: "side-income",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-06-15",
    relatedLinks: [
      { href: "/articles/story-side-hustle-first-month", label: "副業を始めた経緯と最初の1ヶ月（体験記）" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
    ],
  },
  {
    slug: "side-income-30000-month-journey",
    title: "副業で月3万円稼ぐまでにやったこと｜失敗と見直しのループ",
    summary:
      "月3万円を目安に、単価・時間・体調のバランスを調整した記録です。再現性を保証するものではありません。",
    category: "side-income",
    order: 1,
    publishedAt: "2025-07-15",
    relatedLinks: [
      { href: "/articles/side-income-debt-repayment-intro", label: "借金返済のために始めた副業と結果" },
      { href: "/articles/side-income-crowdsourcing-record", label: "クラウドソーシングで稼げるまでの記録" },
    ],
  },
  {
    slug: "side-income-employee-with-debt",
    title: "借金あり会社員の副業の選び方｜会社規程と時間の上限を先に確認する",
    summary:
      "会社の副業規程・競業の可能性・時間の上限を先に確認する理由を整理します。個人の判断材料であり、法律相談ではありません。",
    category: "side-income",
    order: 2,
    publishedAt: "2025-08-15",
    relatedLinks: [
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
    ],
  },
  {
    slug: "side-income-crowdsourcing-record",
    title: "クラウドソーシングで稼げるまでの記録｜初案件から単価の見直しまで",
    summary:
      "クラウドソーシングで初案件を取り、単価と納期の見直しをした経緯を記録します。プラットフォームの推奨はしません。",
    category: "side-income",
    order: 3,
    publishedAt: "2025-09-15",
    relatedLinks: [
      { href: "/articles/side-income-debt-repayment-intro", label: "借金返済のために始めた副業と結果" },
    ],
  },
  {
    slug: "side-income-frema-result",
    title: "フリマアプリで不用品を売った結果｜手取りと手間のバランス",
    summary:
      "不用品を売却したときの手取り・手間・発送の負担を振り返ります。サービスや商品の推奨はしません。",
    category: "side-income",
    order: 4,
    publishedAt: "2025-10-15",
    relatedLinks: [
      { href: "/articles/side-income-to-repayment-split", label: "副業収入を返済に回す配分の考え方" },
    ],
  },
  {
    slug: "side-income-tax-filing-notes",
    title: "副業の確定申告で気をつけたこと｜雑所得と経費の整理のメモ",
    summary:
      "税務の個別相談ではなく、当事者がメモを残したレベルの整理です。判断は税務署・税理士にご確認ください。",
    category: "side-income",
    order: 5,
    publishedAt: "2025-11-15",
    relatedLinks: [
      { href: "https://www.nta.go.jp/", label: "国税庁（外部）" },
      { href: "/articles/side-income-30000-month-journey", label: "副業で月3万円稼ぐまでにやったこと" },
    ],
  },
  {
    slug: "side-income-to-repayment-split",
    title: "副業収入を返済に回す配分の考え方｜生活費・貯金・緊急の優先順位",
    summary:
      "副業で入ったお金を、返済・生活費・少額の貯金にどう分けたかの考え方です。個人の例にすぎません。",
    category: "side-income",
    order: 6,
    publishedAt: "2025-12-15",
    relatedLinks: [
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/articles/repayment-improvement-guide", label: "返済を軽くする方法" },
    ],
  },
  // --- 節約・生活改善 ---
  {
    slug: "saving-food-budget-20000",
    title: "食費を月2万円に抑える工夫｜献立と買い物のルールを決めた",
    summary:
      "食費を抑えるために、献立・買い物の頻度・外食の回数にルールを決めた記録です。個人の生活スタイルに依存します。",
    category: "saving",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-20",
    relatedLinks: [
      { href: "/articles/saving-cook-vs-eat-out", label: "自炊 vs 外食のコスト比較" },
      { href: "/articles/household-fixed-vs-variable", label: "固定費と変動費の分け方" },
    ],
  },
  {
    slug: "saving-points-how-much-monthly",
    title: "ポイ活で月いくら浮くか｜還元率を過大評価しないためのメモ",
    summary:
      "ポイント還元を前提にしすぎないよう、月ごとの実績をメモした記事です。特定サービスの推奨はしません。",
    category: "saving",
    order: 1,
    publishedAt: "2025-04-10",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
    ],
  },
  {
    slug: "saving-100yen-store-tips",
    title: "100均活用の節約術｜日用品の置き換えで減らした買い物",
    summary:
      "日用品の一部を100円ショップで購入するなど、生活費の圧縮に役立った工夫を整理します。",
    category: "saving",
    order: 2,
    publishedAt: "2025-05-10",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
    ],
  },
  {
    slug: "saving-cook-vs-eat-out",
    title: "自炊 vs 外食のコスト比較｜時間単価まで含めるとどう見えるか",
    summary:
      "自炊と外食のコストを、材料費だけでなく時間も含めて比較する考え方を整理します。正解は人それぞれです。",
    category: "saving",
    order: 3,
    publishedAt: "2025-06-10",
    relatedLinks: [
      { href: "/articles/saving-food-budget-20000", label: "食費を月2万円に抑える工夫" },
    ],
  },
  {
    slug: "saving-utility-monthly-trend",
    title: "光熱費の月別推移と節約記録｜エアコンとお湯の使い方を見直した",
    summary:
      "電気・ガスの請求を月別に見直し、季節要因と生活習慣の影響を整理した記録です。",
    category: "saving",
    order: 4,
    publishedAt: "2025-07-10",
    relatedLinks: [
      { href: "/articles/fixed-cost-utility-switch", label: "電気・ガス乗り換えの効果は？（記事）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
    ],
  },
];
