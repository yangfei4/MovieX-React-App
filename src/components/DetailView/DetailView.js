import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaLongArrowAltLeft , FaLongArrowAltRight } from "react-icons/fa";
import "./style.scss";

const DetailView = ({ApiImageConfig}) => {
    const { base_url, poster_sizes } = ApiImageConfig;
    const img_url = base_url + poster_sizes[6];

    const { id } = useParams();

    const [movieDetail, setMovieDetail] = useState(null);
    const [movieVideoUrls, setMovieVideoUrls] = useState(null);

    useEffect(() => {
        const fetchMovieDetail = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
                    params: {
                        api_key: '43f32466ca1ce72ff63dd88e6eeebdcd'
                    }
                });
                console.log("fetched details:", res.data);
                setMovieDetail(res.data);
            } catch (error) {
                console.error("The error message:", error);
            }
        };
        fetchMovieDetail();
    }, [id, setMovieDetail]);

    function getVideoList(videoList) {
        const youtubeVideoList = videoList.filter((video) => (video.site === "YouTube"));
        const keyList = youtubeVideoList.map((video) => (video.key));
        const FirstFiveKeyList = keyList.length>=5 ? keyList.slice(0, 5) : keyList;

        return (FirstFiveKeyList.length > 0) ? FirstFiveKeyList : null;
    }

    useEffect(() => {
        const fetchMovieVideoUrls = async () => {
            try {
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, {
                    params: {
                        api_key: '43f32466ca1ce72ff63dd88e6eeebdcd'
                    }
                });
                console.log("fetched video:", res.data);
                const videoKeys = getVideoList(res.data.results);
                const videoUrls = videoKeys.map((videoKey) => (`https://www.youtube.com/embed/${videoKey}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1`) );
                setMovieVideoUrls(videoUrls);
            } catch (error) {
                console.error("The error message:", error);
            }
        };
        fetchMovieVideoUrls();
    }, [id, setMovieVideoUrls]);

    useEffect(() => {
        console.log("video url:", movieVideoUrls);
    },[movieVideoUrls]);

    return (
        (movieDetail) ?
        (<div className="detailPage">
            <div
                className="detailContainer" 
                style={{backgroundImage: `url(${img_url+movieDetail.backdrop_path})`}}
            >
                <div className="navigator">
                    <FaLongArrowAltLeft className="arrow arrow-left"/>
                    <p className="nav-index-display">0/0</p>
                    <FaLongArrowAltRight className="arrow arrow-right"/>
                </div>
                <div className="movie-card">
                    <div className="image-container">
                        <img 
                            src={ (movieDetail.poster_path) ? img_url+movieDetail.poster_path : "https://gitlab.com/yangfei4/mp2/-/raw/main/src/assets/Image_not_available.png?ref_type=heads"} 
                            alt={movieDetail.title} 
                        />
                    </div>
                    <div className="movie-info">
                        <span className="titile-container">
                            <h3 className="titile">
                                {movieDetail.title}
                                {movieDetail.release_date ? 
                                (<span className="release-year"> ({movieDetail.release_date.substring(0, 4)})</span>):
                                (null)}
                            </h3>
                        </span>
                        <span className="sub-titile">
                            {(movieDetail.release_date.length>0) ? (movieDetail.release_date.substring(5, 7) + "/" + movieDetail.release_date.substring(8, 10) + "/" + movieDetail.release_date.substring(0, 4)): "Unknown"
                            + ((movieDetail.production_countries.length>0) ? (`(${movieDetail.production_countries.map((country) => (country.iso_3166_1)).join(",")})`) : "")
                            + `\u00a0 • \u00a0`
                            + movieDetail.genres.map((genre) => (genre.name)).join(", ")
                            + `\u00a0 • \u00a0`
                            + `${Math.floor(movieDetail.runtime / 60)}h ${movieDetail.runtime % 60}m`
                            }
                        </span>
                        <span className="rating-popularity">
                            <p>
                                Rating: {Math.round(movieDetail.vote_average * 10) / 10} ({movieDetail.vote_count} votes)
                            </p>
                        </span>
                        <label className="overview-label"><h3>Overview</h3></label>
                        <div className="overview-container">
                            <p>{movieDetail.overview}</p>
                        </div>
                        <label className="videos-label"><h3>Clips</h3></label>
                        <div className="videos-scroller">
                            <ol className="videos-list">
                                {movieVideoUrls && movieVideoUrls.length>0 ? movieVideoUrls.map((videoUrl) => <li><iframe className="video" src={videoUrl} allowFullScreen></iframe></li>) : <p>No clips found.</p>}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        )
        : (<div> <h1>Loading...</h1> </div>)
    );
}

export default DetailView;