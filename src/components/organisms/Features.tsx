import { FaPencilAlt } from "react-icons/fa";
import { PiExamBold } from "react-icons/pi";
import Feature from "../molecules/Feature";
import { GiTimeBomb } from "react-icons/gi";
import { GrTestDesktop } from "react-icons/gr";
import { FaFilePdf } from "react-icons/fa6";
import { MdOutlineWeb } from "react-icons/md";
import { TfiHarddrives } from "react-icons/tfi";

function Features() {
  const featuresItems = [
    {
      icon: <PiExamBold className="text-6xl text-[#FB8500] " />,
      title: "Correction automatique",
      text: "faire la correction pour vous",
    },
    {
      icon: <GiTimeBomb className="text-6xl text-[#FB8500]" />,
      title: "Controle en temps reel",
      text: "Feel in control over the exam progression by following the progress of the students during an exam.",
    },
    {
      icon: <GrTestDesktop className="text-6xl text-[#FB8500]" />,
      title: "Examens riches en contenu",
      text: "riche ensemble d'outils integres dans l'experience de l'examen",
    },
    {
      icon: <FaFilePdf className="text-6xl text-[#FB8500]" />,
      title: "Telecharger des examens PDF existants",
      text: "Take the PDF of a pre-existing exam you want to use, upload it to Exam.net, and get it live to your students in less than an hour.",
    },
    {
      icon: <MdOutlineWeb className="text-6xl text-[#FB8500]" />,
      title: "Tous les outils dans la fenetre d'examen",
      text: "With all tools and resources accessible in the student’s exam window, students can focus on their exams with limited distractions and increased security.",
    },
    {
      icon: <TfiHarddrives className="text-6xl text-[#FB8500]" />,
      title: "Des examens resistants",
      text: "Parfois, avec la technologie, les choses ne se passent pas souvent comme prevu. Qu'il s'agisse d'un appareil  court de piles ou d'une perte d'Internet, nous avons ce qu'il vous faut.",
    },
  ];
  return (
    <div className="h-[100%] flex flex-col items-center py-[20px] gap-[50px] m-auto max-w-[72rem] ">
      <div className="rounded-full bg-[#ffffff1a] w-[84px] h-[84px] flex items-center justify-center shadow-2xl">
        <div className="bg-white rounded-full w-[60px] h-[60px] flex items-center justify-center shadow-lg">
          <FaPencilAlt className="text-[#FB8500] text-4xl" />
        </div>
      </div>

      <h1 className="font-Geomanist text-4xl text-center">
        Tout ce qu'il vous faut
      </h1>

      <div className=" w-[100%] md:flex-row md:flex-wrap  flex flex-col items-center justify-center md:gap-[20px] gap-[10px]">
        {featuresItems.map((item) => (
          <Feature
            key={Math.random()}
            icon={item.icon}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </div>
  );
}

export default Features;
