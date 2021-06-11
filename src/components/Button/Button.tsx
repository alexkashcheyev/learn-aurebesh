import React from "react";
import { buildClassName } from "../utils";
import './Button.scss';

interface ButtonProps {
  children: any;
}

export function Button({children}: ButtonProps) {
  const containerClass = buildClassName([
    'button-container'
  ])
  const buttonClass = buildClassName([
    'button',
  ])

  return <div className={containerClass}>
    <div className={buttonClass}>
      {children}
    </div>
  </div>
}