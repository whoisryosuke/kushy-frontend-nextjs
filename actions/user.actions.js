import { userConstants } from '../constants';
import AuthService from '../utils/AuthService';
import UserService from '../utils/UserService';
// import { alertActions } from './';
import Router from 'next/router';

export const userActions = {
    login,
    logout,
    loggedIn,
    register,
    getUser,
    getLocation,
    storeUser,
    getAll,
    delete: _delete
};

const auth = new AuthService('http://localhost')

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        auth.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    Router.push('/dashboard');
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function loggedIn(token) {
    return {
        type: userConstants.TOKEN_SUCCESS,
        token
    };
}

function getUser(token) {
  return dispatch => {
        dispatch(request(token));

        auth.requestProfile(token)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    console.log(error)
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(token) { return { type: userConstants.PROFILE_REQUEST, token } }
    function success(user) { return { type: userConstants.PROFILE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.PROFILE_FAILURE, error } }
}

const getLocation = () => {
    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }

        geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, () => {
            reject(new Error('Permission denied'));
        });
    });

    return {
        type: GET_LOCATION,
        location
    }
};

function storeUser(user) {
    return {
        type: userConstants.USER_PROFILE,
        user
    };
}

function logout() {
    auth.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        auth.register(user)
            .then(
                user => { 
                    dispatch(success());
                    Router.push('/login');
                    // dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        auth.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        auth.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}