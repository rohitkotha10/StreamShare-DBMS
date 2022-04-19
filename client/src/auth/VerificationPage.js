import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from "@mui/styles";
import { width } from '@mui/system';
import { withStyles } from "@mui/styles";


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

export default function VerificationPage() {

  const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }

  const [email, setEmail] = React.useState('')
  const [enterCode, setEnterCode] = React.useState('')
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

    if (email.length == 0 ||
      enterCode.length == 0) {
      setAuth(4)
      return;
    }

    const verifyDetails = { email, enterCode }
    console.log(verifyDetails)
    // fetch("http://localhost:8080/register/verifycode", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(verifyDetails)
    // }).then(data => data.json())
    //   .then((data) => {
    //     setAuth(data);
    //     console.log(data);
    //   })
  }

  React.useEffect(() => {
    if (authenticated == 0) {
      navigate('/');
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
          <Container sx={{ justifyContent: 'center' }}>


            <div>
              <Box sx={{ backgroundColor: 'secondary.dark', width: 475, height: 370, borderRadius: 3, boxShadow: 20 }} ml={50} >

                <Box>
                  <Typography fontSize={42} fontWeight={400} gutterBottom color='secondary.contrastText'>
                    Verification Page
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
                  <TextField id="outlined-basic" label="Email" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <TextField id="outlined-basic" label="Code" variant="filled" className={classes.root} color="neutral" InputProps={{ style: { color: "white" } }}
                    value={enterCode}
                    onChange={(e) => setEnterCode(e.target.value)}
                  />

                </Box>
                <Box
                  sx={{
                    '& > :not(style)': { m: 2, width: '12ch' },
                  }}>
                  <Button variant="contained" onClick={handleClick} color="secondary">
                    SUBMIT
                  </Button>
                </Box>
              </Box>
            </div>
          </Container >
        </Box>
      </ThemeProvider>
    </div>
  );

}


