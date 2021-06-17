import './App.css';
import { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
// , Redirect
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
// const favoritesUrl = 'http://localhost:3000/favorites'
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
    isLoggedIn: false,
    location: ''
  }

  componentDidMount() {
    // this.getAllActivities();
    // this.getFavorites();
    
  }

  getAllActivities = () => {
    console.log('getting all activities is no longer a thing')
    // fetch(activitiesUrl)
    // .then(res => res.json())
    // .then(activities => this.setState({activities}))
  }

  getSelectedActivities = (location) => {
    fetch(`${activitiesUrl}/${location}`)
    .then(res => res.json())
    .then(results => {
      console.log(results.data)
      this.setState({activities: results.data, location})
    })
  }

  getFavorites = () => {
    console.log("getting favorites")
    // if(localStorage.token){
    //   fetch(favoritesUrl, {
    //     headers: {
    //       Authorization: `Bearer ${localStorage.token}`
    //   }
    //   })
    //   .then(res => res.json())
    //   .then(result => {
    //     result.error 
    //     ? this.setState({showError: true, errorMessage: [result.error]})
    //     : this.handleLogin(); console.log(result)
    //   })
    // }
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

  updateUser = (user) => {
    this.setState({user})
  }
  
  handleSearch = (searchText) => {
    console.log(this.state.activities)
    this.setState({searchText})
    // const filteredActivities = [...this.state.activities].filter(activity => activity.tags.includes(searchText))
    // this.setState({activities: filteredActivities})
  }

  handleLogin = () => this.setState({isLoggedIn: true})
  
  //delete token here
  handleLogout = () => this.setState({isLoggedIn: false})
  
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
              render={(routerProps) => 
              <Home {...routerProps} getSelectedActivities={this.getSelectedActivities}/>}
            />
            <Route 
              path='/login' 
              render={ (routerProps) => <Login {...routerProps} 
                                          login={this.login}
                                          // isLoggedIn={this.state.isLoggedIn}
                                          handleLogIn={this.handleLogin}/>} 
            />  
            <Route 
              exact path='/activities'
              render={ () => <ActivityContainer 
                                activities={
                                  this.state.searchText === '' 
                                  ? this.state.activities 
                                  : this.state.activities.filter(activity => activity.tags.includes(this.state.searchText))
                                } 
                                location={this.state.location}
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
               <Profile {...routerProps} 
                user={this.state.user}
                updateUser={this.updateUser} />
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
