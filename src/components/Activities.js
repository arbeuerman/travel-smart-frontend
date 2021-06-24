import { useState } from 'react'
import ActivityInfo from "./ActivityInfo";
import ActivityCard from "./ActivityCard";
import CardDeck from "react-bootstrap/CardDeck";


function Activities(props) {
    const [activity, setActivity] = useState({})
    const [showActivityInfo, setShowActivityInfo] = useState(false)

    const displaySingleCard = (activity) => {
        setShowActivityInfo(true)
        setActivity(activity)
    }

    const displayAllActivities = () => {
        setShowActivityInfo(false)
        if(props.fromFavorites)
        {
            props.retrieveFavorites();
        }
    }

    return(
        <div style={{marginTop: '5px'}}>
            { showActivityInfo 
                ? <ActivityInfo 
                    activity={activity} 
                    location={props.location} 
                    displayAllActivities={displayAllActivities}
                    />
                : <CardDeck>
                        {props.activities.map(activity => 
                            <ActivityCard 
                                key={activity.id} 
                                activity={activity} 
                                displaySingleCard={displaySingleCard}
                            />)}
                  </CardDeck>
            }
        </div>
    )
}

export default Activities;