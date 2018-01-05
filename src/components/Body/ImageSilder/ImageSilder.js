import React from 'react';
import img1 from '../../../desgin/img/cakes-example/cake1.jpeg';
import img2 from '../../../desgin/img/cakes-example/cake2.jpeg';
export class ImageSilder extends React.Component{
	  render() {

	  	var padding10 = {
		    'width': '90%',
  			'margin': '15px auto',	
		  };
	    return (
	          
	          <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" style={padding10} >
				  <ol className="carousel-indicators">
				    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
				    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
				    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
				  </ol>
				  <div className="carousel-inner" role="listbox">
				    <div className="carousel-item active">
				      <img className="d-block img-fluid" src={img1} alt="First slide"/>
				    </div>
				    <div className="carousel-item">
				      <img className="d-block img-fluid" src={img2} alt="Second slide"/>
				    </div>
				    <div className="carousel-item">
				      <img className="d-block img-fluid" src={img1} alt="Third slide"/>
				    </div>
				  </div>
				  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
				    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
				    <span className="sr-only">Previous</span>
				  </a>
				  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
				    <span className="carousel-control-next-icon" aria-hidden="true"></span>
				    <span className="sr-only">Next</span>
				  </a>
				</div>

	    );
	}
}