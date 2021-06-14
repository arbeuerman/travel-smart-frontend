import React, { useState, useEffect } from 'react';

const userUrl = 'http://localhost:3000/users'

function Profile(props) {

    const [user, setUser] = useState({})

    useEffect(() => {
        // console.log(localStorage.token)
        //get user id 
        const user_id = props.user.id
        const user_id_url = `${userUrl}/${user_id}`
        const headers = {
            Authorization: `Bearer ${localStorage.token}`
        }
        fetch(user_id_url, {
            headers
        })
        .then(res => res.json())
        .then(user => setUser(user))
      });

   return(
    <div style={{margin: '15px'}}>
        <h1>Welcome {user.username}!</h1>
    </div>
    ) 
}

export default Profile;