import React from 'react';
import HeaderNav from '../../components/HeaderNav';
import SearchOrder from '../../components/SearchOrder';
const View = ({ 
  RenderHeaderNav, RenderSearchOrder
}) => (
  <div>
      <RenderHeaderNav/>
      <RenderSearchOrder/>
  </div>
);

View.propTypes = {
};

View.defaultProps = {
  RenderHeaderNav: HeaderNav,
  RenderSearchOrder: SearchOrder,
};

export default View;
