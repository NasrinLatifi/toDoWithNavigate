/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import StartPage from './src/pages/StartPage';
import App1 from './src/root/App1';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App1);
