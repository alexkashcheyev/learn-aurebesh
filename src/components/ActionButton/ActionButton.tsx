import React, { MouseEventHandler } from 'react';
import { buildClassName } from '../utils';
import './ActionButton.scss';

type ActionButtonPriority = 'default' | 'primary';
 

interface ActionButtonProps {
  children: any;
  testId?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  priority?: ActionButtonPriority;
}

export function ActionButton({
    testId,
    onClick,
    children,
    disabled = false,
    priority = 'default'
}: ActionButtonProps) {
  const wrapperClass = buildClassName([
    'action-button-wrapper',
  ]);
  const buttonClass = buildClassName([
    'action-button',
    disabled ? 'disabled' : undefined,
    priority
  ]);

  return <div className={wrapperClass}>
    <button
      className={buttonClass}
      data-testid={testId}
      onClick={(event) => {
        !disabled && onClick && onClick(event);
      }}
      disabled={disabled}
      type="button"
    >
        {children}
    </button>
  </div>;
}