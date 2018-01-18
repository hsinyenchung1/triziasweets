import axios from 'axios';

const loadAllOrdersData = async function (password) {
  try {
    const response = await axios.post('/api/orders', {
        password: password
      });
    const data = response.data;
      return data;
    } catch (ex) {
    console.log(ex);
  }
};


export {loadAllOrdersData};

