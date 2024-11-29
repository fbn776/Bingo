import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"
import {toast} from "sonner";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
/**
 * Generate a random game ID of a given length
 * @param length The length of the game ID. Default is 8
 */
export function generateGameId(length = 8) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

/**
 * Copy text to clipboard
 * @param text
 */
export function copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
        toast.success("Copied to clipboard");
    }).catch(() => {
        toast.error("Failed to copy to clipboard");
    });
}