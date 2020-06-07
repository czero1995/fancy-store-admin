export default {
  getSessionStorage(name) {
    const data = sessionStorage.getItem(name)
    if (data) return JSON.parse(data)
    return null
  },
  setSessionStorage(name, data) {
    sessionStorage.setItem(name, JSON.stringify(data))
  },
  getLocalStorage(name) {
    const data = localStorage.getItem(name)
    if (data) return JSON.parse(data)
    return null
  },
  setLocalStorage(name, data) {
    localStorage(name, JSON.stringify(data))
  },
}
