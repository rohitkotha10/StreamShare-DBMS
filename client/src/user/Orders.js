import React from 'react'
import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { OrdersTable } from '../components/orders-table';
import { AddBut } from '../components/addcomment-dialog';

import {
  Box,
  Button,
  Card, Container, Divider,
  Typography
} from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Image from '../image/super2.jpg';

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    height: "100vh",
    width: "100hh"
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

  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   const userdetails = { email }
  //   //console.log(userdetails)
  //   fetch("http://localhost:8080/user/getorders", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(userdetails)
  //   }).then(data => data.json())
  //     .then((data) => {
  //       setOrders(data);
  //       //console.log(data);
  //     })
  // }, [])

  return (

    <ThemeProvider theme={styletheme}>
      <Box style={styles.paperContainer}
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
              Orders
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <AddBut Orderarr={orders} />
          </Box>
          <Card variant="outlined">
            <OrdersTable orders={orders} />
            <Divider />
          </Card>
        </Container>
      </Box>
    </ThemeProvider>
  );
};
