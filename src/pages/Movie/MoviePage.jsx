import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Container,Alert ,Row,Col} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css'
import ReactPaginate from 'react-paginate';



const MoviePage = () => {
  const[query,setQuery]=useSearchParams()
  const keyword=query.get("q");

  const [page, setPage]=useState(1)
  const handlePageClick =({selected})=>{
    setPage(selected+1)
  }


  const {data, isLoading, isError, error}= useSearchMovieQuery({keyword, page});


  const handleNewClick = () => {
    (data.results).sort((a,b)=> b.vote_average - a.vote_average)
    console.log("dkdkdkdk",data)
  };

  
  if(isLoading){
    return <h1>Loading...</h1>
}if(isError){
    return <Alert variant='danger'>{error.message}</Alert>
}


  return (
    <Container className="container-sm">
      <Row>
      <Col lg={4} xs={12}>
      <div className='filter'>
        
      <button onClick={handleNewClick}>최신순</button>

      </div>
      </Col>
      <Col lg={8} xs={12}>
      
      
      <Row className="box-deco" >
        {data.results?.map((movie,index)=>(
          <Col key={index} lg={4} xs={12}>
          <MovieCard movie={movie}/>
          </Col>
        ))}
      </Row>


        <div className='pagi-css'>
      <ReactPaginate
       
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={page-1}
      /></div>


      </Col>
      </Row>
        
        </Container>
  )
}

export default MoviePage