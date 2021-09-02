import React, { useEffect, useState } from "react"
import Header from "./Header";
import MovieList from "./MovieList";
import Login from "./Login";
import Signup from "./Signup";
import WatchLaterPage from "./WatchLaterPage";
import { BrowserRouter as Router, Route, Switch, Redirect,  BrowserRouter  } from 'react-router-dom';
import MovieDetails from "./MovieDetails";
import MyFavoriteMovies from "./MyFavoriteMovies";
import PopularMoviesList from "./PopularMoviesList";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';




function App() {


  const [movies, setMovies] = useState([])
  const [currentUser, setCurrentUser] = useState(null)
  const [favMovie, setFavMovie] = useState([])
  const [watchLaterList, setWatchLaterList] = useState([])


  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then(r => r.json())
      .then((data) => {
        setMovies(data)
      })
  }, [])


   //Speech Recognition logic
   const commands = [
    {
      command: ["Go to *", "Go to my *", "Open * page", "Open *", "Open my *", "Open my * list",  "Go to my * list", "Go to * list"],
      callback: (page) => setRedirecting(page)
    }
  ];

  const { transcript } = useSpeechRecognition({ commands });
  const [redirecting, setRedirecting] = useState("");


  const pages = ["favorite movies", "homepage", "watch later"];
  const urls = {
   homepage: "/home",
   "favorite movies": "/favorite_movies", 
   "watch later": "/watch_later"
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  let redirect = "";

  if (redirecting) {
    if (pages.includes(redirecting)) {
      redirect = <Redirect to={urls[redirecting]} />;
    } 
  }

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


  //adding movie to Watch later list 
  function addToWatchLaterList(movieObj) {
    const newAddedMovie = [...watchLaterList, movieObj]
    setWatchLaterList(newAddedMovie)
  }

  //deleting movie from Watch later list 
  function deleteWatchLaterMovie(movieObj) {
    const updateWatchLaterLIst = watchLaterList.filter((movie) => {
      return movie.id !== movieObj
    })
    setWatchLaterList(updateWatchLaterLIst)
  }
  


  return (

    <div className="App">
      
        <Router>
        </Router>
      <BrowserRouter>
        <Header
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          movies={movies}
        />
        <br></br>
        <br></br>
        <br></br>
        <Switch>
          <Route exact path="/home">
            <PopularMoviesList movies={movies}/>
              <MovieList movies={movies} />
          </Route>
          <Route exact path="/login">
            <Login  setCurrentUser={setCurrentUser}/>
          </Route>
          <Route exact path="/signup">
            <Signup setCurrentUser={setCurrentUser} currentUser={currentUser} />
          </Route>
          <Route exact path="/favorite_movies">
              <MyFavoriteMovies currentUser={currentUser} favMovie={favMovie} />
          </Route >  
          <Route exact path="/watch_later">
            <WatchLaterPage watchLaterList={watchLaterList} deleteWatchLaterMovie={deleteWatchLaterMovie}/>
          </Route>
          <Route exact path="/movies/:id">
            <MovieDetails
              currentUser={currentUser}
              addToFavMovies={addToFavMovies}
              removeFromFavMovies={removeFromFavMovies}
              watchLaterList={watchLaterList}
              setWatchLaterList={setWatchLaterList}
              addToWatchLaterList={addToWatchLaterList}
            />
          </Route>
        </Switch>
      {redirect}
      </BrowserRouter>
      
    </div>
  );
}

export default App;

