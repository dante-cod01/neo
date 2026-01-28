export const tag = "animated-text"
export class FlashText extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.links
        this.eventDom
        this.eventName
        this.newConf = {}
        this.conf = {} /* final Conf */

        this.defaultConf = {
            box_width: "fit-content",
            box_height: "fit-content",
            box_back: "none",
            box_back_blur: "none",
            box_border: "none",
            box_radius: "none",
            box_transition: "none",
            box_transition: "0s",

            textBox_width: "fit-content",
            textBox_height: "fit-content",
            textBox_content: "text not defined",
            textBox_position: ["absolute", "relative"],
            textBox_left: "0px",
            textBox_font: "initial",
            textBox_fontSize: "initial",
            textBox_fontStyle: "initial",
            textBox_fontWeight: "initial",
            textBox_color: "none",
            textBox_textIndent: "0px",

            textBox_mixBlendMode: "none",
            textBox_back: "none",
            textBox_back_blur: "none",
            textBox_padding: "none",
            textBox_transition: "0s",
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #draw = () => {
        const d = this.defaultConf
        this.container = this.base.add("div", this.dom, "main relative")
        this.newStyle = this.base.add("style", this.dom)
        this.newStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;

                width: var(--box_width_main, ${d.box_width});
                height: var(--box_height_main, ${d.box_height});
                border: var(--box_border_main, ${d.box_border});
                border-radius: var(--box_radius_main, ${d.box_radius});
/*                 overFlow: hidden;
 */                transition: var(--box_transition_main, ${d.transition});
            }

            .main {
                width: 100%;
                height: 100%;
                white-space: pre;
                background: var(--box_back_main, ${d.box_back});
                backDrop-filter: blur(var(--box_back_blur_main, ${d.box_filter}));
            }

            .relative { position: relative; }
            .absolute { position: absolute; }
            .center { display: flex; align-items: center; justify-content: center;}
        `
    }

    #configure = () => {
        this.conf = this.defaultConf ? this.base.validateConfig(this.defaultConf, this.newConf, this) : this.defaultConf
        Object.entries(this.conf).forEach(([key, value], num) => {
            Object.entries(value).forEach(([subKey, subValue]) => {
                this.base.toCssVar2(subKey + "_" + key, subValue, this)
            })
        })
    }

    #addLinks = () => {
        if (this.links && this.links.length) this.base.addLinks(this, this.links)
    }

    #addTextBoxes = () => {
        const boxes = Object.keys(this.conf).filter(key => key !== "main").length
        for (let box = 0; box < boxes; box++) {
            const textBox = this.base.add("div", this.container, `textBox_${box} absolute`)
            const textLeft = this.base.add("div", textBox, `textLeft_${box} center`)
            const textRight = this.base.add("div", textBox, `textRight_${box} center`)
            this.#addStylePrototype(box)
        }
    }

    #addStylePrototype = (i) => {
        const d = this.defaultConf
        this.newStyle.textContent += `
            .textBox_${i} {
                display: flex;
                position: var(--textBox_position_${i}, ${d.textBox_position});
                left: var(--textBox_left_${i}, ${d.textBox_left});
                width: var(--textBox_width_${i}, ${d.textBox_width});
                height: var(--textBox_height_${i}, ${d.textBox_height});
                transition: var(--textBox_transition_${i}, ${d.textBox_transition});
                
                .expandLeft_${i} { 
                    width: var(--box_width_main, ${d.box_width});
                    transition: var(--textBox_transition_${i}, ${d.textBox_transition});
                    background: var(--textBox_back_${i}, ${d.textBox_back});
                }

                .expandRight_${i} { 
                    width: var(--box_width_main, ${d.box_width});
                    transition: var(--textBox_transition_${i}, ${d.textBox_transition});
                    background: var(--textBox_back_${i}, ${d.textBox_back});
                }

                .textLeft_${i}, 
                .textRight_${i} {
                    width: 50%;
                    height: 100%;
                    font-family: var(--textBox_font_${i}, ${d.textBox_font});
                    font-size: var(--textBox_fontSize_${i}, ${d.textBox_fontSize});
                    font-style: var(--textBox_fontStyle_${i}, ${d.textBox_fontStyle});
                    text-indent: var(--textBox_textIndent_${i}, ${d.textBox_textIndent});
                    color: var(--textBox_color_${i}, ${d.textBox_color});
                    background: var(--textBox_back_${i}, ${d.textBox_back});
                    mix-blend-mode: var(--textBox_mixBlendMode_${i}, ${d.textBox_mixBlendMode});
                }

                .padding { padding: var(--textBox_padding_${i}, ${d.textBox_padding});}
            }
        `
    }

    #addContent = () => {
        const textBoxes = Array.from(this.dom.querySelectorAll("[class^='textBox']"))
        textBoxes.forEach((box, num) => {
            if (this.conf[num].textBox_content) {
                box.querySelector("[class^='text']").textContent = this.conf[num].textBox_content
                box.querySelector("[class^='text']").classList.add(".padding")
            }
        })
    }

    #init = async () => {
        this.#configure()
        this.#addLinks()
        this.#draw()
        this.#addTextBoxes()
        this.#addContent()
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

    getTextBoxes() {
        const textBoxes = Array.from(this.dom.querySelectorAll("[class^='textBox']"))
        console.log(textBoxes)
    }

    updateProp(prop, value, dom) {
        const keys = prop.split(".")
        dom.conf[keys[0]][keys[1]] = value
        dom.base.toCssVar2(keys[1] + "_" + keys[0], value, dom)
    }

    async moveTo(side, index) {
        if (side === "left") {
            this.updateProp(`${index}.textBox_left`, "-100%")
        } 

        if (side === "right") {
            this.updateProp(`${index}.textBox_left`, "100%")
        }
    }

    async addText(text, index, side) {
        let box = side === "left" 
            ? this.dom.querySelector(`.textBox_${index} .textLeft_${index}`)
            : this.dom.querySelector(`.textBox_${index} .textRight_${index}`)
            console.log(box)
        box.textContent = text
        box.classList.add("padding")
        return box
    }
}
customElements.define(tag, FlashText)