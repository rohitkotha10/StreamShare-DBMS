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
  const { email, room } = props;
  const [open, setOpen] = useState(false);
  const [authenticated, setAuth] = useState(5)
  const [price, setPrice] = useState();
  const [cnt, setCnt] = useState();

  const handleClickOpen = () => {
    setOpen(true);
    const details = { room_name: room };
    fetch("http://localhost:5000/room/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    }).then(data => data.json())
      .then((data) => {
        console.log(data);
        setPrice(data[0].PLAN_PRICE);
      })
    fetch("http://localhost:5000/room/paymembers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(details)
    }).then(data => data.json())
      .then((data) => {
        console.log(data);
        setCnt(data[0].CNT);
      })
  };

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
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Payment Details</DialogTitle>
        <DialogContent alignitems="center">
          <Typography>Plan Price: {price} Rupees</Typography>
          <Typography>Number of Paying Members: {cnt}</Typography>
          <Typography>Cost per month for each paying member is </Typography>
          <Typography>{(price / cnt).toPrecision(3)} Rupees</Typography>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
