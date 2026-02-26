const dependenciesReg = new Map()

export const get = (name) => {
    return dependenciesReg.get(name)
}

export const set = async (name, path) => {
    if (!dependenciesReg.has(name)) {
        const imported = await import(path)
        dependenciesReg.set(name, imported.default)
    }
    return get(name)
}