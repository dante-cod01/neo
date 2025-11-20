export class ComponentBasic {

    loadConfig(attributes, defaultConf, styleInstance) {
        let config = structuredClone(defaultConf)

        Object.entries(attributes).forEach(([prop, attributeValue]) => {
            const propValid = prop in config
            const defaultValueArray = Array.isArray(config[prop])
            const attributeValid = typeof (attributeValue) === "string"

            if (!propValid || !attributeValid) {
                console.log({ prop }, { attributeValue }, "not permited skipping")
                return
            }

            if (defaultValueArray) {
                const validValue = config[prop].includes(attributeValue)
                config[prop] = validValue ? attributeValue : config[prop][0]
            } else {
                config[prop] = attributeValue
            }
        })

        Object.entries(config).forEach(([prop, value]) => { if (Array.isArray(value)) config[prop] = value[0] })
        return config
    }

    toCssVar(style, obj) {
        Object.entries(obj).forEach(([prop, value]) => { style.setProperty(`--${prop}`, value) })
    }

    add(tag, box, classN = null, id = null) {
        const element = document.createElement(tag)
        classN && (element.className = classN)
        id && (element.id = id)
        box.appendChild(element)
        return element
    }
}