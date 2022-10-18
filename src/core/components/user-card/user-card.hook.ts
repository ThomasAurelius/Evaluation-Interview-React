import { useMemo } from "react";
import { UserCardProps } from "./user-card.props";

const useUserCard = (props: UserCardProps) => {
  const impressions = useMemo(
    () => props.logs.filter((v) => v.type === "impression"),
    [props.logs]
  );

  const conversions = useMemo(
    () => props.logs.filter((v) => v.type === "conversion"),
    [props.logs]
  );

  const revenue = useMemo(
    () => props.logs.reduce((a, v) => v.revenue + a, 0),
    [props.logs]
  );

  return { impressions, conversions, revenue };
};

export { useUserCard };
