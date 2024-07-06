// import Editor from "quill-editor-math";
// import "quill-editor-math/dist/index.css";
// import { useState } from "react";
// import { addStyles, EditableMathField } from "react-mathquill";
// addStyles();
// import Editor from "../../dist/components/Editor";
// import "../../dist/index.css";

// import QuillEditor from "../molecules/QuillEditor";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface StepProps {
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
}

const WriteExam = (props: StepProps) => {
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  // const [latex, setLatex] = useState("\\frac{1}{\\sqrt{2}}\\cdot 2");
  return (
    <div className="min-h-[50vh]">
      <ReactQuill
        modules={modules}
        theme="snow"
        onChange={(value) => {
          props.setEditorValue(value);
        }}
      />
      {/* <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex());
        }}
      /> */}
    </div>
  );
};

export default WriteExam;
