import React, { useState } from "react"
import Movie from "./Movie"
import Search from "./Search"

function MovieList({ movies }) {

    const [search, setSearch] = useState("")
    const [selectedGenre, setSelectedGenre] = useState("All")

    

    const filteredSearchMovies = movies.filter((movie) => {
        return movie.name.toLowerCase().includes(search.toLowerCase())
    })

    const filteredMoviesByGenre = filteredSearchMovies.filter((movie)=> {
        if(selectedGenre === "All") {
            return true
        }else {
            return movie.genre.name.includes(selectedGenre)
        }
    })

    function handleMovieGenreChange(e) {
        setSelectedGenre(e.target.value)
    }


    return (
        <div>
            < Search search = { search }  setSearch = { setSearch } />
            <br></br>
            <div className="filter">
                    <select onChange={handleMovieGenreChange}>
                        <option value="All">Genres (All)</option>
                        <option value="Action">Action</option>
                        <option value="Animation">Animation</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Drama">Drama</option>
                        <option value="Thriller">Thriller</option>
                        <option value="Documentary">Documentary</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Fantasy">Fantasy</option>
                        <option value="Family Movies">Family Movies</option>
                    </select>
            </div>
            <br></br>
            <br></br>
            <div className="cards">
                {filteredMoviesByGenre.map((movie) => {
                    return <Movie key={movie.id} movie={movie} />
                })}
            </div>
        </div>
    )
}

export default MovieList

    