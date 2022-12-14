import { createContext } from "react";

export const SearchContext = createContext({
    searchQuery: null,
    setSearchQuery: () => { },
});
