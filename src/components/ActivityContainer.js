import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck";
import SearchBar from "./SearchBar"
// import {useEffect} from "react"

function ActivityContainer(props) {

    // useEffect( () => {
    //     props.getActivities();
    // })

    return (
        <div style={{margin: '15px'}}>
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