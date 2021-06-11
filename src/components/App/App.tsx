import React from 'react';
import { SettingsProvider } from '../../domain/settings';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { SettingsPage } from '../pages/SettingsPage';
import { QuotePage } from '../pages/QuotePage';
import { HomePage } from '../pages/HomePage';
import './App.scss';

export function App() {
  return <SettingsProvider>
    <Router>
      <Switch>
        <Route path="/settings">
          <SettingsPage />
        </Route>
        <Route path="/quote">
          <QuotePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  </SettingsProvider>
}