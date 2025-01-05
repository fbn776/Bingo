/**
 * A simple event emitter class that can be used to emit and listen to events.
 */
export default class EventEmitter<T, G extends string> {
    private target = new EventTarget();
    private listeners = new Map<string, { eventName: G; handler: EventListener }>();
    private idCounter = 0;

    /** Emit an event with the given name and detail */
    emit(eventName: string, detail: T) {
        const event = new CustomEvent<T>(eventName, { detail });
        this.target.dispatchEvent(event);
    }

    /** Listen for an event with the given name */
    on(eventName: G, listener: (event: CustomEvent<T>) => void) {
        const id = `listener-${this.idCounter++}`;
        const handler: EventListener = (e) => listener(e as CustomEvent<T>);
        this.target.addEventListener(eventName, handler);
        this.listeners.set(id, { eventName, handler });
        return id;
    }

    /** Removes an event*/
    remove(id: string) {
        const listenerData = this.listeners.get(id);
        if (listenerData) {
            const { eventName, handler } = listenerData;
            this.target.removeEventListener(eventName, handler);
            this.listeners.delete(id);
        }
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
