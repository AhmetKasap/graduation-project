import Found from "@/components/Found";
import Searching from "@/components/Searching";


export default function Home() {
    return (
        <div className="w-[80%] mx-auto flex flex-row gap-4 ">
            <div className="basis-1/2 ml-24"> <Searching/></div>
            <div className="basis-1/2"> <Found/></div>

        

        </div>
    )
}   
