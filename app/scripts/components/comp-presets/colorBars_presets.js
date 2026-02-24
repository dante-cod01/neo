export const preset_0 = {
    css: {
        box_width: "100%",
        box_height: "80%",

        layer_margin: "2px",
        layer_transition: "1000ms",
        layer_delay: "15ms",
    },
    logic: {
        direction: "hor",
        hover: "true",
        progressive_appear: "true"
    },
    id: "colorBars",
    commands: [
        (component) => {
            const palette = "hsla(189, 100%, 32%, 0.32)"
            component.addBackgrounds("palette", palette, 50, 0, 30)
        }]
}

export const preset_1 = {
    css: {
        box_width: "100%",
        box_height: "80%",

        layer_margin: "2px",
        layer_transition: "1000ms",
        layer_delay: "15ms",
    },
    logic: {
        direction: "hor",
        hover: "true",
        progressive_appear: "true"
    },
    id: "colorBars",
    commands: [
        (component) => {
            const color = "hsla(189, 100%, 32%, 0.32)"
            component.addBackgrounds("color", color, 60)
        }]
}

export const preset_2 = {
    css: {
        box_width: "100%",
        box_height: "80%",

        layer_margin: "2px",
        layer_transition: "1000ms",
        layer_delay: "15ms",
    },
    logic: {
        direction: "hor",
        hover: "true",
        progressive_appear: "true"
    },
    id: "colorBars",
    commands: [
        (component) => {
            const colors = [
                "hsla(207, 44%, 49%, 0.30)",
                "hsla(266, 76%, 59%, 0.30)",
                "hsla(317, 100%, 42%, 0.30)",
            ]
            component.addBackgrounds("paletteColors", colors, 10)
        }]
}
