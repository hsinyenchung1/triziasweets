import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Row, Col, Image } from 'react-bootstrap';

export class ImageRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: 'hello'
    };
  }

  render() {
    const divStyle = {
      marginTop: '20px'
    };

    const colums = this.props.cakeItemsImage.map((imagePath, index) => (
      <Col xs={6} md={4} key={index} style={divStyle}>
        <Image href="#" alt="images" src={imagePath} responsive />
      </Col>
    ));

    return (
      <Grid>
        <Row>
          { colums }
        </Row>
      </Grid>

    );
  }
}

ImageRow.propTypes = {
  cakeItemsImage: PropTypes.object.isRequired
};

ImageRow.defaultProps = {
};

export default ImageRow;
