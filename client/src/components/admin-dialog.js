import * as React from 'react';

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
  IconButton
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export const AdminDialog = (props) => {
  const { room } = props;
  const roomss = [{ name: 'A', admin: 'b', platform: 'c', plan: 'd', comment: 's', account: 'we', password: 'good' },
  { name: 'Aa', admin: 'ba', platform: 'ca', plan: 'da', comment: 'sa', account: 'weare', password: 'notgood' }]
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
            <Button autoFocus color="inherit" onClick={handleClose}>
              View Requests
            </Button>
            <Button color="inherit" onClick={handleClose}>
              Delete Room
            </Button>
          </Toolbar>
        </AppBar>
        <div>
          <Table
            sortdirection='desc'>
            <TableHead>
              <TableRow>
                <TableCell>
                  Room Name
                </TableCell>
                <TableCell>
                  Admin
                </TableCell>
                <TableCell>
                  Platform
                </TableCell>
                <TableCell>
                  Plan
                </TableCell>
                <TableCell>
                  Account
                </TableCell>
                <TableCell>
                  Password
                </TableCell>
                <TableCell>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roomss.map((room) => {
                return (
                  <TableRow key={room.name}>
                    <TableCell>
                      {room.name}
                    </TableCell>

                    <TableCell>
                      {room.admin}
                    </TableCell>

                    <TableCell>
                      {room.platform}
                    </TableCell>

                    <TableCell>
                      {room.plan}
                    </TableCell>

                    <TableCell>
                      {room.account}
                    </TableCell>

                    <TableCell>
                      {room.password}
                    </TableCell>

                    <TableCell>
                      <Button>Remove</Button>
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
