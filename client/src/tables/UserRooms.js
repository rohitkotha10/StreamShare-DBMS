import * as React from 'react'
import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { UserDialog } from './UserMembers'

export const UserRooms = (props) => {
  const { email } = props;
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const userdetails = { user_email: email }
    console.log(userdetails)
    fetch("http://localhost:5000/room/user", {
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
              Account
            </TableCell>
            <TableCell align='center'>
              Password
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
                  {room.STREAM_ACCOUNT}
                </TableCell>

                <TableCell align='center'>
                  {room.STREAM_PASSWORD}
                </TableCell>

                <TableCell align='center'>
                  <UserDialog email={email} room={room.ROOM_NAME} />
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div >
  );
};