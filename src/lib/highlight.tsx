import { Fragment } from "react";

/**
 * Minimal syntax highlighter for the decorative code snippets.
 *
 * Deliberately regex-based and tiny: these are 8-line display snippets, not an
 * editor. Returns React nodes (never dangerouslySetInnerHTML) so snippet text
 * from data files can never inject markup.
 */

const KEYWORDS =
  /\b(?:pub|fn|let|mut|const|struct|enum|impl|trait|use|mod|match|if|else|for|while|loop|return|async|await|move|where|self|Self|as|in|type|dyn|ref|crate|super|static|unsafe|export|import|from|class|extends|implements|interface|function|new|this|public|private|readonly|declare|default)\b/;
const TYPES =
  /\b(?:Result|Option|Some|None|Ok|Err|Vec|String|str|Env|Json|State|Path|Query|Uuid|u8|u16|u32|u64|i32|i64|f64|bool|usize|Promise|Record|Array|number|string|boolean|void|any|unknown)\b/;
const MACROS = /#\[[^\]]*\]|@\w+|\w+!/;

/** Order matters — first alternative to match at a position wins. */
const TOKEN = new RegExp(
  [
    "(?<comment>\\/\\/[^\\n]*)",
    "(?<string>\"(?:[^\"\\\\\\n]|\\\\.)*\"|'(?:[^'\\\\\\n]|\\\\.)*'|`(?:[^`\\\\]|\\\\.)*`)",
    `(?<macro>${MACROS.source})`,
    `(?<keyword>${KEYWORDS.source})`,
    `(?<type>${TYPES.source})`,
    "(?<fn>\\b[a-z_][a-zA-Z0-9_]*(?=\\())",
    "(?<number>\\b\\d+(?:\\.\\d+)?\\b)",
    "(?<punct>[{}()\\[\\];,.:<>?=+\\-*/&|!]+)",
  ].join("|"),
  "g",
);

const CLASS: Record<string, string> = {
  comment: "text-subtle italic",
  string: "text-term-green",
  macro: "text-term-rose",
  keyword: "text-term-violet",
  type: "text-term-cyan",
  fn: "text-accent",
  number: "text-term-rose",
  punct: "text-subtle",
};

export function highlight(code: string) {
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let key = 0;

  // `TOKEN` is a module-level global regex; reset before each run.
  TOKEN.lastIndex = 0;

  for (const match of code.matchAll(TOKEN)) {
    const groups = match.groups ?? {};
    const kind = Object.keys(groups).find((k) => groups[k] !== undefined);
    if (!kind) continue;

    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{code.slice(lastIndex, match.index)}</Fragment>);
    }

    nodes.push(
      <span key={key++} className={CLASS[kind]}>
        {match[0]}
      </span>,
    );

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < code.length) {
    nodes.push(<Fragment key={key++}>{code.slice(lastIndex)}</Fragment>);
  }

  return nodes;
}
