import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import thunk from 'redux-thunk';
import mainReducer from '../reducer/mainReducer';

const persistConfig = {
    key: 'root',
    storage,
}
const rootReducer = combineReducers({
    main: mainReducer,
  });
  
const middleware = [thunk];
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = createStore(persistedReducer, applyMiddleware(...middleware));

export const persistor = persistStore(store);

export default store;