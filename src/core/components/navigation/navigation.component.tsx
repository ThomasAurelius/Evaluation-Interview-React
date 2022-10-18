import { useNavigationHook } from "./navigation.hook";
import { NavigationProps } from "./navigation.props";
import styles from "./navigation.module.scss";
import { Button } from "src/core/ui";

const Navigation: React.FC<NavigationProps> = () => {
  const {
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
  } = useNavigationHook();

  return (
    <div className={styles.navigation}>
      <div className={styles["navigation-settings"]}>
        <div>
          <p>Size</p>
          <select onChange={handleSizeChange} defaultValue={size}>
            {recordsOptions.map((ro) => (
              <option key={ro} value={ro}>
                {ro}
              </option>
            ))}
          </select>
        </div>
        <div>
          <p>Sort</p>
          <select onChange={handleSort} defaultValue={sort}>
            {sortOptions.map((so) => (
              <option key={so} value={so}>
                {so}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={styles["navigation-pagination"]}>
        <Button disabled={pointer === 1} onClick={handlePrevious}>
          Previus
        </Button>
        <Button disabled={!offset} onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
};

export { Navigation };
