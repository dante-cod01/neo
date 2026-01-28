export const tag = "expand-bar_new"
export class ExpandBar extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.newConf
        this.base
        this.nodes
        this.eventDom
        this.eventName
        /* internal */
        this.expands = { left: false, right: false, both: false }

        this.defaultConf = {
            width: "200px",
            height: "200px",
            width_max: "100px",
            back: "none",
            radius: "0px",
            backDrop_filter: "none",
            transition: "none"
        }
    }

    #draw() {
        this.container = this.base.add("div", this.dom, "main relative max")
        const style = this.base.add("style", this.dom)

        this.container.innerHTML = `
            <div class="colorLayer relative transition max close normalRadius"></div>
            <div class="nodesLayer absolute"></div>
        `

        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--width);
                height: var(--height);
                transition: var(--transition);
                border: 1px solid red;
            }

            .main {
                backdrop-filter: blur(var(--backDrop_filter));

                .colorLayer {
                    background: var(--back); border: 1px solid green;
                }

                .nodesLayer {
                    top: 0; 
                    display: flex; 
                    justify-content: space-between;
                    width: calc(100% - 40px);
                    margin: 0 20px;
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .max {width: 100%; height: 100%;}
            .center {display: flex; justify-content: center; align-items: center;}
            .transition {transition: var(--transition);}
            /* colorLayer */
            .normalRadius {border-radius: var(--radius);}
            .leftRadius {border-radius: var(--height);}
            .close {width: 100%; left: 0px;}
            .openLeft {width: calc(100% + var(--width_max)); left: calc(var(--width_max) * -1);}
            .openRight {width: calc(100% + var(--width_max));}
            .bothOpen {width: calc(100% + var(--width_max) * 2); left: calc(var(--width_max) * -1);}
        `
    }

    #configure = () => {
        this.conf = this.newConf ? this.base.generateConf(this.defaultConf, this.newConf, this) : console.log(this, "newConf not defined")
        console.log(this.conf)
        this.base.objToCssVar(this.conf, this)
    }

    #init() {
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
            const node = this.base.add("div", nodesLayer, "center")
            node.setAttribute("node", "node_" + i)
        }
        this.nodes = this.base.getNodes(this.dom)
    }

    updateConf(prop, value) {
        this.base.updateConf(prop, value, this)
    }

    async expand(mode, boolean, size = null) {
        const colorLayer = this.dom.querySelector(".colorLayer")
        const time = this.base.convertTransition(this.conf.transition)
        size && this.updateConf("width_max", size)

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