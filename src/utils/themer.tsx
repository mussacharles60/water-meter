import $ from "jquery";

export default class Themer {

    // constructor() {}

    public static subscribe() {
        var theme = localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light';
        const theme_btn: any = document.getElementById("theme-btn");

        if (theme_btn) {
            theme_btn.checked = theme && theme === 'dark' ? true : false;
            theme_btn.addEventListener('change', (e: EventTarget | any) => {
                if (e && e.target) {
                    theme = e.target.checked ? 'dark' : 'light';
                    localStorage.setItem('theme', theme);
                    document.documentElement.className = theme;
                    $("meta[name='theme-color']").attr('content', theme === 'light' ? '#EAEEEF' : '#13161E');
                }
            });
        }

        const light_btn: any = document.getElementById("light-btn");
        const dark_btn: any = document.getElementById("dark-btn");
        if (light_btn) {
            light_btn.addEventListener('click', (e: EventTarget | any) => {
                if (e && e.target) {
                    theme = 'light';
                    localStorage.setItem('theme', theme);
                    document.documentElement.className = theme;
                    if (light_btn) light_btn.style.display = 'none';
                    if (dark_btn) dark_btn.style.display = 'block';
                    $("meta[name='theme-color']").attr('content', theme === 'light' ? '#EAEEEF' : '#13161E');
                }
            });
        }
        if (dark_btn) {
            dark_btn.addEventListener('click', (e: EventTarget | any) => {
                if (e && e.target) {
                    theme = 'dark';
                    localStorage.setItem('theme', theme);
                    document.documentElement.className = theme;
                    if (light_btn) light_btn.style.display = 'block';
                    if (dark_btn) dark_btn.style.display = 'none';
                    $("meta[name='theme-color']").attr('content', theme === 'light' ? '#EAEEEF' : '#13161E');
                }
            });
        }

        if (theme) {
            document.documentElement.className = theme;
            if (light_btn) light_btn.style.display = theme === 'light' ? 'none' : 'block';
            if (dark_btn) dark_btn.style.display = theme === 'dark' ? 'none' : 'block';
        }
        $("meta[name='theme-color']").attr('content', theme === 'light' ? '#EAEEEF' : '#13161E');

        window.addEventListener('storage', (e: any) => {
            if (e.key === 'theme') {
                document.documentElement.className = e.newValue;
                $("meta[name='theme-color']").attr('content', theme === 'light' ? '#EAEEEF' : '#13161E');
            }
        });
    }

    public static unsubscribe() {
        window.removeEventListener('storage', (e: any) => {
            if (e.key === 'theme') {
                document.documentElement.className = e.newValue;
                $("meta[name='theme-color']").attr('content', e.newValue === 'light' ? '#EAEEEF' : '#13161E');
            }
        });
    }
}