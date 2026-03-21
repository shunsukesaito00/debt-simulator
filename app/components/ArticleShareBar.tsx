"use client";

import { useCallback, useState } from "react";

export function ArticleShareBar({ title, url }: { title: string; url: string }) {
  const shareLabel = `「${title}」のURL`;
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  }, [url]);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-stone-200 pt-6">
      <span className="text-xs font-semibold text-stone-500">この記事をシェア</span>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={shareLabel}
        className="ds-btn ds-btn-secondary ds-btn-sm gap-1.5"
      >
        {copied ? (
          <>
            <CopyCheckIcon />
            コピーしました
          </>
        ) : (
          <>
            <CopyIcon />
            URLをコピー
          </>
        )}
      </button>
    </div>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CopyCheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="m12 15 2 2 4-4" />
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}
