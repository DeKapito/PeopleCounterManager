export function isLoggedIn() {
    return localStorage.getItem('token') ? true : false
}