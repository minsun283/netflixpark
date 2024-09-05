import React, { useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Container,Alert ,Row,Col} from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import './MoviePage.style.css'
import ReactPaginate from 'react-paginate';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";


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

  const {data:genreData, isLoading: genresLoading}= useMovieGenreQuery()

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

      <div className='movie-page'>
        
      <div className='tab-genre'>
      <button onClick={handleShowAll} className={selectedGenre === null ? 'btn-active' : 'btn-deco'}>  All  </button>
   

      {genreData && genreData.map((genre)=>(
        <button key={genre.id} onClick={()=>handleGenreClick(genre.id)} className={selectedGenre === genre.id ? 'btn-active' : 'btn-deco'}>{genre.name}</button>

      ))}

       </div>

       {!isLoading && filterData && filterData.length === 0 && (
        <Alert variant='danger' className='mt-5 me-2 ms-2'>검색 결과가 없습니다.</Alert>
      )}

      <div className='content'>
        <div className='item-align'>
        {filterData?.map((movie,index)=>(
          <div className='item-css'>
          <MovieCard movie={movie}/></div>
         
        ))}
        </div>


        <div>

      <ReactPaginate
        nextLabel={<FiChevronRight className="page-arrow" /> }
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={data?.total_pages}
        previousLabel={<FiChevronLeft />}
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
      

</div>
</div>
  )
}

export default MoviePage