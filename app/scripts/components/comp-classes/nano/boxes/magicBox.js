export const tag = "magic-box"
export class MagicBox extends HTMLElement {
    constructor() {
        super()

        this.id
        this.deps
        this.links
        this.eventDom
        this.eventName
        this.newCss         /* custom Conf */
        this.css            /* final Conf */
        this.newLogic       /*  custom Logic */
        this.logic          /*  final Logic */

        this.defaultCss = {
            box_width: "100%",
            box_height: "100%",
            box_back: "none",
            box_radius: "none",
            box_transition: "none"
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #configure() {
        this.css = this.newCss === "" ? this.defaultCss : this.deps.base.generateConf(this.defaultCss, this.newCss, this)
        this.deps.base.objToCssVar(this.css, this)
    }

    #draw() {
        this.dom.innerHTML = `
            <div class="main relative">
                <div class="side top absolute"></div>
                <div class="side right absolute"></div>
                <div class="side bottom absolute"></div>
                <div class="side left absolute"></div>
                <div class="node center relative"></div>
            </div>
        `

        this.customStyle = this.deps.base.add("style", this.dom)
        this.customStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--host_width);
                height: var(--host_height);
                transition: var(--box_transition);
                border: 1px solid green;

                --host_width: var(--box_width);
                --host_height: var(--box_height);
                --left_width: 0px;
                --left_pos: 0px;
                --right_width: 0px;
                --right_pos: 0px;
                --top_height: 0px;
                --top_pos: 0px;
                --bottom_height: 0px;
                --bottom_pos: 0px;
            }

            .main {
                width: 100%;
                height: 100%;
                background: var(--box_back);

                .side {
                    transition: var(--box_transition);
/*                     border: 1px solid red;
 */                }

                .top {
                    top: var(--top_pos);
                    width: 100%;
                    height: var(--top_height);
                }

                .bottom {
                    bottom: var(--bottom_pos);
                    width: 100%;
                    height: var(--bottom_height);
                }

                .left {
                    left: var(--left_pos);
                    width: var(--left_width);
                    height: 100%;
                }

                .right {
                    right: var(--right_pos);
                    width: var(--right_width);
                    height: 100%;
                }  
                    
                .node {
                    width: 100%;
                    height: 100%;
                    overflow: hidden;
                    border-radius: var(--box_radius);
                    border: 1px solid blue;
                }
            }

            .absolute {position: absolute;}
            .relative {position: relative;}
        `
    }

    /* public */
    addDependency(dependencies) {
        if (this.eventDom === undefined) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === undefined) { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.deps = dependencies
    }

    getNodes() { return Array.from(this.dom.querySelectorAll(".node")) }

    expand(boolean, side, length) {
        this.deps.base.sendEvent(this.eventDom, this.eventName, { expand: boolean, value: "init" })
        if (side === "left") {
            this.deps.base.toCssVar("left_width", boolean ? length : "0px", this)
            this.deps.base.toCssVar("left_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        if (side === "right") {
            this.deps.base.toCssVar("right_width", boolean ? length : "0px", this)
            this.deps.base.toCssVar("right_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        if (side === "top") {
            this.deps.base.toCssVar("top_height", boolean ? length : "0px", this)
            this.deps.base.toCssVar("top_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        if (side === "bottom") {
            this.deps.base.toCssVar("bottom_height", boolean ? length : "0px", this)
            this.deps.base.toCssVar("bottom_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        this.deps.base.sendEvent(this.eventDom, this.eventName, { expand: boolean, value: "finish" })
    }


    contract(boolean, orientation, length) {
        if (orientation === "left" || orientation === "right") {
            this.deps.base.toCssVar("host_width", boolean ? length : this.css.box_width, this)
        }
        if (orientation === "top" || orientation === "bottom") {
            this.deps.base.toCssVar("host_height", boolean ? length : this.css.box_height, this)
        }
    }

        async init() {
        this.#configure()
        this.#draw()
        if (this.eventDom && this.eventName) this.deps.base.sendEvent(this.eventDom, this.eventName, { ready: true })

/*         await this.deps.base.pause(1000)
        this.expand(true, "left", "100px")
        await this.deps.base.pause(1000)
        this.expand(false, "left")

        await this.deps.base.pause(1000)
        this.expand(true, "right", "100px")
        await this.deps.base.pause(1000)
        this.expand(false, "right")

        await this.deps.base.pause(1000)
        this.expand(true, "top", "100px")
        await this.deps.base.pause(1000)
        this.expand(false, "top")

        await this.deps.base.pause(1000)
        this.expand(true, "bottom", "100px")
        await this.deps.base.pause(1000)
        this.expand(false, "bottom")

        await this.deps.base.pause(1000)
        this.contract(true, "left", "100px")
        await this.deps.base.pause(1000)
        this.contract(false, "left")

        await this.deps.base.pause(1000)
        this.contract(true, "right", "100px")
        await this.deps.base.pause(1000)
        this.contract(false, "right")

        await this.deps.base.pause(1000)
        this.contract(true, "top", "100px")
        await this.deps.base.pause(1000)
        this.contract(false, "top")

        await this.deps.base.pause(1000)
        this.contract(true, "bottom", "100px")
        await this.deps.base.pause(1000)
        this.contract(false, "bottom")
 */
    }
}
customElements.define(tag, MagicBox)