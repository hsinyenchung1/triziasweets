import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
      comfirm:'', 
      pickupDate:'', 
      pickupTime: '',
      validationFlag: true,
      submitedFlag: false,
      orders: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event){
      fetch('/api/order').then(function(data){
        return data.json();
      }).then(json => {
        console.log(json);
        this.setState({
            orders: json
        });
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({ 
      [name]: value
    });
  }

  handleSubmit(event){
    
    const currentOrder = this.state;
    let isFormValidate = true;
    
    for(var key in currentOrder){
      if(key === 'weChatID'){
        continue;
      }

      if(currentOrder[key] === null || currentOrder[key] === undefined || currentOrder[key] === ''){
        isFormValidate = false;
      }
    }

    this.setState({
      validationFlag: isFormValidate
    });

    if(isFormValidate){
      fetch("/api/order", {
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state)
      }).then(data =>{
        return data.json();
      }).then(response =>{
        this.setState({ 
          emailAddress: '',
          contactNumber: '',
          name: '',
          weChatID: '',
          message: '',
          comfirm: false, 
          pickupDate:'', 
          pickupTime: '',
          validationFlag: true,
          submitedFlag: true
        });
        console.log(response);
      });
    }

    event.preventDefault();
  }


  render() {
   var orders = this.state.orders;
   orders = orders.map(function(order, index){
      return(
        <li key={index}>
          <div>
              <div >name: {order.name}</div>
               <div >contact number: {order.contactNumber}</div>
               <div >message: {order.message}</div>
               <div >email address: {order.emailAddress}</div>
               <div >weChatID: {order.weChatID}</div>
               <div >pickupDate: {order.pickupDate}</div>
               <div >pickupTime: {order.pickupTime}</div>
               <div >orderDate: {order.orderDate}</div>
          </div>
         
        </li>
      )
   });

    var formStyle = {
      margin: '50px',
    }
    return (
      <div id="order-container" style={formStyle}>
        { !this.state.validationFlag ? <InvalidateMessage /> : null }
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
                <small className="form-text text-muted">Required field. We'll never share your email with anyone else.</small>
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
                <small className="form-text text-muted">Required field. We'll never share your contact number with anyone else.</small>
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
                <small className="form-text text-muted">Required field. We'll never share your email with anyone else.</small>
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
                <small className="form-text text-muted">We'll add your WeChat for more information.</small>
            </div>
            <div className="form-group">
                <label htmlFor="pickupDate">Pick up date</label>
                <input 
                type="date" 
                className="form-control" 
                name="pickupDate" 
                id="pickupDate" 
                aria-describedby="emailHelp" 
                placeholder="Pickup Date" 
                value={this.state.pickupDate} 
                onChange={this.handleChange.bind(this)}/>
                <small className="form-text text-muted">Required field.</small>
            </div>
            <div className="form-group">
                <label htmlFor="pickupTime">Pick up time</label>
                <input 
                type="time" 
                className="form-control" 
                name="pickupTime" 
                id="pickupTime" 
                aria-describedby="emailHelp" 
                placeholder="Pickup Time" 
                value={this.state.pickupTime} 
                onChange={this.handleChange.bind(this)}/>
                <small className="form-text text-muted">Required field.</small>
            </div>
            <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea 
                className="form-control" 
                name="message" 
                id="exampleFormControlTextarea1" 
                rows="3"
                value={this.state.message} 
                onChange={this.handleChange.bind(this)}>
                </textarea>
                <small className="form-text text-muted">Required field.</small>
            </div>
            <div className="form-check">
                <label className="form-check-label">
                    <input 
                    type="checkbox" 
                    name="comfirm" 
                    className="form-check-input"
                    value={this.state.comfirm} 
                    onChange={this.handleChange.bind(this)}/> Please click here to comfirm your cake order
                </label>
            </div>
            <button disabled={!this.state.comfirm} type="submit" className="btn btn-primary">Submit</button>
        </form>
        { !this.state.validationFlag ? <InvalidateMessage /> : null }
        { this.state.submitedFlag ? <SubmitedMessage />: null}
        {/*<button type="submit" className="btn btn-primary" onClick={this.handleClick.bind(this)}>Orders</button>
        <ul>{orders}</ul>*/}
        <Menu />
      </div>
    );
  }
}

function SubmitedMessage() {
  var divStyle = {
    color: 'green',
    margin: '20px',
    'font-size': '18px'
  };
  return (
    <div style={divStyle}>
        <span>Your oder is submited</span>
    </div>
  );
}

function InvalidateMessage() {
  var divStyle = {
    color: 'red',
    margin: '20px',
    'font-size': '18px'
  };
  return (
    <div style={divStyle}>
        <span>All input fields are required except webCahtID</span>
    </div>
  );
}

function Menu() {
  return (
    <div >
        <div className="menu-english-img"></div>
        <div className="menu-chinese-img"></div>
    </div>
  );
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