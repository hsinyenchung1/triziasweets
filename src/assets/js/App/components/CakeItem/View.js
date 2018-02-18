import React from 'react';
import PropTypes from 'prop-types';
import CakeItem from './CakeItem';

const View = ({
  RenderCakeItem, itemData
}) => (
  <RenderCakeItem itemData={itemData} />
);

View.propTypes = {
  RenderCakeItem: PropTypes.func
};

View.defaultProps = {
  RenderCakeItem: CakeItem
};

export default View;
