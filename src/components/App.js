import React, { useEffect, useState } from "react"
import Header from "./Header"
import MovieList from "./MovieList"
import Login from "./Login"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MovieDetails from "./MovieDetails"
import MyFavoriteMovies from "./MyFavoriteMovies"

function App() {

  const [movies, setMovies] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    fetch("http://localhost:3000/movies")
     .then(r => r.json())
     .then(data => {
       setMovies(data)
     })
  },[])


  return (

    <div className="App">

      <Router>
      <Header   
        currentUser={currentUser}
        setCurrentUser={setCurrentUser} />
      <Switch>
        <Route exact path="/home"> 
        <MovieList movies={movies}/>
        </Route>
        <Route exact path="/login">
            <Login />
          </Route>
        <Route exact path="/movies/:id">
          <MovieDetails currentUser={currentUser}/>
        </Route>
        <Route exact path="/favorite_movies">
          <MyFavoriteMovies movies={movies} currentUser={currentUser}/>
        </Route>
      </Switch>
      </Router>

    </div>
  );
}

export default App;
