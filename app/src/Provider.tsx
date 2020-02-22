import React, { createContext, useContext, useRef } from "react"
import { ProviderContext } from './ProviderContext';


export default (props) => {
    console.log(`Stores`);

    const { children, injector, ...stores } = props
    if (!injector)
        console.error("Injector is Missing");
    const parent = useContext(ProviderContext);
    const ref = useRef({...parent, ...stores});
    const value = ref.current;
    return (
        <ProviderContext.Provider value={value}>{children}</ProviderContext.Provider>
    );
}