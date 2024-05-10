export const useFetch = async (url: string, options = {}) => {
    const response = await fetch(url, options)
    if (!response.ok) {
        throw new Error('Network response was not ok')
    }
    return await response.json()
}

export const querystring = () => {
    const stringify = (params: Record<string, any>) => {
        let result = ''
        for (const key in params) {
            if (Object.prototype.hasOwnProperty.call(params, key)) {
                const value = params[key]
                result += `${key}=${value}&`
            }
        }
        return result.slice(0, -1)
    }
    return {
        stringify
    }
}
