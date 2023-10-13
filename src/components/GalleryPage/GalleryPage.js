import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./style.scss";
import genres from "./genres";

const GalleryPage = ({ApiImageConfig}) => {

    const { base_url, poster_sizes } = ApiImageConfig;
    const img_url = base_url + poster_sizes[4];

    const [moviesPool, setMoviesPool] = useState([]); // store all movies

    const [movies, setMovies] = useState([]);
    const [filterKeyList, setFilterKeyList] = useState([]);

    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/detail/${id}`);
    };

    // a function only gets called when the component is created
    useEffect(() => {
        const fetchInitialMovies = async () => {
            try {
                // for loop to iterate through all pages
                const res_all = []
                for(let i = 1; i <= 5; i++){
                    const res = await axios.get('https://api.themoviedb.org/3/discover/movie', {
                        params: {
                            api_key: '43f32466ca1ce72ff63dd88e6eeebdcd',
                            sort_by: 'popularity.desc',
                            page: i
                        }
                    });
                    res_all.push(...res.data.results);
                }
                setMoviesPool(res_all);
                setMovies(res_all);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInitialMovies();
    }, []);

    useEffect(() => {
        const filterMoviesByGenre = () => {
            const filteredMovies = moviesPool.filter((movie) => {
                // check if movie.genre_ids contains any of the filterKeyList
                for(let i = 0; i < filterKeyList.length; i++){
                    if(!movie.genre_ids.includes(filterKeyList[i])){
                        return false;
                    }
                }
                return true;
            });
            setMovies(filteredMovies);
        };
        filterMoviesByGenre();
    }, [filterKeyList, moviesPool]);

    const toggleFilter = (id) => {
        if(filterKeyList.includes(id)){
            // remove id from filterKeyList
            const newFilterKeyList = filterKeyList.filter((key) => key !== id);
            setFilterKeyList(newFilterKeyList);
        }else{
            // add id to filterKeyList
            const newFilterKeyList = [...filterKeyList, id];
            setFilterKeyList(newFilterKeyList);
        }
    }

    return (
        <div className="gallery-container">
            <div className="filter">
                <div className="filter-buttons">
                    {genres.map(genre => (
                        <button 
                            key={genre.id}
                            className={filterKeyList.includes(genre.id) ? "selected" : ""}
                            onClick={() => toggleFilter(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </div>
            </div>
            <div className="gallery">
                {movies.length === 0 && <div className="no-movies">No movie matches the filter</div>}
                {movies.map((movie) => (
                    <div className="movie" key={movie.id} onClick={() => handleClick(movie.id)}>
                        <img 
                            src={movie.poster_path ? (img_url+movie.poster_path) : "https://gitlab.com/yangfei4/mp2/-/raw/main/src/assets/Image_not_available.png?ref_type=heads"} 
                            alt={movie.title}
                        />
                        <div className="movie-title">
                            {movie.title}
                        </div>
                    </div>
                ))    
                }
            </div>
        </div>
    );
};

export default GalleryPage;