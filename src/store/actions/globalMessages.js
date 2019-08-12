const SHOW_ERROR = 'SHOW_ERROR';
const HIDE_ERROR = 'HIDE_ERROR';
const SHOW_SUCCESS = 'SHOW_SUCCESS';
const HIDE_SUCCESS = 'HIDE_SUCCESS';

export default {
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_SUCCESS,
  HIDE_SUCCESS,

  showError(message) {
    return {
      type: SHOW_ERROR,
      payload: { message }
    };
  },

  showSuccess(message) {
    return {
      type: SHOW_SUCCESS,
      payload: { message }
    };
  },

  hideError() {
    return { type: HIDE_ERROR };
  },

  hideSuccess() {
    return { type: HIDE_SUCCESS };
  }
};
