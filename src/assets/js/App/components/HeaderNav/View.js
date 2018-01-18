import React from 'react';
import {HeaderNav} from './HeaderNav';

const View = ({ 
  RenderHeaderNav,
}) => (
  <div>
  		<HeaderNav />
  </div>
);

View.propTypes = {
};

View.defaultProps = {
  RenderHeaderNav: HeaderNav,
};

export default View;
