import React, {useEffect} from 'react'
import { Container,Row,Col,Alert } from 'react-bootstrap';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useParams } from 'react-router-dom';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import './MovieDetailPage.style.css'
const MovieDetailPage = () => {
   let{id}=useParams();
  console.log("params",id)


  //const {data:review}= useMovieReviewQuery({id})
  const {data, isLoading, isError, error}= useMovieDetailQuery({id})
  if(isLoading){
    return <h1>Loading...</h1>
}if(isError){
    return <Alert variant='danger'>{error.message}</Alert>
}

  return (
    <Container>
      <Row>
        <Col className='col-md'> <img className='detail-img' src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${data?.poster_path}`}/></Col>
        <Col className='col-md'>
        <div className='title-font'>{data?.title}</div> 
        <div>{data?.overview}</div>
        <hr/>
        <span className='font-size margin'><img src={"https://cdn1.iconfinder.com/data/icons/utilities-part-1/64/calendar-128.png"} style={{width:17}}/> {data?.release_date}</span>
            <span className='font-size'><img src={"https://cdn4.iconfinder.com/data/icons/essentials-72/24/029_-_Star-512.png"} style={{width:17}}/> {(data?.vote_average)}</span>
        </Col>
      </Row>
      <Row>
      <div>dd</div>

      </Row>

    </Container>
  )


  }

export default MovieDetailPage