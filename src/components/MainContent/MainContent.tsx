import React from 'react';
import { useEffect } from 'react';
import { useSettings } from '../../domain/settings';

export function MainContent() {
  const settings = useSettings();
  useEffect(() => {
    setTimeout(() => settings.update({aurebeshBold: true}), 1000)
  }, [])
  return <div>Main content</div>
}