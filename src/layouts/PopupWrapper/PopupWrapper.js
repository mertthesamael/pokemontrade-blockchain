import { Flex } from "@chakra-ui/react"
import { useContext } from "react";
import { LayoutContext } from "../../store/layoutContext";
import styles from "./popup.module.scss"




const PopupWrapper = () => {

    const {menuState} = useContext(LayoutContext);

    return(
        <Flex className={styles.popupWrapper} pos='absolute' pointerEvents='none' w='100%' h='100%' backdropFilter={menuState&&'blur(9px)'} bgColor={menuState? 'blackAlpha.400' :"" }>

        </Flex>
    )

}


export default PopupWrapper;