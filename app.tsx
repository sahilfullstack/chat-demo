import 'core-js';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReduxToastr from 'react-redux-toastr';
import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import 'semantic-ui-css/semantic.min.css';
import ReducerStore from './reducer_store';
import LoginComponent from './login_comp'
// Sub Layouts

// Launch Darkly need socket to flip their features.
// To make socket run for IE and Edge we need to require this package
require('event-source-polyfill');
const { store, persistor } = ReducerStore();
ReactDOM.render(
    <LoginComponent />
,
document.getElementById('root') as HTMLElement
);
