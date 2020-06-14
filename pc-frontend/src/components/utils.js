export function isLoggedIn() {
    return localStorage.getItem('token') ? true : false
}

export const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    });

    if (localStorage.getItem('token')) {
        headers.append('Authorization', `JWT ${localStorage.getItem('token')}`)
    }

    const defaults = {headers: headers};
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response =>
            response.json().then(json => {
                 if (!response.ok) {
                     return Promise.reject(json);
                 }
                return json;
            })
        );
};