import React from 'react';
import HeaderNav from '../../components/HeaderNav';
import OrderForm from '../../components/OrderForm';

const View = ({ 
  RenderHeaderNav, RenderOrderForm
}) => (
  <div>
      <RenderHeaderNav/>
      <RenderOrderForm/>
  </div>
);

View.propTypes = {
};

View.defaultProps = {
  RenderHeaderNav: HeaderNav,
  RenderOrderForm: OrderForm,
};

export default View;
