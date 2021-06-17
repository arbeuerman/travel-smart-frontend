import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function Home(props) {

    const handleSelection = (location) => {
        // console.log(location)
        props.getSelectedActivities(location)
        props.history.push('/activities')
    }

    return(
        <div style={{marginLeft: '15px'}}>
            Home Page
            <h3>Where would you like to travel?</h3>
            <DropdownButton 
                variant="success" 
                id="dropdown-basic"
                title="Select a location" 
                onSelect={handleSelection}>
                {/* <Dropdown.Toggle 
                    >
                    Select a location
                </Dropdown.Toggle>  */}
                
                {/* <Dropdown.Menu > */}
                    <Dropdown.Item 
                        // href="/activities/bangalore" 
                        eventKey="Bangalore">Bangalore
                    </Dropdown.Item>
                    <Dropdown.Item 
                        // href="/activities/Barcelona"
                        eventKey="Barcelona">Barcelona</Dropdown.Item>
                    <Dropdown.Item 
                        // href="/activities/Berlin"
                        eventKey="Berlin">Berlin</Dropdown.Item>
                    <Dropdown.Item 
                        // href="/activities/Dallas"
                        eventKey="Dallas">Dallas</Dropdown.Item>
                    <Dropdown.Item 
                        // href="/activities/London"
                        eventKey="London">London</Dropdown.Item>
                    <Dropdown.Item 
                        // href="/activities/New York City"
                        eventKey="New York">New York City</Dropdown.Item>
                    <Dropdown.Item 
                        // href="/activities/Paris"
                        eventKey="Paris">Paris</Dropdown.Item>
                    <Dropdown.Item 
                        // href="/activities/San Francisco"
                        eventKey="San Francisco">San Francisco</Dropdown.Item>
                {/* </Dropdown.Menu> */}
                {/* <Dropdown.Divider />
                <Dropdown.Item href="/activities/bangalore">Separated link</Dropdown.Item> */}
            </DropdownButton>
        </div>
    )
}

export default Home;