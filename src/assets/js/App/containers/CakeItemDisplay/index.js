import React from 'react';
import View from './View';
import axios from 'axios';
import cakeItems from '../../components/CakeItem';

const loadImage = async function () {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/photos');
    const data = response.data;
    return data;
  } catch (ex) {
    return ex;
  }
}

export default class extends React.Component {
  constructor(){
    super();
    this.state = {
      cakeItems: [],
      cakeItemsImage: [
        'http://lorempixel.com/640/480/city',
        'http://lorempixel.com/640/480/city',
        'http://lorempixel.com/640/480/city',
        'http://lorempixel.com/640/480/city'
      ]
    }
  }

  componentDidMount(){
    // const itemDataPromise = loadImage();
    // itemDataPromise.then(( response ) => {
    //   Object.keys(response).forEach((key, index) => {
    //     console.log(response[key].url);
    //   });
    // });
    
    // console.log(typeof(response));
    // this.setState({

    // });
  }

  render(){
    return(
      <View cakeItemsImage={this.state.cakeItemsImage}/>
    );
  }
}