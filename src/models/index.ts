type TUser = {
  id: string;
  createdTime: string;
  fields: {
    Id: number;
    Name: string;
    avatar: string;
    occupation: string;
  };
};

type TLog = {
  revenue: number;
  time: string;
  type: "impression" | "conversion";
  user_id: number;
};

type Sort = ["Id", "Name"];
type Size = [10, 15, 20];

export type { TUser, TLog, Size, Sort };

export * from "./error";
export * from "./state";
