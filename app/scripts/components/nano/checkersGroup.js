export const tag = "radio-group"
export class RadioGroup extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.css
        this.logic
        this.base
        this.links
        this.data
        this.id
        this.eventDom
        this.eventName

        this.defaultLogic = {
            horizontal: false
        }

        this.defaultCss = {
            box_width: "fit-content",
            box_height: "fit-content",

            option_width: "fit-content",
            option_height: "fit-content",
            option_hover_color: "blue",
            option_hover_back: "initial",
            option_checked_back: "initial",

            iconBox_size: "fit-content",
            iconBox_margin: "none",

            icon_font: "initial",
            icon_color: "initial",
            icon_size: "20px",
            icon_border: "none",
            icon_radius: "none",
            icon_back: "none",
            icon_fontSize: "initial",

            material_font: "Material Symbols Outlined",
            material_fontSize: "initial",
            material_color: "initial",
            material_size: "20px",
            material_border: "none",
            material_radius: "none",
            material_back: "none",

            label_width: "100%",
            label_height: "100%",
            label_font: "initial",
            label_fontSize: "initial",
            label_color: "initial",
            label_indent: "none",
            label_border: "none",
            label_radius: "none",
            label_back: "none",

            transition: "none"
        }
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main relative")
        const style = this.base.add("style", this.dom)

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

                .option {
                    width: var(--option_width);
                    height: var(--option_height);

                    .iconBox {
                        width: var(--iconBox_size);
                        aspect-ratio: 1/1;
                        margin: var(--iconBox_margin);

                        .icon {
                            width: var(--icon_size);
                            aspect-ratio: 1/1;
                            border: var(--icon_border);
                            border-radius: var(--icon_radius);
                            background: var(--icon_back);
                            font-family: var(--icon_font); 
                            font-size: var(--icon_fontSize); 
                            color: var(--icon_color);
                        }

                        .material {
                            width: var(--icon_size);
                            aspect-ratio: 1/1;
                            border: var(--material_border);
                            border-radius: var(--material_radius);
                            background: var(--material_back);
                            font-family: var(--material_font); 
                            font-size: var(--material_fontSize); 
                            color: var(--material_color);
                        }
                    }

                    .label {
                        width: var(--label_width);
                        height: var(--label_height);
                        border: var(--label_border);
                        border-radius: var(--label_radius);
                        background: var(--label_back);
                        font-family: var(--label_font);
                        font-size: var(--label_fontSize);
                        text-indent: var(--label_indent);
                        color: var(--label_color);
                    }

                    &:hover .icon {
                        border-color: transparent;
                        background: var(--option_hover_back);
                        color: var(--text_dark_color);
                    }

                    &:has(input:checked) .icon {
                        border-color: transparent;
                        background: var(--option_checked_back);
                        color: var(--text_dark_color);
                    }

                    &:hover .label,
                    &:has(input:checked) .label {
                        color: var(--text_dark_color);
                    }
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .horizontal {display: flex;}
            .verticalCenter {display: flex; align-items: center;}
            .center {display: flex; justify-content: center; align-items: center;}
            .hiddenInput {appearance: none; width: 100%; height: 100%; cursor: pointer;}
            .transition {transition: var(--transition);}
        `
    }

    #configure = () => {
        this.css = this.base.config(this.defaultCss, this.css, "css", this)
        this.base.cssVar(this.css, this)
        this.logic = this.base.config(this.defaultLogic, this.logic, "logic", this)
    }

    #applyOrientation = () => {
        this.logic.horizontal && this.container.classList.add("horizontal")
    }

    #applyFonts = () => {
        if (this.links.length) this.base.addLinks(this, this.links)
    }

    #applyConf = () => {
        this.#applyOrientation()
        this.#applyFonts()
    }

    #addSpace = (size, num) => {
        console.log("space")
        const ownClassCss = this.base.add("style", this.dom)
        ownClassCss.textContent = `.space_${num} {width: ${size}}`
        return this.base.add("span", this.container, `space_${num}`)
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
        this.data.forEach((item, num) => {
            this.#checkData(item)
            const itemBox = item.box
            const itemType = item.type ?? null
            const itemIcon = item.icon ?? null
            const itemLabel = item.label ?? null
            const option = this.base.add("div", this.container, "option verticalCenter relative")

            if (itemIcon) {
                const iconBox = this.base.add("div", option, "iconBox center")

                if (itemType === "text") {
                    const icon = this.base.add("div", iconBox, "icon center transition")
                    icon.textContent = item.icon
                }
                if (itemType === "material") {
                    const icon = this.base.add("div", iconBox, "material center transition")
                    icon.textContent = item.icon
                }
            }

            if (itemLabel) {
                const labelBox = this.base.add("div", option, "label verticalCenter transition")
                labelBox.textContent = item.label
            }
            if (itemBox === "radio") {
                const radio = this.base.addInput(item.box, option, num + 1, item.name, "hiddenInput absolute")
                item.checked && (radio.checked = true)
            }
            if (itemBox === "checkbox") this.base.addInput(item.box, option, num + 1, "", "hiddenInput absolute")
            if (itemBox === "space") this.#addSpace(item.size, num)
        })
        return this.dom.querySelectorAll("input")
    }

    #applyEvents = (inputs) => {
        inputs.forEach(item => {
            item.addEventListener("change", (e) => {
                this.base.sendEvent(this.eventDom, this.eventName, { input: e.target.id })
            })
        })
    }

    #init = () => {
        this.#configure()
        this.#draw()
        this.#applyConf()
        const inputs = this.#drawInputs()
        this.#applyEvents(inputs)
    }

    addDependency(dependency) {
        if (!this.base) {
            this.base = dependency
            this.#init()
        }
    }
}

customElements.define(tag, RadioGroup)