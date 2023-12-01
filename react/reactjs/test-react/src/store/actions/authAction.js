import Axios from 'axios';

export const authStart = () => {
  return {
    type: 'AUTH_START',
  };
};

export const authSucess = (token, userId) => {
  return {
    type: 'AUTH_SUCESS',
    token: token,
    userId: userId,
  };
};

export const authFail = (error) => {
  return {
    type: 'AUTH_FAIL',
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  return {
    type: 'AUTH_LOGOUT',
  };
};

export const checkTokenExp = (expTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expTime);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBdDEtLdSv6gSaITAPlFTZzaswd9U2CuMg';
    if (!isSignUp) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBdDEtLdSv6gSaITAPlFTZzaswd9U2CuMg';
    }
    // Axios always wraps the response in an response object
    Axios.post(url, authData)
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem(
          'expirationDate',
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        dispatch(authSucess(response.data.idToken, response.data.localId));
        dispatch(checkTokenExp(response.data.expiresIn));
      })
      .catch((error) => {
        dispatch(authFail(error.response.data.error));
      });
  };
};
