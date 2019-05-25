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

  static fetchExpenseItem(expenseItemId) {
    return this._postRequest(`
      {
        expenseItem(id: "${expenseItemId}") {
          name
          budgetID
          description
          transactions {
            id
            name
            total
            description
            creationDate
          }
        }
      }
    `);
  }

  static createExpenseItem(budgetId, data) {
    const params = [`budgetID: "${budgetId}"`, `name: "${data.name}"`, `total: ${data.total}`];
    if (data.description) {
      params.push(`description: "${data.description}"`);
    }

    return this._postRequest(`
      mutation {
        addExpenseItem(${params.join(',')}) {
          id
          name
          description
          total
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