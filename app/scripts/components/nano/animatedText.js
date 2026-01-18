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
        this.width

        this.defaultCss = {
            back: "none",
            font_family: "initial",
            font_size: "initial",
            font_style: "initial",
            font_color: "initial",
            text_opacity: "1",
            textFilter_before: "none",
            textFilter_after: "none",
            text_mix: "none",
            text_weight: "none",
            text_padding: "0px",
            moveTo: "0%",
            moveFrom: "100%",
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
        this.container = this.base.add("div", this.dom, "main verticalCenter")
        const style = this.base.add("style", this.dom)
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: 100%;
                height: 100%;
                border: 1px solid red;
                --textBox_width: 0;
            }

            .main {
                white-space: pre;
                padding: var(--box_padding);

                .textBox {
                    position: relative;
                    width: fit-content;
                    height: 100%;
                    font-family: var(--font_family);
                    font-size: var(--font_size);
                    font-weight: var(--text_weight);
                    font-style: var(--font_style);
                    color: var(--font_color);
                    background: var(--back);
                    padding: var(--text_padding);
                    mix-blend-mode: var(--text_mix);
                    transition: var(--transition);
                }
            }

            .verticalCenter { display: flex; align-items: center; }

            .posBeforeLeft { left: var(--moveFrom); }
            .posAfterLeft { left: 0; }

            .posBeforeRight { left: var(--moveFrom); }
            .posAfterRight { left: calc(100% - var(--textBox_width)); }

            .opacityBefore { opacity: 0; }
            .opacityAfter { opacity: 1; }

            .filterBefore { filter: var(--textFilter_before); }
            .filterAfter { filter: var(--textFilter_after); }

            .erase {  opacity: 0; filter: blur(30px); transform: translateY(-40px); }
        `
    }

    #init = async () => {
        this.#configure()
        this.#addLinks()
        await this.#draw()
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

    erase = async () => {
        const time = 600
        const initialTransition = this.css.transition
        const main = this.dom.querySelector(".main")
        const textBox = this.dom.querySelector(".textBox")
        textBox.classList.add("erase")
        this.style.setProperty("--transition", `${time}ms ease-in`)
        await this.base.waiting(time)
        main.innerHTML = ""
        this.style.setProperty("--transition", initialTransition)
    }

    write = async (text, animation) => {
        const textBox = this.base.add("div", this.container, "textBox verticalCenter filterBefore opacityBefore")

        if (animation === "move") {
            this.css.moveTo === "left"
                ? textBox.classList.add("posBeforeLeft")
                : textBox.classList.add("posBeforeRight")

            textBox.textContent = this.logic.upperCase ? text.toUpperCase() : text.toLowerCase()
            this.width = textBox.offsetWidth + "px"
            this.style.setProperty("--textBox_width", this.width)
            return textBox
        }
    }

    animate = async (textBox) => {
        textBox.classList.replace("opacityBefore", "opacityAfter")
        textBox.classList.replace("filterBefore", "filterAfter")
        if (textBox.classList.contains("posBeforeLeft")) textBox.classList.replace("posBeforeLeft", "posAfterLeft")
        if (textBox.classList.contains("posBeforeRight")) textBox.classList.replace("posBeforeRight", "posAfterRight")
        await this.base.waiting(this.base.convertTransition(this.css.transition))
    }
}
customElements.define(tag, FlashText)