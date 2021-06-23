import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import AlertMessage from './AlertMessage'

const favoritesUrl = 'http://localhost:3000/favorites'
const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    Authorization: `Bearer ${localStorage.token}`
  }

function ActivityInfo(props) {

    const [like, setLike] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    useEffect(
        () => {
            fetch(favoritesUrl, {
                method: 'GET',
                headers
            })
            .then(res => res.json())
            .then(favorites => {
                // console.log(favorites.count)
                if(favorites.count) {
                    const names = favorites.map(favorite => favorite.name)
                    names.includes(props.activity.name) ? setLike(true) : setLike(false)
                }
            })
        }, [props]
    )
    
    const handleClick = () => {
        
        if(localStorage.token !== "null") {
            if(like !== true)
            {
                const data = {
                    activity: props.activity,
                    location: props.location,
                }
                updateLikes('POST', JSON.stringify(data), true)
                
            } else {
                const data = {favoritedActivity: props.activity}
                updateLikes('DELETE', JSON.stringify(data), false)
            }
        } else {
            setErrorMessages(["please log in or sign up to like"])
            setShowErrors(true)
        }
    }

    const updateLikes = (method, body, isLiked) => {
        fetch(favoritesUrl, {
            method,
            headers,
            body
        })
        .then(
            setLike(isLiked)
        )
    } 

    return (
        <div style={{marginTop: '5px'}}>
            <CardDeck>
                <Card>
                    <Card.Img 
                        variant="top" 
                        src={props.activity.image} 
                        alt={`image of ${props.activity.name}`}
                        />
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>{props.activity.name}</Card.Title>
                        <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                        </Card.Text>
                        <Button 
                            variant="primary" 
                            onClick={props.displayAllActivities}> Back to all activities
                        </Button>
                    
                        <Button 
                            variant="outline-danger" 
                            style={{border: 'none'}}
                            onClick={handleClick}>{ !like === true ? '♡' : '♥' }
                        </Button>
                    </Card.Body>
                </Card>
                {showErrors
                    ? <AlertMessage error={errorMessages} hideError={() => setShowErrors(false)}/> 
                    : null }
            </CardDeck>
        </div>
    )
}

export default ActivityInfo;
