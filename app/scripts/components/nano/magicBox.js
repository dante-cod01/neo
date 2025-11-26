export const tag = "magic-box"
export class MagicBox extends HTMLElement {

    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })

        this.defaultProps = {
            closeButtom: false,
            bottomBar: false
        }

        this.defaultCss = {
            panelWidth: "300px",
            panelHeight: "100%",
            panelRadius: "20px",
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

        this.defaultLogic = {
            panelSide: ["left", "right"],
            title: "Title",
            titleFontHref: "",
            closeIcon: "close"
        }


        /* received props */
        this.entryProps = "props"
        this.entryCss = "css"
        this.entryLogic = "logic"
        /* work props */
        this.outProps
        this.outCss
        this.outLogic
        this.dependency
        this.node
    }

    #draw = () => {
        this.container = this.dependency.add("div", this.dom, "main relative max transition")
        this.newStyle = this.dependency.add("style", this.dom)

        this.dependency.addLink(
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
                    <div class="closeBox center displayNone">
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
                border-radius: var(--panelRadius);
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
                        width: 100%;
                        height: 100%;

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
            .displayFlex {display: flex;}
            .displayNone {display: none;}
            .justifyEnd {justify-content: flex-end;}
            .opacity_0 {opacity: 0;}
            .opacity_50 {opacity: 0.5;}
            .opacity_1 {opacity: 1;}
            .radius_half {border-radius: calc(var(--topBar_H) / 2);}
            :host(.topBar_H_width) {width: var(--topBar_H);}
            :host(.topBar_H_height) {height: var(--topBar_H);}
        `
    }

    #configure = () => {
        this.outProps = this.dependency.config(this.defaultProps, this.entryProps, "props")
        this.outCss = this.dependency.config(this.defaultCss, this.entryCss, "css", this.style)
        this.outLogic = this.dependency.config(this.defaultLogic, this.entryLogic, "logic")
    }

    #addCloseButtom = (boolean) => {
        const closeBox = this.dom.querySelector(".closeBox")
        const material = this.dom.querySelector(".material")
        boolean && closeBox.classList.replace("displayNone", "displayFlex")
        !boolean && closeBox.classList.replace("displayFlex", "displayNone")
        material.textContent = this.outLogic.closeIcon
    }

    #addTitle = (string) => {
        const title = this.dom.querySelector(".title")
        this.outLogic.titleFontHref && this.dependency.addLink(this.dom, "stylesheet", this.outLogic.titleFontHref)
        title.textContent = string
    }

    #configureSide = () => {
        const moveLayer = this.dom.querySelector(".moveLayer")
        const titleBox = this.dom.querySelector(".titleBox")
        const closeBox = this.dom.querySelector(".closeBox")
        this.outLogic.panelSide === "right" && moveLayer.prepend(closeBox)
        this.outLogic.panelSide === "right" && (titleBox.classList.add("justifyEnd"))
    }

    async open(input) {
        input.disabled = true
        const topBack = this.dom.querySelector(".topBack")
        const title = this.dom.querySelector(".title")
        const time = this.dependency.convertTransition(this.outCss.transition)

        topBack.classList.remove("opacity_50")
        this.container.classList.remove("radius_half")
        this.classList.remove("topBar_H_width")
        await this.dependency.wait(time / 2)
        title.classList.remove("opacity_0")
        await this.dependency.wait(time / 3)
        this.classList.remove("topBar_H_height")
        await this.dependency.wait(time)
        input.disabled = false
    }

    async close(input) {
        input.disabled = true
        const topBack = this.dom.querySelector(".topBack")
        const title = this.dom.querySelector(".title")
        const time = this.dependency.convertTransition(this.outCss.transition)

        this.classList.add("topBar_H_height")
        title.classList.add("opacity_0")
        await this.dependency.wait(time)
        this.classList.add("topBar_H_width")
        this.container.classList.add("radius_half")
        topBack.classList.add("opacity_50")
        await this.dependency.wait(time)
        input.disabled = false
    }

    #tooglePanel = async (target) => target.checked ? this.open(target) : this.close(target)

    #addReactivity = () => {
        const toogleButtom = this.dom.querySelector("#toogleButtom")
        toogleButtom.addEventListener("change", (e) => {
            this.#tooglePanel(e.target)
        })
    }

    addDependency(dependency) {
        if (!this.dependency) {
            this.dependency = dependency
            this.init()
        }
    }

    update(prop, value) {
        let obj
        [this.outProps, this.outCss, this.outLogic].forEach(item => {
            if (this.dependency.isValidProp) obj = item
            if (/* isvalidvalue */)
            console.log(item)
            item[prop] = value
            console.log(item)
        })
    }

    init() {
        this.#draw()
        this.#configure()
        this.node = this.dom.querySelector(".node")
        this.#configureSide()
        this.#addCloseButtom(this.outProps.closeButtom)
        this.#addTitle(this.outLogic.title)
        this.#addReactivity()
        console.log(this.outLogic)
        this.update("bottomBar", false)

    }
}

customElements.define("magic-box", MagicBox)