import React, { Component } from "react";
import TableCalc from "../productDetails/TableCalc";
import ButtonConfiguration from "../productDetails/ButtonConfiguration";
import TableLoad from "../productDetails/TableLoad";
import ProductHeader from "../productDetails/ProductHeader";

import CreateReport from "../productDetails/CreateReport";

export const Context = React.createContext();

class productDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      product: "",
      productsMaxSumTotal: null,
      productsMinSumTotal: null,
      productsAverageTotal: null,
      searchTerm: "",
      direction: {
        productsMaxSum: "asc",
        productsMinSum: "asc",
        productsAverage: "asc"
      },
      createReport: false
    };

    this.storeProductsData = this.storeProductsData.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleReport = this.handleReport.bind(this);
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

    // "DataUnStr" - data un structured
    const DataUnStr = {
      bannersName,
      productsMaxSum,
      productsMinSum,
      productsAverage
    };

    // tableData structured array of sorting etc
    let tableData = [];
    for (let i = 0; i <= 7; i++) {
      let obj = {
        bannersName: "",
        productsMaxSum: null,
        productsMinSum: null,
        productsAverage: null
      };
      for (let key in DataUnStr) {
        obj[key] = DataUnStr[key].shift();
      }
      tableData.push(obj);
    }

    this.setState({
      product,
      tableData,
      productsMaxSumTotal,
      productsMinSumTotal,
      productsAverageTotal
    });
  }

  onSearchChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  sortBy(key) {
    const data = this.state.tableData.slice();

    this.setState({
      tableData: data.sort(
        (a, b) =>
          this.state.direction[key] === "asc"
            ? parseFloat(a[key]) - parseFloat(b[key])
            : parseFloat(b[key]) - parseFloat(a[key])
      ),
      direction: {
        [key]: this.state.direction[key] === "asc" ? "desc" : "asc"
      }
    });
  }

  handleReport() {
    this.setState({
      createReport: !this.state.createReport
    });
    console.log(this.state.createReport);
  }

  render() {
    let valueObj = {
      ...this.state,
      onSearchChange: event => this.onSearchChange(event),
      sortBy: key => this.sortBy(key),
      handleReport: () => this.handleReport()
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
              {this.state.createReport ? (
                <CreateReport
                  product={this.state.product}
                  handleReport={this.handleReport}
                />
              ) : null}
            </div>
          </div>
        </div>
      </Context.Provider>
    );
  }
}

export default productDetails;
