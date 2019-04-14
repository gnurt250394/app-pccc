/** @hoanglv */
import {AppRegistry} from 'react-native';
import MyApp from './App';
import {name as appName} from './app.json';
import { Client } from 'bugsnag-react-native';
const bugsnag = new Client('7917d203eea248fee4d56b31ea0293d3');
AppRegistry.registerComponent(appName, () => MyApp);

