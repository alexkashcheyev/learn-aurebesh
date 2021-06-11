import React from 'react';
import { SettingsProvider } from '../../domain/settings';
import { MainContent } from '../MainContent/MainContent';
import { SideBar } from '../SideBar/SideBar';
import s from './App.scss';

export function App() {
  return <SettingsProvider>
    <div className={s.wrapper}>
      <MainContent />
      <SideBar />
    </div>
  </SettingsProvider>
}