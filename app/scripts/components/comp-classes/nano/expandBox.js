export const tag = "expand-box"
export class ExpandBox extends HTMLElement {
    constructor() {
        super()

        this.id
        this.base
        this.eventDom
        this.eventName
        this.nodes = {}
        this.newConf = {} /* custom Conf */
        this.conf = {} /* final Conf */
        this.newLogic = {} /*  custom Logic */
        this.logic = {} /*  final Logic */

        this.defaultConf = {
            box_position: ["relative", "absolute"],
            box_top: "0px",
            box_left: "0px",
            box_width: "100%",
            box_height: "100%",
            box_back: "none",
            box_border: "none",
            box_radius: "none",
            box_shadow: "none",
            box_rotate: "none",
            main_transition: "none"
        }


        this.dom = this.attachShadow({ mode: "open" })
    }

    #configure = () => {
        this.conf = this.base.generateConf(this.defaultConf, this.newConf, this)
        this.base.objToCssVar(this.conf, this)
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main")
        const nodesLayer = this.base.add("div", this.container, "nodesLayer")
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
                position: var(--box_position);
                left: var(--box_left);
                top: var(--box_top);
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

            .center { display: flex; align-items: center; justify-content: center; }
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
        this.conf[prop] = value
        this.base.toCssVar2(prop, value, this)
    }

    addNodes = (number) => {
        const nodesLayer = this.dom.querySelector(".nodesLayer")

        for (let i = 0; i < Number(number); i++) {
            const node = this.base.add("div", nodesLayer, "node relative center")
            node.setAttribute("node", "node_" + i)
        }
        this.nodes = this.base.getNodes(this.dom)
    }

    init = () => {
        this.#configure()
        this.#draw()
        this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }
}
customElements.define(tag, ExpandBox)