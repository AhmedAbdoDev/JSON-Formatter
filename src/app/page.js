"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/en";
import CodeView from "@/components/CodeView";
import TreeView from "@/components/TreeView";
import TableView from "@/components/TableView";

export default function Home() {
  const [jsonInput, setJsonInput] = useState("");
  const [formattedData, setFormattedData] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState(""); // 'format', 'minify', 'tree', 'table'
  const buttons = ["format", "minify", "tree", "table"];
  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
    setCopied(false);
    setError("");
  };

  const handleProcess = (mode) => {
    setError("");
    setFormattedData(null);
    setCopied(false);

    if (!jsonInput.trim()) {
      setError("Input cannot be empty.");
      return;
    }

    try {
      const sanitizedInput = jsonInput.replace(
        /(\s*['"]?\s*)([a-zA-Z0-9_$]+)(\s*['"]?\s*):/g,
        '"$2":'
      );
      const data = JSON.parse(sanitizedInput);
      setFormattedData(data);
      setViewMode(mode);
    } catch (err) {
      setError(`Invalid JSON: ${err.message}`);
    }
  };

  const copyToClipboard = () => {
    if (formattedData) {
      let textToCopy;
      if (viewMode === "minify") {
        textToCopy = JSON.stringify(formattedData);
      } else {
        textToCopy = JSON.stringify(formattedData, null, 2);
      }
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
        })
        .catch((err) => {
          console.error("Could not copy text: ", err);
          setCopied(false);
        });
    }
  };

  return (
    <div className="bg-gray-900 text-gray-200 flex flex-col items-center p-4 sm:p-8 flex-grow">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">
        JSON Formatter & Beautifier
      </h1>
      <p className="text-lg text-gray-400 mb-8 max-w-2xl text-center">
        Paste your JSON below and choose your desired view mode.
      </p>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col">
          <label htmlFor="json-input" className="text-lg font-medium mb-2">
            Input
          </label>
          <textarea
            id="json-input"
            className="w-full h-80 bg-gray-800 text-gray-200 p-4 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 resize-none"
            value={jsonInput}
            onChange={handleInputChange}
            placeholder="Paste your JSON here..."
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <label htmlFor="json-output" className="text-lg font-medium">
              Output
            </label>
            <button
              onClick={copyToClipboard}
              disabled={!formattedData}
              className={`cursor-pointer py-2 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ${
                formattedData
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
          <div className="relative w-full h-80 bg-gray-800 overflow-auto rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200">
            {error ? (
              <div className="p-4 text-red-400 font-mono text-sm break-words whitespace-pre-wrap">
                {error}
              </div>
            ) : formattedData ? (
              <>
                {(viewMode === "format" || viewMode === "minify") && (
                  <CodeView data={formattedData} viewMode={viewMode} />
                )}
                {viewMode === "tree" && <TreeView data={formattedData} />}
                {viewMode === "table" && <TableView data={formattedData} />}
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-mono p-4 text-center">
                Formatted JSON will appear here.
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        {buttons.map((value, index) => (
          <button
            key={index}
            onClick={() => handleProcess(value)}
            className={`cursor-pointer py-3 px-6 sm:px-12 font-bold rounded-lg shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 ${
              viewMode === value
                ? "bg-green-600"
                : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {value} {["tree", "table"].includes(value) && "View"}
          </button>
        ))}
      </div>
    </div>
  );
}
