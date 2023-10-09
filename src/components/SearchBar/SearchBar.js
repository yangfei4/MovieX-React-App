import React from "react";
import { useState, useEffect } from "react";
import "./style.scss";
import "font-awesome/css/font-awesome.min.css"

const SearchBar = ({submitSearch}) => {

    const [searchText, setSearchText] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        submitSearch({searchText});
    };

    useEffect(() => {
        submitSearch({searchText});
    }, [searchText, submitSearch]);

    return (
        <div className="SearchBar">
            <form onSubmit={handleSubmit} className="SearchForm" action="./">
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