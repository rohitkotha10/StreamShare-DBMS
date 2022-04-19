import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import {
  Button,
  Typography,
  Box,
  TextField,
  Container,
  InputLabel,
  MenuItem,
  FormControl,
  Select
} from '@mui/material'

export default function LoginPage() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [authenticated, setAuth] = React.useState(5)

  let navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()

    const userdetails = { email, password }
    if (email.length == 0 || password.length == 0) {
      setAuth(4);
      return;
    }
    console.log(userdetails)
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

  React.useEffect(() => {
    if (authenticated == 0) {
      const em = email;
      console.log(em);
      navigate("dashboard", { state: { email: email } });
    }
  }, [authenticated]);

  return (
    <div>
      <Box
        sx={{
          width: "100hh",
          height: "100vh",
        }} pt={20}
      >
        <Container sx={{ justifyContent: 'center' }} >
          <div>

            <Box sx={{ width: 375, height: 470, borderRadius: 3, boxShadow: 20 }} ml={50}>
              <Box>
                <Typography fontSize={42} fontWeight={400}>
                  Sign In
                </Typography>
              </Box>

              {!(authenticated == 0 || authenticated == 5) && (
                <Typography color="#eb6359">
                  Something Wrong! Please Try Again.
                </Typography>
              )}

              <Box
                component="form"
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
              >
                <TextField id="outlined-basic" label="Email" variant="filled"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <TextField id="outlined-password-input" label="Password" type="password" variant="filled"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Box>

              <Box
                sx={{
                  '& > :not(style)': { m: 2, width: '12ch' },
                }}>
                <Button variant="contained" onClick={handleClick}>
                  Sign In
                </Button>
              </Box>

              <Link to="/register" style={{ textDecoration: 'none', color: "black" }}>
                <Button>
                  New User? Sign up here
                </Button>
              </Link>
            </Box>
          </div>
        </Container >
      </Box>
    </div >
  );
}