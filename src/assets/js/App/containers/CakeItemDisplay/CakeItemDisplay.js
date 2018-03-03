import React from 'react';
// import PropTypes from 'prop-types';
import { ImageRow } from '../../components/ImageRow/ImageRow';

export class CakeItemDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hello',
      cakeItemsImage: this.props.cakeItemsImage
    };
  }

  render() {
    return (
      <ImageRow cakeItemsImage={this.state.cakeItemsImage} />
    );
  }
}

export default CakeItemDisplay;

// CakeItemDisplay.propTypes = {
//   displayCakeItemComponent: PropTypes.object.isRequired
// };

