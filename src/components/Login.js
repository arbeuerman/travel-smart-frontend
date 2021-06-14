import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'
import React, {Component} from 'react'

class Login extends Component {

    state = {
        username: '',
        password: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.login(this.state)
        this.setState({
            username: '',
            password: ''
        })
        console.log(this.props)
        // debugger
        this.props.history.push('/profile')
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div style={{margin: '15px'}}>
                <Form onSubmit={this.handleSubmit}>
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