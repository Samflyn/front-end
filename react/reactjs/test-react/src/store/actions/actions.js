// ACTION CREATORS

export const addName = (data) => {
  return { type: 'ADD', payload: data };
};

export const deleteName = (id) => {
  return { type: 'DELETE', payload: id };
};

// for ASYNC calls in redux store
// since async code cannot edit the store
// this is caught by redux thunk
export const asyncDeleteName = (id) => {
  // some async code here
  return (dispatch, getState) => {
    setTimeout(() => {
      // never use this, only pass the data needed
      console.log(getState());
      dispatch(deleteName(id));
    }, 2000);
  };
};
