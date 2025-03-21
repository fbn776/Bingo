import {useAppCtx} from "@/lib/context/app/useAppCtx.ts";
import Special from "@/components/special/special.tsx";
import {useEffect, useState} from "react";
import {checkIfSpecial} from "@/lib/utils.ts";
import {X} from "lucide-react";


const SPECIAL_ENABLED = checkIfSpecial();
const SPECIAL_NAMES = ((import.meta.env.VITE_SPECIAL_NAME_LIST as string) || "").split(",").map(i => i.trim().toLowerCase());

export function AskForName() {
    const {username, setUsername, showNameWindow, setShowNameWindow, shownSpecial} = useAppCtx();
    const [special, setSpecial] = useState(false);
    useEffect(() => {
        if (!shownSpecial) {
            if (SPECIAL_NAMES.length > 0 && SPECIAL_NAMES.includes((username || '').toLowerCase())) {
                setSpecial(true);
            }
        }
    }, [shownSpecial, username]);


    return <>
        {((username === null) || showNameWindow) &&
            <main className="fixed inset-0 size-full bg-black bg-opacity-50 z-[1000] flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-2xl p-4 max-sm:max-w-[90%]">
                    <h1 className="text-2xl mb-2 flex items-center justify-between">
                        {username ? "Update name" : "Enter your name"}
                        <button className="hover:text-red-500 hover:scale-110" onClick={() => {
                            setShowNameWindow(false);
                        }}>
                            <X/>
                        </button>
                    </h1>
                    <hr/>
                    <form className="flex flex-col mt-4" onSubmit={(e) => {
                        e.preventDefault();
                        const name = (e.currentTarget.elements.namedItem("name") as HTMLInputElement).value;
                        setUsername(name);

                        if (showNameWindow) {
                            setShowNameWindow(false);
                        }
                    }}>
                        <label htmlFor="name">Name</label>
                        <input type="text" name="name" className="border-2 px-2 py-3 rounded-lg mt-1 mb-3"
                               placeholder="Enter your name" required defaultValue={username || ''}/>
                        <button className="mt-5 button bg-blue-500 hover:bg-blue-700 hover:scale-95">
                            {username ? "Update" : "Submit"}
                        </button>
                    </form>
                </div>
            </main>
        }

        {(SPECIAL_ENABLED && special) && <Special setSpecial={setSpecial}/>}
    </>
}