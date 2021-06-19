import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
// import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Activities from './Activities'

const favoritesUrl = 'http://localhost:3000/favorites'
const headers = {
    Authorization: `Bearer ${localStorage.token}`
  }

function Profile(props) {

  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState([])

  useEffect(() => {
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

  const {username, imageUrl, bio, updated_at} = props.user

  const toggleFavorites = () => {
    //show a list of all of the user favorites
    if(!showFavorites){
      fetch(favoritesUrl, {
        headers
      })
      .then(res => res.json())
      .then(favorites => {
        setShowFavorites(true)
        setFavorites(favorites)
      })
    } else {
      setShowFavorites(false)
    }
  }

  return(
    <div style={{margin: '15px'}}>
      <Container>
        <CardGroup>
          <Row>
            <Col>
              <Card>
                <Card.Header>Welcome {username}!</Card.Header>
                <Image src={imageUrl} thumbnail/>  
              </Card>
            </Col>
            <Col>
              <Card bg='info'>
                <Card.Body>
                    <Card.Title>{username}</Card.Title>
                    <Card.Text> Bio: {bio}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Last updated: {updated_at}</Card.Footer>
              </Card>
            </Col>
          </Row>
          <div style={{marginTop: '5px'}}>
            <Button 
            variant="primary"
            onClick={toggleFavorites}>{showFavorites ? 'Hide Favorites' : 'View Favorites'}</Button> {' '}
            <Button variant="secondary">Edit Profile</Button> {' '}
          </div>
          {showFavorites ?
            <Activities activities={favorites} /> 
            : null        
          }
        </CardGroup>
      </Container>
    </div>
  ) 
}

export default Profile;