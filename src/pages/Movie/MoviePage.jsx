import React from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Container,Alert ,Row,Col} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css'


const MoviePage = () => {
  const[query,setQuery]=useSearchParams()
  const keyword=query.get("q");

  const {data, isLoading, isError, error}= useSearchMovieQuery({keyword});
console.log("서치결과",data)
  if(isLoading){
    return <h1>Loading...</h1>
}if(isError){
    return <Alert variant='danger'>{error.message}</Alert>
}


  return (
    <Container className="container-sm">
      <Row>
      <Col lg={4} xs={12}>
      <div className='filter'>필터</div>
      </Col>
      <Col lg={8} xs={12}>
      
      <Row className="box-deco" >
        
        {data?.results.map((movie,index)=>(
          <Col key={index} lg={4} xs={12}>
          <MovieCard movie={movie}/>
          </Col>
        ))}
      </Row>
      </Col>
      </Row>
        
        </Container>
  )
}

export default MoviePage