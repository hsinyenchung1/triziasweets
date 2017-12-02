import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [{
        squares: Array(9).fill(null),
        row: 0,
        col: 0,
      }],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    console.log('row: ' + getCurrentRow(i));
    console.log('col: ' + getCurrentCol(i));
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        row: getCurrentRow(i),
        col: getCurrentCol(i),
      }]),
      row: getCurrentRow,
      col: getCurrentCol,
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }
  
  render() {
    const history = this.state.history;
    const row = this.state.row;
    const col = this.state.col;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    let v = 0;

     const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
        console.log('step:');
        console.log(step);
        console.log('move:');
        console.log(move);
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc} row: {step.row} col: {step.col}</button>
        </li>
      );
    });

    // const test = return(<button>I love react js</button>);

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
// Main Component
class App extends React.Component {
  render() {
   
    return (
      <div>
        <Header />
        <Order/>
        <Footer />
      </div>
    );
  }
}




class Order extends React.Component {


  constructor(props){
    super(props);
    this.state = {
      emailAddress: '',
      contactNumber: '',
      name: '',
      weChatID: '',
      message: '',
      checkbox:'', 
      orders: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log(target.value);
    console.log(target.checked);
    console.log(name);
    this.setState({ 
      [name]: value
    });
  }

  handleSubmit(event){
    fetch('localhost:4000/api/order').then(function(data){
      console.log(data);
      return data.json();
    }).then(json => {
      this.setState({
          result: json
      });
    });
    console.log(this.state);
    event.preventDefault();
  }

  render() {
   var orders = this.state.orders;
   orders = orders.map(function(order, index){
      return(
        <li key={index}>
          <span className={order.available}></span>
          <span className={order.available}>{order.name}</span>
          <span className={order.available}>order.email</span>
        </li>
      )
   });
    return (
      <div id="order-container">
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
                <label htmlFor="emailAddress">Email address</label>
                <input 
                type="text" 
                className="form-control" 
                name="emailAddress" 
                id="exampleInputEmail1" 
                aria-describedby="emailHelp" 
                placeholder="Enter email"
                value={this.state.emailAddress}
                onChange={this.handleChange.bind(this)} 
                />
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="contactNumber">Contact Number</label>
                <input 
                type="text" 
                className="form-control"
                name="contactNumber" 
                id="contactNumber" 
                aria-describedby="emailHelp" 
                placeholder="Enter number"
                value={this.state.contactNumber} 
                onChange={this.handleChange.bind(this)} />
                <small id="ContactHelp" className="form-text text-muted">We'll never share your contact number with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                type="text" 
                className="form-control" 
                name="name" id="name" 
                aria-describedby="emailHelp" 
                placeholder="Enter name" 
                value={this.state.name} 
                onChange={this.handleChange.bind(this)}/>
                <small id="NameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="weChatID">WeChat ID</label>
                <input 
                type="text" 
                className="form-control" 
                name="weChatID" 
                id="weChatID" 
                aria-describedby="emailHelp" 
                placeholder="Enter wechat ID" 
                value={this.state.weChatID} 
                onChange={this.handleChange.bind(this)}/>
                <small id="eWeChatHelp" className="form-text text-muted">We'll add your WeChat for more information.</small>
            </div>
            <div className="form-group">
                <textarea 
                className="form-control" 
                name="message" 
                id="exampleFormControlTextarea1" 
                rows="3"
                value={this.state.message} 
                onChange={this.handleChange.bind(this)}>
                </textarea>
                <small id="emailHelp" className="form-text text-muted">We'll add your WeChat for more information.</small>
            </div>
            <div className="form-check">
                <label className="form-check-label">
                    <input 
                    type="checkbox" 
                    name="checkbox" 
                    className="form-check-input"
                    value={this.state.checkbox} 
                    onChange={this.handleChange.bind(this)}/> Comfirm
                </label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
        <ul>{orders}</ul>
      </div>
    );
  }
}



// Header Component
class Header extends React.Component {
  render() {
   
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-info">
          <a className="navbar-brand" href="#">Trizia Sweets</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                      <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link" href="#">Link</a>
                  </li>
                  {/*<li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Dropdown
                      </a>
                      <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                          <a className="dropdown-item" href="#">Action</a>
                          <a className="dropdown-item" href="#">Another action</a>
                          <div className="dropdown-divider"></div>
                          <a className="dropdown-item" href="#">Something else here</a>
                      </div>
                  </li>
                  <li className="nav-item">
                      <a className="nav-link disabled" href="#">Disabled</a>
                  </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                  <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                  <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>*/}
              </ul>
          </div>
      </nav>
    );
  }
}

// Footer Component
class Footer extends React.Component {
  render() {
   
    return (
      <footer className="page-footer indigo center-on-small-only pt-0">

          <div className="container">

              <div className="row">

                  <div className="col-md-12">

                      <div className="footer-socials mb-5 flex-center">

                          <a className="icons-sm fb-ic"><i className="fa fa-facebook fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm tw-ic"><i className="fa fa-twitter fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm gplus-ic"><i className="fa fa-google-plus fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm li-ic"><i className="fa fa-linkedin fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm ins-ic"><i className="fa fa-instagram fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm pin-ic"><i className="fa fa-pinterest fa-lg white-text"> </i></a>
                      </div>
                  </div>
              </div>
          </div>
          <div className="footer-copyright">
              <div className="container-fluid">
                  © 2016 Copyright: <a href="https://www.MDBootstrap.com"> MDBootstrap.com </a>
              </div>
          </div>
      </footer>
    );
  }
}


// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function getCurrentRow(index){
	let row = index / 3;
	return Math.floor(row);
}

function getCurrentCol(index){
	let col = index % 3;
	return col;
}