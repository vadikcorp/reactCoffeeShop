import React, { Component } from "react";
import TableCalc from "../productDetails/TableCalc";
import ButtonConfiguration from "../productDetails/ButtonConfiguration";
import TableLoad from "../productDetails/TableLoad";
import ProductHeader from "../productDetails/ProductHeader";

export const Context = React.createContext();

class productDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      bannersName: [],
      productsMaxSum: [],
      productsMinSum: [],
      productsMaxSumTotal: null,
      productsMinSumTotal: null,
      productsAverage: null,
      productsAverageTotal: null,
      searchTerm: ""
    };

    this.storeProductsData = this.storeProductsData.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    fetch(`http://159.89.106.160/products/${id}`)
      .then(response => response.json())
      .then(this.storeProductsData);
  }

  storeProductsData(data) {
    const product = data.product.name;
    const productsData = data.data;
    const bannersName = productsData.map(el => el.banner.name);
    const productPrice = productsData.map(el =>
      el.pricingDataByWeek.map(item => item.price)
    );

    // Array of max/min data
    const productsMaxSum = productPrice.map(el => Math.max.apply(null, el));
    const productsMinSum = productPrice.map(el => Math.min.apply(null, el));
    // Convert productsPrice into numbers
    const productsConvert = productPrice.map(el => el.map(num => Number(num)));
    // Find average
    const productsAverage = productsConvert.map(el => {
      const sum = el.reduce((a, b) => a + b, 0);
      return Number((sum / el.length).toFixed(2));
    });

    // Max/min number of array
    const productsMaxSumTotal = Math.max.apply(null, productsMaxSum);
    const productsMinSumTotal = Math.min.apply(null, productsMinSum);

    const productsAverageTotal = (
      productsAverage.reduce((a, b) => a + b, 0) / productsAverage.length
    ).toFixed(2);

    this.setState({
      product,
      bannersName,
      productsMaxSum,
      productsMinSum,
      productsMaxSumTotal,
      productsMinSumTotal,
      productsAverage,
      productsAverageTotal
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  render() {
    let valueObj = {
      ...this.state,
      onSearchChange: event => this.onSearchChange(event)
    };
    return (
      <Context.Provider value={valueObj}>
        <div className="hero">
          <div className="productDetails">
            <div className="container">
              <ProductHeader />
              <TableCalc />
              <ButtonConfiguration />
              <TableLoad />
            </div>
          </div>
        </div>
      </Context.Provider>
    );
  }
}

export default productDetails;
