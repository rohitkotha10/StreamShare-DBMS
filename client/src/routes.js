import * as React from 'react';

import { Navigate } from 'react-router-dom'
import { Link as RouterLink } from 'react-router-dom';

import {
  Box,
  Button,
  Container,
  Typography
} from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';

import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'

import Navbar from './dashboard/Navbar'
import CreateRoom from './dashboard/CreateRoom'
import JoinRoom from './dashboard/JoinRoom'
import MyRooms from './dashboard/MyRooms'
import Profile from './dashboard/Profile'

export const routes = [
  {
    path: '/',
    element: <LoginPage />
  },
  {
    path: 'register',
    element: <RegisterPage />
  },
  {
    path: 'dashboard',
    element: <Navbar />,
    children: [
      {
        path: '',
        element: <MyRooms />
      },
      {
        path: 'createroom',
        element: <CreateRoom />
      },
      {
        path: 'joinroom',
        element: <JoinRoom />
      },
      {
        path: 'profile',
        element: <Profile />
      }
    ]
  },
  {
    path: '*',
    element: <Navigate to="/404" />
  },
  {
    path: '404',
    element:
      <Box sx={{ backgroundColor: 'background.default' }}>
        <Container
          maxWidth="md"
          sx={{
            px: 5,
            py: 14,
            alignitems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <SentimentVeryDissatisfiedIcon />
          <Typography
            align="center"
            color="#ffff"
            sx={{ my: 2 }}
            variant="h3"
          >
            Nothing here!
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            variant="body2"
          >
            The page requested does not exist.
          </Typography>
          <Button
            color="primary"
            component={RouterLink}
            sx={{ mt: 2 }}
            to="/"
            variant="text"
          >
            Take me home
          </Button>
        </Container>
      </Box>
  }
];