import * as actions from '../actions';

const init = null;

export default (state = init, action) => {
  switch (action.type) {
    case actions.SET_USER:
      return { ...action.payload.user };
    default:
      return state;
  }
};
