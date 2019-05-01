export default class BudgetService {
  static fetchBudget(id) {
    return this._postRequest(`
      {
        budget(id: "${id}") {
          name
          total
          startDate
          endDate
          description
          free
          allowed
          transactionsTotal
          expenseItems {
            id
            name
            total
            description
            transactionsTotal
            transactions {
              total
              creationDate
            }
          }
        }
      }
    `);
  }

  static fetchAllUserBudgets(userId) {
    return this._postRequest(`
    {
      user(id: "${userId}") {
        budgets {
          id
          name
          total
          allowed
          startDate
          endDate
        }
      }
    }
  `);
  }

  static async  _postRequest(body) {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body
    });

    return res.json();
  }
};