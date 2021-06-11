import React from 'react';
import { buildClassName } from '../utils';

export interface PageProps {
  children: any;
}

export function Page({children}: PageProps) {
  const className = buildClassName([
    'page',
  ])

  return <div className={className}>{children}</div>
}