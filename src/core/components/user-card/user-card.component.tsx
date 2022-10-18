import { useUserCard } from "./user-card.hook";
import { UserCardProps } from "./user-card.props";
import styles from "./user-card.module.scss";
import { Chart, Image, Typography } from "src/core/ui";

const UserCard: React.FC<UserCardProps> = (props) => {
  const { impressions, conversions, revenue } = useUserCard(props);

  const { user } = props;

  return (
    <div className={styles.userCard}>
      <div className={styles["userCard-header"]}>
        <Image src={user.fields.avatar} alt={user.fields.Name[0]} />
        <div>
          <Typography variant="h2">{user.fields.Name}</Typography>
          <Typography>{user.fields.occupation}</Typography>
        </div>
      </div>
      <div className={styles["userCard-content"]}>
        <Chart data={props.logs} />
        <div>
          <span>
            <Typography
              variant="h3"
              weight="bold"
              classes={styles["userCard-content--accent-2"]}
            >
              {new Intl.NumberFormat("en-US").format(impressions.length)}
            </Typography>
            <Typography>Impressions</Typography>
          </span>
          <span>
            <Typography
              variant="h3"
              weight="bold"
              classes={styles["userCard-content--accent-3"]}
            >
              {new Intl.NumberFormat("en-US").format(conversions.length)}
            </Typography>
            <Typography>Conversions</Typography>
          </span>
          <Typography
            variant="h4"
            weight="bolder"
            classes={styles["userCard-content--accent-4"]}
          >
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD",
              maximumSignificantDigits: 1,
            }).format(revenue)}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export { UserCard };
