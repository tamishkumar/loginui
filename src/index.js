import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import authReducer from './store/reducers/auth';
import { CookiesProvider } from 'react-cookie';
import ReduxToastr from 'react-redux-toastr';
import { reducer as toastrReducer } from 'react-redux-toastr';
import { persistStore, persistReducer } from 'redux-persist'

import { PersistGate } from 'redux-persist/integration/react'


import storage from 'redux-persist/lib/storage'


const rootReducer = combineReducers({
    toastr: toastrReducer,
    ctr: counterReducer,
    res: resultReducer,
    auth: authReducer
});

const persistConfig = {
    key: 'root',
    storage,
  }
  
const persistedReducer = persistReducer(persistConfig, rootReducer)


const logger = store => {
    return next => {
        return action => {
            console.log('[Middleware] Dispatching', action);
            const result = next(action);
            console.log('[Middleware] next state', store.getState());
            return result;
        }
    }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(persistedReducer, composeEnhancers(applyMiddleware(logger, thunk)));

let persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter>
                <CookiesProvider>
                    <App />
                    <ReduxToastr
                        timeOut={2500}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                    />
                </CookiesProvider>
            </BrowserRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
