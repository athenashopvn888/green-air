import Link from "next/link";
import { Fragment } from "react";
import { parseArticle, parseInline, type InlineToken } from "./articleModel";
import styles from "./article.module.css";

function Inline({ tokens }: { tokens: InlineToken[] }) {
  return tokens.map((token, index) => {
    if (token.type === "text") return <Fragment key={index}>{token.text}</Fragment>;
    if (token.type === "strong") return <strong key={index}>{token.text}</strong>;
    const label = token.type === "strongLink" ? <strong>{token.text}</strong> : token.text;
    if (token.href.startsWith("/")) {
      return (
        <Link key={index} href={token.href}>
          {label}
        </Link>
      );
    }
    return (
      <a key={index} href={token.href}>
        {label}
      </a>
    );
  });
}

export default function ArticleBody({ markdown }: { markdown: string }) {
  const blocks = parseArticle(markdown);
  return (
    <div className={styles.prose}>
      {blocks.map((block, index) => {
        if (block.type === "h2") return <h2 key={index}>{block.text}</h2>;
        if (block.type === "h3") return <h3 key={index}>{block.text}</h3>;
        if (block.type === "ul" || block.type === "ol") {
          const ListTag = block.type === "ul" ? "ul" : "ol";
          return (
            <ListTag key={index}>
              {block.items.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <Inline tokens={parseInline(item)} />
                </li>
              ))}
            </ListTag>
          );
        }
        if (block.type === "table") {
          return (
            <div key={index} className={styles.tableWrap}>
              <table>
                <thead>
                  <tr>
                    {block.header.map((cell, cellIndex) => (
                      <th key={cellIndex} scope="col">
                        <Inline tokens={parseInline(cell)} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>
                          <Inline tokens={parseInline(cell)} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return (
          <p key={index}>
            {block.lines.map((line, lineIndex) => (
              <Fragment key={lineIndex}>
                {lineIndex > 0 ? <br /> : null}
                <Inline tokens={parseInline(line)} />
              </Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}
