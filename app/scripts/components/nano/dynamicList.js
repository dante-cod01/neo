const defaultCss = {
    back: "red",
    paddingHor: "0px",
    paddingVer: "0px",
    borderColor: "red",
    borderWidth: "0px",
    borderRadius: "0px"
}

const defaultLogic = {

}

export class DynamicList extends HTMLElement {
    _base
    _data

    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })
    }

    set dependency(injected) {
        if (!this._base) {
            this._base = injected
            this.init()
        } else {
            console.log({class: this}, "dependency already injected: ignoring")
        }
    }

    set newData(inyected) {
        this._data = inyected
    }

    #draw() {
        this.container = this._base.add("div", this.dom, "main")
        this.newStyle = this._base.add("style", this.dom)

        this.container.innerHTML = `
            <div class="listBox"></div>
        `

        this.newStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: 100%;
                height: 100%;
            }

            .main {
                width: 100%;
                height: 100%;
                padding: var(--paddingVer) var(--paddingHor) ;

                .listBox {
                    width: 100%;
                    height: 100%;
                    outline: var(--borderWidth) solid var(--borderColor);
                    border-radius: var(--borderRadius);
                }
            }
        `
    }

    #configure = () => {
        this.css = this._base.loadConfig(JSON.parse(this.getAttribute("css")), defaultCss)
        this._base.toCssVar(this.style, this.css)

        if (this.getAttribute("logic")) {
            this.logic = this._base.loadConfig(JSON.parse(this.getAttribute("logic")), defaultLogic)
        }
    }

    init() {
        const main = () => {
            this.#draw()
            this.#configure()
        }

        main()
    }
}

customElements.define("dynamic-list", DynamicList)