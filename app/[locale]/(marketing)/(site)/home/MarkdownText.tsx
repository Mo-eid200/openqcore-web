"use client";

import React from "react";

// 🔧 Renders inline markdown (bold/italic) within a single line of
// text -- used by every block type below.
function renderInline(text: string, keyPrefix: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  // Matches **bold** or *italic* (bold checked first, since ** also
  // matches the italic pattern otherwise)
  const regex = /(\*\*(.+?)\*\*)|(\*(.+?)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      parts.push(
        <strong key={`${keyPrefix}-b-${i++}`} className="font-semibold text-white">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(
        <em key={`${keyPrefix}-i-${i++}`} className="italic">
          {match[4]}
        </em>
      );
    }

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}

export default function MarkdownText({ content }: { content: string }) {
  if (!content) return null;

  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  function flushList() {
    if (!listBuffer) return;
    const ListTag = listBuffer.ordered ? "ol" : "ul";
    blocks.push(
      <ListTag
        key={`list-${key++}`}
        className={`my-2 space-y-1 ps-5 ${listBuffer.ordered ? "list-decimal" : "list-disc"}`}
      >
        {listBuffer.items.map((item, i) => (
          <li key={i} className="leading-relaxed">
            {renderInline(item, `li-${key}-${i}`)}
          </li>
        ))}
      </ListTag>
    );
    listBuffer = null;
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    // Horizontal rule
    if (/^-{3,}$/.test(line.trim())) {
      flushList();
      blocks.push(<hr key={`hr-${key++}`} className="my-3 border-white/[0.08]" />);
      continue;
    }

    // Headers
    const headerMatch = line.match(/^(#{1,3})\s+(.*)$/);
    if (headerMatch) {
      flushList();
      const level = headerMatch[1].length;
      const text = headerMatch[2];
      const sizeClass =
        level === 1 ? "text-[17px] font-semibold" : level === 2 ? "text-[15.5px] font-semibold" : "text-[14.5px] font-semibold";
      blocks.push(
        <div key={`h-${key++}`} className={`mt-3 mb-1.5 text-white ${sizeClass}`}>
          {renderInline(text, `h-${key}`)}
        </div>
      );
      continue;
    }

    // Numbered list item
    const numberedMatch = line.match(/^\d+\.\s+(.*)$/);
    if (numberedMatch) {
      if (!listBuffer || !listBuffer.ordered) {
        flushList();
        listBuffer = { ordered: true, items: [] };
      }
      listBuffer.items.push(numberedMatch[1]);
      continue;
    }

    // Bullet list item
    const bulletMatch = line.match(/^[*-]\s+(.*)$/);
    if (bulletMatch) {
      if (!listBuffer || listBuffer.ordered) {
        flushList();
        listBuffer = { ordered: false, items: [] };
      }
      listBuffer.items.push(bulletMatch[1]);
      continue;
    }

    // Blank line
    if (line.trim() === "") {
      flushList();
      continue;
    }

    // Regular paragraph
    flushList();
    blocks.push(
      <p key={`p-${key++}`} className="leading-relaxed">
        {renderInline(line, `p-${key}`)}
      </p>
    );
  }

  flushList();

  return <div className="space-y-1">{blocks}</div>;
}