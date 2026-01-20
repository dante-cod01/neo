export const tag = "animated-text"
export class FlashText extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.css
        this.logic
        this.content
        this.links
        this.eventDom
        this.eventName
        this.width

        this.defaultCss = {
            box_width: "fit-content",
            box_height: "fit-content",

            textBox_width: "fit-content",
            textBox_height: "fit-content",
            textBox_border: "none",

/*             back: "none",
            font_family: "initial",
            font_size: "initial",
            font_style: "initial",
            font_color: "initial",
            font_weight: "none",
            transition: "0"
 */        }

        this.defaultLogic = {

        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main relative")
        const style = this.base.add("style", this.dom)
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--box_width);
                height: var(--box_height);
                border: 1px solid green;
            }

            .main {
                width: 100%;
                height: 100%;
                white-space: pre;
                background: var(--back);
            }

            .relative { position: relative; }
            .absolute { position: absolute; }
            .center { display: flex; align-items: center; justify-content: center;}
        `
        return style
    }

    #configure = () => {
        this.css = this.css ? this.base.config(this.defaultCss, this.css, "css", this) : this.defaultCss
        this.base.cssVar(this.css, this)
        this.logic = this.logic ? this.base.config(this.defaultLogic, this.logic, "logic", this) : this.defaultLogic
    }

    #addLinks = () => {
        if (this.links && this.links.length) this.base.addLinks(this, this.links)
    }

    #addTextBoxes = () => {
        let indexCount = []
        Object.keys(this.content).forEach(key => {
            const index = key.split("_").pop()
            if (!indexCount.includes(index)) indexCount.push(index)
        })
        indexCount.forEach(index => {
            const textBox = this.base.add("div", this.container, `textBox_${index} center absolute`)
        })
        return indexCount
    }

    #identifyContent = (indexCount) => {
        let contentProps = {}
        indexCount.forEach(index => {
            const prop = Object.entries(this.content).filter(([key, value]) => key.includes("_" + index))
            contentProps[index] = prop
        })
        return contentProps
    }

    #createCssVars = (style, props) => {
        Object.entries(props).forEach(([index, entries]) => {
            entries.forEach(([prop, propValue]) => { this.base.cssVar({ [prop]: propValue }, this) })

            this.#applyVars(style, index)
            this.#addText(this.content[`textBox_text_${index}`], index)
        })
    }

    #applyVars = (style, index) => {
        style.textContent += `
            .textBox_${index} {
                width: var(--textBox_width_${index}, ${this.defaultCss.textBox_width});
                height: var(--textBox_height_${index}, ${this.defaultCss.textBox_height});
                border: var(--textBox_border_${index}, ${this.defaultCss.textBox_border});

            }
        `
    }

    #addText = (text, index) => { this.dom.querySelector(`.textBox_${index}`).textContent = text }

    #init = async () => {
        this.#configure()
        this.#addLinks()
        const style = this.#draw()
        console.log(style)
        const indexCount = this.#addTextBoxes()
        const contentProps = this.#identifyContent(indexCount)
        this.#createCssVars(style, contentProps)
        this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    async addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.base) {
            this.base = dependency
            await this.#init()
        }
    }

    updateVar(prop, value) {
        this.base.updateVar(this.defaultCss, prop, value, this)
    }

}
customElements.define(tag, FlashText)