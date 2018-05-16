import React from "react";
import { Link } from "react-router-dom";
// import productService from "../common/ProductService";
import { Context } from "../../App";

const Home = () => {
  return (
    <Context.Consumer>
      {context => {
        return (
          <div className="home">
            <p className="hero_name">Home</p>
            <div className="hero_wrapper">
              <div className="col-lg-12">
                <div className="row">
                  {context.products.map((el, i) => {
                    return (
                      <div key={i} className="col-lg-2">
                        <Link to={`/products/${el.id}`}>
                          <div className="box">
                            <div className="box_content">
                              <div className="fa fa-coffee" />
                              <p>{el.name}</p>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}

                  <div className="col-lg-2">
                    <div className="box">
                      <div className="box_content">
                        <p className="plus">+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Context.Consumer>
  );
};

export default Home;
