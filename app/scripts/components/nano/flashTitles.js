export const tag = "flash-text"
export class FlashText extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.css
        this.logic
        this.eventDom
        this.eventName

        this.css = {

        }

        this.logic = {

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

            }
        `
    }

}
customElements.define(tag, FlashText)