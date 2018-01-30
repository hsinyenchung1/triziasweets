import React from 'react';
import PropTypes from 'prop-types';
import { OrderForm } from './OrderForm';

const View = ({
  RenderOrderForm
}) => (
  <RenderOrderForm />
);

View.propTypes = {
  RenderOrderForm: PropTypes.func
};

View.defaultProps = {
  RenderOrderForm: OrderForm
};

export default View;
