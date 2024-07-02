import { FaFilePdf, FaRegEye } from "react-icons/fa";
import { TfiWrite } from "react-icons/tfi";

const SectionFeatures = () => {
  return (
    <div className="max-w-[72rem] mx-auto bg-white rounded-lg  p-8">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-2">
          {/* Unleash the Power: Features That{" "} */}
          Everything you need to create
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-600">
            comprehensive exams
          </span>
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaFilePdf className="text-4xl p-2" />

            <h2 className="text-xl font-semibold">Create an exam in minutes</h2>
          </div>
          <p className="text-zinc-600">by uploading an existing exam as PDF</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <TfiWrite className="text-4xl p-2" />

            <h2 className="text-xl font-semibold">
              Collect the exams your way
            </h2>
          </div>
          <p className="text-zinc-600">
            . Stand alone or through an LMS. Online or offline. With or without
            handwritten attachments.
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center mb-4">
            <FaRegEye className="text-4xl p-2" />

            <h2 className="text-xl font-semibold">Real-time monitoring</h2>
          </div>
          <p className="text-zinc-600">
            Feel in control over the exam progress by following the progress of
            the students during an exam.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionFeatures;
