import React from "react";
import { Context } from "../productDetails/ProductDetails";

const TableLoadNumber = ({ index, productsName }) => {
  return (
    <Context.Consumer>
      {context => {
        const maxSum = context.tableData.map(el => el.productsMaxSum);
        const minSum = context.tableData.map(el => el.productsMinSum);
        const avg = context.tableData.map(el => el.productsAverage);
        let stylesMax = {
          color:
            context.productsMaxSumTotal === maxSum[index]
              ? "rgba(80, 77, 212, .8)"
              : ""
        };
        let stylesMin = {
          color:
            context.productsMinSumTotal === minSum[index]
              ? "rgba(80, 77, 212, .8)"
              : ""
        };
        return (
          <tr className="trData">
            <td>{productsName}</td>
            <td style={stylesMax} className="taright">{`$${maxSum[index]}`}</td>
            <td className="taright">{`$${avg[index]}`}</td>
            <td style={stylesMin} className="taright">{`$${minSum[index]}`}</td>
          </tr>
        );
      }}
    </Context.Consumer>
  );
};

const TableLoad = ({ tableData }) => {
  const isSearched = searchTerm => item => {
    return item.toLowerCase().includes(searchTerm.toLowerCase());
  };

  return (
    <Context.Consumer>
      {context => {
        const data = context.tableData.map(el => el.bannersName);
        return (
          <div className="tableLoad">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th
                    onClick={() => context.sortBy("productsMaxSum")}
                    className="taright"
                  >
                    Max Price
                  </th>
                  <th
                    onClick={() => context.sortBy("productsAverage")}
                    className="taright"
                  >
                    Average Price
                  </th>
                  <th
                    onClick={() => context.sortBy("productsMinSum")}
                    className="taright"
                  >
                    Min Price
                  </th>
                </tr>
              </thead>
              <tbody>
                {data
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
