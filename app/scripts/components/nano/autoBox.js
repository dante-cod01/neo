export const tag = "auto-box"
export class AutoBox extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        /* received props */
        this.entryCss
        /* work props */
        this.dependency
        this.outCss = {}

        this.defaultCss = {
            box_W: "200px",
            box_H: "200px",
            box_back: "red"
        }
    }

    addDependency(dependency) {
        if (!this.dependency) {
            this.dependency = dependency
            this.#init()
        }
    }

    #draw() {
        this.container = this.dependency.add("div", this.dom, "main")
        const style = this.dependency.add("style", this.dom)

        this.container.innerHTML = `
            <div></div>
        `

        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--box_W);
                height: var(--box_H);
                background: var(--box_back);
            }

            .main {
                width: 100%;
                height: 100%;
            }
        `
    }

    #configure = () => {
        this.outCss = this.dependency.config(this.defaultCss, this.entryCss, "css")
        this.dependency.addCssVars(this.outCss, this)
        console.log(this.outCss.back, this.entryCss, this.defaultCss)
    }


    #init() {
        this.#configure()
        this.#draw()
    }
}
customElements.define("auto-box", AutoBox)