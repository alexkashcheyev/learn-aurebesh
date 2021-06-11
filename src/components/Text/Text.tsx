import React from 'react';
import { buildClassName } from '../utils';
import './Text.scss';

interface TextProps {
  children: any;
}

export function Text({children}: TextProps) {
  const className = buildClassName(['text'])

  return <p className={className}>
    {children}
  </p>
}