import React from "react";
import JsonView from "@uiw/react-json-view";
import { vscodeTheme } from "@uiw/react-json-view/vscode";

interface IJsonViewComponent {
  record: object | undefined;
  classname?: string;
}

function JsonViewComponent({ record, classname }: IJsonViewComponent) {
  return (
    <div
      className={`overflow-y-auto ${classname}`}
      style={{
        display: "grid",
        gap: "1rem",
        wordWrap: "break-word",
        overflowWrap: "break-word",
        wordBreak: "break-word",
        whiteSpace: "pre-wrap",
      }}
    >
      {record && (
        <JsonView
          value={record}
          style={{
            ...vscodeTheme,
            // "--w-rjv-font-family": "monospace",
            // "--w-rjv-line-height": "1.5",
          }}
          displayDataTypes={false}
          shortenTextAfterLength={0} // Removido o limite para mostrar texto completo
          // Opções adicionais para controle de texto
          collapsed={false}
          enableClipboard={true}
        />
      )}
    </div>
  );
}

export default React.memo(JsonViewComponent);
