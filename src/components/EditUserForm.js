import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

import React, { Component } from 'react'

class EditUserForm extends Component {

    state = {
        username: this.props.user.username,
        imageUrl: this.props.user.imageUrl,
        bio: (this.props.user.bio ? this.props.user.bio : '' )
    }

    // const {username, bio, imageUrl} = this.props.user

    handleInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.editUser(this.state)
        this.props.hideEditForm();
    }

    render(){
        // debugger
        return(
            <div>
                <Modal show={this.props.show} onHide={this.props.hideEditForm}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Your Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={(event) => this.handleSubmit(event)}>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="username" 
                                    value={this.state.username}
                                    onChange={this.handleInput} 
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Bio</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="bio" 
                                    value={this.state.bio}
                                    onChange={this.handleInput}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Image</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    name="imageUrl" 
                                    value={this.state.imageUrl}
                                    onChange={this.handleInput}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Save Changes
                            </Button>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.hideEditForm}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default EditUserForm;