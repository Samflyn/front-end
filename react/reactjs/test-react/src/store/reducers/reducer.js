const initialState = {
  nameList: ['one', 'two', 'three'],
};

// while using multiple reducers, each reducer has its own state
// these state will be merged and used in container but nested
// the state cannot be accessed from inside the reducer
// if one reducer need to add data from state send it as payload
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD':
      return {
        ...state,
        nameList: [...state.nameList, action.payload],
      };
    case 'DELETE':
      // const updatedNameList = [...state.nameList];
      // updatedNameList.splice(action.payload, 1);
      return {
        ...state,
        nameList: state.nameList.filter(
          (item, index) => index !== action.payload
        ),
      };

    default:
      return state;
  }

  // return state;
};

export default reducer;
