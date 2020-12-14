import { createContext, useState } from 'react';

export const StateContext = createContext({});

const Provider = ({ children }) => {
    const [page, setPage] = useState(1);

    return (
        <StateContext.Provider value={{page, setPage}}>
            {children}
        </StateContext.Provider>
    );
}

export default Provider;