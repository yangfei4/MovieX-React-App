import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import { 
    POPULARITY,
    RELEASE_DATE,
    VOTE_AVERAGE,
    NONE,
    DESC,
    ASC
 } from "../ListPage/sortConstant";
import { AppContext, Movie } from "../../App";

interface MovieListProps {
    movies: Movie[];
    handleSortKeyChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    handleSortOrderChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const MovieList = ({ movies, handleSortKeyChange, handleSortOrderChange }: MovieListProps) => {
    const {ApiImageConfig, setMoviesListToDisplay, setCurIndex} = useContext(AppContext);
    const { base_url, poster_sizes } = ApiImageConfig;
    const img_url = base_url + poster_sizes[4];
    
    const navigate = useNavigate();
    const handleClick = (id: number, index: number) => {
        setMoviesListToDisplay(movies);
        setCurIndex(index);
        navigate(`/detail/${id}`);
    };

    return (
        (movies.length === 0) ? (<div className="no-movies">No movies found</div>) :
        (
        <div className="list-container">
            <div className="sort-container">
                <label className="sort-label">Sort by: </label>
                <select className="sort" onChange={(event) => {handleSortKeyChange(event)}}>
                    <option value={NONE}>None</option>
                    <option value={POPULARITY}>Popularity</option>
                    <option value={RELEASE_DATE}>Release Date</option>
                    <option value={VOTE_AVERAGE}>Rating</option>
                </select>
                <span className="space">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <label className="sort-label">Order: </label>
                <select className="order" onChange={(event) => {handleSortOrderChange(event)}}>
                    <option value={DESC}>Descending &#8595; </option>
                    <option value={ASC}>Ascending &#8593; </option>
                </select>
            </div>

            <div className="result-length"> {movies.length} movies found: </div>

            <div className="moviesContainer">
                <div className="movies">
                    {movies.map((movie, index) => (
                        <div className="movie" key={index} onClick={() => handleClick(movie.id, index)}>
                            <img
                                className="movie-poster"
                                src={movie.poster_path ? (img_url+movie.poster_path) : "https://gitlab.com/yangfei4/mp2/-/raw/main/src/assets/Image_not_available.png?ref_type=heads"} 
                                alt={movie.title} 
                            />
                            <div className="movie-info">
                                <h3 className="titile">{movie.title}</h3>
                                <span className="release-date">{movie.release_date}</span>
                                <span className="vote_average">
                                    Rating: {Math.round(movie.vote_average * 10) / 10} ({movie.vote_count} votes)
                                    &nbsp;&nbsp;
                                    Popularity: {Math.round(movie.popularity * 10) / 10}
                                </span>
                                <span className="popularity"></span>
                                <div className="overview-container">
                                    {movie.overview}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        )
    )
};

export default MovieList;