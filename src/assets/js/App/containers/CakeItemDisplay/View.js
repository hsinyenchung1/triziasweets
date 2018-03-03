import React from 'react';
import PropTypes from 'prop-types';
import { CakeItemDisplay } from './CakeItemDisplay';

const View = ({
  RenderCakeItemDisplay, cakeItemsImage
}) => (
  <div>
    <RenderCakeItemDisplay cakeItemsImage={cakeItemsImage} />
  </div>
);

View.propTypes = {
  RenderCakeItemDisplay: PropTypes.func,
  cakeItemsImage: PropTypes.array.isRequired
};

View.defaultProps = {
  RenderCakeItemDisplay: CakeItemDisplay
};

export default View;
