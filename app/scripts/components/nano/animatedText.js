export const tag = "animated-text"
export class FlashText extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.css
        this.logic
        this.links
        this.eventDom
        this.eventName

        this.defaultCss = {
            font_family: "initial",
            font_size: "initial",
            font_style: "initial",
            font_color: "initial",
            text_opacity: "1",
            textOpacity_before: "1",
            textOpacity_after: "1",
            textFilter_before: "none",
            textFilter_after: "none",
            text_indent: "0px",
            text_weight: "none",
            textBox_right: "0px",
            transition: "0"
        }

        this.defaultLogic = {
            upperCase: false
        }

        this.dom = this.attachShadow({ mode: "open" })

    }

    #configure = () => {
        this.css = this.css ? this.base.config(this.defaultCss, this.css, "css", this) : this.defaultCss
        this.base.cssVar(this.css, this)
        this.logic = this.logic ? this.base.config(this.defaultLogic, this.logic, "logic", this) : this.defaultLogic
    }

    #addLinks = () => {
        if (this.links && this.links.length) this.base.addLinks(this, this.links)
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main verticalCenter opacityBefore")
        const style = this.base.add("style", this.dom)
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .main {
                white-space: pre;
                width: 100%;
                height: 100%;
                margin-left: 20px;
                transition: var(--transition);

                .textBox {
                    position: relative;
                    width: fit-content;
                    height: fit-content;
                    font-family: var(--font_family);
                    font-size: var(--font_size);
                    font-weight: var(--text_weight);
                    font-style: var(--font_style);
                    color: var(--font_color);
                    text-indent: var(--text_indent);
                    transition: var(--transition);
                }
            }

            .verticalCenter { display: flex; align-items: center; }

            .posBefore { right: calc(var(--textBox_right) - var(--text_indent)); }
            .posAfter { right: 0; }

            .opacityBefore { opacity: var(--textOpacity_before); }
            .opacityAfter { opacity: var(--textOpacity_after); }

            .filterBefore { filter: var(--textFilter_before); }
            .filterAfter { filter: var(--textFilter_after); }
        `
    }

    #flash = async (text) => {
        const main = this.dom.querySelector(".main")

        const textBox = this.base.add("div", main, "textBox verticalCenter posBefore filterBefore")
        textBox.textContent = this.logic.upperCase ? text.toUpperCase() : text
        await new Promise(resolve => setTimeout(resolve, 10))
        main.classList.replace("opacityBefore", "opacityAfter")
        textBox.classList.replace("posBefore", "posAfter")
        textBox.classList.replace("filterBefore", "filterAfter")
    }

    #init = async () => {
        this.#configure()
        this.#addLinks()
        this.#draw()
        this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.base) {
            this.base = dependency
            this.#init()
        }
    }

    updateText = async (text) => {
        this.#flash(text)
    }
}
customElements.define(tag, FlashText)