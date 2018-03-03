import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

export const Footer = () => (
  <div className="footer-height-100">
    <footer className="page-footer font-small indigo pt-5">
      <div className="container">
        <Row>
          <Col md={12}>
            <div className="mb-5 footer-flex-center">
              { /* <a className="footer-social-icon" href="https://www.instagram.com/triziasweets"><i className="fab fa-facebook-f white-text fa-2x" /></a>
              <a className="footer-social-icon" href="https://www.instagram.com/triziasweets"><i className="fab fa-twitter white-text fa-2x" /></a>
              <a className="footer-social-icon" href="https://www.instagram.com/triziasweets"><i className="fab fa-google-plus-g fa-lg white-text fa-2x" /></a>
              <a className="footer-social-icon" href="https://www.instagram.com/triziasweets"><i className="fab fa-linkedin-in fa-lg white-text fa-2x" /></a>
              <a className="footer-social-icon" href="https://www.instagram.com/triziasweets"><i className="fab fa-pinterest fa-lg white-text fa-2x" /></a> */}
              <a className="footer-social-icon" href="https://www.instagram.com/triziasweets"><i className="fab fa-instagram fa-lg white-text fa-2x" /></a>
            </div>
          </Col>
        </Row>
      </div>
      <div className="footer-copyright py-3 text-center">
        <div className="footer-font-18 foot-copyright">
                  © 2018 Copyright: Triziasweets
        </div>
      </div>
    </footer>
  </div>
);

Footer.propTypes = {
};

export default Footer;
