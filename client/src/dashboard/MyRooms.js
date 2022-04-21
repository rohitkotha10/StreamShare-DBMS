import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { AddBut } from '../components/booking-dialog';
import { makeStyles } from "@mui/styles";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import TimePicker from '@mui/lab/TimePicker';
import Image from '../image/super2.jpg';

import {
  Avatar,
  Box,
  Stack,
  Card,
  Container,
  Grid,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
const useStyles = makeStyles(() => ({
  selectstyle: {
    background: "#373b3d"
  },
  whiteColor: {
    color: "white"
  },
  root: {
    "& .MuiFilledInput-root": {
      background: "#373b3d"
    },

  },
}));

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    height: "100vh",
    weight: "100hh"
  }
};


export default function Booking() {

  let navigate = useNavigate();
  const location = useLocation();
  const email = location.state.email;
  const type = location.state.type;

  const Checkins = ['00:00', '00:30']
  const Durations = [1, 2, 3, 4, 5]
  const Dates = ['2021-12-05', '2021-12-03']

  const [parks, setParks] = useState([]);
  const [works, setWorks] = useState([]);
  const [myOrderdate, setDate] = useState('');
  const [myCheckin, setCheckin] = useState('');
  const [duration, setDuration] = useState('');
  const carWashs = ['YES', 'NO']
  const airFills = ['YES', 'NO']
  const styletheme = createTheme({
    typography: {

      fontFamily: [
        'Chilanka',
        'cursive',
      ].join(','),
    },
    palette: {
      primary: {
        light: '#757ce8',
        main: '#3f50b5',
        dark: '#002884',
        contrastText: '#fff',
      },
      secondary: {

        dark: '#1d1f20',
        main: '#303641',
        background: '#373b3d',
        contrastText: '#ffffff',
      },
      neutral: {
        main: '#ffffff',
      },
    },

  })
  const classes = useStyles();


  return (
    <ThemeProvider theme={styletheme}>
      <Box
        style={styles.paperContainer}
        sx={{
          backgroundColor: 'secondary.main',
          pb: 3,
          pt: 8
        }}
      >
        <Container maxWidth="lg">
          <Box color="secondary.dark"
            sx={{
              alignitems: 'center',
              display: 'flex',
              mb: 3
            }}
          >
            <Typography
              color="#ffff"
              variant="h4"
            >
              Booking
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
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                          <DatePicker
                            label="Date"
                            value={myOrderdate}
                            onChange={(newValue) => {
                              setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                          />
                        </Stack>
                      </LocalizationProvider>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                    >
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <TimePicker
                          label="Basic example"
                          value={myCheckin}
                          minTime={new Date(0, 0, 0, 5, 0)}
                          maxTime={new Date(0, 0, 0, 18, 30)}
                          onChange={(newValue) => {
                            setCheckin(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                    >
                      <TextField
                        fullWidth
                        label="Duration"
                        variant="outlined"
                        select
                        onChange={(e) => setDuration(e.target.value)}
                      >
                        {Durations.map((hrs) => (
                          <MenuItem
                            key={hrs}
                            value={hrs}
                          >
                            {hrs}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>

                    <Grid
                      item
                      xs={12}
                    >
                      <AddBut checkin={myCheckin} incre={duration} date={myOrderdate} mailuser={email} />
                    </Grid>
                  </Grid>
                </div>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box >
    </ThemeProvider>
  );
}
