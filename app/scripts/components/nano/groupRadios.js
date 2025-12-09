export const tag = "radio-group"
export class RadioGroup extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.eventDom
        this.eventName
        this.entryConfig
        this.entryCss
        this.entryData = []
        this.entryFonts = []

        this.defaultConfig = {
            horizontal: false
        }

        this.defaultCss = {
            box_width: "fit-content",
            box_height: "fit-content",

            option_width: "fit-content",
            option_height: "fit-content",

            text_font: "initial",
            text_fontSize: "initial"
        }

        this.css = {}
    }

    #draw = () => {
        this.container = this.dep.add("div", this.dom, "main relative max")
        const style = this.dep.add("style", this.dom)

        style.textContent += `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--box_width);
                height: var(--box_height);
            }

            .main {

                .option {
                    width: var(--option_width);
                    height: var(--option_height);
                    border: 1px solid red;
                }
            }

            .horizontal {display: flex;}
            .vertical {diplay: flex; flex-direction: column;}
       `
    }

    #configure = () => {
        this.config = this.dep.config(this.defaultConfig, this.entryConfig, "config", this)
        this.css = this.dep.config(this.defaultCss, this.entryCss, "css", this)
        this.dep.addCssVars(this.css, this)
    }

    #applyOrientation = () => {
        this.config.horizontal
            ? this.container.classList.add("horizontal")
            : this.container.classList.add("vertical")
    }

    #applyFonts = () => {
        if (this.entryFonts.length) {
            this.entryFonts.forEach(item => {
                this.dep.addLink(this, item.rel, item.href)
            })
        }
    }

    #applyConf = () => {
        this.#applyOrientation()
        this.#applyFonts()
    }

    #drawInputs = () => {
        const addInput = (inputType, box, name = null, classNames = null) => {
            const input = this.dep.add("input", box)
            input.setAttribute("type", inputType)
            name && input.setAttribute("name", name)
            classNames && (input.className = classNames)
            box.appendChild(input)
        }

        this.entryData.forEach(item => {
            if (!item.type) { console.log({ item }, "no type defined return"); return }
            if (item.type !== "checkbox" && item.type !== "radio") { console.log({ item }, "only radio or checkbox as type permited"); return }
            if (item.type === "radio" && !item.name) { console.log({ item }, "radio without name defined"); return }
            if (item.type === "radio" && !(item.icon || item.text)) { console.log({ item }, "radio without icon or text defined"); return }
            if (item.type === "radio" && (item.icon && item.text)) { console.log({ item }, "only text or icon not both permited"); return }

            const type = item.type
            const name = item.name ?? null
            const icon = item.icon ?? null
            const text = item.text ?? null

            const option = this.dep.add("div", this.container, "option")
            if (text) {
                const textBox = this.dep.add("div", option, "textBox center")
                textBox.textContent = item.text
            }


        })
    }

    #init = () => {
        this.#configure()
        this.#draw()
        this.#applyConf()
        this.#drawInputs()
    }

    addDependency(dependency) {
        if (!this.dependency) {
            this.dep = dependency
            this.#init()
        }
    }
}

customElements.define(tag, RadioGroup)