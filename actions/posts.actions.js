import { postsConstants } from '../constants';
import KushyApi from '../utils/KushyApi';
// import { alertActions } from './';
import Router from 'next/router';

export const postsActions = {
    getPosts
};
const api = new KushyApi()

function getPosts(section) {
    return dispatch => {
        dispatch(request({ section }));

        const params = `?include=categories`
        api.getAll(section, params)
            .then(
                posts => {
                    dispatch(success(section, posts));
                },
                error => {
                    dispatch(failure(error.toString()));
                    // dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(section) { return { type: postsConstants.POST_REQUEST, section } }
    function success(section, posts) { return { type: postsConstants.POST_SUCCESS, posts, section } }
    function failure(error) { return { type: postsConstants.POST_FAILURE, section, error } }
}

function loggedIn(token) {
    return {
        type: postsConstants.TOKEN_SUCCESS,
        token
    };
}