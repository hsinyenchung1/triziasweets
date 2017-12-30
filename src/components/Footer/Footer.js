import React from 'react';

// Footer Component
export class Footer extends React.Component {
  render() {
   
    return (

      <footer className="page-footer indigo center-on-small-only pt-0">
          <div className="container">

              <div className="row">

                  <div className="col-md-12">

                      <div className="footer-socials mb-5 flex-center">

                          <a className="icons-sm fb-ic"><i className="fa fa-facebook fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm tw-ic"><i className="fa fa-twitter fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm gplus-ic"><i className="fa fa-google-plus fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm li-ic"><i className="fa fa-linkedin fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm ins-ic"><i className="fa fa-instagram fa-lg white-text mr-md-4"> </i></a>

                          <a className="icons-sm pin-ic"><i className="fa fa-pinterest fa-lg white-text"> </i></a>
                      </div>
                  </div>
              </div>
          </div>
          <div className="footer-copyright">
              <div className="container-fluid">
              </div>
          </div>
      </footer>
    );
  }
}