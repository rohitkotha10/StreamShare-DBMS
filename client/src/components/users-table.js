import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';

export const UsersTable = (props) => {
  const { users } = props;

  return (
    <div>
      <Table
        sortdirection='desc'>
        <TableHead>
          <TableRow>
            <TableCell>
              UserID
            </TableCell>
            <TableCell>
              Email
            </TableCell>
            <TableCell>
              First Name
            </TableCell>
            <TableCell>
              Last Name
            </TableCell>
            <TableCell>
              Address
            </TableCell>
            <TableCell>
              Mobile Number
            </TableCell>
            <TableCell>
              Car Number
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => {
            return (
              <TableRow key={user.id}>
                <TableCell>
                  {user.id}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  {user.firstName}
                </TableCell>

                <TableCell>
                  {user.lastName}
                </TableCell>

                <TableCell>
                  {user.address}
                </TableCell>

                <TableCell>
                  {user.mobileNumber}
                </TableCell>

                <TableCell>
                  {user.carNumber}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};
