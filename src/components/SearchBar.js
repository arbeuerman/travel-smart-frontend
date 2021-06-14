import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { Component } from "react";

class SearchBar extends Component{

    state = {
        searchText: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSearch(this.state.searchText)
        this.setState({searchText: ""})
    }

    render(){
        
        return (
            <div style={{marginBottom: '15px'}}>
                <Form as='form' noValidate inline onSubmit={this.handleSubmit}>
                    <FormControl 
                        type="text" 
                        placeholder="Search by activity type" 
                        className="mr-sm-2" 
                        value={this.state.searchText}
                        onChange={(event) => {this.setState({searchText: event.target.value})}}
                    />
                    <Button 
                        variant="outline-success" 
                        type='submit'
                    >Search</Button>
                </Form>
            </div>
        )
    }
}

export default SearchBar;