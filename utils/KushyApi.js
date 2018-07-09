import config from '../config/config'

export default class KushyApi {
    constructor() {
        this.domain = config.kushyApiUrl
        this.fetch = this.fetch.bind(this)
        this.getState = this.getState.bind(this)
        this.getShopsByLocation = this.getShopsByLocation.bind(this)
        this.getAll = this.getAll.bind(this)
    }

    getState(state) {
        return this.fetch(`${this.domain}/states/${state}`, {
            method: 'GET'
        }).then(res => {
            console.log(res);
            return Promise.resolve(res)
        })
    }

    getAll(section, params = null)
    {
        const url = params ? `${this.domain}/${section}/${params}` : `${this.domain}/${section}/`
        console.log(url)
        return this.fetch(url, {
            method: 'GET'
        }).then(res => {
            console.log(res);
            return Promise.resolve(res)
        })
    }

    getShopsByLocation(lat, lng)
    {
        return this.fetch(`${this.domain}/location/${lat}/${lng}`, {
            method: 'GET'
        }).then(res => {
            console.log(res);
            return Promise.resolve(res)
        })
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        return fetch(url, {
                headers,
                ...options
            })
            // .then(this.auth._checkStatus)
            .then(response => response.json())
    }
}