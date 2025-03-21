import FilledUserIcon from "@/components/icons/FilledUserIcon.tsx";
import UserIcon from "@/components/icons/UserIcon.tsx";
import useCurrGameCtx from "@/lib/context/currentGame/useCurrGameCtx.ts";
import Spinner from "@/components/ui/spinner.tsx";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import {GameCreateDialog} from "@/components/GameCreateDialog.tsx";
import useSocketCtx from "@/lib/context/socket/useSocketCtx.ts";
import sendMsg, {mapUserBoardToBoardState} from "@/lib/utils.ts";
import {
    ICancelReplay,
    IContinueToReplay,
    IPlayerMove, IReaction,
    IReplayGame,
    IReplayGameAck,
    ISayBingo
} from "../../../../common/types.ts";
import {ArrowLeft, RotateCcw} from "lucide-react";
import Confetti from 'react-confetti'
import {gameEvents} from "@/logic/init.ts";
import {useAppCtx} from "@/lib/context/app/useAppCtx.ts";
import ReactionPanel from "@/components/ReactionPanel.tsx";
import fireReaction from "@/lib/fireReaction.ts";
import ChatPanel from "@/components/ChatPanel.tsx";

function HUD({youAre, guest, host, currentTurn}: {
    youAre: "guest" | "host",
    guest: string,
    host: string,
    currentTurn: "guest" | "host"
}) {
    return <div className="flex items-start justify-between w-full">
        <div
            className={`rounded-br-xl p-5 w-[40%] max-sm:w-[48%] ${currentTurn === youAre ? 'bg-blue-200' : 'bg-white'} shadow-xl`}>
            <div className="text-3xl flex items-center gap-1">
                {currentTurn === youAre ? <FilledUserIcon size="30"/> : <UserIcon size="30"/>}
                <span className="truncate max-sm:text-xl">{youAre === 'guest' ? guest : host}</span>
            </div>
        </div>

        <div
            className={`rounded-bl-xl p-5 w-[40%] max-sm:w-[48%] shadow-xl ${currentTurn !== youAre ? 'bg-blue-200' : 'bg-white'}`}>
            <div className="text-3xl flex items-center gap-1 justify-end">
                <span
                    className="truncate max-sm:text-xl text-right">{youAre === 'guest' ? host : (guest || '-------')}</span>
                {currentTurn !== youAre ? <FilledUserIcon size="30"/> : <UserIcon size="30"/>}
            </div>
        </div>
    </div>

}

export function MainGame() {
    const {selectedBoard} = useAppCtx();
    const {wonBy, currentTurn, guest, host, youAre, gameID, noOfBingo, currBoardState, setCurrCtx} = useCurrGameCtx();
    const navigate = useNavigate();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [showReplayWindow, setShowReplayWindow] = useState(false);
    const [isWaiting, setIsWaiting] = useState(false);
    const {ws} = useSocketCtx();

    useEffect(() => {
        if (!host) {
            navigate('/');
            return;
        }
    }, []);

    useEffect(() => {
        setDialogOpen(false);
    }, [guest]);

    useEffect(() => {
        const ID1 = gameEvents.on("ask-replay", () => {
            setShowReplayWindow(true);
            setIsWaiting(false);
        });

        const ID2 = gameEvents.on('cancel-replay', () => {
            setShowReplayWindow(false);
            setIsWaiting(false);
        });

        const ID3 = gameEvents.on('reset-game', (e) => {
            const data = e.detail.data as IContinueToReplay;

            setCurrCtx(prev => ({
                ...prev,
                currBoardState: mapUserBoardToBoardState(selectedBoard!),
                currentTurn: data.currTurn,
                wonBy: null,
                noOfBingo: 0,
                bingos: []
            }));

            setIsWaiting(false);
            setShowReplayWindow(false);
        });

        const ID4 = gameEvents.on('reaction', (e) => {
            const data = e.detail.data as IReaction;
            console.log("EMOJI_DATA:", data)
            fireReaction("right", data.emoji, 1, 500);
        })

        return () => {
            gameEvents.remove(ID1);
            gameEvents.remove(ID2);
            gameEvents.remove(ID3);
            gameEvents.remove(ID4);
        }
    }, []);

    return <>
        {!guest &&
            <div className="bg-black fixed z-50 inset-0 flex justify-center items-center bg-opacity-60 flex-col">
                <Spinner className="size-[100px] text-white"/>
                <h1 className="text-white text-2xl mt-10">Waiting for a player to join</h1>
                <button onClick={() => setDialogOpen(true)} className="button bg-blue-500 shadow mt-3">
                    Share Game
                </button>
            </div>
        }

        {wonBy &&
            <div
                className="fixed bg-opacity-60 bg-black backdrop-blur-md inset-0 z-50 flex flex-col items-center justify-center text-white">
                <h2 className={`text-4xl ${wonBy === youAre ? "text-green-500" : "text-red-500"}`}>{wonBy === youAre ? "You Won" : "You Lost"}</h2>
                {wonBy === youAre && <Confetti/>}


                <button className="shadow-2xl px-8 py-2 bg-blue-500 rounded-md text-center mt-8 flex gap-1"
                        onClick={() => {
                            setShowReplayWindow(true);
                            setIsWaiting(true);
                            sendMsg<IReplayGame>(ws!, {
                                type: "replay-game",
                                by: youAre!,
                                gameID
                            })
                        }}
                >
                    <RotateCcw />
                    Replay
                </button>

                <Link to="/" className="px-4 py-2 bg-red-500 rounded-md text-center mt-5 flex gap-1">
                    <ArrowLeft/> Home
                </Link>
            </div>
        }

        {
            showReplayWindow &&
            <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center">
                <div className="bg-white shadow rounded-md p-5 max-sm:w-[90%] w-1/3 max-lg:w-1/2">
                    {isWaiting ?
                        <>
                            <h1 className="text-2xl mb-3">
                                Waiting for the other player
                            </h1>
                            <hr/>
                            <div className="mt-4 flex justify-center">
                                <Spinner className="size-[50px] opacity-50 mb-5"/>
                            </div>
                            <button className="w-full rounded-md bg-red-500 py-2 text-white" onClick={() => {
                                sendMsg<ICancelReplay>(ws!, {
                                    type: "cancel-replay",
                                    gameID,
                                    by: youAre!
                                });
                                setShowReplayWindow(false);
                            }}>
                                Cancel
                            </button>
                        </> :
                        <>
                            <h1 className="text-2xl mb-3">
                                Replay the game?
                            </h1>
                            <hr/>
                            <p className="mt-4">
                                Febin asks if you want to replay the game. Do you want to replay the game?
                            </p>
                            <button className="mt-7 w-full rounded-md bg-blue-500 py-2 text-white mb-3" onClick={() => {
                                sendMsg<IReplayGameAck>(ws!, {
                                    type: "replay-reply",
                                    gameID,
                                    ack: 'yes',
                                    by: youAre!
                                })
                            }}>
                                Yes
                            </button>
                            <button className="w-full rounded-md bg-red-500 py-2 text-white" onClick={() => {
                                sendMsg<ICancelReplay>(ws!, {
                                    type: "cancel-replay",
                                    gameID,
                                    by: youAre!
                                });
                                setShowReplayWindow(false);
                            }}>
                                No
                            </button>
                        </>
                    }
                </div>
            </div>
        }

        <div className="size-full flex flex-col justify-between items-center">
            <HUD youAre={youAre!} guest={guest} host={host} currentTurn={currentTurn!}/>
            <div className="relative rounded-md flex justify-center">
                {currentTurn !== youAre && <div className="absolute size-full z-10 cursor-wait bg-black opacity-20"/>}
                {currentTurn !== youAre &&
                    <div className="flex absolute top-[-50px] bg-white rounded-md shadow px-4 py-2 h-[40px] w-fit">
                        <Spinner className="mr-2"/>
                        Waiting for
                        <span className="bg-gray-300 rounded-md mx-1 px-1">
                            {(currentTurn === "guest" ? guest : host).trim().substring(0, 10)}
                        </span>
                        to play
                    </div>
                }
                <div className="game-board grid grid-cols-5 grid-rows-5">
                    {currBoardState.map((cell, j) => {
                        return <button
                            className={cell.selected ? "selected" : ""} key={j}
                            onClick={() => {
                                if (cell.selected || currentTurn !== youAre)
                                    return;

                                setCurrCtx(prev => ({
                                    ...prev,
                                    currentTurn: prev.currentTurn === "guest" ? "host" : 'guest',
                                    currBoardState: prev.currBoardState.map(item => {
                                        if (item.num === cell.num) {
                                            return {
                                                num: item.num,
                                                selected: true
                                            }
                                        }
                                        return item;
                                    })
                                }));

                                sendMsg<IPlayerMove>(ws!, {
                                    gameID,
                                    type: "move",
                                    selected: cell.num,
                                    by: youAre!
                                });
                            }}
                            disabled={cell.selected || currentTurn !== youAre}
                        >
                            {cell.num}
                        </button>
                    })}
                </div>
            </div>

            <div className="text-5xl absolute bottom-[40px] max-sm:bottom-[80px] bingo-text">
                <span className="selected">{"BINGO".substring(0, noOfBingo)}</span>
                {"BINGO".substring(noOfBingo)}

                {noOfBingo >= 5 &&
                    <button className="say-bingo" onClick={() => {
                        sendMsg<ISayBingo>(ws!, {
                            type: "say-bingo",
                            by: youAre!,
                            gameID: gameID!,
                        })
                    }}>
                        Say Bingo
                    </button>
                }
            </div>

            <div className="w-full text-right pb-3 pr-3 flex flex-col gap-2 items-end">
                <ReactionPanel/>
                <ChatPanel/>
            </div>
        </div>

        {dialogOpen && <GameCreateDialog setClose={setDialogOpen}/>}
    </>
}