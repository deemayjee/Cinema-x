import React, { useState, useEffect} from 'react';
import { Route, Switch, Redirect, useLocation } from "react-router-dom";
import axios from 'axios';
import { HashLoader } from "react-spinners";

import { Home, LatestMovies, TopRated, Upcoming } from './pages';
import Pagination from './components/Pagination'

import NavBar from './components/NavBar';
import MovieInfo from './components/MovieInfo';

const API_KEY = '38229b1a8a57f45e0d5454a03cdbe19e';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query="`;


const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(getInitialMode());
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const { pathname: category } = useLocation();



  useEffect(() => {
    console.log(category);
    if(category.startsWith('/movie')) return;

    const API = `https://api.themoviedb.org/3/movie${category}?api_key=${API_KEY}&language=en-US&page=${page}`;
    console.log(2)
    getMovies(API);
  }, [category, page]);

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
      localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  function getInitialMode(){
    const savedMode = JSON.parse(localStorage.getItem('dark'));
    return savedMode || false;
  }

  const getMovies = async (API) => {
    setLoading(true);
    let {data} = await axios.get(API); // 2s
    setLoading(false);
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
  

  if(loading) {
   return  (
     <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <HashLoader 
          size={150}
          color='#009688'
        />
      </div>
   );
  }

  return (
    <>
      <NavBar searchTerm={searchTerm} handleSubmit={handleSubmit} handleOnChange={handleOnChange} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <Switch>
        <Redirect exact from="/" to="/popular" />
        <Route path="/popular">
          <Home movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm} darkMode={darkMode}/>
        </Route>
        <Route path="/now_playing">
          <LatestMovies movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm} darkMode={darkMode}/>
        </Route>
        <Route path="/top_rated">
          <TopRated movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm} darkMode={darkMode}/>
        </Route>
        <Route path="/upcoming">
          <Upcoming movies={movies} handleSubmit={handleSubmit} searchTerm={searchTerm} darkMode={darkMode}/>
        </Route>
        <Route path="/movie/:id">
          <MovieInfo/>
        </Route>
      </Switch>
      {!category.startsWith('/movie') && <Pagination getNext={nextPage} getBack={prevPage} page={page} darkMode={darkMode}/> }
    </>
  );
}

export default App;


  