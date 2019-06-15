const init = {
  currentBudget: null,
  currentExpenseItem: null,
  allBudgets: null,
  user: {
    id: '2fa434ad-5611-4e1e-8aa4-61616577bc72'
  }
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
    case 'CREATE_BUDGET': {
      return {
        ...state,
        allBudgets: [ action.payload.budget, ...state.allBudgets ]
      };
    }
    case 'SET_CURRENT_EXPENSE_ITEM':
      return {
        ...state,
        currentExpenseItem: action.payload.expenseItem
      };
    case 'CREATE_EXPENSE_ITEM':
      if (!state.currentBudget || !action.payload.expenseItem) {
        return state;
      }

      return {
        ...state,
        currentBudget: {
          ...state.currentBudget,
          expenseItems: [ action.payload.expenseItem, ...state.currentBudget.expenseItems ]
        }
      };
    default:
      return state;
  }
};