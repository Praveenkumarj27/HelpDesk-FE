import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Success() {
  let params = useParams();

  let [toggle, setToggle] = useState(false);

  let handleCopy = () => {
    setToggle(true);
    navigator.clipboard.writeText(params.id);
    setTimeout(() => {
      setToggle(false);
    }, 2000);
  };
  return (
    <>
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" class="d-flex flex-column">
          <div id="content">
            <Navbar />
            <div className="success-wrapper" style={{marginTop:"90px",borderRadius:"20px",color:"#323e45"}}>
              <CheckCircleOutlineIcon sx={{ fontSize: 100 }} />
              <h1>Success</h1>
              <b >
                Your Ticket is {params.id}
                <span  onClick={() => handleCopy()} className="copy">
                  <ContentCopyIcon />
                  {toggle ? (
                    <span style={{ color: "black" }}>Coppied!</span>
                  ) : (
                    <></>
                  )}
                </span>
              </b>
              <p style={{marginTop:"7px"}}>
                Visit <Link to="/track-issue" style={{textDecoration:"underline"}}>here</Link> to find the status of
                the ticket
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
