import React from 'react';
import PropTypes from 'prop-types';

export const SearchOrder = ({ sortOrdersAction, getCurrentDateOrders, getWeekOrders }) => (
  <div>
    <button
      className="btn btn-primary btn-color"
      onClick={sortOrdersAction}
    >
      Sort by date
    </button>
    <button
      className="btn btn-primary btn-color"
      onClick={getCurrentDateOrders}
    >
      Current date
    </button>
    <button
      className="btn btn-primary btn-color"
      onClick={getWeekOrders}
    >
      Tomorrow date
    </button>
  </div>
);

SearchOrder.propTypes = {
  sortOrdersAction: PropTypes.func.isRequired,
  getCurrentDateOrders: PropTypes.func.isRequired,
  getWeekOrders: PropTypes.func.isRequired
};

export default SearchOrder;
