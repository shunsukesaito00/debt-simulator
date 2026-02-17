"use client";

export default function AdSlot({
  className = "",
}: {
  className?: string;
}) {
  const enabled = process.env.NEXT_PUBLIC_ADS_ENABLED === "1";
  if (!enabled) return null;

  // 合格後にここへ AdSense の実コードを入れる想定
  return (
    <div className={className} aria-label="広告">
      {/* AdSense code goes here */}
    </div>
  );
}