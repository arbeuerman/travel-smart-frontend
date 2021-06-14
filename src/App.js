import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import ActivityContainer from './components/ActivityContainer';
import Header from './components/Header';
import Profile from './components/Profile'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Home from './components/Home'
import AlertMessage from './components/AlertMessage'

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
    user: {},
    showError: false,
    errorMessages: [],
    isLoggedIn: false
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
    this.setState({activities: filteredActivities})
  }

  signNewUserUp = (user) => {
    const newUser = {
      user
    }
    fetch(usersUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(result => {
      if(result.user)
      {
        console.log(result.user)
      } else {
        this.setState({
          showError: true,
          errorMessages: result
        })
      }
    })
  }

  handleLogin = () => {
    this.setState({isLoggedIn: true})
  }
  
  handleLogout = () => this.setState({isLoggedIn: false})
  
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
        this.handleLogin();
      } 
      else if(response.message) 
      {
        this.setState({
          showError: true,
          errorMessages: [response.message]
        })
      } else {
        console.error(response)
      }
    })
  }


  handleError = () => {
    this.setState({
      showError: false,
      errorMessages: []
    })
  }

  render(){
    return (
      <BrowserRouter>
        <div className="App">
          <Header 
            getAllActivities={this.getAllActivities} 
            isLoggedIn={this.state.isLoggedIn}/> 
            <Route 
              path='/home'
              render={(routerProps) => <Home {...routerProps} />}
            />
            <Route 
              path='/login' 
              render={ (routerProps) => <Login 
                                          {...routerProps} 
                                          login={this.login}
                                          // isLoggedIn={this.state.isLoggedIn}
                                          handleLogIn={this.handleLogin}/>} 
            />  
            <Route 
              path='/activities' 
              render={ () => <ActivityContainer 
                                getActivities={this.getAllActivities}
                                activities={this.state.activities} 
                                handleSearch={this.handleSearch}/>} 
            />
            <Route 
              path='/signup' 
              render={(routerProps) => <Signup {...routerProps} 
                                        signUpUser={this.signNewUserUp} />} 
            />
            <Route 
              path='/profile' 
              render={(routerProps) => 
               <Profile {...routerProps} user={this.state.user} />
                } 
            />
            {this.state.showError 
            ? <AlertMessage error={this.state.errorMessages} hideError={this.handleError}/> 
            : null }
            <Route 
              path='/logout'
              render={(routerProps) => < Logout {...routerProps} logout={this.handleLogout}/>}
            />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
