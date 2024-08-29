import { Route, Routes } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/AppLayout';

import Homepage from './pages/Homepage/Homepage';
import MovieDetailPage from './pages/MovieDetailPage/MovieDetailPage';
import MoviePage from './pages/Movie/MoviePage';
import 'bootstrap/dist/css/bootstrap.min.css';



function App() {
  return (
    <div>
      <Routes>
        
        <Route path ="/" element={<AppLayout/>}>
          <Route index element={<Homepage/>}/> //index = 부모path 그대로 쓰겠다. path ="/" 
          <Route path="/movies" element={<MoviePage/>}/>
          <Route path="/movie/:id" element={<MovieDetailPage/>}/>
        </Route>
      
      </Routes>
    </div>
  );
}

export default App;
