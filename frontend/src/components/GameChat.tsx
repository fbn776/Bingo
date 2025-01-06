import {IconSend2, IconX} from "@tabler/icons-react";
import {useState} from "react";

function Message({name, message, time, msgBy}: {
    name: string,
    message: string,
    time: string,
    msgBy: 'you' | 'other'
}) {
    return <div className='w-full message-cont' data-msg-by={msgBy}>
        <div className="messages">
            <div className="name">{name}</div>
            <p className="message">{message}</p>
            <div className="time">{time}</div>
        </div>
    </div>
}

interface IMessageType {
    by: "you" | "other";
    name: string;
    msg: string;
    time: string;
}

export default function GameChat() {
    const [messages, ] = useState<IMessageType[]>([]);

    return <main
        className="fixed z-50 top-10 bottom-10 right-10 bg-black bg-opacity-60 flex flex-col w-80 gap-5 shadow-2xl border-l-2 border-l-gray-500">
        <div className="flex-1 flex items-end flex-col-reverse p-2 gap-4">
            {
                messages.map((msg, i) => {
                    return <Message name={msg.name} message={msg.msg} time={msg.time} msgBy="you" key={i}/>
                })
            }
        </div>
        <form className="w-full flex px-2 py-2 gap-1" onSubmit={e => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const message = formData.get("message");
            console.log("Submitted value:", message);
        }}>
            <button
                type="button"
                className="rounded-md p-1 bg-red-500 text-white shadow aspect-square h-full flex justify-center items-center">
                <IconX/>
            </button>
            <input type="text" className="inline-block flex-1 rounded-md px-3 py-2" placeholder="Enter message..." name="message"/>
            <button
                className="rounded-md p-1 shadow aspect-square h-full flex justify-center items-center bg-green-500 text-green-900">
                <IconSend2/>
            </button>
        </form>
    </main>
}