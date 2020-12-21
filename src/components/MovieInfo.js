import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { HashLoader } from "react-spinners"


const API_KEY = '38229b1a8a57f45e0d5454a03cdbe19e';
const IMG_API = "https://image.tmdb.org/t/p/w1280";
let backdropIMG;

const MovieInfo = () => {

    const [movieInfo, setMovieInfo] = useState({});
    const { id } = useParams();
    console.log(id);


    useEffect(() => {
        const TEST_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`
    
        axios.get(TEST_URL).then((response) => {
          setMovieInfo(response.data);
        })
    
        console.log(movieInfo)
    }, [id]);


      if (!movieInfo.title) {
          return (
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <HashLoader 
                    size={150}
                    color='#009688'
                />
            </div>
          )
      }

        const {title, poster_path, overview, genres, tagline, vote_average, release_date, backdrop_path, runtime} = movieInfo;
        const genreArray = genres.map((item) =>  item.name);

        const genreList= genreArray.join(', ');
        console.log(genreList);

        backdropIMG = 'https://image.tmdb.org/t/p/original' + backdrop_path;
        console.log(backdropIMG)

 
    return (
        <div className="movie-page-container" style={{ background: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${backdropIMG})`}}>
            <div className="movie-info-container">
                <div className="image-container">
                    <img src={poster_path ? IMG_API + poster_path : 'https://images.unsplash.com/photo-1520878682198-bdde6f442adc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80'} alt={title} width="383" height="575" />   
                </div>
                <div className="info-container">
                    <h2>{title}</h2>
                    <h3>{tagline}</h3>
                        <p className="overview-text">{overview}</p>
                        <hr/>
                    <div className="movie-properties">
                        <div className="movie-props-one">
                            <p>Genre</p>
                            <h4>{genreList}</h4>
                        </div>

                        <div className="movie-props-one">
                            <p>Rating</p>
                            <h4>{vote_average}/10</h4>
                        </div>
                    </div>
                    
                    <div className="movie-properties-two">
                        <div className="movie-props-one">
                            <p>Original Release</p>
                            <h4>{release_date}</h4>
                        </div>

                        <div className="movie-rating">
                            <p>Runtime</p> 
                            <h4>{runtime}m</h4>
                        </div>
                    </div>   
                </div>
            </div>
           
        </div>
    )
    
}

export default MovieInfo
