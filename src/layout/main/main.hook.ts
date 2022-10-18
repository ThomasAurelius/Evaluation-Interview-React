import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "src/models";
import { getUsers } from "src/redux/store/user";

const useMainHook = () => {
  const dispatch = useDispatch();
  const users = useSelector((state: State) => state.users);

  useEffect(() => {
    dispatch(getUsers({ pageSize: 10 }));
  }, []);

  return { users };
};

export { useMainHook };
