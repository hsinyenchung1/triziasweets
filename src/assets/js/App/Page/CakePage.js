import React from 'react';

export class CakePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    
  }

  render() {
  
    return (
      <div className="container">
        <div className="cakepage-center-icon">
          Click here <br />
          <a className="" href="https://www.instagram.com/triziasweets" target="_blank"><i className="fab fa-instagram fa-lg fa-5x cakepage-main-color" /></a>
        </div>
      </div>
    );
  }
}

export default CakePage;

