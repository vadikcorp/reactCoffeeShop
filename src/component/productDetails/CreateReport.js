import React from "react";

class CreateReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      // itemsState: [],
      // itemsCity: [],
      // itemsEmail: [],
      focused: false,
      input: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
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

  sendReport() {
    console.log("Report send");
  }
  render() {
    const { product, handleReport } = this.props;
    const styles = {
      container: {
        border: "1px solid #ddd",
        padding: "5px",
        borderRadius: "5px"
      },

      items: {
        display: "inline-block",
        padding: "2px",
        border: "1px solid blue",
        fontFamily: "Helvetica, sans-serif",
        borderRadius: "5px",
        marginRight: "5px",
        cursor: "pointer"
      },

      input: {
        outline: "none",
        border: "none",
        fontSize: "14px",
        fontFamily: "Helvetica, sans-serif"
      }
    };
    return (
      <div className="popup">
        <div className="popup_inner">
          <h4>Create Report</h4>
          <h5>{product}</h5>
          <div>
            <h6>period</h6>
            <button>x 05/02/2018 -> 20/02/2018</button>
          </div>
          <div>
            <h6>state</h6>
            <label>
              <ul style={styles.container}>
                {this.state.items.map((item, i) => (
                  <li
                    key={i}
                    style={styles.items}
                    onClick={this.handleRemoveItem(i)}
                  >
                    {item}
                    <span>(x)</span>
                  </li>
                ))}
                <input
                  style={styles.input}
                  value={this.state.input}
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleInputKeyDown}
                />
              </ul>
            </label>
          </div>
          <div>
            <h6>city</h6>
            <label>
              <ul style={styles.container}>
                {this.state.items.map((item, i) => (
                  <li
                    key={i}
                    style={styles.items}
                    onClick={this.handleRemoveItem(i)}
                  >
                    {item}
                    <span>(x)</span>
                  </li>
                ))}
                <input
                  style={styles.input}
                  value={this.state.input}
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleInputKeyDown}
                />
              </ul>
            </label>
          </div>
          <div>
            <h6>sort by</h6>
            <button>name</button>
            <button>max price</button>
            <button>average price</button>
            <button>min price</button>
          </div>
          <div>
            <h6>email</h6>
            <label>
              <ul style={styles.container}>
                {this.state.items.map((item, i) => (
                  <li
                    key={i}
                    style={styles.items}
                    onClick={this.handleRemoveItem(i)}
                  >
                    {item}
                    <span>(x)</span>
                  </li>
                ))}
                <input
                  style={styles.input}
                  value={this.state.input}
                  onChange={this.handleInputChange}
                  onKeyDown={this.handleInputKeyDown}
                />
                <button>+</button>
              </ul>
            </label>
          </div>
          <button onClick={handleReport}>close me</button>
          <button onClick={this.sendReport}>create</button>
        </div>
      </div>
    );
  }
}

export default CreateReport;
