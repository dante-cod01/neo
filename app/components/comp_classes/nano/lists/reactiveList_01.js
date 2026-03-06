export const tag = "reactive-list-01"
export class ReactiveList_01 extends HTMLElement {
    constructor() {
        super()

        this.id
        this.deps
        this.eventDom
        this.eventName
        this.customStyle

        this.newCss = null              /* custom CONF */
        this.newLogic = null            /* custom LOGIC */
        this.links = null               /* custom LINKS */
        this.data = null                /* custom DATA */
        this.info = {}

        this.defaultCss = {
            box_width: "200px",
            box_height: "400px",
            box_back: "rgba(0, 247, 255, 0.2)",
            box_border: "1px solid cyan",
            box_radius: "none",
            box_padding: "none",
            box_transition: "1s",

            listBox_background: "none",
            listBox_border: "none",
            listBox_radius: "none",
            listBox_padding: "none",

            sectionName_padding: "none",
            sectionName_back: "rgba(0, 255, 76, 0.12)",
            sectionName_back_hover: "red",
            sectionName_border: "none",
            sectionName_radius: "none",
            sectionName_transition: "500ms"
        }

        this.defaultLogic = {

        }

        this.dom = this.attachShadow({ mode: "open" })
    }
    /* PRIVATE */
    #configure() {
        const genetaredConf = this.deps.base.generateConf(this)
        this.css = genetaredConf.css
/*         this.logic = genetaredConf.logic
 */    }

    #draw() {
        this.dom.innerHTML = `
            <div class="main max">
            <div class="listBox max"></div>
            </div>
        `

        const customStyle = this.deps.base.add("style", this.dom)
        customStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                width: var(--box_width);
                height: var(--box_height);
                border-radius: var(--box_radius);
                transition: var(--box_transition);
            }

            .main {
                padding: var(--box_padding);
                background: var(--box_back);
                border: var(--box_border);

                .listBox {
                    background: var(--listBox_background);
                    border: var(--listBox_border);
                    border-radius: var(--listBox_radius);
                    padding: var(--listBox_padding);

                    .sectionName {
                        display: flex;
                        width: 100%;
                        height: 32px;
                        border: var(--sectionName_border);
                        border-radius: var(--sectionName_radius);
                        padding: var(--sectionName_padding);
                        background: var(--sectionName_back);

                        .expand {width: 0;}

                        &:hover {
                            background: var(--sectionName_back_hover);

                            .expandLeft_section {width: 100%;}
                        }

                        &:has(.hiddenInput:checked) +.sectionBox {
                            height: 200px;
                        }
                    }

                    .sectionBox {
                        height: 0px; 
                        overflow: hidden;
                        border: 1px solid red;
                    }
                }
            }

            .absolute {position: absolute;}
            .relative {position: relative;}
            .max {width: 100%; height: 100%;}
            .verCenter {display: flex; align-items: center;}
            .itemTransition {transition: var(--sectionName_transition);}
            .hiddenInput{appearance: none; cursor: pointer;}
        `
    }

    #drawList() {
        const listBox = this.dom.querySelector(".listBox")

        const addItemButtom = (name, box, mode) => {
            const expandLeft = this.deps.base.add("span", box, mode === "section"
                ? "expand itemTransition expandLeft_section"
                : "expand itemTransition expandLeft_box"
            )
            const nameBox = this.deps.base.add("div", box, mode === "section"
                ? "nameBox itemTransition verCenter"
                : "itemName itemTransition verCenter"
            )
            const expandRight = this.deps.base.add("span", box, mode === "section"
                ? "expand itemTransition expandRight_section"
                : "expand itemTransition expandRight_box"
            )
            const hiddenInput = this.deps.base.addHiddenInput("radio", box, "hiddenInput absolute max")
            hiddenInput.name = mode === "section" ? "section" : null
            nameBox.textContent = name
        }

        Object.entries(this.data).forEach(([section, componentsArr]) => {
            const sectionName = this.deps.base.add("div", listBox, "sectionName relative itemTransition verCenter")
            addItemButtom(section, sectionName, "section")
            const sectionBox = this.deps.base.add("div", listBox, "sectionBox relative itemTransition")

            componentsArr.forEach((component) => {
                addItemButtom(component.name, sectionBox, "item")
            })
        })
    }

    /* PUBLIC */
    addDependency(dependencies) {
        if (this.eventDom === undefined) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === undefined) { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.deps = dependencies
    }

    updateConf(propOrVar, value) { this.deps.base.updateConf(propOrVar, value, this) }

    init() {
        this.#configure()
        this.#draw()
        this.#drawList()
    }
}
customElements.define(tag, ReactiveList_01)
