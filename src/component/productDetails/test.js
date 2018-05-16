let MC = MC || {}; // You can totally put React components into a parent object.
// The above stands for "Magic Components" because I can't think of anything better.
MC.tables = {};

MC.tables.Sorted = class extends React.Component {
  constructor() {
    super(); // Gotta call this first when doing a constructor.
    this.state = {
      sortType: "number",
      isAsc: true
    };
  }

  componentWillMount() {
    this.setState({ data: tableData });
  }

  componentDidMount() {
    // Using jQuery only so we can use this plugin, but jQuery would probably be
    // present in a Production environment anyway.
    $("#test-table").stickyTableHeaders();
    //console.log(this.props.data.entries);
  }

  _getSortInfo() {
    return {
      sortType: this.state.sortType,
      isAsc: this.state.isAsc
    };
  }

  _setSortInfo(type = "number", isAsc = true) {
    this.setState({
      sortType: type,
      isAsc: isAsc
    });
  }

  _getSortedArray(arrItems, strOrderBy = "number") {
    let arrSorted = _.sortBy(arrItems, function(item) {
      return item[strOrderBy];
    });
    if (!this.state.isAsc) arrSorted.reverse();
    return arrSorted;
  }

  _getColumns() {
    let that = this;
    //console.log('getHeaders()', that.state.data.headers);

    return that.state.data.columns.map((column, i) => {
      return (
        <MC.tables.SortHeader
          // The key is just for the sake of the array. It's not
          // a prop and cannot be used inside the component.
          key={i}
          setSortInfo={this._setSortInfo.bind(this)}
          getSortInfo={this._getSortInfo.bind(this)}
          text={column.title}
          iconClass={column.iconClass}
          sortType={column.sortType}
        />
      );
    });
  }

  _getRows() {
    let that = this;
    return this._getSortedArray(this.props.data.rows, this.state.sortType).map(
      (row, i) => {
        return (
          <tr key={i}>
            {this.props.data.columns.map((column, j) => {
              return <td key={j}>{row[column.sortType]}</td>;
            })}
          </tr>
        );
      }
    );
  }

  render() {
    let that = this;
    let columns = that._getColumns();
    let rows = that._getRows();

    return (
      <div id="wrapper" className="wrapper">
        <table id="test-table" className="table table-striped">
          <thead className="thead-dark">
            <tr>{columns}</tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
      </div>
    );
  }
};

let tableData = {
  columns: [
    {
      title: "#",
      sortType: "number",
      iconClass: "fa-sort-numeric-"
    },
    {
      title: "First",
      sortType: "first",
      iconClass: "fa-sort-alpha-"
    },
    {
      title: "Last",
      sortType: "last",
      iconClass: "fa-sort-alpha-"
    }
  ],
  rows: [
    {
      first: "William",
      last: "Hartnell",
      number: 1
    },
    {
      first: "Patrick",
      last: "Troughton",
      number: 2
    },
    {
      first: "Jon",
      last: "Pertwee",
      number: 3
    },
    {
      first: "Tom",
      last: "Baker",
      number: 4
    },
    {
      first: "Peter",
      last: "Davison",
      number: 5
    },
    {
      first: "Colin",
      last: "Baker",
      number: 6
    },
    {
      first: "Sylvester",
      last: "McCoy",
      number: 7
    },
    {
      first: "Paul",
      last: "McGann",
      number: 8
    },
    {
      first: "Christopher",
      last: "Eccleston",
      number: 9
    },
    {
      first: "David",
      last: "Tennant",
      number: 10
    },
    {
      first: "Matt",
      last: "Smith",
      number: 11
    },
    {
      first: "Peter",
      last: "Capaldi",
      number: 12
    },
    {
      first: "Jodie",
      last: "Whittaker",
      number: 13
    }
  ]
};

MC.tables.SortHeader = class extends React.Component {
  _handleClick() {
    let sortInfo = this.props.getSortInfo();
    let isAsc = sortInfo.isAsc;

    if (this.props.sortType === sortInfo.sortType) {
      //console.log("Same sort type. Reverse the order from whatever it was.");
      isAsc = !isAsc;
    } else {
      //console.log("They're different. New sort type, always start with ascending.");
      isAsc = true;
    }
    this.props.setSortInfo(this.props.sortType, isAsc);
  }

  render() {
    let sortInfo = this.props.getSortInfo();
    let sortClass = "up";
    let activeClasses = "";
    if (this.props.sortType === sortInfo.sortType) {
      activeClasses = "bg-success border-success";
      sortClass = sortInfo.isAsc ? "up" : "down";
    }

    return (
      <th
        key={this.props.key}
        className={activeClasses}
        scope="col"
        onClick={() => this._handleClick()}
      >
        {this.props.text}{" "}
        <i className={"fas " + this.props.iconClass + sortClass} />
      </th>
    );
  }
};

ReactDOM.render(
  <MC.tables.Sorted data={tableData} />,
  document.getElementById("magic-table")
);
