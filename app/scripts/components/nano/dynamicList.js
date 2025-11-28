export const tag = "dynamic-list"
export class DynamicList extends HTMLElement {
    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })

        this.defaultConfig = {
            algo: "ddd"
        }

        this.defaultCss = {
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
            sectionBack: "red",
            title_H: "30px",
            titleFont: "initial",
            titleFontSize: "initial",
            titleColor: "blue",
            listItem_H: "30px",
            time: "1s",
            transitionFast: "10s"
        }

        this.defaultLogic = {
            titleFont_Href: false,
        }

        /* received props */
        this.entryConfig = "props"
        this.entryCss = "css"
        this.entryLogic = "logic"
        /* work props */
        this.dependency
        this.data
    }

    #draw() {
        this.container = this.dependency.add("div", this.dom, "main")
        const style = this.dependency.add("style", this.dom)

        this.container.innerHTML = `
            <div class="listBox">
                <div class="list">
                    <div class="sectionsBox"></div>
                </div>
            </div>
        `

        style.textContent = `
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

                            .componentSections {
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
                                    transition: var(--transitionFast);
                                }

                                .listRow .pointer { 
                                    width: 9px;
                                }

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

                .listBox .list .sectionsBox .componentSections .sectionRow:has(input:not(:checked):hover) {
                    background: var(--backSelected3);
                    .name {color: var(--colorSelected1);}
                }

                .listBox .list .sectionsBox .componentSections .sectionRow:has(input:checked) {
                    background: var(--backSelected1);
                    .rowExpand {flex: 1;}
                    .name {color: var(--colorSelected1);}
                }

                .listBox .list .sectionsBox .componentSections .listRow:has(input:not(:checked):hover) {
                    background: var(--backSelected3);
                    .name {color: var(--colorSelected2);}
                }

                .listBox .list .sectionsBox .componentSections .listRow:has(input:checked) {
                    background: var(--backSelected2);
                    .rowExpand {flex: 1;}
                    .name {color: var(--colorSelected2);}
                }

                .listBox .list .sectionsBox .componentSections:has(.listRow input:checked) .sectionRow .pointer {
                    background: var(--pointerColor);
                }                
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .verticalAlign {display: flex; align-items: center;}
            .hiddenInput {appearance: none; width: 100%; height: 100%; cursor: pointer;}
            .radius {border-radius: var(--borderRadius);}
            .transition {transition: var(--time);}
            .expandClose {height: 0px;}
            .expandOpen {height: var(--expandDynHeight);}
        `
    }

    #configure = () => {
        this.outConfig = this.dependency.config(this.defaultConfig, this.entryConfig, "config")
        this.outLogic = this.dependency.config(this.defaultLogic, this.entryLogic, "logic")
        this.outCss = this.dependency.config(this.defaultCss, this.entryCss, "css")
        this.dependency.addCssVars(this.outCss, this)
    }

    #drawList(json) {
        const sectionsBox = this.dom.querySelector(".sectionsBox")

        Object.entries(json).forEach(([sectionTitle, sectionComponents]) => {
            const section = this.dependency.add("div", sectionsBox, "componentSections")
            this.#drawSection(section, sectionTitle, sectionComponents)
        })
    }

    #drawSection(section, title, componentsArray) {
        const create = (box, name, radiosName) => {
            const pointer = this.dependency.add("div", box, `pointer`)
            const expand = this.dependency.add("div", box, `rowExpand transition`)
            const title = this.dependency.add("span", box, `name verticalAlign`)
            title.textContent = name
            const radio = this.dependency.add("input", box, "hiddenInput absolute")
            this.dependency.setAttr(radio, { "type": "radio", "name": radiosName })
            return radio
        }

        const sectionRow = this.dependency.add("div", section, "sectionRow verticalAlign relative radius")
        const expand = this.dependency.add("div", section, "expand expandClose transition")

        create(sectionRow, title, "section")

        Object.entries(componentsArray).forEach(item => {
            const listRow = this.dependency.add("div", expand, "listRow verticalAlign relative radius")
            const listItems = create(listRow, item[1].title, "list")
        })
    }

    #dynamicExpandControl() {
        const sections = Array.from(this.dom.querySelectorAll(".componentSections"))

        sections.forEach(section => {
            const radios = Array.from(section.querySelectorAll("input[name='section']"))

            radios.forEach(radio => {
                radio.addEventListener("change", (e) => {
                    sections.forEach(item => { item.querySelector(".expand").classList.remove("expandOpen") })

                    const actualSection = sections.find(item => item.querySelector("input[name='section']") === e.target)
                    const expand = actualSection.querySelector(".expand")
                    const childs = actualSection.querySelectorAll(".expand .listRow").length
                    const listRowHeight = expand.querySelector(".listRow").offsetHeight
                    const expandMargin = parseFloat(getComputedStyle(this.dom.host).getPropertyValue("--expandItemsMargin"))
                    const expandDynHeight = listRowHeight * childs + expandMargin * 2
                    this.style.setProperty("--expandDynHeight", `${expandDynHeight}px`)
                    expand.classList.add("expandOpen")
                })
            })
        })
    }

    addDependency(dependency) {
        if (!this.dependency) {
            this.dependency = dependency
            this.init()
        }
    }

    async addData(json) {
        this.#drawList(json)
        this.#dynamicExpandControl()
    }

    async init() {
        this.#draw()
        this.#configure()
    }
}

customElements.define("dynamic-list", DynamicList)