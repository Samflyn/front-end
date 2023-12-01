// import { createStore } from 'redux';
import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialState = { counter: 0 };

// with redux toolkit
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment(state) {
      state.counter++;
    },
    decrement(state) {
      state.counter--;
    },
    increase(state, action) {
      // in toolkit by default all the data will be in payload
      state.counter = state.counter + action.payload;
    },
  },
});

// const store = configureStore({ reducer: counterSlice.reducer });

// when we have multiple slices in the same component
const store = configureStore({ reducer: { counter: counterSlice.reducer } });

// with only redux
// const counterReducer = (prevState = initialState, action) => {
//   if (action.type === 'increment') {
//     return { counter: prevState.counter + 1 };
//   } else if (action.type === 'decrement') {
//     return { counter: prevState.counter - 1 };
//   } else if (action.type === 'increase') {
//     return { counter: prevState.counter + action.amount };
//   }
//   return prevState;
// };

// const store = createStore(counterReducer);

export const updateData = (data) => {
  // dispatch here is injected by toolkit
  return (dispatch) => {
    // Perform any async code here then call dispatch
    dispatch();
  };
};

export const counterActions = counterSlice.actions;

export default store;
