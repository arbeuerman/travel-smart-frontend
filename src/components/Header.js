import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

function Header(props) {
    return (
        <div style={{backgroundColor: '#80a7d2', margin: '15px'}}>
            <Navbar>
                <Navbar.Brand href="/home" to='/home'>Travel Smart</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                        <Nav.Link href='/home' to='/home'>Home</Nav.Link>
                        <Nav.Link 
                            href="activities" 
                            to='/activities'>Browse Activities
                        </Nav.Link>
                        
                        { props.isLoggedIn 
                            ? <Nav.Link href="logout" to='/logout'>Logout</Nav.Link>
                            : <Nav.Link href="login" to='/login'>Login</Nav.Link>}

                        { props.isLoggedIn 
                            ? <Nav.Link href="profile" to='/profile'>View Profile</Nav.Link>
                            :<Nav.Link href="signup" to='/signup'>Sign Up</Nav.Link> }
                        </Nav>
            
                </Navbar.Collapse>
            </Navbar>
        </div>
    )
}

export default Header;