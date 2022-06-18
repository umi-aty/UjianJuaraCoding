import { combineReducers } from "redux";

const userState = {
  dataUser: {},
  isLogin: false,
};

function UserReducer(state = userState, action) {
  if (action.type === "SET_USER") {
    return {
      ...state,
      [action.inputType]: action.inputValue,
    };
  }
  return state;
}

const reducer = combineReducers({
  UserReducer,
});

export default reducer;
