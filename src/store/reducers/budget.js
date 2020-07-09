import { budget as budgetActions } from '../actions';

const init = {
  all: {}
};

export default (state = init, action) => {
  switch (action.type) {
    case budgetActions.LOAD_BUDGET:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.budget.id]: action.payload.budget
        }
      };
    case budgetActions.OUTDATE_BUDGET:
      const newState = { ...state };
      delete newState.all[action.payload.budgetId];

      return newState;
    default:
      return state;
  }
};
