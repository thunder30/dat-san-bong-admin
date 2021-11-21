import React, { createContext } from 'react'

export const BranchContext = createContext()

function BranchProvider({ children }) {
    const value = {}

    return (
        <BranchContext.Provider value={value}>
            {children}
        </BranchContext.Provider>
    )
}

export default BranchProvider
