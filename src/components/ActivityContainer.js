import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck";
// import Container from "react-bootstrap/Container";

function ActivityContainer(props) {
    return (
        <div style={{marginLeft: '15px'}}>
            <h1>All Activities</h1>
            <CardDeck>
                {props.activities.map(activity => 
                    <ActivityCard key={activity.id} activity={activity}/>)}
            </CardDeck>
        </div>
    )
}

export default ActivityContainer;