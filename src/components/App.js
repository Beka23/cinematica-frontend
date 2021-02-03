import React, { useEffect, useState } from "react"
import Header from "./Header"
import MovieList from "./MovieList"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import MovieDetails from "./MovieDetails"

function App() {

  const [movies, setMovies] = useState([])

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
      <Header />
      <Switch>
        <Route exact path="/home"> 
        <MovieList movies={movies}/>
        </Route>
        <Route exact path="/movies/:id">
          <MovieDetails />
        </Route>
      </Switch>
      </Router>

    </div>
  );
}

export default App;
