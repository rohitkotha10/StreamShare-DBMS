import React from 'react'
import { useState, useEffect } from 'react';
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { OrdersTable } from '../components/orders-table';
import { Box, Card, Container, Divider, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Image from '../image/super2.jpg';

const styles = {
  paperContainer: {
      backgroundImage: `url(${Image})`,
      height:"100vh",
      weight:"100hh"
  }
};
const useStyles = makeStyles(() => ({
  selectstyle: {
    background: "#373b3d"
  },
  whiteColor: {
    color: "white"
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "#373b3d"
    },

  },
}));

export default function Orders() {

  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const type = location.state.type;

  const [orders, setOrders] = useState([]);

  // useEffect(() => {
  //   fetch("http://localhost:8080/myorders/getallorders", {
  //     method: "GET",
  //   }).then(data => data.json())
  //     .then((data) => {
  //       setOrders(data);
  //       //console.log(data);
  //     })
  // }, [orders])
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
            Orders
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {/* <Button
            color="primary"
            size="large"
            variant="contained"
          >
            Get Orders
          </Button> */}
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
