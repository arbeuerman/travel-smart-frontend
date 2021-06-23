import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function ActivityCard(props) {
    const { name, location, image, category } = props.activity

    const displayActivity = () => {
        props.displaySingleCard(props.activity)
    }

    return (
        <div style={{marginBottom: '15px'}}>
            <Card style={{ width: '18rem', height: '45vw' }} border='secondary'>
                <Card.Header style={{ height: '20%', wordBreak: 'break-all', whiteSpace: 'normal' }} as='h3'>{name}</Card.Header>
                <Card.Img style={{ height: '50%' }}  variant="top" src={image} />
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{location}</Card.Subtitle>
                    <Card.Text>
                        Category: {category.toLowerCase()}
                    </Card.Text>
                    <Button variant="primary" onClick={displayActivity}>See More Info</Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ActivityCard;