import Activities from "./Activities";
import SearchBar from "./SearchBar"
import FilterBar from "./FilterBar"

function ActivityContainer(props) {

    return (
        <div style={{margin: '15px'}}>
            <div style={{display: 'flex', margin: '15px'}}>
                <FilterBar getSelectedActivities={props.getSelectedActivities} />
                <div style={{marginLeft: '15px'}}>
                    <h5>Traveling to: {props.location ? props.location : 'please select from dropdown'}</h5>
                    <SearchBar handleSearch={props.handleSearch}/>
                </div>
            </div>
            <div style={{alignSelf: 'center'}}>
                <Activities activities={props.activities} fromFavorites={false}/>
            </div>
        </div>
    )
}

export default ActivityContainer;