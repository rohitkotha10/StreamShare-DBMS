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
      <Table
        sortdirection='desc'>
        <TableHead>
          <TableRow>
            <TableCell>
              Room Name
            </TableCell>
            <TableCell>
              Admin
            </TableCell>
            <TableCell>
              Platform
            </TableCell>
            <TableCell>
              Plan
            </TableCell>
            <TableCell>
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rooms.map((room) => {
            return (
              <TableRow key={room.ROOM_NAME}>
                <TableCell>
                  {room.ROOM_NAME}
                </TableCell>

                <TableCell>
                  {room.ADMIN_EMAIL}
                </TableCell>

                <TableCell>
                  {room.PLATFORM_NAME}
                </TableCell>

                <TableCell>
                  {room.PLAN_TYPE}
                </TableCell>

                <TableCell>
                  {<JoinDialog room={room} />}
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};