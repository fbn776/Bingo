/**
 * Used for delaying the execution of a function
 *
 * **FOR TESTING PURPOSES ONLY**
 * @param ms
 */
export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}