import {IconSend2, IconX} from "@tabler/icons-react";

function Message({name, message, time, align}: {
    name: string,
    message: string,
    time: string,
    align: "left" | "right"
}) {
    return <div className={`w-full ${align === "left" ? "" : "flex justify-end"}`}>
        <div className="messages">
            <div className="name">{name}</div>
            <p className="message">{message}</p>
            <div className="time">{time}</div>
        </div>
    </div>
}

export default function GameChat() {
    return <main
        className="fixed z-50 top-0 bottom-0 bg-black bg-opacity-60 flex flex-col w-[30%] gap-5 right-0 shadow-2xl border-l-2 border-l-gray-500">
        <div className="flex-1 flex items-end flex-col-reverse p-2 gap-4">
            <Message name="Rambo Chachochan" message="I'm fine, how are you" time="10:14pm" align="left"/>
            <Message name="Febin Nelson P" message="Hello there how are you" time="10:12pm" align="right"/>
        </div>
        <div className="flex px-2 py-2 gap-1">
            <button
                className="rounded-md p-1 bg-red-500 text-white shadow aspect-square h-full flex justify-center items-center">
                <IconX/>
            </button>
            <input type="text" className="flex-1 rounded-md px-3 py-2" placeholder="Enter message..."/>
            <button
                className="rounded-md p-1 shadow aspect-square h-full flex justify-center items-center bg-green-500 text-green-900">
                <IconSend2/>
            </button>
        </div>
    </main>
}