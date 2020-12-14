import React, { useState, useEffect} from 'react';
import { Route, Switch, useLocation } from "react-router-dom";
import axios from 'axios';

import { Home, LatestMovies, TopRated, Upcoming } from './pages';
import Pagination from './components/Pagination'

import NavBar from './components/NavBar';

const API_KEY = '7ecd0b11bc4cd387a22b43cb37086584';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query="`;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { pathname: category } = useLocation();

  useEffect(() => {
    const API = `https://api.themoviedb.org/3/movie${category}?api_key=${API_KEY}&language=en-US&page=${page}` ;
    getMovies(API);
  }, [category, page]);

  useEffect(() => {
    setPage(1);
  }, [category]);
  
  const getMovies = async (API) => {
    let {data} = await axios.get(API)
    console.log (data);
    setMovies(data.results);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(searchTerm){
      axios.get(SEARCH_API + searchTerm).then((response) => {
        console.log(response);
        setMovies(response.data.results);
      });
      setSearchTerm('');
    }
  };

  const handleOnChange = (e) => setSearchTerm(e.target.value);

  const nextPage = () => {
    setPage(page + 1);
  }

  const prevPage = () => {
    setPage(page - 1);
  }


  return (
    <>
      <NavBar searchTerm={searchTerm} handleSubmit={handleSubmit} handleOnChange={handleOnChange}/>
      <Switch>
        <Route path="/popular">
          <Home movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm}/>
        </Route>
        <Route path="/now_playing">
          <LatestMovies movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm}/>
        </Route>
        <Route path="/top_rated">
          <TopRated movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm}/>
        </Route>
        <Route path="/upcoming">
          <Upcoming movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm}/>
        </Route>
      </Switch>
      <Pagination getNext={nextPage} getBack={prevPage} page={page}/>
    </>
  );
}

export default App;


  