import React, { useEffect, useRef, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import $ from "jquery";
import "react-quill/dist/quill.snow.css";
import "katex/dist/katex.min.css";
import "@edtr-io/mathquill/build/mathquill.css";

let mathquill4quill: (arg0: { Quill: typeof Quill; katex: any }) => any;

const loadDependencies = async () => {
  if (typeof window !== "undefined") {
    const katex = await import("katex");
    (window as any).katex = katex;
    (window as any).jQuery = (window as any).$ = $;
    const mq4q = await import("mathquill4quill").then(
      (module) => module.default
    );
    await import("@edtr-io/mathquill/build/mathquill.js");
    mathquill4quill = mq4q;
  }
};
const customOperator = [
  ["\\pm", "\\pm"],
  ["\\sqrt{x}", "\\sqrt"],
  ["\\sqrt[3]{x}", "\\sqrt[3]{}"],
  ["\\sqrt[n]{x}", "\\nthroot"],
  ["\\frac{x}{y}", "\\frac"],
  ["\\sum^{s}_{x}{d}", "\\sum"],
  ["\\prod^{s}_{x}{d}", "\\prod"],
  ["\\coprod^{s}_{x}{d}", "\\coprod"],
  ["\\int^{s}_{x}{d}", "\\int"],
  ["\\binom{n}{k}", "\\binom"],
];

interface QuillEditorProps {
  initialValue?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  toolbar?: any;
  theme?: string;
  placeholder?: string;
  readOnly?: boolean;
  resetField?: boolean;
  setResetField?: (value: boolean) => void;
  customOperator?: string[][];
}

const QuillEditor: React.FC<QuillEditorProps> = (props) => {
  const defaultToolbar = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: [1, 2, 3, false] }],
    [{ direction: "rtl" }],
    ["link", "image", "formula"],
    [{ color: [] }, { background: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const reactQuill = useRef<ReactQuill>(null);
  const [editorHtml, setEditorHtml] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  let didAttachQuillRefs = false;

  const attachQuillRefs = () => {
    if (!didAttachQuillRefs && mathquill4quill) {
      const enableMathQuillFormulaAuthoring = mathquill4quill({
        Quill: ReactQuill.Quill,
        katex: (window as any).katex,
      });
      enableMathQuillFormulaAuthoring(reactQuill.current?.getEditor(), {
        operators: props.customOperator || customOperator,
        displayHistory: true,
      });
      didAttachQuillRefs = true;
    }
  };

  useEffect(() => {
    loadDependencies().then(() => {
      setIsLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (isLoaded) {
      attachQuillRefs();
    }
  }, [isLoaded]);

  useEffect(() => {
    if (props.initialValue) {
      setEditorHtml(props.initialValue);
    }
  }, [props.initialValue]);

  useEffect(() => {
    if (props.resetField) {
      setEditorHtml("");
      props.setResetField && props.setResetField(false);
    }
  }, [props.resetField]);

  const handleChange = (value: string) => {
    setEditorHtml(value);
    props.onChange && props.onChange(value);
  };

  if (!isLoaded) {
    return <div>Loading editor...</div>;
  }

  return (
    <ReactQuill
      ref={reactQuill}
      modules={{
        formula: true,
        toolbar: props.toolbar || defaultToolbar,
        clipboard: { matchVisual: false },
        blotFormatter: {},
      }}
      value={editorHtml}
      onChange={handleChange}
      onBlur={props.onBlur}
      theme={props.theme || "snow"}
      placeholder={props.placeholder || "Write something..."}
      bounds=".quill"
      readOnly={props.readOnly}
    />
  );
};

export default QuillEditor;
