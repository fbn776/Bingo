import {Outlet} from "react-router";
import Spinner from "@/components/ui/spinner.tsx";
import useSocketCtx from "@/lib/context/socket/useSocketCtx.ts";

export default function Game() {
    const {socketConnectionStatus} = useSocketCtx();

    return <>
        <main className="size-full">
            {socketConnectionStatus !== "connected" &&
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center flex-col">
                    <Spinner
                        className={`${socketConnectionStatus === "error" ? 'text-red-500' : 'text-white'} size-[70px]`}/>
                    <h1 className="text-white text-opacity-60 text-xl mt-5">
                        {socketConnectionStatus === "error" ? "An error occurred :(" : "Connecting to server..."}
                    </h1>
                </div>}

            <Outlet/>

            {/*{type === "create" && <CreateGame setDialogOpen={setDialogOpen} ws={ws}/>}*/}
            {/*{type === "join" && <JoinGame ws={ws} code={searchParams.get('gameID')}/>}*/}
            {/*{type === "start" && <MainGame setDialogOpen={setDialogOpen}/>}*/}
        </main>
    </>
}