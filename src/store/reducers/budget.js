import * as actions from '../actions';

const init = {
  current: null,
  all: []
};

export default (state = init, action) => {
  switch (action.type) {
    case actions.LOAD_BUDGET:
      return {
        ...state,
        all: [ ...state.all, action.payload.budget ]
      };

    case actions.SET_ALL_BUDGETS:
      return {
        ...state,
        all: action.payload.budgets
      };

    case actions.CREATE_BUDGET: 
      return {
        ...state,
        all: [ action.payload.budget, ...state.all ]
      };

    case actions.EDIT_BUDGET:
      const index = state.all.findIndex(b => b.id === action.payload.budgetId);
      if (index === -1) {
        return state;
      }

      const editedBudget = {
        ...state.all[index],
        ...action.payload.budget
      };

      return {
        ...state,
        all: [ ...state.all.slice(0, index), editedBudget, ...state.all.slice(index + 1) ]
      };

    case actions.DELETE_BUDGET:
      const all = state.all.filter(b => b.id !== action.payload.budgetId);
      return {
        ...state,
        all
      };
    default:
      return state;
  }
};
