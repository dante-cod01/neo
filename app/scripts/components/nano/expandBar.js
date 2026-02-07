export const tag = "expand-bar"
export class ExpandBar extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.newConf
        this.base
        this.nodes
        this.eventDom
        this.eventName
        this.nodes
        /* internal */
/*         this.expands = { left: false, right: false, both: false }
 */
        this.defaultConf = {
            box_width: "200px",
            box_height: "200px",
            box_width_max: "100px",
            box_back: "none",
            box_radius: "0px",
            box_backDrop_filter: "none",
            box_transition: "none",
            box_nodesLayer_padding: "0px"
        }
    }

    #draw() {
        this.container = this.base.add("div", this.dom, "main relative max")
        const style = this.base.add("style", this.dom)

        this.container.innerHTML = `
            <div class="colorLayer relative transition max close normalRadius"></div>
            <div class="nodesLayer absolute max"></div>
        `

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
                transition: var(--box_transition);
            }

            .main {
                backdrop-filter: blur(var(--box_backDrop_filter));

                .colorLayer { background: var(--box_back); }

                .nodesLayer {
                    top: 0; 
                    display: flex; 
                    justify-content: space-between;
                    padding: var(--box_nodesLayer_padding);

                    .node { 
                        display: flex; 
                        align-items: center;
                        height: 100%;
                        white-space: nowrap; 
                    }
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .max {width: 100%; height: 100%;}
            .center {display: flex; justify-content: center; align-items: center;}
            .transition {transition: var(--box_transition);}
            /* colorLayer */
            .normalRadius {border-radius: var(--box_radius);}
            .close {left: 0px;}
            .openLeft {width: calc(100% + var(--box_width_max)); left: calc(var(--box_width_max) * -1);}
            .openRight {width: calc(100% + var(--box_width_max));}
            .bothOpen {width: calc(100% + var(--box_width_max) * 2); left: calc(var(--box_width_max) * -1);}
        `
    }

    #configure = () => {
        this.conf = this.newConf ? this.base.generateConf(this.defaultConf, this.newConf, this) : console.log(this, "newConf not defined")
        this.base.objToCssVar(this.conf, this)
    }

    async #init() {
        this.#configure()
        this.#draw()
        this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    #newRadius = (side, box) => {
/*         side === "left" && box.classList.add("lateralRadius") : box.classList.remove("lateralRadius")
 */    }

    addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.base) {
            this.base = dependency
            this.#init()
        }
    }

    addNodes = (number) => {
        const nodesLayer = this.dom.querySelector(".nodesLayer")

        for (let i = 0; i < Number(number); i++) {
            const node = this.base.add("div", nodesLayer, "node relative")
            node.setAttribute("node", "node_" + i )
        }
        this.nodes = this.base.getNodes(this.dom)
    }

    updateProp(prop, value) {
        this.conf[prop] = value
        this.base.toCssVar2(prop, value, this)
    }

    async expand(mode = null, boolean = true) {
        const colorLayer = this.dom.querySelector(".colorLayer")
        const time = this.base.convertTransition(this.conf.box_transition)

        colorLayer.classList.remove("bothOpen", "openLeft", "openRight")
        this.#newRadius(false, colorLayer)

        if (mode === "left") {
            boolean ? colorLayer.classList.add("openLeft") : colorLayer.classList.remove("openLeft")
            this.#newRadius("left", colorLayer)
        }
        if (mode === "right") {
            boolean ? colorLayer.classList.add("openRight") : colorLayer.classList.remove("openRight")
            this.#newRadius("right", colorLayer)
        }
        if (mode === "both") {
            colorLayer.classList.add("bothOpen")
            this.#newRadius("both", colorLayer)
        }
        await new Promise(resolve => setTimeout(resolve, time))
    }
}
customElements.define(tag, ExpandBar)