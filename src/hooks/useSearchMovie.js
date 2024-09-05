import { useQuery } from "@tanstack/react-query"
import api from "../utils/api"

const fetchSearchMovie=({keyword,page,genre,korean})=>{
    
    if(keyword){
     return api.get(`/search/movie?query=${keyword}&page=${page}`) ;

     } else if (genre){
        return api.get(`discover/movie?with_genres=${genre}&page=${page}`)
    } else if (genre){
        return api.get(`discover/movie?with_original_language=${korean}&page=${page}`)
    }else {
        return api.get(`/movie/popular?page=${page}`)
    }
}
export const useSearchMovieQuery=({keyword,page,genre,korean})=>{
    return useQuery({
        queryKey:['movie-search', keyword,page,genre,korean],
        queryFn:()=>fetchSearchMovie({keyword,page,genre,korean}),
        select:(result)=>result.data,
    })

}
