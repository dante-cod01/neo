import * as element from "./../../modules/element.js"
import { ComponentBasic } from "./../class/componentBasic.js"

const defaultConf = {
    css: {

    },
    logic: {
        side: ["right", "left"]
    }
}

export class MagicBox extends HTMLElement {
    constructor() {
        super()

        const basic = new ComponentBasic()
        this.closeButtom,
        this.topBar,
        this.bottomBar

        this.dom = this.attachShadow({ mode: "open" })
        this.container = element.add("div", this.dom, "main relative")
        this.newStyle = element.add("style", this.dom)

        this.container.innerHTML = `
            <div class="closeBox absolute"></div>
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

                .closeBox {
                    top: 10px;
                    width: 30px;
                    aspect-ratio: 1/1;
                    border: 1px solid red;
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
        `
    }


    connectedCallback() {
        console.log(Object.entries(this))

    }
}

customElements.define("magic-box", MagicBox)