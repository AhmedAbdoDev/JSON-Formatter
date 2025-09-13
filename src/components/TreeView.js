import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";

export default function TreeView({ data }) {
  if (!data) return null;

  return (
    <div className="p-4 h-full overflow-hidden">
      <JSONInput
        id="json-tree-view"
        locale={locale}
        placeholder={data}
        theme="dark_vscode_tribute"
        viewOnly={true}
        style={{
          outerBox: {
            backgroundColor: "transparent",
            border: "none",
            maxHeight: "100%",
          },
          container: {
            backgroundColor: "transparent",
            border: "none",
            height: "100%",
          },
          body: {
            backgroundColor: "transparent",
            height: "100%",
          },
        }}
      />
    </div>
  );
}
