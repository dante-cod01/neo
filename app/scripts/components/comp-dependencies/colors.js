export default class Colors {
    #analyzeHSLA(color) { /* HSLA CSS3 format */
        const h = parseFloat(color.split("(")[1].split(",")[0])
        const s = parseFloat(color.split(",")[1].split(",")[0])
        const l = parseFloat(color.split(",")[2].split(",")[0])
        const a = color.split(",")[3] ? parseFloat(color.split(",")[3]) : 1
        return { "h": h, "s": s, "l": l, "a": a }
    }

    paletteHsla(mode, color, num, max, min, dom) {
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

    paletteHslaColors(colors, steps, dom) {
        if (colors.some(color => !color.includes("hsla"))) {
            console.log([dom.id], "Color format error. only HSLA CSS3")
            return
        }
        if (colors.length < 2) {
            console.log([dom.id], "only can do palette with almost 2 colors")
            return
        }
        if (steps < 1) {
            console.log([dom.id], "need some new color in the middle")
            return
        }
        const hslaColors = []
        colors.forEach(item => hslaColors.push(this.#analyzeHSLA(item)))
        const palette = []

        let index = 0
        for (const item of hslaColors) {
            if (index < hslaColors.length - 1) {
                const h_dif = hslaColors[index + 1].h - item.h
                const s_dif = hslaColors[index + 1].s - item.s
                const l_dif = hslaColors[index + 1].l - item.l
                const a_dif = hslaColors[index + 1].a - item.a

                for (let i = 0; i < steps; i++) {
                    const hsla_h = Math.round(item.h + (h_dif / steps) * i)
                    const hsla_s = Math.round(item.s + (s_dif / steps) * i)
                    const hsla_l = Math.round(item.l + (l_dif / steps) * i)
                    const hsla_a = item.a + (a_dif / steps) * i
                    palette.push(`hsla(${hsla_h}, ${hsla_s}%, ${hsla_l}%, ${hsla_a})`)
                }
            }
            index++
        }
        palette.push(hslaColors.at(-1))
        console.log(palette)
        return palette
    }
}