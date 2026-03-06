export const tag = "title-icon"
export default class TitleIcon extends HTMLElement {
    constructor() {
        super()
        /* FALTA LOGICA PARA ICONO IMAGEN */
        this.id
        this.deps
        this.eventDom
        this.eventName
        this.customStyle

        this.newCss = null              /* custom CONF */
        this.newLogic = null            /* custom LOGIC */
        this.links = null               /* custom LINKS */
        this.data = null                /* custom DATA */
        this.info = {}

        this.defaultCss = {
            box_width: "100%",
            box_height: "100%",
            box_back: "none",
            box_border: "none",
            box_radius: "none",
            box_margin: "20px",
            box_transition: "1s",

            title_fontFamily: "system-ui",
            title_fontSize: "initial",
            title_fontColor: "initial",
            title_fontWeight: "initial",
            title_fontStyle: "initial",
            title_margin: "0 10px 0 10px",
            title_opacity: "1",

            icon_fontSize: "initial",
            icon_fontColor: "initial",
            icon_opacity: "1"
        }

        this.defaultLogic = {
            icon_type: ["image", "material"],
            icon_side: ["right", "left"]
        }

        this.defaultData = {
            title: "titleIcon component",
            icon: "⨉"
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #configure() {
        const genetaredConf = this.deps.base.generateConf(this)
        this.css = genetaredConf.css
        this.logic = genetaredConf.logic
    }

    #applySide() {
        const titleBox = this.dom.querySelector(".titleBox")
        const iconBox = this.dom.querySelector(".iconBox")

        if (this.logic.icon_side === "left") {
            titleBox.classList.add("right")
            iconBox.classList.add("left")
        }
        if (this.logic.icon_side === "right") {
            titleBox.classList.add("left")
            iconBox.classList.add("right")
        }
    }

    #applyData() {
        const title = this.dom.querySelector(".text")
        const icon = this.dom.querySelector(".icon")
        title.textContent = this.data.title
        icon.textContent = this.data.icon
    }

    #loadLinks() { this.links && this.deps.base.addLinks(this.links, this) }

    #applyIconType() {
        const icon = this.dom.querySelector(".icon")
        if (this.logic.icon_type === "material") {
            icon.classList.add("material")
        }
    }

    #activeEvents() {
        const inputCheck = this.dom.querySelector("#inputCheck")
        inputCheck.addEventListener("change", (e) => { this.#setInfo("check", e.target.checked) })
    }

    #setInfo(key, value) {
        this.info.component = this
        this.info.id = this.id
        this.info[key] = value
        this.deps.base.sendEvent(this.eventDom, this.eventName, { ...this.info })
    }

    #draw() {
        this.dom.innerHTML = `
            <div class="main relative">
                <div class="titleBox absolute"><span class="text center"></span></div>
                <div class="iconBox absolute center"><span class="icon"></span></div>
                <input id="inputCheck" type=checkbox class="hiddenInput absolute max">
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
                width: var(--box_width);
                height: var(--box_height);
                background: var(--box_back); 
                border: var(--box_border);
                border-radius: var(--box_radius);               
            }

            .main {
                width: 100%;
                height: 100%;

                .titleBox {
                    width: fit-content;
                    height: 100%;
                    opacity: var(--title_opacity);
                    transition: var(--box_transition);

                    .text {
                        width: fit-content;
                        height: 100%;
                        font-family: var(--title_fontFamily);
                        font-size: var(--title_fontSize);
                        font-weight: var(--title_fontWeight);
                        font-style: var(--title_fontStyle);
                        color: var(--title_fontColor);
                        margin: var(--title_margin);
                    }
                }

                .iconBox {
                    height: 100%;
                    aspect-ratio: 1/1;
                    opacity: var(--icon_opacity);
                    transition: var(--box_transition);

                    .material {
                        font-family: "Material Symbols Outlined";
                        font-size: var(--icon_fontSize);
                        color: var(--icon_fontColor);
                    }
                }
            }

            .absolute {position: absolute;}
            .relative {position: relative;}
            .max {width: 100%; height: 100%;}
            .left {left: 0px;}
            .right {right: 0px;}
            .center {display: flex; justify-content: center; align-items: center;}
            .hiddenInput {appearance: none; cursor: pointer;}
        `
    }

    /* public */
    addDependency(dependencies) {
        if (this.eventDom === undefined) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === undefined) { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.deps = dependencies
    }

    titleVisible(boolean) { this.deps.base.cssVar("title_opacity", boolean ? "1" : "0", this) }

    updateConf(propOrVar, value) { this.deps.base.updateConf(propOrVar, value, this) }

    init() {
        this.#configure()
        this.#draw()
        this.#applySide()
        this.#loadLinks()
        this.#applyData()
        this.#applyIconType()
        this.#activeEvents()
    }

}
customElements.define(tag, TitleIcon)