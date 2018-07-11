import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { posts } from './posts.reducer';
import { users } from './users.reducer';

const rootReducer = combineReducers({
  authentication,
  posts,
  users
});

export default rootReducer;