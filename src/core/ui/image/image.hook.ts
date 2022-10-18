import { useState } from "react";

const useImageHook = () => {
  const [error, setError] = useState(false);

  const handleError = () => {
    setError(true);
  };
  return { error, handleError };
};

export { useImageHook };
