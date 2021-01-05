import React from 'react'

import Movie from '../components/Movie';
import Pagination from '../components/Pagination';

const LatestMovies = ({movies, darkMode}) => {
    return (
        <div className={darkMode ? 'dark-mode' : 'light-mode'}>
            <div className="movie-container">
                {movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
        </div>
    )
}

export default LatestMovies
