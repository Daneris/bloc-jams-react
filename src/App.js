import React, { Component } from 'react';
import './App.css';
import {Route, Link} from "react-router-dom";
import Landing from "./components/Landing";
import Library from "./components/Library";
import Album from "./components/Album";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <nav>
            <button><Link to="/">Home</Link></button>
            <button><Link to="/library">Library</Link></button>

          </nav>
          <h1>Jams a music player</h1>
        </header>
        <main>
          <Route exact path="/" component={Landing} />
          <Route path="/library" component={Library} />
          <Route path="/album/:slug" component={Album} />
        </main>
      </div>
    );
  }
}

export default App;

//comment
//comment
