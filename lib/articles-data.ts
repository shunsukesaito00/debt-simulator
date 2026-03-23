import type { ArticleItem } from "./article-types";

/** 記事メタの配列（一覧・内部リンクの単一ソース）。追加・修正はこのファイル。 */
export const articlesData: ArticleItem[] = [
  {
    slug: "fixed-cost-guide",
    title: "固定費見直しの進め方｜何から手をつけるか、順番と効果をまとめて整理",
    summary:
      "固定費見直しを何から始めるか迷う人向けに、順番・判断基準・項目別チェックポイントを整理した実用ガイド。月5,000円・1万円改善の見え方と試算導線もまとめています。",
    category: "fixed-cost",
    order: 0,
    badge: "おすすめ",
    publishedAt: "2025-03-11",
    dateModified: "2026-03-21",
    relatedLinks: [
      { href: "/articles", label: "記事一覧で他のカテゴリも見る" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーターで試す" },
    ],
  },
  {
    slug: "fixed-cost-checklist",
    title: "固定費見直しチェックリスト｜何から削るか順番で解説",
    summary:
      "何から削るかを一覧表と項目別の確認ポイントで整理した実用チェックリスト。見直しやすさ・削減額の目安・生活への影響・先にやる度で比較し、固定費削減インパクト計算への導線つき。",
    category: "fixed-cost",
    order: 1,
    publishedAt: "2025-03-11",
    dateModified: "2026-03-22",
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
      "スマホ料金見直しを使用量確認から失敗しにくい手順まで整理。格安プランへ変えるときの削減目安、セット割やサポート面の注意点も含めて解説します。",
    category: "fixed-cost",
    order: 2,
    publishedAt: "2025-03-11",
    dateModified: "2026-03-21",
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
      "投資で負けが膨らんだ私の体験｜取り返したかったのはお金、失った実感は家族への信用",
    summary:
      "口座の数字を取り返したい一心から現物株・信用・FXへ進み、生活の締切と家族への助けを求める転機までの体験記です。投資助言ではありません。",
    category: "story",
    order: 0,
    badge: "体験記",
    kind: "story",
    publishedAt: "2026-03-19",
    dateModified: "2026-03-22",
    relatedLinks: [
      { href: "/articles/story-family-confession", label: "家族に借金を打ち明けられなかった理由と…（体験記）" },
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
    title: "後から冷静に考えて初めて実感した借金額の大きさ｜一覧にして分かった重さ",
    summary:
      "引き落としと明細に追われ、総額の重さはその場では実感できなかった。後から一覧にして初めて輪郭が見えた個人の体験記です。投資助言・借入勧誘ではありません。",
    category: "story",
    order: 1,
    publishedAt: "2025-06-01",
    dateModified: "2026-03-21",
    kind: "story",
    relatedLinks: [
      { href: "/articles/story-revolving-spiral", label: "リボ払いが膨らんだ経緯（体験記）" },
      { href: "/articles/story-family-confession", label: "家族に借金を打ち明けられなかった理由と…（体験記）" },
      { href: "/articles/investment-loss-family-trust", label: "投資で負けが膨らんだ体験記" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },
  {
    slug: "story-revolving-spiral",
    title: "リボ払いが膨らんだ経緯｜最低返済だけで積み上がる怖さ",
    summary:
      "最低返済だけで回していたら「返しているのに減らない」感覚があった。明細と支出が重なって膨らんだ流れと、総額・完済時期を見直した個人の記録です。契約は各社の説明を優先してください。",
    category: "story",
    order: 2,
    publishedAt: "2025-06-01",
    dateModified: "2026-03-21",
    kind: "story",
    relatedLinks: [
      { href: "/articles/revo-100-interest", label: "リボ払い100万円の利息（記事）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/articles/story-debt-realization-awakening", label: "後から実感した借金額の重さ（体験記）" },
      { href: "/articles/story-family-confession", label: "家族に借金を打ち明けられなかった理由と…（体験記）" },
    ],
  },
  {
    slug: "story-family-confession",
    title: "家族に借金を打ち明けられなかった理由と、打ち明けて気づいたこと",
    summary:
      "離婚や失望が怖くて借金を家族に言えなかった。打ち明けて分かったのは、言わないほど事態と信頼への負担が重くなることでした。個人の体験記です。",
    category: "story",
    order: 3,
    publishedAt: "2026-03-22",
    dateModified: "2026-03-22",
    kind: "story",
    badge: "体験記",
    relatedLinks: [
      { href: "/articles/investment-loss-family-trust", label: "投資で負けが膨らんだ体験記" },
      { href: "/articles/story-debt-realization-awakening", label: "後から実感した借金額の重さ（体験記）" },
      { href: "/simulator/cardloan", label: "借入返済シミュレーター" },
      { href: "/resources/consultation-guide", label: "相談先・公的支援の一覧" },
    ],
  },

];
