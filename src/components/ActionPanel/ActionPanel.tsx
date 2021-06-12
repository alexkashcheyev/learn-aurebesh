import React from "react";
import { buildClassName } from "../utils";
import "./ActionPanel.scss";

interface ActionPanelProps {
  children: any;
}

export function ActionPanel({ children }: ActionPanelProps) {
  const className = buildClassName(["action-panel"]);

  return <div className={className}>{children}</div>;
}
