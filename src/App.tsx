import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import NavBar from './components/NavBar';
import ListPage from './components/ListPage';
import GalleryPage from './components/GalleryPage';
import DetailView from './components/DetailView';

export const AppContext = createContext({});

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

  useEffect(() => {
    console.log("moviesListToDisplay is updated: ", moviesListToDisplay);
  }, [moviesListToDisplay]);

  return (
    <BrowserRouter basename="/mp2">
        <div className="App">
          <AppContext.Provider 
            value={{ApiImageConfig, moviesListToDisplay, setMoviesListToDisplay, curIndex, setCurIndex}}
          >
            <header className="App-header">
              <NavBar />
            </header>
            <Routes>
              <Route path="/" element={<ListPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
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