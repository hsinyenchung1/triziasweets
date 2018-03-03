import React from 'react';
import PropTypes from 'prop-types';
import OrderForm from '../../components/OrderForm';

const View = ({
  RenderOrderForm
}) => (
  <div className="test">
    <RenderOrderForm />
  </div>
);

View.propTypes = {
  RenderOrderForm: PropTypes.func
};

View.defaultProps = {
  RenderOrderForm: OrderForm
};

export default View;
