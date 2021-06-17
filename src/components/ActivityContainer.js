import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck";
import SearchBar from "./SearchBar"

function ActivityContainer(props) {

    return (
        <div style={{margin: '15px'}}>
            <h4>Traveling to: {props.location}</h4>
            <SearchBar handleSearch={props.handleSearch}/>
            {/* <h1>All Activities</h1> */}
            <CardDeck>
                {props.activities.map(activity => 
                    <ActivityCard key={activity.id} activity={activity}/>)}
            </CardDeck>
        </div>
    )
}

export default ActivityContainer;