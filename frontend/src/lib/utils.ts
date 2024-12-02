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

/**
 * Shuffle an array (based on Fisher-Yates Shuffle Algorithm)
 * @param array
 */
export function shuffleArray<T>(array: T[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const index = Math.floor(Math.random() * (i + 1));
        [array[i], array[index]] = [array[index], array[i]];
    }
    return array;
}

/**
 * Get the time ago from a given timestamp
 * @param timestamp
 */
export function timeAgo(timestamp: string | number) {
    const now = Date.now();
    const diff = Math.floor((now - new Date(timestamp).getTime()) / 1000); // Difference in seconds

    if (diff < 60) return `${diff}s ago`;
    const minutes = Math.floor(diff / 60);
    if (minutes < 60) return `${minutes} min ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hr${hours > 1 ? 's' : ''} ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} day${days > 1 ? 's' : ''} ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? 's' : ''} ago`;
}