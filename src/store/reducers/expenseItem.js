import { expenseItem as expenseItemActions } from '../actions';

const init = {
  current: null,
  all: {}
};

export default (state = init, action) => {
  switch (action.type) {
    case expenseItemActions.CREATE_EXPENSE_ITEM:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.expenseItem.id]: action.payload.expenseItem
        }
      };

    case expenseItemActions.EDIT_EXPENSE_ITEM:
      return {
        ...state,
        all: {
          ...state.all,
          [action.payload.expenseItem.id]: action.payload.expenseItem
        }
      };

    case expenseItemActions.DELETE_EXPENSE_ITEM:
      const all = { ...state.all };
      delete all[action.payload.expenseItemId];

      return {
        ...state,
        all
      };
    case expenseItemActions.LOAD_EXPENSE_ITEMS:
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
