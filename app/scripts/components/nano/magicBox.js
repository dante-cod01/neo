import { ComponentBasic } from "./../class/componentBasic.js"

const defaultProps = {
    closeButtom: true,
    topBar: true,
    bottomBar: true,
}

const defaultCss = {
    panelSide: ["right", "left"],
    title_H: "50px",

}

const defaultLogic = {
    title: "Title"
}

export class MagicBox extends HTMLElement {
    constructor() {
        super()

        this.basic = new ComponentBasic()

        this.css,
            this.logic,
            this.closeButtom,
            this.topBar,
            this.bottomBar,
            this.config

        this.dom = this.attachShadow({ mode: "open" })
        this.container = this.basic.add("div", this.dom, "main relative")
        this.newStyle = this.basic.add("style", this.dom)

        this.container.innerHTML = `
            <div class="topBar verticalAlign">
                <span class="title"></span>
                <div class="closeBox center">
                    <div class="close relative">
                        <span class="material center"></span>
                        <input type="checkbox" checked class="hiddenInput">
                    </div>
                </div>
            </div> 
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
                border: 1px solid blue;

                .topBar {
                    display: flex;
                    width: 100%;
                    height: var(--title_H);
                    border: 1px solid red;

                    .title {
                        width: calc(100% - 30px);
                        height: 100%;
                    }

                    .closeBox {
                        width: 30px;
                        height: 30px;
                        border: 1px solid red;

                        .closeBox {
                            width: 30px;
                            height: 30px;
                            opacity: 0;
                            border: 1px solid red;
                        }
                    }
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .center {display: flex; justify-content: center; align-items: center}
            .verticalAlign {display: flex; align-items: center;}
        `
    }

    #addCloseButtom = (boolean) => {
        const closeHidden = this.dom.querySelector(".closeBox")
        closeHidden.style.opacity = boolean ? 1 : 0
    }

    #addTitle = (string) => {
        const title = this.dom.querySelector(".title")
        title.textContent = string
    }

    #configureSide = () => {

    }

    connectedCallback() {
        this.css = this.basic.loadConfig(JSON.parse(this.getAttribute("css")), defaultCss)
        this.basic.toCssVar(this.style, this.css)
        this.logic = this.basic.loadConfig(JSON.parse(this.getAttribute("logic")), defaultLogic)
/*         this.basic.toCssVar(this.style, this.logic)
 */
        this.#addCloseButtom(this.closeButtom)
        this.#configureSide(this.css.panel)
        this.#addTitle(this.logic.title)
    }
}

customElements.define("magic-box", MagicBox)