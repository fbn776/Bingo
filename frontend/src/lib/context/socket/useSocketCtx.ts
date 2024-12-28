import {createContext, useContext} from "react";
import useSocket from "@/lib/hooks/useSocket.ts";

type TUseSocket = ReturnType<typeof useSocket>;

export const SocketCtx = createContext<TUseSocket | undefined>(undefined);

/**
 * Custom hook to use the socket hook
 */
const useSocketCtx = (): TUseSocket => {
    const context = useContext(SocketCtx);
    if (!context) {
        throw new Error("use ctx must be used within the ctx provider");
    }
    return context;
};

export default useSocketCtx;