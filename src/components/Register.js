import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EmailIcon from "@mui/icons-material/Email";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useFormik } from "formik";
import { url } from "../Api/api";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { IconButton, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const theme = createTheme();

export default function SignUp() {
  const [showPwd, setShowPwd] = useState(true);

  const handleShowPassword = () => {
    setShowPwd(!showPwd);
  };
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
      typeOfUser: "",
    },

    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Required";
      }
      if (values.username.length == 0) {
        errors.username = "Required";
      } else if (values.username.length < 5) {
        errors.username = "Username length should be morethan 5Character";
      }
      if (values.password.length === 0) {
        errors.password = "Required";
      } else if (values.password.length < 8) {
        errors.password = "Password length should be morethan 8Character";
      }
      if (!values.typeOfUser) {
        errors.email = "Required";
      }
      return errors;
    },

    onSubmit: async (values, { resetForm }) => {
      try {
        let postData = await axios.post(`${url}/users/register`, values);
        resetForm({ values: "" });
        toast.success(postData.data.message);
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        alert("Register Error!");
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <EmailIcon />
          </Avatar> */}
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            Validate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "14px",
                    color: "#7e8e9f",
                    paddingBottom: "5px",
                  }}
                >
                  User Name
                </Typography>
                <TextField
                  size="small"
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="UserName"
                  onChange={formik.handleChange}
                  autoFocus
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "14px",
                    color: "#7e8e9f",
                    paddingBottom: "5px",
                  }}
                >
                  Email
                </Typography>
                <TextField
                  size="small"
                  required
                  fullWidth
                  id="email"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontFamily: "DM Sans",
                    fontStyle: "normal",
                    fontWeight: "500",
                    fontSize: "16px",
                    lineHeight: "14px",
                    color: "#7e8e9f",
                    paddingBottom: "5px",
                  }}
                >
                  Password
                </Typography>
                <TextField
                  size="small"
                  required
                  fullWidth
                  name="password"
                  type={!showPwd ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  onChange={formik.handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPwd === false ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <FormControl style={{ marginLeft: "20px", marginTop: "10px" }}>
                <FormLabel>Register As</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="typeOfUser"
                >
                  <FormControlLabel
                    value="admin"
                    control={<Radio />}
                    label="Admin"
                    onChange={formik.handleChange}
                  />
                  <FormControlLabel
                    value="user"
                    control={<Radio />}
                    label="User"
                    onChange={formik.handleChange}
                  />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              onSubmit={formik.handleSubmit}
              variant="outlined"
              sx={{
                mb: 1,
                backgroundColor: "#323e45",
                color: "white",

                "&:hover": {
                  backgroundColor: "#323e45",
                },

                fontFamily: "DM Sans",
                fontSize: "17px",
                textTransform: "inherit",
              }}
            >
              Sign Up
            </Button>

             <Grid container>
              <Grid item xs>
              </Grid>
              <Grid
              container
              style={{
                marginLeft: "80px",
              }}
            >
              <Grid item>
               
               Already have an account?
                <Link
                  style={{
                    color: "#4e0ef",
                    textDecoration: "none",
                    fontWeight: "bold",
                  }}
                  to="/"
                >
                  {" Sign In"}
                </Link>
              </Grid>
            </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </ThemeProvider>
  );
}
