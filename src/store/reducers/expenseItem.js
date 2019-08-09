import * as actions from '../actions';

const init = {
  current: null,
  all: []
};

export default (state = init, action) => {
  switch (action.type) {
    case actions.SET_CURRENT_EXPENSE_ITEM:
      return {
        ...state,
        current: action.payload.expenseItem
      };

    case actions.CREATE_EXPENSE_ITEM:
      return {
        ...state,
        all: [ ...state.all, action.payload.expenseItem ]
      };

    case actions.EDIT_EXPENSE_ITEM:
      const expenseItemIndex = state.all.findIndex(ei => ei.id === action.payload.expenseItemId);
      return {
        ...state,
        all: [
          ...state.all.slice(0, expenseItemIndex),
          action.payload.expenseItem,
          ...state.all.slice(expenseItemIndex + 1)
        ]
      };

    case actions.DELETE_EXPENSE_ITEM:
      return {
        ...state,
        all: state.all.filter(i => i.id !== action.payload.expenseItemId)
      };
    case actions.LOAD_EXPENSE_ITEMS:
      const all = [ ...state.all ].filter(item => !action.payload.expenseItems.find(newItem => item.id === newItem.id));
      return {
        ...state,
        all: all.concat(action.payload.expenseItems)
      };
    default:
      return state;
  }
};
