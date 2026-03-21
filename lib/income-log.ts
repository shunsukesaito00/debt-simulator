import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getSiteBaseUrl } from "@/lib/site-config";

export type IncomeRange = {
  label: string; // 例: "3〜5万円"
  note?: string; // 例: "税引前の概算"
};

export type IncomeBreakdownItem = {
  key: string; // 例: "app", "note", "ads"
  label: string; // 例: "個人開発アプリ"
  range: IncomeRange;
};

export type IncomeReport = {
  month: string; // YYYY-MM
  slug: string; // month と同値
  title: string;
  publishedAt: string; // YYYY-MM-DD
  total: IncomeRange;
  /** frontmatter の配列順＝一覧・詳細の表示順（大きい順などは YAML で並べ替え） */
  breakdown: IncomeBreakdownItem[];
  summary: string;
  highlights?: string[];
  content: string;
};

/** 一覧・パンくず用: `2026-03` → `2026年3月` */
export function formatIncomeMonthJa(ym: string): string {
  const m = /^(\d{4})-(\d{2})$/.exec(ym.trim());
  if (!m) return ym;
  return `${m[1]}年${parseInt(m[2], 10)}月`;
}

/** `2026-03-21` → `2026年3月21日` */
export function formatPublishedDateJa(isoDate: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate.trim());
  if (!m) return isoDate;
  return `${m[1]}年${parseInt(m[2], 10)}月${parseInt(m[3], 10)}日`;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "income");

function isValidMonth(input: string): boolean {
  return /^\d{4}-(0[1-9]|1[0-2])$/.test(input);
}

function parseFile(filePath: string): IncomeReport | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const month = String(data.month ?? "").trim();
  if (!isValidMonth(month)) return null;

  const slug = month;
  const title = String(data.title ?? `${month} の月次収益レポート`);
  const publishedAt = String(data.publishedAt ?? `${month}-01`);
  const summary = String(data.summary ?? "").trim();
  const totalLabel = String(data.totalLabel ?? "").trim();
  const totalNote = data.totalNote ? String(data.totalNote) : undefined;

  const breakdownRaw = Array.isArray(data.breakdown) ? data.breakdown : [];
  const breakdown = breakdownRaw
    .map((item): IncomeBreakdownItem | null => {
      if (!item || typeof item !== "object") return null;
      const key = String((item as { key?: unknown }).key ?? "").trim();
      const label = String((item as { label?: unknown }).label ?? "").trim();
      const rangeLabel = String((item as { range?: unknown }).range ?? "").trim();
      if (!key || !label || !rangeLabel) return null;
      const note = (item as { note?: unknown }).note ? String((item as { note?: unknown }).note) : undefined;
      const range: IncomeRange = note ? { label: rangeLabel, note } : { label: rangeLabel };
      return { key, label, range };
    })
    .filter((v): v is IncomeBreakdownItem => v !== null);

  const highlights = Array.isArray(data.highlights)
    ? data.highlights.map((x: unknown) => String(x)).filter(Boolean)
    : [];

  if (!summary || !totalLabel) return null;

  return {
    month,
    slug,
    title,
    publishedAt,
    total: { label: totalLabel, note: totalNote },
    breakdown,
    summary,
    highlights,
    content,
  };
}

export function getIncomeReports(): IncomeReport[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => path.join(CONTENT_DIR, f));

  const reports = files.map(parseFile).filter((v): v is IncomeReport => v !== null);
  return reports.sort((a, b) => b.month.localeCompare(a.month));
}

export function getIncomeReport(month: string): IncomeReport | undefined {
  if (!isValidMonth(month)) return undefined;
  return getIncomeReports().find((r) => r.month === month);
}

export function getIncomeReportUrl(month: string): string {
  return `${getSiteBaseUrl()}/income/${month}`;
}
