import { postsConstants } from '../constants';

export function posts(state = {}, action) {
  switch (action.type) {
    case postsConstants.POST_REQUEST:
      return {
        ...state,
        profile: action.section
      };
    case postsConstants.POST_SUCCESS:
      return {
        ...state,
        [action.section]: action.posts
      };
    case postsConstants.POST_FAILURE:
      return {
          ...state,
        [action.section]: action.error
      };
    default:
      return state
  }
}