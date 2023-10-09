import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import NavBar from './components/NavBar';
import ListPage from './components/ListPage';
import GalleryPage from './components/GalleryPage';
import DetailView from './components/DetailView';

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

  return (
    <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <NavBar />
          </header>
          <Routes>
            <Route path="/" element={<ListPage ApiImageConfig={ApiImageConfig}/>} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/detail/:id" element={<DetailView />} />
          </Routes>
          <footer className="App-footer">
          </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;