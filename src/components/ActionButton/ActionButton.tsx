import React, { MouseEventHandler } from 'react';
import { buildClassName } from '../utils';
import './ActionButton.scss';

interface ActionButtonProps {
  children: any;
  testId?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export function ActionButton({testId, onClick, children, disabled = false}: ActionButtonProps) {
  const wrapperClass = buildClassName([
    'action-button-wrapper',
  ]);
  const buttonClass = buildClassName([
    'action-button',
    disabled ? 'disabled' : undefined,
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