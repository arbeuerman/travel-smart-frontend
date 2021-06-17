import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck";
import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"

function ActivityContainer(props) {

    return (
        <div style={{margin: '15px'}}>
            <FilterBar getSelectedActivities={props.getSelectedActivities} />
            <h5>Traveling to: {props.location ? props.location : 'select a destination'}</h5>
            <SearchBar handleSearch={props.handleSearch}/>
            <CardDeck>
                {props.activities.map(activity => 
                    <ActivityCard key={activity.id} activity={activity}/>)}
            </CardDeck>
        </div>
    )
}

export default ActivityContainer;