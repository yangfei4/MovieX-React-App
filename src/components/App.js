import React from 'react';
import './App.scss';
import SearchBar from "./SearchBar";

const App = () => {

  const submitSearch = ({searchText}) => { 
    console.log("Submitted Search is: " + searchText);
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar submitSearch={submitSearch}/>
      </header>
        
    </div>
  );
}

export default App;
