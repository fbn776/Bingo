import ReactionPanel from "@/components/ReactionPanel.tsx";
import ChatPanel from "@/components/ChatPanel.tsx";
import {useState} from "react";

export function BottomPanel() {
    const [reactionVisible, setReactionVisible] = useState(false);
    const [showChat, setShowChat] = useState(false);

    return <div className="w-full text-right pb-3 pr-3 flex flex-col gap-2 items-end">
        <ReactionPanel
            visible={reactionVisible}
            setVisible={setReactionVisible}
            setShowChat={setShowChat}
        />
        <ChatPanel
            showChat={showChat}
            setShowChat={setShowChat}
            setShowReaction={setReactionVisible}
        />
    </div>;
}