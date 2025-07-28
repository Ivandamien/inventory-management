// import { useRef } from "react";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
//   Provider,
// } from "react-redux";
// import globalReducer from "@/state";
// import { api } from "@/state/api";
// import { setupListeners } from "@reduxjs/toolkit/query";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// /* REDUX PERSISTENCE */
// const createNoopStorage = () => {
//   return {
//     getItem(_key: any) {
//       return Promise.resolve(null);
//     },
//     setItem(_key: any, value: any) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key: any) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window === "undefined"
//     ? createNoopStorage()
//     : createWebStorage("local");

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["global"],
// };
// const rootReducer = combineReducers({
//   global: globalReducer,
//   [api.reducerPath]: api.reducer,
// });
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// /* REDUX STORE */
// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(api.middleware),
//   });
// };

// /* REDUX TYPES */
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// /* PROVIDER */
// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore | null>(null);
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//     setupListeners(storeRef.current.dispatch);
//   }
//   const persistor = persistStore(storeRef.current);

//   return (
//     <Provider store={storeRef.current}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

// import { useRef } from "react";
// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import {
//   TypedUseSelectorHook,
//   useDispatch,
//   useSelector,
//   Provider,
// } from "react-redux";
// import globalReducer from "@/state";
// import { api } from "@/state/api";
// import { setupListeners } from "@reduxjs/toolkit/query";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// /* REDUX PERSISTENCE */
// const createNoopStorage = () => {
//   return {
//     getItem(_key: any) {
//       return Promise.resolve(null);
//     },
//     setItem(_key: any, value: any) {
//       return Promise.resolve(value);
//     },
//     removeItem(_key: any) {
//       return Promise.resolve();
//     },
//   };
// };

// const storage =
//   typeof window === "undefined"
//     ? createNoopStorage()
//     : createWebStorage("local");

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["global"],
// };

// const rootReducer = combineReducers({
//   global: globalReducer,
//   [api.reducerPath]: api.reducer,
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// /* REDUX STORE */
// export const makeStore = () => {
//   return configureStore({
//     reducer: persistedReducer,
//     middleware: (getDefaultMiddleware) =>
//       getDefaultMiddleware({
//         serializableCheck: {
//           ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//         },
//       }).concat(api.middleware),
//   });
// };

// /* REDUX TYPES */
// export type AppStore = ReturnType<typeof makeStore>;
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// /* LOADING COMPONENT */
// const LoadingScreen = () => (
//   <div className="flex items-center justify-center min-h-screen bg-gray-50">
//     <div className="text-gray-600">Loading...</div>
//   </div>
// );

// /* PROVIDER */
// export default function StoreProvider({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const storeRef = useRef<AppStore | null>(null);

//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//     setupListeners(storeRef.current.dispatch);
//   }

//   const persistor = persistStore(storeRef.current);

//   return (
//     <Provider store={storeRef.current}>
//       <PersistGate loading={<LoadingScreen />} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

import { useRef } from "react";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import globalReducer from "@/state";
import { api } from "@/state/api";
import { setupListeners } from "@reduxjs/toolkit/query";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";

// Import the premium loading component
import PremiumLoadingScreen from "./(components)/Loader";

/* REDUX PERSISTENCE */
const createNoopStorage = () => {
  return {
    getItem(_key: any) {
      return Promise.resolve(null);
    },
    setItem(_key: any, value: any) {
      return Promise.resolve(value);
    },
    removeItem(_key: any) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window === "undefined"
    ? createNoopStorage()
    : createWebStorage("local");

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["global"],
};

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

/* REDUX STORE */
export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(api.middleware),
  });
};

/* REDUX TYPES */
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

/* PROVIDER */
export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore();
    setupListeners(storeRef.current.dispatch);
  }

  const persistor = persistStore(storeRef.current);

  return (
    <Provider store={storeRef.current}>
      <PersistGate loading={<PremiumLoadingScreen />} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
