
interface propsType {
    icon: React.ReactNode
    title: string
    text: string
}

const Feature = (props: propsType) => {
    return (
        <div  className="flex flex-col w-[80%] m-auto p-3  md:w-[30%] h-[400px] gap-[20px] border-[1px] shadow-lg">
            <div className="h-[100px] flex items-center justify-center">
                {props.icon}
            </div>
            <h2 className="font-Geomanist text-2xl text-center md:h-[65px]">
                {props.title}
            </h2>
            <p className="font-Geomanist text-base text-[#38373d] text-center">
                {props.text}
            </p>
        </div>)
}

export default Feature
