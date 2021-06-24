import React, {Component} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Nav from 'react-bootstrap/Nav'

export default class Signup extends Component {

    state = {
        username: '',
        password: '',
        bio: '',
        imageUrl: ''
    }

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.signUpUser(this.state)
        this.setState({
            username: '',
            password: ''
        })
        this.props.history.push('/login')
    }

    render() {
        return(
            <div style={{margin: '15px'}} className = 'bckgrd-image'>
                <Form style={{margin: '15px'}} onSubmit={this.handleSubmit} >
                    <h3>Sign Up</h3>
                    <Form.Group>
                        <Form.Label>Username</Form.Label>
                        <Form.Control 
                            type="text" 
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
                    <Form.Group>
                        <Form.Label>Image</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="imageUrl" 
                            placeholder="Enter an image link" 
                            value={this.state.imageUrl}
                            onChange={this.handleInput}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Bio</Form.Label>
                        <Form.Control 
                            type="text" 
                            name="bio" 
                            placeholder="Enter a bio" 
                            value={this.state.bio}
                            onChange={this.handleInput}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                    <p className='forgot-password text-right'>
                        Already Registered? 
                        <Nav.Link href="/login" to='/login'>Log in</Nav.Link>
                    </p>
                </Form>
            </div>
        )
    }
}
