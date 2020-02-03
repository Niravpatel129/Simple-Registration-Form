import React from "react";
import axios from "axios";

import InputElement from "react-input-mask";

class RegisterReformat extends React.Component {
  constructor(props) {
    super(props);

    // init state
    this.state = {
      data: [
        { value: "Select Role" },
        { value: "Physician" },
        { value: "Nurse" },
        { value: "Other" }
      ],
      optionValue: "",
      emailValue: ""
    };
  }

  changeOptionValue = e => {
    // hold which opetion is selected
    this.setState({ optionValue: e.target.value });
  };

  handleEmailChange = e => {
    // hold the current value of email typed in
    this.setState({ emailValue: e.target.value });
  };

  HandleFocusAway = e => {
    // Task 3.

    // if email is not vaid, end the function.
    const isEmailValid = e.target.validity.valid;
    if (!isEmailValid) {
      return true;
    }

    // if the Email is Valid and user clicks away from box, make a axios call.
    axios.get("https://jsonplaceholder.typicode.com/todos/1").then(res => {
      console.log(res.data);
    });
  };

  render() {
    return (
      <div className="box-view">
        <span>Please enter your registration details below</span>
        <br />
        <br />
        <form onSubmit={this.handleFormSubmit}>
          <span>Role</span>
          <select
            className="form-control"
            id="role"
            name="role"
            onChange={this.changeOptionValue}
            required
          >
            {this.state.data.map((data, index) => {
              return <option key={index}>{data.value}</option>;
            })}
          </select>
          <span>Email</span>
          <InputElement
            required
            type="email"
            className="form-control"
            name="UserName"
            mask=""
            maskChar={""}
            placeholder="User Name or Email"
            onChange={this.handleEmailChange}
            value={this.state.emailValue}
            onBlur={this.HandleFocusAway}
          />
          <span>Confirm Email</span>
          <InputElement
            className="form-control"
            name="Email"
            mask=""
            maskChar={""}
            type="Email"
            placeholder=""
            pattern={this.state.emailValue}
            required
          />

          {this.state.optionValue === "Physician" && (
            <>
              <span>License*</span>
              <InputElement
                type="text"
                className="form-control"
                name="License"
                mask=""
                maskChar={""}
                placeholder=""
                required
              />
              <span>Billing Number*</span>
              <InputElement
                type="text"
                className="form-control"
                name="billing"
                mask=""
                maskChar={""}
                placeholder=""
                required
              />
              <span>Specialty*</span>
              <InputElement
                type="text"
                className="form-control"
                name="Specialty"
                mask=""
                maskChar={""}
                placeholder=""
                required
              />
            </>
          )}

          <span>Phone</span>
          <InputElement
            type="text"
            className="form-control"
            name="Phone"
            mask=""
            maskChar={""}
            placeholder=""
            pattern="[1-9]{1}[0-9]{9}"
            maxLength="10"
            required
          />
          <span>Fax</span>
          <InputElement
            type="text"
            className="form-control"
            name="Fax"
            mask=""
            maskChar={""}
            placeholder=""
            maxLength="6"
          />

          <br />
          <button name="submit" type="submit">
            Save Registration
          </button>
        </form>
      </div>
    );
  }
}

export default RegisterReformat;
