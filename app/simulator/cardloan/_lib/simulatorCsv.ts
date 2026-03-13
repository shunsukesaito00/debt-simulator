import type { CalcResult } from "@/lib/loan-calc";

/** 返済表1行を CSV の列配列に変換 */
function scheduleRowToCsvColumns(r: {
  year: number;
  month: number;
  annualRatePercent: number;
  payment: number;
  interest: number;
  principal: number;
  bonus: number;
  balance: number;
}): string[] {
  return [
    `${r.year}/${r.month}`,
    String(r.annualRatePercent),
    String(r.payment),
    String(r.interest),
    String(r.principal),
    String(r.bonus),
    String(r.balance),
  ];
}

/** CalcResult から CSV 用のヘッダ行とデータ行を生成 */
export function buildCsvRows(result: CalcResult): { headers: string[]; rows: string[][] } | null {
  if (!result.ok) return null;
  const headers = ["年月", "年利(%)", "支払", "利息", "元金", "追加返済", "残高"];
  const rows = result.schedule.map((r) => scheduleRowToCsvColumns(r));
  return { headers, rows };
}

/** CSV 文字列を生成（BOM 付き UTF-8 用の先頭は呼び出し側で付与可） */
export function buildCsvString(result: CalcResult): string | null {
  const built = buildCsvRows(result);
  if (!built) return null;
  const lines = [built.headers.join(","), ...built.rows.map((row) => row.join(","))];
  return lines.join("\n");
}

/**
 * 返済表を CSV でダウンロードする。
 * 挙動は従来の downloadCsv と同一（ファイル名・BOM・MIME）。
 */
export function downloadScheduleCsv(result: CalcResult, label: string): void {
  if (!result.ok) return;
  const csv = buildCsvString(result);
  if (csv == null) return;
  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `返済表_${label}_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
