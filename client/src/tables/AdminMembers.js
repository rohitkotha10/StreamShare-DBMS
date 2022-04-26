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
import { RequestsDialog } from '../dialogs/requests-dialog'
import { DeleteDialog } from '../dialogs/delete-dialog'
import { RemoveDialog } from '../dialogs/remove-dialog'


export const AdminDialog = (props) => {
  const { room } = props;
  const [users, setUsers] = useState([]);
  const userss = [{ email: 'A', name: 'b', age: 'c', type: 'd' },
  { email: 'A', name: 'b', age: 'c', type: 'd' }];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Manage Room
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
              {'Room: '} {room.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <div>
          <Box
            sx={{ p: 1 }}
          >
            <PaymentDialog roomName={room.name} />
          </Box>
          <Box
            sx={{ p: 1 }}
          >
            <RequestsDialog room={room} />
          </Box>
          <Box
            sx={{ p: 1 }}
          >
            <DeleteDialog room={room} />
          </Box>
          <Table
            sortdirection='desc'>
            <TableHead>
              <TableRow>
                <TableCell>
                  User Email
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Age
                </TableCell>
                <TableCell>
                  User Type
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userss.map((user) => {
                return (
                  <TableRow key={user.name}>
                    <TableCell>
                      {user.email}
                    </TableCell>

                    <TableCell>
                      {user.name}
                    </TableCell>

                    <TableCell>
                      {user.age}
                    </TableCell>

                    <TableCell>
                      {user.type}
                    </TableCell>

                    <TableCell>
                      <RemoveDialog room={room} user={user.email} />
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
