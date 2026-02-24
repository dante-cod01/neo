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
    commands: [
        (component) => {
            const palette = "hsla(189, 100%, 32%, 0.32)"
            const color = "hsla(189, 100%, 32%, 0.32)"
            const colors = [
                "rgba(70, 130, 180, 0.3)",
                "rgba(140, 70, 230, 0.3)",
                "rgba(215, 0, 155, 0.3)",
            ]

            component.addBackgrounds("palette", palette, 50, 0, 30)

            /*             component.addBackgrounds("paletteColors", colors, 6)
 */
/*             component.addBackgrounds("color", color, 60)
 */        }]
}
