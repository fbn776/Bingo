import {useState} from "react";
import {timeAgo} from "@/lib/utils.ts";
import {useGameCtx} from "@/lib/context/gameCtx.tsx";
import EditIcon from "@/components/icons/EditIcon.tsx";
import PlusIcon from "@/components/icons/PlusIcon.tsx";
import {CreateBoardModal} from "@/pages/board/CreateBoardModal.tsx";



export default function Board() {
    const [dialogOpen, setDialogOpen] = useState(true);

    const {boards, setBoards} = useGameCtx();

    return <>
        <main className="flex size-full bg-black bg-opacity-60 items-center justify-center">
            <div className="bg-white rounded-lg shadow-2xl p-4 w-[700px] max-sm:w-[380px]">
                <h1 className="text-2xl mb-2">Customize your board pattern</h1>
                <hr/>

                <div className="m-h-[200px] max-h-[500px] overflow-y-auto mt-4 space-y-2">
                    {
                        boards.map((cell, j) => {
                            return <div key={j}
                                        className="px-3 py-2 border-2 rounded flex items-center justify-between ">
                                <div>
                                    <h2 className="text-xl">{cell.title}</h2>
                                    <h3 className="text-sm opacity-70">{timeAgo(cell.timestamp)}</h3>
                                </div>
                                <button className="hover:text-blue-500" onClick={() => {

                                }}>
                                    <EditIcon/>
                                </button>
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