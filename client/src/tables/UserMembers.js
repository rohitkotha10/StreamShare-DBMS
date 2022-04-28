import * as React from 'react';
import { useState, useEffect } from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import { PaymentDialog } from '../dialogs/payment-dialog'
import { LeaveDialog } from '../dialogs/leave-dialog'

export const UserDialog = (props) => {
  const { email, room } = props;
  const [users, setUsers] = useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    const toSend = { room_name: room }
    fetch("http://localhost:5000/room/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    }).then(data => data.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
        if (data.length > 0)
          setOpen(true);
      })
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        View Room
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {'Room: '} {room}
            </Typography>
          </Toolbar>
        </AppBar>

        <div>
          <Box
            sx={{ p: 1 }}
          >
            <PaymentDialog email={email} room={room} />
          </Box>
          <Box
            sx={{ p: 1 }}
          >
            <LeaveDialog email={email} room={room} />
          </Box>
          <Table sortdirection='asc'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  User Email
                </TableCell>
                <TableCell align='center'>
                  Name
                </TableCell>
                <TableCell align='center'>
                  Age
                </TableCell>
                <TableCell align='center'>
                  User Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.USER_EMAIL}>
                    <TableCell align='center'>
                      {user.USER_EMAIL}
                    </TableCell>

                    <TableCell align='center'>
                      {user.USER_NAME}
                    </TableCell>

                    <TableCell align='center'>
                      {user.AGE}
                    </TableCell>

                    <TableCell align='center'>
                      {user.USER_TYPE === 1 ? 'PAYING' : 'NON-PAYING'}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </Dialog>
    </div>
  );
}
