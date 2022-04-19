import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

import {
  Rating,
  Grid,
  TextField,
  Typography
} from '@mui/material';

export const AddBut = (props) => {
  const { Orderarr } = props;
  const [open, setOpen] = React.useState(false);
  const [rating, setRating] = React.useState(3);
  const [comment, setComment] = React.useState('');
  const [authenticated, setAuth] = React.useState(5)
  const [id, setId] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (id == null) {
      setAuth(4)
      return;
    }

    const details = { id, comment, rating }
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

  React.useEffect(() => {
    if (authenticated == 0) {
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
        Add Review
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Review</DialogTitle>
        {!(authenticated == 0 || authenticated == 5) && (
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
                label="Order ID"
                variant="outlined"
                select
                variant="outlined"
                onChange={(e) => setId(e.target.value)}
              >
                {Orderarr.map((orders) => (
                  <MenuItem
                    key={orders.id}
                    value={orders.id}
                  >
                    {orders.id}
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
                label="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <Rating
                name="simple-controlled"
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
              />
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Complete</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
