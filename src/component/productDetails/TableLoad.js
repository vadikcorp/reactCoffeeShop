import React from "react";
import { Context } from "../productDetails/ProductDetails";

const TableLoadNumber = ({ index, productsName }) => {
  return (
    <Context.Consumer>
      {context => {
        let stylesMax = {
          color:
            context.productsMaxSumTotal === context.productsMaxSum[index]
              ? "rgba(80, 77, 212, .8)"
              : ""
        };
        let stylesMin = {
          color:
            context.productsMinSumTotal === context.productsMinSum[index]
              ? "rgba(80, 77, 212, .8)"
              : ""
        };
        return (
          <tr className="trData">
            <td>{productsName}</td>
            <td style={stylesMax} className="taright">{`$${
              context.productsMaxSum[index]
            }`}</td>
            <td className="taright">{`$${context.productsAverage[index]}`}</td>
            <td style={stylesMin} className="taright">{`$${
              context.productsMinSum[index]
            }`}</td>
          </tr>
        );
      }}
    </Context.Consumer>
  );
};

const TableLoad = () => {
  const isSearched = searchTerm => item => {
    return item.toLowerCase().includes(searchTerm.toLowerCase());
  };
  return (
    <Context.Consumer>
      {context => {
        return (
          <div className="tableLoad">
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
                {context.bannersName
                  .filter(isSearched(context.searchTerm))
                  .map((item, id) => (
                    <TableLoadNumber key={id} productsName={item} index={id} />
                  ))}
              </tbody>
            </table>
          </div>
        );
      }}
    </Context.Consumer>
  );
};

export default TableLoad;
