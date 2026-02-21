export const tag = "colors-bars"
export class ColorsBars extends HTMLElement {
    constructor() {
        super()

        this.id
        this.deps
        this.links
        this.eventDom
        this.eventName
        this.newCss = {} /* custom Conf */
        this.css = {} /* final Conf */
        this.newLogic = {} /*  custom Logic */
        this.logic = {} /*  final Logic */
        this.customStyle

        this.defaultCss = {
            box_width: "100%",
            box_height: "100%",

            layer_margin: "none",
            layer_transition: "none",
            layer_delay: "none",
        }

        this.defaultLogic = {
            direction: ["hor", "ver"],
            hover: ["true", "false"],
            progressive_appear: ["true", "false"]
        }

        this.dom = this.attachShadow({ mode: "open" })
    }

    /* private methods */
    #init() {
        this.#configure()
        this.#draw()
        if (this.eventDom && this.eventName) this.deps.base.sendEvent(this.eventDom, this.eventName, { ready: true })
    }

    #configure() {
        this.css = this.deps.base.generateConf(this.defaultCss, this.newCss, this)
        this.deps.base.objToCssVar(this.css, this)
        this.logic = this.deps.base.generateConf(this.defaultLogic, this.newLogic, this)
    }

    #draw() {
        this.container = this.deps.base.add("div", this.dom, "main max")
        this.customStyle = this.deps.base.add("style", this.dom)
        this.customStyle.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            :host {
                display: flex;
                width: var(--box_width);
                height: var(--box_height);
                background: var(--box_back);

                --layerWidth: 100%;
                --layerHeight: 100%;
                --layerMargin: none;
            }

            .main .layer {
                width: var(--layerWidth);
                height: var(--layerHeight);
                margin: var(--layerMargin);
                opacity: 0;
                transition: var(--layer_transition);
            }

            .max { width: 100%; height: 100%; }
            .flex { display: flex; }
            .flexVer { display: flex; flex-direction: column; }
            .layer.visible { opacity: 1; }
        `
    }

    #addLayers(num) {
        for (let i = 0; i < num; i++) {
            const layer = this.deps.base.add("div", this.container, `layer layer_${i} layerMargin`)
        }
        return Array.from(this.container.querySelectorAll(".layer"))
    }

    #applyDirection(layers) {
        if (this.logic.direction === "hor") {
            this.style.setProperty("--layerWidth", 100 / layers.length + "%")
            this.style.setProperty("--layerHeight", "100%")
            this.container.classList.add("flex")
            this.deps.base.toCssVar2("layerMargin", "0px var(--layer_margin)", this)
        }
        if (this.logic.direction === "ver") {
            this.style.setProperty("--layerWidth", "100%")
            this.style.setProperty("--layerHeight", 100 / layers.length + "%")
            this.container.classList.add("flexVer")
            this.deps.base.toCssVar2("layerMargin", "var(--layer_margin)", this)
        }
    }

    async #progressiveAppear(layers, boolean) {
        if (this.logic.progressive_appear === "true" && this.css.layer_delay === "none") {
            console.log([this], "prop layer_delay not configured")
        }

        const transition = this.deps.base.transitionTime2(this.css.layer_transition)
        for (let i = 0; i < layers.length; i++) {
            boolean ? await this.deps.base.pause(this.deps.base.transitionTime2(this.css.layer_delay)[0]) : "0s"
            layers[i].classList.add("visible")
        }
    }

    #addColors(mode, layers, color) {
        for (let i = 0; i < layers.length; i++) {
            if (mode === "colors") {
                this.customStyle.textContent += `.layer_${i} { background: ${color[i]}}`
            }
            if (mode === "color") {
                this.customStyle.textContent += `.layer_${i} { background: ${color}}`
            }
            layers[i].classList.add(`layer_${i}`)
        }
    }

    #analizeColor(color) {
        const h = parseFloat(color.split("(")[1].split(",")[0])
        const s = parseFloat(color.split(" ")[1].split(",")[0])
        const l = parseFloat(color.split(" ")[2].split(",")[0])
        const a = Number(color.split(" ")[3].split(",")[0].slice(0, -1))
        return { "h": h, "s": s, "l": l, "a": a }
    }

    #paletteHsla(mode, color, num, max, min) {
        if (!color.toLowerCase().includes("hsla")) {
            console.log([this.id], "Color format error. only HSLA CSS3")
            return
        }
        const hsla = this.#analizeColor(color)
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

    #paletteHslaColors(colors, steps) {
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
        colors.forEach(item => hslaColors.push(this.#analizeColor(item)))
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

    /* public methods */
    addDependency(dependencies) {
        if (this.eventDom === undefined) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === undefined) { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.deps = {}
        Object.entries(dependencies).forEach(([dependency, depClass]) => {
            this.deps[dependency] = new depClass()
        })
        this.#init()
    }

    addBackgrounds(mode, color, num, max, min) {
        if (mode !== "palette" && mode !== "paletteColors" && mode !== "color") {
            console.log([this.id], "addBackground mode not reconized [palette | colors | image]")
            return
        }

        if (mode === "palette") {
            const layers = this.#addLayers(num)
            this.#applyDirection(layers)
            const palette = this.#paletteHsla("l", color, num, max, min)
            this.#addColors("colors", layers, palette)
            this.#progressiveAppear(layers, this.logic.progressive_appear)
        }
        if (mode === "paletteColors") {
            const paletteColors = this.#paletteHslaColors(color, num)
            const layers = this.#addLayers(paletteColors.length - 1)
            this.#applyDirection(layers)
            this.#addColors("colors", layers, paletteColors)
            this.#progressiveAppear(layers, this.logic.progressive_appear)
        }
        if (mode === "color") {
            const layers = this.#addLayers(num)
            this.#applyDirection(layers)
            this.#addColors("color", layers, color)
            this.#progressiveAppear(layers, this.logic.progressive_appear)
        }
    }

}
customElements.define(tag, ColorsBars)