import React from 'react';
import {SearchOrder} from './SearchOrder';
import {InputPassword} from './InputPassword';
import {ListOrders} from './ListOrders';

const View = ({ 
  RenderSearchOrder, RenderInputPassword, RenderListOrders, onChangeInput, onPasswordSubmit, 
  orders, sortOrdersAction, getCurrentDateOrders, getWeekOrders, sortBtnFlag
}) => (
	<div>
	  <RenderInputPassword 
	  	onPasswordSubmit={onPasswordSubmit}
	  	onChangeInput={onChangeInput}
	  />

    { 
        sortBtnFlag ? (
        <RenderSearchOrder 
        sortBtnFlag={sortBtnFlag}
        sortOrdersAction={sortOrdersAction} 
        getCurrentDateOrders={getCurrentDateOrders}
        getWeekOrders={getWeekOrders}/>
        ) : (
          <span></span>
        )
    }
    
    <RenderListOrders orders ={orders}/>
  </div>
);

View.propTypes = {
};

View.defaultProps = {
  RenderSearchOrder: SearchOrder,
  RenderInputPassword: InputPassword,
  RenderListOrders: ListOrders,
};

export default View;
