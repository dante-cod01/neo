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
            box_width_contract: "50%",
            box_height_contract: "50%",
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

                .side {
                    background: var(--box_back);
                    transition: var(--box_transition);
                }

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
                    background: var(--box_back);
                    overflow: hidden;
                    border-radius: var(--box_radius);
                    transition: var(--box_transition);
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
            this.deps.base.cssVar("left_width", boolean ? length : "0px", this)
            this.deps.base.cssVar("left_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        if (side === "right") {
            this.deps.base.cssVar("right_width", boolean ? length : "0px", this)
            this.deps.base.cssVar("right_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        if (side === "top") {
            this.deps.base.cssVar("top_height", boolean ? length : "0px", this)
            this.deps.base.cssVar("top_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        if (side === "bottom") {
            this.deps.base.cssVar("bottom_height", boolean ? length : "0px", this)
            this.deps.base.cssVar("bottom_pos", boolean ? parseFloat(length) * -1 + `${length.replace(parseFloat(length), "")}` : "0px", this)
        }
        this.deps.base.sendEvent(this.eventDom, this.eventName, { expand: boolean, value: "finish" })
    }


    contract(boolean, orientation) {
        if (orientation === "left" || orientation === "right") {
            this.deps.base.cssVar("host_width", boolean ? this.css.box_width_contract : this.css.box_width, this)
        }
        if (orientation === "top" || orientation === "bottom") {
            this.deps.base.cssVar("host_height", boolean ? this.css.box_height_contract : this.css.box_height, this)
        }
    }

    updateConf(propOrVar, value) {this.deps.base.updateConf(propOrVar, value, this)}

    async init() {
        this.#configure()
        this.#draw()
        if (this.eventDom && this.eventName) this.deps.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }
}
customElements.define(tag, MagicBox)