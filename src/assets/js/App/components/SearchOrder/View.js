import React from 'react';
import PropTypes from 'prop-types';
import { SearchOrder } from './SearchOrder';
import { InputPassword } from './InputPassword';
import { ListOrders } from './ListOrders';

const View = ({
  RenderSearchOrder, RenderInputPassword, RenderListOrders, onPasswordSubmit,
  onChangeInput, sortBtnFlag, sortOrdersAction, getCurrentDateOrders, getWeekOrders, orders
}) => (
  <div className="container">
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
            getWeekOrders={getWeekOrders}
          />
        ) : (
          <span />
        )
    }

    <RenderListOrders orders={orders} />
  </div>
);

View.propTypes = {
  RenderSearchOrder: PropTypes.func,
  RenderInputPassword: PropTypes.func,
  RenderListOrders: PropTypes.func,
  onPasswordSubmit: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired,
  sortBtnFlag: PropTypes.bool.isRequired,
  sortOrdersAction: PropTypes.func.isRequired,
  getCurrentDateOrders: PropTypes.func.isRequired,
  getWeekOrders: PropTypes.func.isRequired,
  orders: PropTypes.array.isRequired
};

View.defaultProps = {
  RenderSearchOrder: SearchOrder,
  RenderInputPassword: InputPassword,
  RenderListOrders: ListOrders
};

export default View;
