import './App.css';
import { Component } from 'react';
import ActivityContainer from './components/ActivityContainer';
import Header from './components/Header';
import SearchBar from './components/SearchBar'
import { Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter as Router} from 'react-router-dom'


const activitiesUrl = 'http://localhost:3000/activities'
const usersUrl = 'http://localhost:3000/users'

const headers_with_auth = {
  Authorization: ''
}

const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
}

class App extends Component {

  state = {
    activities: [],
    searchText: ''
  }

  componentDidMount() {
    this.getAllActivities();
  }

  getAllActivities = () => {
    fetch(activitiesUrl)
    .then(res => res.json())
    .then(activities => this.setState({activities}))
  }

  handleSearch = (searchText) => {
    const filteredActivities = [...this.state.activities].filter(activity => activity.category.includes(searchText))
    // console.log(filteredActivities)
    this.setState({activities: filteredActivities})
  }

  signNewUserUp = (user) => {
    // console.log(user)
    fetch(usersUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(console.log)
  }

  render(){
    return (
      <div className="App">
        <Header getAllActivities={this.getAllActivities}/> 
        <SearchBar handleSearch={this.handleSearch}/>
        <ActivityContainer activities={this.state.activities}/>
        <Login />
        <Signup signUpUser={this.signNewUserUp}/>
        {/* <Router>
          <Route path='/login' render={(routerProps) => <Login {...routerProps} />} />
        </Router> */}
        {/* <Router>
          <Route path='/signup' render={(routerProps) => <Signup {...routerProps} />} />
        </Router> */}
      </div>
    );
  }
}

export default App;
