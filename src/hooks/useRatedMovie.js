import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";


const fetchRatedMovies=()=>{
    return api.get(`/movie/top_rated`)
}

export const useRatedMoviesQuery=()=>{
    return useQuery({
        queryKey:['movie-rated'],
        queryFn:fetchRatedMovies,
        select:(result)=>result.data,
    })
}