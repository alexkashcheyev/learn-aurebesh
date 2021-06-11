import React, { useContext, useState } from 'react';
import { DEFAULT_TEXT } from './consts';

export interface AppSettings {
  aurebeshBold: boolean;
  aurebeshItalic: boolean;
  latinBold: boolean;
  latinItalic: boolean;
  text: string[];
  update: (newSettings: Partial<AppSettings>) => Promise<void>;
}

export interface FontSettings {
  bold: boolean;
  italic: boolean;
}

const SettingsContext = React.createContext<AppSettings>(undefined as any);

export function SettingsProvider({children}: any) {
  const [ settings, setSettings ] = useState<AppSettings>({
    aurebeshBold: false,
    aurebeshItalic: false,
    latinBold: false,
    latinItalic: false,
    text: DEFAULT_TEXT,
    update: (newSettings) => {
      setSettings({
        ...settings,
        ...newSettings
      })
      return Promise.resolve();
    }
  });

  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>
}

export function useSettings(): AppSettings {
  return useContext(SettingsContext);
}