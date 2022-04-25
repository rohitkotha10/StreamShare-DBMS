import * as React from 'react'
import { useState, useEffect } from 'react';

import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Card, Container, Divider,
  Typography
} from '@mui/material';

import { AvailableRooms } from '../rooms/AvailableRooms';

export default function JoinRoom() {
  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const [rooms, setRooms] = useState([]);

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

    <Box
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
            color="black"
            variant="h4"
          >
            Available Rooms
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card variant="outlined">
          <AvailableRooms email={email} rooms={rooms} />
          <Divider />
        </Card>
      </Container>
    </Box>
  );
};
