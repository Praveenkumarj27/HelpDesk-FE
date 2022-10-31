import React, { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { url } from "../Api/api";

function Status() {
  const navigate = useNavigate();
  let [data, setData] = useState(undefined);
  let [ticket, setTicket] = useState("");

  let handleLoadTicket = async () => {
    let res = await axios.get(`${url}/issues/${ticket}`);
    if (res.data.statusCode === 200) {
      setData(res.data.issue[0]);
    }
  };
  return (
    <div id="wrapper">
      <Sidebar />
      <div id="content-wrapper" class="d-flex flex-column">
        <div id="content">
          <Navbar />
          <div className="col-5 mx-auto">
            <Form>
              <Form.Group className="mb-3">
                {/* <Form.Label>
                  Ticket ID<sup>*</sup>
                </Form.Label> */}
                <Form.Control
                  type="text"
                  placeholder="Enter Ticket ID"
                  onChange={(e) => setTicket(e.target.value)}
                  style={{marginTop:"30px"}}
                />
              </Form.Group>

              <div className="mt-2">
                
                <Button variant="primary" onClick={() => handleLoadTicket()}>
                  Submit
                </Button>
              </div>
            </Form>
            {data !== undefined ? (
              <>
                <div
                  style={{
                   
                    backgroundColor: "#323e45",
                    color:"white",
                    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                    padding: "20px 40px",
                    borderRadius: "10px",
                    marginTop: "40px",
                    fontFamily: "Augestina"
                  }}
                >
                  <h2 style={{ textAlign: "center", marginTop: "20px" }}>Welcome to Zen Desk!</h2>
                  
                    <b >Issue Title :</b> {data.issueTitle}
                 
                  <div>
                    <b>Issue Type :</b> {data.issueType}
                  </div>
                  <div>
                    <b>Issue Description :</b> {data.issueDescription}
                  </div>
                  <div>
                    <b>Status :</b>
                    <span
                      style={
                        data.status === "Open"
                          ? { color: "red" }
                          : data.status === "In-Progress"
                          ? { color: "#d4d435" }
                          : { color: "green" }
                      }
                    >
                      {data.status}
                    </span>
                    <div>
                      <b>Created Date : </b>
                      {data.createdAt}
                    </div>
                    {data.status === "In-Progress" ||
                    data.status === "Clossed" ? (
                      <div>
                        <b>Opend Date : </b>
                        {data.inProgressDate}
                      </div>
                    ) : (
                      <></>
                    )}
                    {data.status === "Clossed" ? (
                      <div>
                        <strong>Closed Date : </strong>
                        {data.closedDate}
                      </div>
                    ) : (
                      <></>
                    )}
                    <div>
                      <b>Comment :</b> {data.comments}
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
