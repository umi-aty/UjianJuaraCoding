import { combineReducers } from "redux";

const userState = {
  dataUser:{},
  isLogin: false,
};

const laporanState = {
  dataLaporan:{},
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

function LaporanReducer(state = laporanState, action) {
  if (action.type === "SET_LAPORAN") {
    return {
      ...state,
      [action.inputType]: action.inputValue,
    };
  }
  return state;
}

const reducer = combineReducers({
  LaporanReducer,
  UserReducer,
});

export default reducer;
