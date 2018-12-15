import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import data from "./data.json";
import "./App.css";

class App extends Component {
state = {
  data,
  score: 0,
  topScore: 0
};

componentDidMount() {
  this.setState({ data: this.shuffleData(this.state.data) });
}

CorrectGuess = newData => {
  const { topScore, score } = this.state;
  const newScore = score + 1;
  const newTopScore = newScore > topScore ? newScore : topScore;
  this.setState({
    data: this.shuffleData(newData),
    score: newScore,
    topScore: newTopScore
  });
};

IncorrectGuess = data => {
  this.setState({
    data: this.resetData(data),
    score: 0
  });
};

resetData = data => {
  const resetData = data.map(item => ({ ...item, clicked: false }));
  return this.shuffleData(resetData);
};

shuffleData = data => {
  let i = data.length - 1;
  while (i > 0) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = data[i];
    data[i] = data[j];
    data[j] = temp;
    i--;
  }
  return data;
};

handleItemClick = id => {
  let guessedCorrectly = false;
  const newData = this.state.data.map(item => {
    const newItem = { ...item };
    if (newItem.id === id) {
      if (!newItem.clicked) {
        newItem.clicked = true;
        guessedCorrectly = true;
      }
    }
    return newItem;
  });
  guessedCorrectly
    ? this.CorrectGuess(newData)
    : this.IncorrectGuess(newData);
};

render() {
  return (
    <div>
      <Wrapper>
      <Header score={this.state.score} topScore={this.state.topScore} />
        {this.state.data.map(item => (
          <Card
            key={item.id}
            id={item.id}
            shake={!this.state.score && this.state.topScore}
            handleClick={this.handleItemClick}
            image={item.image}
          />
        ))}
      </Wrapper>
     
    </div>
  );
}
}

export default App;