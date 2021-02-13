
import React  from "react"

function Signup({secondUser, setSecondUser, setUserLike}) {
    

    function signup() {
        fetch(`http://localhost:3000/signup`, {
          method: "POST",
        })
          .then((r) => r.json())
          .then(data => {
            setSecondUser(data)
            setUserLike(data.like_dislikes)
          })
      }

    
      function hello() {
        setSecondUser(null)
      } 


    return (
        <div >

            {secondUser ? (
          <button className="button" onClick={hello}>Hello, Bek</button>
        ) : (
          <button className="button" onClick={signup}>Signup</button>
        )}      
    
        </div>

    ) 
}

export default Signup