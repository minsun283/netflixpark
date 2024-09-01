import React from 'react'
import Banner from './components/Banner/Banner'
import PopularMovieSlide from './components/PopularMovieSlide/PopularMovieSlide'
import RatedMovieSlide from './components/RatedMovieSlide/RatedMovieSlide'
import UpcomingMovieSlide from './components/UpcomingMovieSlide/UpcomingMovieSlide'

const Homepage = () => {
  return (
    <div><Banner/>
    <PopularMovieSlide/>
    <RatedMovieSlide/>
    <UpcomingMovieSlide/>
    </div>
  )
}

export default Homepage