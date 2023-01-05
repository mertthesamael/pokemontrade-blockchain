import React, { useState } from "react"

const LayoutContext = React.createContext({
    emptyValue:''
})


export const LayoutContextWrapper = (props) => {

    const [menuState, setMenuState] = useState(false)

    const menuHandler = () => {
        return setMenuState(!menuState)
    }


    return(
        <LayoutContext.Provider value={{
            menuState:menuState,
            onMenuState:menuHandler,
        }}>
            {props.children}
        </LayoutContext.Provider>
    )

}
export {LayoutContext}