export const tag = "expand-box"
export class ExpandBox extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.css
        this.logic
        this.eventDom
        this.eventName

        this.defaultCss = {
            box_width: "100%",
            box_height: "100%",
            box_back: "none",
            box_border: "none",
            box_radius: "none",
            box_shadow: "none",
            box_rotate: "none",
            main_transition: "none"
        }

        this.defaultLogic = {

        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #configure = () => {
        this.css = this.css ? this.base.config(this.defaultCss, this.css, "css", this) : this.defaultCss
        this.base.cssVar(this.css, this)
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main")
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
                transition: var(--normal_transition);
            }

            .main {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
                background: var(--box_back);
                background-size: cover;
                background-position: center;
                background-repeat: no-repeat;
                border: var(--box_border);
                border-radius: var(--box_radius);
                box-shadow: var(--box_shadow);
                transform: rotate(var(--box_rotate));
                transition: var(--normal_transition);
            }
        `
    }

    addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.base) {
            this.base = dependency
            this.init()
        }
    }

    updateProp(prop, value) {
        this.base.updateProp(this.css, prop, value, this)
    }

    init = () => {
        this.#configure()
        this.#draw()
    }
}
customElements.define(tag, ExpandBox)