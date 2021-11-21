export const setCookie = (key, value) => {
    localStorage.setItem(key, value)
}

export const getCookie = (key) => {
    return localStorage.getItem(key)
}

export const removeCookie = (key) => {
    localStorage.removeItem(key)
}
