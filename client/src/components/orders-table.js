import PropTypes from 'prop-types';
import { AddBut } from './viewcomments-dialog'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const OrdersTable = (props) => {
  const { orders } = props;

  return (
    <div>
      <Table
        sortdirection='desc'>
        <TableHead>
          <TableRow>
            <TableCell>
              OrderID
            </TableCell>
            <TableCell>
              Date
            </TableCell>
            <TableCell>
              Check In
            </TableCell>
            <TableCell>
              Check Out
            </TableCell>
            <TableCell>
              User
            </TableCell>
            <TableCell>
              Worker
            </TableCell>
            <TableCell>
              Parking
            </TableCell>
            <TableCell>
              Air Fill
            </TableCell>
            <TableCell>
              Car Wash
            </TableCell>
            <TableCell>
              Payment
            </TableCell>
            <TableCell>
              Comments
            </TableCell>
            <TableCell>
              Rating
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => {
            return (
              <TableRow key={order.id}>
                <TableCell>
                  {order.id}
                </TableCell>

                <TableCell>
                  {order.myOrderdate}
                </TableCell>

                <TableCell>
                  {order.myCheckin}
                </TableCell>

                <TableCell>
                  {order.myCheckout}
                </TableCell>

                <TableCell>
                  {order.userEmail}
                </TableCell>

                <TableCell>
                  {order.workerEmail}
                </TableCell>

                <TableCell>
                  {order.parkingSlotLocation}
                </TableCell>

                <TableCell>
                  {order.airFill ? "YES" : "NO"}
                </TableCell>

                <TableCell>
                  {order.carWash ? "YES" : "NO"}
                </TableCell>

                <TableCell>
                  {(order.totalPayment == 0) ? "In Progress" : order.totalPayment}
                </TableCell>

                <TableCell>
                  <AddBut comment={order.comment} />
                </TableCell>

                <TableCell>
                  {order.rating}
                </TableCell>

              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired
};
