import { user as userActions } from '../actions';

const init = null;

export default (state = init, action) => {
  switch (action.type) {
    case userActions.SET_USER:
      return { ...action.payload.user };
    default:
      return state;
  }
};
