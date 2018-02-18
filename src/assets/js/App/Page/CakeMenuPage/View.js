import React from 'react';
import PropTypes from 'prop-types';
import HeaderNav from '../../components/HeaderNav';
import CakeItemDisplay from '../../containers/CakeItemDisplay';

const View = ({
  RenderHeaderNav, RenderCakeItemDisplay
}) => (
  <div>
    <RenderHeaderNav />
    <RenderCakeItemDisplay />
  </div>
);

View.propTypes = {
  RenderHeaderNav: PropTypes.func,
  RenderCakeItemDisplay: PropTypes.func
};

View.defaultProps = {
  RenderHeaderNav: HeaderNav,
  RenderCakeItemDisplay: CakeItemDisplay
};

export default View;
