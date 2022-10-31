import React from "react";
import "../App.css";
import { Link, NavLink } from "react-router-dom";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { EventNote } from "@mui/icons-material";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
const Sidebar = ({ pageName, setPageName }) => {
  const [role] = React.useState(localStorage.getItem("role"));
  return (
    <div>
      <div className="firstCol">
        <h2
          style={{
            textAlign: "center",
            padding: "10px 0px",
            fontFamily: "Freehand",
          }}
        >
          Zendesk
        </h2>
        {role === "admin" ? (
          <NavLink
            to="/dashboard"
            style={{
              textDecoration: "none",
              color: "white",
            }}
          >
            <ListItemButton
              sx={{ ":hover": { color: "grey" } }}
              onClick={() => setPageName("Dashboard")}
            >
              <ListItemIcon sx={{ ":hover": { color: "#6610f2" } }}>
                <EventNote sx={{ color: "grey" }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
          </NavLink>
        ) : null}

        <NavLink to="/query" style={{ textDecoration: "none", color: "white" }}>
          <ListItemButton
            onClick={() => setPageName("Query")}
            sx={{ ":hover": { color: "grey" } }}
          >
            <ListItemIcon sx={{ ":hover": { color: "#6610f2" } }}>
              <QueryBuilderIcon sx={{ color: "grey" }} />
            </ListItemIcon>
            <ListItemText primary="Query" />
          </ListItemButton>
        </NavLink>

        <NavLink
          to="/track-issue"
          style={{ textDecoration: "none", color: "white" }}
        >
          <ListItemButton
            sx={{ ":hover": { color: "grey" } }}
            onClick={() => setPageName("status")}
          >
            <ListItemIcon sx={{ ":hover": { color: "#6610f2" } }}>
              <QueryStatsIcon sx={{ color: "grey", fontSize: "large" }} />
            </ListItemIcon>
            <ListItemText primary="Status" />
          </ListItemButton>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
