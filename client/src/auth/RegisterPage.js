import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  select: {
    '&:before': {
      borderColor: 'white',
      background: "#373b3d",
    },
    '&:after': {
      borderColor: 'white',
      background: "#373b3d",
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white',
      background: "#373b3d",
    },
  },
  icon: {
    fill: 'white',
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "#373b3d"
    },

  },
}));

export default function RegisterPage() {

  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [mobileNumber, setMobileNumber] = React.useState('')
  const [carNumber, setCarNumber] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [passwordc, setPasswordc] = React.useState('')
  const [authenticated, setAuth] = React.useState(5)

  let navigate = useNavigate();

  const styletheme = createTheme({
    typography: {

      fontFamily: [
        'Chilanka',
        'cursive',
      ].join(','),
    },
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {

        dark: '#1d1f20',
        main: '#303641',
        background: '#373b3d',
        contrastText: '#ffffff',
      },
      neutral: {
        main: '#ffffff',
      },
    },

  })
  const classes = useStyles();


  const handleClick = (e) => {
    e.preventDefault()

    if (firstName.length == 0 ||
      lastName.length == 0 ||
      address.length == 0 ||
      mobileNumber.length == 0 ||
      carNumber.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      password != passwordc) {
      setAuth(4)
      return;
    }

    const userdetails = { firstName, lastName, address, mobileNumber, carNumber, email, password }
    console.log(userdetails)
    // fetch("http://localhost:8080/register/input", {
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
      navigate('/verify');
    }
  }, [authenticated]);

  return (
    <div>
      <ThemeProvider theme={styletheme}>
        <Box
          sx={{
            width: "100hh",
            height: "100vh",
            backgroundColor: 'secondary.main',
          }} pt={20}>


          <Box sx={{ justifyContent: 'center' }}>

            <div>

              <Box sx={{ backgroundColor: 'secondary.dark', width: 580, height: 462, borderRadius: 3, boxShadow: 20 }} ml={50} >

                <Box>
                  <Typography fontSize={42} fontWeight={400} gutterBottom color='secondary.contrastText'>
                    Registration Form
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
                  <TextField id="outlined-basic" label="First Name" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />

                  <TextField id="outlined-basic" label="Last Name" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />

                  <TextField id="outlined-basic" label="Address" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <TextField id="outlined-basic" label="Mobile No." variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                  />

                  <TextField id="outlined-basic" label="Car Number" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={carNumber}
                    onChange={(e) => setCarNumber(e.target.value)}
                  />

                  <TextField id="outlined-basic" label="Email" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField id="outlined-password-input" label="Password" type="password" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} />

                  <TextField id="outlined-password-input" label="Confirm Password" type="password" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={passwordc}
                    onChange={(e) => setPasswordc(e.target.value)} />

                  {!(password == passwordc) && (
                    <Typography color="#eb6359">
                      Password does not Match!.
                    </Typography>
                  )}

                </Box>
                <Box
                  sx={{
                    '& > :not(style)': { m: 2, width: '12ch' },
                  }}>
                  <Button variant="contained" onClick={handleClick} color="secondary">
                    register
                  </Button>
                </Box>

              </Box>
            </div>
          </Box>

        </Box>
      </ThemeProvider>
    </div>
  );
}


