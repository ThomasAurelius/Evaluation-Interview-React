import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Size, Sort, State } from "src/models";
import { getUsers } from "src/redux/store/user";

const useNavigationHook = () => {
  const dispatch = useDispatch();
  const { pointer, offset, sort, size } = useSelector(
    (state: State) => state.users
  );
  const [recordsOptions] = useState<Size>([10, 15, 20]);
  const [sortOptions] = useState(["Name", "Id"]);

  const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(getUsers.size(+e.target.value as Size[0]));
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(getUsers.sort(e.target.value as Sort[0]));
  };

  const handlePrevious = () => {
    dispatch(getUsers.prev());
  };

  const handleNext = () => {
    dispatch(getUsers.next());
  };

  return {
    sort,
    size,
    offset,
    pointer,
    handleSort,
    handleNext,
    sortOptions,
    recordsOptions,
    handlePrevious,
    handleSizeChange,
  };
};

export { useNavigationHook };
