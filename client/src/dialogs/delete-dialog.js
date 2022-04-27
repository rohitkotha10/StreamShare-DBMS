import * as React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText
} from '@mui/material';

export const DeleteDialog = (props) => {
  const { email, room } = props;
  const [open, setOpen] = useState(false);
  const [authenticated, setAuth] = useState(5);

  let navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const toSend = { user_email: email, room_name: room }
    fetch("http://localhost:5000/room/delete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    }).then(data => data.json())
      .then((data) => {
        console.log(data);
        setAuth(data);
      })
  };

  useEffect(() => {
    if (authenticated === 0) {
      setOpen(false)
      setAuth(5)
      navigate("/dashboard/profile", { state: { email: email } });
    }
  }, [authenticated]);

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Room
      </Button>
      <Dialog
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You Sure?
          </DialogContentText>
        </DialogContent>

        <Button onClick={handleClose} autoFocus>
          Yes
        </Button>

        <Button onClick={() => { setOpen(false) }} autoFocus>
          No
        </Button>
      </Dialog>
    </div>
  );
}
