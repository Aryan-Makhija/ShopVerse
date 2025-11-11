
"use client"

import { createContext, useState } from "react"

export const Context = createContext()


const ContextApi = ({ children }) => {

    const [code, setcode] = useState("")
    return (
        <Context.Provider value={{ code, setcode }}>
            {children}
        </Context.Provider>
    )
}

export default ContextApi