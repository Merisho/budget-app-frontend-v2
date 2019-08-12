import { combineReducers } from 'redux';

import reducers from './reducers';

export default combineReducers({
  budget: reducers.budget,
  expenseItem: reducers.expenseItem,
  globalMessages: reducers.globalMessages,
  user: reducers.user
});
