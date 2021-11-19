export const setCookie = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
}

export const getCookie = (key) => {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
}

export const removeCookie = (key) => {
    localStorage.removeItem(key)
}
