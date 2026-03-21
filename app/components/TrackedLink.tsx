"use client";

import Link from "next/link";
import { trackEvent, type TrackEventParams } from "@/lib/analytics";

type TrackedLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  rel?: string;
  target?: string;
  /** クリック時に送信するイベント（GA4） */
  event: TrackEventParams;
};

/**
 * クリック時に trackEvent を送信してから遷移する Link。
 * 見た目・アクセシビリティは通常の Link と同じ。遷移を阻害しない。
 */
export function TrackedLink({ href, children, className, rel, target, event }: TrackedLinkProps) {
  return (
    <Link
      href={href}
      className={className}
      rel={rel}
      target={target}
      onClick={() => trackEvent(event)}
    >
      {children}
    </Link>
  );
}
