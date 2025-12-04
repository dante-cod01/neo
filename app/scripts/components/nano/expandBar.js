export const tag = "expand-bar"
export class ExpandBar extends HTMLElement {
    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        /* received props */
        this.entryCss
        /* work props */
        this.dependency
        this.outCss = {}

        this.defaultCss = {
            box_w: "200px",
            box_h: "200px",
            box_w_max: "100px",
            box_back: "red",
            box_radius: "0px",
            transition: "1s"
        }
    }

    addDependency(dependency) {
        if (!this.dependency) {
            this.dependency = dependency
            this.#init()
        }
    }

    #draw() {
        this.container = this.dependency.add("div", this.dom, "main relative max")
        const style = this.dependency.add("style", this.dom)

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
                width: var(--box_w);
                height: var(--box_h);

                --radiusMax: none;
            }

            .main {
                .colorLayer {background: var(--box_back);}
                .nodesLayer {top: 0; display: flex; border: 1px solid red;}
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .max {width: 100%; height: 100%;}
            .center {display: flex; justify-content: center; align-items: center;}
            .transition {transition: var(--transition);}
            /* colorLayer */
            .normalRadius {border-radius: var(--box_radius);}
            .lateralRadius {border-radius: var(--box_h);}
            .opacityMax {opacity: 1;}
            .opacityHalf {opacity: 0.5;}
            .close {width: 100%; left: 0px;}
            .openLeft {width: calc(100% + var(--box_w_max)); left: calc(var(--box_w_max) * -1);}
            .openRight {width: calc(100% + var(--box_w_max));}
            .bothOpen {width: calc(100% + var(--box_w_max) * 2); left: calc(var(--box_w_max) * -1);}
        `
    }

    #configure = () => {
        this.outCss = this.dependency.config(this.defaultCss, this.entryCss, "css", this)
        this.dependency.addCssVars(this.outCss, this)
    }

    #init() {
        this.dependency.sendEvent(this.eventDom, this.eventName, "preLoaded")
        this.#configure()
        this.#draw()
    }

    #newRadius = (boolean, box) => {
        if (boolean) {
            box.classList.add("lateralRadius")
            box.classList.add("opacityHalf")
        } else {
            box.classList.remove("lateralRadius")
            box.classList.remove("opacityHalf")
        }
    }

    addNodes = (number) => {
        const nodesLayer = this.dom.querySelector(".nodesLayer")
        console.log(nodesLayer)
        for (let i = 0; i < Number(number); i++) {
            const node = this.dependency.add("div", nodesLayer)
            node.setAttribute("node", "node_" + i)
        }
    }

    expand(mode = null) {
        const colorLayer = this.dom.querySelector(".colorLayer")
        colorLayer.classList.remove("bothOpen", "openLeft", "openRight")
        this.#newRadius(false, colorLayer)

        if (mode === "left") colorLayer.classList.add("openLeft")
        if (mode === "right") colorLayer.classList.add("openRight")
        if (mode === "both") { colorLayer.classList.add("bothOpen"); this.#newRadius(true, colorLayer) }
    }

    getNodes() {
        return this.dependency.getNodes(this.dom)
    }
}
customElements.define(tag, ExpandBar)