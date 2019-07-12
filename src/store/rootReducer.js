const init = {
  currentBudget: null,
  currentExpenseItem: null,
  allBudgets: null,
  user: null,
  errorMessage: '',
  showError: false,
  successMessage: '',
  showSuccess: false
};

export default (state = init, action) => {
  switch(action.type) {
    case 'SET_CURRENT_BUDGET':
      return {
        ...state,
        currentBudget: action.payload.budget
      };
    case 'SET_ALL_BUDGETS':
      return {
        ...state,
        allBudgets: action.payload.budgets
      };
    case 'CREATE_BUDGET': 
      return {
        ...state,
        allBudgets: [ action.payload.budget, ...state.allBudgets ]
      };
    case 'EDIT_BUDGET':
      const index = state.allBudgets.findIndex(b => b.id === action.payload.budgetId);
      if (index === -1) {
        return state;
      }

      const editedBudget = {
        ...state.allBudgets[index],
        ...action.payload.budget
      };

      return {
        ...state,
        allBudgets: [ ...state.allBudgets.slice(0, index), editedBudget, ...state.allBudgets.slice(index + 1) ]
      };
    case 'DELETE_BUDGET':
      const allBudgets = state.allBudgets.filter(b => b.id !== action.payload.budgetId);
      return {
        ...state,
        allBudgets: allBudgets
      };
    case 'SET_CURRENT_EXPENSE_ITEM':
      return {
        ...state,
        currentExpenseItem: action.payload.expenseItem
      };
    case 'CREATE_EXPENSE_ITEM':
      if (!state.currentBudget) {
        return state;
      }

      const restItems = state.currentBudget.expenseItems || [];
      return {
        ...state,
        currentBudget: {
          ...state.currentBudget,
          expenseItems: [ action.payload.expenseItem, ...restItems ]
        }
      };
    case 'EDIT_EXPENSE_ITEM':
      if (!state.currentBudget) {
        return state;
      }

      const expenseItemIndex = state.currentBudget.expenseItems.findIndex(ei => ei.id === action.payload.expenseItemId);
      return {
        ...state,
        currentBudget: {
          ...state.currentBudget,
          expenseItems: [
            ...state.currentBudget.expenseItems.slice(0, expenseItemIndex),
            action.payload.expenseItem,
            ...state.currentBudget.expenseItems.slice(expenseItemIndex + 1)
          ]
        }
      };
    case 'DELETE_EXPENSE_ITEM':
      if (!state.currentBudget) {
        return state;
      }

      return {
        ...state,
        currentBudget: {
          ...state.currentBudget,
          expenseItems: state.currentBudget.expenseItems.filter(i => i.id !== action.payload.expenseItemId)
        }
      };
    case 'SHOW_ERROR':
      return {
        ...state,
        showError: true,
        errorMessage: action.payload.message
      };
    case 'HIDE_ERROR':
      return {
        ...state,
        showError: false
      };
    case 'SHOW_SUCCESS':
      return {
        ...state,
        showSuccess: true,
        successMessage: action.payload.message
      };
    case 'HIDE_SUCCESS':
      return {
        ...state,
        showSuccess: false
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload.user
      };
    default:
      return state;
  }
};