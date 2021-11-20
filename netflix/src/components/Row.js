import React, { useEffect, useState } from 'react';

// axios
import axios from '../services/axios'

// styles
import styles from "./Row.module.css"

const base_url ="https://image.tmdb.org/t/p/original/"

const Row = ({title, fetchUrl}) => {

    const [movies, setMovies] = useState([]);

    useEffect(() =>{
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }
        fetchData();
    },[fetchUrl])

    return (
        <div className={styles.row}>
            <h2>{title}</h2>
            <div className={styles.rowPosters}>
                {movies.map(movie => (
                    <img
                     key={movie.id}
                     className=  {styles.rowPoster}
                     src={`${base_url}${movie.poster_path}`} 
                    alt={movie.name}/>
                ))}
            </div>
        </div>
    );
};

export default Row;