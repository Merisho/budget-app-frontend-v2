const LOAD_BUDGET = 'LOAD_BUDGET';

export default {
  LOAD_BUDGET,

  loadBudget(budget) {
    return {
      type: LOAD_BUDGET,
      payload: { budget }
    };
  }
};
