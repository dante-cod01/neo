import * as css_helper from "/app/scripts/modules/css.js"
import * as loader from "/app/runtime/componentLoader.js"

const drawPanelBox = async (box) => {
    const module = { "magicBox": "/app/components/comp_classes/nano/boxes/magicBox.js" }
    const dependencies = { "base": "/app/components/comp_dependencies/base.js" }

    const conf = {
        id: "panel",
        css: {
            box_width: css_helper.getVar("panel_width_open"),
            box_height: css_helper.getVar("panel_height_open"),
            box_width_contract: css_helper.getVar("panel_width_close"),
            box_height_contract: css_helper.getVar("panel_height_close"),
            box_back: "transparent",
            box_border: "none",
            box_radius: css_helper.getVar("interface_radius"),
            box_transition: css_helper.getVar("normal_transition"),
        },
        logic: {
            node_direction: "ver"
        }
    }

    const component = await loader.load(box, module, dependencies)
    component.className = "panel panelMenu"
    component.init()
    return component
}

const drawTitleBox = async (box) => {
    const module = { "titleIcon": "/app/components/comp_classes/nano/titles/titleIcon.js" }
    const dependencies = { "base": "/app/components/comp_dependencies/base.js" }

    const conf = {
        id: "panel_title",
        links: [
            { type: "font", name: "Material Symbols Outlined", href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&display=swap" },
            { type: "font", name: "Anta", href: "https://fonts.googleapis.com/css2?family=Anta&display=swap" },
        ],
        data: {
            title: "Components List",
            icon: "format_list_bulleted"
        },
        css: {
            box_width: "400px",
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
            icon_type: "material",
            icon_side: "right"
        },
    }
    const component = await loader.load(box, module, dependencies)
    component.classList.add("titleBox")
    return component
}

const drawDividedNode = (component) => {
    const dividedNode = document.createElement("div")
    component.nodes[0].appendChild(dividedNode)
    dividedNode.classList.add("dividedNode")

    const titleBox = document.createElement("div")
    dividedNode.appendChild(titleBox)
    titleBox.className = "titleBox"

    const listBox = document.createElement("div")
    dividedNode.appendChild(listBox)
    listBox.className = "listBox"

    component.customStyle.textContent += `
        .dividedNode {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            width: 100%;
            height: 100%;

            .titleBox {
                width: 100%;
                height: ${css_helper.getVar("bar_height")};
                overflow: hidden;
            }

            .listBox {
                width: 100%;
                height: calc(100% - ${css_helper.getVar("bar_height")});
            }
        }
    `
    return {
        "titleBox": dividedNode.querySelector(".titleBox"),
        "listBox": dividedNode.querySelector(".listBox")
    }
}

export const init = async (box) => {
    const panelBox = await drawPanelBox(box)
    const dividedNode = drawDividedNode(panelBox)
    const titleBox = await drawTitleBox(dividedNode.titleBox)
    control(panelBox, titleBox)
}
export default init

/* CONTROL EVENT-BUS*/

const control = (panelBox, titleBox) => {
    document.addEventListener(titleBox.id, async (e) => {
        toggleSequence(e.detail.check, panelBox, titleBox)
    })
}

const toggleSequence = async (boolean, panel, title) => {
    const transition = panel.css.box_transition.split(" ")[0]
    const pauseTime = transition.endsWith("ms") ? transition.slice(0, -2) : transition.slice(0, -1) * 1000

    if (boolean) {
        panel.contract(true, "vertical")
        title.titleVisible(false)
        await new Promise(resolve => setTimeout(resolve, pauseTime))
        panel.contract(true, "horizontal")
        title.updateConf("icon_opacity", "0.6")
        await new Promise(resolve => setTimeout(resolve, pauseTime))
    } else {
        title.updateConf("icon_opacity", "1")
        panel.contract(false, "horizontal")
        await new Promise(resolve => setTimeout(resolve, pauseTime))
        title.titleVisible(true)
        panel.contract(false, "vertical")
        await new Promise(resolve => setTimeout(resolve, pauseTime))
    }
}