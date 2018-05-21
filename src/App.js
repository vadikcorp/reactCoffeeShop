import React, { Component } from "react";
import "./styles/css/App.css";
import Header from "./component/header/Header";
import Navigation from "./component/navigation/Navigation";
import Products from "./component/products/Products";
import ProductDetails from "./component/productDetails/ProductDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import americano from "./styles/img/americano.png";
import cappuccino from "./styles/img/cappuccino.png";
import doppio from "./styles/img/doppio.png";
import expresso from "./styles/img/espresso.png";
import lango from "./styles/img/lango.png";
import ristretto from "./styles/img/ristretto.png";

export const Context = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      coffee: [americano, cappuccino, doppio, expresso, lango, ristretto]
    };

    this.storeProducts = this.storeProducts.bind(this);
  }

  componentWillMount() {
    fetch("http://159.89.106.160/products")
      .then(response => response.json())
      .then(this.storeProducts);
  }

  storeProducts(data) {
    let products = data.data;
    this.setState({ products });
  }

  render() {
    let valueObj = { ...this.state };
    return (
      <Context.Provider value={valueObj}>
        <div>
          <Header />
          <Navigation />
          <div className="hero">
            <div className="container">
              <div className="row">
                <Router>
                  <Switch>
                    <Route exact path="/" component={Products} />
                    <Route path="/products/:id" component={ProductDetails} />
                    <Route component={NoMatch} />
                  </Switch>
                </Router>
              </div>
            </div>
          </div>
        </div>
      </Context.Provider>
    );
  }
}

export default App;

const NoMatch = ({ location, match }) => (
  <div>
    <h3>
      No match for <code>{location.pathname}</code>
    </h3>
  </div>
);
