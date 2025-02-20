import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage kullanacak
import { combineReducers } from "redux";
import cvReducer from "./cvSlice";
import  userReducer  from "./userSlice";
// Redux Persist için ayarlar
const persistConfig = {
  key: "root",
  storage, // localStorage kullan
};

// Reducer'ları birleştir
const rootReducer = combineReducers({
  cv: persistReducer(persistConfig, cvReducer),
  user:persistReducer(persistConfig,userReducer)
});

// Store oluştur
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Redux Persist için gereklidir
    }),
});

// Persistor oluştur
export const persistor = persistStore(store);
export default store;
