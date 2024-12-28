import {ReactNode} from "react";
import useSocket from "@/lib/hooks/useSocket.ts";
import {gameEvents} from "@/logic/init.ts";
import {SocketCtx} from "@/lib/context/socket/useSocketCtx.ts";

export default function SocketCtxProvider({children}: {
    children: ReactNode;
}) {
    const connection = useSocket(gameEvents);

    return (
        <SocketCtx.Provider value={connection}>
            {children}
        </SocketCtx.Provider>
    );
}