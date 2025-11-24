const defaultCss = {
    back: "red",
    backSelected1: "blue",

    pointerSelected1: "red",

    colorSelected1: "red",
    paddingHor: "0px",
    paddingVer: "0px",
    borderColor: "red",
    borderWidth: "0px",
    borderRadius: "0px",
    listBorderWidth: "0px",
    listBorderColor: "transparent",
    sectionBack: "red",
    title_H: "30px",
    titleFont: "initial",
    titleFontSize: "initial",
    titleColor: "blue",
    listItem_H: "30px",
    transition: "1s"
}

const defaultLogic = {

}

export const tag = "dynamic-list"

export class DynamicList extends HTMLElement {
    _base
    _data

    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })
    }

    set dependency(injected) {
        if (!this._base) {
            this._base = injected
            this.init()
        } else {
            console.log({ class: this }, "dependency already injected: ignoring")
        }
    }

    set newData(inyected) {
        this._data = inyected
        this.#drawList()
        this.#setExpandHeight()
    }

    #draw() {
        this.container = this._base.add("div", this.dom, "main")
        this.newStyle = this._base.add("style", this.dom)

        this.container.innerHTML = `
            <div class="listBox">
                <div class="list">
                    <div class="sectionsBox"></div>
                </list>
            </div>
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

                --expandItemsMargin: 10px;
            }

            .main {
                width: 100%;
                height: 100%;
                padding: var(--paddingVer) var(--paddingHor) ;

                .listBox {
                    width: 100%;
                    height: 100%;
                    outline: var(--borderWidth) solid var(--borderColor);
                    border-radius: var(--borderRadius);

                    .list {
                        width: 100%;
                        height: 100%;
                        border: var(--listBorderWidth) solid var(--listBorderColor);
                        border-radius: var(--borderRadius);

                        .sectionsBox {
                            width: 100%;
                            height: 100%; /* reactivo */
                            background: var(--sectionBack);
                            border-radius: calc(var(--borderRadius) - 2px);
                            overflow: hidden;

                            .section {
                                width: 100%;
                                height: auto;

                                .sectionRow {
                                    display: flex;
                                    width: 100%;
                                    height: var(--title_H);
                                    border-radius: 4px;

                                    &:has(.hiddenInput:checked) {
                                        background: var(--backSelected1);
                                        .pointer {background: var(--pointerSelected1);}
                                        .rowExpand {flex: 1;}
                                        .name {color: var(--colorSelected1);}
                                        +.expand {height: calc(var(--itemsNum) * var(--listItem_H) + var(--expandItemsMargin) * 2);}
                                    }
                                }

                                .expand {
                                    width: 100%;
                                    height: 0;
                                    overflow: hidden;
                                    border: 1px solid blue;

                                    .listRow {
                                        display: flex;
                                        width: 100%;
                                        height: var(--listItem_H);
                                        border: 1px solid grey;

                                        &:first-of-type { margin-top: 10px; }
                                        &:last-of-type { margin-bottom: 10px; }
                                    }
                                }

                                .pointer {
                                    width: 12px;
                                    height: 12px;
                                    border-radius: 4px;
                                    margin: 0 10px;
                                }

                                .rowExpand {
                                    width: 0px;
                                    height: 100%;
                                }

                                .name {
                                    width: fit-content;
                                    height: 100%;
                                    font-family: var(--titleFont);
                                    font-size: var(--titleFontSize);
                                    color: var(--titleColor);
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .verticalAlign {display: flex; align-items: center;}
            .hiddenInput {appearance: none; width: 100%; height: 100%; cursor: pointer;}
            .transition {transition: var(--transition);}
        `
    }

    #configure = () => {
        this.css = this._base.loadConfig(JSON.parse(this.getAttribute("css")), defaultCss)
        this.getAttribute("logic") && (this.logic = this._base.loadConfig(JSON.parse(this.getAttribute("logic")), defaultLogic))
        this._base.toCssVar(this.style, this.css)
    }

    #drawList() {
        const sectionsBox = this.dom.querySelector(".sectionsBox")

        Object.entries(this._data).forEach(([sectionTitle, sectionComponents]) => {
            const section = this._base.add("section", sectionsBox, "section")
            this.#drawSection(section, sectionTitle, sectionComponents)
        })
    }

    #drawSection(section, title, componentsArray) {
        const create = (box, name, cssClass, radioName) => {
            const pointer = this._base.add("div", box, `pointer pointer`)
            const expand = this._base.add("div", box, `rowExpand rowExpand transition`)
            const title = this._base.add("span", box, `name verticalAlign`)
            title.textContent = name
            const radio = this._base.add("input", box, "hiddenInput absolute")
            this._base.setAttr(radio, { "type": "radio", "name": radioName })
            return radio
        }

        const sectionRow = this._base.add("div", section, "sectionRow verticalAlign relative")
        create(sectionRow, title, "section", "list")

        const expand = this._base.add("div", section, "expand transition")
        Object.entries(componentsArray).forEach(item => {
            const listRow = this._base.add("div", expand, "listRow verticalAlign relative")
            const listItem = create(listRow, item[1].title, "list", "list")
        })
    }

    #setExpandHeight() {
        const sections = Array.from(this.dom.querySelectorAll(".section"))
        sections.forEach(section => {
            const radio = section.querySelector("input[name='list']")

            radio.addEventListener("change", (e) => {
                const actualSection = sections.find(item => item.querySelector("input[name='list']") === e.target)
                const childs = actualSection.querySelectorAll(".expand .listRow").length
                this.style.setProperty("--itemsNum", childs)
            })
        })
    }

    init() {
        this.#draw()
        this.#configure()
    }
}

customElements.define("dynamic-list", DynamicList)