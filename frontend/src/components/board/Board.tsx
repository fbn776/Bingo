import {useState} from "react";
import {timeAgo} from "@/lib/utils.ts";
import EditIcon from "@/components/icons/EditIcon.tsx";
import PlusIcon from "@/components/icons/PlusIcon.tsx";
import {CreateBoardModal} from "@/components/board/CreateBoardModal.tsx";
import {IconHeart, IconHeartFilled, IconX} from "@tabler/icons-react";
import {StateSetter} from "@/lib/types.ts";
import {useGameCtx} from "@/lib/context/GameCtx.ts";


export default function Board({setShowWindow}: {
    setShowWindow: StateSetter<boolean>
}) {
    const [dialogOpen, setDialogOpen] = useState(false);
    const {boards, setBoards, selectedBoard, setSelectedBoard} = useGameCtx();

    console.log(selectedBoard);

    return <>
        <main className="fixed inset-0 flex size-full items-center justify-center">
            <div className="fixed inset-0 bg-black bg-opacity-60 -z-20" onClick={() => {
                setShowWindow(false);
            }}></div>
            <div className="bg-white rounded-lg shadow-2xl p-4 w-[700px] max-sm:w-[380px]">
                <h1 className="text-2xl mb-2">
                    Customize your board pattern
                    <button className="float-end hover:text-red-500 hover:scale-110" onClick={() => {
                        setShowWindow(false);
                    }}>
                        <IconX/>
                    </button>
                </h1>
                <hr/>

                <div className="m-h-[200px] max-h-[500px] overflow-y-auto mt-4 space-y-2">
                    {

                        boards.length === 0 ? <p className="text-center mt-4 opacity-50">No saved patterns :(</p> :
                            boards.map((cell, j) => {

                                console.log(cell);
                                return <div key={j}
                                            className="px-3 py-2 border-2 rounded flex items-center justify-between ">
                                    <div>
                                        <h2 className="text-xl">{cell.title}</h2>
                                        <h3 className="text-sm opacity-70">{timeAgo(cell.timestamp)}</h3>
                                    </div>
                                    <div className="flex gap-5">
                                        <button onClick={() => {
                                            setSelectedBoard(cell);
                                        }} className="hover:text-red-500">
                                            {selectedBoard?.id === cell.id ? <IconHeartFilled/> : <IconHeart/>}
                                        </button>


                                        <button className="hover:text-blue-500" onClick={() => {

                                        }}>
                                            <EditIcon/>
                                        </button>
                                    </div>
                                </div>
                            })
                    }
                </div>
                <button
                    onClick={() => setDialogOpen(true)}
                    className="mt-5 float-end flex items-center gap-2 shadow bg-blue-500 px-2 py-2 rounded text-white hover:bg-blue-700 hover:scale-105">
                    New <PlusIcon size="18"/>
                </button>
            </div>
        </main>
        <CreateBoardModal dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} setBoards={setBoards}/>
    </>
}