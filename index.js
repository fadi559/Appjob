/**
 * @format
 */
import 'react-native-reanimated';
import 'react-native-gesture-handler'; 
  import 'react-native-biometrics';


import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
