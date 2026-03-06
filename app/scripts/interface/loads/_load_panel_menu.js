import * as component from "/app/components/comp_classes/micro/panel/panel_autoClose.js"
import * as css_helper from "/app/scripts/modules/css.js"

export const init = async (box) => {

    const panelConf = {
        id: "panel",
        css: {
            box_width: css_helper.getVar("panel_width_open"),
            box_height: css_helper.getVar("panel_height_open"),
            box_width_contract: css_helper.getVar("panel_width_close"),
            box_height_contract: css_helper.getVar("panel_height_close"),
            box_back: "transparent",
            box_border: "none",
            box_transition: css_helper.getVar("normal_transition"),
        },
        logic: {
            node_direction: "ver"
        }
    }

    const titleConf = {
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
            box_width: "100%",
            box_height: css_helper.getVar("bar_height"),
            box_back: css_helper.getVar("dark_2"),
            box_radius: css_helper.getVar("interface_radius"),
            box_transition: css_helper.getVar("normal_transition"),

            title_fontFamily: "Anta",
            title_fontSize: "14px",
            title_fontColor: css_helper.getVar("light_3"),

            icon_fontSize: "16px",
            icon_fontColor: css_helper.getVar("light_3"),
        },
        logic: {
            icon_type: "material",
            icon_side: "right"
        }
    }

    const listConf = {
        data: (await import("./../../../config/componentsList.js")).default,
        css: {
            box_width: "100%",
            box_height: `calc(100% - ${css_helper.getVar("bar_height")})`,
            box_back: "transparent",
            box_border: "none",
            box_padding: "10px 0",
            box_transition: css_helper.getVar("normal_transition"),

            listBox_background: css_helper.getVar("light_4"),
            listBox_radius: css_helper.getVar("interface_radius"),
            listBox_padding: "5px",

            sectionName_padding: "0 10px",
            sectionName_radius: "6px",
/*             sectionName_back: "transparent",
 */            sectionName_back_hover: "red",
            sectionName_transition: "400ms ease-in-out",
        }
    }

    component.init(box, { panel: panelConf, title: titleConf, list: listConf })
}