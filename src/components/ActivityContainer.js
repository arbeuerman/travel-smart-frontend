import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck";
import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"
import ActivityInfo from "./ActivityInfo";
import { useState } from 'react'

function ActivityContainer(props) {

    const [activity, setActivity] = useState({})
    const [showActivityInfo, setShowActivityInfo] = useState(false)

    const displaySingleCard = (activity) => {
        // console.log(activity)
        setShowActivityInfo(true)
        setActivity(activity)
        
    }

    return (
        <div style={{margin: '15px'}}>
            <FilterBar getSelectedActivities={props.getSelectedActivities} />
            <h5>Traveling to: {props.location ? props.location : 'select a destination'}</h5>
            <SearchBar handleSearch={props.handleSearch}/>
            { showActivityInfo 
                ? <ActivityInfo activity={activity} location={props.location}/>
                : <CardDeck>
                        {props.activities.map(activity => 
                            <ActivityCard 
                                key={activity.id} 
                                activity={activity} 
                                displaySingleCard={displaySingleCard}
                            />)}
                  </CardDeck>}
        </div>
    )
}

export default ActivityContainer;