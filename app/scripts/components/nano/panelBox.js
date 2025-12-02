export const tag = "panel-box"
export class PanelBox extends HTMLElement {

    constructor() {
        super()

        this.dom = this.attachShadow({ mode: "open" })
        /* received props */
        this.entryConfig
        this.entryCss
        this.entryLogic
        /* work props */
        this.dependency
        this.outConfig = {}
        this.outCss = {}
        this.outLogic = {}

        this.defaultConfig = {
            closeButtom: false,
            bottomBar: false
        }

        this.defaultCss = {
            box_w: "300px",
            box_h: "100%",
            box_blur: "blur(none)",
            box_transition: "2s ease-in-out",
            box_radius: "20px",
            topBar_back: "red",
            topBar_h: "50px",
            title_font: "initial",
            title_fontSize: "initial",
            title_color: "blue",
            content_back: "transparent",
            closeIcon_size: "30px",
            close_color: "blue",
            bottomBar_h: "30px",
            bottomBar_back: "red",
        }

        this.defaultLogic = {
            panelSide: ["left", "right"],
            title: "Title",
            title_fontHref: "",
            close_icon: "question_mark"
        }
    }

    #draw = () => {
        this.container = this.dependency.add("div", this.dom, "main relative max transition")
        const style = this.dependency.add("style", this.dom)

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
            <section class="listContainer" node="list"></section>
            <section class="bottomBar displayNone" node="bottomBar"></section>
        `

        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                width: var(--box_w);
                height: var(--box_h);
            }

            .main {
                border-radius: var(--box_radius);
                backdrop-filter: var(--box_blur);
                overFlow: hidden;
                
                .topBack {
                    width: 100%;
                    height: var(--topBar_h);
                    background: var(--topBar_back);
                }

                .topBar {
                    width: 100%;
                    height: var(--topBar_h);

                    .moveLayer {
                        left: 0;
                        display: flex;
                        width: 100%;
                        height: 100%;

                        .titleBox {
                            display: flex;
                            width: calc(100% - var(--topBar_h));
                            height: 100%;

                            .title {
                                width: fit-content;
                                font-family: var(--title_font);
                                font-size: var(--title_fontSize);
                                color: var(--title_color);
                                margin: 0 10px;
                            }
                        }

                        .closeBox {
                            width: var(--topBar_h);
                            height: var(--topBar_h);

                            .close {
                                width: 30px;
                                height: 30px;

                                .material {
                                    width: fit-content;
                                    height: fit-content;
                                    font-family: "material symbols outlined";
                                    font-size: var(--close_icon_size);
                                    color: var(--close_color);
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
                   
                .listContainer {
                    width: 100%;
                    background: var(--content_back);
                    overflow: hidden;
                }

                .bottomBar {
                    width: 100%;
                    height: var(--bottomBar_h);
                    background: var(--bottomBar_back);
                    overflow: hidden;
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .center {display: flex; justify-content: center; align-items: center}
            .verticalAlign {display: flex; align-items: center;}
            .max {width: 100%; height: 100%;}
            .transition {transition: var(--box_transition);}
            .displayFlex {display: flex;}
            .displayNone {display: none;}
            .justifyEnd {justify-content: flex-end;}
            .opacity_0 {opacity: 0;}
            .opacity_50 {opacity: 0.3;}
            .opacity_1 {opacity: 1;}
            .radius_half {border-radius: calc(var(--topBar_h) / 2);}
            .content_Max {height: calc(100% - var(--topBar_h));}
            .content_BottomBar {height: calc(100% - var(--topBar_h) - var(--bottomBar_h));}
            :host(.topBar_h_width) {width: var(--topBar_h);}
            :host(.topBar_h_height) {height: var(--topBar_h);}
        `
    }

    #getConfig = () => {
        this.outConfig = this.dependency.config(this.defaultConfig, this.entryConfig, "config")
        this.outLogic = this.dependency.config(this.defaultLogic, this.entryLogic, "logic")
        this.outCss = this.dependency.config(this.defaultCss, this.entryCss, "css")
        this.dependency.addCssVars(this.outCss, this)
    }

    #addCloseButtom = (boolean) => {
        const closeBox = this.dom.querySelector(".closeBox")
        const material = this.dom.querySelector(".material")
        boolean && closeBox.classList.replace("displayNone", "displayFlex")
        material.textContent = this.outLogic.close_icon
    }

    #addTitle = (string) => {
        const title = this.dom.querySelector(".title")
        this.outLogic.title_fontHref && this.dependency.addLink(this.dom, "stylesheet", this.outLogic.title_fontHref)
        title.textContent = string
    }

    #configureSide = () => {
        const moveLayer = this.dom.querySelector(".moveLayer")
        const titleBox = this.dom.querySelector(".titleBox")
        const closeBox = this.dom.querySelector(".closeBox")
        this.outLogic.panelSide === "right" && moveLayer.prepend(closeBox)
        this.outLogic.panelSide === "right" && titleBox.classList.add("justifyEnd")
    }

    #bottomBar = () => {
        const boolean = this.outConfig.bottomBar
        const bottomBar = this.dom.querySelector(".bottomBar")
        const listContainer = this.dom.querySelector(".listContainer")
        boolean && bottomBar.classList.replace("displayNone", "displayFlex")
        listContainer.classList.add(boolean ? "content_BottomBar" : "content_Max")
    }

    #applyTransition = () => {
        this.style.transition = this.outCss.transition
    }

    #applyConf = () => {
        this.#addCloseButtom(this.outConfig.closeButtom)
        this.#addTitle(this.outLogic.title)
        this.#configureSide()
        this.#bottomBar()
        this.#applyTransition()
    }

    #addReactivity = () => {
        const toogleButtom = this.dom.querySelector("#toogleButtom")
        toogleButtom.addEventListener("change", (e) => {
            this.#tooglePanel(e.target)
        })
    }

    #tooglePanel = async (target) => target.checked ? this.open(target) : this.close(target)

    async open(input) {
        input.disabled = true
        const topBack = this.dom.querySelector(".topBack")
        const title = this.dom.querySelector(".title")
        const time = this.dependency.convertTransition(this.outCss.transition)

        topBack.classList.remove("opacity_50")
        this.container.classList.remove("radius_half")
        this.classList.remove("topBar_h_width")
        await this.dependency.wait(time / 2)

        title.classList.remove("displayNone")
        title.offsetWidth /* hack css */
        title.classList.remove("opacity_0")
        await this.dependency.wait(time / 3)

        this.dependency.sendEvent(this.eventDom, this.eventName, { type: "close_W", value: false })
        this.classList.remove("topBar_h_height")
        await this.dependency.wait(time)

        input.disabled = false
        this.dependency.sendEvent(this.eventDom, this.eventName, { type: "close_H", value: false })
    }

    async close(input) {
        input.disabled = true
        const topBack = this.dom.querySelector(".topBack")
        const title = this.dom.querySelector(".title")
        const time = this.dependency.convertTransition(this.outCss.transition)

        this.classList.add("topBar_h_height")
        title.classList.add("opacity_0")
        await this.dependency.wait(time)

        title.classList.add("displayNone")
        this.dependency.sendEvent(this.eventDom, this.eventName, { type: "close_H", value: true })
        this.classList.add("topBar_h_width")
        this.container.classList.add("radius_half")
        topBack.classList.add("opacity_50")
        await this.dependency.wait(time)

        input.disabled = false
        this.dependency.sendEvent(this.eventDom, this.eventName, { type: "close_W", value: true })
    }

    addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.dependency) {
            this.dependency = dependency
            this.init()
        }
    }

    getNodes() {
        return this.dependency.getNodes(this.dom)
    }

    update(prop, value) {
        const objects = [this.outConfig, this.outCss, this.outLogic]
        let types = ["config", "css", "logic"]
        this.dependency.update(this, prop, value, objects, types)
    }

    async init() {
        this.#draw()
        this.#getConfig()
        this.#applyConf()
        this.#addReactivity()
    }
}

customElements.define("panel-box", PanelBox)