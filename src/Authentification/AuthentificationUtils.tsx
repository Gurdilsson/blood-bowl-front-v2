
const USER_ID = 'userId'

export function isUserLogged(): boolean {
    return window.localStorage.getItem(USER_ID) !== null
}

export function disconnect() {
    window.localStorage.clear()
}