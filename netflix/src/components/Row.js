import React, { useEffect, useState } from 'react';

import YouTube from "react-youtube"
import movieTrailer from "movie-trailer"

// axios
import axios from '../services/axios'

// styles
import styles from "./Row.module.css"

const base_url ="https://image.tmdb.org/t/p/original/"

const Row = ({title, fetchUrl}) => {

    const [movies, setMovies] = useState([]);
    const [trailerUrl,setTrailerUrl] = useState("")

    useEffect(() =>{
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    },[fetchUrl])

    const opts ={
        height: "390",
        width: "100%",
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay:1,
        },
    };

    const handleClick =(movie) =>{
        if (trailerUrl) {
            setTrailerUrl('');
        }else {
            movieTrailer(movie?.name || "")
            .then((url) => {
                // https://www.youtube.com/watch?v=XtMThy8QKqU
                const urlParams =new URLSearchParams(new URL(url).search) 
                setTrailerUrl(urlParams.get("v")) 
            })
            .catch(error => console.log(error))
        }
    }

    return (
        <div className={styles.row}>
            <h2>{title}</h2>
            <div className={styles.rowPosters}>
                {movies.map(movie => (
                    <img
                     key={movie.id}
                     onClick ={() => handleClick(movie)}
                     className=  {styles.rowPoster}
                     src={`${base_url}${movie.poster_path}`} 
                    alt={movie.name}/>
                ))}
            </div>
           {trailerUrl &&<YouTube videoId={trailerUrl} opts={opts}/>} 
        </div>
    );
};

export default Row;