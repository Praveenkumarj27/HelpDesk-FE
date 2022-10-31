import React, { useState, useContext, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { url } from "../Api/api";

function Issues() {
 
  let params = useParams();
  let [data, setData] = useState(undefined);
  let [comment, setComment] = useState("");
  let navigate = useNavigate();

  let handleLoadTicket = async () => {
    let res = await axios.get(`${url}/issues/${params.id}`);
    if (res.data.statusCode === 200) {
      setData(res.data.issue[0]);
      setComment(res.data.issue[0].comments);
    }
  };

  useEffect(() => {
    handleLoadTicket();
  }, []);

  let nextStage = async (stage) => {
    let res = await axios.put(
      `${url}/change-status/${params.id}`,
      {
        comments: comment,
      }
    );
    if (res.data.statusCode === 200) {
      navigate("/dashboard");
    }
  };
  return (
    
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div
              className="col-5 mx-auto"
              style={{
                color:"white",
                backgroundColor: "#323e45",
                boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
                padding: "20px 40px",
                borderRadius: "10px",
                marginTop: "80px",
                fontFamily: "Augestina"
              }}
            >
              {data !== undefined ? (
                <>
                  <div style={{ textAlign: "left", paddingTop: "5px" }}>
                    <h2 style={{ textAlign: "center",fontFamily: "Augestina" }}>
                      Welcome to Zen Desk!
                    </h2>
                    <div style={{ marginTop: "20px" }}>
                      <strong>Issue Title :</strong> {data.issueTitle}
                    </div>
                    <div>
                      <strong>Issue Type :</strong> {data.issueType}
                    </div>
                    <div>
                      <strong>Issue Description :</strong>{" "}
                      {data.issueDescription}
                    </div>
                    <div>
                      <strong>Status :</strong>
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
                        <strong>Created Date : </strong>
                        {data.createdAt}
                      </div>
                      {data.status === "In-Progress" ||
                      data.status === "Clossed" ? (
                        <div>
                          <strong>Opend Date : </strong>
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
                        <strong>Comment :</strong>
                        <input
                          type={"textArea"}
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </div>
                      <br></br>
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => {
                        navigate("/query");
                      }}
                    >
                      Back 
                    </Button>
                    &nbsp;
                    {data.status === "Open" ? (
                      <Button
                        variant="warning"
                        onClick={() => {
                          nextStage();
                        }}
                      >
                        In-Progress
                      </Button>
                    ) : data.status === "In-Progress" ? (
                      <Button
                        variant="success"
                        onClick={() => {
                          nextStage();
                        }}
                      >
                        Close
                      </Button>
                    ) : (
                      <></>
                    )}
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

export default Issues;
