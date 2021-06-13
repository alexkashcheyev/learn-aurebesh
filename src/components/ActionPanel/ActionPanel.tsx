import React from "react";
import { buildClassName } from "../utils";
import "./ActionPanel.scss";

interface ActionPanelProps {
  children: any;
  progress?: number;
}

export function ActionPanel({ children, progress }: ActionPanelProps) {
  const panelClass = buildClassName(["action-panel"]);
  const progressbarClass = buildClassName([
    "action-panel-progressbar"
  ])

  return <div className={panelClass}>
    {children}
    {progress !== undefined && <div className={progressbarClass} style={{width: `${progress * 100}%`}}></div>}
  </div>;
}
