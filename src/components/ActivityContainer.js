import ActivityCard from "./ActivityCard";

function ActivityContainer(props) {
    return (
        <div>Activity Container
            <h1>Activity Container</h1>
            {props.activities.map(activity => 
                <ActivityCard key={activity.id} activity={activity}/>)}
        </div>
    )
}

export default ActivityContainer;