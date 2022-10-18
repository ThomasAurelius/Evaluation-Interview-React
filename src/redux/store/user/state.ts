import { Size, Sort, TUser } from "src/models";

const userState = {
  isLoading: false,
  records: [] as TUser[],
  error: "",
  offset: "",
  size: 10 as Size[0],
  pointer: 1,
  sort: "Id" as Sort[0],
  view: [] as TUser[],
};

export { userState };
