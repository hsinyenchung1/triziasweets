import React from 'react';
import PropTypes from 'prop-types';
import { HeaderNav } from './HeaderNav';

const View = ({
  RenderHeaderNav
}) => (
  <div>
    <HeaderNav />
  </div>
);

View.propTypes = {
  RenderHeaderNav: PropTypes.func
};

View.defaultProps = {
  RenderHeaderNav: HeaderNav
};

export default View;
