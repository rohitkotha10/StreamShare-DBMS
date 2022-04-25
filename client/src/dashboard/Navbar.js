import * as React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Link as RouterLink, matchPath } from 'react-router-dom';

import { styled } from '@mui/material/styles';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Avatar,
  Box,
  Button,
  Toolbar,
  Typography
} from '@mui/material';

import CreateIcon from '@mui/icons-material/Create';
import PersonIcon from '@mui/icons-material/Person';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';



const items = [
  {
    href: '/dashboard',
    icon: MeetingRoomIcon,
    label: 'MyRooms'
  },
  {
    href: '/dashboard/createroom',
    icon: CreateIcon,
    label: 'Create'
  },
  {
    href: '/dashboard/joinroom',
    icon: SubscriptionsIcon,
    label: 'Join'
  },
  {
    href: '/dashboard/profile',
    icon: PersonIcon,
    label: 'Profile'
  }
];

const DashboardLayoutRoot = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutContentWrapper = styled('div')(
  () => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingLeft: 73,
    paddingTop: '64px'
  })
);

const DashboardLayoutContent = styled('div')({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  overflow: 'auto'
});



export default function Layout() {

  const [page, setPage] = useState("")

  const location = useLocation();
  const email = location.state.email;
  const type = location.state.type;

  let navigate = useNavigate();

  useEffect(() => {
    navigate(page, { state: { email: email, type: type } })
  }, [page])



  return (
    <DashboardLayoutRoot>
      <AppBar

        elevation={0}
        sx={{ backgroundColor: '#1e212a' }}
      >
        <Toolbar
          disableGutters
          sx={{
            alignitems: 'center',
            display: 'flex',
            minHeight: 64,
            px: 3,
            py: 1
          }}
        >
          <Typography align="left" color="white">
            {email} | {type}
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Button onClick={() => {
            navigate('/');
          }}
            color="white"
            sx={{ mr: 1.25 }}
            variant="body2"
          >
            Sign Out
          </Button>
          <Avatar />
        </Toolbar>
      </AppBar>
      <Drawer
        open
        sx={{ zIndex: 1000 }}
        variant="permanent"
        PaperProps={{
          sx: {
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            height: 'calc(100% - 64px)',
            p: 1,
            top: 64,
            width: 73
          }
        }}
      >
        <List sx={{ width: '100%' }}>
          {items.map(({ href, icon: Icon, label }) => {
            const active = matchPath({ path: href, end: true }, location.pathname);

            return (
              <ListItem button onClick={() => {
                setPage(href);
              }}
                disablePadding
                key={href}
                sx={{
                  flexDirection: 'column',
                  color: active ? 'primary.main' : 'text.secondary',
                  px: 2,
                  py: 1.5,
                  '&:hover': {
                    color: 'primary.main'
                  }
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 'auto',
                    color: 'inherit'
                  }}
                >
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={label}
                  primaryTypographyProps={{
                    sx: {
                      pb: 0,
                      pt: 1.25
                    },
                    variant: 'caption'
                  }}
                />
              </ListItem>
            );
          })}
        </List>
      </Drawer>
      <DashboardLayoutContentWrapper>
        <DashboardLayoutContent>
          <Outlet />
        </DashboardLayoutContent>
      </DashboardLayoutContentWrapper>
    </DashboardLayoutRoot>
  );
}