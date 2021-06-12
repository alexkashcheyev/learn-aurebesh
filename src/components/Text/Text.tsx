import React from "react";
import { buildClassName } from "../utils";
import "./Text.scss";

interface TextProps {
  children: any;
  testId?: string;
}

export function Text({ children, testId }: TextProps) {
  const className = buildClassName(["text"]);

  return (
    <p className={className} data-testid={testId}>
      {children}
    </p>
  );
}
