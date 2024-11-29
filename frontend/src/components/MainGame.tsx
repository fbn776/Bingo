import FilledUserIcon from "@/components/icons/FilledUserIcon.tsx";
import UserIcon from "@/components/icons/UserIcon.tsx";
import ChatIcon from "@/components/icons/ChatIcon.tsx";

const arr: number[] = [];

let k = 1;
for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
        arr.push(k++);
    }
}

export function MainGame() {
    return <div className="size-full flex flex-col justify-between items-center">
        <div className="flex items-center justify-between w-full">
            <div className="rounded-br-xl p-5 w-[40%] bg-blue-200 shadow-xl">
                <div className="text-3xl flex items-center gap-1">
                    <FilledUserIcon size="30"/> <span>Tintu</span>
                </div>
                <span className="text-gray-500 font-bold">#jbbd9bjB</span>
            </div>


            <div className="bg-white rounded-bl-xl p-5 w-[40%] text-right shadow-xl">
                <div className="text-3xl flex items-center gap-1">
                    <span>Chotta</span><UserIcon size="30"/>
                </div>
                <span className="text-gray-500 font-bold">#jbbd9bjB</span>
            </div>
        </div>

        <div className="game-board grid grid-cols-5 grid-rows-5">
            {arr.map((cell, j) => {
                return <button key={j}>{cell}</button>
            })}
        </div>

        <div className="text-right w-full pb-3 pr-3">
            <button className="rounded-full bg-white p-4 shadow-xl">
                <ChatIcon/>
            </button>
        </div>
    </div>
}