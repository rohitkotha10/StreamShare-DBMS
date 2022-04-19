import React from 'react'
import { Navigate } from 'react-router-dom'

import UserLayout from './user/UserLayout'
import UserInfo from './user/ProfileInfo'
import UserBooking from './user/Booking'
import UserOrders from './user/Orders'

import AdminLayout from './admin/AdminLayout'
import AdminOrders from './admin/Orders'
import AdminUsers from './admin/Users'
import AdminWorkers from './admin/Workers'
import AdminParking from './admin/ParkingSpots'

import WorkerLayout from './worker/WorkerLayout'
import WorkerOrders from './worker/Orders'
import WorkerInfo from './worker/ProfileInfo'

import LoginPage from './auth/LoginPage'
import RegisterPage from './auth/RegisterPage'
import VerificationPage from './auth/VerificationPage'

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

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
    path: 'verify',
    element: <VerificationPage />
  },
  {
    path: 'admin',
    element: <AdminLayout />,
    children: [
      {
        path: '',
        element: <AdminOrders />
      },
      {
        path: 'parking',
        element: <AdminParking />
      },
      {
        path: 'users',
        element: <AdminUsers />
      },
      {
        path: 'workers',
        element: <AdminWorkers />
      }
    ]
  },
  {
    path: 'user',
    element: <UserLayout />,
    children: [
      {
        path: '',
        element: <UserOrders />
      },
      {
        path: 'booking',
        element: <UserBooking />
      },
      {
        path: 'info',
        element: <UserInfo />
      }
    ]
  },
  {
    path: 'worker',
    element: <WorkerLayout />,
    children: [
      {
        path: '',
        element: <WorkerOrders />
      },
      {
        path: 'info',
        element: <WorkerInfo />
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