export default class BudgetService {
  static async fetchBudget(id) {
    const res = await this._postRequest(`
      {
        budget(id: "${id}") {
          id
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

    return res.budget;
  }

  static async fetchAllUserBudgets(userId) {
    const res = await this._postRequest(`
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

    return res.user.budgets;
  }

  static async fetchExpenseItem(expenseItemId) {
    const res = await this._postRequest(`
      {
        expenseItem(id: "${expenseItemId}") {
          id
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

    return res.expenseItem;
  }

  static async createExpenseItem(budgetId, data) {
    const params = [`budgetID: "${budgetId}"`, `name: "${data.name}"`, `total: ${data.total}`];
    if (data.description) {
      params.push(`description: "${data.description}"`);
    }

    const res = await this._postRequest(`
      mutation {
        addExpenseItem(${params.join(',')}) {
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
    `);

    return res.addExpenseItem;
  }

  static async createBudget(data) {
    const params = [
      `userID: "${data.userId}"`,
      `name: "${data.name}"`,
      `total: ${data.total}`
    ];

    if (data.startDate) {
      params.push(`startDate: "${data.startDate.toISOString()}"`);
    }

    if (data.endDate) {
      params.push(`endDate: "${data.endDate.toISOString()}"`);
    }

    if (data.description) {
      params.push(`description: "${data.description}"`);
    }

    const res = await this._postRequest(`
      mutation {
        addBudget(${params.join(',')}) {
          id
          name
          startDate
          endDate
          description
          total
          allowed
        }
      }
    `);

    return res.addBudget;
  }

  static async  _postRequest(body) {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body
    });

    const {data} = await res.json();
    return data;
  }
};