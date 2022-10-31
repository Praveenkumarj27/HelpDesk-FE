import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { url } from "../Api/api";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Query() {
  const [Issue, setIssue] = useState([]);
  //On Mount
  useEffect(() => {
    fetchData();
  }, []);

  let fetchData = async () => {
    let issueData = await axios.get(`${url}/issues`);
    console.log(issueData);
    setIssue(issueData.data.issue);
  };

  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Navbar />
          <Link
            style={{ margin: "20px" }}
            to="/new-issue"
            class="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"
          >
            <i class="fas fa-download fa-sm text-white-50"></i> + Create New
            Query
          </Link>
          <div className="card-body">
            <div className="table-responsive">
              <table
                className="table table-bordered"
                id="dataTable"
                width="100%"
                cellspacing="0"
              >
                <thead>
                  <tr style={{ color: "black" }}>
                    <th>#</th>
                    <th>Track Id</th>
                    <th>Query Type</th>
                    <th>Query Title</th>
                  </tr>
                </thead>

                <tbody>
                  {Issue?.map((e, i) => {
                    return (
                      <tr key={i}>
                        <td>{i + 1}</td>
                        <td>{e._id}</td>
                        <td>{e.issueType}</td>
                        <td>{e.issueTitle}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Query;
