import { combineReducers } from 'redux';

// Reducers
import auth from './auth';
import core from './core';

const rootReducers = combineReducers({
  auth: auth,
  core: core,
});

export default rootReducers;
