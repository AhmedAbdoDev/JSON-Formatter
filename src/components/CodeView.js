import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function CodeView({ data, viewMode }) {
  if (!data) return null;
  const formattedContent = JSON.stringify(data, null, 2);
  const minifiedContent = JSON.stringify(data);
  const content = viewMode === "format" ? formattedContent : minifiedContent;

  return (
    <SyntaxHighlighter
      language="json"
      style={a11yDark}
      customStyle={{
        padding: "1rem",
        backgroundColor: "transparent",
        margin: "0",
        height: "100%",
      }}
      showLineNumbers={viewMode === "format"}
    >
      {content}
    </SyntaxHighlighter>
  );
}
