import React from 'react';

export class ListOrders extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      orders : []
    }
   
  }
  
  componentWillReceiveProps(nextProps){
    if(this.props.orders !== nextProps.orders){
      console.log("receive props");
      this.setState({orders: nextProps.orders});
    }
  }

  render() {
     var orders = this.state.orders;
     if(orders !== null && orders !== undefined){
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
     }
    
    return (
      <div className="">
          <div className="">
              {orders}
          </div>
      </div>
    );
  }
}
