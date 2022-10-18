import { useImageHook } from "./image.hook";
import { ImageProps } from "./image.props";
import styles from "./image.module.scss";

const Image: React.FC<ImageProps> = (props) => {
  const { error, handleError } = useImageHook();

  return (
    <div className={styles.image}>
      {error || !props.src ? (
        <span className={styles["image-fallback"]}>{props.alt}</span>
      ) : (
        <img src={props.src} alt={props.alt} onError={handleError} />
      )}
    </div>
  );
};

export { Image };
