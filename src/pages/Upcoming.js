import React from 'react'

import Movie from '../components/Movie';
import Pagination from '../components/Pagination';

const upcoming = ({ movies }) => {
    return (
        <div>
            <div className="movie-container">
                {movies.map((movie) => <Movie key={movie.id} {...movie} />)}
            </div>
            <Pagination />
        </div>
    )
}

export default upcoming
