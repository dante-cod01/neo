import * as css_helper from "../modules/css.js"
import * as element from "../modules/element.js"

const drawBottomBar = async (box, dependency) => {
    const component = await import("../components/nano/expandBar.js")

    const conf = {
        box_width: css_helper.getVar("bar_width"),
        box_height: css_helper.getVar("bar_height"),
        box_width_max: "180px",
        box_back: css_helper.getVar("dark_4"),
        box_backFilter: `blur(${css_helper.getVar("interface_blur")})`,
        box_radius: css_helper.getVar("interface_radius"),
        box_nodesLayer_padding: "0px 20px 0px 20px",
        box_transition: css_helper.getVar("normal_transition")
    }

    const bottomBar = element.add(component.tag, box, "absolute bottomBar", "bottomBar")
    bottomBar.newConf = conf
    bottomBar.eventDom = document
    bottomBar.eventName = bottomBar.id
    bottomBar.addDependency(new dependency())
    bottomBar.addNodes(2)
    return bottomBar
}


export const init = async (box) => {
    const dependency = (await import("../components/class/componentBase.js")).ComponentBase
    const bottomBar = await drawBottomBar(box, dependency)
}