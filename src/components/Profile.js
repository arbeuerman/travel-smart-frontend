import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

import Activities from './Activities'
import EditUserForm from './EditUserForm'
import AlertMessage from './AlertMessage'

const favoritesUrl = 'http://localhost:3000/favorites'
const headers = {
    Authorization: `Bearer ${localStorage.token}`
  }

function Profile(props) {

  const [showFavorites, setShowFavorites] = useState(false)
  const [favorites, setFavorites] = useState([])
  const [showEditForm, setShowEditForm] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])
  const [showErrors, setShowErrors] = useState(false)

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

  const toggleEditForm = () => 
  {
    if(!showEditForm)
    {
      setShowEditForm(true)
    } else {
      setShowEditForm(false)
    }
  }

  const editProfile = (newUserInfo) => {
    console.log(newUserInfo)
    const updatedUser = {
      user: newUserInfo
    }
    console.log(updatedUser)
    // debugger
    fetch(`http://localhost:3000/users/${props.user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.token}`
      },
      body: JSON.stringify(updatedUser)
    })
    .then(res => res.json())
    .then(results => {
      if(results.message)
      {
        console.error(results.message)
        setShowErrors(true)
        setErrorMessages([results.message])
      } 
      else if(results.errors) {
        console.error(results.errors)
        setShowErrors(true)
        setErrorMessages([results.errors])
      }
      else {
        debugger
        props.updateUser(results)
      }
    })
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
          <Row style={{marginTop: '5px'}}>
            <Col>
            <Button 
              variant="primary"
              onClick={toggleFavorites}>
                {showFavorites ? 'Hide Favorites' : 'View Favorites'}
            </Button> {' '}
            <Button 
              variant="secondary"
              onClick={toggleEditForm}>Edit Profile</Button> {' '}
            </Col>
          </Row>
          <Row>
            <Col>
              {
                showEditForm 
                ? <EditUserForm 
                    editUser={editProfile} 
                    hideEditForm={() => setShowEditForm(false)}
                    show={showEditForm}
                    user={props.user}
                  /> 
                : null
              }
            </Col>
          </Row>  
          <hr></hr>
            <Row>
              <Col>
                {showFavorites ?
                  <Activities activities={favorites} /> 
                  : null        
                }
              </Col>
            </Row>
            {showErrors
            ? <AlertMessage error={errorMessages} hideError={() => setShowErrors(false)}/> 
            : null }
        </CardGroup>
      </Container>
    </div>
  ) 
}

export default Profile;