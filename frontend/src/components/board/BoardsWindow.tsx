import {useEffect, useState} from "react";
import {timeAgo} from "@/lib/utils.ts";
import EditIcon from "@/components/icons/EditIcon.tsx";
import PlusIcon from "@/components/icons/PlusIcon.tsx";
import {CreateBoardModal} from "@/components/board/CreateBoardModal.tsx";
import {TBoard, useAppCtx} from "@/lib/context/app/useAppCtx.ts";
import {toast} from "sonner";
import {Heart, Trash2, X} from "lucide-react";


export default function BoardsWindow() {
    const [dialogOpen, setDialogOpen] = useState(false);
    const {boards, setBoards, selectedBoard, setSelectedBoard, showBoardsWindow, setShowBoardsWindow} = useAppCtx();
    const [editData, setEditData] = useState<TBoard | null>(null);

    console.log("BoardsWindow", {boards, selectedBoard, showBoardsWindow});

    useEffect(() => {
        if (!selectedBoard) {
            toast.info("Select or create a board to start playing");
        }
    }, [selectedBoard]);

    return (!selectedBoard || showBoardsWindow) && <>
        <main className="fixed inset-0 flex size-full items-center justify-center z-[999]">
            <div className="fixed inset-0 bg-black bg-opacity-60 -z-20" onClick={() => {
                setShowBoardsWindow(false);
            }}></div>
            <div className="bg-white rounded-lg shadow-2xl p-4 w-[700px] max-sm:max-w-[90%]">
                <h1 className="text-2xl mb-2">
                    Customize your board pattern
                    <button className="float-end hover:text-red-500 hover:scale-110" onClick={() => {
                        if (!selectedBoard) {
                            toast.error("Create or select a board to continue");
                            return;
                        }
                        setShowBoardsWindow(false);
                    }}>
                        <X/>
                    </button>
                </h1>
                <hr/>

                <div className="m-h-[200px] max-h-[500px] overflow-y-auto mt-4 space-y-2">
                    {

                        boards.length === 0 ? <p className="text-center mt-4 opacity-50">No saved patterns :(</p> :
                            boards.map((cell, j) => {
                                const isSelected = selectedBoard?.id === cell.id;
                                return <div key={j}
                                            className="px-3 py-2 border-2 rounded flex items-center justify-between ">
                                    <div>
                                        <h2 className="text-xl">{cell.title}</h2>
                                        <h3 className="text-sm opacity-70">{timeAgo(cell.timestamp)}</h3>
                                    </div>
                                    <div className="flex gap-5">
                                        <button onClick={() => {
                                            if (!isSelected) {
                                                setSelectedBoard(cell);
                                            }
                                        }}
                                                className={`hover:text-red-500 ${isSelected ? 'text-red-500' : 'text-black'}`}>
                                            {isSelected ? <Heart className="fill-red-500"/> : <Heart/>}
                                        </button>

                                        <button className="hover:text-blue-500" onClick={() => {
                                            setEditData(cell);
                                            setDialogOpen(true);
                                        }}>
                                            <EditIcon/>
                                        </button>

                                        <button className="hover:text-red-500" onClick={() => {
                                            if (isSelected) {
                                                toast.error("You can't delete the selected board");
                                                return;
                                            }

                                            if (confirm("Are you sure you want to delete this board?")) {
                                                setBoards(boards.filter((board) => board.id !== cell.id));
                                                toast.success("Board deleted successfully");
                                            }
                                        }}>
                                            <Trash2/>
                                        </button>
                                    </div>
                                </div>
                            })
                    }
                </div>
                <button
                    onClick={() => {
                        setEditData(null);
                        setDialogOpen(true)
                    }}
                    className="mt-5 float-end flex items-center gap-2 shadow bg-blue-500 px-2 py-2 rounded text-white hover:bg-blue-700 hover:scale-105">
                    New <PlusIcon size="18"/>
                </button>
            </div>
        </main>
        <CreateBoardModal
            dialogOpen={dialogOpen}
            setDialogOpen={setDialogOpen}
            setBoards={setBoards}
            edit={editData}
            setEdit={setEditData}
        />
    </>
}