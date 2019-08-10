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
            budgetID
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

  static async fetchAllUserBudgetPreviews(userId) {
    const res = await this._postRequest(`
      {
        user(id: "${userId}") {
          budgets {
            id
            name
            total
            startDate
            endDate
            description
            allowed
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
          total
          transactionsTotal
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
    const params = [
      `budgetID: "${budgetId}"`,
      `name: "${data.name}"`,
      `total: ${data.total}`
    ];
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
  
  static async updateExpenseItem(expenseItemId, data) {
    const params = [
      `id: "${expenseItemId}"`,
      `name: "${data.name}"`,
      `total: ${data.total}`
    ];

    if (data.description) {
      params.push(`description: "${data.description}"`);
    }

    const res  = await this._postRequest(`
      mutation {
        updateExpenseItem(${params.join(',')}) {
          id
          name
          budgetID
          description
          total
          transactionsTotal
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

    return res.updateExpenseItem;
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

  static async updateBudget(budgetId, data) {
    const params = [
      `id: "${budgetId}"`,
      `name: "${data.name}"`,
      `total: ${data.total}`,
      `startDate: "${data.startDate.toISOString()}"`,
      `endDate: "${data.endDate.toISOString()}"`
    ];

    if (data.description) {
      params.push(`description: "${data.description}"`);
    }

    const res = await this._postRequest(`
      mutation {
        updateBudget(${params.join(',')}) {
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

    return res.updateBudget;
  }

  static async deleteBudget(budgetId) {
    await this._postRequest(`
      mutation {
        deleteBudget(id: "${budgetId}") {
          id
        }
      }
    `);
  }

  static async deleteExpenseItem(expenseItemId) {
    await this._postRequest(`
      mutation {
        deleteExpenseItem(id: "${expenseItemId}") {
          id
        }
      }
    `);
  }

  static async addTransaction(transaction) {
    const params = [
      `expenseItemID: "${transaction.expenseItemID}"`,
      `name: "${transaction.name}"`,
      `total: ${transaction.total}`,
      `creationDate: "${transaction.creationDate}"`
    ];

    if (transaction.description) {
      params.push(`description: "${transaction.description}"`);
    }

    const res = await this._postRequest(`
      mutation {
        addTransaction(${params.join(',')}) {
          id
          name
          total
          creationDate
        }
      }
    `);

    return res.addTransaction;
  }

  static async deleteTransaction(transactionId) {
    await this._postRequest(`
      mutation {
        deleteTransaction(id: "${transactionId}") {
          id
        }
      }
    `);
  }

  static async updateTransaction(transactionId, data) {
    const params = [
      `id: "${transactionId}"`,
      `name: "${data.name}"`,
      `total: ${data.total}`,
      `creationDate: "${data.creationDate}"`
    ];

    if (data.description) {
      params.push(`description: "${data.description}"`);
    }

    const res  = await this._postRequest(`
      mutation {
        updateTransaction(${params.join(',')}) {
          id
          name
          total
          creationDate
        }
      }
    `);

    return res.updateTransaction;
  }

  static async authUser(accessToken) {
    const data = await this._postRequest(`
      mutation {
        authUser(accessToken: "${accessToken}") {
            id
            login
            email
        }
      }
    `);

    return data.authUser;
  }

  static async _postRequest(body) {
    const res = await fetch(process.env.REACT_APP_API_URL, {
      method: 'POST',
      body
    });

    const {data} = await res.json();
    return data;
  }
};