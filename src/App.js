import React, { Component } from "react";
import "./styles/css/App.css";
import Header from "./component/header/Header";
import Navigation from "./component/navigation/Navigation";
import Products from "./component/products/Products";
import ProductDetails from "./component/productDetails/ProductDetails";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

export const Context = React.createContext();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
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
