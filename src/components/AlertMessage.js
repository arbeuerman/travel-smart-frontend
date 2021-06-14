import Alert from 'react-bootstrap/Alert'
// import Button from 'react-bootstrap/Button'
// import { useState } from 'react'

function AlertMessage(props) {
    console.log(props.error)
      return (
        <Alert variant="danger" onClose={props.hideError} dismissible>
          <Alert.Heading>Whoops! There was an error</Alert.Heading>
            {props.error.map(error => <p>{error}</p>)}
        </Alert>
      );
  }

  export default AlertMessage;