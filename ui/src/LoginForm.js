import React from "react";

import "./App.css";

function LoginForm(props) {
  return (
    <div className="login-form">
      <div className="form">
        <div className="title">Sign In</div>
        <form onSubmit={props.handleSubmit}>
          <div className="input-container">
            <label>E-mail address</label>
            <input type="email" name="email" required />
          </div>
          <div className="button-container">
            <input type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
