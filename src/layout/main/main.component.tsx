import { useMainHook } from "./main.hook";
import { MainProps } from "./main.props";
import styles from "./main.module.scss";
import { Navigation, UserCard } from "src/core/components";
import logs from "src/assets/logs.json";
import { TLog } from "src/models";

const Main: React.FC<MainProps> = () => {
  const { users } = useMainHook();

  return (
    <div className={styles.main}>
      <Navigation />

      <div className={styles["main-grid"]}>
        {users.view.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            logs={(logs as TLog[]).filter(
              (log) => log.user_id === user.fields.Id
            )}
          />
        ))}
      </div>
    </div>
  );
};

export { Main };
