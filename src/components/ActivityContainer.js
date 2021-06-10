import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck"

function ActivityContainer(props) {
    return (
        <div>
            <h1>Activity Container</h1>
            <CardDeck >
                {props.activities.map(activity => 
                    <ActivityCard key={activity.id} activity={activity}/>)}
            </CardDeck>
        </div>
    )
}

export default ActivityContainer;