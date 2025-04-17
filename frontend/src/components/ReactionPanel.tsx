import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import useSocketCtx from "@/lib/context/socket/useSocketCtx.ts";
import sendMsg from "@/lib/utils.ts";
import {IReaction} from "../../../common/types.ts";
import fireReaction from "@/lib/fireReaction.ts";
import {Smile} from "lucide-react";
import {REACTION_EMOJI} from "@/data/REACTION_EMOJI.ts";
import {StateSetter} from "@/lib/types.ts";

const EMOJI_KEYS = Object.keys(REACTION_EMOJI);

export default function ReactionPanel({visible, setVisible, setShowChat}: {
    setShowChat: StateSetter<boolean>,
    visible: boolean,
    setVisible: StateSetter<boolean>
}) {
    const {youAre, gameID} = useCurrGameCtx();
    const {ws} = useSocketCtx();

    return <div className={`relative reaction-cont ${visible ? 'active' : ''}`}>
        <div
            className="panel absolute h-full bg-gray-50 w-fit right-[calc(100%-30px)] z-0 shadow rounded-l-full pr-[40px] max-w-[300px] overflow-x-scroll scrollbar-hidden pl-5 flex items-center gap-2 text-2xl">
            {EMOJI_KEYS.map((reactions, i) => {
                return <button key={i} className="hover:scale-125 transition-transform" onClick={() => {
                    sendMsg<IReaction>(ws!, {
                        gameID: gameID,
                        by: youAre!,
                        type: "reaction",
                        emoji: reactions
                    });

                    fireReaction("bottom", reactions, 1, 500);
                }}>
                    {reactions}
                </button>
            })}
        </div>
        <button className="open-btn rounded-full bg-white p-4 shadow-xl w-fit relative z-10 hover:bg-blue-500 hover:text-white"
                onClick={() => {
                    setVisible(p => !p);
                    setShowChat(p => {
                        if (p) {
                            return false;
                        } else {
                            return false;
                        }
                    });
                }}
        >
            <Smile />
        </button>
    </div>
}