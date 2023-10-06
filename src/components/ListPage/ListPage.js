import React from "react";
import SearchBar from "../SearchBar";

const ListPage = () => {
    const submitSearch = ({searchText}) => { 
        console.log("Submitted Search is: " + searchText);
    };

    return (
        <div>
            <SearchBar submitSearch={submitSearch}/>
        </div>
    );
};

export default ListPage;