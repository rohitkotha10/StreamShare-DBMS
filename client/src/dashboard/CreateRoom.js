import * as React from 'react'
import { useState, useEffect } from 'react';

import { useNavigate, useLocation } from "react-router-dom";

import {
  Box,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  MenuItem
} from '@mui/material';

import { PlanDialog } from '../dialogs/create-dialog';

export default function CreateRoom() {
  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const [roomName, setRoomName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [platform, setPlatform] = useState('');
  const [options, setOptions] = useState([{ PLATFORM_NAME: null }]);
  const caps = [5, 10, 15, 20, 25, 30];

  useEffect(() => {
    fetch("http://localhost:5000/platform/names", {
      method: "GET",
    }).then(data => data.json())
      .then((data) => {
        setOptions(data);
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
            Create Room
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
                <Grid
                  container
                  spacing={2}
                  sx={{ maxWidth: 420 }}
                >
                  <Grid
                    item
                    xs={12}
                  >
                    <TextField label="Room Name" variant="outlined" fullWidth
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <TextField
                      fullWidth
                      label="Capacity"
                      variant="outlined"
                      select
                      onChange={(e) => setCapacity(e.target.value)}
                    >
                      {caps.map((cap) => (
                        <MenuItem
                          key={cap}
                          value={cap}
                        >
                          {cap}
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
                      label="Platform"
                      variant="outlined"
                      select
                      onChange={(e) => setPlatform(e.target.value)}
                    >
                      {options.map((plat) => (
                        <MenuItem
                          key={plat.PLATFORM_NAME}
                          value={plat.PLATFORM_NAME}
                        >
                          {plat.PLATFORM_NAME}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>

                  <Grid
                    item
                    xs={12}
                  >
                    <PlanDialog admin={email} roomName={roomName} capacity={capacity} platform={platform} />
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
