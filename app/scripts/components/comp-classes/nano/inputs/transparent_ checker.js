export const tag = "transparent-checker"
export class TransparentChecker extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.css
        this.logic
        this.deps
        this.links
        this.data
        this.id
        this.eventDom
        this.eventName
        this.deps
        this.inputs

        this.defaultCss = {
            box_width: "100%",
            box_height: "100%",
            box_back: "none",
            box_radius: "none",
            box_border: "none"
        }

        this.defaultLogic = {
            horizontal: ["true", "false"]
        }
    }

    #draw = () => {
        this.container = this.deps.base.add("div", this.dom, "main relative")
        const style = this.deps.base.add("style", this.dom)

        style.textContent += `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                color: var(--font_color);
            }

            :host {
                display: block;
                width: var(--box_width);
                height: var(--box_height);
            }

            .main {
                width: 100%;
                height: 100%;
                background: var(--box_back);
                border-radius: var(--box_radius);
                border: var(--box-border);
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .horizontal {display: flex; justify-content: center; align-items: center; }
            .vertical {display: flex; justify-content: center; align-items: center; flex-direction: column; }
            .center {display: flex; justify-content: center; align-items: center;}
            .hiddenInput {appearance: none; width: 100%; height: 100%;}
        `
    }

    #configure = () => {
        this.css = this.deps.base.generateConf(this.defaultCss, this.newCss, this)
        this.deps.base.objToCssVar(this.css, this)
        this.logic = this.deps.base.generateConf(this.defaultLogic, this.newLogic, this)
    }

    #applyOrientation = () => {
        this.logic.horizontal && this.dom.querySelector(".main").classList.add("horizontal")
    }

    #addLinks = () => {
        if (this.links && this.links.length) this.deps.base.addLinks(this, this.links)
    }

    #applyConf = () => {
        this.#applyOrientation()
        this.#addLinks()
    }

    #checkData = (item) => {
        const boxesTypes = ["space", "radio", "checkbox"]
        const types = ["text", "material"]
        const boxCorrect = boxesTypes.includes(item.box)

        if (!item.box) { console.log({ item }, "no type defined return"); return }
        if (!boxCorrect) { console.log({ item }, "box type not defined permited:", boxesTypes); return }
        if (item.box !== "space" && !item.type && !item.label) { console.log("imput empty no label no icon defined") }
        if (item.input === "radio" && !item.name) { console.log({ item }, "radio without name defined"); return }
        if (item.type && !types.includes(item.type)) { console.log({ item }, "type not permited"); return }
        if (item.type && !item.icon) { console.log({ item }, "missing icon"); return }
        if (item.box === "space" && !item.size) { console.log({ item }, "no size defined"); return }
        return true
    }

    #drawInputs = () => {

    }

/*     #applyEvents = (inputs) => {
        inputs.forEach(item => {
            item.addEventListener("change", (e) => {
                this.deps.base.sendEvent(this.eventDom, this.eventName, { input: e.target })
            })
        })
    }
 */
    #init = () => {
        this.#configure()
        this.#draw()
        this.#applyConf()
        const inputs = this.#drawInputs()
/*         this.#applyEvents(inputs)
 */        this.deps.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    addDependency(dependency) {
        this.deps = dependency
        this.#init()
    }
}

customElements.define(tag, TransparentChecker)