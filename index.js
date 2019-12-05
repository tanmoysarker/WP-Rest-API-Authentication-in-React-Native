import React from "react";
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import UserReducer from "./src/store/reducers/users.reducers"

const appReducer = combineReducers({
    usersRed: UserReducer
  });
  
  const logger = (store) => {
    return next => {
      return action => {
        // console.log("Middleware dispatching ");
        // console.log(action);
        const result = next(action);
        // console.log("Middleware next state ");
        // console.log(store.getState());
        return result;
      };
    };
  };
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const appStore = createStore(appReducer, composeEnhancers(applyMiddleware(logger, thunk)));
  const AppContainer =()=> (
      <Provider store={appStore}>
        <App />
      </Provider>
  );

AppRegistry.registerComponent(appName, () => AppContainer);
