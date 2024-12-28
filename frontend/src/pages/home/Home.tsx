import {Link} from "react-router";
import {useAppCtx} from "@/lib/context/app/useAppCtx.ts";

export default function Home() {
    const {setShowBoardsWindow} = useAppCtx();

    return (
        <>
            <main className="flex flex-col items-center justify-center size-full">
                <div className="flex flex-col h-[60%]">
                    <div className="">
                        <h1 className="drop-shadow-xl bungee-spice-regular text-8xl">Bingo</h1>
                        <h2 className="meow-script-regular text-right text-3xl -mt-3">Play with your friends</h2>
                    </div>

                    <div className="flex-1 flex flex-col justify-center items-center gap-5">
                        <Link
                            className="primary-button w-[180px]"
                            to="/game/create"
                        >
                            Create a game
                        </Link>
                        <Link
                            className="primary-button w-[180px]"
                            to="/game/join"
                        >
                            Join a game
                        </Link>

                        <button
                            className="primary-button w-[180px]"
                            onClick={() => {
                                setShowBoardsWindow(true);
                            }}
                        >
                            Board
                        </button>
                    </div>
                </div>
            </main>
        </>
    );
}