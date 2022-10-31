import React, { useEffect } from "react";
import { useFormik } from "formik";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { url } from "../Api/api";

function Createstudent() {
  let navigate = useNavigate();
  let [issueTypes, setIssueTypes] = useState([]);

  let loadIssueTypes = async () => {
    let res = await axios.get(`${url}/issue-types`);
    console.log(res);
    if (res.data.statusCode === 200) {
      setIssueTypes(res.data.issueTypes);
    } else {
    }
  };

  useEffect(() => {
    loadIssueTypes();
  }, []);

  let formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      mobile: "",
      issueType: "",
      issueTitle: "",
      issueDescription: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.username) {
        errors.name = "Please enter the name";
      } else if (values.username.length < 5) {
        errors.username = "Length should be more than 5";
      } else if (values.username.length > 25) {
        errors.username = "Length should be less than 25";
      }
      if (!values.email) {
        errors.email = "please enter email";
      }
      if (!values.mobile) {
        errors.mobile = "please enter mobile";
      }
      if (!values.issueType) {
        errors.issueType = "select Query ";
      }
      if (!values.issueTitle) {
        errors.issueTitle = "please enter Title";
      }
      if (!values.issueDescription) {
        errors.issueDescription = "please enter comments";
      }

      return errors;
    },

    onSubmit: async (values) => {
      let res = await axios.post(`${url}/issues`, values);
      if (res.data.statusCode === 200) {
        console.log(res.data);
        navigate(`/success/${res.data.issue_id}`);
      } else {
      }
    },
  });

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="container" style={{ marginTop: "10px" }}>
            <div class="">
              <h2 class=" font-weight-bold text-primary">Create Query</h2>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-lg-5">
                  <label>Username</label>
                  <input
                    name="username"
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    type="text"
                    className={`form-control ${
                      formik.errors.username ? "error-border" : ""
                    }`}
                  />
                </div>
                <div className="col-lg-5">
                  <label>Email</label>
                  <input
                    name="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    type="text"
                    className={`form-control ${
                      formik.errors.email ? "error-border" : ""
                    }`}
                  />
                </div>
                <div className="col-lg-5 mt-3">
                  <label>Mobile</label>
                  <input
                    name="mobile"
                    onChange={formik.handleChange}
                    value={formik.values.mobile}
                    type="text"
                    className={`form-control ${
                      formik.errors.mobile ? "error-border" : ""
                    }`}
                  />
                </div>

                <div className="col-lg-5 mt-3">
                  <label>Query About</label>
                  <select
                    className="form-control"
                    name="issueType"
                    value={formik.values.issueType}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    {issueTypes.map((e, i) => {
                      return (
                        <option value={e} key={i}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-lg-5 mt-3">
                  <label>Query Title</label>
                  <input
                    name="issueTitle"
                    onChange={formik.handleChange}
                    value={formik.values.issueTitle}
                    type="text"
                    className={`form-control ${
                      formik.errors.issueTitle ? "error-border" : ""
                    }`}
                  />
                </div>
                <div className="col-lg-12 mt-3">
                  <label>Description</label>
                </div>
                <div className="col-lg-5">
                  <textarea
                    cols={"30"}
                    rows={"4"}
                    name="issueDescription"
                    label="issueDescription"
                    placeholder="Leave a comment here"
                    onChange={formik.handleChange}
                    value={formik.values.issueDescription}
                    type="text"
                    className={`form-control ${
                      formik.errors.mobile ? "error-border" : ""
                    }`}
                  />
                </div>

                <div className="col-lg-12">
                  <input
                    value="submit"
                    type={"submit"}
                    className="btn btn-primary mt-2"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Createstudent;
