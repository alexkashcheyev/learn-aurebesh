import React from 'react';
import { buildClassName } from '../utils';
import './Page.scss';

export interface PageProps {
  children: any;
  footer?: any;
}

export function Page({children, footer}: PageProps) {
  const wrapperClass = buildClassName([
    'page-wrapper'
  ]);
  const pageClass = buildClassName([
    'page',
    footer ? 'with-footer' : undefined,
  ]);
  const footerClass = buildClassName([
    'page-footer'
  ])


  return <div className={wrapperClass}>
    <div className={pageClass}>
      {children}
    </div>
    {footer && <footer className={footerClass}>{footer}</footer>}
  </div>
}