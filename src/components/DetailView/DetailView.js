import React from "react";
import { useParams } from "react-router-dom";

const DetailView = () => {
    const { id } = useParams();
    console.log("DetailView: " + id);

    return (
        <div>
            <h1>Detail View</h1>
        </div>
    );
}

export default DetailView;