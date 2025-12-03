export const tag = "expand-bar"
export class ExpandBar extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        /* received props */
        this.entryCss
        /* work props */
        this.dependency
        this.outCss = {}

        this.defaultCss = {
            box_w: "200px",
            box_h: "200px",
            box_back: "red",
            box_radius: "0px",
            open_leftWidth: "120%",
            transition: "3s"
        }
    }

    addDependency(dependency) {
        if (!this.dependency) {
            this.dependency = dependency
            this.#init()
        }
    }

    #draw() {
        this.container = this.dependency.add("div", this.dom, "main relative max")
        const style = this.dependency.add("style", this.dom)

        this.container.innerHTML = `
            <div class="colorLayer relative max radius transition"></div>
            <div class="contentLayer absolute max"></div>
        `

        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--box_w);
                height: var(--box_h);

                --radiusMax: none;
            }

            .main {
                border: 1px solid red;

                .colorLayer {
                    background: var(--box_back);  
                }

                .contentLayer {
/*                     border: 1px solid blue;
 */                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .max {width: 100%; height: 100%;}
            .center {display: flex; justify-content: center; align-items: center;}
            .radius {border-radius: var(--box_radius);}
            .transition {transition: var(--transition);}
            .openLeft {width: 110%}
        `
    }

    #configure = () => {
        this.outCss = this.dependency.config(this.defaultCss, this.entryCss, "css", this)
        this.dependency.addCssVars(this.outCss, this)
    }

    expand(boolean, mode, calc) {
        const layerColor = this.dom.querySelector(".colorLayer")
        if (boolean) {
            if (mode === "left") {
                layerColor.classList.add("openLeft")
            }
        }
    }

    #init() {
        this.#configure()
        this.#draw()
    }
}
customElements.define(tag, ExpandBar)