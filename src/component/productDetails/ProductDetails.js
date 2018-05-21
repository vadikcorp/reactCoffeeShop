import React, { Component } from "react";
import TableCalc from "../productDetails/TableCalc";
import { ButtonConfiguration } from "../productDetails/ButtonConfiguration";
import TableLoad from "../productDetails/TableLoad";
import ProductHeader from "../productDetails/ProductHeader";

import CreateReport from "../productDetails/CreateReport";

export const Context = React.createContext();

class productDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data: null,
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
      createReport: false,
      productPriceWeek: [],

      valueFrom: null,
      valueTo: null
    };

    this.storeProductsData = this.storeProductsData.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.handleReport = this.handleReport.bind(this);
    this.handleDataPicker = this.handleDataPicker.bind(this);
  }

  componentDidMount() {
    setTimeout(() => this.setState({ isLoading: false }), 1500);
    const id = this.props.match.params.id;
    fetch(`http://159.89.106.160/products/${id}`)
      .then(response => response.json())
      .then(this.storeProductsData)
      .then(data => this.setState({ data }));
  }

  storeProductsData(data, productPriceWeekNew) {
    const product = data.product.name;
    let productsData = data.data;

    const bannersName = productsData.map(el => el.banner.name);

    productsData.pricingDataByWeek =
      productPriceWeekNew || productsData.pricingDataByWeek;

    const productPrice = productsData.map(el =>
      el.pricingDataByWeek.map(item => item.price)
    );

    // array of pricingDataByWeek -> week

    let productPriceWeek = productsData.map(el =>
      el.pricingDataByWeek.map(item => item.week)
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
      productsAverageTotal,
      productPriceWeek,
      data
    });

    return data;
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
    let status = this.state.createReport;
    this.setState({
      createReport: !status
    });
  }

  handleDataPicker(valueFrom, valueTo) {
    this.setState({
      valueFrom: valueFrom,
      valueTo: valueTo
    });
  }

  render() {
    let valueObj = {
      ...this.state,
      onSearchChange: event => this.onSearchChange(event),
      sortBy: key => this.sortBy(key),
      handleReport: () => this.handleReport(),
      handleDataPicker: (valueFrom, valueTo) =>
        this.handleDataPicker(valueFrom, valueTo),
      storeProductsData: (data, productPriceWeekNew) =>
        this.storeProductsData(data, productPriceWeekNew)
    };
    const { isLoading } = this.state;

    return (
      <Context.Provider value={valueObj}>
        <div className="hero loader">
          {!isLoading ? (
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
                    tableData={this.state.tableData}
                    valueFrom={this.state.valueFrom}
                    valueTo={this.state.valueTo}
                  />
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </Context.Provider>
    );
  }
}

export default productDetails;
