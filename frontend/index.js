import { AppRegistry, StatusBar } from 'react-native';
import App from './src/setup';

StatusBar.setBarStyle('default');
AppRegistry.registerComponent('RunTracker', () => App);
