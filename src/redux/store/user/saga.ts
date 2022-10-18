import { ResponsePromise, HTTPError } from "ky";
import { Payload, Saga } from "redux-chill";
import { call, put, select } from "redux-saga/effects";
import { http } from "src/core/services";
import { ErrorResponse, State, TUser } from "src/models";
import { getUsers } from "./actions";

class UserSaga {
  /**
   * Get users and set them to the redux or error
   */
  @Saga(getUsers)
  public *getUsers(
    payload: Payload<typeof getUsers>,
    { api }: { api: typeof http }
  ) {
    const users: State["users"] = yield select((state) => state.users);

    try {
      const result: ResponsePromise = yield api.get("Users", {
        searchParams: {
          offset: users.offset,
          pageSize: users.size,
          "sort[0][field]": users.sort,
        },
      });

      const data: { records: TUser[]; offset: string } = yield result.json();

      yield put(getUsers.success(data));
    } catch (error) {
      if (error instanceof HTTPError) {
        const response: ErrorResponse = yield error.response.json();

        yield put(getUsers.error(response.error.message));
      } else {
        yield put(getUsers.error("Unknown error"));
        console.error(error);
      }
    }
  }

  /**
   * Get next page of users
   */
  @Saga(getUsers.next)
  public *getUsersNext() {
    const users: State["users"] = yield select((state) => state.users);
    if (
      users.records[users.records.length - 1].id ===
      users.view[users.view.length - 1].id
    ) {
      yield put(getUsers({}));
    } else {
      const nextArr = users.records.slice(
        (users.pointer - 1) * users.size,
        users.pointer * users.size
      );
      yield put(getUsers.view(nextArr));
    }
  }

  /**
   * Get prev page of users
   */
  @Saga(getUsers.prev)
  public *getUsersPrev() {
    const users: State["users"] = yield select((state) => state.users);

    const prevArr = users.records.slice(
      (users.pointer - 1) * users.size,
      users.pointer * users.size
    );
    yield put(getUsers.view(prevArr));
  }

  /**
   * Sort users
   */
  @Saga(getUsers.sort)
  public *getUsersSort() {
    yield put(getUsers({}));
  }

  /**
   * Size change
   */
  @Saga(getUsers.size)
  public *getUsersSize() {
    yield put(getUsers({}));
  }
}

export { UserSaga };
