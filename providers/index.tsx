"use client";
import * as React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "@/store";
import { persistStore } from "redux-persist";

export interface ProvidersProps {
    children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    const [store] = React.useState(() => makeStore({ isServer: false }));
    const [persistor, setPersistor] = React.useState<any>(null);

    React.useEffect(() => {
        const _persistor = persistStore(store);
        setPersistor(_persistor);
    }, [store]);

    if (!persistor) return null;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}
