import React from "react";
import { Context } from "../productDetails/ProductDetails";

const ButtonConfiguration = () => {
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
              <div className="dataPicker">
                <button>05/02/2018 -> 20/02/2018</button>
              </div>
              <div className="createReport">
                <button>Create Report</button>
              </div>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
};

export default ButtonConfiguration;
