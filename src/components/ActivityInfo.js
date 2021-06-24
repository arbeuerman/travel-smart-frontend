import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'
import AlertMessage from './AlertMessage'

const favoritesUrl = 'http://localhost:3000/favorites'


function ActivityInfo(props) {

    const [like, setLike] = useState(false)
    const [errorMessages, setErrorMessages] = useState([])
    const [showErrors, setShowErrors] = useState(false)

    useEffect(
        () => {
            const headers = {
                'Content-Type': 'application/json',
                Accepts: 'application/json',
                Authorization: `Bearer ${localStorage.token}`
            }
            fetch(favoritesUrl, {
                method: 'GET',
                headers
            })
            .then(res => res.json())
            .then(favorites => {
                if(favorites.length > 0) {
                    const names = favorites.map(favorite => favorite.name)
                    names.includes(props.activity.name) ? setLike(true) : setLike(false)
                }
            })
        }, [props]
    )
    
    const handleClick = () => {
        
        if(localStorage.token) {
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
        const headers = {
            'Content-Type': 'application/json',
            Accepts: 'application/json',
            Authorization: `Bearer ${localStorage.token}`
          }
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
                        src={props.activity.imageUrl} 
                        alt={`image of ${props.activity.name}`}
                        />
                </Card>
                <Card>
                    <Card.Body>
                        <Card.Title>{props.activity.name}</Card.Title>
                        <Card.Text>
                            <strong>Related to:</strong>
                            <ul>
                                {
                                    props.activity.category.split(' ').length > 1
                                    ? props.activity.category.split(' ').map(tag => <li>{tag}</li>)
                                    : props.activity.tags.map(tag => <li>{tag}</li>)
                                }
                            </ul>
                        </Card.Text>
                        <Button 
                            variant="primary" 
                            onClick={props.displayAllActivities}> Back
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
