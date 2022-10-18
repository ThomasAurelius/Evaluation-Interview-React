import { combineReducers } from "redux";
import { users } from "../store/user";

const rootReducer = combineReducers({
  users,
});

export { rootReducer };
