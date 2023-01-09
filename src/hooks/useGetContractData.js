import { useContext } from "react"
import { useContractRead } from "wagmi"
import { UserContext } from "../store/context"
import abi from "../contracts/PokemonCards.sol/PokemonCards.json"

export const useGetContractData = (functionName,args,ca) => {

   
try{

  const  data = useContractRead({
    address: ca,
        abi: abi.abi,
        functionName:functionName,
        args:[args],
        onSuccess(data) {
          console.log('Success', data)
        },
        watch: true
      })

      
      return data
    }catch(err){
      return [0]
    }

}