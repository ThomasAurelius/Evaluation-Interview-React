import { TypographyProps } from "./typography.props";
import { clsx } from "clsx";
import style from "./typography.module.scss";

const Typography: React.FC<TypographyProps> = ({
  children,
  variant = "body",
  weight = "normal",
  classes,
}) => {
  const styles = clsx(classes, {
    [style["typography-body"]]: variant === "body",
    [style["typography-h1"]]: variant === "h1",
    [style["typography-h2"]]: variant === "h2",
    [style["typography-h3"]]: variant === "h3",
    [style["typography-h4"]]: variant === "h4",
    [style["typography-bold"]]: weight === "bold",
    [style["typography-bolder"]]: weight === "bolder",
  });
  return <p className={styles}>{children}</p>;
};

export { Typography };
