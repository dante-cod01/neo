export default class Colors {
    #analyzeHSLA(color) { /* HSLA CSS3 format */
        const h = parseFloat(color.split("(")[1].split(",")[0])
        const s = parseFloat(color.split(",")[1].split(",")[0])
        const l = parseFloat(color.split(",")[2].split(",")[0])
        const a = color.split(",")[3] ? parseFloat(color.split(",")[3]) : 1
        return { "h": h, "s": s, "l": l, "a": a }
    }

    paletteHsla(mode, color, num, max, min) {
        if (!color.toLowerCase().includes("hsla")) {
            console.log([this.id], "Color format error. only HSLA CSS3")
            return
        }
        const hsla = this.#analyzeHSLA(color)
        let palette = []

        for (let i = 0; i < num; i++) {
            mode === "h" && (hsla.h = Math.round(max - ((max - min) / (num - 1) * i)))
            mode === "s" && (hsla.s = Math.round(max - ((max - min) / (num - 1) * i)))
            mode === "l" && (hsla.l = Math.round(max - ((max - min) / (num - 1) * i)))
            mode === "a" && (hsla.a = Math.round(max - ((max - min) / (num - 1) * i)) / 100)
            palette.push(`hsla(${hsla.h}, ${hsla.s}%, ${hsla.l}%, ${hsla.a})`)
        }
        return palette
    }

    paletteHslaColors(colors, steps) {
        if (colors.some(color => !color.includes("hsla"))) {
            console.log([this.id], "Color format error. only HSLA CSS3")
            return
        }
        if (colors.length < 2) {
            console.log([this.id], "only can do palette with almost 2 colors")
            return
        }
        if (steps < 1) {
            console.log([this.id], "need some new color in the middle")
            return
        }
        const hslaColors = []
        colors.forEach(item => hslaColors.push(this.#analyzeHSLA(item)))
        const palette = []

        hslaColors.forEach((item, index) => {
            if (index < hslaColors.length - 1) {
                const h_dif = hslaColors[index + 1].h - item.h
                const a_dif = hslaColors[index + 1].a - item.a

                for (let i = 0; i <= steps; i++) {
                    const color = item.h + (h_dif / steps) * i
                    const alpha = item.a + (a_dif / steps) * i
                    palette.push(`hsla(${color}, ${item.s}%, ${item.l}%, ${alpha})`)
                }
            }
        })
        palette.push(hslaColors.at(-1))
        return palette
    }
}