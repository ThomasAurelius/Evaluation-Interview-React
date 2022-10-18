import { make } from "redux-chill";
import { Size, Sort, TUser } from "src/models";

const getUsers = make("[general] useres get")
  .stage((searchParams: Record<string, string | number>) => searchParams)
  .stage("success", (payload: { records: TUser[]; offset: string }) => payload)
  .stage("error", (payload: string) => payload)
  .stage("next")
  .stage("prev")
  .stage("sort", (payload: Sort[0]) => payload)
  .stage("size", (payload: Size[0]) => payload)
  .stage("view", (payload: TUser[]) => payload);

export { getUsers };
