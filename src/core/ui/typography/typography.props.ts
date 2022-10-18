import React from "react";

type TypographyProps = {
  children?: React.ReactNode;
  variant?: "h1" | "h2" | "h3" | "h4" | "body";
  weight?: "bold" | "bolder" | "normal";
  classes?: string;
};

export type { TypographyProps };
