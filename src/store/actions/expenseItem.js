const CREATE_EXPENSE_ITEM = 'CREATE_EXPENSE_ITEM';
const EDIT_EXPENSE_ITEM = 'EDIT_EXPENSE_ITEM';
const DELETE_EXPENSE_ITEM = 'DELETE_EXPENSE_ITEM';
const LOAD_EXPENSE_ITEMS = 'LOAD_EXPENSE_ITEMS';

export default {
  CREATE_EXPENSE_ITEM,
  EDIT_EXPENSE_ITEM,
  DELETE_EXPENSE_ITEM,
  LOAD_EXPENSE_ITEMS,

  createExpenseItem(expenseItem) {
    return {
      type: CREATE_EXPENSE_ITEM,
      payload: { expenseItem }
    };
  },

  editExpenseItem(expenseItemId, expenseItem) {
    return {
      type: EDIT_EXPENSE_ITEM,
      payload: { expenseItemId, expenseItem }
    };
  },

  deleteExpenseItem(expenseItemId) {
    return {
      type: DELETE_EXPENSE_ITEM,
      payload: { expenseItemId }
    };
  },

  loadExpenseItem(expenseItem) {
    return {
      type: LOAD_EXPENSE_ITEMS,
      payload: {
        expenseItems: {
          [expenseItem.id]: expenseItem
        }
      }
    };
  },

  loadExpenseItems(expenseItems) {
    return {
      type: LOAD_EXPENSE_ITEMS,
      payload: { expenseItems }
    };
  }
};
