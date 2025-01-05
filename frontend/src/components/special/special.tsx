import {useState} from "react";
import {CustomDialog} from "@/components/CustomDialog.tsx";
import {toast} from "sonner";
import {StateSetter} from "@/lib/types.ts";
import {TypeAnimation} from "react-type-animation";
import {confetti} from "@tsparticles/confetti";
import {useAppCtx} from "@/lib/context/app/useAppCtx.ts";


const CONFIRM_NAME = import.meta.env.VITE_CONFIRM_NAME;
const OTHER_NAME = import.meta.env.VITE_OTHER_NAME;

const SPECIAL_MSG1 = import.meta.env.VITE_SPECIAL_MSG1;
const SPECIAL_MSG2 = import.meta.env.VITE_SPECIAL_MSG2;
const SPECIAL_MSG3 = import.meta.env.VITE_SPECIAL_MSG3;

const EMOJI_LIST = [
    "🌸", "🌺", "🌼", "🌹", "🌷",
    "🌟", "✨", "🎀",
    "🍀",
];


function shoot(onEnd: () => void) {
    const end = Date.now() + 8 * 1000;

    (function frame() {
        confetti({
            particleCount: 1,
            angle: 60,
            spread: 55,
            origin: {x: 0},
            shapes: ["emoji"],
            shapeOptions: {
                emoji: {
                    value: EMOJI_LIST

                },
            },
            scalar: 2.5,
            disableForReducedMotion: true,
        });

        confetti({
            particleCount: 1,
            angle: 120,
            spread: 55,
            origin: {x: 1},
            shapes: ["emoji"],
            shapeOptions: {
                emoji: {
                    value: EMOJI_LIST,
                },
            },
            scalar: 2.5,
            disableForReducedMotion: true
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        } else {
            onEnd();
        }
    })();
}

export default function Special({setSpecial}: { setSpecial: StateSetter<boolean> }) {
    const [isConfoOpen, setIsConfoOpen] = useState(true);
    const [confirmed, setConfirmed] = useState(false);
    const [showMsgCount, setShowMsgCount] = useState(-1);
    const [end, setEnd] = useState(false);
    const {setShownSpecial} = useAppCtx();

    return (
        <>
            <div className="fixed z-50 inset-0 backdrop-blur-lg flex items-center justify-center">
                {confirmed &&
                    <main className="w-[50%] bg-white rounded-md shadow p-6 relative max-sm:w-[85%] max-sm:p-4">
                        <span className="absolute top-[-20px] left-[-20px] -rotate-45 text-4xl">
                            🎀
                        </span>
                        <h1 className="text-2xl">
                            Hello
                            <TypeAnimation
                                sequence={[
                                    CONFIRM_NAME,
                                    1000,
                                    OTHER_NAME,
                                    () => {
                                        setShowMsgCount(0);
                                    }
                                ]}
                                wrapper="span"
                                speed={50}
                                style={{
                                    marginLeft: '5px'
                                }}
                                cursor={false}
                            />
                        </h1>
                        <br/>

                        {showMsgCount >= 0 &&
                            <>
                                <TypeAnimation
                                    sequence={[
                                        1000,
                                        SPECIAL_MSG1,
                                        () => {
                                            setShowMsgCount(1);
                                        }
                                    ]}
                                    cursor={false}
                                    wrapper="span"
                                    speed={50}
                                />
                                <div className="block h-10"/>
                            </>
                        }
                        {showMsgCount >= 1 &&
                            <>
                                <TypeAnimation
                                    sequence={[
                                        1000,
                                        SPECIAL_MSG2,
                                        () => {
                                            setShowMsgCount(2);
                                        }
                                    ]}
                                    cursor={false}
                                    wrapper="span"
                                    speed={50}
                                />
                                <div className="block h-10"/>
                            </>
                        }
                        {
                            showMsgCount >= 2 && <>
                                <TypeAnimation
                                    sequence={[
                                        1000,
                                        SPECIAL_MSG3,
                                        () => {
                                            shoot(() => {
                                                setEnd(true);
                                            });
                                        }
                                    ]}
                                    cursor={false}
                                    wrapper="span"
                                    speed={50}
                                />
                            </>
                        }
                        {
                            end &&
                            <button className="mt-5 w-full py-2 rounded-md bg-green-500 text-white" onClick={() => {
                                setSpecial(false);
                                setShownSpecial(true);
                            }}>
                                Okay, bye✨
                            </button>
                        }
                    </main>
                }
            </div>

            <CustomDialog title={`Are you ____ ?`} open={isConfoOpen} setOpen={() => {
                toast.error("You must confirm your name");
            }} closeBtn={false}>
                <h2 className="relative text-xl text-center my-4 bg-pink-100 w-fit rounded-md px-3 py-1 mx-auto">
                    <span className="absolute -rotate-45 origin-center -top-2 -left-2">🎀</span>
                    {CONFIRM_NAME}
                </h2>

                <button onClick={() => {
                    setConfirmed(true);
                    setIsConfoOpen(false);
                    toast.success("Thank you for confirming you name!");
                }} className="bg-blue-500 text-white py-2 rounded-md">
                    Yes
                </button>
                <button onClick={() => {
                    setConfirmed(false);
                    setIsConfoOpen(false);
                    toast.info("Thank you for confirming you name!");
                    setSpecial(false);
                    setShownSpecial(true);
                }} className="bg-red-500 text-white py-2 rounded-md">
                    No
                </button>
            </CustomDialog>
        </>
    )
}