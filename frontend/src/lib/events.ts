/**
 * A simple event emitter class that can be used to emit and listen to events.
 */
export default class EventEmitter<T, G extends string> {
    private target = new EventTarget();

    /** Emit an event with the given name and detail */
    emit(eventName: string, detail: T) {
        const event = new CustomEvent<T>(eventName, { detail });
        this.target.dispatchEvent(event);
    }

    /** Listen for an event with the given name */
    on(eventName: G, listener: (event: CustomEvent<T>) => void) {
        this.target.addEventListener(eventName, (e) => listener(e as CustomEvent<T>));
    }

    /** Wait for an event with the given name */
    waitFor(eventName: G): Promise<T> {
        return new Promise((resolve) => {
            const handler = (event: Event) => {
                this.target.removeEventListener(eventName, handler);
                resolve((event as CustomEvent<T>).detail);
            };
            this.target.addEventListener(eventName, handler);
        });
    }
}
