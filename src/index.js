import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import axios from 'axios';
import  {BrowserRouter as Router, Route, Link, NavLink, Switch} from 'react-router-dom';

// Main Component
class App extends React.Component {
  render() {
   
    return (
      <Router>
        <div>
          <nav className="navbar navbar-expand-lg navbar-dark bg-info">
              <a className="navbar-brand" href="#">Trizia Sweets</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item">
                          <NavLink activeClassName="active" className="nav-link"  to='/order'>Order</NavLink>
                      </li>
                      <li className="nav-item">
                          <NavLink activeClassName="active" className="nav-link" to='/menu'>Menu</NavLink>
                      </li>
                       <li className="nav-item">
                          <NavLink activeClassName="active" className="nav-link"  to='/track'>Track</NavLink>
                      </li> 
                  </ul>
              </div>
          </nav>
          <Switch>
            <Route exact path="/" component={Order}/>
            <Route path="/order" component={Order}/>
            <Route path="/track" component={Orders}/>
          </Switch>
          <Footer />
        </div>
      </Router>
      
    );
  }
}

class Orders extends React.Component{
   constructor(props){
    super(props);
    this.state = {
      password: '',
      orders: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  handleChange(event){
    this.setState({
      password : event.target.value,
    });
  }


  handleSort(event){

    this.setState(prevState => {
          this.state.orders.sort((a, b) => {
               var a = a.pickupDate.split('-');
               var b = b.pickupDate.split('-');
              console.log('test');
              return  new Date(a[0], a[1] - 1, a[2]) - new Date(b[0], b[1] - 1, b[2]);
          })
      });

    console.log(this.state.orders);
      // var orders = this.state.orders;
      // orders.sort(function(a, b) {

      //   var a = a.pickupDate.split('-');
      //    var b = b.pickupDate.split('-');
   
      //   return  new Date(a[0], a[1] - 1, a[2]) - new Date(b[0], b[1] - 1, b[2]);
      // });

      // this.setState({
      //   orders: orders
      // });
  }

  handleSubmit(event){
    event.preventDefault();
     axios.post('/api/orders', {
      password: this.state.password
    })
    .then((response) =>{
      this.setState({
        orders: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

     var orders = this.state.orders;
     orders = orders.reverse();
     orders = orders.map(function(order, index){

        var image1 = '';
        var image2 = '';
        var image3 = '';

        if(order.image1 && order.image1.data_uri){
          image1 = order.image1.data_uri
        }

        if(order.image2 && order.image2.data_uri){
          image2 = order.image2.data_uri
        }

        if(order.image3 && order.image3.data_uri){
          image3 = order.image3.data_uri
        }

        var imagePreview = {
          'height' : '300px'
        }

        return(

            <div key={index}>
                 <table className="table table-sm">
                  <thead>
                    <tr>
                      <th>#Order {index}</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Name: </td>
                      <td>{order.name}</td>
                    </tr>
                    <tr>
                      <td>Contact: </td>
                      <td>{order.contactNumber}</td>
                    </tr>
                    <tr>
                      <td>Message: </td>
                      <td>{order.message}</td>
                    </tr>
                    <tr>
                      <td>Email: </td>
                      <td>{order.emailAddress}</td>
                    </tr>
                    <tr>
                      <td>weChatID: </td>
                      <td>{order.weChatID}</td>
                    </tr>
                    <tr>
                      <td>Pickup Date: </td>
                      <td>{order.pickupDate}</td>
                    </tr>
                    <tr>
                      <td>Pickup Time: </td>
                      <td>{order.pickupTime}</td>
                    </tr>
                    <tr>
                      <td>Order Date: </td>
                      <td>{order.orderDate}</td>
                    </tr>
                  </tbody>
                </table>

                <div className="row">
                   <div className="col-sm-12 col-md-4 col-lg-4">
                        <div>Image 1:</div>
                        <img style={imagePreview} src={image1}/>
                    </div>
                   <div className="col-sm-12 col-md-4 col-lg-4">
                        <div>Image 2:</div>
                        <img style={imagePreview} src={image2}/>
                    </div>
                   <div className="col-sm-12 col-md-4 col-lg-4">
                        <div>Image 3:</div>
                        <img style={imagePreview} src={image3}/>
                   </div>
                 </div>
            </div>
        )
     });
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" name="password"  onChange={this.handleChange.bind(this)}/>
          <input type="submit" value="Get"/>
          {/*<button onClick={this.handleSort.bind(this)}>Sort Pickup Date</button>*/}
        </form>
        <div className="container">
          {orders}
        </div>
      </div>
    );
  }
}

function getDate(pickupDate){
    var date = pickupDate.split('-');
    return new Date(date[0], date[1] - 1, date[2]);
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
      orders: [],
      image1: { data_uri: ''},
      image2: { data_uri: ''},
      image3: { data_uri: ''},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }



  handleClick(event){
      fetch('/api/order').then(function(data){
        return data.json();
      }).then(json => {
        this.setState({
            orders: json
        });
      });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(name === 'pickupDate'){
      var dates = value.split('-');
      var pickupDate = new Date(dates[0], dates[1] - 1, dates[2]);
      var currentDate = new Date();
      var currentYear = currentDate.getYear();
      var currentMonth = currentDate.getMonth();
      console.log(currentMonth);
      var currentDate = currentDate.getDate();
      var currentTime = new Date (currentYear,currentMonth, currentDate + 7);
    }
    this.setState({ 
      [name]: value
    });
  }

   handleFile(event) {
   
    const name = event.target.name;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (upload) => {
      let currUpload = {
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      };
      this.setState({
        [name] : currUpload
      });
    };
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }
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
          submitedFlag: true,
        });
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

    var submitButton = {
      width: '100%',
      marginBottom: '20px',
    }

    var formStyle = {
      margin: '50px',
    }

    var imagePreview ={
      width: '300px'
    }

    var messageTitle ={
      color: '#912626',
      'fontSize': '16px',
      'fontWeight' : 'bold',
    }

    return (
      <div id="order-container" style={formStyle}>
        <h1 style={messageTitle}>We are fully ordered on 12/20 ~ 12/24</h1>
        <h1 style={messageTitle}> 感谢大家的支持，12/20-12/24 订单已满。</h1>
        <h1 style={messageTitle}> Happy Holidays!</h1>
        { !this.state.validationFlag ? <InvalidateMessage /> : null }
        
        <form onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
            <div className="form-group">
                <label htmlFor="emailAddress">Email Address - 电子邮箱 *
                </label>
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
                <label htmlFor="contactNumber">Contact Number - 联系电话 *</label>
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
                <label htmlFor="name">Name - 姓名 *</label>
                <input 
                type="text" 
                className="form-control" 
                name="name" id="name" 
                aria-describedby="emailHelp" 
                placeholder="Enter name" 
                value={this.state.name} 
                onChange={this.handleChange.bind(this)}/>
                <small className="form-text text-muted">Required field. We'll never share your name with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="weChatID">WeChat ID - 微信</label>
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
                <label htmlFor="pickupDate">Pick Up Date - 取货日期 *
                </label>
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
                <label htmlFor="pickupTime">Pick Up Time - 取货时间 *
                </label>
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
                <label htmlFor="message">Your Orders - 请在此处填写您要订购的甜品 *
                </label>
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
            <div className="form-group">
                <label htmlFor="image1">Up Load Image - 上传图片
                </label>
                <input 
                type="file" 
                className="form-control" 
                name="image1" 
                id="image1" 
                aria-describedby="emailHelp" 
                onChange={this.handleFile.bind(this)} accept="image/x-png,image/gif,image/jpeg"/>
                <img style={imagePreview} src={this.state.image1.data_uri}/>
            </div>
            <div className="form-group">
                <input 
                type="file" 
                className="form-control" 
                name="image2" 
                id="image2" 
                aria-describedby="emailHelp" 
                onChange={this.handleFile.bind(this)} accept="image/x-png,image/gif,image/jpeg"/>
                <img style={imagePreview} src={this.state.image2.data_uri}/>
            </div>
            <div className="form-group">
                <input 
                type="file" 
                className="form-control" 
                name="image3" 
                id="image3" 
                aria-describedby="emailHelp" 
                onChange={this.handleFile.bind(this)} accept="image/x-png,image/gif,image/jpeg"/>
                <img style={imagePreview} src={this.state.image3.data_uri}/>
            </div>
            <div className="form-check">
                <label className="form-check-label">
                    <input 
                    type="checkbox" 
                    name="comfirm" 
                    className="form-check-input"
                    value={this.state.comfirm} 
                    onChange={this.handleChange.bind(this)}/> Please click here to comfirm your cake order - 请点击这里确认你的蛋糕订单 *
                </label>
            </div>
            <button style={submitButton} disabled={!this.state.comfirm} type="submit" className="btn btn-primary">Submit</button>
        </form>
        { !this.state.validationFlag ? <InvalidateMessage /> : null }
        { this.state.submitedFlag ? <SubmitedMessage />: null}
        {/*<button type="submit" className="btn btn-primary" onClick={this.handleClick.bind(this)}>Orders</button>
        <ul>{orders}</ul>*/}
        {orders}
        <Menu />
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
                  <li className="nav-item">
                      <NavLink activeClassName="active" className="nav-link" to='/menu'>Menu</NavLink>
                  </li>
                   <li className="nav-item">
                      <NavLink activeClassName="active" className="nav-link"  to='/track'>Track</NavLink>
                  </li>
                  <li className="nav-item">
                      <NavLink activeClassName="active" className="nav-link"  to='/order'>Order</NavLink>
                  </li>
              </ul>
          </div>
      </nav>
    );
  }
}



function SubmitedMessage() {
  var divStyle = {
    color: 'green',
    margin: '20px',
    'fontSize': '18px'
  };
  return (
    <div style={divStyle}>
        <span>Your oder is submited - 您已成功下单</span>
    </div>
  );
}

function InvalidateMessage() {
  var divStyle = {
    color: 'red',
    margin: '20px',
    'fontSize': '18px'
  };
  return (
    <div style={divStyle}>
        <span>All input fields with * are required. - * 為必填項目</span>
    </div>
  );
}

function Menu() {
  return (
    <div className="row menu">
        <div className="menu-english-img col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6"></div>
        <div className="menu-chinese-img col-12 col-sm-12 col-md-6  col-lg-6 col-xl-6"></div>
    </div>
  );
}

function Track() {
  return (
    <div className="">
        <h1>Track my cake</h1>
    </div>
  );
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