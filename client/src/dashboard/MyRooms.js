import * as React from 'react'
import { useState, useEffect } from 'react';

import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Button,
  Card, Container, Divider,
  Typography
} from '@mui/material';

import { AdminRooms } from '../rooms/AdminRooms';
import { UserRooms } from '../rooms/UserRooms';

export default function JoinRoom() {
  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;

  const [roomsAdmin, setAdminr] = useState([]);
  const [roomsUser, setUserr] = useState([]);

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
            As Admin
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card variant="outlined">
          <AdminRooms email={email} rooms={roomsAdmin} />
          <Divider />
        </Card>
      </Container>
      <br />

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
            As User
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        <Card variant="outlined">
          <UserRooms email={email} rooms={roomsUser} />
          <Divider />
        </Card>
      </Container>
    </Box>
  );
};
