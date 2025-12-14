export const tag = "panel-box"
export class PanelBox extends HTMLElement {

    constructor() {
        super()

        /* props */
        this.dom = this.attachShadow({ mode: "open" })
        this.css
        this.logic
        this.links
        this.base
        this.id
        this.eventDom
        this.eventName
        this.nodes

        this.defaultCss = {
            box_width: "300px",
            box_height: "100%",
            box_blur: "blur(none)",
            box_transition: "2s ease-in-out",
            box_radius: "20px",
            topBar_back: "red",
            topBar_height: "50px",
            title_font: "initial",
            title_fontSize: "initial",
            title_color: "blue",
            content_back: "transparent",
            icon_size: "30px",
            icon_color: "blue",
            bottomBar_height: "30px",
            bottomBar_back: "red",
            node_padding: "none"
        }

        this.defaultLogic = {
            buttom: false,
            bottomBar: false,
            side: ["left", "right"],
            title: "Title",
            icon: "menu",
        }
    }

    #draw = () => {
        this.container = this.base.add("div", this.dom, "main relative max transition")
        const style = this.base.add("style", this.dom)

        this.container.innerHTML = `
            <div class="topBack absolute transition"></div>
            <section class="topBar relative verticalAlign">
                <div class="moveLayer absolute max transition">
                    <div class="titleBox verticalAlign">
                        <span class="title max verticalAlign transition"></span> 
                    </div>
                    <div class="closeBox center displayNone">
                        <div class="close center relative">
                            <div class="icon max center"></div>
                            <input id="toogleButtom" type="checkbox" checked class="hiddenInput max">
                        </div>
                    </div>
                </div>
            </section> 
            <section class="listContainer" node="node_0"></section>
            <section class="bottomBar displayNone" node="node_1"></section>
        `

        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                width: var(--box_width);
                height: var(--box_height);
            }

            .main {
                border-radius: var(--box_radius);
                backdrop-filter: var(--box_blur);
                overFlow: hidden;
                
                .topBack {
                    width: 100%;
                    height: var(--topBar_height);
                    background: var(--topBar_back);
                }

                .topBar {
                    width: 100%;
                    height: var(--topBar_height);

                    .moveLayer {
                        left: 0;
                        display: flex;
                        width: 100%;
                        height: 100%;

                        .titleBox {
                            display: flex;
                            width: calc(100% - var(--topBar_height));
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
                            width: var(--topBar_height);
                            height: var(--topBar_height);

                            .close {
                                width: 30px;
                                height: 30px;

                                .icon {
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
                    padding: var(--node_padding);
                }

                .bottomBar {
                    width: 100%;
                    height: var(--bottomBar_height);
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
            .radius_half {border-radius: calc(var(--topBar_height) / 2);}
            .content_Max {height: calc(100% - var(--topBar_height));}
            .content_BottomBar {height: calc(100% - var(--topBar_height) - var(--bottomBar_height));}
            :host(.topBar_height_width) {width: var(--topBar_height);}
            :host(.topBar_height_height) {height: var(--topBar_height);}
            .icon {font-family: "material symbols outlined"; font-size: var(--icon_size); color: var(--icon_color);}
        `
    }

    #getConfig = () => {
        this.css = this.css ? this.base.config(this.defaultCss, this.css, "css", this) : this.defaultCss
        this.base.cssVar(this.css, this)
        this.logic = this.logic ? this.base.config(this.defaultLogic, this.logic, "logic", this) : this.defaultLogic
    }

    #getLinks = () => {
        if (this.links && this.links.length) this.base.addLinks(this, this.links)
    }

    #addCloseButtom = (boolean) => {
        const closeBox = this.dom.querySelector(".closeBox")
        const icon = this.dom.querySelector(".icon")

        if (this.logic.icon) {
            icon.classList.add("icon")
            icon.textContent = this.logic.icon
            boolean && closeBox.classList.replace("displayNone", "displayFlex")
        }
    }

    #addTitle = (string) => {
        const title = this.dom.querySelector(".title")
        title.textContent = string
    }

    #configureSide = () => {
        const moveLayer = this.dom.querySelector(".moveLayer")
        const titleBox = this.dom.querySelector(".titleBox")
        const closeBox = this.dom.querySelector(".closeBox")
        this.logic.side === "right" && moveLayer.prepend(closeBox)
        this.logic.side === "right" && titleBox.classList.add("justifyEnd")
    }

    #bottomBar = () => {
        const boolean = this.logic.bottomBar
        const bottomBar = this.dom.querySelector(".bottomBar")
        const listContainer = this.dom.querySelector(".listContainer")
        boolean && bottomBar.classList.replace("displayNone", "displayFlex")
        listContainer.classList.add(boolean ? "content_BottomBar" : "content_Max")
    }

    #applyTransition = () => {
        this.style.transition = this.css.box_transition
    }

    #applyConf = () => {
        this.#getLinks()
        this.#addCloseButtom(this.logic.buttom)
        this.#addTitle(this.logic.title)
        this.#configureSide()
        this.#bottomBar()
        this.#applyTransition()
    }

    #getNodes = () => {
        this.nodes = this.base.getNodes(this.dom)
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
        const time = this.base.convertTransition(this.css.box_transition)

        this.base.sendEvent(this.eventDom, this.eventName, { panel: this.id, type: "open_W", value: true })
        topBack.classList.remove("opacity_50")
        this.container.classList.remove("radius_half")
        this.classList.remove("topBar_height_width")
        await this.base.wait(time / 2)

        this.base.sendEvent(this.eventDom, this.eventName, { panel: this.id, type: "open_H", value: true })
        title.classList.remove("displayNone")
        title.offsetWidth /* hack css */
        title.classList.remove("opacity_0")
        await this.base.wait(time / 3)
        this.classList.remove("topBar_height_height")
        await this.base.wait(time)

        input.disabled = false
    }

    async close(input) {
        input.disabled = true
        const topBack = this.dom.querySelector(".topBack")
        const title = this.dom.querySelector(".title")
        const time = this.base.convertTransition(this.css.box_transition)

        this.base.sendEvent(this.eventDom, this.eventName, { panel: this.id, type: "open_H", value: false })
        this.classList.add("topBar_height_height")
        title.classList.add("opacity_0")
        await this.base.wait(time)

        this.base.sendEvent(this.eventDom, this.eventName, { panel: this.id, type: "open_W", value: false })
        title.classList.add("displayNone")
        this.classList.add("topBar_height_width")
        this.container.classList.add("radius_half")
        topBack.classList.add("opacity_50")
        await this.base.wait(time)

        input.disabled = false
    }

    addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.base) {
            this.base = dependency
            this.init()
        }
    }

    updateProp(prop, value) {
        this.base.updateProp(this.css, prop, value, this)
    }

    async init() {
        this.#draw()
        this.#getConfig()
        this.#applyConf()
        this.#getNodes()
        this.#addReactivity()
    }
}

customElements.define(tag, PanelBox)