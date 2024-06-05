class BodyElementWatcher {
    private static observer: MutationObserver | null = null;
    private static promises: Array<(body: HTMLBodyElement) => void> = [];

    static waitForBodyElement(): Promise<HTMLBodyElement> {
        if (document.body) {
            return Promise.resolve(document.body as HTMLBodyElement);
        }

        return new Promise((resolve) => {
            this.promises.push(resolve);

            if (!this.observer) {
                this.observer = new MutationObserver(() => {
                    if (document.body) {
                        this.observer!.disconnect();
                        this.observer = null;
                        this.promises.forEach((callback) => callback(document.body as HTMLBodyElement));
                        this.promises = [];
                    }
                });

                this.observer.observe(document.documentElement, { childList: true });
            }
        });
    }
}

/**
 * Wait for the body element to be available
 *
 */
export function ka_body(): Promise<HTMLBodyElement> {
    return BodyElementWatcher.waitForBodyElement();
}
