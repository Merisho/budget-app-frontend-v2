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

    case actions.SET_ALL_BUDGETS:
      return {
        ...state,
        all: action.payload.budgets
      };

    case actions.CREATE_BUDGET: 
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.budget.id]: action.payload.budget,
        }
      };

    case actions.EDIT_BUDGET:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.budgetId]: action.payload.budget
        }
      };

    case actions.DELETE_BUDGET:
      const all = { ...state.all };
      delete all[action.payload.budgetId];
      return {
        ...state,
        all
      };

    default:
      return state;
  }
};
