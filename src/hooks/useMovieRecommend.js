import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchMovieRecommendations =({id})=>{
   return api.get(`/movie/${id}/recommendations`)
}
export const useMovieRecommendQuery =({id})=>{
    return useQuery ({
        queryKey: ['movie-recommend'],
        queryFn : ()=>fetchMovieRecommendations({id}),
        select:(result)=>result.data,
       
    })
}