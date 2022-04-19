import React from 'react'
import { useState, useEffect } from 'react';

import { UsersTable } from '../components/users-table';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card, Container, Divider,
  Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Image from '../image/super2.jpg';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    height: "100vh",
    weight: "100hh"
  }
};


export default function Orders() {
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


  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const type = location.state.type;

  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/user/getallusers", {
  //     method: "GET",
  //   }).then(data => data.json())
  //     .then((data) => {
  //       setUsers(data);
  //       //console.log(data);
  //     })
  // }, [users])

  return (
    <ThemeProvider theme={styletheme}>

      <Box
        style={styles.paperContainer}
        sx={{
          backgroundColor: 'background.default',
          pb: 3,
          pt: 8
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              alignitems: 'center',
              display: 'flex',
              mb: 3
            }}
          >
            <Typography
              color="#ffff"
              variant="h4"
            >
              Users
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Card variant="outlined">
            <UsersTable users={users} />
            <Divider />
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};