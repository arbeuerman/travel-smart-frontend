import './App.css';
import { Component } from 'react';
import ActivityContainer from './components/ActivityContainer';
import Header from './components/Header';
import SearchBar from './components/SearchBar'
import Login from './components/Login'
import Signup from './components/Signup'
import {BrowserRouter, Route} from 'react-router-dom'
// , Switch, Redirect

const activitiesUrl = 'http://localhost:3000/activities'
const usersUrl = 'http://localhost:3000/users'
const loginUrl = 'http://localhost:3000/login'


const headers = {
  'Content-Type': 'application/json',
  Accepts: 'application/json'
}

class App extends Component {

  state = {
    activities: [],
    searchText: '',
    token: {}
  }

  headers_with_auth = {
    Authorization: `Bearer ${this.state.token}`
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
    const newUser = {
      user
    }
    // console.log(newUser)
    fetch(usersUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(console.log)
  }
  
  login = (user) => {
    const currentUser = {
      user
    }
    fetch(loginUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(currentUser)
    })
    .then(res => res.json())
    .then(response => {
      if(response.token)
      { 
        localStorage.setItem('token', response.token)
      } 
      else if(response.message) 
      {
        alert(response.message)
      } else {
        console.error(response)
      }
    })
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Header getAllActivities={this.getAllActivities}/> 
          {/* <Switch> */}
            <Route 
              path='/login' 
              component={Login} 
            />  
            {/* <Login login={this.login}/> */}
            {/* (routerProps) => <Login {...routerProps} login={this.login}/> */}
            
            {/* <ActivityContainer activities={this.state.activities}/> */}
            <Route 
              path='/activities' 
              render={ () => <ActivityContainer 
                                activities={this.state.activities} 
                                handleSearch={this.handleSearch}/>} 
            />
            <Route 
              path='/signup' 
              render={(routerProps) => <Signup {...routerProps} signUpUser={this.signNewUserUp} />} 
            />
            {/* <Signup signUpUser={this.signNewUserUp}/> */}
          {/* </Switch> */}
          {/* <Router>
          </Router> */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
