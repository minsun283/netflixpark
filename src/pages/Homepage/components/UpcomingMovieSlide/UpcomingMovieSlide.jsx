import React from 'react'
import Alert from 'react-bootstrap/Alert';
import { useUpcomingMovieQuery } from '../../../../hooks/useUpcomingMovie';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { responsive } from '../../../../constants/responsive';


  const UpcomingMovieSlide = ()=>{

const {data, isLoading, isError, error} = useUpcomingMovieQuery()

    if(isLoading){
        return <h1>Loading...</h1>
    }if(isError){
        return <Alert variant="danger">{error.message}</Alert>
    }
  return (

    <div>
    <MovieSlider title='Up Coming Movie' movies={data.results} responsive={responsive}/>
</div>
   
  )
}
  
export default UpcomingMovieSlide