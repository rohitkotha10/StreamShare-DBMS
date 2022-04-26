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
  MenuItem
} from '@mui/material';

export const PlanDialog = (props) => {
  const { admin, roomName, capacity, platform } = props;
  const [open, setOpen] = useState(false);
  const [authenticated, setAuth] = useState(5)
  const [plan, setPlan] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [plans, setPlans] = useState([{ PLAN_TYPE: null }])

  let navigate = useNavigate();

  const handleClickOpen = () => {
    if (admin.length === 0 || roomName.length === 0 || capacity.length === 0 || platform.length === 0) {
      setAuth(4);
      return;
    }
    const toSend = { platform_name: platform }
    fetch("http://localhost:5000/platform/plans", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    }).then(data => data.json())
      .then((data) => {
        setPlans(data);
        console.log(data);
        if (data.length > 0)
          setOpen(true);
      })
  };

  const handleClose = () => {
    if (plan.length === 0 || account.length === 0 || password.length === 0) {
      setAuth(3)
      return;
    }

    const toSend = {
      room_name: roomName, admin_email: admin,
      capacity: capacity, member_cnt: 1, platform_name: platform, plan_type: plan,
      stream_account: account, stream_password: password
    }
    console.log(toSend);

    fetch("http://localhost:5000/room/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
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
      navigate("/dashboard", { state: { email: admin } });
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
        <DialogTitle variant="h4">Plan Details</DialogTitle>
        {!(authenticated === 0 || authenticated === 5 || authenticated === 4) && (
          <Typography color="#eb6359">
            Duplicate Room Name or Empty Field. Please Try Again!
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
                    key={plan.PLAN_TYPE}
                    value={plan.PLAN_TYPE}
                  >
                    {plan.PLAN_TYPE}
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
