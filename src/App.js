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
    location: '',
    user: {},
    showError: false,
    errorMessages: [],
    isLoggedIn: false,
  }

  componentDidMount() {
    if(localStorage.token)
    {
      this.handleLogin();
    }
    // fetch('http://localhost:3000/profile', {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.token}`
    // }})
    // .then(res => res.json)
    // .then(result => {
    //   console.log(result)
    //   debugger
    // })
  }

  getSelectedActivities = (location) => {
    fetch(`${activitiesUrl}/${location}`)
    .then(res => res.json())
    .then(results => {
      this.setState({activities: results.data, location})
    })
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
    .then(response => {
      if(response.token)
      { 
        localStorage.setItem('token', response.token)
        this.handleLogin();
        // debugger
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
      console.log(response)
      if(response.token)
      { 
        localStorage.setItem('token', response.token)
        this.handleLogin();
        // debugger
        this.updateUser(user)
      } 
      else if(response.message) 
      {
        this.setState({
          showError: true,
          errorMessages: [response.message]
        })
        this.handleLogout();
      } else {
        this.handleLogout();
        console.error(response)
      }
    })
  }

  updateUser = (user) => {
    this.setState({user})
  }
  
  handleSearch = (searchText) => {
    this.setState({searchText})
  }

  handleLogin = () => {
      this.setState({isLoggedIn: true})
  }
  
  //delete token here
  handleLogout = () => {
    this.setState({isLoggedIn: false})
    localStorage.removeItem('token')
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
            isLoggedIn={this.state.isLoggedIn}/> 
            <Route 
              path='/home'
              render={(routerProps) => 
              <Home {...routerProps} getSelectedActivities={this.getSelectedActivities}/>}
            />
            <Route 
              path='/login' 
              render={ (routerProps) => <Login {...routerProps} 
                                          login={this.login}
                                          handleLogIn={this.handleLogin}/>} 
            />  
            <Route 
              exact path='/activities'
              render={ (routerProps) => <ActivityContainer 
                                activities={
                                  this.state.searchText === '' 
                                  ? this.state.activities 
                                  : this.state.activities.filter(activity => activity.tags.includes(this.state.searchText))
                                } 
                                {...routerProps}
                                location={this.state.location}
                                handleSearch={this.handleSearch}
                                getSelectedActivities={this.getSelectedActivities}/>} 
            />
            <Route 
              path='/signup' 
              render={(routerProps) => <Signup {...routerProps} 
                                        signUpUser={this.signNewUserUp} />} 
            />
            <Route 
              path='/profile' 
              render={(routerProps) => 
                <Profile {...routerProps} user={this.state.user} 
                    updateUser={this.updateUser}
                    isLoggedIn={this.state.isLoggedIn} /> 
                } 
            />
            {this.state.showError 
            ? <AlertMessage error={this.state.errorMessages} hideError={this.handleError}/> 
            : null }
            <Route 
              path='/logout'
              render={(routerProps) => < Logout {...routerProps} logout={this.handleLogout}/>}
            />
            {/* <Route path='activities/:id' render={ (routerProps) => <ActivityInfo />} />  */}
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
