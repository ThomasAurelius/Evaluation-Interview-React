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

export type { TUser, TLog };
