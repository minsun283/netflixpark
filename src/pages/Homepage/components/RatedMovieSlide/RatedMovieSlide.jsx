import React from 'react'
import { useRatedMoviesQuery } from '../../../../hooks/useRatedMovie';
import Alert from 'react-bootstrap/Alert';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


const RatedMovieSlide = () => {

  const {data, isLoading, isError, error} = useRatedMoviesQuery()

    if(isLoading){
      return <h1>Loading...</h1>
    }if (isError){
      return <Alert variant="danger">{error.message}</Alert>
    }

  return (
    <div>
    <MovieSlider title='Top Rated Movie' movies={data.results} responsive={responsive}/>
</div>

  )
}

export default RatedMovieSlide