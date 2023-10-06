import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';

import NavBar from './components/NavBar';
import ListPage from './components/ListPage';
import GalleryPage from './components/GalleryPage';
import DetailView from './components/DetailView';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/detail/:id" element={<DetailView />} />
        </Routes>
      </BrowserRouter>
      <footer className="App-footer">
      </footer>
    </div>
  );
}

export default App;