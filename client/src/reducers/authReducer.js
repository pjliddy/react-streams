import { SIGN_IN, SIGN_OUT } from '../actions/types';

// set default value for isSignedIn state property
const INITIAL_STATE = {
    isSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, action) => {
  // create new object as copy of state and update isSignedOut
  switch(action.type) {
    case SIGN_IN:
      return { ...state, isSignedIn: true, userId: action.payload };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, userId: null };
    default:
      return state;
  }
}
