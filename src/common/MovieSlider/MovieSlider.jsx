import React from 'react'
import "./MovieSlider.style.css"
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({title,movies,responsive}) => {
  return (
    <div>
        <div className='main-title'>{title}</div>
        <Carousel

        containerClass="carousel-container"
        itemClass="movie-slider p-1"
        infinite={true}
        responsive={responsive}
        autoPlaySpeed={1000}
>
 {movies.map((movie,index)=>(<MovieCard movie={movie} key={index}/>))}
</Carousel>

    </div>
  )
}

export default MovieSlider