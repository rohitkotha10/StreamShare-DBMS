import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import {
  Typography
} from '@mui/material';

export const AddBut = (props) => {
  const { comment } = props;
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
      >
        View
      </Button>

      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={() => setOpen(false)}
      >
        <DialogContent alignitems="center">
          <br />
          <Typography key={comment}>
            {comment}
          </Typography>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
