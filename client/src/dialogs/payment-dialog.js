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

export const PaymentDialog = (props) => {
  const { roomName } = props;
  const [open, setOpen] = useState(false);
  const [authenticated, setAuth] = useState(5)

  const handleClickOpen = () => {
    // fetch("http://localhost:8080/myorders/getpayment", {
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
    if (roomName.length === 0) {
      setAuth(4);
      return;
    }
    setOpen(true);
  };

  useEffect(() => {
    if (authenticated === 0) {
      setOpen(false)
      setAuth(5)
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
        View Payment Details
      </Button>
      {!(authenticated === 0 || authenticated === 5) && (
        <Typography color="#eb6359">
          Something Wrong, Please Try Again
        </Typography>
      )}

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Payment Details</DialogTitle>
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
              <Typography>GOOD</Typography>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
