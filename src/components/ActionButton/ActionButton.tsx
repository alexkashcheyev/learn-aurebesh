import React, { MouseEventHandler } from 'react';
import { buildClassName } from '../utils';
import './ActionButton.scss';

interface ActionButtonProps {
  testId?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

export function ActionButton({testId, onClick}: ActionButtonProps) {
  const wrapperClass = buildClassName([
    'action-button-wrapper',
  ]);
  const buttonClass = buildClassName([
    'action-button',
  ]);

  return <div className={wrapperClass}>
    <button
      className={buttonClass}
      data-testid={testId}
      onClick={onClick}>

    </button>
  </div>;
}