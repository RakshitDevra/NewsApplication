
import './App.css';    // 9c229bb4dead4886a9f38f9078780836

import React, { Component } from 'react';
import NavBar from './components/NavBar.js';
import News from './components/News.js';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter as Router,

  Routes,
  Route
} from "react-router-dom";
export class App extends Component {
  pageSize = 10;
  apiKey ="72a9a137994944eea02d8c245c5f849a";
  state = {
    progress: 0
  }
  setProgress = (progress) => {

    this.setState({ progress: progress })
  }
  render() {
    return (
      <div>
        <Router>

          <NavBar />
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}

          />

          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="DCE" pageSize={this.pageSize} country="in" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="HUDS" pageSize={this.pageSize} country="in" category="business" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="EE" pageSize={this.pageSize} country="in" category="entertainment" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="HWIXH" pageSize={this.pageSize} country="in" category="sports" />} />
            <Route path="/health" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="URHFUH" pageSize={this.pageSize} country="in" category="health" />} />
            <Route path="/science" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="JOIFRJO" pageSize={this.pageSize} country="in" category="science" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress}  apiKey={this.apiKey} key="HUEHHUEH9" pageSize={this.pageSize} country="in" category="technology" />} />

          </Routes>
        </Router>
      </div>
    )
  }
}

export default App

