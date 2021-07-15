import React from "react"
import { useHistory } from "react-router-dom"
import styled from "styled-components";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

function Navbar({ currentUser, setCurrentUser }) {

    const history = useHistory()

    function handleFavortieMoviesPage() {
        history.push(`/favorite_movies`)
    }

    function goHome() {
        history.push('/home')
    }

    function goTologinPage() {
        history.push('/login')
    }

    function goToSignupPage() {
        history.push('/signup')
    }

    function watchLater() {
        history.push('/watch_later')
    }

    function logout() {
        setCurrentUser(null);
        history.push('/home')
    }



    // clear Voice Recognition
    function clear() {
        SpeechRecognition.startListening()
        SpeechRecognition.stopListening()
    }

    function handleMicAnimation() {
        { <div className="loader">Loading...</div> }
    }


    return (

        <NavWrapper>
            <button className="button" onClick={goHome}>Home</button>
            {currentUser ? <button className="button" onClick={handleFavortieMoviesPage}>Favorite movies</button> : ""}
            {currentUser ? <button className="button" onClick={watchLater}>Watch later</button> : ""}
            {!currentUser ? <button className="button" onClick={goToSignupPage}>Signup</button> : ""}
            {!currentUser ? <button className="button" onClick={goTologinPage}>Login</button> : <button className="button" onClick={logout}>Logout</button>}
            <br></br>
            <ButtonWrapper>
                <button onClick={SpeechRecognition.startListening} className="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                        <path fill-rule="evenodd" d="M10 8V3a2 2 0 1 0-4 0v5a2 2 0 1 0 4 0zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                    </svg>
                </button>
                <button className="button" onClick={clear}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-mute" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M12.734 9.613A4.995 4.995 0 0 0 13 8V7a.5.5 0 0 0-1 0v1c0 .274-.027.54-.08.799l.814.814zm-2.522 1.72A4 4 0 0 1 4 8V7a.5.5 0 0 0-1 0v1a5 5 0 0 0 4.5 4.975V15h-3a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1h-3v-2.025a4.973 4.973 0 0 0 2.43-.923l-.718-.719zM11 7.88V3a3 3 0 0 0-5.842-.963l.845.845A2 2 0 0 1 10 3v3.879l1 1zM8.738 9.86l.748.748A3 3 0 0 1 5 8V6.121l1 1V8a2 2 0 0 0 2.738 1.86zm4.908 3.494l-12-12 .708-.708 12 12-.708.707z" />
                    </svg>
                </button>
            </ButtonWrapper>
        </NavWrapper>

    )

}

export default Navbar

const NavWrapper = styled.div`
  display: flex;
//   margin-top: 15%
`;

const ButtonWrapper = styled.div`
  margin-left: 750px;
  display: flex;
`;

