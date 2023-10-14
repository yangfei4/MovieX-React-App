import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import NavBar from './components/NavBar';
import ListPage from './components/ListPage';
import GalleryPage from './components/GalleryPage';
import DetailView from './components/DetailView';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  runtime?: number;
  release_date: string;
  vote_average: number;
  vote_count: number;
  popularity: number;
  overview: string;
  production_countries?: {
    iso_3166_1: string;
    name: string;
  }[];
  genres: {
    id: number;
    name: string;
  }[];
}

export const AppContext = createContext<any>(null);

const App = () => {

  const [ApiImageConfig, SetApiImageConfig] = useState({
      "base_url": "http://image.tmdb.org/t/p/",
      "secure_base_url": "https://image.tmdb.org/t/p/",
      "poster_sizes": [
        "w92",
        "w154",
        "w185",
        "w342",
        "w500",
        "w780",
        "original"
    ]
});

  useEffect(() => {
    async function fetchData() {
      try {
        const API_respons = await axios.get('https://api.themoviedb.org/3/configuration?api_key=43f32466ca1ce72ff63dd88e6eeebdcd');
        SetApiImageConfig(API_respons.data.images);        
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [moviesListToDisplay, setMoviesListToDisplay] = useState([]);
  const [curIndex, setCurIndex] = useState(0); // 0-based index

  return (
    <BrowserRouter >
        <div className="App">
          <AppContext.Provider 
            value={{ApiImageConfig, moviesListToDisplay, setMoviesListToDisplay, curIndex, setCurIndex}}
          >
            <header className="App-header">
              <NavBar />
            </header>
            <Routes>
              <Route path="/" element={<GalleryPage />} />
              <Route path="/search" element={<ListPage />} />
              <Route path="/detail/:id" element={<DetailView />} />
            </Routes>
            <footer className="App-footer">
              <p>&copy; 2023 Yangfei. All rights reserved.</p>
            </footer>
          </AppContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;