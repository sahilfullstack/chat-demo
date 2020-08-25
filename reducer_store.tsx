import { reducer as toastr_reducer } from 'react-redux-toastr';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { reducer as form_reducer } from 'redux-form';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to local Storage for web and AsyncStorage for react-native
import thunk from 'redux-thunk';

// Combine all reducer to one place i.e - store
const all_reducers = combineReducers({
});


const persist_config = {
    key: 'root' + sessionStorage["sessionId"],
    storage,
    // only include reducer which needs to be stored in local storage/persisted
    whitelist: ['user_login_details','persisted_details']
}

// To persist data(usr details, token , etc) in the local storage. Persisting data prevents data loss on refresh
const persistedReducer = persistReducer(persist_config, all_reducers);

// Thunk is a middleware for return a promise
const create_store_with_middleware = applyMiddleware(thunk)(createStore);


export default () => {
    const store = create_store_with_middleware(persistedReducer);
    const persistor = persistStore(store);
    return { store, persistor }
}

