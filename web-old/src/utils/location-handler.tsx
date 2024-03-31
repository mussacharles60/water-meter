/*
 created by Mussa Charles @ 9/3/2023 https://mussacharles60.com
 */

export interface OnWindowLocationChanged {
    (path: string): void;
}

export default class WindowLocationHandler {

    // constructor() { }

    public static subscribe(callback: OnWindowLocationChanged) {
        //TODO reference https://dirask.com/posts/JavaScript-on-location-changed-event-on-url-changed-event-DKeyZj
        const pushState: any = window.history.pushState;
        const replaceState: any = window.history.replaceState;

        window.history.pushState = function () {
            pushState.apply(window.history, arguments);
            window.dispatchEvent(new Event("pushstate"));
            window.dispatchEvent(new Event("location-changed"));
        }
        window.history.replaceState = function () {
            replaceState.apply(window.history, arguments);
            window.dispatchEvent(new Event("replacestate"));
            window.dispatchEvent(new Event("location-changed"));
        }

        // on window back button click | just listen on go back button click
        window.onpopstate = (_event: any) => {
            window.dispatchEvent(new Event('location-changed'));
        };

        // window.addEventListener('hashchange', () => {
        //   Console.debug('onhashchange event occurred!');
        // });

        // listen on location change
        window.addEventListener("location-changed", () => {
            // Console.debug("locationchange event occurred!");
            callback(window.location.pathname);
        });
    }

    public static unsubscribe() {
        window.removeEventListener('location-changed', () => { });
    }
}