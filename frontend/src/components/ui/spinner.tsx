import {cn} from "@/lib/utils.ts";
import {type ClassValue} from "clsx"
import {IconLoader} from "@tabler/icons-react";

export default function Spinner({className}: { className?: ClassValue }) {
    return (
        <IconLoader className={cn("animate-spin", className)}/>
    )
}