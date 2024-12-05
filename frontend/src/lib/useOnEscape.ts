import {useEffect} from "react";

/**
 * Custom hook to fire an event when the escape key is pressed
 * @param callback
 */
export default function useOnEscape(callback: () => void) {
    useEffect(() => {
        const closeOnEscape = (e: KeyboardEvent) => {
            if(e.key === 'Escape') {
                callback();
            }
        };

        window.addEventListener('keydown', closeOnEscape);

        return () => {
            window.removeEventListener('keydown', closeOnEscape);
        }
    }, [callback])
}