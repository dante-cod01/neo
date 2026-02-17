export const tag = "multi-background"
export class MultiBack extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.links
        this.eventDom
        this.eventName
        this.newCss = {} /* custom Conf */
        this.css = {} /* final Conf */
        this.newLogic = {} /*  custom Logic */
        this.logic = {} /*  final Logic */

        this.defaultCss = {
            box_width: "100%",
            box_height: "100",
            box_back: "none"
        }

        this.defaultLogic = {
            direction: ["hor", "ver"],
            backsNum: "1"
        }

        this.dom = this.attachShadow({ mode: "open" })
    }
    /* private methods */
    #init() {
        this.#configure()
        this.#draw()
        if (this.eventDom && this.eventName) this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    #configure() {
        this.css = this.base.generateConf(this.defaultCss, this.newCss, this)
        this.base.objToCssVar(this.css, this)
        this.logic = this.base.generateConf(this.defaultLogic, this.newLogic, this)
    }

    #draw() {
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
                background: var(--box_back);
            }

            .main {
                width: 100%,
                height: 100%;
            }
        `
    }

    /* public methods */
    addDependency(dependency) {
        if (this.eventDom === "undefined") { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === "undefined") { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.base = dependency
        this.#init()
    }

}
customElements.define(tag, MultiBack)