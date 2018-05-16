import React from "react";
import { Context } from "../productDetails/ProductDetails";

const ProductHeader = () => {
  return (
    <Context.Consumer>
      {context => {
        return (
          <p className="hero_header">
            <span className="hero_name">{context.product}</span>
            {/* <i className="fa fa-arrow-left" />
              <i className="fa fa-arrow-right" /> */}
          </p>
        );
      }}
    </Context.Consumer>
  );
};

export default ProductHeader;
