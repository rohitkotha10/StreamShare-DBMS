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

export const PlanDialog = (props) => {
  const { admin, roomName, capacity, platform } = props;
  const [open, setOpen] = useState(false);
  const [authenticated, setAuth] = useState(5)
  const [plan, setPlan] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [plans, setPlans] = useState([])

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
    if (admin.length == 0 || roomName.length == 0 || capacity.length == 0 || platform.length == 0) {
      setAuth(4);
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    if (plan.length == 0 || account.length == 0 || password.length == 0) {
      setAuth(3)
      return;
    }

    const details = { roomName, capacity, platform, admin, plan, account, password }
    console.log(details)

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
  };

  useEffect(() => {
    if (authenticated == 0) {
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
        Enter Details
      </Button>
      {!(authenticated == 0 || authenticated == 5) && (
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
        <DialogTitle variant="h4">Plan Details</DialogTitle>
        {!(authenticated == 0 || authenticated == 5 || authenticated == 4) && (
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
                label="Plan"
                variant="outlined"
                select
                onChange={(e) => setPlan(e.target.value)}
              >
                {plans.map((plan) => (
                  <MenuItem
                    key={plan}
                    value={plan}
                  >
                    {plan}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField label="Account Email" variant="outlined" fullWidth
                value={account}
                onChange={(e) => setAccount(e.target.value)}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField label="Password" variant="outlined" fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Complete</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
