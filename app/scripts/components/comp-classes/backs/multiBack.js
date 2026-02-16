export const tag = "multi-text"
export class MultiBack extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.links
        this.eventDom
        this.eventName
        this.newConf = {} /* custom Conf */
        this.conf = {} /* final Conf */
        this.newLogic = {} /*  custom Logic */
        this.logic = {} /*  final Logic */

        this.defaultCSS = {

        }

        this.defaultLOGIC = {

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
        this.conf = this.base.generateConf(this.defaultConf, this.newConf, this)
        this.base.objToCssVar(this.conf, this)
        this.logic = this.base.generateLogic(this.defaultLogic, this.newLogic, this)
    }

    #draw() {
        this.container = this.base.add("div", this.dom, "main")
        this.container.innerHTML = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            .host {
                width: var(--box_width);
                height: var(--box_height);
                border: 10px solid red;
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
customElements.define("muti-back", MultiBack)