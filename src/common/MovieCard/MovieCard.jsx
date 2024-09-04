import React from 'react'
import { Badge } from 'react-bootstrap'
import './MovieCard.style.css'
import { useMovieGenreQuery } from '../../hooks/useMovieGenre'
import { useNavigate } from 'react-router-dom'

const MovieCard = ({movie}) => {
    const {data:genreDate}=useMovieGenreQuery()
    console.log("ggg",genreDate)

    const showGenre =(genreIdList)=>{
      if(!genreDate) return []
      const genreNameList= genreIdList.map((id)=>{
        const genreObj = genreDate.find((genre)=>genre.id===id);
        return genreObj.name
      })

      return genreNameList
    }
    const navigate=useNavigate()
    const showDetail=()=>{
      navigate(`/movie/${movie.id}`)
    }
  return (

    <div 
    style={{backgroundImage:
        "url("+
        `https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`+")"
    }} className="movie-card" onClick={showDetail}>
       

        <div className='overlay'>
            <div className='title_text'>{movie.title} </div>
            <div className='mt-2'>
            {showGenre(movie.genre_ids).map((id)=>(
                <Badge bg="danger" className="badge">{id}</Badge>
            ))}</div>
            
            <div className='sub-size margin'><img src="https://cdn1.iconfinder.com/data/icons/utilities-part-1/64/calendar-128.png" style={{width:17}}/> {movie.release_date}</div>
            <div className='sub-size'><img src="https://cdn4.iconfinder.com/data/icons/essentials-72/24/029_-_Star-512.png" style={{width:17}}/> {(movie.vote_average).toFixed(1)}</div>
            <div className='sub-size'><img src="https://cdn0.iconfinder.com/data/icons/app-user-interface-5/48/user-128.png" style={{width:17}}/>{Math.floor(movie.popularity)}</div>
            <div className='sub-size'>{movie.adult?(<img src="https://cdn3.iconfinder.com/data/icons/navigation-7-1/64/numbers_number_count_nineteen-2-256.png" style={{width:17}}/>):"전체관람가"}</div>
         </div>
        
    </div>
  )
}

export default MovieCard