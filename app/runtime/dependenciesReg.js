const dependenciesReg = new Map()

export const get = (name) => {
    return dependenciesReg.get(name)
}

export const set = (name, path) => {
    if (!dependenciesReg.has(name)) {
        const imported = import(path).then(mod => mod.default)
        dependenciesReg.set(name, imported)
    }
    return get(name)
}