import { createContext } from "react"

// Context creator which will pass two parameters to routes to avoid prop drilling
export const AppContext = createContext({
    isLoading: true,
    vouchersData: {}
})