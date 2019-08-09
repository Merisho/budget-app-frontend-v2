import * as actions from '../actions';

const init = {
  errorMessage: '',
  showError: false,
  successMessage: '',
  showSuccess: false
};

export default (state = init, action) => {
  switch (action.type) {
    case actions.SHOW_ERROR:
      return {
        ...state,
        showError: true,
        errorMessage: action.payload.message
      };

    case actions.HIDE_ERROR:
      return {
        ...state,
        showError: false
      };

    case actions.SHOW_SUCCESS:
      return {
        ...state,
        showSuccess: true,
        successMessage: action.payload.message
      };

    case actions.HIDE_SUCCESS:
      return {
        ...state,
        showSuccess: false
      };
    default:
      return state;
  }
};
