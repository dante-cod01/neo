export const tag = "dynamic-list"
export class DynamicList extends HTMLElement {
    constructor() {
        super()
        this.dom = this.attachShadow({ mode: "open" })
        /* received props */
        this.entryCss
        this.entryLogic
        /* work props */
        this.dependency
        this.data
        this.outCss = {}
        this.outLogic = {}

        this.defaultCss = {
            back: "red",
            backSelected1: "blue",
            backSelected2: "blue",
            backSelected3: "blue",
            pointerColor: "red",
            colorDefault: "blue",
            colorSelected1: "red",
            colorSelected2: "red",
            padding: "0px",
            borderColor: "red",
            borderWidth: "0px",
            borderRadius: "0px",
            sectionBack: "red",
            title_H: "30px",
            titleFont: "initial",
            titleFontSize: "initial",
            titleColor: "blue",
            listItem_H: "30px",
            transition: "1s",
            transitionFast: "500ms ease-in-out",
            expandBorderColor: "rgba(255, 255, 255, 0.24)"
        }

        this.defaultLogic = {
            titleFont_Href: "",
        }
    }

    #draw() {
        this.container = this.dependency.add("div", this.dom, "main max")
        const style = this.dependency.add("style", this.dom)

        this.container.innerHTML = `
            <div class="listBox max">
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

                --expandFakePadding: 10px;
            }

            .main {
                padding: var(--padding);

                .listBox {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    outline: var(--borderWidth) solid var(--borderColor);
                    border-radius: var(--borderRadius);
                    background: var(--sectionBack);

                    .list {
                        width: calc(100% - 14px);
                        height: calc(100% - 14px);
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
                                    overflow: hidden;
                                }

                                .expand {
                                    width: 100%;
                                    border-radius: 4px;
                                    opacity: 0;
                                    overflow: hidden;

                                    .listRow {
                                        position: relative;
                                        left: 10px;
                                        display: flex;
                                        width: calc(100% - var(--expandFakePadding) * 2);
                                        height: var(--listItem_H);
                                        margin-bottom: 2px;

                                        &:first-of-type {margin-top: calc(var(--expandFakePadding));}
                                        &:last-of-type {margin-bottom: calc(var(--expandFakePadding));}
                                    }
                                }

                                .sectionRow .pointer {
                                    border-radius: 4px;
                                    transition: var(--transitionFast);
                                }

                                .rowExpand { width: 8px; height: auto; }

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
                    .rowExpand {width: 100%;}
                    .name {color: var(--colorSelected1);}
                    +.expand {opacity: 1;}
                }

                .listBox .list .sectionsBox .componentSections .listRow:has(input:not(:checked):hover) {
                    background: var(--backSelected3);
                    .name {color: var(--colorSelected2);}
                }

                .listBox .list .sectionsBox .componentSections .listRow:has(input:checked) {
                    background: var(--backSelected2);
                    .rowExpand {width: 100%;}
                    .name {color: var(--colorSelected2);}
                }

                .listBox .list .sectionsBox .componentSections:has(.listRow input:checked) .sectionRow:has(input:not(:checked)) .pointer {
                    background: var(--pointerColor);
                }                
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .max {width: 100%; height: 100%;}
            .verticalAlign {display: flex; align-items: center;}
            .hiddenInput {appearance: none; width: 100%; height: 100%; cursor: pointer;}
            .radius {border-radius: var(--borderRadius);}
            .transition {transition: var(--transition);}
            .expandClose {height: 0px; border: 1px solid transparent;}
            .expandOpen {height: var(--expandDynHeight); border: 1px solid var(--expandBorderColor); margin: 10px 0;}
        `
    }

    #configure = () => {
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
            const pointer = this.dependency.add("div", box, `pointer absolute max`)
            const expand = this.dependency.add("div", box, `rowExpand transition`)
            const title = this.dependency.add("span", box, `name verticalAlign`)
            title.textContent = name
            const radio = this.dependency.add("input", box, "hiddenInput absolute")
            this.dependency.setAttr(radio, { "type": "radio", "name": radiosName, "info": name })
            return radio
        }

        const sectionRow = this.dependency.add("div", section, "sectionRow verticalAlign relative radius")
        const expand = this.dependency.add("div", section, "expand expandClose transition")

        create(sectionRow, title, "section")

        Object.entries(componentsArray).forEach(item => {
            const listRow = this.dependency.add("div", expand, "listRow verticalAlign relative radius")
            const listItems = create(listRow, item[1].name, "list")
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
                    const expandMargin = parseFloat(getComputedStyle(this.dom.host).getPropertyValue("--expandFakePadding"))
                    const expandDynHeight = listRowHeight * childs + expandMargin * 2 + childs * 2
                    this.style.setProperty("--expandDynHeight", `${expandDynHeight}px`)
                    expand.classList.add("expandOpen")
                })
            })
        })
    }

    #getOptionPars(target) {
        const info = target.getAttribute("info")
        const pars = Object.values(this.data).flat().find(item => item.name === info)
        return pars
    }

    #addEvents() {
        const listRadios = Array.from(this.dom.querySelectorAll("input[name='list']"))
        listRadios.forEach(item => {
            item.addEventListener("change", (e) => {
                const pars = this.#getOptionPars(e.target)
                this.dependency.sendEvent(this.eventDom, this.eventName, { type: "select", value: pars })
            })
        })
    }

    addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.data) { (console.log({ data: this.data }, "not configured")); return }
        if (!this.dependency) {
            this.dependency = dependency
            this.init()
        }
    }

    async init() {
        this.#configure()
        this.outLogic.titleFont_Href && this.dependency.addLink(
            this,
            "stylesheet",
            this.outLogic.titleFont_Href
        )
        this.#draw()
        this.#drawList(this.data)
        this.#dynamicExpandControl()
        this.#addEvents(this.data)
    }
}

customElements.define("dynamic-list", DynamicList)