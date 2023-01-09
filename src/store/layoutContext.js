import React, { useContext, useEffect, useState } from "react"
import { UserContext } from "./context"


const LayoutContext = React.createContext({
    emptyValue:''
})


export const LayoutContextWrapper = (props) => {
    const {userToken} = useContext(UserContext)
    const [menuState, setMenuState] = useState(false)
    const [theme, setTheme] = useState({
        navbarColor: 'darkblue',
        mainBackground:'#16213E',
        neumorph: {background: "#16213E",
        boxShadow: "19px 19px 37px #131c35, -19px -19px 37px #192647"},
      })

      const bgColors = {
        Charmander: "#EA5C2B",
        Bulbasaur: "#3C6255",
        Squirtle: "#064663",
        Pikachu: "#E5BA73",
      };
     
    const colors = {
        Charmander: "#AE431E",
        Bulbasaur: "#285430",
        Squirtle: "#263159",
        Pikachu: "#C58940",
      };

      const neumorph = {
        Pikachu: {
          borderRadius: "20px",
          background: "#E5BA73",
          boxShadow: "19px 19px 37px #c39e62, -19px -19px 37px #ffd684",
        },
        Charmander: {
          borderRadius: "20px",
          background: "#EA5C2B",
          boxShadow: "19px 19px 37px #c74e25, -19px -19px 37px #ff6a31",
        },
        Bulbasaur: {
          borderRadius: "20px",
          background: "#3C6255",
          boxShadow: "19px 19px 37px #335348, -19px -19px 37px #457162",
        },
        Squirtle: {
          borderRadius: "20px",
          background: "#064663",
          boxShadow: "19px 19px 37px #053c54, -19px -19px 37px #075172",
        },
      };  
    const menuHandler = () => {
        return setMenuState(!menuState)
    }

useEffect(() => {
    if(userToken){

        setTheme({
            navbarColor: colors[userToken.properties.name.value],
            mainBackground:bgColors[userToken.properties.name.value],
            neumorph: neumorph[userToken.properties.name.value],
        })
    }
      
},[userToken])
    return(
        <LayoutContext.Provider value={{
            menuState:menuState,
            onMenuState:menuHandler,
            theme:theme
        }}>
            {props.children}
        </LayoutContext.Provider>
    )

}
export {LayoutContext}