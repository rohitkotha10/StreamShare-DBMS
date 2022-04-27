import * as React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";


import {
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel
} from '@mui/material';

export const JoinDialog = (props) => {
  const { room, email } = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [authenticated, setAuth] = useState(5)
  const [payer, setPayer] = useState();

  let navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (message.length === 0 || payer.length === 0) {
      setAuth(4)
      return;
    }

    const details = { user_email: email, room_name: room, message: message, user_type: payer }
    console.log(details)

    fetch("http://localhost:5000/request/send", {
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
      navigate("/dashboard", { state: { email: email } });
    }
  }, [authenticated]);

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        color="primary"
        size="large"
        variant="contained"
      >
        Send Request
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Join Request</DialogTitle>
        {!(authenticated === 0 || authenticated === 5) && (
          <Typography color="#eb6359">
            Request Sent Already or Empty Field. Please Try Again!
          </Typography>
        )}
        <DialogContent alignitems="center">
          <br />
          <Grid
            container
            spacing={2}
            alignitems="center"
            justifyContent="center"
            sx={{ maxWidth: 420 }}
          >

            <Grid
              item
              xs={12}
            >
              <TextField

                fullWidth
                label="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormControl>
                <FormLabel>User Type</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={payer}
                  onChange={(e) => setPayer(e.target.value)}
                >
                  <FormControlLabel value={0} control={<Radio />} label="NON-PAYING" />
                  <FormControlLabel value={1} control={<Radio />} label="PAYING" />
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Send Join Request</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
