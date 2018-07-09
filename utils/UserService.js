import { getCookie } from './Cookies'
import config from '../config/config'

export default class UserService {
    constructor(domain) {
        this.domain = domain || 'http://localhost'
        this.getUser = this.getUser.bind(this)
    }
    
    getUser(req = null) {
        let token = getCookie(config.token, req)
        
        if(token)
        {
            return this.fetch(`${this.domain}/api/user`, {
                method: 'GET'
            }).then(data => {
                return data
            })
        }
    }

    _checkStatus(response) {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    fetch(url, options) {
        // performs api calls sending the required authentication headers
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken()
        }

        return fetch(url, {
                headers,
                ...options
            })
            .then(this._checkStatus)
            .then(response => response.json())
    }
}