import React, {useState} from 'react'
import { Container,Row,Col,Alert,Button,Badge} from 'react-bootstrap';
import { useMovieDetailQuery } from '../../hooks/useMovieDetail';
import { useParams } from 'react-router-dom';
import { useMovieReviewQuery } from '../../hooks/useMovieReview';
import './MovieDetailPage.style.css'
import ReviewArea from '../../common/ReviewArea/ReviewArea';
import MovieSlider from '../../common/MovieSlider/MovieSlider';
import { useMovieRecommendQuery } from '../../hooks/useMovieRecommend';
import { responsive} from '../../constants/responsiveDetail';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useMovieVideoQuery } from '../../hooks/useMovieVideos';
import MyVerticallyCenteredModal from './component/ModalVideo.jsx';

const MovieDetailPage = () => {
  
   let{id}=useParams();

  const {data:reviewData}= useMovieReviewQuery({id})
  console.log("rrreview",reviewData)

  const {data:recommendData}=useMovieRecommendQuery({id})
  console.log("추천추천",recommendData)

  const {data, isLoading, isError, error}= useMovieDetailQuery({id})
  console.log("dddata",data)

  const {data:genreDate } = useMovieGenreQuery()
  console.log("장르",genreDate)

  const {data:videoDate } =useMovieVideoQuery({id})
  console.log("비디오",videoDate)

  
  const [modalShow, setModalShow] = React.useState(false); //모달

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
        <h5 className='mb-3'>{data?.tagline}</h5> 
        <div className='mt-3'>
            {data.genres && data.genres.map((name)=>( 
                <Badge bg="danger" style={{fontSize:16}}>{name.name}</Badge>
            ))}</div>
           <div className='mt-3'>
        <span className='font-size margin' style={{fontSize:20}}><img src={"https://cdn1.iconfinder.com/data/icons/utilities-part-1/64/calendar-128.png"} style={{width:21}}/> {data?.release_date}   </span>
         <span className='font-size ms-3' style={{fontSize:20}}><img src={"https://cdn4.iconfinder.com/data/icons/essentials-72/24/029_-_Star-512.png"} style={{width:21}}/> {(data?.vote_average).toFixed(1)}</span></div>
            <hr/>
            <div>{data?.overview}</div>
        <hr/>
            <div className="mt-4 button-deco">Language : {data?.original_language}</div>
            <div className="mt-4 button-deco" >Revenue : ${(data?.revenue).toLocaleString()}</div> 
            <div className="mt-4 button-deco">Run time : {data?.runtime}분</div>
    
          

            <div>
            <Button className='mt-5 play-button' variant='danger' onClick={() => setModalShow(true)}>
              <h4>Youtube Video <img style={{width:36}} src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_play_circle_filled_white_48px-128.png"/></h4>
            </Button>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} movieID={videoDate.result?.key} />
          </div>



        </Col>
      </Row>
      <Row>
      <div className='review-css'>
      <h1 className="mt-4">Review</h1>
      {reviewData?.results.map((review)=>(
      <ReviewArea review={review}/>))}</div>
      

        <h1 className='mt-4'>Recommend Movie</h1>
     <MovieSlider movies={recommendData.results} responsive={responsive}/>

      </Row>

    </Container>
  )


  }

export default MovieDetailPage