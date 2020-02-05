import React, { useState } from "react";
import axios from "axios";
import InputElement from "react-input-mask";

function RegisterFormDestructing() {
  const defaultOptions = [
    { value: "Select Role" },
    { value: "Physician" },
    { value: "Nurse" },
    { value: "Other" }
  ];

  const [formInputs, setFormInputs] = useState({
    Email: "",
    ConfirmEmail: "",
    Phone: "",
    Fax: ""
  });

  const [errors, setFormErrors] = useState([]);

  const handleInputChange = e => {
    const { name, value } = e.target;

    setFormInputs({
      ...formInputs,
      [name]: value
    });
  };

  const HandleFocusAway = e => {
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

  const handleSubmit = e => {
    //Task 2
    const errors = [];

    // check if any fields are empty
    if (!formInputs.Email || !formInputs.ConfirmEmail || !formInputs.Phone) {
      errors.push("Input is missing");
    }

    // check email format
    if (!formInputs.Email.includes("@")) {
      errors.push("Email format is incorrect!");
    }

    // check if confirm email matches email
    if (formInputs.Email !== formInputs.ConfirmEmail) {
      errors.push("Email and ConfirmEmail do not match!");
    }

    // check if number is valid 10 characters
    if (formInputs.Phone.length !== 10) {
      errors.push("Phone has to be 10 digits!");
    }

    // check if fax is max 6 characters long
    if (formInputs.Fax.length > 6) {
      errors.push("Fax cannot be longer than 6 characters!");
    }

    // if there are no errors, submit the form
    if (errors.length === 0) alert("success");
    setFormErrors(errors);
  };

  return (
    <div className="Form">
      <div className="box-view">
        <span>Please enter your registration details below</span>
        <br />
        <br />
        <h4>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </h4>
        <span>Role</span>
        <select
          className="form-control"
          id="role"
          name="Role"
          onChange={handleInputChange}
        >
          {defaultOptions.map((data, index) => {
            return <option key={index}>{data.value}</option>;
          })}
        </select>
        <span>Email</span>
        <InputElement
          type="text"
          className="form-control"
          name="Email"
          mask=""
          maskChar={""}
          placeholder="User Name or Email"
          onBlur={HandleFocusAway}
          onChange={handleInputChange}
        />
        <span>Confirm Email</span>
        <InputElement
          className="form-control"
          name="ConfirmEmail"
          mask=""
          maskChar={""}
          type="Email"
          placeholder=""
          onChange={handleInputChange}
        />
        {/* Task 1 */}
        {formInputs.Role === "Physician" && (
          <>
            <span>License*</span>
            <InputElement
              type="text"
              className="form-control"
              name="License"
              mask=""
              maskChar={""}
              placeholder=""
            />
            <span>Billing Number*</span>
            <InputElement
              type="text"
              className="form-control"
              name="billing"
              mask=""
              maskChar={""}
              placeholder=""
            />
            <span>Specialty*</span>
            <InputElement
              type="text"
              className="form-control"
              name="Specialty"
              mask=""
              maskChar={""}
              placeholder=""
            />
          </>
        )}

        <span>Phone</span>
        <InputElement
          type="number"
          className="form-control"
          name="Phone"
          mask=""
          placeholder=""
          onChange={handleInputChange}
        />
        <span>Fax</span>
        <InputElement
          type="text"
          className="form-control"
          name="Fax"
          mask=""
          maskChar={""}
          placeholder=""
          onChange={handleInputChange}
        />

        <br />
        <button name="submit" type="submit" onClick={handleSubmit}>
          Save Registration
        </button>
      </div>
    </div>
  );
}

export default RegisterFormDestructing;
