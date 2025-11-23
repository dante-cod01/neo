export const get = async (path) => {
    try {
        const response = await fetch(path)
        if (!response.ok) throw new Error(`FECTH ${response.status}`)
        
        try {
            return await response.json()
        } catch {
            return null
        }
    } catch (error) {
        throw error
    }
}