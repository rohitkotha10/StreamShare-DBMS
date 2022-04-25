import * as React from 'react'
import { useState, useEffect } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

import { JoinDialog } from '../components/join-dialog'

export const AvailableRooms = (props) => {
  const { email, rooms } = props;
  const roomss = [{ name: 'A', admin: 'b', platform: 'c', plan: 'd', comment: 's', account: 'we', password: 'good' },
  { name: 'Aa', admin: 'ba', platform: 'ca', plan: 'da', comment: 'sa', account: 'weare', password: 'notgood' }]

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
          {roomss.map((room) => {
            return (
              <TableRow key={room.name}>
                <TableCell>
                  {room.name}
                </TableCell>

                <TableCell>
                  {room.admin}
                </TableCell>

                <TableCell>
                  {room.platform}
                </TableCell>

                <TableCell>
                  {room.plan}
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