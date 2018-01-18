import React from 'react';

export class SearchOrder extends React.Component{
   constructor(props){
    super(props);

  }
  render() {
    return (
      <div>
          <button className="btn btn-primary btn-color" onClick={this.props.sortOrdersAction}>Sort by date</button>
          <button className="btn btn-primary btn-color" onClick={this.props.getCurrentDateOrders}>Current date</button>
          <button className="btn btn-primary btn-color" onClick={this.props.getWeekOrders}>Tomorrow date</button>
      </div>
    );
  }
}