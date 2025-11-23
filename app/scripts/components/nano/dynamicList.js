
export class DynamicList extends HTMLElement {
    _base
    _data

    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })
    }

    set dependency(injected) {
        this._base = injected
        this.init()
    }

    set newData(inyected) {
        this._data = inyected
    }

    #draw() {
        this.container = this._base.add("div", this.dom, "main")
        this.newStyle = this._base.add("style", this.dom)
    }

    init() {
        const main = () => {
            
        }

        main()
    }
}

customElements.define("dynamic-list", DynamicList)