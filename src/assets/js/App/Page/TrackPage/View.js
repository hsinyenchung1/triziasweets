import React from 'react';
import PropTypes from 'prop-types';
import HeaderNav from '../../components/HeaderNav';
import SearchOrder from '../../components/SearchOrder';

const View = ({
  RenderHeaderNav, RenderSearchOrder
}) => (
  <div>
    <RenderHeaderNav />
    <RenderSearchOrder />
  </div>
);

View.propTypes = {
  RenderHeaderNav: PropTypes.func,
  RenderSearchOrder: PropTypes.func

};

View.defaultProps = {
  RenderHeaderNav: HeaderNav,
  RenderSearchOrder: SearchOrder
};

export default View;
