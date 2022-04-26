import * as React from 'react';
import { useState, useEffect } from 'react';

import {
  Grid,
  TextField,
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  MenuItem
} from '@mui/material';

export const JoinDialog = (props) => {
  const { room } = props;
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [authenticated, setAuth] = useState(5)
  const [payer, setPayer] = useState();
  const types = ['PAYING', 'NON-PAYING'];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (message.length === 0 || payer.length === 0) {
      setAuth(4)
      return;
    }

    const details = { message, payer, room }
    console.log(details)

    // fetch("http://localhost:8080/myorders/addcomment", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(details)
    // }).then(data => data.json())
    //   .then((data) => {
    //     setAuth(data);
    //     console.log(data);
    //   })
  };

  useEffect(() => {
    if (authenticated === 0) {
      setOpen(false)
      setAuth(5);
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
        <DialogTitle variant="h4">Review</DialogTitle>
        {!(authenticated === 0 || authenticated === 5) && (
          <Typography color="#eb6359">
            Something Wrong, Please Try Again
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
              <TextField
                fullWidth
                label="User Type"
                variant="outlined"
                select
                onChange={(e) => setPayer(e.target.value)}
              >
                {types.map((type) => (
                  <MenuItem
                    key={type}
                    value={type}
                  >
                    {type}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Send Join Request</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
