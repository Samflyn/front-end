const initialState = {
  token: null,
  userId: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_START':
      return {
        ...state,
        error: null,
      };
    case 'AUTH_SUCESS':
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        error: null,
      };
    case 'AUTH_FAIL':
      return {
        ...state,
        error: action.error,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        token: null,
        userId: null,
        error: null,
      };
    default:
      return state;
  }
};

export default reducer;
