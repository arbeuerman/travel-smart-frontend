import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import Form from 'react-bootstrap/Form'
// import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'

function Header(props) {
    return (
        <div>
            <Navbar>
                <Navbar.Brand href="#home">Travel Smart</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href='/home' to='/home'>Home</Nav.Link>
                        <Nav.Link 
                            href="activities" 
                            to='/activities' 
                            onClick={props.getAllActivities}>View All Activities
                        </Nav.Link>
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        { props.isLoggedIn 
                            ? <Nav.Link href="logout" to='/logout'>Logout</Nav.Link>
                            : <Nav.Link href="login" to='/login'>Login</Nav.Link>}

                        { props.isLoggedIn 
                            ? null
                            :<Nav.Link href="signup" to='/signup'>Sign Up</Nav.Link> }
                        </Nav>
            
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;