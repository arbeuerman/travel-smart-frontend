import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'

function FilterBar(props) {

    const handleSelection = (location) => {
        props.getSelectedActivities(location)
    }

    return (
        <div style={{marginBottom: '15px'}}>
            <h5>Where would you like to travel?</h5>
            <DropdownButton 
                variant="success" 
                id="dropdown-basic"
                title="Select a location" 
                onSelect={handleSelection}>
                    <Dropdown.Item 
                        eventKey="Bangalore">Bangalore
                    </Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="Barcelona">Barcelona</Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="Berlin">Berlin</Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="Dallas">Dallas</Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="London">London</Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="New York">New York City</Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="Paris">Paris</Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="San Francisco">San Francisco</Dropdown.Item>
                </DropdownButton>
        </div>
    )
}

export default FilterBar;