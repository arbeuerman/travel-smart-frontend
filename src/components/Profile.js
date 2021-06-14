import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

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
        <Card className="text-center">
            <Card.Header>Welcome {user.username}!</Card.Header>
            <Card.Img variant="bottom" src={user.imageUrl} />
            <Card.Body>
                <Card.Title>{user.username}</Card.Title>
                <Card.Text> Bio: {user.bio}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    </div>
    ) 
}

export default Profile;