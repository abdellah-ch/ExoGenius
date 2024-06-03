import Editor from "quill-editor-math";
import "quill-editor-math/dist/index.css";

const WriteExam = () => {
  return (
    <div className="min-h-[50vh]">
      <Editor initialValue="" />
    </div>
  );
};

export default WriteExam;
