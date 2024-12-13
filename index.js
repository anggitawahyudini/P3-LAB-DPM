import 'react-native-gesture-handler'; // Penting untuk react-navigation
import React from 'react';
import { AppRegistry, Platform } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { render } from 'react-dom'; // Tambahkan ini untuk web

// Untuk Platform Web
if (Platform.OS === 'web') {
  render(<App />, document.getElementById('root')); // Rendering aplikasi pada platform web
} else {
  // Untuk Platform Native
  AppRegistry.registerComponent(appName, () => App); // Register aplikasi untuk platform Android/iOS
}
