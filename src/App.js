import './App.css';
import { Component } from 'react';
import ActivityContainer from './components/ActivityContainer';
import Header from './components/Header';

const activitiesUrl = 'http://localhost:3000/activities'

class App extends Component {

  state = {
    activities: []
  }

  componentDidMount() {
    fetch(activitiesUrl)
    .then(res => res.json())
    .then(activities => this.setState({activities}))
  }

  render(){
    return (
      <div className="App">
        <Header /> 
        <ActivityContainer activities={this.state.activities}/>
      </div>
    );
  }
}

export default App;
