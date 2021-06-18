import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { useState } from 'react'

const favoritesUrl = 'http://localhost:3000/favorites'
const headers = {
    'Content-Type': 'application/json',
    Accepts: 'application/json',
    Authorization: `Bearer ${localStorage.token}`
  }

function ActivityInfo(props) {

    const [like, setLike] = useState(false)

    const handleClick = () => {
        
        if(localStorage.token) {
            if(like !== true)
            {
                console.log('adding likes')
                const data = {
                    activity: props.activity,
                    location: props.location,
                }
                updateLikes('POST', JSON.stringify(data), true)
                
            } else {
                console.log('deleting favorite')
                const data = {favoritedActivity: props.activity}
                updateLikes('DELETE', JSON.stringify(data), false)
            }
        } else {
            alert("please log in or sign up to like")
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
        // .then(result => {
        //     debugger
        //     console.log(result)
        //     setLike(isLiked)
        // })
    } 

    return (
        <div>
            <Card>
                <Card.Img variant="top" src={""} alt={`image of ${props.activity.name}`}/>
                <Card.Body>
                    <Card.Title>{props.activity.name}</Card.Title>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Button 
                        variant="outline-danger" 
                        style={{border: 'none'}}
                        onClick={handleClick}>{ !like === true ? '♡' : '♥' }
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ActivityInfo;
