import * as React from 'react';
import { useState, useEffect } from 'react';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";

import {
  Button,
  Typography,
  Box,
  TextField,
  Paper
} from '@mui/material';

import image from "../image/bg2.jpeg";

export default function LoginPage() {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authenticated, setAuth] = useState(5)

  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()

    if (name.length === 0 || age.length === 0 || email.length === 0 || password.length === 0) {
      setAuth(4);
      return;
    }
    const userdetails = { user_email: email, user_password: password, user_name: name, age: age };
    console.log(userdetails);
    fetch("http://localhost:5000/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userdetails)
    }).then(data => data.json())
      .then((data) => {
        setAuth(data);
        console.log(data);
      })
  }

  useEffect(() => {
    if (authenticated === 0) {
      navigate("/", { state: { email: email } });
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
          <Typography fontSize={28} fontWeight={600} color='black'>
            Join us today
          </Typography>
          <Typography fontSize={16} fontWeight={500} color='black'>
            Enter your email and password to register
          </Typography>
        </Paper>

        {!(authenticated === 0 || authenticated === 5) && (
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
          <TextField label="Name" variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField label="Age" variant="standard" type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <TextField label="Email" variant="standard"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField label="Password" variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>

        <Box
          sx={{
            '& > :not(style)': { m: 2, width: '12ch' },
          }}>
          <Button variant="contained" onClick={handleClick}>
            REGISTER
          </Button>
        </Box>

        <Link to="/" style={{ textDecoration: 'none', color: "black" }}>
          <Button>
            Sign in here
          </Button>
        </Link>
      </Paper>
    </Box>
  );
}