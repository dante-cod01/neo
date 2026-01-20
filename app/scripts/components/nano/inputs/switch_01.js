export const tag = "switch-01"
export class CheckBox_1 extends HTMLElement {
    constructor() {
        super()

        this.based
        this.css
        this.logic
        this.fonts
        this.eventDom
        this.eventName
        this.input

        this.defaultCss = {
            box_width: "100%",
            box_height: "100%",
            box_back: "none",
            box_border: "none",
            box_radius: "none",
            box_shadow: "none",

            switch_width: "50%",
            switch_height: "100%",
            switch_back_off: "none",
            switch_back_on: "none",
            switch_border: "none",
            switch_radius: "none",
            switch_shadow: "none",

            pointer_width: "50%",
            pointer_height: "100%",
            pointer_back_off: "red",
            pointer_back_on: "green",
            pointer_border_off: "none",
            pointer_border_on: "none",
            pointer_radius: "none",
            pointer_filter: "none",

            icon_size: "initial",
            icon_color: "initial",

            label_font: "Anta",
            label_style: "italic",
            label_size: "14px",
            label_color: "red",
            label_padding: "none",
            label_hover_color: "none",
            label_checked_color: "none",

            transition: "none"
        }

        this.defaultLogic = {
            label_content: "default label",
            type: ["switch", "label"],
            label_pos: ["left", "right"],
            icon: "none",
            icon_pos: ["left", "right"]
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #draw = async () => {
        const css = this.css
        const logic = this.logic
        this.container = this.based.add("div", this.dom, "container center relative")
        const style = this.based.add("style", this.dom)
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: ${css.box_width};
                height:  ${css.box_height};
            }

            .container {
                display: flex;
                width: 100%;
                height: 100%;
                background: ${css.box_back};
                border: ${css.back_border};
                border-radius: ${css.box_radius};
                box-shadow: ${css.box_shadow};

                &:has(input:checked) {
                    .label { color: ${css.label_checked_color}; }

                    .switchBox .back {
                        background: ${css.switch_back_on};

                        .pointer {
                            left: calc(100% - ${css.pointer_width});
                            background: ${css.pointer_back_on};
                            border: ${css.pointer_border_on};
                            filter: ${css.pointer_filter};
                        }
                    }
                }

                &:hover .label { color: ${css.label_hover_color}; }

                .label {
                    flex: 1;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    height: 100%;
                    padding: ${css.label_padding};
                    color: ${css.label_color};

                    .labelText {
                        width: fit-content;
                        font-family: ${css.label_font};
                        font-style: ${css.label_style};
                        font-size: ${css.label_size};
                    }

                    .iconBox {
                        width: fit-content;
                        height: 100%;
                        font-family: "Material Symbols Outlined";
                        font-size: ${this.css.icon_size};
                    }
                }

                .switchBox {
                    width: ${css.switch_width};
                    height: 100%;

                    .back {
                        width: 100%;
                        height: ${css.switch_height};
                        background: ${css.switch_back_off};
                        border: ${css.switch_border};
                        border-radius: ${css.switch_radius};
                        box-shadow: ${css.switch_shadow};
                        transition: ${css.transition};

                        .pointer {
                            left: 0;
                            width: ${css.pointer_width};
                            height: ${css.pointer_height};
                            background: ${css.pointer_back_off};
                            border: ${css.pointer_border_off};
                            border-radius: ${css.pointer_radius};
                            transition: ${css.transition};
                        }
                    }
                }
            }

            .max { width: 100%; height: 100%; }
            .relative { position: relative;}
            .absolute { position: absolute; }
            .center { display: flex; justify-content: center; align-items: center;}
            .verticalCenter {display: flex; align-items: center;}
            .inputHidden { appearance: none; cursor: pointer; }
        `
    }

    #init = async () => {
        this.based.addLinks(this.dom, this.fonts)
        this.#configure()
        await this.#draw()
        this.#drawAll()
        this.input = this.dom.querySelector("input")
        this.loadEvents()
    }

    #configure = () => {
        this.css = this.css ? this.based.config(this.defaultCss, this.css, "css", this) : this.defaultCss
        this.logic = this.logic ? this.based.config(this.defaultLogic, this.logic, "logic", this) : this.defaultLogic
    }

    #addSwitch = async () => {
        const switchBox = this.based.add("div", this.container, "switchBox center")
        const back = this.based.add("div", switchBox, "back verticalCenter relative")
        const pointer = this.based.add("div", back, "pointer absolute center")
    }

    #addLabel = () => {
        let iconBox
        const label = this.based.add("div", this.container, "label max")
        this.logic.icon !== "none" && (iconBox = this.based.add("div", document.body, "iconBox center"))

        const labelText = this.based.add("div", label, "labelText")
        labelText.textContent = this.logic.label_content

        if (this.logic.icon) {
            iconBox.textContent = this.logic.icon
        }
        if (iconBox) this.logic.icon_pos === "left"
            ? label.prepend(iconBox)
            : label.appendChild(iconBox)

        return label
    }

    #drawAll = () => {
        if (this.logic.type === "text") {
            const label = this.#addLabel()
        }
        if (this.logic.type === "switch") {
            if (this.logic.label_pos === "left") {
                const label = this.#addLabel()
                const sw = this.#addSwitch()
            }
            if (this.logic.label_pos === "right") {
                const sw = this.#addSwitch()
                const label = this.#addLabel()
            }
        }

        const ckeckbox = this.based.addInput("checkbox", this.container, "checkbox", "", "inputHidden absolute max")
    }

    loadEvents = () => {
        this.input.addEventListener("change", (e) => {
            this.based.sendEvent(this.eventDom, this.eventName, {value: e.target.checked})
        })
    }

    inputChecked = (boolean) => {
        this.input.checked = boolean
    }

    async addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.based) {
            this.based = dependency
            await this.#init()
        }
    }
}
customElements.define(tag, CheckBox_1)