const defaultCss = {
    back: "red",
    backSelected1: "blue",
    backSelected2: "blue",
    backSelected3: "blue",
    pointerColor: "red",
    colorDefault: "blue",
    colorSelected1: "red",
    colorSelected2: "red",
    paddingHor: "0px",
    paddingVer: "0px",
    borderColor: "red",
    borderWidth: "0px",
    borderRadius: "0px",
    listBorderColor: "transparent",
    sectionBack: "red",
    title_H: "30px",
    titleFont: "initial",
    titleFontSize: "initial",
    titleColor: "blue",
    listItem_H: "30px",
    transition: "1s",
    transitionFast: "var(--transition)"
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
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 100%;
                    height: 100%;
                    outline: var(--borderWidth) solid var(--borderColor);
                    border-radius: var(--borderRadius);
                    background: var(--sectionBack);

                    .list {
                        width: calc(100% - 16px);
                        height: calc(100% - 16px);
                        border-radius: var(--borderRadius);

                        .sectionsBox {
                            width: 100%;

                            .section {
                                width: 100%;
                                height: auto;

                                .sectionRow {
                                    display: flex;
                                    width: 100%;
                                    height: var(--title_H);
                                    margin-bottom: 4px;
                                }

                                .expand {
                                    width: 100%;
                                    height: 0;
                                    border: 1px solid grey;
                                    overflow: hidden;

                                    .listRow {
                                        position: relative;
                                        left: 20px;
                                        display: flex;
                                        width: calc(100% - 20px);
                                        height: var(--listItem_H);

                                        &:first-of-type {margin-top: calc(var(--expandItemsMargin) / 2);}
                                        &:last-of-type {margin-bottom: calc(var(--expandItemsMargin) / 2);}
                                    }
                                }

                                .sectionRow .pointer {
                                    width: 9px;
                                    height: 9px;
                                    border-radius: 50%;
                                    margin: 0 10px;
                                }

                                .listRow .pointer { width: 9px;}

                                .rowExpand { width: 0px; height: auto; }

                                .name {
                                    width: fit-content;
                                    height: 100%;
                                    font-family: var(--titleFont);
                                    font-size: var(--titleFontSize);
                                    color: var(--titleColor);
                                    margin-right: 10px;
                                    color: var(--colorDefault);
                                }
                            }
                        }
                    }
                }

                .listBox .list .sectionsBox .section .sectionRow:has(input:not(:checked):hover) {
                    background: var(--backSelected3);
                    .name {color: var(--colorSelected1);}
                }

                .listBox .list .sectionsBox .section .sectionRow:has(input:checked) {
                    background: var(--backSelected1);
                    .rowExpand {flex: 1;}
                    .name {color: var(--colorSelected1);}
                    +.expand {height: calc(var(--itemsNum) * var(--listItem_H) + var(--expandItemsMargin));}
                }

                .listBox .list .sectionsBox .section .listRow:has(input:not(:checked):hover) {
                    background: var(--backSelected3);
                    .name {color: var(--colorSelected2);}
                }

                .listBox .list .sectionsBox .section .listRow:has(input:checked) {
                    background: var(--backSelected2);
                    .rowExpand {flex: 1;}
                    .name {color: var(--colorSelected2);}
                }

                .listBox .list .sectionsBox .section:has(.listRow input:checked) .sectionRow .pointer {
                    background: var(--pointerColor);
                }                
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .verticalAlign {display: flex; align-items: center;}
            .hiddenInput {appearance: none; width: 100%; height: 100%; cursor: pointer;}
            .radius {border-radius: var(--borderRadius);}
            .transition {transition: var(--transition);}
            .transitionFast {transition: var(--transitionFast);}
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
        const create = (box, name, radiosName) => {
            const pointer = this._base.add("div", box, `pointer pointer`)
            const expand = this._base.add("div", box, `rowExpand rowExpand transitionFast`)
            const title = this._base.add("span", box, `name verticalAlign`)
            title.textContent = name
            const radio = this._base.add("input", box, "hiddenInput absolute")
            this._base.setAttr(radio, { "type": "radio", "name": radiosName })
            return radio
        }

        const sectionRow = this._base.add("div", section, "sectionRow verticalAlign relative radius")
        const expand = this._base.add("div", section, "expand transition")

        create(sectionRow, title, "section")

        Object.entries(componentsArray).forEach(item => {
            const listRow = this._base.add("div", expand, "listRow verticalAlign relative radius")
            const listItems = create(listRow, item[1].title, "list")
        })
    }

    #setExpandHeight() {
        const sections = Array.from(this.dom.querySelectorAll(".section"))
        sections.forEach(section => {
            const radio = section.querySelector("input[name='section']")

            radio.addEventListener("change", (e) => {
                const actualSection = sections.find(item => item.querySelector("input[name='section']") === e.target)
                const childs = actualSection.querySelectorAll(".expand .listRow").length
                this.style.setProperty("--itemsNum", childs)
            })
        })
    }

    async init() {
        this.#draw()
        this.#configure()
    }
}

customElements.define("dynamic-list", DynamicList)