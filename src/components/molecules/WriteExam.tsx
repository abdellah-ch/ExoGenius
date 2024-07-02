// import Editor from "quill-editor-math";
// import "quill-editor-math/dist/index.css";
// import { useState } from "react";

interface StepProps {
  setEditorValue: React.Dispatch<React.SetStateAction<string>>;
}
const WriteExam = (props: StepProps) => {
  return (
    <div className="min-h-[50vh]">
      {/* <Editor
        initialValue=""
        onChange={(value) => {
          props.setEditorValue(value);
        }}
      /> */}
    </div>
  );
};

export default WriteExam;
