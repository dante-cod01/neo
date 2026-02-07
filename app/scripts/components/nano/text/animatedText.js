export const tag = "animated-text"
export class FlashText extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.links
        this.eventDom
        this.eventName
        this.newConf = {} /* custom Conf */
        this.conf = {} /* final Conf */

        this.defaultConf = {
            box_width: "fit-content",
            box_height: "fit-content",
            box_back: "none",
            box_backFilter: "none",
            box_border: "none",
            box_radius: "0px",
            box_transition: "0s",
            box_border: "none",

            textBox_width: "fit-content",
            textBox_height: "fit-content",
            textBox_font: "initial",
            textBox_fontSize: "initial",
            textBox_fontStyle: "initial",
            textBox_fontWeight: "initial",
            textBox_color: "initial",
            textBox_colorEnphasis: "transparent",
            textBox_padding: "0px",
            textBox_back: "none",
            textBox_transition: "1s ease-in",
            textBox_textShadow: "none",
            textBox_filter: "none",
            textBox_scale: "1"
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main center")
        this.container.innerHTML = `
            <div id="textBox" class="textBox center transitionNull"></div>
        `
        const newStyle = this.base.add("style", this.dom)
        newStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--box_width);
                height: var(--box_height);
                transition: var(--box_transition);

                .main {
                    display: flex;
                    width: 100%;
                    height: 100%;
                    background: var(--box_back);
                    border: var(--box_border);
                    border-radius: var(--box_radius);
                    backDrop-filter: var(--box_backFilter);
                    overflow: hidden;

                    .textBox {
                        display: flex;
                        width: var(--textBox_width);
                        height: var(--textBox_height);
                        padding: var(--textBox_padding);

                        .charSpan {
                            width: fit-content;
                            height: 100%;
                            font-family: var(--textBox_font);
                            font-size: var(--textBox_fontSize);
                            font-weight: var(--textBox_fontWeight);
                            font-style: var(--textBox_fontStyle);
                            white-space: pre;
                            transition: var(--textBox_transition);
                        }
                    }
                    
                }
            }

            .center { display: flex; align-items: center; justify-content: center;}

            .invisible { 
                transform: scale(var(--textBox_scale)); 
                opacity: 0; 
                color: var(--textBox_colorEnphasis);  
                text-shadow: var(--textBox_textShadow);
                filter: var(--textBox_filter);
            }

            .visible { 
                transform: scale(1); 
                opacity: 1; 
                color: var(--textBox_color); 
            }
        `
    }

    #configure = () => {
        this.conf = this.defaultConf ? this.base.generateConf(this.defaultConf, this.newConf, this) : this.defaultConf
        this.base.objToCssVar(this.conf, this)
    }

    #addLinks = () => {
        if (this.links && this.links.length) this.base.addLinks(this, this.links)
    }

    #init = () => {
        this.#addLinks()
        this.#configure()
        this.#draw()
        if (this.eventDom && this.eventName) this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    addDependency(dependency) {
        if (this.eventDom === "undefined") { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === "undefined") { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.base = dependency
        this.#init()
    }

    async addText(text) {
        const textBox = this.dom.querySelector(".textBox")
        const time = this.conf.textBox_transition
        textBox.innerHTML = ""

        Array.from(text).forEach(char => {
            const charSpan = this.base.add("span", textBox, "charSpan center invisible")
            charSpan.innerHTML = char === " " ? "&nbsp;" : char
        })

        await this.expandBox(true)
        this.animateText()
    }

    async expandBox(boolean) {
        const width = this.dom.querySelector(".textBox").offsetWidth + "px"
        const time = this.base.convertTransition(this.conf.textBox_transition)

        boolean
            ? this.updateProp("box_width", width)
            : this.updateProp("box_width", "0px")
        await this.base.time(time)
    }

    async animateText() {
        const word = Array.from(this.dom.querySelectorAll(".charSpan"))
        const delay = 100
        let charCount = 0

        for (const item of word) {
            item.classList.replace("invisible", "visible")
            charCount++
            await this.base.time(delay)
        }
    }

    async removeText() {
        const textBox = this.dom.querySelector(".textBox")
        const spans = Array.from(this.container.querySelectorAll(".charSpan"))
        const time = this.base.convertTransition(this.conf.textBox_transition)
        const delay = 100

        for (let index = spans.length - 1; index >= 0; index--) {
            spans[index].classList.replace("visible", "invisible")
            await this.base.time(delay)
        }
        await this.base.time(time)
    }

    updateProp(prop, value) {
        this.conf[prop] = value
        this.base.toCssVar2(prop, value, this)
    }
}
customElements.define(tag, FlashText)