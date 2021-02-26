import React, { useState } from "react"
import { useHistory } from "react-router-dom"

function Login({setCurrentUser}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory()

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:3000/login', {
            method: "POST",
          })
            .then((r) => r.json())
            .then(data => {
              setCurrentUser(data)
            });
        return (
            history.push('/home')
        )
       
    }
     
    return (
        <div>      
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="username" className="white-texts">Username</label>
                <br></br>
                <input
                type="text"
                id="username"
                autoComplete="off"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                />
                <br></br>
                <br></br>
                <label htmlFor="password" className="white-texts">Password</label>
                <br></br>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                />
                <br></br>
                <br></br>
                <input className="button" type="submit" value="login" />
            </form>
        </div>

    ) 
}

export default Login