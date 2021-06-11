import React from 'react';

interface ActionPanelProps {
  children: any;
}

export function ActionPanel({children} : ActionPanelProps) {
  return <div>
    {children}
  </div>
}