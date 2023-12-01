import * as NgRxActions from './ng-rx.actions';

export interface State {
  numberList: string[];
}

const initialState: State = {
  numberList: ['one', 'two', 'three'],
};

// state changes must be immutable
// !!! any action dispatched will reach all reducers so a default state must be returned
// async code should not be used in reducer
export function numberListReducer(
  state = initialState,
  action: NgRxActions.AllActionTypes
): State {
  switch (action.type) {
    case NgRxActions.ADD_NUMBER:
      return {
        ...state,
        numberList: [...state.numberList, action.payload],
      };
    case NgRxActions.UPDATE_NUMBER:
      const updatedList = [...state.numberList];
      updatedList[action.payload.index] = action.payload.num;
      return {
        ...state,
        numberList: updatedList,
      };
    case NgRxActions.DELETE_NUMBER:
      return {
        ...state,
        numberList: state.numberList.filter((num, index) => {
          return index !== action.payload;
        }),
      };
    default:
      // when ngrx loads and initializes the reducer by Store module
      // an initialization action is run the first time
      return state;
  }
}
