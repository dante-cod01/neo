export const tag = "expand-bar"
export class ExpandBar extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.css
        this.base
        this.nodes
        this.eventDom
        this.eventName

        this.defaultCss = {
            box_width: "200px",
            box_height: "200px",
            box_width_max: "100px",
            box_back: "red",
            box_radius: "0px",
            box_blur: "none",
            transition: "1s"
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
                width: var(--box_width);
                height: var(--box_height);
                transition: var(--transition);
            }

            .main {
                backdrop-filter: blur(var(--box_blur));
                .colorLayer {background: var(--box_back);}
                .nodesLayer {top: 0; display: flex; justify-content: space-between; width: calc(100% - 40px); margin: 0 20px;}
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .max {width: 100%; height: 100%;}
            .center {display: flex; justify-content: center; align-items: center;}
            .transition {transition: var(--transition);}
            /* colorLayer */
            .normalRadius {border-radius: var(--box_radius);}
            .lateralRadius {border-radius: var(--box_height);}
            .close {width: 100%; left: 0px;}
            .openLeft {width: calc(100% + var(--box_width_max)); left: calc(var(--box_width_max) * -1);}
            .openRight {width: calc(100% + var(--box_width_max));}
            .bothOpen {width: calc(100% + var(--box_width_max) * 2); left: calc(var(--box_width_max) * -1);}
        `
    }

    #configure = () => {
        this.css = this.css ? this.base.config(this.defaultCss, this.css, "css", this) : this.defaultCss
        this.base.cssVar(this.css, this)
    }

    #init() {
        this.base.sendEvent(this.eventDom, this.eventName, "preLoaded")
        this.#configure()
        this.#draw()
        this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    #newRadius = (boolean, box) => {
        boolean ? box.classList.add("lateralRadius") : box.classList.remove("lateralRadius")
    }

    addDependency(dependency) {
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

    updateProp(prop, value) {
        this.base.updateProp(this.css, prop, value, this)
    }

    async expand(mode = null) {
        const colorLayer = this.dom.querySelector(".colorLayer")
        const time = this.base.convertTransition(this.css.transition)

        colorLayer.classList.remove("bothOpen", "openLeft", "openRight")
        this.#newRadius(false, colorLayer)

        if (mode === "left") colorLayer.classList.add("openLeft")
        if (mode === "right") colorLayer.classList.add("openRight")
        if (mode === "both") { colorLayer.classList.add("bothOpen"); this.#newRadius(true, colorLayer) }
        await new Promise(resolve => setTimeout(resolve, time))
    }
}
customElements.define(tag, ExpandBar)