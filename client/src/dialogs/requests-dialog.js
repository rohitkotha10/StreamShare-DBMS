import * as React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';

export const RequestsDialog = (props) => {
  const { room, email } = props;
  const [open, setOpen] = useState(false);
  const [authenticated, setAuth] = useState(5)
  const [users, setUsers] = useState([]);

  const handleClickOpen = () => {
    const toSend = { room_name: room }
    fetch("http://localhost:5000/request/view", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    }).then(data => data.json())
      .then((data) => {
        setUsers(data);
        console.log(data);
      })
    setOpen(true);
  };

  const handleAccept = (event, requser) => {
    const details = {
      user_email: requser.USER_EMAIL, user_type: requser.USER_TYPE,
      room_name: room, response: 1
    }

    fetch("http://localhost:5000/request/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    }).then(data => data.json())
      .then((data) => {
        setAuth(data);
        console.log(data);
      })
  };

  const handleReject = (event, requser) => {
    const details = {
      user_email: requser.USER_EMAIL, user_type: requser.USER_TYPE,
      room_name: room, response: 0
    }

    fetch("http://localhost:5000/request/response", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    }).then(data => data.json())
      .then((data) => {
        setAuth(data);
        console.log(data);
      })
  };

  useEffect(() => {
    if (authenticated === 0) {
      setOpen(false)
      setAuth(5)
    }
  }, [authenticated]);

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        View Requests
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Requests</DialogTitle>
        <DialogContent alignitems="center">
          <Table sortdirection='asc'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>
                  User Email
                </TableCell>
                <TableCell align='center'>
                  Message
                </TableCell>
                <TableCell align='center'>
                  User Type
                </TableCell>
                <TableCell align='center'>
                  Action
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
                      {user.MESSAGE}
                    </TableCell>

                    <TableCell align='center'>
                      {user.USER_TYPE === 1 ? 'PAYING' : 'NON-PAYING'}
                    </TableCell>
                    <TableCell align='center'>
                      <Button size="small" onClick={(e) => {
                        handleAccept(e, user);
                      }}>
                        Accept
                      </Button>
                      <Button size="small" onClick={(e) => {
                        handleReject(e, user);
                      }}>
                        Reject
                      </Button>
                    </TableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </React.Fragment >
  );
}
