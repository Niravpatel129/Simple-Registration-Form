import React, { useState } from "react";
import axios from "axios";

import InputElement from "react-input-mask";

function Register() {
  const defaultOptions = [
    { value: "Select Role" },
    { value: "Physician" },
    { value: "Nurse" },
    { value: "Other" }
  ];
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setconfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [formErrors, setFormErrors] = useState([]);

  const handleRoleInput = e => {
    setRole(e.target.value);
  };

  const handleEmailInput = e => {
    setEmail(e.target.value);
  };

  const handleConfirmEmailInput = e => {
    setconfirmEmail(e.target.value);
  };

  const handlePhoneInput = e => {
    setPhone(e.target.value);
  };

  const handleFaxInput = e => {
    setFax(e.target.value);
  };

  const handleSubmit = e => {
    //Task 2
    const errors = [];

    // check if any fields are empty
    if (email === "" || confirmEmail === "" || phone === "") {
      errors.push("Input is missing");
    }

    // check email format
    if (!email.includes("@")) {
      errors.push("Email format is incorrect!");
    }

    // check if confirm email matches email
    if (email !== confirmEmail) {
      errors.push("Email and ConfirmEmail do not match!");
    }

    // check if number is valid 10 characters
    if (phone.length !== 10) {
      errors.push("Phone has to be 10 digits!");
    }

    // check if fax is max 6 characters long
    if (fax.length > 6) {
      errors.push("Fax cannot be longer than 6 characters!");
    }

    // if there are no errors, submit the form
    if (errors.length === 0) alert("success");
    setFormErrors(errors);
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

  return (
    <div className="box-view">
      <span>Please enter your registration details below</span>
      <br />
      <br />
      <h4>
        {formErrors.map((error, index) => (
          <p key={index}>*{error}</p>
        ))}
      </h4>
      <span>Role</span>
      <select
        className="form-control"
        id="role"
        name="role"
        onChange={handleRoleInput}
      >
        {defaultOptions.map((data, index) => {
          return <option key={index}>{data.value}</option>;
        })}
      </select>
      <span>Email</span>
      <InputElement
        type="text"
        className="form-control"
        name="UserName"
        mask=""
        maskChar={""}
        placeholder="User Name or Email"
        onBlur={HandleFocusAway}
        onChange={handleEmailInput}
        value={email}
      />
      <span>Confirm Email</span>
      <InputElement
        className="form-control"
        name="text"
        mask=""
        maskChar={""}
        type="Email"
        placeholder=""
        onChange={handleConfirmEmailInput}
        value={confirmEmail}
      />
      {/* Task 1 */}
      {role === "Physician" && (
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
        onChange={handlePhoneInput}
        value={phone}
      />
      <span>Fax</span>
      <InputElement
        type="text"
        className="form-control"
        name="Fax"
        mask=""
        maskChar={""}
        placeholder=""
        onChange={handleFaxInput}
        value={fax}
      />

      <br />
      <button name="submit" type="submit" onClick={handleSubmit}>
        Save Registration
      </button>
    </div>
  );
}

export default Register;
