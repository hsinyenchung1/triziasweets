import React from 'react';
// import PropTypes from 'prop-types';
import CakeItem from '../../components/CakeItem';

export class CakeItemDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hello',
      cakeItemsImage: this.props.cakeItemsImage
    };
  }

  render() {
    const imageList = this.props.cakeItemsImage.map((cakeImage, index) => (
      <span className="cakeItemDisplay-img-item" key={index} />
    ));

    function Reapt(props) {
      const list = [];
      for (let i = 0; i < props.count; i += 1) {
        list.push(props.children(i));
      }
      return <div> { list } </div>;
    }

    function ListOfTenThings() {
      return (
        <Reapt count={10}>
          {index => <div key={index}>This is item {index}.</div>}
        </Reapt>
      );
    }


    return (
      <div>
        {imageList}
        <ListOfTenThings />
      </div>
    );
  }
}

export default CakeItemDisplay;

// CakeItemDisplay.propTypes = {
//   displayCakeItemComponent: PropTypes.object.isRequired
// };

