import axios from "axios"
import { useQuery } from "react-query";


export const useGetData = (url) => {

    const fetchData = (url) => {
        return axios(url);
    }

    return useQuery(['User Token', url], () => fetchData(url),{
        select: (data) => data?.data,
        staleTime: 30000,
        refetchOnWindowFocus: true,
        refetchInterval: 10000,
    })

}