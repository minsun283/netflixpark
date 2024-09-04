import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Container,Alert ,Row,Col} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css'
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';


const MoviePage = () => {
  const[query,setQuery]=useSearchParams()
  const keyword=query.get("q");

  //장르
  const genre=query.get("genre");
  const [selectedGenre, setSelectedGenre] = useState(null);


  //페이지네이션
  const [page, setPage]=useState(1)
  const handlePageClick =({selected})=>{
    setPage(selected+1)
  }

  const {data:genreData}= useMovieGenreQuery()

  const {data, isLoading, isError, error}= useSearchMovieQuery({keyword, page});
  
  if(isLoading){
    return <h1>Loading...</h1>
}if(isError){
    return <Alert variant='danger'>{error.message}</Alert>
}
console.log("dkdkdkdk",data)

const filterData = data.results.filter((data)=>
  selectedGenre ? data.genre_ids.includes(Number(selectedGenre)) : true ) || [];



const handleNewClick = () => {
  data.results.sort((a,b)=> b.vote_average - a.vote_average)
  console.log("클릭",data)
  };

  const handleShowAll=()=>{
    setSelectedGenre(null);
    setPage(1);
  }


  const handleGenreClick = (genreId)=>{
    setSelectedGenre(genreId)
    setPage(1);
  }



  return (
    <Container className="container-sm">
      <Row>
      <Col lg={4} xs={12}>
      <div>
        

      <button onClick={handleShowAll} className='btn-deco'>  All  </button>

      {genreData && genreData.map((genre)=>(
        <button className='btn-deco' key={genre.id} onClick={()=>handleGenreClick(genre.id)}>{genre.name}</button>

      ))}
      </div>
      </Col>
      <Col lg={8} xs={12}>
      
      
      <Row >
        {filterData?.map((movie,index)=>(
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