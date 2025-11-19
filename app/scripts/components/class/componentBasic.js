export class ComponentBasic {

    config = {}

    loadConfig(array) {
        config = { ...defaultConf }
        Object.entries(config).forEach(([type, obj]) => {
            Object.entries(obj).forEach(([prop, value]) => config[type][prop] = value[0])
        })

        const attributes = JSON.parse(array)
        Object.entries(attributes).forEach(([type, obj]) => {
            if (!Object.keys(config).includes(type)) {
                console.log({ type }, "type not allowed skipping")
                return
            }
            Object.entries(obj).forEach(([prop, value]) => {
                const exist = config[type][prop] ? true : false
                if (!exist) {
                    console.log({ prop }, "prop not allowed skipping")
                    return
                }
                if (defaultConf[type][prop].includes(value)) {
                    config[type][prop] = value
                } else {
                    console.log({ prop }, { value }, "not allowed using default", config[type][prop].toUpperCase())
                }
            })
        })
    }

    add(tag, box, classN = null, id = null) {
        const element = document.createElement(tag)
        classN && (element.className = classN)
        id && (element.id = id)
        box.appendChild(element)
        return element
    }
}