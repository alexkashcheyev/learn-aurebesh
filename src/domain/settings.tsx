import React, { useContext, useState } from 'react';
import * as settingsModule from './settings';

export interface AppSettings {
  aurebeshBold: boolean;
  aurebeshItalic: boolean;
  latinBold: boolean;
  latinItalic: boolean;
  replacedLetters: string[];
  speed: number;
  lettersToAdd: number;
  update: (newSettings: Partial<AppSettings>) => void;
}

export const DEFAULT_SPEED = 3;

export const LETTERS_PER_QUOTE = [ // new letters per quote
  0.05,   // 0
  0.1,    // 1
  0.25,   // 2
  0.5,    // 3
  0.75,   // 4
  1,      // 5
  1.5,    // 6
  2,      // 7
]

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
    replacedLetters: [],
    speed: DEFAULT_SPEED,
    lettersToAdd: 0,
  }

export function SettingsProvider({children}: any) {
  const [ settings, setSettings ] = useState<AppSettings>({
    ...defaultSettings,
  } as any);

  const update = (newSettings: Partial<AppSettings>) => {
    setSettings({
      ...settings,
      ...newSettings
    });
  }
 
  return <SettingsContext.Provider value={{...settings, update}}>{children}</SettingsContext.Provider>
}

export function useSettings(): AppSettings {
  return useContext(SettingsContext);
}

export function getLettersToAdd(speed: number) {
  return LETTERS_PER_QUOTE[speed];
}

export function mockUseSettings(overrideSettings: Partial<AppSettings>) {
  const settings = {
    ...defaultSettings,
    update: jest.fn(),
    ...overrideSettings
  };

  jest.spyOn(settingsModule, 'useSettings').mockReturnValue(settings);

  return settings;
}