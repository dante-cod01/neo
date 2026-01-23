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

        this.defaultConf = {
            box_width: "fit-content",
            box_height: "fit-content",
            box_position: ["left", "right"],
            box_back: "none",
            box_border: "none",

            textBox_text: "text not defined",
            textBox_position: ["absolute", "relative"],
            textBox_font: "initial",
            textBox_fontSize: "initial",
            textBox_fontStyle: "initial",
            textBox_fontWeight: "initial",
            textBox_color: "none",

            textBox_border: "1px solid red"
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #draw = () => {
        const def = this.defaultConf
        this.container = this.base.add("div", this.dom, "main relative center")
        this.newStyle = this.base.add("style", this.dom)
        this.newStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--box_width_static, ${def.box_width});
                height: var(--box_height_static, ${def.box_height});
                border: 1px solid green;
            }

            .main {
                width: 100%;
                height: 100%;
                white-space: pre;
                background: var(--box_back_static, ${def.box_back});
            }

            .relative { position: relative; }
            .absolute { position: absolute; }
            .center { display: flex; align-items: center; justify-content: center;}
        `
    }

    #configure = () => {
        this.conf = this.defaultConf ? this.base.validateConfig(this.defaultConf, this.newConf, this) : this.defaultConf
        console.log(this.conf)
        Object.entries(this.conf).forEach(([key, value]) => {
            this.base.cssVar2(key, value, this)
        })
        this.conf.static["boxes_num"] = Object.keys(this.conf).filter(key => key !== "static").length
    }

    #addLinks = () => {
        if (this.links && this.links.length) this.base.addLinks(this, this.links)
    }

    #addTextBoxes = () => {
        for (let box = 0; box < this.conf.static.boxes_num; box++) {
            const textBox = this.base.add("div", this.container, `textBox_${box} center absolute`)
            this.#addStylePrototype(box + 1)
            textBox.classList.add(`textBox_${box}`)
        }
    }

/*     #identifyContent = (indexCount) => {
        let contentProps = {}
        indexCount.forEach(index => {
            const prop = Object.entries(this.conf).filter(([key, value]) => key.includes("_" + index))
            contentProps[index] = prop
        })
        return contentProps
    }
 */
/*     #createCssVars = (style, props) => {
        Object.entries(props).forEach(([index, entries]) => {
            entries.forEach(([prop, propValue]) => { this.base.cssVar({ [prop]: propValue }, this) })

            this.#applyVars(style, index)

            this.content[`textBox_text_${index}`]
                ? this.#addText(this.content[`textBox_text_${index}`], index)
                : this.#addText(this.logic.textBox_text, index)
        })
    }
 */
    #addStylePrototype = (index) => {
        const def = this.defaultConf
        this.newStyle.textContent += `
            .textBox_${index} {
                position: var(--textBox_position_${index}, ${def.textBox_position});
                width: var(--textBox_width_${index}, ${def.textBox_width});
                height: var(--textBox_height_${index}, ${def.textBox_height});

                font-family: var(--textBox_font_${index}, ${def.textBox_font});

                border: var(--textBox_border.${index}, ${def.textBox_border});

            }
        `

        console.log(this.newStyle)
    }

    #addText = (text, index) => { this.dom.querySelector(`.textBox_${index}`).textContent = text }

    #init = async () => {
        this.#configure()
        this.#addLinks()
        this.#draw()
        const indexCount = this.#addTextBoxes()
/*         const contentProps = this.#identifyContent(indexCount)
        this.#createCssVars(style, contentProps)
        this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
 */    }

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