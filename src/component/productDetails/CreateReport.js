import React from "react";
import { SelectForm } from "../productDetails/ButtonConfiguration";

export const Context = React.createContext();

class CreateReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      input: "",
      tableData: this.props.tableData,
      isButtonActive: [
        { name: "Name", isActive: false },
        { name: "Max Price", isActive: false },
        { name: "Average Price", isActive: false },
        { name: "Min Price", isActive: false }
      ],
      emailInputStatus: false,
      emailItems: [],
      emailInput: "",

      stateItems: [],
      stateInput: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);

    this.onActiveclassName = this.onActiveclassName.bind(this);
    this.emailInputStatus = this.emailInputStatus.bind(this);
    this.handleEmailInputChange = this.handleEmailInputChange.bind(this);
    this.handleEmailInputKeyDown = this.handleEmailInputKeyDown.bind(this);
    this.handleRemoveEmailItem = this.handleRemoveEmailItem.bind(this);

    this.handleStateInputChange = this.handleStateInputChange.bind(this);
    this.handleStateInputKeyDown = this.handleStateInputKeyDown.bind(this);
    this.handleRemoveStateItem = this.handleRemoveStateItem.bind(this);
  }

  handleInputChange(evt) {
    this.setState({ input: evt.target.value });
  }

  handleInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      const { value } = evt.target;

      this.setState(state => ({
        items: [...state.items, value],
        input: ""
      }));
    }

    if (
      this.state.items.length &&
      evt.keyCode === 8 &&
      !this.state.input.length
    ) {
      this.setState(state => ({
        items: state.items.slice(0, state.items.length - 1)
      }));
    }
  }

  handleRemoveItem(index) {
    return () => {
      this.setState(state => ({
        items: state.items.filter((item, i) => i !== index)
      }));
    };
  }

  emailInputStatus() {
    this.setState({
      emailInputStatus: !this.state.emailInputStatus
    });
  }

  handleEmailInputChange(evt) {
    this.setState({ emailInput: evt.target.value });
  }

  handleEmailInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      const { value } = evt.target;

      this.setState(state => ({
        emailItems: [...state.emailItems, value],
        emailInput: "",
        emailInputStatus: !state.emailInputStatus
      }));
    }

    if (
      this.state.emailItems.length &&
      evt.keyCode === 8 &&
      !this.state.emailInput.length
    ) {
      this.setState(state => ({
        emailItems: state.emailItems.slice(0, state.emailItems.length - 1)
      }));
    }
  }
  handleRemoveEmailItem(index) {
    return () => {
      this.setState(state => ({
        emailItems: state.emailItems.filter((item, i) => i !== index)
      }));
    };
  }

  handleStateInputChange(evt) {
    this.setState({ stateInput: evt.target.value });
  }

  handleStateInputKeyDown(evt) {
    if (evt.keyCode === 13) {
      const { value } = evt.target;

      this.setState(state => ({
        stateItems: [...state.stateItems, value],
        stateInput: ""
      }));
    }

    if (
      this.state.stateItems.length &&
      evt.keyCode === 8 &&
      !this.state.stateInput.length
    ) {
      this.setState(state => ({
        stateItems: state.stateItems.slice(0, state.stateItems.length - 1)
      }));
    }
  }

  handleRemoveStateItem(index) {
    return () => {
      this.setState(state => ({
        stateItems: state.stateItems.filter((item, i) => i !== index)
      }));
    };
  }

  onActiveclassName(index) {
    let copy = this.state.isButtonActive.slice();
    copy[index].isActive = !copy[index].isActive;
    this.setState({ isButtonActive: copy });
  }

  sendReport(email, product, data, valueFrom, valueTo) {
    fetch("http://159.89.106.160/products/sendemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({
        to: email,
        product: product,
        dates: `${valueFrom} ${valueTo}`,
        data: data.map((el, i) => {
          return {
            name: data[i].bannersName,
            max: data[i].productsMaxSum,
            min: data[i].productsMinSum
          };
        })
      })
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
      });
  }

  render() {
    const { product, handleReport, valueFrom, valueTo } = this.props;
    const {
      isButtonActive,
      stateItems,
      stateInput,
      items,
      input,
      emailItems,
      emailInputStatus,
      emailInput,
      tableData
    } = this.state;

    return (
      <Context.Consumer>
        {context => {
          return (
            <div className="popup">
              <div className="popup_inner">
                <p className="main_head_p">Create Report</p>
                <p className="product_head_p">{product}</p>
                <div className="field_block">
                  <p className="field_head_p">Period</p>
                  <SelectForm />
                </div>
                <div className="field_block">
                  <p className="field_head_p">State</p>
                  <label>
                    <ul>
                      {stateItems.map((item, i) => (
                        <li
                          key={i}
                          className="btn"
                          onClick={this.handleRemoveStateItem(i)}
                        >
                          <span>(x)</span>
                          {item}
                        </li>
                      ))}

                      {stateItems.length === 0 ? (
                        <input
                          value={stateInput}
                          onChange={this.handleStateInputChange}
                          onKeyDown={this.handleStateInputKeyDown}
                        />
                      ) : null}
                    </ul>
                  </label>
                </div>
                <div className="field_block city_block">
                  <p className="field_head_p">City</p>
                  <label>
                    <ul>
                      {items.map((item, i) => (
                        <li
                          key={i}
                          className="btn"
                          onClick={this.handleRemoveItem(i)}
                        >
                          <span>(x)</span>
                          {item}
                        </li>
                      ))}

                      <input
                        value={input}
                        onChange={this.handleInputChange}
                        onKeyDown={this.handleInputKeyDown}
                      />
                    </ul>
                  </label>
                </div>
                <div className="field_block">
                  <p className="field_head_p">Sort By</p>
                  <div className="btnField">
                    {isButtonActive.map((el, index) => (
                      <button
                        key={index}
                        onClick={() => this.onActiveclassName(index)}
                        className={`btn ${el.isActive ? "activeBtn" : ""}`}
                      >
                        {el.name}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="field_block">
                  <p className="field_head_p">Email</p>
                  <label>
                    <ul>
                      {emailItems.map((item, i) => (
                        <li
                          key={i}
                          className="btn"
                          onClick={this.handleRemoveEmailItem(i)}
                        >
                          <span>(x)</span>
                          {item}
                        </li>
                      ))}
                      {emailInputStatus ? (
                        <input
                          autoFocus
                          value={emailInput}
                          onChange={this.handleEmailInputChange}
                          onKeyDown={this.handleEmailInputKeyDown}
                        />
                      ) : null}

                      <button className="btn" onClick={this.emailInputStatus}>
                        +
                      </button>
                    </ul>
                  </label>
                </div>
                <div className="field_block sendData">
                  <button className="btnCancel" onClick={handleReport}>
                    Cancel
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      this.sendReport(
                        emailItems,
                        product,
                        tableData,
                        valueFrom,
                        valueTo
                      )
                    }
                  >
                    Create
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

export default CreateReport;
