import { reducer } from "redux-chill";
import { getUsers } from "./actions";
import { userState } from "./state";

const users = reducer(userState)
  .on(getUsers, (state, payload) => {
    state.isLoading = true;
  })
  .on(getUsers.success, (state, payload) => {
    state.isLoading = false;
    state.records = [...state.records, ...payload.records];
    state.offset = payload.offset;
    state.view = payload.records;
  })
  .on(getUsers.error, (state, payload) => {
    state.error = payload;
    state.isLoading = false;
  })
  .on(getUsers.view, (state, payload) => {
    state.view = payload;
  })
  .on(getUsers.next, (state) => {
    state.pointer += 1;
  })
  .on(getUsers.prev, (state) => {
    state.pointer -= 1;
  })
  .on(getUsers.sort, (state, payload) => {
    state.pointer = 1;
    state.records = [];
    state.offset = "";
    state.view = [];
    state.sort = payload;
  })
  .on(getUsers.size, (state, payload) => {
    state.pointer = 1;
    state.records = [];
    state.offset = "";
    state.view = [];
    state.size = payload;
  });

export { users };
