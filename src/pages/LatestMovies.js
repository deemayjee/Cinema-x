import React from 'react'

import Movie from '../components/Movie';
import Pagination from '../components/Pagination';

const LatestMovies = ({movies}) => {
    return (
        <div>
            <div className="movie-container">
                {movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
        </div>
    )
}

export default LatestMovies
