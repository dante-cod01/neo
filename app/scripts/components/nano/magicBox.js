/* import { ComponentBase } from "./../class/componentBase.js"
 */
const defaultCss = {
    panelBorderRadius: "20px",
    topBarBack: "red",
    topBar_H: "50px",
    titleFont: "initial",
    titleFontSize: "initial",
    titleColor: "blue",
    titleIndent: "20px",
    closeIconSize: "30px",
    closeColor: "blue",
    nodeBack: "blue",
    bottomBar_H: "30px",
    bottomBarBack: "red",
    barShadow: "0 0 10px red",
    transition: "2s ease-in-out"
}

const defaultLogic = {
    panelSide: ["left", "right"],
    title: "Title",
    titleFontHref: "",
    closeIcon: "close"
}

export class MagicBox extends HTMLElement {
    _base

    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        this.css
        this.logic
        this.closeButtom
        this.bottomBar
        this.config
        this.parent = document
        this.parentControl
        this.parentInfo
        this.node
    }

    set dependency(injected) {
        this._base = injected
        this.init()
    }

    #draw = () => {
        this.container = this._base.add("div", this.dom, "main relative max transition")
        this.newStyle = this._base.add("style", this.dom)

        this._base.addLink(
            this,
            "stylesheet",
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap"
        )

        this.container.innerHTML = `
            <div class="topBack absolute transition"></div>
            <section class="topBar relative verticalAlign">
                <div class="moveLayer absolute max transition">
                    <div class="titleBox verticalAlign">
                        <span class="title max verticalAlign"></span> 
                    </div>
                    <div class="closeBox center">
                        <div class="close center relative">
                            <span class="material center"></span>
                            <input id="toogleButtom" type="checkbox" checked class="hiddenInput max">
                        </div>
                    </div>
                </div>
            </section> 
            <section class="node"></section>
            <section class="bottomBar"></section>
        `

        this.newStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: 100%;
                height: 100%;
            }

            .main {
                border-radius: var(--panelBorderRadius);
                overFlow: hidden;
                
                .topBack {
                    width: 100%;
                    height: var(--topBar_H);
                    background: var(--topBarBack);
                }

                .topBar {
                    width: 100%;
                    height: var(--topBar_H);

                    .moveLayer {
                        left: 0;
                        display: flex;
                    
                        .titleBox {
                            display: flex;
                            width: calc(100% - var(--topBar_H));
                            height: 100%;

                            .title {
                                font-family: var(--titleFont);
                                font-size: var(--titleFontSize);
                                color: var(--titleColor);
                            }
                        }

                        .closeBox {
                            width: var(--topBar_H);
                            height: var(--topBar_H);

                            .close {
                                width: 30px;
                                height: 30px;

                                .material {
                                    width: fit-content;
                                    height: fit-content;
                                    font-family: "material symbols outlined";
                                    font-size: var(--closeIconSize);
                                    color: var(--closeColor);
                                }

                                .hiddenInput {
                                    appearance: none;
                                    position: absolute;
                                    cursor: pointer;
                                }
                            }
                        }
                    }
                }
                   
                .node {
                    width: 100%;
                    height: calc(100% -(var(--topBar_H) + var(--bottomBar_H)));
                    background: var(--nodeBack);
                }

                .bottomBar {
                    width: 100%;
                    height: var(--bottomBar_H);
                    background: var(--bottomBarBack);
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .center {display: flex; justify-content: center; align-items: center}
            .verticalAlign {display: flex; align-items: center;}
            .max {width: 100%; height: 100%;}
            .transition {transition: var(--transition);}
        `
    }

    #configure = () => {
        this.css = this._base.loadConfig(JSON.parse(this.getAttribute("css")), defaultCss)
        this._base.toCssVar(this.style, this.css)
        this.logic = this._base.loadConfig(JSON.parse(this.getAttribute("logic")), defaultLogic)
    }

    #titleBoxHackWidth = () => {
        const moveLayer = this.dom.querySelector(".moveLayer")
        moveLayer.style.width = this.offsetWidth + "px"
    }

    #addCloseButtom = (boolean) => {
        const closeHidden = this.dom.querySelector(".closeBox")
        const material = this.dom.querySelector(".material")
        closeHidden.style.display = boolean ? "flex" : "none"
        material.textContent = this.logic.closeIcon
    }

    #addTitle = (string) => {
        const title = this.dom.querySelector(".title")
        this.logic.titleFontHref && this._base.addLink(this.dom, "stylesheet", this.logic.titleFontHref)
        title.textContent = string
    }

    #configureSide = () => {
        const size = this.logic.panelSide
        const moveLayer = this.dom.querySelector(".moveLayer")
        const title = this.dom.querySelector(".title")
        const closeBox = this.dom.querySelector(".closeBox")
        size === "right" && moveLayer.prepend(closeBox)
        title.style.textIndent = "20px"
    }

    async open() {
        const moveLayer = this.dom.querySelector(".moveLayer")
        const topBack = this.dom.querySelector(".topBack")
        const box = this.parentControl ? this.parentElement : this.container
        const time = this._base.convertTransition(this.css.transition)

        topBack.style.opacity = 1
        this.container.style.borderRadius = this.css.panelBorderRadius
        moveLayer.style.left = 0
        box.style.width = box === this.container ? "100%" : this.parentInfo.width
        await this._base.wait(time)
        box.style.height = box === this.container ? "100%" : this.parentInfo.height
    }

    async close() {
        const moveLayer = this.dom.querySelector(".moveLayer")
        const topBack = this.dom.querySelector(".topBack")
        const box = this.parentControl ? this.parentElement : this.container
        const time = this._base.convertTransition(this.css.transition)

        box.style.height = this.css.topBar_H
        await this._base.wait(time)
        box.style.width = this.css.topBar_H
        const leftHidden = parseFloat(this.parentInfo.width) * -1 + parseFloat(this.css.topBar_H) + "px"
        this.logic.panelSide === "left" && (moveLayer.style.left = leftHidden)
        this.container.style.borderRadius = parseFloat(this.css.topBar_H) / 2 + "px"
        topBack.style.opacity = 0.5
    }

    #tooglePanel = async (boolean) => boolean ? this.open() : this.close()

    #addReactivity = () => {
        const toogleButtom = this.dom.querySelector("#toogleButtom")
        toogleButtom.addEventListener("change", (e) => {
            this.#tooglePanel(e.target.checked, this.parentInfo)
        })
    }

    init() {
        this.#draw()
        this.#configure()
        
        const main = () => {
            this.node = this.dom.querySelector(".node")
            this.parent = this.parentElement
            this.parentInfo = this._base.getParentInfo(this.parent)
            this.#configureSide(this.css.panel)

            this.#addCloseButtom(this.closeButtom)
            this.#titleBoxHackWidth()
            this.#addTitle(this.logic.title)
            this.#addReactivity()
        }

        main()
    }
}

customElements.define("magic-box", MagicBox)