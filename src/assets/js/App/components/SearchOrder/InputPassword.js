import React from 'react';
import PropTypes from 'prop-types';

export const InputPassword = ({ onPasswordSubmit, onChangeInput }) => (
  <div>
    <form>
      Enter Password: <br />
      <input type="text" onChange={onChangeInput.bind(this)} /> <br />
      <input
        className="btn btn-primary btn-color"
        type="submit"
        onClick={onPasswordSubmit.bind(this)}
        value="Submit"
      />
    </form>
  </div>
);

InputPassword.propTypes = {
  onPasswordSubmit: PropTypes.func.isRequired,
  onChangeInput: PropTypes.func.isRequired
};


export default InputPassword;
