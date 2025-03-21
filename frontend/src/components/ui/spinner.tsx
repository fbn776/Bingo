import {cn} from "@/lib/utils.ts";
import {type ClassValue} from "clsx"
import {Loader} from "lucide-react";


export default function Spinner({className}: { className?: ClassValue }) {
    return (
        <Loader className={cn("animate-spin", className)}/>
    )
}