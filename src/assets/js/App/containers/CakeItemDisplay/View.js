import React from 'react';
import PropTypes from 'prop-types';
import CakeItem from '../../components/CakeItem';
import { CakeItemDisplay } from './CakeItemDisplay';

const View = ({
  RenderCakeItemDisplay, CakeItemComponent, cakeItemsImage
}) => (
  <div>
    <RenderCakeItemDisplay cakeItemsImage={cakeItemsImage} />
  </div>
);

View.propTypes = {
  RenderCakeItemDisplay: PropTypes.func,
  CakeItemComponent: PropTypes.func,
  cakeItemsImage: PropTypes.array.isRequired
};

View.defaultProps = {
  RenderCakeItemDisplay: CakeItemDisplay,
  CakeItemComponent: CakeItem
};

export default View;
