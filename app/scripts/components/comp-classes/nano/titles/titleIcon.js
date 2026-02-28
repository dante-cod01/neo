export const tag = "title-icon"
export default class TitleIcon extends HTMLElement {
    constructor() {
        super()
        /* FALTA LOGICA PARA ICONO IMAGEN */
        this.id
        this.deps
        this.eventDom
        this.eventName
        this.links = null               /* custom LINKS */
        this.newCss = null              /* custom CONF */
        this.newLogic = null            /* custom LOGIC */
        this.newData = null             /* custom DATA */
        this.customStyle
        this.info = {}

        this.defaultCss = {
            box_width: "100%",
            box_height: "100%",
            box_back: "none",
            box_radius: "none",
            box_transition: "none",

            title_fontFamily: "initial",
            title_fontSize: "initial",
            title_fontColor: "initial",
            title_fontWeight: "initial",
            title_fontStyle: "initial",
            title_margin: "none",
            title_opacity: "1",

            icon_fontSize: "initial",
            icon_fontColor: "initial",
            icon_margin: "none",
            icon_opacity: "1"
        }

        this.defaultLogic = {
            iconType: ["image", "material"],
            iconSide: ["left", "right"]
        }

        this.defaultData = {
            title: "title",
            icon: "more_horiz"
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    #configure() {
        this.css = !this.newCss ? this.defaultCss : this.deps.base.generateConf(this.defaultCss, this.newCss, this)
        this.deps.base.objToCssVar(this.css, this)
        this.logic = !this.newLogic ? this.defaultLogic : this.deps.base.generateConf(this.defaultLogic, this.newLogic, this)
        this.data = !this.newData ? this.defaultData : this.deps.base.generateConf(this.defaultData, this.newData, this)
    }

    #applySide() {
        if (this.logic.iconSide === "right") {
            const main = this.dom.querySelector(".main")
            const iconBox = this.dom.querySelector(".iconBox")
            main.prepend(iconBox)
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
        if (this.logic.iconType === "material") {
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
                <div class="titleBox"><span class="text center"></span></div>
                <div class="iconBox center"><span class="icon"></span></div>
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
            }

            .main {
                display: flex;
                justify-content: space-between;
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
                    margin: var(--icon_margin);
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
            .max {width: 100%; height: 100%}
            .center {display: flex; justify-content: center; align-items: center;}
            .hiddenInput {appearance: none; cursor: pointer;}
        `
    }

    /* public */
    addDependency(dependencies) {
        if (this.eventDom === undefined) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === undefined) { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.deps = dependencies
        this.init()
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