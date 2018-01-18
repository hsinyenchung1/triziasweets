import React from 'react';
import {OrderForm} from './OrderForm';

const View = ({ 
  RenderOrderForm,
}) => (
      <RenderOrderForm/>
);

View.propTypes = {
};

View.defaultProps = {
  RenderOrderForm: OrderForm,
};

export default View;
