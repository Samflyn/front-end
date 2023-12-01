import { UserModel } from '../user.model';

export interface State {
  user: UserModel;
}

const initialState: State = {
  user: null,
};

export function authReducer(state = initialState, action): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
