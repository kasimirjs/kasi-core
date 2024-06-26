/**
 * Debouncer
 *
 * <example>
 *     <caption>Usage example</caption>
 *     ```typescript
 *     let debouncer = new Debouncer();
 *     await debouncer.debounce(100);
 *     console.log("Debounced!");
 *     ```
 * </example>
 */
export class Debouncer {

    constructor( private min : number = 100, private max : number = null) {
    }

    #resolve : any[] = [];
    #interval : any = null;
    #time : any = null;

    async debounce(min : number = this.min, max : number=this.max) : Promise<void> {
        if (max === null)
            max = min;

        if (this.#interval !== null) {
            window.clearInterval(this.#interval);
        }

        this.#interval = window.setInterval(() => {
            this.#resolve.forEach(r => r());
            this.#resolve = [];
            window.clearInterval(this.#interval);
        }, min);

        return new Promise<void>((resolve) => {
            this.#resolve.push(resolve);
        });
    }
}
