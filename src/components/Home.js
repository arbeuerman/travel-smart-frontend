import { Nav } from 'react-bootstrap'

function Home(props) {
    return(
        <div style={{marginLeft: '15px'}}>
            Welcome to Travel Smart!
            To get started please <Nav.Link href="login" to='/login'>login</Nav.Link> or
            <Nav.Link href="signup" to='/signup'>sign up</Nav.Link>
            
        </div>
    )
}

export default Home;