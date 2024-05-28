import { useRef } from "react";
import image from "/UploadIcon.png";
import { FileUploaderRegular } from "@uploadcare/react-uploader";

interface StepProps {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  uploadedFile: String;
  setUploadedFile: React.Dispatch<React.SetStateAction<String | null>>;
}

const Upload = (props: StepProps) => {
  console.log(props.uploadedFile);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const FileDropRef = useRef<HTMLInputElement>(null);

  const alo = useRef<HTMLInputElement>(null);

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (FileDropRef.current) {
      FileDropRef.current.style.background = "#C8C8C8";
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (FileDropRef.current) {
      FileDropRef.current.style.background = "white";
    }
    const file = event.dataTransfer.files?.[0];
    if (file && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      fileInputRef.current.files = dataTransfer.files;
      handleFileChange({
        target: fileInputRef.current,
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload here, e.g., send the file to the server
      // console.log("Selected file:", file);
      // Example of how to send the file to a server
      // const formData = new FormData();
      // formData.append("file", file);
      // props.setUploadedFile(file);
      props.setCurrentStep(3);
    }
  };

  return (
    <div className="flex items-center justify-center  bg-white py-20 ">
      <div className="bg-white p-8  w-full flex items-center flex-col">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Upload a PDF
        </h2>
        <p className="text-center text-zinc-500 mb-6">Max file size: 15 MB</p>
        <div
          onClick={handleDivClick}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          ref={FileDropRef}
          className="border-2 border-dashed border-blue-400 rounded-lg p-6 text-center cursor-pointer w-[45%] align-middle hover:bg-gray"
        >
          <img
            src={image}
            alt="upload icon"
            className="mx-auto mb-4 h-[100px]"
          />
          <p className="text-zinc-500">
            Drag and drop or click to upload a PDF file
          </p>
          <input
            type="file"
            accept="application/pdf"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
      <FileUploaderRegular
        className="hidden"
        onChange={() => {}}
        pubkey="296fede39e3b73aa3b43"
      />
    </div>
  );
};

export default Upload;
