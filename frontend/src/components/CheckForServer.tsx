import Spinner from "@/components/ui/spinner.tsx";
import {useEffect, useState} from "react";

export default function CheckForServer() {
    const [isServerUp, setIsServerUp] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/ping`).then(() => {
            setIsServerUp(true);
        }).catch(() => {
            setIsError(true);
        })
    }, []);

    return !isServerUp && <div
        className="bg-black fixed z-50 inset-0 flex justify-center items-center bg-opacity-60 backdrop-blur-md flex-col">
        <Spinner className="size-[100px] text-white"/>
        <h1 className={`text-white text-2xl mt-10 ${isError ? "text-red-500" : ""}`}>
            {isError ? "Server is having some kind of problem" : "Server is booting up"}
        </h1>
        {isError ? <p className="text-white text-sm w-[50%] max-sm:w-[80%] text-center mt-3">
                The server is facing some kind of problem. Please try again later.
            </p> :
            <p className="text-white text-sm w-[50%] max-sm:w-[80%] text-center mt-3">
                The server is hosted on render free tier. It automatically switches the sever off after some inactivity.
                It
                might take 50 or more seconds to start the server. Unfortunately you have to wait till the server is up
            </p>
        }
        {isError &&
            <button onClick={() => {
                window.location.reload();
            }} className="button bg-blue-500 shadow mt-4">
                Check Again
            </button>
        }
    </div>
}