import React from "react";
import axios from "axios";
import "./App.css";

class App extends React.Component {
  state = {
    advice: "",
    loading: true,
  };

  images = [
    "./images/37470-6-pikachu-transparent-background.png",
    "./images/406-4068340_go-to-image-la-cara-de-charmander.png",
    "./images/147-1474868_squirtle-squirtle-png.png",
    "./images/001Bulbasaur.png",
  ];
  size = ["105% 40%", "92% 40%", "98% 40%", "93% 40%"];
  color = ["#f7d339", "#F99341", "#98CBD9", "#89C6AC"];

  componentDidMount() {
    this.fetchAdvice();
  }

  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        this.setState({
          loading: false,
          advice: response.data.slip.advice,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  changeBackground = () => {
    var randomnumber =
      Math.floor(Math.random() * (this.images.length - 1 - 0 + 1)) + 0;

    document.getElementsByClassName(
      "pikachu-image"
    )[0].style.backgroundImage = `url(${this.images[randomnumber]})`;

    if (window.screen.width > 600) {
      document.getElementsByClassName(
        "pikachu-image"
      )[0].style.backgroundPosition = this.size[randomnumber];
    }

    document.getElementsByClassName("app")[0].style.backgroundColor =
      this.color[randomnumber];
  };

  render() {
    return (
      <div className="app">
        <div className="card">
          {this.state.loading ? (
            <h1 className="heading">Loading...</h1>
          ) : (
            <h1 className="heading">{this.state.advice}</h1>
          )}

          <button
            className="button"
            onClick={() => {
              this.setState({ loading: true });
              this.fetchAdvice();
            }}
          >
            <span>Well, next advice please</span>
          </button>
        </div>
        <div className="pikachu">
          <div className="pikachu-image" onClick={this.changeBackground}></div>
        </div>
        <div className="footer">
          <p className="footer-text">
            Made with 💕 and 4 slices of 🍕 by Ninjavin
          </p>
        </div>
      </div>
    );
  }
}

export default App;
