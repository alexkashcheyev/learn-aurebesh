import React from 'react';
import { buildClassName } from '../utils';
import './Page.scss';

export interface PageProps {
  children: any;
  footer?: any;
  header?: any;
}

export function Page({children, footer, header}: PageProps) {
  const wrapperClass = buildClassName([
    'page-wrapper'
  ]);
  const pageClass = buildClassName([
    'page',
    footer ? 'with-footer' : undefined,
  ]);
  const headerClass = buildClassName([
    'page-header',
  ])
  const footerClass = buildClassName([
    'page-footer'
  ])


  return <div className={wrapperClass}>
    {header && <header className={headerClass}>{header}</header>}
    <div className={pageClass}>
      {children}
    </div>
    {footer && <footer className={footerClass}>{footer}</footer>}
  </div>
}