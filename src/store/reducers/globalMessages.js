import { globalMessages as globalMessagesActions } from '../actions';

const init = {
  errorMessage: '',
  showError: false,
  successMessage: '',
  showSuccess: false
};

export default (state = init, action) => {
  switch (action.type) {
    case globalMessagesActions.SHOW_ERROR:
      return {
        ...state,
        showError: true,
        errorMessage: action.payload.message
      };

    case globalMessagesActions.HIDE_ERROR:
      return {
        ...state,
        showError: false
      };

    case globalMessagesActions.SHOW_SUCCESS:
      return {
        ...state,
        showSuccess: true,
        successMessage: action.payload.message
      };

    case globalMessagesActions.HIDE_SUCCESS:
      return {
        ...state,
        showSuccess: false
      };
    default:
      return state;
  }
};
