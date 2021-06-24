import { Nav, Button } from 'react-bootstrap'

function Home(props) {
    return(
        <div style={{
                marginLeft: '15px',
                marginRight: '15px', 
                color: 'white', 
                textAlign: 'center'
                }} 
            className='home'
        >
            <h4>Welcome to Travel Smart!</h4>
            <p><h6>The premier app for planning your next trip</h6></p>
            {
                props.isLoggedIn 
                ? <Button><Nav.Link style={{color: 'white'}} href="activities" to='/activities'>Start browsing </Nav.Link></Button>
                : <div>
                    <p>To get started please</p> 
                    <Button><Nav.Link style={{color: 'white'}} href="signup" to='/signup'>Sign Up</Nav.Link></Button> 
                    <p>or</p> 
                    <Button><Nav.Link style={{color: 'white'}} href="login" to='/login'>Login</Nav.Link></Button>
                  </div>
            }
            
        </div>
    )
}

export default Home;