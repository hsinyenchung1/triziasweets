import React from 'react';
import axios from 'axios';

export class OrderDashBoard extends React.Component{
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
      <div className="">
          <div className="row">
              <div className="col-12">
                  <div className="form-group">
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        Please enter passord: 
                        <br/>
                        <input classname="" type="text" name="password" onChange={this.handleChange.bind(this)}/>
                        <br/>
                        <input className="btn btn-primary btn-color" type="submit" value="Get" /> {/*
                        <button onClick={this.handleSort.bind(this)}>Sort Pickup Date</button>*/}
                    </form>
                  </div>
              </div>
          </div>
          <div className="">
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
