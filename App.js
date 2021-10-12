import React from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {createStore} from 'redux';
import rootReducer from './src/reducers';
import Navigator from './src/framework/Navigator';
import {Provider} from 'react-redux';
import Realm from 'realm';
import Schema from './src/models/Schema';
import BeanRegistry from './src/framework/bean/BeanRegistry';
import AuthService from './src/service/AuthService';
import Spinner from './src/components/Spinner';

let beans, db;
const theme = {
  ...DefaultTheme,
  dark: false,
  colors: {
    ...DefaultTheme.colors,
  },
};
const store = createStore(rootReducer);

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {userExists: false, loadApp: false};
    if (db === undefined) {
      db = new Realm(Schema);
      beans = BeanRegistry.init(db, this);
    }
    beans
      .get(AuthService)
      .userExists()
      .then(exists => this.setState({userExists: exists, loadApp: true}));
  }

  render() {
    return this.state.loadApp ? (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Navigator userExists={this.state.userExists} />
        </PaperProvider>
      </Provider>
    ) : (
      <Spinner show={!this.state.loadApp} />
    );
  }
}

export default App;
//export default from './storybook';
