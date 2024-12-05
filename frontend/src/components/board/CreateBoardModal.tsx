import {StateSetter} from "@/lib/types.ts";
import {useState} from "react";
import {CustomDialog} from "@/components/CustomDialog.tsx";
import {toast} from "sonner";
import {generateRandomID, shuffleArray} from "@/lib/utils.ts";
import RandomDiceIcon from "@/components/icons/RandomIcon.tsx";
import EraseIcon from "@/components/icons/EraseIcon.tsx";
import {TBoard} from "@/lib/context/GameCtx.ts";

const SourceArr = Array.from({length: 25}, (_, i) => i + 1);

export function CreateBoardModal({dialogOpen, setDialogOpen, setBoards}: {
    dialogOpen: boolean,
    setDialogOpen: (open: boolean) => void,
    setBoards: StateSetter<TBoard[]>
}) {
    const [boardPattern, setBoardPattern] = useState<number[]>(SourceArr);

    return <CustomDialog
        contentClassName="w-fit"
        title="Create Board"
        open={dialogOpen}
        setOpen={setDialogOpen}
        closeBtn={false}
    >
        <form className="flex flex-col mt-4" onSubmit={(e) => {
            e.preventDefault();

            const filled = boardPattern.every((cell) => !isNaN(cell));

            if (!filled) {
                toast.error("Please fill all the cells");
                return;
            }

            const correctBound = boardPattern.every((cell) => {
                if (cell >= 1 && cell <= 25) {
                    return true
                }

                toast.error("Please fill all the cells with numbers between 1 and 25");
                return false;
            });

            if (!correctBound) {
                return;
            }

            const title = (e.currentTarget.elements.namedItem("title") as HTMLInputElement).value;
            if (!title) {
                toast.error("Please enter a title");
                return;
            }

            setBoards((prev) => [...prev, {
                timestamp: Date.now(),
                title,
                board: boardPattern,
                id: generateRandomID()
            }]);

            setDialogOpen(false);
            toast.success("Board created successfully");
        }}>
            <label htmlFor="title">Board name</label>
            <input type="text" name="title" className="border-2 px-2 py-3 rounded-lg mt-1 mb-3"
                   placeholder="Enter the board title" required/>

            <label>Board: </label>
            <div className="my-4 grid grid-cols-5 grid-rows-5 items-center justify-items-center gap-y-4">
                {boardPattern.map((_, j) => {
                    return <input key={j}
                                  value={boardPattern[j]}
                                  onChange={(e) => {
                                      const newPattern = [...boardPattern];
                                      newPattern[j] = parseInt(e.target.value);
                                      setBoardPattern(newPattern);
                                  }}
                                  placeholder={`${j + 1}`} required
                                  className="border-2 rounded text-center aspect-square w-[60px] max-sm:w-[50px]"
                                  max={25} min={1} type="number"
                    />
                })}
            </div>
            <div className="flex justify-center gap-4 border-[1px] w-fit m-auto px-2 py-1 rounded-full mb-2">
                <button type="button" onClick={() => {
                    const newPattern = shuffleArray([...SourceArr]);
                    setBoardPattern(newPattern);
                }} className="hover:scale-105 hover:text-blue-500">
                    <RandomDiceIcon size="18"/>
                </button>
                <button type="button" onClick={() => {
                    setBoardPattern(new Array(25).fill(''));
                }} className="hover:scale-105 hover:text-blue-500">
                    <EraseIcon size="18"/>
                </button>
            </div>

            <div className="mt-2 flex gap-4 justify-start max-sm:justify-start max-sm:flex-col flex-row-reverse">
                <button type="submit" className="bg-blue-500 px-4 py-2 rounded text-white">Create</button>
                <button type="button" onClick={() => {
                    if (confirm("Are you sure you want to cancel?")) {
                        setDialogOpen(false);
                    }
                }} className="bg-red-500 px-4 py-2 rounded text-white">
                    Cancel
                </button>
            </div>
        </form>
    </CustomDialog>
}