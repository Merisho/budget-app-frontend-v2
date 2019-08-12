const SET_USER = 'SET_USER';

export default {
  SET_USER,

  setUser(user) {
    return {
      type: SET_USER,
      payload: { user }
    };
  }
};
