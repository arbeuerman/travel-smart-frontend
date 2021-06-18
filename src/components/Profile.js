import React, { useEffect } from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

// const userUrl = 'http://localhost:3000/users'

function Profile(props) {

    useEffect(() => {
        const headers = {
            Authorization: `Bearer ${localStorage.token}`
          }
          if(Object.keys(props.user).length === 0)
          {
              fetch('http://localhost:3000/profile', {
                  headers
              })
              .then(res => res.json())
              .then(result => {
                if(result.message){
                  console.log(result.message)
                } else {
                  props.updateUser(result)
                }
              })
          }
      }, [props]);

    const {username, imageUrl, bio} = props.user

    return(
    <div style={{margin: '15px'}}>
        <Card className="text-center">
            <div>
            <Card.Header>Welcome {username}!</Card.Header>
            <Button variant="primary">View Favorites</Button>
            <Button variant="secondary">Edit Profile</Button>
            </div>
            <Card.Img variant="bottom" src={imageUrl} />
            <Card.Body>
                <Card.Title>{username}</Card.Title>
                <Card.Text> Bio: {bio}</Card.Text>
            </Card.Body>
            <Card.Footer className="text-muted">2 days ago</Card.Footer>
        </Card>
    </div>
    ) 
}

export default Profile;