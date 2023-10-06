import React from "react";
import { useState } from "react";
import "./style.scss";
import "font-awesome/css/font-awesome.min.css"

const SearchBar = (props) => {

    const [searchText, setSearchText] = useState("");

    const submitSearch = (event) => {
        event.preventDefault();
        props.submitSearch({searchText});
    }

    return (
        <div className="SearchBar">
            <form onSubmit={submitSearch} className="SearchForm" action="./">
                <span>
                    <i className="fa fa-search" aria-hidden="true"></i>
                </span>
                <input 
                    className="InputBox" 
                    onChange={(event => setSearchText(event.target.value))}
                    placeholder="Seach movies..." 
                    type="search"
                    value={searchText}
                />
            </form>
        </div>
    );
}

export default SearchBar;