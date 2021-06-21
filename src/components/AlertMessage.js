import Alert from 'react-bootstrap/Alert'
import Modal from 'react-bootstrap/Modal'
// import Button from 'react-bootstrap/Button'
// import { useState } from 'react'

function AlertMessage(props) {
    console.log(props.error)
      return (
        <Modal show={true}>
          <Alert variant="danger" onClose={props.hideError} dismissible>
            <Alert.Heading>Whoops! There was an error</Alert.Heading>
              {props.error.map(error => <p>{error}</p>)}
          </Alert>
        </Modal>
      )
  }

  export default AlertMessage;