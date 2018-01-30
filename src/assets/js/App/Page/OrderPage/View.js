import React from 'react';
import PropTypes from 'prop-types';
import HeaderNav from '../../components/HeaderNav';
import OrderForm from '../../components/OrderForm';

const View = ({
  RenderHeaderNav, RenderOrderForm
}) => (
  <div>
    <RenderHeaderNav />
    <RenderOrderForm />
  </div>
);

View.propTypes = {
  RenderHeaderNav: PropTypes.func,
  RenderOrderForm: PropTypes.func
};

View.defaultProps = {
  RenderHeaderNav: HeaderNav,
  RenderOrderForm: OrderForm
};

export default View;
