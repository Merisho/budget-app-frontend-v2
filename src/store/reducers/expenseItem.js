import * as actions from '../actions';

const init = {
  current: null,
  all: {}
};

export default (state = init, action) => {
  switch (action.type) {
    case actions.CREATE_EXPENSE_ITEM:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.expenseItem.id]: action.payload.expenseItem
        }
      };

    case actions.EDIT_EXPENSE_ITEM:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.expenseItem.id]: action.payload.expenseItem
        }
      };

    case actions.DELETE_EXPENSE_ITEM:
      const all = { ...state.all };
      delete all[action.payload.expenseItemId];

      return {
        ...state,
        all
      };
    case actions.LOAD_EXPENSE_ITEMS:
      return {
        ...state,
        all: {
          ...state.all,
          ...action.payload.expenseItems
        }
      };
    default:
      return state;
  }
};
