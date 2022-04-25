import * as React from 'react';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Typography,
  Box,
  TextField,
  Paper
} from '@mui/material';

import image from "../image/bg1.jpeg";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuth] = useState(5);

  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    const userdetails = { email, password };
    if (email.length == 0 || password.length == 0) {
      setAuth(4);
      return;
    }
    console.log(userdetails);
    setAuth(0);
    // fetch("http://localhost:8080/login/normallogin", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(userdetails)
    // }).then(data => data.json())
    //   .then((data) => {
    //     setAuth(data);
    //     console.log(data);
    //   })
  }

  useEffect(() => {
    if (authenticated == 0) {
      const em = email;
      console.log(em);
      navigate("dashboard", { state: { email: email } });
    }
  }, [authenticated]);

  return (
    <Box
      style={{
        backgroundImage: `url(${image})`,
      }}
      sx={{
        width: "100hh",
        height: "100vh",
      }} pt={20}
    >
      <Paper sx={{ p: 3, mx: 'auto', width: '25%', height: 'auto', borderRadius: 3 }}>
        <Paper elevation={3}
          sx={{ p: 2, background: 'radial-gradient(#99ebff, #00ccff)', mt: -5, mb: 5, borderRadius: 1 }}
        >
          <Typography fontSize={34} fontWeight={600} color='black'>
            Sign in
          </Typography>
        </Paper>

        {!(authenticated == 0 || authenticated == 5) && (
          <Typography color="#eb6359">
            Something Wrong! Please Try Again.
          </Typography>
        )}

        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '35ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField id="outlined-basic" label="Email" variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField id="outlined-password-input" label="Password" type="password" variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            '& > :not(style)': { m: 2, width: '12ch' },
          }}>
          <Button variant="contained" onClick={handleClick}>
            SIGN IN
          </Button>
        </Box>

        <Link to="/register" style={{ textDecoration: 'none', color: "black" }}>
          <Button>
            New User? Sign up
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}