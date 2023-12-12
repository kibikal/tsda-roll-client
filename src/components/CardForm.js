import React, { useState } from "react";
import FormInput from "../components/FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import CircularProgress from "@mui/material/CircularProgress";
function CardForm() {
  const [name, setName] = useState("");
  const [staffID, setStaffID] = useState("");
  const [job, setJob] = useState("");
  const [ssnit, setssnit] = useState("");
  const [ghCard, setGhcard] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [unit, setUnit] = useState("");
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [payrollStatus, setPayrollStatus] = useState(true);
  const [post, setPost] = useState(true);
  const [leaveType, setLeaveType] = useState("");
  const [errorStatus, setErrorStatus] = useState({
    status: false,
    message: ""
  });

  const [showMessage, setShowMessage] = useState(false);

  const [registeredPerson, setRegisteredPerson] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const registered = {
    fullName: name,
    staffID: staffID,
    job: job,
    dateOfBirth: dateOfBirth,
    ssnit: ssnit,
    ghCard: ghCard,
    unit: unit,
    bank: bank,
    accountNumber: accountNumber,
    payrollStatus: payrollStatus,
    post: post,
    leaveType: leaveType
  };

  async function submitForm(event) {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/register",
        registered
      );
      console.log(response.data);
      setRegisteredPerson(response.data);
      setErrorStatus({ status: false, message: "" });
    } catch (err) {
      console.log(err);
      setErrorStatus({
        status: true,
        message: err.message
      });
    } finally {
      setLoading(false);
      setShowMessage(true);
      setTimeout(() => setShowMessage(false), 2000);
    }
  }

  // axios
  //   .post("https://tein-uenr-api.onrender.com/register", registered)
  //   .then((res) => {
  //     console.log(res.data);
  //     setErrorStatus({ status: false, message: "" });
  //     setRegisteredPerson(res.data);
  //     setLoading(true);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     setErrorStatus({
  //       status: true,
  //       message: err.message,
  //     });
  //   });

  return (
    <div className="App">
      <div className="main">
        <form action="" onSubmit={submitForm}>
          <FormInput
            label="Full name"
            placeholder="Enter full name"
            id="name"
            name="fullName"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <FormInput
            label="Staff ID"
            placeholder="Enter Staff ID"
            id="staffID"
            name="staffID"
            value={staffID}
            onChange={(event) => setStaffID(event.target.value)}
          />

          <FormInput
            label="Job/Grade"
            placeholder="Enter job/grade"
            id="job"
            name="job"
            value={job}
            onChange={(event) => setJob(event.target.value)}
          />

          <FormInput
            label="Date of Birth"
            placeholder="Enter DOB"
            id="dob"
            type="date"
            pattern="\d{4}-\d{2}-\d{2}"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={(event) => setDateOfBirth(event.target.value)}
          />

          <FormInput
            label="SSNIT No."
            placeholder="Enter SSNIT No."
            id="ssnit"
            name="ssnit"
            value={ssnit}
            onChange={(event) => setssnit(event.target.value)}
          />

          <FormInput
            label="Ghana Card"
            placeholder="Enter GH Card number"
            id="ghcard"
            name="ghCard"
            value={ghCard}
            onChange={(event) => setGhcard(event.target.value)}
          />

          <FormInput
            label="Mgt Unit"
            placeholder="Enter current unit"
            id="unit"
            name="unit"
            value={unit}
            onChange={(event) => setUnit(event.target.value)}
          />

          <FormInput
            label="Bank Name"
            placeholder="Enter Bank Name"
            id="bank"
            name="bank"
            value={bank}
            onChange={(event) => setBank(event.target.value)}
          />

          <FormInput
            label="Account Number"
            placeholder="Enter Account No."
            id="account-number"
            name="accountNumber"
            value={accountNumber}
            onChange={(event) => setAccountNumber(event.target.value)}
          />

          <div className="form-item selects">
            <div>
              <label htmlFor="payroll_status">Payroll status </label>
              <select
                name="payrollStatus"
                value={payrollStatus}
                onChange={(e) => setPayrollStatus(e.target.value)}
                className="selectInput"
                id="payroll_status"
              >
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            <div>
              <label htmlFor="atpost">At Post?</label>
              <select
                name="post"
                id="at-post"
                value={post}
                onChange={(e) => setPost(e.target.value)}
                className="selectInput"
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>

          <FormInput
            label="Leave type if on leave"
            placeholder="Leave type"
            id="leave_type"
            name="leaveType"
            value={leaveType}
            onChange={(event) => setLeaveType(event.target.value)}
          />

          <div className="buttons-row">
            <button
              className="button preview-btn"
              id="preview-btn"
              type="submit"
            >
              Save
            </button>
            <button
              className="button new-button"
              onClick={() => {
                setName("");
              }}
            >
              Add new
            </button>
          </div>
        </form>
        {loading ? (
          <div className="spinner">
            <CircularProgress />
          </div>
        ) : showMessage ? (
          <div className="alert">
            {!errorStatus.status ? (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                Registration successful
              </Alert>
            ) : (
              <Alert severity="error">
                <AlertTitle>{errorStatus.message}</AlertTitle>
                Couldn't add new staff
              </Alert>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CardForm;
