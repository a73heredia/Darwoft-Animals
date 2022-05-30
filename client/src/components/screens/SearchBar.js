import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../../actions";
import "./SearchBar.css";

function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInput(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (name.length < 1) {
            alert("Field is empty");
        }
        dispatch(getDogByName(name));
        setName('')
    }

    return (
        <div>
            <input
                className="searchInput"
                type="text"
                value={name}
                placeholder="Search"
                onChange={(e) => handleInput(e)}
            />
            <button className="btn" type="submit" onClick={(e) => handleSubmit(e)}>
                Go!
            </button>
        </div>
    );
}

export default SearchBar;
