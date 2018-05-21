import React from "react";
import { Context } from "../productDetails/ProductDetails";

export class SelectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      valueTo: "choose",
      valueFrom: "choose"
    };
    this.handleChangeTo = this.handleChangeTo.bind(this);
    this.handleChangeFrom = this.handleChangeFrom.bind(this);
  }

  handleChangeTo(event) {
    this.setState({ valueTo: event.target.value });
  }
  handleChangeFrom(event) {
    this.setState({ valueFrom: event.target.value });
  }

  render() {
    const { valueFrom, valueTo } = this.state;

    let styles = {
      color: "#232323",
      fontFamily: "Montserrat",
      fontSize: "14px",
      lineHeight: "20px"
    };
    let optionStyle = {
      backgroundColor: "rgba(87, 89, 159, 0.05)",
      color: "#504dd4",
      marginRight: "10px"
    };

    return (
      <Context.Consumer>
        {context => {
          const refreshData = () => {
            let productPriceWeek = context.productPriceWeek;
            let indexFrom = productPriceWeek[0].indexOf(this.state.valueFrom);
            let indexTo = productPriceWeek[0].indexOf(this.state.valueTo);
            let slice = productPriceWeek[0].slice(indexFrom, indexTo + 1);

            // console.log("refreshData");
            let data = context.data;
            const productsData = data.data;

            let returnData = productsData.map(element =>
              element.pricingDataByWeek.filter((el, i) =>
                slice.some(elem => elem === el.week)
              )
            );
            let newData = context.data.data.map(
              (el, i) => (el.pricingDataByWeek = returnData[i])
            );

            context.storeProductsData(context.data, newData);
            context.handleDataPicker(this.state.valueFrom, this.state.valueTo);
          };
          const arrWeek = context.productPriceWeek;
          return (
            <div className="dataPicker">
              <label>
                <span style={styles}>From: </span>
                <select
                  style={optionStyle}
                  className="btn"
                  value={valueFrom}
                  onChange={this.handleChangeFrom}
                >
                  {arrWeek[0].map((el, i) => (
                    <option
                      style={optionStyle}
                      className="btn"
                      key={i}
                      value={el}
                    >
                      {el}
                    </option>
                  ))}
                </select>
                <span style={styles}> To: </span>
                <select
                  style={optionStyle}
                  className="btn"
                  value={valueTo}
                  onChange={this.handleChangeTo}
                >
                  {arrWeek[0].map((el, i) => (
                    <option
                      style={optionStyle}
                      className="btn"
                      key={i}
                      value={el}
                    >
                      {el}
                    </option>
                  ))}
                </select>
              </label>
              <button onClick={refreshData} className="btn">
                Refresh Table
              </button>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}

export class ButtonConfiguration extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="btnConfiguration">
              <div className="searchField">
                <input
                  type="text"
                  value={context.searchTerm}
                  onChange={context.onSearchChange}
                />
              </div>
              <div className="buttons">
                <SelectForm />
                <div className="createReport">
                  <button className="btn" onClick={context.handleReport}>
                    Create Report
                  </button>
                </div>
              </div>
            </div>
          );
        }}
      </Context.Consumer>
    );
  }
}
