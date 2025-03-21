import ChatIcon from "@/components/icons/ChatIcon.tsx";
import {useState} from "react";

export default function ChatPanel() {
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            <div>

            </div>
            <button className="rounded-full bg-white p-4 shadow-xl w-fit hover:bg-blue-500 hover:text-white"
                    onClick={() => {
                        setShowChat(true)
                    }}>
                <ChatIcon/>
            </button>
        </>
    )
}