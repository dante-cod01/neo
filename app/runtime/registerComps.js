const registerComps = new Map()

export const get = (path) => {
    return registerComps.get(path)
}

export const set = async (path) => {
    if (!registerComps.has(path)) {
        const imported = await import(path)
        registerComps.set(path, imported)
    }
    return get(path)
}