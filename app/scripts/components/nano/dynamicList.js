export const tag = "dynamic-list"
export class DynamicList extends HTMLElement {
    constructor() {
        super()

        /* props */
        this.dom = this.attachShadow({ mode: "open" })
        this.css
        this.base
        this.data
        this.links
        this.id
        this.eventDom
        this.eventName
        this.items = {}

        this.defaultCss = {
            back: "red",
            back_hover_1: "blue",
            back_hover_2: "blue",

            color_hover_1: "red",
            color_hover_2: "red",

            back_selected_1: "blue",
            back_selected_2: "blue",

            color_selected_1: "red",
            color_selected_2: "red",

            pointer_back: "green",
            pointer_color: "green",

            main_padding: "0px",
            border_color: "red",
            border_width: "0px",
            border_radius: "0px",
            section_back: "red",
            title_height: "30px",
            title_font: "initial",
            title_fontSize: "initial",
            title_color: "blue",
            li_height: "30px",
            transition: "1s",
            transition_fast: "500ms ease-in-out",
            expand_borderColor: "rgba(255, 255, 255, 0.24)"
        }
    }

    #draw() {
        this.container = this.base.add("div", this.dom, "main max")
        const style = this.base.add("style", this.dom)

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

                --expand_fakePadding: 10px;
            }

            .main {
                padding: var(--main_padding);

                .listBox {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    outline: var(--border_width) solid var(--border_color);
                    border-radius: var(--border_radius);
                    background: var(--section_back);

                    .list {
                        width: calc(100% - 14px);
                        height: calc(100% - 14px);
                        border-radius: var(--border_radius);

                        .sectionsBox {
                            width: 100%;

                            .componentSections {
                                width: 100%;
                                height: auto;

                                .sectionRow {
                                    display: flex;
                                    width: 100%;
                                    height: var(--title_height);
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
                                        width: calc(100% - var(--expand_fakePadding) * 2);
                                        height: var(--li_height);
                                        margin-bottom: 2px;

                                        &:first-of-type {margin-top: calc(var(--expand_fakePadding));}
                                        &:last-of-type {margin-bottom: calc(var(--expand_fakePadding));}
                                    }
                                }

                                .sectionRow .pointer {
                                    border-radius: 4px;
                                    transition: var(--transition_fast);
                                }

                                .rowExpand { width: 8px; height: auto; }

                                .name {
                                    width: fit-content;
                                    height: 100%;
                                    font-family: var(--title_font);
                                    font-size: var(--title_fontSize);
                                    color: var(--title_color);
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }

                .listBox .list .sectionsBox .componentSections .sectionRow:has(input:not(:checked):hover) {
                    background: var(--back_hover_1);
                    .name {color: var(--color_hover_1);}
                }

                .listBox .list .sectionsBox .componentSections .sectionRow:has(input:checked) {
                    background: var(--back_selected_1);
                    .rowExpand {width: 100%;}
                    .name {color: var(--color_selected_1);}
                    +.expand {opacity: 1;}
                }

                .listBox .list .sectionsBox .componentSections .listRow:has(input:not(:checked):hover) {
                    background: var(--back_hover_1);
                    .name {color: var(--color_hover_2);}
                }

                .listBox .list .sectionsBox .componentSections .listRow:has(input:checked) {
                    background: var(--back_selected_2);
                    .rowExpand {width: 100%;}
                    .name {color: var(--color_selected_2);}
                }

                .listBox .list .sectionsBox .componentSections:has(.listRow input:checked) .sectionRow {
                    background: var(--pointer_back);
                    .name {color: var(--pointer_color);}
                }
            }

            .relative {position: relative;}
            .absolute {position: absolute;}
            .max {width: 100%; height: 100%;}
            .verticalAlign {display: flex; align-items: center;}
            .hiddenInput {appearance: none; width: 100%; height: 100%; cursor: pointer;}
            .radius {border-radius: var(--border_radius);}
            .transition {transition: var(--transition);}
            .expandClose {height: 0px; border: 1px solid transparent;}
            .expandOpen {height: var(--expandDynHeight); border: 1px solid var(--expand_borderColor); margin: 10px 0;}
        `
    }

    #configure = () => {
        this.css = this.css ? this.base.config(this.defaultCss, this.css, "css", this) : this.defaultCss
        this.base.cssVar(this.css, this)
    }

    #addLinks = () => {
        if (this.links && this.links.length) this.base.addLinks(this, this.links)
    }

    #drawList(json) {
        const sectionsBox = this.dom.querySelector(".sectionsBox")

        Object.entries(json).forEach(([sectionTitle, sectionComponents]) => {
            const section = this.base.add("div", sectionsBox, "componentSections")
            this.#drawSection(section, sectionTitle, sectionComponents)
        })
    }

    #drawSection(section, title, componentsArray) {
        const create = (box, name, radiosName) => {
            const pointer = this.base.add("div", box, `pointer absolute max`)
            const expand = this.base.add("div", box, `rowExpand transition`)
            const title = this.base.add("span", box, `name verticalAlign`)
            title.textContent = name
            const radio = this.base.add("input", box, "hiddenInput absolute")
            this.base.setAttr(radio, { "type": "radio", "name": radiosName, "info": name })
            return radio
        }

        const sectionRow = this.base.add("div", section, "sectionRow verticalAlign relative radius transition")
        const expand = this.base.add("div", section, "expand expandClose transition")

        create(sectionRow, title, "section")

        Object.entries(componentsArray).forEach(item => {
            const listRow = this.base.add("div", expand, "listRow verticalAlign relative radius")
            const listItems = create(listRow, item[1].name, "list")
        })
    }

    #listItems = () => {
        const sections = Array.from(this.dom.querySelectorAll(".componentSections"))
        sections.forEach((section, sectionIndex) => {
            const newSection = this.items["section_" + sectionIndex] = {}
            newSection["sectionInput"] = section.querySelector("[name='section']")
            const items = Array.from(section.querySelectorAll("input[name='list']"))
            newSection["itemsInput"] = items
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
                    const expandMargin = parseFloat(getComputedStyle(this.dom.host).getPropertyValue("--expand_fakePadding"))
                    const expandDynHeight = listRowHeight * childs + expandMargin * 2 + childs * 2
                    this.style.setProperty("--expandDynHeight", `${expandDynHeight}px`)
                    expand.classList.add("expandOpen")
                })
            })
        })
    }

    #getOptionConfig(target) {
        const info = target.getAttribute("info")
        const detectedInfo = Object.entries(this.data).find(([key, value]) => value.some(value => value.name === info))
        const sectionType = detectedInfo[0]
        const infoConfig = Object.values(this.data).flat().find(item => item.name === info)
        return {section: sectionType, config: infoConfig}
    }

    #addEvents() {
        const listRadios = Array.from(this.dom.querySelectorAll("input[name='list']"))
        listRadios.forEach(item => {
            item.addEventListener("change", (e) => {
                const conf = this.#getOptionConfig(e.target)
                this.base.sendEvent(this.eventDom, this.eventName, { "conf": conf })
            })
        })
    }

    addDependency(dependency) {
        if (!this.eventDom) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (!this.eventName) { (console.log({ eventName: this.eventName }, "not configured")); return }
        if (!this.data) { (console.log({ data: this.data }, "not configured")); return }
        if (!this.base) {
            this.base = dependency
            this.init()
        }
    }

    updateProp(prop, value) {
        this.base.updateProp(this.css, prop, value, this)
    }

    async init() {
        this.#configure()
        this.#addLinks()
        this.#draw()
        this.#drawList(this.data)
        this.#listItems()
        this.#dynamicExpandControl()
        this.#addEvents(this.data)
        this.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }
}

customElements.define(tag, DynamicList)