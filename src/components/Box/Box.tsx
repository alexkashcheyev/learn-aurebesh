import React from "react";
import { buildClassName } from "../utils";
import "./Box.scss";

export interface BoxProps {
  direction?: "horizontal" | "vertical";
  children: any;
  className?: string;
}

export function Box({
  children,
  direction = "horizontal",
  className,
}: BoxProps) {
  const resClass = buildClassName(["box", direction, className]);

  return <div className={resClass}>{children}</div>;
}
