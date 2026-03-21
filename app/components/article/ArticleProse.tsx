import type { ReactNode } from "react";

type ArticleProseProps = {
  children: ReactNode;
  className?: string;
};

/**
 * 記事本文の縦リズム・行長を `.ds-blog-prose` で統一する。
 * 表・Recharts は内側で `ArticleWideBlock` または `max-w-none w-full` を併用。
 */
export function ArticleProse({ children, className = "" }: ArticleProseProps) {
  return <div className={`ds-article-body ${className}`.trim()}>{children}</div>;
}

/** 表・チャートなど、プロス幅を突き抜けてよいブロック */
export function ArticleWideBlock({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`max-w-none w-full min-w-0 ${className}`.trim()}>{children}</div>;
}
