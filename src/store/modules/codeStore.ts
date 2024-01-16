import { defineStore } from 'pinia'

const useStore = defineStore('code', {
    state: () => ({
        html: '<h1>Hello World</h1>',
        css: ``,
        js: 'console.log("Hello World")'
    }),
    actions: {
        updateCss(payload: string) {
            this.css = payload
        },
        updateHtml(html: string) {
            this.html = html
        },
        updateJs(js: string) {
            this.js = js
        },
        clear() {
            this.html = '<h1>Hello World</h1>'
            this.css = ``
            this.js = 'console.log("Hello World")'
        }
    }
})

export default useStore
