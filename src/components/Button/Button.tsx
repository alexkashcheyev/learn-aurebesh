import React, { MouseEventHandler } from "react";
import { buildClassName } from "../utils";
import './Button.scss';

interface ButtonProps {
  children: any;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function Button({children, onClick}: ButtonProps) {
  const containerClass = buildClassName([
    'button-container'
  ])
  const buttonClass = buildClassName([
    'button',
  ])

  return <div className={containerClass}>
    <button 
      className={buttonClass}
      onClick={onClick}
    >
      {children}
    </button>
  </div>
}