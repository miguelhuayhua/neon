import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from 'redux-persist/lib/storage'; // <- esto es correcto para web/localStorage

import userReducer from "./reducers/user";

// COMBINA LOS REDUCERS
const rootReducer = combineReducers({
  user: userReducer,
});

export type RootReducerType = typeof rootReducer;

// EXPORTA REDUCER
export { rootReducer };

// Crea la store
export const makeStore = ({ isServer }: { isServer: boolean }) => {
  if (isServer) {
    return configureStore({
      reducer: rootReducer,

    });
  }

  const persistedReducer = persistReducer({ key: "user", whitelist: ["user"], storage }, rootReducer);

  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          // 👇 ignora acciones internas de redux-persist
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

// EXPORTA RootState con un truco:
const testStore = makeStore({ isServer: false }); // simulamos que estamos en cliente
export type RootState = ReturnType<typeof testStore.getState>;
export type AppDispatch = typeof testStore.dispatch;
