export function AdSlot({ className = "" }: { className?: string }) {
  // 審査中は広告を一切表示しない
  if (process.env.NEXT_PUBLIC_SHOW_ADS !== "1") return null;

  // 将来 AdSense を入れるときの挿入ポイント（今は空の箱）
  return <div className={className} aria-label="advertisement" />;
}