import React, { useContext, useState } from 'react';
import * as settingsModule from './settings';

export interface AppSettings {
  aurebeshBold: boolean;
  aurebeshItalic: boolean;
  latinBold: boolean;
  latinItalic: boolean;
  update: (newSettings: Partial<AppSettings>) => Promise<void>;
}

export interface FontSettings {
  bold: boolean;
  italic: boolean;
}

const SettingsContext = React.createContext<AppSettings>(undefined as any);

const defaultSettings = {
    aurebeshBold: false,
    aurebeshItalic: false,
    latinBold: false,
    latinItalic: false,
  }

export function SettingsProvider({children}: any) {
  const [ settings, setSettings ] = useState<AppSettings>({
    ...defaultSettings,
    update: (newSettings: Partial<AppSettings>) => {
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

export function mockUseSettings(overrideSettings: Partial<AppSettings>) {
  const settings = {
    ...defaultSettings,
    update: jest.fn(),
    overrideSettings
  };

  jest.spyOn(settingsModule, 'useSettings').mockReturnValue(settings);
}