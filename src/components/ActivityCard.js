import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function ActivityCard(props) {
    const { name, location, imageUrl, category } = props.activity
    return (
        <div >
            {/* <div className='card-body'>
                <h3 className='card-title'>{name}</h3> 
                <p>Location: {location}</p>
                <p>Category: {category}</p>
                <img src={imageUrl} alt={name}/>
            </div> */}
            <Card style={{ width: '18rem' }}>
                <Card.Header as='h3'>{name}</Card.Header>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
                    <Card.Text>
                        Category: {category}
                    </Card.Text>
                    <Button variant="primary">See More Info</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ActivityCard;