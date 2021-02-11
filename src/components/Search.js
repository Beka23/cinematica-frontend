import React from "react" 

function Search({search, setSearch}) {
    return (
        <div className="search">
            <input 
            type="text"
            placeholder="🔎Find movies"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            >
            </input>
        </div>
    )
}

export default Search