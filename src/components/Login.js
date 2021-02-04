import React  from "react"

function Login({currentUser, setCurrentUser}) {
    

    function login() {
        fetch(`http://localhost:3000/login`, {
          method: "POST",
        })
          .then((r) => r.json())
          .then(setCurrentUser);
      }
    
      function logout() {
        setCurrentUser(null);
      } 


    return (
        <div>

            {currentUser ? (
          <button onClick={logout}>Logout</button>
        ) : (
          <button onClick={login}>Login</button>
        )}      
    
        </div>

    ) 
}

export default Login