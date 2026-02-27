const register = new Map()

export const get = (name) => {
    return register.get(name)
}

export const set = async (name, path) => {
    if (!register.has(name)) {
        const imported = await import(path)
        register.set(name, imported.default)
    }
    return get(name)
}