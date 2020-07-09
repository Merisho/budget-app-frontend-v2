const LOAD_BUDGET = 'LOAD_BUDGET';
const OUTDATE_BUDGET = 'OUTDATE_BUDGET';

export default {
  LOAD_BUDGET,
  OUTDATE_BUDGET,

  loadBudget(budget) {
    return {
      type: LOAD_BUDGET,
      payload: { budget }
    };
  },

  outdateCurrentBudget(budgetId) {
    return {
      type: OUTDATE_BUDGET,
      payload: { budgetId },
    };
  },
};
