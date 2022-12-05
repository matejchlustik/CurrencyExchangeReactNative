import { createContext } from "react";

export const ActiveCurrencyContext = createContext({
    activeCurrency: null,
    setActiveCurrency: () => { },
    activeCurrencyExchange: null,
    setActiveCurrencyExchange: () => { },
});

