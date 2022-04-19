import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  Grid,
  TextField,
  Typography
} from '@mui/material';

export const AddBut = () => {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authenticated, setAuth] = React.useState(5)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    if (email.length == 0 ||
      name.length == 0) {
      setAuth(4)
      return;
    }

    const details = { email, name, password }
    console.log(details)

    // fetch("http://localhost:8080/worker/addworker", {
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
        Complete Order
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="md"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogTitle variant="h4">Add Worker</DialogTitle>
        {!(authenticated == 0 || authenticated == 5) && (
          <Typography color="#eb6359">
            Something Wrong! Please Try Again.
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
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
            </Grid>

            <Grid
              item
              xs={12}
            >
              <TextField

                fullWidth
                label="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value)
                  setPassword(e.target.value)
                }}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Button onClick={handleClose}>Save Worker</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
