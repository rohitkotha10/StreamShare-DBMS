import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { format } from "date-fns";

import {
  MenuItem,
  Grid,
  TextField,
  Typography
} from '@mui/material';

export const AddBut = (props) => {
  const { checkin, incre, date, mailuser } = props;
  const [open, setOpen] = React.useState(false);
  const [authenticated, setAuth] = React.useState(5)
  const [parkingSlotLocation, setPark] = React.useState('')
  const [workerEmail, setWork] = React.useState('')
  const [carWash, setWash] = React.useState(false)
  const [airFill, setAir] = React.useState(false)
  const userEmail = mailuser

  const [Parks, setParks] = React.useState([])
  const [Works, setWorks] = React.useState([])
  const Options = ["Yes", "No"]

  const handleClickOpen = () => {

    setOpen(true);
    const myOrderdate = format(props.date, "yyyy-MM-dd");
    const myCheckin = format(props.checkin, "HH:mm");
    const myCheckout = format(new Date(checkin.getTime() + (incre * 60 * 60 * 1000)), "HH:mm")
    const details = { myOrderdate, myCheckin, myCheckout }
    console.log(details)

    // fetch("http://localhost:8080/myorders/availablepark", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(details)
    // }).then(data => data.json())
    //   .then((data) => {
    //     setParks(data);
    //     console.log(data);
    //   })

    // fetch("http://localhost:8080/myorders/availablework", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(details)
    // }).then(data => data.json())
    //   .then((data) => {
    //     setWorks(data);
    //     console.log(data);
    //   })
  }

  const handleClose = () => {
    if (parkingSlotLocation.length == 0) {
      setAuth(4)
      return;
    }

    const myOrderdate = format(props.date, "yyyy-MM-dd");
    const myCheckin = format(props.checkin, "HH:mm");
    const myCheckout = format(new Date(checkin.getTime() + (incre * 60 * 60 * 1000)), "HH:mm")

    const tosend = {
      myOrderdate, myCheckin, myCheckout,
      parkingSlotLocation, userEmail, workerEmail, carWash, airFill
    }
    console.log(tosend)

    // fetch("http://localhost:8080/myorders/addmyorders", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify(tosend)
    // }).then(data => data.json())
    //   .then((data) => {
    //     setAuth(data);
    //     console.log(data);
    //   })
  };

  React.useEffect(() => {
    if (authenticated == 0) {
      setOpen(false)
      setAuth(5);
    }
  }, [authenticated]);

  return (
    <React.Fragment>
      <Button
        color="primary"
        size="large"
        type="submit"
        variant="contained"
        onClick={handleClickOpen}
      >
        Next
      </Button>
      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Add Parking Spot</DialogTitle>
        {!(authenticated == 0 || authenticated == 5) && (
          <Typography color="#eb6359">
            Already Exists, Please Try Again
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
                label="Parking Slot"
                variant="outlined"
                select
                variant="outlined"
                onChange={(e) => setPark(e.target.value)}
              >
                {Parks.map((parks) => (
                  <MenuItem
                    key={parks.location}
                    value={parks.location}
                  >
                    {parks.location}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Worker"
                variant="outlined"
                select
                variant="outlined"
                onChange={(e) => setWork(e.target.value)}
              >
                {Works.map((worker) => (
                  <MenuItem
                    key={worker.email}
                    value={worker.email}
                  >
                    {worker.email}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Car Wash"
                variant="outlined"
                select
                variant="outlined"
                onChange={(e) => {
                  if (e.target.value === "Yes") {
                    setWash(true)
                  }
                  else setWash(false)
                }}
              >
                {Options.map((op) => (
                  <MenuItem
                    key={op}
                    value={op}
                  >
                    {op}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Air Fill"
                variant="outlined"
                select
                variant="outlined"
                onChange={(e) => {
                  if (e.target.value === "Yes") {
                    setAir(true)
                  }
                  else setAir(false)
                }}
              >
                {Options.map((op) => (
                  <MenuItem
                    key={op}
                    value={op}
                  >
                    {op}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Add Order</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment >
  );
}
