import * as actions from '../actions';

const init = {
  current: null,
  all: {}
};

export default (state = init, action) => {
  switch (action.type) {
    case actions.LOAD_BUDGET:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.budget.id]: action.payload.budget
        }
      };

    default:
      return state;
  }
};
