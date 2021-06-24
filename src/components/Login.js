import React, {Component} from 'react'
//react bootstrap components
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const currentUser = {
            user: this.state
        }
        const loginUrl = 'http://localhost:3000/login'
        
        const headers = {
            'Content-Type': 'application/json',
            Accepts: 'application/json'
        }

        fetch(loginUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify(currentUser)
        })
        .then(res => res.json())
        .then(response => {
            if(response.token){ 
                localStorage.setItem('token', response.token)
                this.props.handleLogin();
                this.props.history.push('/profile')
            } 
            else if(response.message) {
                this.props.displayError(true, response.message)
                this.props.handleLogout();
            } else {
                this.props.handleLogout();
                console.error(response)
            }
        })
        //reset the login form
        this.setState({
            username: '',
            password: ''
        })
    }
        
    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div style={{margin: '15px'}} className = 'bckgrd-image'>
                <Form onSubmit={this.handleSubmit} style={{margin: '15px'}}>
                    <h3>Log In</h3>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="username" 
                            name="username" 
                            placeholder="Enter username"
                            value={this.state.username}
                            onChange={this.handleInput} 
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            name="password" 
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.handleInput} 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <p className='forgot-password text-right'> 
                        Don't have an account? 
                        <Nav.Link href="/signup" to='/signup'>Sign up</Nav.Link>
                    </p>
                </Form>
            </div>
        )
    }
}

export default Login;