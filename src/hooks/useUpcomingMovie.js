import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const upcomingMovie =()=>{
    return api.get(`/movie/upcoming`)
}
export const useUpcomingMovieQuery=()=>{
    return useQuery ({
        queryKey:['upcomingMovie'],
        queryFn:upcomingMovie,
        select:(result)=>result.data,
    })
}