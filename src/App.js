import './App.css';
import { Component } from 'react';
import ActivityContainer from './components/ActivityContainer';
import Header from './components/Header';
import SearchBar from './components/SearchBar'

const activitiesUrl = 'http://localhost:3000/activities'

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

  render(){
    return (
      <div className="App">
        <Header /> 
        <SearchBar handleSearch={this.handleSearch}/>
        <ActivityContainer activities={this.state.activities}/>
      </div>
    );
  }
}

export default App;
