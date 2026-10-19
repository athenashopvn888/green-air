export type InlineToken =
  | { type: "text"; text: string }
  | { type: "strong"; text: string }
  | { type: "link"; text: string; href: string }
  | { type: "strongLink"; text: string; href: string };

export type ArticleBlock =
  | { type: "p"; lines: string[] }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; header: string[]; rows: string[][] };

const INLINE_PATTERN = /(\*\*\[[^\]]+\]\([^)]+\)\*\*|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;

export function parseInline(markdown: string): InlineToken[] {
  const tokens: InlineToken[] = [];
  for (const part of markdown.split(INLINE_PATTERN)) {
    if (!part) continue;
    const strongLink = part.match(/^\*\*\[([^\]]+)\]\(([^)]+)\)\*\*$/);
    if (strongLink) {
      tokens.push({ type: "strongLink", text: strongLink[1], href: strongLink[2] });
      continue;
    }
    const strong = part.match(/^\*\*(.+)\*\*$/);
    if (strong) {
      tokens.push({ type: "strong", text: strong[1] });
      continue;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      tokens.push({ type: "link", text: link[1], href: link[2] });
      continue;
    }
    tokens.push({ type: "text", text: part });
  }
  return tokens;
}

function splitRow(line: string): string[] {
  const core = line.trim().replace(/^\|/, "").replace(/\|$/, "");
  return core.split("|").map((cell) => cell.trim());
}

function isSeparator(line: string) {
  const cells = splitRow(line);
  return cells.length > 1 && cells.every((cell) => /^:?-{3,}:?$/.test(cell));
}

function isBlockStart(line: string, next: string | undefined) {
  if (line.startsWith("### ") || line.startsWith("## ")) return true;
  if (line.startsWith("- ")) return true;
  if (/^\d+\.\s/.test(line)) return true;
  if (line.startsWith("|") && next !== undefined && isSeparator(next)) return true;
  return false;
}

export function parseArticle(markdown: string): ArticleBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  let index = 0;
  if (lines[0]?.startsWith("# ") && !lines[0].startsWith("## ")) {
    index = 1;
    if (lines[index] === "") index += 1;
  }

  const blocks: ArticleBlock[] = [];
  while (index < lines.length) {
    const line = lines[index];
    if (line.trim() === "") {
      index += 1;
      continue;
    }
    if (line.startsWith("### ")) {
      blocks.push({ type: "h3", text: line.slice(4) });
      index += 1;
      continue;
    }
    if (line.startsWith("## ")) {
      blocks.push({ type: "h2", text: line.slice(3) });
      index += 1;
      continue;
    }
    if (line.startsWith("|") && isSeparator(lines[index + 1] ?? "")) {
      const header = splitRow(line);
      index += 2;
      const rows: string[][] = [];
      while (index < lines.length && lines[index].startsWith("|")) {
        rows.push(splitRow(lines[index]));
        index += 1;
      }
      blocks.push({ type: "table", header, rows });
      continue;
    }
    if (line.startsWith("- ")) {
      const items: string[] = [];
      while (index < lines.length && lines[index].startsWith("- ")) {
        items.push(lines[index].slice(2));
        index += 1;
      }
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index])) {
        items.push(lines[index].replace(/^\d+\.\s+/, ""));
        index += 1;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    const paragraph: string[] = [];
    while (index < lines.length && lines[index].trim() !== "" && !isBlockStart(lines[index], lines[index + 1])) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push({ type: "p", lines: paragraph });
  }
  return blocks;
}
