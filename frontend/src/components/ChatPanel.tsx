import ChatIcon from "@/components/icons/ChatIcon.tsx";
import {useEffect, useRef, useState} from "react";
import {Send} from "lucide-react";
import sendMsg, {cn} from "@/lib/utils.ts";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import {gameEvents} from "@/logic/init.ts";
import {IChatMsg} from "../../../common/types.ts";
import useSocketCtx from "@/lib/context/socket/useSocketCtx.ts";
import {StateSetter} from "@/lib/types.ts";
import {useMediaQuery} from "usehooks-ts";
import {Drawer, DrawerContent,} from "@/components/ui/drawer"


interface ChatMsg {
    message: string;
    sender: "you" | "other";
}


export default function ChatPanel({showChat, setShowChat, setShowReaction}: {
    showChat: boolean, setShowChat: StateSetter<boolean>,
    setShowReaction: StateSetter<boolean>
}) {
    const bottomScrollRef = useRef<HTMLDivElement>(null);
    const bottomScrollMobileRef = useRef<HTMLDivElement>(null);
    const mobileInput = useRef<HTMLInputElement>(null);
    const desktopInput = useRef<HTMLInputElement>(null);
    const [messages, setMessages] = useState<ChatMsg[]>([]);
    const [unreadMsg, setUnreadMsg] = useState<ChatMsg[]>([]);
    const btnRef = useRef<HTMLButtonElement>(null);
    const ringRef = useRef<HTMLAudioElement | null>(null);
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const {ws} = useSocketCtx();
    const {youAre, gameID, guest, host} = useCurrGameCtx();

    useEffect(() => {
        ringRef.current = new Audio('/ring.mp3');
        ringRef.current.preload = 'auto';
    }, []);

    useEffect(() => {
        if (showChat) {
            setUnreadMsg([]);
        }

        const id = gameEvents.on("chat", (e) => {
            const data = e.detail.data as IChatMsg;

            setMessages(p => [...p, {
                message: data.message,
                sender: data.by === youAre ? "you" : "other"
            }]);

            if (!showChat) {
                setUnreadMsg(p => [...p, {
                    message: data.message,
                    sender: data.by === youAre ? "you" : "other"
                }]);

                if (navigator.vibrate)
                    navigator.vibrate(200);

                if (btnRef.current) {
                    btnRef.current.classList.add("shake");
                }
            }

            ringRef.current?.play();
        });

        const shakeEnd = () => {
            btnRef.current?.classList.remove("shake");
        }

        const refCopy = btnRef?.current;
        btnRef.current?.addEventListener("animationend", shakeEnd);

        return () => {
            refCopy?.removeEventListener("animationend", shakeEnd);
            gameEvents.remove(id);
        }
    }, [showChat, youAre]);

    useEffect(() => {
        if (bottomScrollRef.current) {
            bottomScrollRef.current.scrollIntoView({behavior: "smooth"});
        }

        if (bottomScrollMobileRef.current) {
            bottomScrollMobileRef.current.scrollTo({
                top: bottomScrollMobileRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    return (
        <div className="relative">
            {isDesktop ?
                <div
                    className={cn(
                        "transition-all origin-right opacity-0 scale-y-0 scale absolute h-full right-[calc(100%+10px)] w-[300px] scrollbar-hidden z-50",
                        showChat ? "scale-y-100 opacity-100" : ""
                    )}
                >
                    <div
                        className={cn(
                            "space-y-2 overflow-y-auto absolute bottom-16 w-full shadow bg-gray-50/80 border border-gray-800/40 p-4 rounded-2xl text-white min-h-[150px] max-h-[500px] scrollbar-hidden",
                            messages.length === 0 ? "flex items-center justify-center" : ""
                        )}

                        ref={bottomScrollMobileRef}
                    >
                        {messages.length === 0 ?
                            <p className="w-full text-center text-black/60">No messages found!</p> :
                            <>
                                {messages.map((msg) => {
                                    return <div
                                        className={cn("flex items-center gap-2", msg.sender === "you" ? "justify-end" : "justify-start")}>
                                        <div
                                            className={cn("p-2 bg-custom-primary/80 rounded-lg max-w-[80%] flex-1", msg.sender === "you" ? "text-right bg-custom-secondary/80 text-black" : "text-left")}>
                                            <span className="text-xs opacity-60">
                                                {msg.sender === "you" ? "You" : youAre === "host" ? guest : host}
                                            </span>
                                            <p>{msg.message}</p>
                                        </div>
                                    </div>
                                })}
                            </>
                        }
                    </div>

                    <form className="shadow w-full flex bg-white rounded-full overflow-hidden relative items-center"
                          onSubmit={(e) => {
                              e.preventDefault();
                              const formData = new FormData(e.target as HTMLFormElement);
                              const message = formData.get("message") as string;

                              if (message.trim() === "") return;
                              setMessages(p => [...p, {message, sender: "you"}]);

                              sendMsg<IChatMsg>(ws!, {
                                  gameID: gameID,
                                  message: message,
                                  type: "chat",
                                  by: youAre!
                              });

                              (e.target as HTMLFormElement).reset();

                              if (desktopInput.current) {
                                  desktopInput.current.value = "";
                                  desktopInput.current.focus();
                              }
                          }}>
                        <input className="flex-1 pl-6 pr-3 py-4 rounded-full w-[calc(100%-40px)]"
                               placeholder="Enter message" name="message" id="desktopViewInput" ref={desktopInput}/>
                        <button className="w-[40px] flex hover:text-blue-500">
                            <Send/>
                        </button>
                    </form>
                </div> :
                <Drawer open={showChat} onOpenChange={setShowChat}>
                    <DrawerContent className="flex flex-col h-[50%] pb-3 px-3 pt-0">
                        <div className="mt-3 pb-3 flex-1 overflow-y-auto scrollbar-hidden space-y-4 text-white"
                             id="testMainCont" ref={bottomScrollMobileRef}>
                            {messages.length === 0 ?
                                <p className="w-full text-center text-black/60">No messages found!</p> :
                                <>
                                    {messages.map((msg) => {
                                        return <div
                                            className={cn("flex items-center gap-2", msg.sender === "you" ? "justify-end" : "justify-start")}>
                                            <div
                                                className={cn("p-2 bg-custom-primary/80 rounded-lg max-w-[80%] flex-1", msg.sender === "you" ? "text-right bg-custom-secondary/80 text-black" : "text-left")}>
                                                <span className="text-xs opacity-60">
                                                    {msg.sender === "you" ? "You" : youAre === "host" ? guest : host}
                                                </span>
                                                <p>{msg.message}</p>
                                            </div>
                                        </div>
                                    })}
                                </>
                            }
                        </div>
                        <form
                            className="shadow w-full flex bg-gray-200 rounded-full overflow-hidden relative items-center"
                            onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target as HTMLFormElement);
                                const message = formData.get("message") as string;

                                if (message.trim() === "") return;
                                setMessages(p => [...p, {message, sender: "you"}]);

                                sendMsg<IChatMsg>(ws!, {
                                    gameID: gameID,
                                    message: message,
                                    type: "chat",
                                    by: youAre!
                                });

                                mobileInput.current?.focus();
                                (e.target as HTMLFormElement).reset();
                            }}>
                            <input className="bg-inherit flex-1 pl-6 pr-3 py-4 rounded-full w-[calc(100%-40px)]"
                                   placeholder="Enter message" name="message" ref={mobileInput}/>
                            <button className="w-[40px] flex hover:text-blue-500">
                                <Send/>
                            </button>
                        </form>
                    </DrawerContent>
                </Drawer>

            }

            <button
                ref={btnRef}
                className={cn(
                    "relative rounded-full bg-white p-4 shadow-xl w-fit hover:bg-blue-500 hover:text-white",
                    showChat && "bg-blue-500 text-white",
                )}
                onClick={() => {
                    setShowReaction(p => {
                        if (p) {
                            return false;
                        } else {
                            return false;
                        }
                    });

                    if (!showChat) {
                        mobileInput.current?.focus();
                        desktopInput.current?.focus();
                    }

                    setShowChat(p => !p);
                }}
            >
                <ChatIcon/>

                {!showChat && unreadMsg.length !== 0 &&
                    <div className="bg-red-500 absolute -top-1 -right-1 rounded-full text-white px-1">
                        {unreadMsg.length > 4 ? "4+" : unreadMsg.length}
                    </div>}
            </button>
        </div>
    )
}