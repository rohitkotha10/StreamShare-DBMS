import * as React from 'react';
import { useState, useEffect } from 'react';

import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography
} from '@mui/material';

export default function ProfileInfo() {
  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const [user, setUser] = useState([{ USER_EMAIL: null, USER_NAME: null, AGE: null }]);

  useEffect(() => {
    const toSend = { user_email: email }
    fetch("http://localhost:5000/dash/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(toSend)
    }).then(data => data.json())
      .then((data) => {
        setUser(data);
        console.log(data);
      })
  }, []);

  return (
    <Box
      sx={{
        width: "100hh",
        height: "100vh",
        pb: 3,
        pt: 8
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            alignitems: 'center',
            display: 'flex',
            mb: 3
          }}
        >
          <Typography
            color="black"
            variant="h4"
          >
            Profile
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>

        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            md={6}
            xs={120}
          >
            <Card
              variant="outlined"
              sx={{ p: 3 }}
            >

              <div>
                <Box
                  sx={{
                    alignitems: 'center',
                    display: 'flex',
                    pb: 3
                  }}
                >
                  <Avatar
                    sx={{
                      height: 64,
                      mr: 2,
                      width: 64
                    }}
                  />
                </Box>

                <Grid
                  container
                  spacing={2}
                  sx={{ maxWidth: 420 }}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField

                      fullWidth
                      label="Name"
                      value={user[0].USER_NAME}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <TextField

                      fullWidth
                      label="Age"
                      value={user[0].AGE}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <TextField

                      fullWidth
                      label="Email"
                      value={user[0].USER_EMAIL}
                      variant="outlined"
                      InputProps={{
                        readOnly: true,
                      }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                </Grid>
              </div>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box >
  );
}
