import React from "react";
import { Context } from "../productDetails/ProductDetails";

const TableCalcNumber = () => {
  return (
    <Context.Consumer>
      {context => {
        return (
          <tr className="trData">
            <td>{context.product}</td>
            <td className="taright">{`$${context.productsMaxSumTotal}`}</td>
            <td className="taright">{`$${context.productsAverageTotal}`}</td>
            <td className="taright">{`$${context.productsMinSumTotal}`}</td>
          </tr>
        );
      }}
    </Context.Consumer>
  );
};

const TableCalc = () => {
  return (
    <Context.Consumer>
      {context => {
        return (
          <div className="tableCalc">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th className="taright">Max Price</th>
                  <th className="taright">Average Price</th>
                  <th className="taright">Min Price</th>
                </tr>
              </thead>
              <tbody>
                <TableCalcNumber />
              </tbody>
            </table>
          </div>
        );
      }}
    </Context.Consumer>
  );
};

export default TableCalc;
