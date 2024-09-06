import React, { useEffect, useState } from 'react'
import { useSearchMovieQuery } from '../../hooks/useSearchMovie'
import { useSearchParams } from 'react-router-dom'
import { Alert,Dropdown } from 'react-bootstrap';
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
  const [selectedSort, setSelectedSort] = useState('평점 높은순');
  console.log("dkTdsfkjsdfs",selectedSort)
  //페이지네이션
  const [page, setPage]=useState(1)

  const handlePageClick =({selected})=>{
    setPage(selected+1)
  }

  useEffect(()=>{
    setPage(1)
  },[keyword])


  const {data:genreData, isLoading: genresLoading}= useMovieGenreQuery()

  const {data, isLoading, isError, error}= useSearchMovieQuery({keyword, page});
  
  if(isLoading){
    return <h1>Loading...</h1>
}if(isError){
    return <Alert variant='danger'>{error.message}</Alert>
}


let filterData = data.results.filter((data)=>
  selectedGenre ? data.genre_ids.includes(Number(selectedGenre)) : true ) || [];



  const handleShowAll=()=>{
    setSelectedGenre(null);
    setPage(1);
  }


  const handleGenreClick = (genreId)=>{
    setSelectedGenre(genreId)
    setPage(1);
  }

  const sortedMovies = filterData?.sort((a, b) => {
    switch (selectedSort) {
      case '평점 높은순':
        return b.vote_average - a.vote_average;
      case '평점 낮은순':
        return a.vote_average - b.vote_average;
      case '최신순':
        return new Date(b.release_date) - new Date(a.release_date);
      default:
        return 0;
    }
    }
  );

  const handleSelect = (event) => {
    setSelectedSort(event.target.value);
    setPage(1); // 정렬 방식이 변경될 때 페이지를 1로 초기화

    console.log("dkTdsfkjsdfs",selectedSort)
  };
  return (
      <div className='movie-page'>
        

   
      <div className='tab-genre'>
      <button onClick={handleShowAll} className={selectedGenre === null ? 'btn-active' : 'btn-deco'}>  All  </button>
      {genreData && genreData.map((genre)=>(
        <button key={genre.id} onClick={()=>handleGenreClick(genre.id)} className={selectedGenre === genre.id ? 'btn-active' : 'btn-deco'}>{genre.name}</button>

      ))}
       </div>

       <button onClick={handleSelect} value={"평점 높은순"} className='sort-deco'>평점 높은순<FiChevronRight/></button>
       <button onClick={handleSelect} value={"평점 낮은순"} className='sort-deco'>평점 낮은순<FiChevronRight/></button>
       <button onClick={handleSelect} value={"최신순"} className='sort-deco'>최신순<FiChevronRight/></button>


       {!isLoading && filterData && filterData.length === 0 && (
        <Alert variant='danger' className='mt-5 me-2 ms-2'>검색 결과가 없습니다.</Alert>
      )}

      
      <div className='content'>
        <div className='item-align'>
        {sortedMovies?.map((movie,index)=>(
          <div className='item-css'>
          <MovieCard movie={movie}/></div>
         
        ))}
        </div>


        <div>

      <ReactPaginate
        nextLabel={<FiChevronRight/> }
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