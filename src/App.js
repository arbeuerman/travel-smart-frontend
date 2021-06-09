import './App.css';
import { Component } from 'react';
import ActivityContainer from './components/ActivityContainer';

const activitiesUrl = 'http://localhost:3000/activities'

class App extends Component {

  componentDidMount() {
    fetch(activitiesUrl)
    .then(res => res.json())
    .then(console.log)
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          Header
        </header>
        <ActivityContainer/>
      </div>
    );
  }
}

export default App;
