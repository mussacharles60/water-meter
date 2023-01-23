import axios from 'axios';
import API from './local-db';

export const media_url = "https://vm.imc.co.tz/uploads/";
const host = "https://vm.imc.co.tz/api/v2/";
export const api_key = "axiopu45yru54piegh048yruht3wp";

export default class DatabaseManager {

    private cancelToken: any = axios.CancelToken;
    private source: any = this.cancelToken.source();

    public loginUser(email: string, password: string): Promise<void> {

        return new Promise((resolve, reject) => {
            resolve(API.login(email, password) as any);
        });

        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('action', "user_login");

        return new Promise((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();

                axios({
                    url: host + 'auth?t=' + chunk,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                    .then((result: any) => {
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios thrown: ", thrown);
                        }
                    });

            } catch (e: any) {
                reject(e);
            }
        });

    }

    public signupUser(name: string, email: string, password: string): Promise<void> {
        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('action', "user_signup");

        return new Promise((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();

                axios({
                    url: host + 'auth?t=' + chunk,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                    .then((result: any) => {
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios thrown: ", thrown);
                        }
                    });

            } catch (e: any) {
                reject(e);
            }
        });
    }

    public sendPasswordResetEmail(email: string): Promise<void> {
        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('email', email);
        formData.append('action', "password_recovery");

        return new Promise((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();

                axios({
                    url: host + 'auth?t=' + chunk,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                    .then((result: any) => {
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios thrown: ", thrown);
                        }
                    });

            } catch (e: any) {
                reject(e);
            }
        });
    }

    public recoverPassword(email: string, password: string, sessionId: string): Promise<void> {
        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('session_id', sessionId);
        formData.append('action', "password_recovery_change");

        return new Promise((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();

                axios({
                    url: host + 'auth?t=' + chunk,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                    .then((result: any) => {
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios thrown: ", thrown);
                        }
                    });

            } catch (e: any) {
                reject(e);
            }
        });
    }

    public changePassword(user_id: string, old_password: string, password: string): Promise<void> {
        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('user_id', user_id);
        formData.append('old_password', old_password);
        formData.append('password', password);
        formData.append('action', "change_password");

        return new Promise((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();

                axios({
                    url: host + 'auth?t=' + chunk,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                    .then((result: any) => {
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios thrown: ", thrown);
                        }
                    });

            } catch (e: any) {
                reject(e);
            }
        });
    }

    public changeName(user_id: string, name: string): Promise<void> {
        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('user_id', user_id);
        formData.append('name', name);
        formData.append('action', "change_name");

        return new Promise((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();

                axios({
                    url: host + 'auth?t=' + chunk,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                })
                    .then((result: any) => {
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios thrown: ", thrown);
                        }
                    });

            } catch (e: any) {
                reject(e);
            }
        });
    }

    public getUserDevices(user_id: string): Promise<void> {

        return new Promise((resolve, reject) => {
            resolve(API.getUserData(user_id) as any);
        });

        window.dispatchEvent(new CustomEvent('data-loading', { detail: true }));

        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('user_id', user_id);
        formData.append('action', "user_devices");

        return new Promise((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();

                axios({
                    url: host + 'activity?t=' + chunk,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cancelToken: this.source.token
                })
                    .then((result: any) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        // console.log("daily_device_data: server: response: ", result);
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios error: ", thrown);
                        }
                    });

            } catch (e: any) {
                window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                reject(e);
            }
        });
    }

    public cancelRequests() {
        this.source.cancel('Operation canceled by the user.');
        this.source = this.cancelToken.source();
    }

    public getUserDevice(user_id: string, device_id: string): Promise<void> {
        window.dispatchEvent(new CustomEvent('data-loading', { detail: true }));

        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('user_id', user_id);
        formData.append('device_id', device_id);
        formData.append('action', "user_device");

        return new Promise<void>((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();
                const url = host + 'activity?t=' + chunk;
                axios({
                    url: url,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cancelToken: this.source.token
                })
                    // .then(res => res.json())
                    .then((result: any) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        // console.log("daily_device_data: server: response: ", result);
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios error: ", thrown);
                        }
                    });

            } catch (e: any) {
                window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                console.error(e);
                reject(e);
            }
        });
    }

    public getMutualDevices(user_id: string, device_ids: string[]): Promise<void> {
        window.dispatchEvent(new CustomEvent('data-loading', { detail: true }));

        const formData = new FormData();
        formData.append('key', api_key);
        formData.append('user_id', user_id);
        formData.append('action', "mutual_devices");
        if (device_ids.length > 0) {
            formData.append('user_devices', device_ids.join(",")); // "1,2,3,4,5"
        } else {
            formData.append('user_devices', "");
        }

        return new Promise<void>((resolve, reject) => {
            try {
                const chunk = (new Date()).valueOf();
                const url = host + 'activity?t=' + chunk;
                axios({
                    url: url,
                    method: 'post',
                    responseType: 'json',
                    data: formData,
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    cancelToken: this.source.token
                })
                    // .then(res => res.json())
                    .then((result: any) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        // console.log("daily_device_data: server: response: ", result);
                        resolve(result.data ? result.data : null);
                    })
                    .catch((err: any) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        console.error("> axios error: ", err.message);
                        reject(err.message);
                    })
                    .catch((thrown) => {
                        window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                        if (axios.isCancel(thrown)) {
                            console.log('Request canceled', thrown.message);
                        } else {
                            console.error("> axios error: ", thrown);
                        }
                    });

            } catch (e: any) {
                window.dispatchEvent(new CustomEvent('data-loaded', { detail: true }));
                console.error(e);
                reject(e);
            }
        });
    }

    public logoutUser(): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            try {
                localStorage.removeItem('app-un');
                localStorage.removeItem('app-uid');
            } catch (e: any) {
                reject(e);
            }

            setTimeout(() => {
                resolve();
            }, 1000);
        });
    }
}