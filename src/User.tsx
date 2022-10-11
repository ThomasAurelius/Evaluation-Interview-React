import { useMemo, useState } from "react";
import { Chart } from "./Chart";
import { TLog, TUser } from "./models";

type UserProps = TUser & {
  logs: TLog[];
};

const User: React.FC<UserProps> = (props) => {
  const [isImgError, setIsImgError] = useState(false);
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

  return (
    <div className="User-card">
      <div className="User-meta">
        <span className="User-avatar-group">
          <img
            src={isImgError ? require("./default.png") : props.fields.avatar}
            alt=""
            className="User-avatar"
            onError={() => {
              setIsImgError(true);
            }}
          />
          <p style={{ display: isImgError ? "block" : "none" }}>
            {props.fields.Name[0]}
          </p>
        </span>
        <span className="User-info">
          <p>{props.fields.Name}</p>
          <p>{props.fields.occupation}</p>
        </span>
      </div>
      <div className="User-stats">
        <Chart data={conversions} />

        <div>
          <span>
            <p className="Text-medium Text-right Text-accent-1">
              {new Intl.NumberFormat("en-US").format(impressions.length)}
            </p>
            <p className="Text-small">Impressions</p>
          </span>
          <span>
            <p className="Text-medium Text-right Text-accent-2">
              {new Intl.NumberFormat("en-US").format(conversions.length)}
            </p>
            <p className="Text-small">Conversions</p>
          </span>
          <p className="Text-large Text-accent-3">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 1,
            }).format(revenue)}
          </p>
        </div>
      </div>
    </div>
  );
};

export { User };
