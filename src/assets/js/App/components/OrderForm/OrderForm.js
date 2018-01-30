import React from 'react';

export class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailAddress: '',
      contactNumber: '',
      name: '',
      weChatID: '',
      message: '',
      comfirm: '',
      pickupDate: '',
      pickupTime: '',
      validationFlag: true,
      submitedFlag: false,
      orders: [],
      image1: { data_uri: '' },
      image2: { data_uri: '' },
      image3: { data_uri: '' }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFile = this.handleFile.bind(this);
  }

  handleChange(event) {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const { name } = target;
    this.setState({
      [name]: value
    });
  }

  handleFile(event) {
    const { name } = event.target;
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (upload) => {
      const currUpload = {
        data_uri: upload.target.result,
        filename: file.name,
        filetype: file.type
      };
      this.setState({
        [name]: currUpload
      });
    };
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }
  }

  handleSubmit(event) {
    const currentOrder = this.state;
    let isFormValidate = true;

    Object.keys(currentOrder).forEach((key, index) => {
      if (currentOrder[key] === null || currentOrder[key] === undefined || currentOrder[key] === '') {
        isFormValidate = false;
      }
    });

    this.setState({
      validationFlag: isFormValidate
    });

    if (isFormValidate) {
      fetch('/api/order', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(this.state)
      }).then(data => data.json()).then((response) => {
        this.setState({
          emailAddress: '',
          contactNumber: '',
          name: '',
          weChatID: '',
          message: '',
          comfirm: false,
          pickupDate: '',
          pickupTime: '',
          validationFlag: true,
          submitedFlag: true
        });
      });
    }

    event.preventDefault();
  }


  render() {
    const submitButton = {
      width: '100%',
      marginBottom: '20px'
    };

    const imagePreview = {
      width: '300px'
    };

    return (
      <div className="orderfrom-main-container">
        <div className="row">
          <div id="order-container" className="col-12 col-sm-5">
            { !this.state.validationFlag ? <InvalidateMessage /> : null }
            <form onSubmit={this.handleSubmit.bind(this)} encType="multipart/form-data">
              <div className="form-group">
                <label htmlFor="emailAddress">Email Address - 电子邮箱 *
                  <input
                    type="text"
                    className="form-control"
                    name="emailAddress"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    value={this.state.emailAddress}
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number - 联系电话 *
                  <input
                    type="text"
                    className="form-control"
                    name="contactNumber"
                    id="contactNumber"
                    aria-describedby="emailHelp"
                    placeholder="Enter number"
                    value={this.state.contactNumber}
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="name">Name - 姓名 *
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    aria-describedby="emailHelp"
                    placeholder="Enter name"
                    value={this.state.name}
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="weChatID">WeChat ID - 微信
                  <input
                    type="text"
                    className="form-control"
                    name="weChatID"
                    id="weChatID"
                    aria-describedby="emailHelp"
                    placeholder="Enter wechat ID"
                    value={this.state.weChatID}
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="pickupDate">Pick Up Date - 取货日期 *
                  <input
                    type="date"
                    className="form-control"
                    name="pickupDate"
                    id="pickupDate"
                    aria-describedby="emailHelp"
                    placeholder="Pickup Date"
                    value={this.state.pickupDate}
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="pickupTime">Pick Up Time - 取货时间 *
                  <input
                    type="time"
                    className="form-control"
                    name="pickupTime"
                    id="pickupTime"
                    aria-describedby="emailHelp"
                    placeholder="Pickup Time"
                    value={this.state.pickupTime}
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="message">Your Orders - 请在此处填写您要订购的甜品 *
                  <textarea
                    className="form-control"
                    name="message"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    value={this.state.message}
                    onChange={this.handleChange.bind(this)}
                  />
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="image1">Up Load Image - 上传图片
                  <input
                    type="file"
                    className="form-control"
                    name="image1"
                    id="image1"
                    aria-describedby="emailHelp"
                    onChange={this.handleFile.bind(this)}
                    accept="image/x-png,image/gif,image/jpeg"
                  />
                </label>
                <img style={imagePreview} alt="image1" src={this.state.image1.data_uri} />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  name="image2"
                  id="image2"
                  aria-describedby="emailHelp"
                  onChange={this.handleFile.bind(this)}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <img style={imagePreview} alt="image2" src={this.state.image2.data_uri} />
              </div>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  name="image3"
                  id="image3"
                  aria-describedby="emailHelp"
                  onChange={this.handleFile.bind(this)}
                  accept="image/x-png,image/gif,image/jpeg"
                />
                <img style={imagePreview} alt="image3" src={this.state.image3.data_uri} />
              </div>
              <button style={submitButton} type="submit" className="btn btn-primary">Submit</button>
            </form>
            { !this.state.validationFlag ? <InvalidateMessage /> : null }
            { this.state.submitedFlag ? <SubmitedMessage /> : null}
          </div>
          <div className="col-12 col-sm-7">
            <div className="order-menu-img-wapper">
              <div className="menu-english-img" />
              <div className="menu-chinese-img" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrderForm;

function SubmitedMessage() {
  const divStyle = {
    color: 'green',
    margin: '20px',
    fontSize: '18px'
  };
  return (
    <div style={divStyle}>
      <span>Your oder is submited - 您已成功下单</span>
    </div>
  );
}

function InvalidateMessage() {
  const divStyle = {
    color: 'red',
    margin: '20px',
    fontSize: '18px'
  };
  return (
    <div style={divStyle}>
      <span>All input fields with * are required. - * 為必填項目</span>
    </div>
  );
}
