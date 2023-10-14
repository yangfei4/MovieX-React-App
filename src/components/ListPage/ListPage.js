import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";

import "./style.scss";
import SearchBar from "../SearchBar";
import MovieList from "../MovieList";
import {
    POPULARITY,
    RELEASE_DATE,
    VOTE_AVERAGE,
    NONE,
    DESC
} from "./sortConstant";

const ListPage = () => {
    const [movies, setMovies] = useState([]);
    const [sortKey, setSortKey] = useState("none");
    const [sortOrder, setSortOrder] = useState("desc");

    const submitSearch = useCallback(({searchText}) => { 
        const fetchMovies = async () => {
            try {
                const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
                    params: {
                        query: searchText,
                        api_key: '43f32466ca1ce72ff63dd88e6eeebdcd'
                    }
                });
                setMovies(response.data.results);
            } catch (error) {
                console.error(error);
            }
        };
        fetchMovies();
    }, []);

    const handleSortKeyChange = (event) => {
        setSortKey(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    const sortMovies = useCallback(({sortKey}) => {
        const sortedMovies = [...movies];
        sortedMovies.sort((a, b) => {
            if(sortKey === POPULARITY) {
                return sortOrder === DESC ? b.popularity - a.popularity : a.popularity - b.popularity;
            } else if(sortKey === RELEASE_DATE) {
                return sortOrder === DESC ? new Date(b.release_date) - new Date(a.release_date) : new Date(a.release_date) - new Date(b.release_date);
            } else if(sortKey === VOTE_AVERAGE) {
                return sortOrder === DESC ? b.vote_average - a.vote_average : a.vote_average - b.vote_average;
            } else if(sortKey === NONE){
                return 0;
            }
            return 0;
        });
        // check if the sortedMovies is different from the original movies
        // avoid infinite loop
        if (JSON.stringify(sortedMovies) !== JSON.stringify(movies)) {
            setMovies(sortedMovies);
        }
    }, [sortOrder, movies]);

    useEffect(() => {
        sortMovies({sortKey});
    }, [sortKey, sortOrder, movies, sortMovies]);

    return (
        <div className="ListPageContainer">
            <SearchBar submitSearch={submitSearch}/>
            <MovieList 
                movies={movies} 
                handleSortKeyChange={handleSortKeyChange}
                handleSortOrderChange={handleSortOrderChange}
            />
        </div>
    );
};

export default ListPage;