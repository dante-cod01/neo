const defaultCss = {
    panelWidth: "300px",
    panelHeight: "100%",
    panelBorderRadius: "20px",
    topBarBack: "red",
    topBar_H: "50px",
    titleFont: "initial",
    titleFontSize: "initial",
    titleColor: "blue",
    closeIconSize: "30px",
    closeColor: "blue",
    nodeBack: "blue",
    bottomBar_H: "30px",
    bottomBarBack: "red",
    transition: "2s ease-in-out"
}

const defaultLogic = {
    panelSide: ["left", "right"],
    title: "Title",
    titleFontHref: "",
    closeIcon: "close"
}

export const tag = "magic-box"

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
        this.node
    }

    set dependency(injected) {
        if (!this._base) {
            this._base = injected
            this.init()
        } else {
            console.log({ class: this }, "dependency already injected: ignoring")
        }
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
                        <span class="title max verticalAlign transition"></span> 
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
                width: var(--panelWidth);
                height: var(--panelHeight);
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
                                width: fit-content;
                                font-family: var(--titleFont);
                                font-size: var(--titleFontSize);
                                color: var(--titleColor);
                                margin: 0 10px;
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
                    height: calc(100% - var(--topBar_H) - var(--bottomBar_H));
                    background: var(--nodeBack);
                    overflow: hidden;
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
        this.logic = this._base.loadConfig(JSON.parse(this.getAttribute("logic")), defaultLogic)
        this._base.toCssVar(this.style, this.css)
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
        const moveLayer = this.dom.querySelector(".moveLayer")
        const titleBox = this.dom.querySelector(".titleBox")
        const closeBox = this.dom.querySelector(".closeBox")
        this.logic.panelSide === "right" && moveLayer.prepend(closeBox)
        this.logic.panelSide === "right" && (titleBox.style.justifyContent = "flex-end")
    }

    async open() {
        const moveLayer = this.dom.querySelector(".moveLayer")
        const topBack = this.dom.querySelector(".topBack")
        const title = this.dom.querySelector(".title")
        const time = this._base.convertTransition(this.css.transition)

        topBack.style.opacity = 1
        this.container.style.borderRadius = this.css.panelBorderRadius
        moveLayer.style.left = 0
        this.style.width = this.css.panelWidth
        await this._base.wait(time / 2)
        title.style.opacity = 1
        await this._base.wait(time / 3)
        this.style.height = this.css.panelHeight
        await this._base.wait(time)
    }

    async close() {
        const moveLayer = this.dom.querySelector(".moveLayer")
        const topBack = this.dom.querySelector(".topBack")
        const title = this.dom.querySelector(".title")
        const time = this._base.convertTransition(this.css.transition)

        this.style.height = this.css.topBar_H
        title.style.opacity = 0
        await this._base.wait(time)
        this.style.width = this.css.topBar_H
        const leftHidden = parseFloat(this.css.panelWidth) * -1 + parseFloat(this.css.topBar_H) + "px"
        this.logic.panelSide === "left" && (moveLayer.style.left = leftHidden)
        this.container.style.borderRadius = parseFloat(this.css.topBar_H) / 2 + "px"
        topBack.style.opacity = 0.5
        await this._base.wait(time)
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
        this.node = this.dom.querySelector(".node")

        this.#configure()
        this.#configureSide()
        this.#addCloseButtom(this.closeButtom)
        this.#titleBoxHackWidth()
        this.#addTitle(this.logic.title)
        this.#addReactivity()
    }
}

customElements.define("magic-box", MagicBox)