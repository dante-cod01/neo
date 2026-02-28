import * as dom_helper from "../../modules/dom.js"
import * as css_helper from "../../modules/css.js"
import * as component from "../../../runtime/componentLoader.js"

const drawPanelBox = async (box) => {
    /* panel-box component */
    const componentClass = "/app/scripts/components/comp-classes/nano/boxes/magicBox.js"

    const conf = {
        css: {
            box_width: css_helper.getVar("panel_width_open"),
            box_height: css_helper.getVar("panel_height_open"),
            box_width_contract: css_helper.getVar("panel_width_close"),
            box_height_contract: css_helper.getVar("panel_height_close"),
            box_back: "transparent",
            box_radius: css_helper.getVar("interface_radius"),
            box_transition: css_helper.getVar("normal_transition")
        },
        logic: {
            node_direction: "ver",
            node_align: "right"
        },
        id: "panelMenu",
        events: {
            eventDom: document,
            eventName: "panelMenu"
        },
        dependencies: { "base": "../scripts/components/comp-dependencies/base.js" }
    }
    const componentLoaded = await component.load(componentClass, conf, "panelMenu panel absolute", box)
    const node = componentLoaded
    return node
}

const drawTitleBox = async (box) => {
    const componentClass = "/app/scripts/components/comp-classes/nano/titles/titleIcon.js"

    const conf = {
        links: [
            { type: "font", name: "Material Symbols Outlined", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
            { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
        ],
        data: {
            title: "Components",
            icon: "dehaze"
        },
        css: {
            box_width: css_helper.getVar("100%"),
            box_height: css_helper.getVar("bar_height"),
            box_back: css_helper.getVar("dark_2"),
            box_transition: css_helper.getVar("normal_transition"),

            title_fontFamily: "Anta",
            title_fontSize: "14px",
            title_fontColor: css_helper.getVar("light_3"),
            title_margin: "0 0 0 20px",

            icon_fontSize: "16px",
            icon_fontColor: css_helper.getVar("light_3"),

        },
        logic: {
            iconType: "material",
            iconSide: "left"
        },
        id: "panelMenu_title",
        events: {
            eventDom: document,
            eventName: "panelMenu_title"
        },
        dependencies: { "base": "../scripts/components/comp-dependencies/base.js" }
    }
    const componentLoaded = await component.load(componentClass, conf, "", box)
    return componentLoaded
}

const drawConfigSection = (box, dom) => {
    const ccsClass = dom_helper.add("style", dom.shadowRoot, "panel_configSection")
    ccsClass.textContent = `
        .listBox {
            width: 100%;
            height: calc(100% - ${css_helper.getVar("bar_height")});
            border: 1px solid blue;

            .sectionTitle {
                border: 1px solid green;
            }

            .sectionItems {
                width: 100%;
                height: 0px;
                overflow: hidden;
                transition: 1s;
                border: 1px solid red;
            }
        }

        .listBox .sectionItems_expanded {height: 200px};
    `

    const listBox = dom_helper.add("div", box, "listBox", "panel_configSection")
    return listBox
}

const drawMenuBox = async (box) => {
    const titleIcon = "/app/scripts/components/comp-classes/nano/titles/titleIcon.js"
    const data = (await import("/app/config/allComponents_list.js")).default

    const sectionConf = {
        links: [{ type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" }],
        data: { title: "" },
        css: {
            box_width: "100%",
            box_height: css_helper.getVar("bar_height"),
            box_back: "transparent",
            box_transition: css_helper.getVar("normal_transition"),

            title_fontFamily: "Anta",
            title_fontSize: "14px",
            title_fontColor: css_helper.getVar("light_3"),
            title_margin: "0 0 0 20px",

            icon_fontSize: "16px",
            icon_fontColor: css_helper.getVar("light_3"),
        },
        logic: { iconSide: "left" },
        id: null,
        events: {
            eventDom: document,
            eventName: "menuListSection"
        },
        dependencies: { "base": "../scripts/components/comp-dependencies/base.js" }
    }

    const itemsConf = {
        links: [{ type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" }],
        data: { title: "" },
        css: {
            box_width: "100%",
            box_height: css_helper.getVar("bar_height"),
            box_back: "transparent",
            box_transition: css_helper.getVar("normal_transition"),

            title_fontFamily: "Anta",
            title_fontSize: "14px",
            title_fontColor: css_helper.getVar("light_3"),
            title_margin: "0 0 0 20px",

            icon_fontSize: "16px",
            icon_fontColor: css_helper.getVar("light_3"),
        },
        logic: { iconSide: "left" },
        id: null,
        events: {
            eventDom: document,
            eventName: "menuListItems"
        },
        dependencies: { "base": "../scripts/components/comp-dependencies/base.js" }
    }

    const stringToId = (par) => {
        const strings = par.split(" ")
        let idString = ""
        strings.forEach((item, index) => {
            index === 0 && (idString = idString + item.toLowerCase())
            index > 0 && (idString = idString + item.charAt(0).toUpperCase() + item.slice(1).toLowerCase())
        })
        return idString
    }

    let sectionIndex = 0
    for (const [section, sectionComponents] of Object.entries(data)) {
        sectionConf.data.title = section
        sectionConf.id = "menuListSection" + stringToId(section)
        const sectionName = await component.load(titleIcon, sectionConf, "sectionTitle", box)
        sectionName.meta = {index: sectionIndex}
        const sectionItems = dom_helper.add("div", box, "sectionItems", `sectionItems_${sectionIndex}`)

        let itemIndex = 0
        for (const value of Object.values(sectionComponents)) {
            itemsConf.data.title = value.name
            itemsConf.id = "menuListItems" + stringToId(value.name)
            const listItem = await component.load(titleIcon, itemsConf, "", sectionItems)
            listItem.meta = {info: value}
            itemIndex++
        }

        sectionIndex++
    }

    document.addEventListener("menuListSection", (e) => {
        console.log("section")
        const listDom = document.querySelector("#panelMenu").getNodes()[0]
        const sectionIndex = e.detail.component.meta.index
        const sectionItems = listDom.querySelector("#sectionItems_" + sectionIndex)
        e.detail.check
            ? sectionItems.classList.add("sectionItems_expanded")
            : sectionItems.classList.remove("sectionItems_expanded")
    })

    document.addEventListener("menuListItems", (e) => {

        console.log(e.detail.component.meta)
    })
}

export const init = async (box) => {
    const panelBox = await drawPanelBox(box)
    const titleBox = await drawTitleBox(panelBox.getNodes()[0])
    const configSection = drawConfigSection(panelBox.getNodes()[0], panelBox)
    const menuList = await drawMenuBox(configSection)
}