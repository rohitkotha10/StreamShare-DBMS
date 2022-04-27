import * as React from 'react'
import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { JoinDialog } from '../dialogs/join-dialog'

export const AvailableRooms = (props) => {
  const { email } = props;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const userdetails = { user_email: email }
    console.log(userdetails)
    fetch("http://localhost:5000/room/available", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userdetails)
    }).then(data => data.json())
      .then((data) => {
        setRooms(data);
        console.log(data);
      })
  }, [])

  return (
    <div>
      <Table sortdirection='asc'>
        <TableHead>
          <TableRow>
            <TableCell align='center'>
              Room Name
            </TableCell>
            <TableCell align='center'>
              Admin
            </TableCell>
            <TableCell align='center'>
              Platform
            </TableCell>
            <TableCell align='center'>
              Plan
            </TableCell>
            <TableCell align='center'>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => {
            return (
              <TableRow key={room.ROOM_NAME}>
                <TableCell align='center'>
                  {room.ROOM_NAME}
                </TableCell>

                <TableCell align='center'>
                  {room.ADMIN_EMAIL}
                </TableCell>

                <TableCell align='center'>
                  {room.PLATFORM_NAME}
                </TableCell>

                <TableCell align='center'>
                  {room.PLAN_TYPE}
                </TableCell>

                <TableCell align='center'>
                  <JoinDialog room={room.ROOM_NAME} email={email} />
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};