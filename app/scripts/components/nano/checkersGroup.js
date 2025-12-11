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
            backHover_color: "red",
            hover_color: "red",
            transition: "1s",

            iconBox_width: "30px",
            iconBox_height: "30px",
            iconBox_border: "none",
            iconBox_radius: "none",
            iconBox_back: "none",
            iconBox_margin: "none",
            iconBox_font: "initial",
            iconBox_fontSize: "initial",
            iconBox_color: "initial",
            material_fontSize: "initial",
            material_color: "initial",
            titleBox_font: "initial",
            titleBox_fontSize: "initial",
            titleBox_color: "initial",
            titleBox_fontStyle: "none",
            titleBox_margin: "none"
        }
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main relative max")
        const style = this.base.add("style", this.dom)

        style.textContent += `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                width: var(--box_width);
                height: var(--box_height);
            }

            .main .option {
                width: var(--option_width);
                height: var(--option_height);

                .iconBox, .titleBox {transition: var(--transition);}

                .iconBox {
                    width: var(--iconBox_width);
                    height: var(--iconBox_height);
                    margin: var(--iconBox_margin);
                }

                .titleBox {
                    width: fit-content;
                    height: 100%;
                    margin: var(--titleBox_margin);
                    font-family: var(--titleBox_font); 
                    font-size: var(--titleBox_fontSize); 
                    color: var(--titleBox_color); 
                    font-style: var(--titleBox_fontStyle)
                }

                &:hover {
                    .iconFont, .titleBox {
                        border-color: transparent;
                        background: var(--backHover_color);
                        color: var(--hover_color);
                    }

                    .material {
                        color: var(--hover_color);
                    }
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .horizontal {display: flex;}
            .vertical {display: flex; flex-direction: column;}
            .center {display: flex; justify-content: center; align-items: center;}
            .iconFont {font-family: var(--iconBox_font); font-size: var(--iconBox_fontSize); color: var(--iconBox_color); background: var(--iconBox_back);}
            .material {font-family: "Material Symbols Outlined"; font-size: var(--material_fontSize); color: var(--material_color);}
            .border {border: var(--iconBox_border); border-radius: var(--iconBox_radius);}
            .iconMargin {margin: var(--iconBox_margin);}
            .titleMargin {margin: var(--titleBox_margin);}
            .hiddenInput {appearance: none; width: 100%; height: 100%; cursor: pointer;}
       `
    }

    #configure = () => {
        this.css = this.base.config(this.defaultCss, this.css, "css", this)
        this.base.cssVar(this.css, this)
        this.logic = this.base.config(this.defaultLogic, this.logic, "logic", this)
    }

    #applyOrientation = () => {
        this.logic.horizontal
            ? this.container.classList.add("horizontal")
            : this.container.classList.add("vertical")
    }

    #applyFonts = () => {
        if (this.links.length) this.base.addLinks(this, this.links)
    }

    #applyConf = () => {
        this.#applyOrientation()
        this.#applyFonts()
    }

    #checkData = (item) => {
        const boxesTypes = ["space", "radio", "checkbox"]
        const iconsTypes = ["text", "material"]
        const boxCorrect = boxesTypes.includes(item.box)

        if (!item.box) { console.log({ item }, "no type defined return"); return }
        if (!boxCorrect) { console.log({ item }, "box type not defined permited:", boxesTypes); return }
        if (item.box !== "space" && !item.iconType && !item.title) { console.log("imput empty no title no icon defined") }
        if (item.input === "radio" && !item.name) { console.log({ item }, "radio without name defined"); return }
        if (item.iconType && !iconsTypes.includes(item.iconType)) { console.log({ item }, "type not permited"); return }
        if (item.iconType && !item.icon) { console.log({ item }, "missing icon"); return }
        return true
    }

    #drawInputs = () => {
        this.data.forEach(item => {
            this.#checkData(item)
            const box = item.box
            const iconType = item.iconType ?? null
            const icon = item.icon ?? null
            const title = item.title ?? null
            const option = this.base.add("div", this.container, "option center relative")

            if (icon) {
                const iconBox = this.base.add("div", option, "iconBox center")

                if (iconType === "text") {
                    iconBox.textContent = item.icon
                    iconBox.classList.add("iconFont", "border")
                }
                if (iconType === "material") {
                    iconBox.textContent = item.icon
                    iconBox.classList.add("material")
                }
            }

            if (title) {
                const titleBox = this.base.add("div", option, "titleBox titleFont center")
                titleBox.textContent = item.title
            }

            if (box === "radio") this.base.addInput(item.box, option, item.name, "hiddenInput absolute")
            if (box === "checkbox") this.base.addInput(item.box, option, "", "hiddenInput absolute")
        })
    }

    #init = () => {
        this.#configure()
        this.#draw()
        this.#applyConf()
        this.#drawInputs()
    }

    addDependency(dependency) {
        if (!this.base) {
            this.base = dependency
            this.#init()
        }
    }
}

customElements.define(tag, RadioGroup)