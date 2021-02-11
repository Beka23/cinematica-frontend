import React, { useEffect, useState } from "react"
import Header from "./Header"
import MovieList from "./MovieList"
import Login from "./Login"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MovieDetails from "./MovieDetails"
import MyFavoriteMovies from "./MyFavoriteMovies"
import PopularMoviesList from "./PopularMoviesList"


function App() {

  const [movies, setMovies] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [favMovie, setFavMovie] = useState([])
 


  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then(r => r.json())
      .then(data => {
        setMovies(data)
      })
  }, [])


  //adding a new liked movie to the My Favorite Movies list
  function addToFavMovies(movieObj) {
    const newAddedMovie = [...favMovie, movieObj]
    setFavMovie(newAddedMovie)
  }

  //removing movie from  My Favorite Movies list when like removed
  function removeFromFavMovies(movieObj) {
    const updatedFavMovieArray = favMovie.filter((movie) => {
      return movie.id !== movieObj
    })
    setFavMovie(updatedFavMovieArray)
  }


  


  return (

    <div className="App">
      <Router>
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          movies={movies}
        />
        <Switch>
          <Route exact path="/home">
          <PopularMoviesList movies={movies}/>
            <MovieList movies={movies} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/movies/:id">
            <MovieDetails
              currentUser={currentUser}
              addToFavMovies={addToFavMovies}
              removeFromFavMovies={removeFromFavMovies}
            />
          </Route>
          <Route exact path="/favorite_movies">
            <MyFavoriteMovies currentUser={currentUser} favMovie={favMovie} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

