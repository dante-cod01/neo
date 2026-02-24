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

    /* public methods */
    addDependency(dependencies) {
        if (this.eventDom === undefined) { (console.log({ eventDom: this.eventDom }, "not configured")); return }
        if (this.eventName === undefined) { (console.log({ eventName: this.eventName }, "not configured")); return }
        this.deps = dependencies
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
            const palette = this.deps.colors.paletteHsla("l", color, num, max, min)
            this.#addColors("colors", layers, palette)
            this.#progressiveAppear(layers, this.logic.progressive_appear)
        }
        if (mode === "paletteColors") {
            const paletteColors = this.deps.colors.paletteHslaColors(color, num)
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

    disconnectedCallback() {
        this.deps.base.sendEvent(this.eventDom, this.eventName, { disconnected: true })
    }
}
customElements.define(tag, ColorsBars)