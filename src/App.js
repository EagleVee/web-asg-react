import React, { Component } from "react";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import createStore from "./Redux";
import RootContainer from "./Containers/RootContainer";
// create our store
export const store = createStore();

class App extends Component {
  render() {
    console.log("APP");
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}

export default App;
